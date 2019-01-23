/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import 'mocha';
import * as assert from 'assert';
import { TextDocument } from 'vscode-languageserver-types';
import { getApplicableRanges } from '../services/htmlSelectionRange';

function assertRanges(lines: string[] | string, expected: number[][]): void {
	let content: string = '';
	if (Array.isArray(lines)) {
		content = lines.join('\n');
	} else {
		content = lines;
	}
	let message = `Test ${content}`;

	let offset = content.indexOf('|');
	content = content.substr(0, offset) + content.substr(offset + 1);

	const document = TextDocument.create('test://foo/bar.html', 'html', 1, content);
	const actualRanges = getApplicableRanges(document, document.positionAt(offset));

	message += `\n${JSON.stringify(actualRanges)} should equal to ${JSON.stringify(expected)}`;
	assert.deepEqual(actualRanges, expected, message);
}

suite('HTML SelectionRange', () => {
	test('Basic', () => {
		assertRanges('<div|>foo</div>', [[1, 4], [0, 14]]);
		assertRanges('<|div>foo</div>', [[1, 4], [0, 14]]);
		assertRanges('<d|iv>foo</div>', [[1, 4], [0, 14]]);

		assertRanges('<div>|foo</div>', [[5, 8], [0, 14]]);
		assertRanges('<div>f|oo</div>', [[5, 8], [0, 14]]);
		assertRanges('<div>foo|</div>', [[5, 8], [0, 14]]);

		assertRanges('<div>foo<|/div>', [[0, 14]]);

		assertRanges('<div>foo</|div>', [[10, 13], [0, 14]]);
		assertRanges('<div>foo</di|v>', [[10, 13], [0, 14]]);
		assertRanges('<div>foo</div|>', [[10, 13], [0, 14]]);
	});

	test('Attribute Name', () => {
		assertRanges('<div |class="foo">foo</div>', [[5, 10], [5, 16], [1, 16], [0, 26]]);
		assertRanges('<div cl|ass="foo">foo</div>', [[5, 10], [5, 16], [1, 16], [0, 26]]);
		assertRanges('<div class|="foo">foo</div>', [[5, 10], [5, 16], [1, 16], [0, 26]]);
	});

	test('Attribute Value', () => {
		assertRanges('<div class=|"foo">foo</div>', [[11, 16], [5, 16], [1, 16], [0, 26]]);
		assertRanges('<div class="foo"|>foo</div>', [[11, 16], [5, 16], [1, 16], [0, 26]]);

		assertRanges('<div class="|foo">foo</div>', [[12, 15], [11, 16], [5, 16], [1, 16], [0, 26]]);
		assertRanges('<div class="f|oo">foo</div>', [[12, 15], [11, 16], [5, 16], [1, 16], [0, 26]]);
	});

	test('Unquoted Attribute Value', () => {
		assertRanges('<div class=|foo>foo</div>', [[11, 14], [5, 14], [1, 14], [0, 24]]);
	});

	test('Multiple Attribute Value', () => {
		assertRanges('<div class="foo" id="|bar">foo</div>', [[21, 24], [20, 25], [17, 25], [1, 25], [0, 35]]);
	});
});
