/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { HTMLDocument, AttributeValueWithLocation, AttributeWithLocation } from '../parser/htmlParser';
import { createScanner } from '../parser/htmlScanner';
import { TextDocument, Range, Position, Hover, MarkedString } from 'vscode-languageserver-types';
import { TokenType } from '../htmlLanguageTypes';
import { getAllDataProviders } from '../languageFacts/builtinDataProviders';

export function doHover(document: TextDocument, position: Position, htmlDocument: HTMLDocument): Hover | null {
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
					const tagDescription = tag.description || '';
					if (typeof tagDescription === 'string') {
						hover = { contents: [{ language: 'html', value: tagLabel }, MarkedString.fromPlainText(tagDescription)], range };
					} else {
						hover = { contents: tagDescription, range };
					}
				}
			});

			if (hover) {
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
					if (typeof attr.description === 'string') {
						hover = { contents: [MarkedString.fromPlainText(attr.description)], range };
					} else {
						hover = { contents: attr.description, range };
					}
				}
			});

			if (hover) {
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
					if (typeof attrValue.description === 'string') {
						hover = { contents: [MarkedString.fromPlainText(attrValue.description)], range };
					} else {
						hover = { contents: attrValue.description, range };
					}
				}
			});

			if (hover) {
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

	const attrValueRange = getTagNameRange(TokenType.AttributeValue, node.start);
	if (attrValueRange) {
		const tag = node.tag;
		const attrValue = trimQuotes(document.getText(attrValueRange));
		let matchAttr;
		node.attributeNames.forEach(nodeAttr => {
			if (node.attributes[nodeAttr] && node.attributes[nodeAttr].value !== null) {
				if (
					(node.attributes[nodeAttr].value as AttributeValueWithLocation).start ===
						document.offsetAt(attrValueRange.start) &&
					(node.attributes[nodeAttr].value as AttributeValueWithLocation).end ===
						document.offsetAt(attrValueRange.end)
				) {
					matchAttr = nodeAttr;
				}
			}
		});
		
		if (matchAttr) {
			return getAttrValueHover(tag, matchAttr, attrValue, attrValueRange);
		}
	}

	return null;
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

