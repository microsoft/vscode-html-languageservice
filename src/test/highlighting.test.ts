/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import * as htmlLanguageService from '../htmlLanguageService';
import { TextDocument } from '../htmlLanguageService';



suite('HTML Highlighting', () => {


	async function assertHighlights(value: string, expectedMatches: number[], elementName: string | null): Promise<void> {
		const offset = value.indexOf('|');
		value = value.substr(0, offset) + value.substr(offset + 1);

		const document = TextDocument.create('test://test/test.html', 'html', 0, value);

		const position = document.positionAt(offset);
		const ls = htmlLanguageService.getLanguageService();
		const htmlDoc = await ls.parseHTMLDocument(document);

		const highlights = ls.findDocumentHighlights(document, position, htmlDoc);
		assert.equal(highlights.length, expectedMatches.length);
		for (let i = 0; i < highlights.length; i++) {
			const actualStartOffset = document.offsetAt(highlights[i].range.start);
			assert.equal(actualStartOffset, expectedMatches[i]);
			const actualEndOffset = document.offsetAt(highlights[i].range.end);
			assert.equal(actualEndOffset, expectedMatches[i] + elementName!.length);

			assert.equal(document.getText().substring(actualStartOffset, actualEndOffset).toLowerCase(), elementName);
		}
	}

	test('Single', async () => {
		await assertHighlights('|<html></html>', [], null);
		await assertHighlights('<|html></html>', [1, 8], 'html');
		await assertHighlights('<h|tml></html>', [1, 8], 'html');
		await assertHighlights('<htm|l></html>', [1, 8], 'html');
		await assertHighlights('<html|></html>', [1, 8], 'html');
		await assertHighlights('<html>|</html>', [], null);
		await assertHighlights('<html><|/html>', [], null);
		await assertHighlights('<html></|html>', [1, 8], 'html');
		await assertHighlights('<html></h|tml>', [1, 8], 'html');
		await assertHighlights('<html></ht|ml>', [1, 8], 'html');
		await assertHighlights('<html></htm|l>', [1, 8], 'html');
		await assertHighlights('<html></html|>', [1, 8], 'html');
		await assertHighlights('<html></html>|', [], null);
	});

	test('Nested', async () => {
		await assertHighlights('<html>|<div></div></html>', [], null);
		await assertHighlights('<html><|div></div></html>', [7, 13], 'div');
		await assertHighlights('<html><div>|</div></html>', [], null);
		await assertHighlights('<html><div></di|v></html>', [7, 13], 'div');
		await assertHighlights('<html><div><div></div></di|v></html>', [7, 24], 'div');
		await assertHighlights('<html><div><div></div|></div></html>', [12, 18], 'div');
		await assertHighlights('<html><div><div|></div></div></html>', [12, 18], 'div');
		await assertHighlights('<html><div><div></div></div></h|tml>', [1, 30], 'html');
		await assertHighlights('<html><di|v></div><div></div></html>', [7, 13], 'div');
		await assertHighlights('<html><div></div><div></d|iv></html>', [18, 24], 'div');
	});

	test('Selfclosed', async () => {
		await assertHighlights('<html><|div/></html>', [7], 'div');
		await assertHighlights('<html><|br></html>', [7], 'br');
		await assertHighlights('<html><div><d|iv/></div></html>', [12], 'div');
	});

	test('Case insensivity', async () => {
		await assertHighlights('<HTML><diV><Div></dIV></dI|v></html>', [7, 24], 'div');
		await assertHighlights('<HTML><diV|><Div></dIV></dIv></html>', [7, 24], 'div');
	});

	test('Incomplete', async () => {
		await assertHighlights('<div><ol><li></li></ol></p></|div>', [1, 29], 'div');
	});
});