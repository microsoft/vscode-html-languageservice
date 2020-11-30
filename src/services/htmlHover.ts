/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { HTMLDocument } from '../parser/htmlParser';
import { createScanner } from '../parser/htmlScanner';
import { TokenType, LanguageServiceOptions, HoverSettings, TextDocument, Range, Position, Hover, MarkedString, MarkupContent, MarkupKind } from '../htmlLanguageTypes';
import { HTMLDataManager } from '../languageFacts/dataManager';
import { isDefined } from '../utils/object';
import { generateDocumentation } from '../languageFacts/dataProvider';
import { entities } from '../parser/htmlEntities';
import { isLetterOrDigit } from '../utils/strings';
import * as nls from 'vscode-nls';
const localize = nls.loadMessageBundle();


export class HTMLHover {
	private supportsMarkdown: boolean | undefined;

	constructor(private lsOptions: LanguageServiceOptions, private dataManager: HTMLDataManager) { }

	doHover(document: TextDocument, position: Position, htmlDocument: HTMLDocument, options?: HoverSettings): Hover | null {
		const convertContents = this.convertContents.bind(this);
		const doesSupportMarkdown = this.doesSupportMarkdown();

		const offset = document.offsetAt(position);
		const node = htmlDocument.findNodeAt(offset);
		const text = document.getText();
		if (!node || !node.tag) {
			return null;
		}
		const dataProviders = this.dataManager.getDataProviders().filter(p => p.isApplicable(document.languageId));

		function getTagHover(currTag: string, range: Range, open: boolean): Hover | null {
			for (const provider of dataProviders) {
				let hover: Hover | null = null;

				provider.provideTags().forEach(tag => {
					if (tag.name.toLowerCase() === currTag.toLowerCase()) {
						let markupContent = generateDocumentation(tag, options, doesSupportMarkdown);
						if (!markupContent) {
							markupContent = {
								kind: doesSupportMarkdown ? 'markdown' : 'plaintext',
								value: ''
							};
						}
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
			for (const provider of dataProviders) {
				let hover: Hover | null = null;

				provider.provideAttributes(currTag).forEach(attr => {
					if (currAttr === attr.name && attr.description) {
						const contentsDoc = generateDocumentation(attr, options, doesSupportMarkdown);
						if (contentsDoc) {
							hover = { contents: contentsDoc, range };
						} else {
							hover = null;
						}
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
			for (const provider of dataProviders) {
				let hover: Hover | null = null;

				provider.provideValues(currTag, currAttr).forEach(attrValue => {
					if (currAttrValue === attrValue.name && attrValue.description) {
						const contentsDoc = generateDocumentation(attrValue, options, doesSupportMarkdown);
						if (contentsDoc) {
							hover = { contents: contentsDoc, range };
						} else {
							hover = null;
						}
					}
				});

				if (hover) {
					(hover as Hover).contents = convertContents((hover as Hover).contents);
					return hover;
				}
			}
			return null;
		}

		function getEntityHover(text: string, range: Range): Hover | null {
			let currEntity = filterEntity(text);

			for (const entity in entities) {
				let hover: Hover | null = null;

				const label = '&' + entity;

				if (currEntity === label) {
					let code = entities[entity].charCodeAt(0).toString(16).toUpperCase();
					let hex = 'U+';

					if (code.length < 4) {
						const zeroes = 4 - code.length;
						let k = 0;

						while (k < zeroes) {
							hex += '0';
							k += 1;
						}
					}

					hex += code;
					const contentsDoc = localize('entity.propose', `Character entity representing '${entities[entity]}', unicode equivalent '${hex}'`);
					if (contentsDoc) {
						hover = { contents: contentsDoc, range };
					} else {
						hover = null;
					}
				}

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

		function getEntityRange(): Range | null {
			let k = offset - 1;
			let characterStart = position.character;

			while (k >= 0 && isLetterOrDigit(text, k)) {
				k--;
				characterStart--;
			}

			let n = k + 1;
			let characterEnd = characterStart;

			while (isLetterOrDigit(text, n)) {
				n++;
				characterEnd++;
			}

			if (k >= 0 && text[k] === '&') {
				let range: Range | null = null;

				if (text[n] === ';') {
					range = Range.create(Position.create(position.line, characterStart), Position.create(position.line, characterEnd + 1));
				} else {
					range = Range.create(Position.create(position.line, characterStart), Position.create(position.line, characterEnd));
				}

				return range;
			}

			return null;
		}

		function filterEntity(text: string): string {
			let k = offset - 1;
			let newText = '&';

			while (k >= 0 && isLetterOrDigit(text, k)) {
				k--;
			}

			k = k + 1;

			while (isLetterOrDigit(text, k)) {
				newText += text[k];
				k += 1;
			}

			newText += ';';

			return newText;
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

		const entityRange = getEntityRange();
		if (entityRange) {
			return getEntityHover(text, entityRange);
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
			if (!isDefined(this.lsOptions.clientCapabilities)) {
				this.supportsMarkdown = true;
				return this.supportsMarkdown;
			}

			const contentFormat = this.lsOptions.clientCapabilities?.textDocument?.hover?.contentFormat;
			this.supportsMarkdown = Array.isArray(contentFormat) && contentFormat.indexOf(MarkupKind.Markdown) !== -1;
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

