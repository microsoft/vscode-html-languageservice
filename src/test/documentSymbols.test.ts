/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import assert = require('assert');
import htmlLanguageService = require('../htmlLanguageService');

import {SymbolInformation, SymbolKind, TextDocumentIdentifier, TextDocument, Range, Position, TextEdit} from 'vscode-languageserver-types';

suite('JSON Document Symbols', () => {

	function getOutline(value: string): SymbolInformation[] {
        let ls = htmlLanguageService.getLanguageService();
		var uri = 'test://test.json';
        var document = TextDocument.create(uri, 'json', 0, value);
        var htmlDoc = ls.parseHTMLDocument(document);
		return htmlLanguageService.getLanguageService().findDocumentSymbols(document, htmlDoc);
	}

	function assertOutline(value: string, expected: any[], message?: string) {
		var actual = getOutline(value);

		assert.equal(actual.length, expected.length, message);
		for (var i = 0; i < expected.length; i++) {
			assert.equal(actual[i].name, expected[i].label, message);
			assert.equal(actual[i].kind, expected[i].kind, message);
            assert.equal(actual[i].containerName, expected[i].containerName, message);
		}
	};


	test('No attrib', function() {
		var content = '<html><body><div></div></body></html>';

		var expected = [
			{ label: 'html', kind: SymbolKind.Field, containerName: '' },
			{ label: 'body', kind: SymbolKind.Field, containerName: 'html' },
			{ label: 'div', kind: SymbolKind.Field, containerName: 'body' }
		];

		assertOutline(content, expected);
	});

 	test('Id and classes', function() {
		var content = '<html id=\'root\'><body id="Foo" class="bar"><div class="a b"></div></body></html>';

		var expected = [
			{ label: 'html#root', kind: SymbolKind.Field, containerName: '' },
			{ label: 'body#Foo.bar', kind: SymbolKind.Field, containerName: 'html#root' },
            { label: 'div.a.b', kind: SymbolKind.Field, containerName: 'body#Foo.bar' },
		];

		assertOutline(content, expected);
	});

 	test('Self closing', function() {
		var content = '<html><br id="Foo"><br id=Bar></html>';

		var expected = [
			{ label: 'html', kind: SymbolKind.Field, containerName: '' },
			{ label: 'br#Foo', kind: SymbolKind.Field, containerName: 'html' },
            { label: 'br#Bar', kind: SymbolKind.Field, containerName: 'html' },
		];

		assertOutline(content, expected);
	});      


});