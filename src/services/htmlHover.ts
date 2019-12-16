/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { HTMLDocument } from '../parser/htmlParser';
import { createScanner } from '../parser/htmlScanner';
import { Range, Position, Hover, MarkedString, MarkupContent, MarkupKind } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { TokenType, ClientCapabilities } from '../htmlLanguageTypes';
import { getAllDataProviders } from '../languageFacts/builtinDataProviders';
import { isDefined } from '../utils/object';
import { generateDocumentation } from '../languageFacts/dataProvider';

export class HTMLHover {
	private supportsMarkdown: boolean | undefined;

	constructor(private clientCapabilities: ClientCapabilities | undefined) { }

	doHover(document: TextDocument, position: Position, htmlDocument: HTMLDocument): Hover | null {
		const convertContents = this.convertContents.bind(this);
		const doesSupportMarkdown = this.doesSupportMarkdown();

		const offset = document.offsetAt(position);
		const node = htmlDocument.findNodeAt(offset);
		if (!node || !node.tag) {
			return null;
		}
		const dataProviders = getAllDataProviders().filter(p => p.isApplicable(document.languageId));

		function getTagHover(currTag: string, range: Range, open: boolean): Hover | null {
			currTag = currTag.toLowerCase();

			for (const provider of dataProviders) {
				let hover: Hover | null = null;

				provider.provideTags().forEach(tag => {
					if (tag.name.toLowerCase() === currTag.toLowerCase()) {
						const tagLabel = open ? '<' + currTag + '>' : '</' + currTag + '>';
						const markupContent = generateDocumentation(tag, doesSupportMarkdown);
						markupContent.value = '```html\n' + tagLabel + '\n```\n' + markupContent.value;
						hover = { contents: markupContent, range };
					}
				});

				if (hover) {
					(hover as Hover).contents = convertContents((hover as Hover).contents);
					return hover;
				}
			}
			return null;
		}

		function getAttrHover(currTag: string, currAttr: string, range: Range): Hover | null {
			currTag = currTag.toLowerCase();

			for (const provider of dataProviders) {
				let hover: Hover | null = null;

				provider.provideAttributes(currTag).forEach(attr => {
					if (currAttr === attr.name && attr.description) {
						hover = { contents: generateDocumentation(attr, doesSupportMarkdown), range };
					}
				});

				if (hover) {
					(hover as Hover).contents = convertContents((hover as Hover).contents);
					return hover;
				}
			}
			return null;
		}

		function getAttrValueHover(currTag: string, currAttr: string, currAttrValue: string, range: Range): Hover | null {
			currTag = currTag.toLowerCase();

			for (const provider of dataProviders) {
				let hover: Hover | null = null;

				provider.provideValues(currTag, currAttr).forEach(attrValue => {
					if (currAttrValue === attrValue.name && attrValue.description) {
						hover = { contents: generateDocumentation(attrValue, doesSupportMarkdown), range };
					}
				});

				if (hover) {
					(hover as Hover).contents = convertContents((hover as Hover).contents);
					return hover;
				}
			}
			return null;
		}

		function getTagNameRange(tokenType: TokenType, startOffset: number): Range | null {
			const scanner = createScanner(document.getText(), startOffset);
			let token = scanner.scan();
			while (token !== TokenType.EOS && (scanner.getTokenEnd() < offset || scanner.getTokenEnd() === offset && token !== tokenType)) {
				token = scanner.scan();
			}
			if (token === tokenType && offset <= scanner.getTokenEnd()) {
				return { start: document.positionAt(scanner.getTokenOffset()), end: document.positionAt(scanner.getTokenEnd()) };
			}
			return null;
		}

		if (node.endTagStart && offset >= node.endTagStart) {
			const tagRange = getTagNameRange(TokenType.EndTag, node.endTagStart);
			if (tagRange) {
				return getTagHover(node.tag, tagRange, false);
			}
			return null;
		}

		const tagRange = getTagNameRange(TokenType.StartTag, node.start);
		if (tagRange) {
			return getTagHover(node.tag, tagRange, true);
		}

		const attrRange = getTagNameRange(TokenType.AttributeName, node.start);
		if (attrRange) {
			const tag = node.tag;
			const attr = document.getText(attrRange);
			return getAttrHover(tag, attr, attrRange);
		}

		function scanAttrAndAttrValue(nodeStart: number, attrValueStart: number) {
			const scanner = createScanner(document.getText(), nodeStart);
			let token = scanner.scan();
			let prevAttr = undefined;
			while (token !== TokenType.EOS && (scanner.getTokenEnd() <= attrValueStart)) {
				token = scanner.scan();
				if (token === TokenType.AttributeName) {
					prevAttr = scanner.getTokenText();
				}
			}

			return prevAttr;
		}

		const attrValueRange = getTagNameRange(TokenType.AttributeValue, node.start);
		if (attrValueRange) {
			const tag = node.tag;
			const attrValue = trimQuotes(document.getText(attrValueRange));
			const matchAttr = scanAttrAndAttrValue(node.start, document.offsetAt(attrValueRange.start));

			if (matchAttr) {
				return getAttrValueHover(tag, matchAttr, attrValue, attrValueRange);
			}
		}

		return null;
	}

	private convertContents(contents: MarkupContent | MarkedString | MarkedString[]): MarkupContent | MarkedString | MarkedString[] {
		if (!this.doesSupportMarkdown()) {
			if (typeof contents === 'string') {
				return contents;
			}
			// MarkupContent
			else if ('kind' in contents) {
				return {
					kind: 'plaintext',
					value: contents.value
				};
			}
			// MarkedString[]
			else if (Array.isArray(contents)) {
				contents.map(c => {
					return typeof c === 'string' ? c : c.value;
				});
			}
			// MarkedString
			else {
				return contents.value;
			}
		}

		return contents;
	}

	private doesSupportMarkdown(): boolean {
		if (!isDefined(this.supportsMarkdown)) {
			if (!isDefined(this.clientCapabilities)) {
				this.supportsMarkdown = true;
				return this.supportsMarkdown;
			}

			const hover = this.clientCapabilities && this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.hover;
			this.supportsMarkdown = hover && hover.contentFormat && Array.isArray(hover.contentFormat) && hover.contentFormat.indexOf(MarkupKind.Markdown) !== -1;
		}
		return <boolean>this.supportsMarkdown;
	}
}

function trimQuotes(s: string) {
	if (s.length <= 1) {
		return s.replace(/['"]/, '');
	}

	if (s[0] === `'` || s[0] === `"`) {
		s = s.slice(1);
	}

	if (s[s.length - 1] === `'` || s[s.length - 1] === `"`) {
		s = s.slice(0, -1);
	}

	return s;
}

