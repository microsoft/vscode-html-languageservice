/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import 'mocha';
import * as assert from 'assert';
import { SelectionRange, TextDocument, getLanguageService } from '../htmlLanguageService';

function assertRanges(content: string, expected: (number | string)[][]): void {
	let message = `${content} gives selection range:\n`;

	const offset = content.indexOf('|');
	content = content.substr(0, offset) + content.substr(offset + 1);

	const ls = getLanguageService();

	const document = TextDocument.create('test://foo.html', 'html', 1, content);
	const actualRanges = ls.getSelectionRanges(document, [document.positionAt(offset)]);
	assert.equal(actualRanges.length, 1);
	const offsetPairs: [number, string][] = [];
	let curr: SelectionRange | undefined = actualRanges[0];
	while (curr) {
		offsetPairs.push([document.offsetAt(curr.range.start), document.getText(curr.range)]);
		curr = curr.parent;
	}

	message += `${JSON.stringify(offsetPairs)}\n but should give:\n${JSON.stringify(expected)}\n`;
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

	test('Nested', () => {
		assertRanges('<div><div>|foo</div></div>', [[10, 'foo'], [5, '<div>foo</div>'], [0, '<div><div>foo</div></div>']]);

		assertRanges('<div>\n<p>|foo</p>\n</div>', [
			[9, 'foo'],
			[6, '<p>foo</p>'],
			[5, '\n<p>foo</p>\n'],
			[0, '<div>\n<p>foo</p>\n</div>']
		]);
	});

	test('Void elements', () => {
		assertRanges(`<meta charset='|UTF-8'>`, [
			[15, 'UTF-8'],
			[14, "'UTF-8'"],
			[6, "charset='UTF-8'"],
			[1, "meta charset='UTF-8'"],
			[0, "<meta charset='UTF-8'>"]
		]);

		assertRanges(`<meta c|harset='UTF-8'>`, [
			[6, 'charset'],
			[6, "charset='UTF-8'"],
			[1, "meta charset='UTF-8'"],
			[0, "<meta charset='UTF-8'>"]
		]);

		assertRanges(`<html><meta c|harset='UTF-8'></html>`, [
			[12, 'charset'],
			[12, "charset='UTF-8'"],
			[7, "meta charset='UTF-8'"],
			[6, "<meta charset='UTF-8'>"],
			[0, "<html><meta charset='UTF-8'></html>"]
		]);
	});

	test('Unmatching tags', () => {
		assertRanges('<div></div|1>', [[0, "<div></div1>"]]);
	});

	test('Unhandled', () => {
		// We do not handle comments. This semantic selection is handled by VS Code's default provider, which returns
		// - foo
		// - <!-- foo -->
		assertRanges('<!-- f|oo -->', [[6, '']]);

		// Same for DOCTYPE
		assertRanges('<!DOCTYPE h|tml>', [[11, '']]);
	});
});
