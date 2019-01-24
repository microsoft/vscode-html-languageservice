/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import 'mocha';
import * as assert from 'assert';
import { TextDocument } from 'vscode-languageserver-types';
import { getLanguageService } from '../htmlLanguageService';

function assertRanges(lines: string[] | string, expected: (number | string)[][]): void {
	let content: string = '';
	if (Array.isArray(lines)) {
		content = lines.join('\n');
	} else {
		content = lines;
	}
	let message = `Test ${content}`;

	let offset = content.indexOf('|');
	content = content.substr(0, offset) + content.substr(offset + 1);

	const ls = getLanguageService();

	const document = TextDocument.create('test://foo.html', 'html', 1, content);
	const actualRanges = ls.getSelectionRanges(document, document.positionAt(offset));
	const offsetPairs = actualRanges.map(r => {
		return [document.offsetAt(r.start), document.getText(r)];
	});

	message += `\n${JSON.stringify(offsetPairs)} should equal to ${JSON.stringify(expected)}`;
	assert.deepEqual(offsetPairs, expected, message);
}

suite('HTML SelectionRange', () => {
	test('Basic', () => {
		assertRanges('<div|>foo</div>', [[1, 'div'], [0, '<div>foo</div>']]);
		assertRanges('<|div>foo</div>', [[1, 'div'], [0, '<div>foo</div>']]);
		assertRanges('<d|iv>foo</div>', [[1, 'div'], [0, '<div>foo</div>']]);

		assertRanges('<div>|foo</div>', [[5, 'foo'], [0, '<div>foo</div>']]);
		assertRanges('<div>f|oo</div>', [[5, 'foo'], [0, '<div>foo</div>']]);
		assertRanges('<div>foo|</div>', [[5, 'foo'], [0, '<div>foo</div>']]);

		assertRanges('<div>foo<|/div>', [[0, '<div>foo</div>']]);

		assertRanges('<div>foo</|div>', [[10, 'div'], [0, '<div>foo</div>']]);
		assertRanges('<div>foo</di|v>', [[10, 'div'], [0, '<div>foo</div>']]);
		assertRanges('<div>foo</div|>', [[10, 'div'], [0, '<div>foo</div>']]);
	});

	test('Attribute Name', () => {
		assertRanges('<div |class="foo">foo</div>', [
			[5, 'class'],
			[5, `class="foo"`],
			[1, `div class="foo"`],
			[0, `<div class="foo">foo</div>`]
		]);
		assertRanges('<div cl|ass="foo">foo</div>', [
			[5, 'class'],
			[5, `class="foo"`],
			[1, `div class="foo"`],
			[0, `<div class="foo">foo</div>`]
		]);
		assertRanges('<div class|="foo">foo</div>', [
			[5, 'class'],
			[5, `class="foo"`],
			[1, `div class="foo"`],
			[0, `<div class="foo">foo</div>`]
		]);
	});

	test('Attribute Value', () => {
		assertRanges('<div class=|"foo">foo</div>', [
			[11, `"foo"`],
			[5, `class="foo"`],
			[1, `div class="foo"`],
			[0, `<div class="foo">foo</div>`]
		]);
		assertRanges('<div class="foo"|>foo</div>', [
			[11, `"foo"`],
			[5, `class="foo"`],
			[1, `div class="foo"`],
			[0, `<div class="foo">foo</div>`]
		]);

		assertRanges('<div class="|foo">foo</div>', [
			[12, 'foo'],
			[11, `"foo"`],
			[5, `class="foo"`],
			[1, `div class="foo"`],
			[0, `<div class="foo">foo</div>`]
		]);
		assertRanges('<div class="f|oo">foo</div>', [
			[12, 'foo'],
			[11, `"foo"`],
			[5, `class="foo"`],
			[1, `div class="foo"`],
			[0, `<div class="foo">foo</div>`]
		]);
	});

	test('Unquoted Attribute Value', () => {
		assertRanges('<div class=|foo>foo</div>', [
			[11, 'foo'],
			[5, 'class=foo'],
			[1, 'div class=foo'],
			[0, '<div class=foo>foo</div>']
		]);
	});

	test('Multiple Attribute Value', () => {
		assertRanges('<div class="foo" id="|bar">foo</div>', [
			[21, 'bar'],
			[20, `"bar"`],
			[17, `id="bar"`],
			[1, `div class="foo" id="bar"`],
			[0, `<div class="foo" id="bar">foo</div>`]
		]);
	});

	test('Self closing tags', () => {
		assertRanges('<br class="|foo"/>', [
			[11, 'foo'],
			[10, '"foo"'],
			[4, 'class="foo"'],
			[1, 'br class="foo"'],
			[0, '<br class="foo"/>']
		]);

		//Todo@Pine: We need the range `br` too. Sync with Joh to see what selection ranges should provider return.
		assertRanges('<b|r class="foo"/>', [[1, 'br class="foo"'], [0, '<br class="foo"/>']]);
	});
});
