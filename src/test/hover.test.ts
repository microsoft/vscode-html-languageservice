/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import * as assert from 'assert';
import * as htmlLanguageService from '../htmlLanguageService';
import {TextDocument} from 'vscode-languageserver-types';



suite('HTML Hover', () => {

	function assertHover(value: string, expectedHoverLabel: string, expectedHoverOffset): void {
		let offset = value.indexOf('|');
		value = value.substr(0, offset) + value.substr(offset + 1);

		let document = TextDocument.create('test://test/test.html', 'html', 0, value);

		let position = document.positionAt(offset);
		let ls = htmlLanguageService.getLanguageService();
		let htmlDoc = ls.parseHTMLDocument(document);

		let hover = ls.doHover(document, position, htmlDoc);
		assert.equal(hover && hover.contents[0].value, expectedHoverLabel);
		assert.equal(hover && document.offsetAt(hover.range.start), expectedHoverOffset);
	}

	test('Single', function (): any {
		assertHover('|<html></html>', void 0, void 0);
		assertHover('<|html></html>', '<html>', 1);
		assertHover('<h|tml></html>', '<html>', 1);
		assertHover('<htm|l></html>', '<html>', 1);
		assertHover('<html|></html>', '<html>', 1);
		assertHover('<html>|</html>', void 0, void 0);
		assertHover('<html><|/html>', void 0, void 0);
		assertHover('<html></|html>', '</html>', 8);
		assertHover('<html></h|tml>', '</html>', 8);
		assertHover('<html></ht|ml>', '</html>', 8);
		assertHover('<html></htm|l>', '</html>', 8);
		assertHover('<html></html|>', '</html>', 8);
		assertHover('<html></html>|', void 0, void 0);
	});
});