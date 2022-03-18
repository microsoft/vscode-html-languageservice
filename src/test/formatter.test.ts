/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { getLanguageService, TextDocument, Range } from '../htmlLanguageService';
import * as assert from 'assert';

suite('HTML Formatter', () => {

	function format(unformatted: string, expected: string, insertSpaces = true) {
		let range: Range | undefined = void 0;
		const uri = 'test://test.html';

		const rangeStart = unformatted.indexOf('|');
		const rangeEnd = unformatted.lastIndexOf('|');
		if (rangeStart !== -1 && rangeEnd !== -1) {
			// remove '|'
			unformatted = unformatted.substring(0, rangeStart) + unformatted.substring(rangeStart + 1, rangeEnd) + unformatted.substring(rangeEnd + 1);
			var unformattedDoc = TextDocument.create(uri, 'html', 0, unformatted);
			const startPos = unformattedDoc.positionAt(rangeStart);
			const endPos = unformattedDoc.positionAt(rangeEnd - 1);
			range = Range.create(startPos, endPos);
		}

		var document = TextDocument.create(uri, 'html', 0, unformatted);
		const edits = getLanguageService().format(document, range, { tabSize: 2, insertSpaces: insertSpaces, unformatted: '' });
		const formatted = TextDocument.applyEdits(document, edits);
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

	test('range 4', () => {
		var content = [
			'<div  class = "foo">',
			'  |<img  src = "foo"|>    ',
			'  ',
			' </div>'
		].join('\n');

		var expected = [
			'<div  class = "foo">',
			'  <img src="foo">    ',
			'  ',
			' </div>'
		].join('\n');

		format(content, expected);
	});

	test('range 5', () => {
		var content = [
			'<div  class = "foo">',
			'  <|img  src = "foo">|    ',
			'  ',
			' </div>'
		].join('\n');

		var expected = [
			'<div  class = "foo">',
			'  <img  src = "foo">    ',
			'  ',
			' </div>'
		].join('\n');

		format(content, expected);
	});

	test('range 6', () => {
		var content = [
			'<div|  class = "foo">',
			'  <img  src = "foo">    ',
			'  ',
			' </div>|'
		].join('\n');

		var expected = [
			'<div  class = "foo">',
			'  <img  src = "foo">    ',
			'  ',
			' </div>'
		].join('\n');

		format(content, expected);
	});

	test('range 7', () => {
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

	test('range with indent 4', () => {
		var content = [
			'<div  class = "foo">',
			'  <div>|</div>   <img  src = "foo"|>',
			' </div>'
		].join('\n');

		var expected = [
			'<div  class = "foo">',
			'  <div></div> <img src="foo">',
			' </div>'
		].join('\n');

		format(content, expected);
	});

	test('range with indent 4', () => {
		var content = [
			'<div  class = "foo">',
			'  <div></div>|<img src = "foo">',
			'    <img  src = "foo">|',
			' </div>'
		].join('\n');

		var expected = [
			'<div  class = "foo">',
			'  <div></div><img src="foo">',
			'  <img src="foo">',
			' </div>'
		].join('\n');

		format(content, expected);
	});

	test('range with indent 5', () => {
		var content = [
			'<div  class = "foo">',
			'   |<img src = "foo">',
			'   <img  src = "foo">|',
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

	test('range with indent 6', () => {
		var content = [
			'<div  class = "foo">',
			'    |<img src = "foo">',
			'    <img  src = "foo">|',
			' </div>'
		].join('\n');

		var expected = [
			'<div  class = "foo">',
			'    <img src="foo">',
			'    <img src="foo">',
			' </div>'
		].join('\n');

		format(content, expected);
	});

	test('range with indent 7', () => {
		var content = [
			'<div  class = "foo">',
			'    <div></div>|<img src = "foo">',
			'      <img  src = "foo">|',
			' </div>'
		].join('\n');

		var expected = [
			'<div  class = "foo">',
			'    <div></div><img src="foo">',
			'    <img src="foo">',
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

	test('bug 58693', () => {
		var content = [
			'<a class="btn| btn-link|"></a>'
		].join('\n');

		var expected = [
			'<a class="btn btn-link"></a>'
		].join('\n');

		format(content, expected);
	});

});
