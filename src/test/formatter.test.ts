/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { TextDocument, Range } from 'vscode-languageserver-types';
import { getLanguageService } from '../htmlLanguageService';
import * as assert from 'assert';

suite('JSON Formatter', () => {

	function format(unformatted: string, expected: string, insertSpaces = true) {
		let range: Range | undefined = void 0;
		let uri = 'test://test.html';

		let rangeStart = unformatted.indexOf('|');
		let rangeEnd = unformatted.lastIndexOf('|');
		if (rangeStart !== -1 && rangeEnd !== -1) {
			// remove '|'
			unformatted = unformatted.substring(0, rangeStart) + unformatted.substring(rangeStart + 1, rangeEnd) + unformatted.substring(rangeEnd + 1);
			var unformattedDoc = TextDocument.create(uri, 'html', 0, unformatted);
			let startPos = unformattedDoc.positionAt(rangeStart);
			let endPos = unformattedDoc.positionAt(rangeEnd - 1);
			range = Range.create(startPos, endPos);
		}

		var document = TextDocument.create(uri, 'html', 0, unformatted);
		let edits = getLanguageService().format(document, range, { tabSize: 2, insertSpaces: insertSpaces, unformatted: '' });
		let formatted = TextDocument.applyEdits(document, edits);
		assert.equal(formatted, expected);
	}

	test('full document', () => {
		var content = [
			'<div  class = "foo">',
			'<br>',
			' </div>'
		].join('\n');

		var expected = [
			'<div class="foo">',
			'  <br>',
			'</div>',
		].join('\n');

		format(content, expected);
	});

	test('range', () => {
		var content = [
			'<div  class = "foo">',
			'  |<img  src = "foo">|',
			' </div>'
		].join('\n');

		var expected = [
			'<div  class = "foo">',
			'  <img src="foo">',
			' </div>'
		].join('\n');

		format(content, expected);
	});

	test('range 2', () => {
		var content = [
			'<div  class = "foo">',
			'  |<img  src = "foo">|',
			'  ',
			' </div>'
		].join('\n');

		var expected = [
			'<div  class = "foo">',
			'  <img src="foo">',
			'  ',
			' </div>'
		].join('\n');

		format(content, expected);
	});

	test('range 3', () => {
		var content = [
			'<div  class = "foo">',
			'  |<img  src = "foo">|    ',
			'  ',
			' </div>'
		].join('\n');

		var expected = [
			'<div  class = "foo">',
			'  <img src="foo">',
			'  ',
			' </div>'
		].join('\n');

		format(content, expected);
	});

	test('range 3', () => {
		var content = [
			'<div |class= "foo"|>'
		].join('\n');

		var expected = [
			'<div class= "foo">'
		].join('\n');

		format(content, expected);
	});

	test('range with indent', () => {
		var content = [
			'<div  class = "foo">',
			'  |<img src = "foo">',
			'  <img  src = "foo">|',
			' </div>'
		].join('\n');

		var expected = [
			'<div  class = "foo">',
			'  <img src="foo">',
			'  <img src="foo">',
			' </div>'
		].join('\n');

		format(content, expected);
	});

	test('range with indent 2', () => {
		var content = [
			'<div  class = "foo">',
			'|  <img  src = "foo">',
			'  <img  src = "foo">|',
			' </div>'
		].join('\n');

		var expected = [
			'<div  class = "foo">',
			'  <img src="foo">',
			'  <img src="foo">',
			' </div>'
		].join('\n');

		format(content, expected);
	});


	test('range with indent 3', () => {
		var content = [
			'<div  class = "foo">',
			'  <div></div>   |<img  src = "foo"|>',
			' </div>'
		].join('\n');

		var expected = [
			'<div  class = "foo">',
			'  <div></div> <img src="foo">',
			' </div>'
		].join('\n');

		format(content, expected);
	});

	test('bug 36574', () => {
		var content = [
			'<script src="/js/main.js"> </script>'
		].join('\n');

		var expected = [
			'<script src="/js/main.js"> </script>'
		].join('\n');

		format(content, expected);
	});

	test('beautify-web/js-beautify#1491', () => {
		var content = [
			'<head>',
			'    <script src="one.js"></script> <!-- one -->',
			'    <script src="two.js"></script> <!-- two-->',
			'</head>',
		].join('\n');

		var expected = [
			'<head>',
			'  <script src="one.js"></script> <!-- one -->',
			'  <script src="two.js"></script> <!-- two-->',
			'</head>',
		].join('\n');

		format(content, expected);
	});
});