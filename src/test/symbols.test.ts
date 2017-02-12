/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import * as assert from 'assert';
import * as htmlLanguageService from '../htmlLanguageService';

import { TextDocument, SymbolInformation, SymbolKind, Location, Range, Position } from 'vscode-languageserver-types';

suite('HTML Symbols', () => {

    const TEST_URI = "test://test/test.html";

	function asPromise<T>(result: T): Promise<T> {
		return Promise.resolve(result);
	}

    let assertSymbols = function (symbols: SymbolInformation[], expected: SymbolInformation[]) {
        assert.deepEqual(symbols, expected);
    }

    let testSymbolsFor = function(value: string, expected: SymbolInformation[]) {
        let ls = htmlLanguageService.getLanguageService();
		let document = TextDocument.create(TEST_URI, 'html', 0, value);
		let htmlDoc = ls.parseHTMLDocument(document);
        let symbols = ls.findDocumentSymbols(document, htmlDoc);
        assertSymbols(symbols, expected);
    }

    test('Simple', () => {
        testSymbolsFor('<div></div>', [<SymbolInformation>{ containerName: '', name: 'div', kind: <SymbolKind>SymbolKind.Field, location: Location.create(TEST_URI, Range.create(0, 0, 0, 11)) }]);
        testSymbolsFor('<div><input checked id="test" class="checkbox"></div>', [{ containerName: '', name: 'div', kind: <SymbolKind>SymbolKind.Field, location: Location.create(TEST_URI, Range.create(0, 0, 0, 53)) },
            { containerName: 'div', name: 'input#test.checkbox', kind: <SymbolKind>SymbolKind.Field, location: Location.create(TEST_URI, Range.create(0, 5, 0, 47)) }]);
    });
})
