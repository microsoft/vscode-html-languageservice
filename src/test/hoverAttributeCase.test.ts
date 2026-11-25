/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { suite, test } from 'node:test';
import * as assert from 'node:assert';
import { getLanguageService, newHTMLDataProvider } from '../htmlLanguageService.js';
import { Hover, LanguageService, TextDocument } from '../htmlLanguageService.js';

function getAttributeHover(service: LanguageService, tag: string, attribute: string): Hover | null {
	const text = `<${tag} ${attribute}="">`;
	const document = TextDocument.create('test://test/test.html', 'html', 0, text);
	return service.doHover(document, document.positionAt(tag.length + 3), service.parseHTMLDocument(document));
}

suite('HTML attribute hover casing', () => {
	for (const format of ['markdown', 'plaintext'] as const) {
		const clientCapabilities = { textDocument: { hover: { contentFormat: [format] } } };
		const service = getLanguageService({ clientCapabilities });

		for (const [tag, attribute] of [['a', 'href'], ['input', 'hidden'], ['div', 'aria-label']]) {
			test(`${tag} ${attribute} documentation with ${format} client`, () => {
				const expected = getAttributeHover(service, tag, attribute);
				assert.ok(expected, 'lowercase attribute should have documentation');
				for (const spelling of [attribute.toUpperCase(), attribute.replace(/[a-z]/g, (letter, index) => index % 2 ? letter : letter.toUpperCase())]) {
					assert.deepStrictEqual(getAttributeHover(service, tag.toUpperCase(), spelling), expected);
				}
			});
		}

		const customService = getLanguageService({
			clientCapabilities,
			useDefaultDataProvider: false,
			customDataProviders: [newHTMLDataProvider('test', {
				version: 1.1,
				tags: [{ name: 'my-element', attributes: [{ name: 'OwnAttr', description: 'Tag-specific attribute.' }] }],
				globalAttributes: [{ name: 'CustomAttr', description: 'Global attribute.' }]
			})]
		});

		for (const attribute of ['OwnAttr', 'CustomAttr']) {
			test(`custom ${attribute} documentation with ${format} client`, () => {
				const expected = getAttributeHover(customService, 'my-element', attribute);
				assert.ok(expected, 'exact provider attribute name should have documentation');
				for (const spelling of [attribute, attribute.toLowerCase(), attribute.toUpperCase()]) {
					assert.deepStrictEqual(getAttributeHover(customService, 'MY-ELEMENT', spelling), expected);
				}
			});
		}

		test(`does not match longer attribute names with ${format} client`, () => {
			for (const attribute of ['data-href', 'href-extra']) {
				assert.strictEqual(getAttributeHover(service, 'a', attribute), null);
			}
			for (const attribute of ['data-ownattr', 'customattr-extra']) {
				assert.strictEqual(getAttributeHover(customService, 'my-element', attribute), null);
			}
		});
	}
});
