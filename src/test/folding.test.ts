/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


import 'mocha';
import * as assert from 'assert';
import { TextDocument } from '../htmlLanguageTypes';
import { HTMLFolding } from '../services/htmlFolding';
import { HTMLDataManager } from '../languageFacts/dataManager';

interface ExpectedIndentRange {
	startLine: number;
	endLine: number;
	kind?: string;
}

function assertRanges(lines: string[], expected: ExpectedIndentRange[], message?: string, nRanges?: number): void {
	const document = TextDocument.create('test://foo/bar.json', 'json', 1, lines.join('\n'));
	const workspace = {
		settings: {},
		folders: [{ name: 'foo', uri: 'test://foo' }]
	};
	const actual = new HTMLFolding(new HTMLDataManager({})).getFoldingRanges(document, { rangeLimit: nRanges });

	let actualRanges = [];
	for (let i = 0; i < actual.length; i++) {
		actualRanges[i] = r(actual[i].startLine, actual[i].endLine, actual[i].kind);
	}
	actualRanges = actualRanges.sort((r1, r2) => r1.startLine - r2.startLine);
	assert.deepEqual(actualRanges, expected, message);
}

function r(startLine: number, endLine: number, kind?: string): ExpectedIndentRange {
	return { startLine, endLine, kind };
}

suite('HTML Folding', () => {
	test('Fold one level', () => {
		const input = [
			/*0*/'<html>',
			/*1*/'Hello',
			/*2*/'</html>'
		];
		assertRanges(input, [r(0, 1)]);
	});

	test('Fold two level', () => {
		const input = [
			/*0*/'<html>',
			/*1*/'<head>',
			/*2*/'Hello',
			/*3*/'</head>',
			/*4*/'</html>'
		];
		assertRanges(input, [r(0, 3), r(1, 2)]);
	});

	test('Fold siblings', () => {
		const input = [
			/*0*/'<html>',
			/*1*/'<head>',
			/*2*/'Head',
			/*3*/'</head>',
			/*4*/'<body class="f">',
			/*5*/'Body',
			/*6*/'</body>',
			/*7*/'</html>'
		];
		assertRanges(input, [r(0, 6), r(1, 2), r(4, 5)]);
	});

	test('Fold self-closing tags', () => {
		const input = [
			/*0*/'<div>',
			/*1*/'<a href="top"/>',
			/*2*/'<img src="s">',
			/*3*/'<br/>',
			/*4*/'<br>',
			/*5*/'<img class="c"',
			/*6*/'     src="top"',
			/*7*/'>',
			/*8*/'</div>'
		];
		assertRanges(input, [r(0, 7), r(5, 6)]);
	});

	test('Fold comment', () => {
		const input = [
			/*0*/'<!--',
			/*1*/' multi line',
			/*2*/'-->',
			/*3*/'<!-- some stuff',
			/*4*/' some more stuff -->',
		];
		assertRanges(input, [r(0, 2, 'comment'), r(3, 4, 'comment')]);
	});

	test('Fold regions', () => {
		const input = [
			/*0*/'<!-- #region -->',
			/*1*/'<!-- #region -->',
			/*2*/'<!-- #endregion -->',
			/*3*/'<!-- #endregion -->',
		];
		assertRanges(input, [r(0, 3, 'region'), r(1, 2, 'region')]);
	});



	test('Fold incomplete', () => {
		const input = [
			/*0*/'<body>',
			/*1*/'<div></div>',
			/*2*/'Hello',
			/*3*/'</div>',
			/*4*/'</body>',
		];
		assertRanges(input, [r(0, 3)]);
	});

	test('Fold incomplete 2', () => {
		const input = [
			/*0*/'<be><div>',
			/*1*/'<!-- #endregion -->',
			/*2*/'</div>',
		];
		assertRanges(input, [r(0, 1)]);
	});

	test('Fold intersecting region', () => {
		const input = [
			/*0*/'<body>',
			/*1*/'<!-- #region -->',
			/*2*/'Hello',
			/*3*/'<div></div>',
			/*4*/'</body>',
			/*5*/'<!-- #endregion -->',
		];
		assertRanges(input, [r(0, 3)]);
	});

	test('Fold intersecting region 2', () => {
		const input = [
			/*0*/'<!-- #region -->',
			/*1*/'<body>',
			/*2*/'Hello',
			/*3*/'<!-- #endregion -->',
			/*4*/'<div></div>',
			/*5*/'</body>',
		];
		assertRanges(input, [r(0, 3, 'region')]);
	});

	test('Test limit', () => {
		const input = [
			/* 0*/'<div>',
			/* 1*/' <span>',
			/* 2*/'  <b>',
			/* 3*/'  ',
			/* 4*/'  </b>,',
			/* 5*/'  <b>',
			/* 6*/'   <pre>',
			/* 7*/'  ',
			/* 8*/'   </pre>,',
			/* 9*/'   <pre>',
			/*10*/'  ',
			/*11*/'   </pre>,',
			/*12*/'  </b>,',
			/*13*/'  <b>',
			/*14*/'  ',
			/*15*/'  </b>,',
			/*16*/'  <b>',
			/*17*/'  ',
			/*18*/'  </b>',
			/*19*/' </span>',
			/*20*/'</div>',
		];
		assertRanges(input, [r(0, 19), r(1, 18), r(2, 3), r(5, 11), r(6, 7), r(9, 10), r(13, 14), r(16, 17)], 'no limit', void 0);
		assertRanges(input, [r(0, 19), r(1, 18), r(2, 3), r(5, 11), r(6, 7), r(9, 10), r(13, 14), r(16, 17)], 'limit 8', 8);
		assertRanges(input, [r(0, 19), r(1, 18), r(2, 3), r(5, 11), r(6, 7), r(13, 14), r(16, 17)], 'limit 7', 7);
		assertRanges(input, [r(0, 19), r(1, 18), r(2, 3), r(5, 11), r(13, 14), r(16, 17)], 'limit 6', 6);
		assertRanges(input, [r(0, 19), r(1, 18), r(2, 3), r(5, 11), r(13, 14)], 'limit 5', 5);
		assertRanges(input, [r(0, 19), r(1, 18), r(2, 3), r(5, 11)], 'limit 4', 4);
		assertRanges(input, [r(0, 19), r(1, 18), r(2, 3)], 'limit 3', 3);
		assertRanges(input, [r(0, 19), r(1, 18)], 'limit 2', 2);
		assertRanges(input, [r(0, 19)], 'limit 1', 1);
	});

});
