/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import * as assert from 'assert';
import * as htmlLanguageService from '../htmlLanguageService';
import { TextDocument } from 'vscode-languageserver-types';

export function assertHover(value: string, expectedHoverLabel: string | undefined, expectedHoverOffset: number | undefined): void {
	let offset = value.indexOf('|');
	value = value.substr(0, offset) + value.substr(offset + 1);

	let document = TextDocument.create('test://test/test.html', 'html', 0, value);

	let position = document.positionAt(offset);
	let ls = htmlLanguageService.getLanguageService();
	let htmlDoc = ls.parseHTMLDocument(document);

	let hover = ls.doHover(document, position, htmlDoc);
	assert.equal(hover && Array.isArray(hover.contents) && (<any> hover.contents[0]).value, expectedHoverLabel);
	assert.equal(hover && document.offsetAt(hover.range!.start), expectedHoverOffset);
}