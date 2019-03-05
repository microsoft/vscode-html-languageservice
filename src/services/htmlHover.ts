/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { HTMLDocument } from '../parser/htmlParser';
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
			let hover = null;

			provider.provideTags().forEach(tag => {
				if (tag.name.toLowerCase() === currTag.toLowerCase()) {
					const tagLabel = open ? '<' + currTag + '>' : '</' + currTag + '>';
					const tagDescription = tag.description || '';
					hover = { contents: [{ language: 'html', value: tagLabel }, MarkedString.fromPlainText(tagDescription)], range };
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
	return null;
}

