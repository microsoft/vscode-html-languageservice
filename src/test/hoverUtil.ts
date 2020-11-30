/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import * as htmlLanguageService from '../htmlLanguageService';
import { HoverSettings, TextDocument, MarkupContent } from '../htmlLanguageService';

export function assertHover(value: string, expectedHoverContent: MarkupContent | undefined, expectedHoverOffset: number | undefined): void {
	const offset = value.indexOf('|');
	value = value.substr(0, offset) + value.substr(offset + 1);

	const document = TextDocument.create('test://test/test.html', 'html', 0, value);

	const position = document.positionAt(offset);
	const ls = htmlLanguageService.getLanguageService();
	const htmlDoc = ls.parseHTMLDocument(document);

	const hover = ls.doHover(document, position, htmlDoc);
	assert.deepEqual(hover && hover.contents, expectedHoverContent);
	assert.equal(hover && document.offsetAt(hover.range!.start), expectedHoverOffset);
}

export function assertHover2(value: string, contents: string | MarkupContent, rangeText: string, lsOptions?: htmlLanguageService.LanguageServiceOptions, hoverSettings?: HoverSettings): void {
	const offset = value.indexOf('|');
	value = value.substr(0, offset) + value.substr(offset + 1);

	const document = TextDocument.create('test://test/test.html', 'html', 0, value);

	const position = document.positionAt(offset);
	const ls = htmlLanguageService.getLanguageService(lsOptions);
	const htmlDoc = ls.parseHTMLDocument(document);

	const hover = ls.doHover(document, position, htmlDoc, hoverSettings);
	if (hover) {
		if (typeof contents === 'string') {
			assert.equal(hover.contents, contents);
		} else {
			assert.equal((hover.contents as MarkupContent).kind, contents.kind);
			assert.equal((hover.contents as MarkupContent).value, contents.value);
		}

		if (hover.range) {
			assert.equal(rangeText, document.getText(hover.range));
		}
	}
}

