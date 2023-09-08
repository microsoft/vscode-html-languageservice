/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import * as htmlLanguageService from '../htmlLanguageService';

import { SymbolInformation, SymbolKind, Location, Range, TextDocument, DocumentSymbol } from '../htmlLanguageService';

suite('HTML Symbols', () => {

	const TEST_URI = "test://test/test.html";

	const testSymbolInformationsFor = function (value: string, expected: SymbolInformation[]) {
		const ls = htmlLanguageService.getLanguageService();
		const document = TextDocument.create(TEST_URI, 'html', 0, value);
		const htmlDoc = ls.parseHTMLDocument(document);
		const symbols = ls.findDocumentSymbols(document, htmlDoc);
		assert.deepEqual(symbols, expected);
	};

	const testDocumentSymbolsFor = function (value: string, expected: DocumentSymbol[]) {
		const ls = htmlLanguageService.getLanguageService();
		const document = TextDocument.create(TEST_URI, 'html', 0, value);
		const htmlDoc = ls.parseHTMLDocument(document);
		const symbols = ls.findDocumentSymbols2(document, htmlDoc);
		assert.deepEqual(symbols, expected);
	};

	test('Simple', () => {
		testSymbolInformationsFor('<div></div>', [
			{ containerName: '', name: 'div', kind: <SymbolKind>SymbolKind.Field, location: Location.create(TEST_URI, Range.create(0, 0, 0, 11)) }
		]);
		testSymbolInformationsFor('<div><input checked id="test" class="checkbox"></div>',
			[
				{ containerName: '', name: 'div', kind: <SymbolKind>SymbolKind.Field, location: Location.create(TEST_URI, Range.create(0, 0, 0, 53)) },
				{ containerName: 'div', name: 'input#test.checkbox', kind: <SymbolKind>SymbolKind.Field, location: Location.create(TEST_URI, Range.create(0, 5, 0, 47)) }
			]
		);

		testDocumentSymbolsFor('<div></div>', [
			DocumentSymbol.create('div', undefined, SymbolKind.Field, Range.create(0, 0, 0, 11), Range.create(0, 0, 0, 11))
		]);
		testDocumentSymbolsFor('<div><input checked id="test" class="checkbox"></div>',
			[
				DocumentSymbol.create('div', undefined, SymbolKind.Field, Range.create(0, 0, 0, 53), Range.create(0, 0, 0, 53), [
					DocumentSymbol.create('input#test.checkbox', undefined, SymbolKind.Field, Range.create(0, 5, 0, 47), Range.create(0, 5, 0, 47))
				])
			]
		);
	});

	test('Id and classes', function () {
		const content = '<html id=\'root\'><body id="Foo" class="bar"><div class="a b"></div></body></html>';

		const expected1 = [
			{ name: 'html#root', kind: SymbolKind.Field, containerName: '', location: Location.create(TEST_URI, Range.create(0, 0, 0, 80)) },
			{ name: 'body#Foo.bar', kind: SymbolKind.Field, containerName: 'html#root', location: Location.create(TEST_URI, Range.create(0, 16, 0, 73)) },
			{ name: 'div.a.b', kind: SymbolKind.Field, containerName: 'body#Foo.bar', location: Location.create(TEST_URI, Range.create(0, 43, 0, 66)) },
		];

		testSymbolInformationsFor(content, expected1);

		const expected2: DocumentSymbol[] = [
			DocumentSymbol.create("html#root", undefined, SymbolKind.Field, Range.create(0, 0, 0, 80), Range.create(0, 0, 0, 80), [
				DocumentSymbol.create("body#Foo.bar", undefined, SymbolKind.Field, Range.create(0, 16, 0, 73), Range.create(0, 16, 0, 73), [
					DocumentSymbol.create("div.a.b", undefined, SymbolKind.Field, Range.create(0, 43, 0, 66), Range.create(0, 43, 0, 66))
				])
			])
		];
		testDocumentSymbolsFor(content, expected2);
	});

	test('Self closing', function () {
		const content = '<html><br id="Foo"><br id=Bar></html>';

		const expected1 = [
			{ name: 'html', kind: SymbolKind.Field, containerName: '', location: Location.create(TEST_URI, Range.create(0, 0, 0, 37)) },
			{ name: 'br#Foo', kind: SymbolKind.Field, containerName: 'html', location: Location.create(TEST_URI, Range.create(0, 6, 0, 19)) },
			{ name: 'br#Bar', kind: SymbolKind.Field, containerName: 'html', location: Location.create(TEST_URI, Range.create(0, 19, 0, 30)) },
		];

		testSymbolInformationsFor(content, expected1);

		const expected2: DocumentSymbol[] = [
			DocumentSymbol.create("html", undefined, SymbolKind.Field, Range.create(0, 0, 0, 37), Range.create(0, 0, 0, 37), [
				DocumentSymbol.create("br#Foo", undefined, SymbolKind.Field, Range.create(0, 6, 0, 19), Range.create(0, 6, 0, 19)),
				DocumentSymbol.create("br#Bar", undefined, SymbolKind.Field, Range.create(0, 19, 0, 30), Range.create(0, 19, 0, 30))
			])
		];
		testDocumentSymbolsFor(content, expected2);
	});

	test('No attrib', function () {
		const content = '<html><body><div></div></body></html>';

		const expected = [
			{ name: 'html', kind: SymbolKind.Field, containerName: '', location: Location.create(TEST_URI, Range.create(0, 0, 0, 37)) },
			{ name: 'body', kind: SymbolKind.Field, containerName: 'html', location: Location.create(TEST_URI, Range.create(0, 6, 0, 30)) },
			{ name: 'div', kind: SymbolKind.Field, containerName: 'body', location: Location.create(TEST_URI, Range.create(0, 12, 0, 23)) }
		];

		testSymbolInformationsFor(content, expected);

		const expected2: DocumentSymbol[] = [
			DocumentSymbol.create("html", undefined, SymbolKind.Field, Range.create(0, 0, 0, 37), Range.create(0, 0, 0, 37), [
				DocumentSymbol.create("body", undefined, SymbolKind.Field, Range.create(0, 6, 0, 30), Range.create(0, 6, 0, 30), [
					DocumentSymbol.create("div", undefined, SymbolKind.Field, Range.create(0, 12, 0, 23), Range.create(0, 12, 0, 23))
				])
			])
		];
		testDocumentSymbolsFor(content, expected2);
	});
});
