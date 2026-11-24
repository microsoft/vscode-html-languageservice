/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { suite, test } from 'node:test';
import * as assert from 'node:assert';
import { assertHover, assertHover2 } from './hoverUtil.js';
import { MarkupContent, Range, TextDocument } from '../htmlLanguageTypes.js';
import { getLanguageService } from '../htmlLanguageService.js';
import { BaselineImages } from '../languageFacts/dataProvider.js';

suite('HTML Hover', () => {
	for (const { name, value, codePoints } of [
		{ name: 'Afr', value: '\uD835\uDD04', codePoints: 'U+1D504' },
		{ name: 'Aopf', value: '\uD835\uDD38', codePoints: 'U+1D538' },
		{ name: 'NotEqualTilde', value: '\u2242\u0338', codePoints: 'U+2242 U+0338' },
		{ name: 'fjlig', value: 'fj', codePoints: 'U+0066 U+006A' },
		{ name: 'amp', value: '&', codePoints: 'U+0026' },
		{ name: 'nbsp', value: '\u00A0', codePoints: 'U+00A0' }
	]) {
		for (const format of ['markdown', 'plaintext'] as const) {
			test(`Entity ${name} code points with ${format} client`, () => {
				const ls = getLanguageService({ clientCapabilities: { textDocument: { hover: { contentFormat: [format] } } } });
				for (const source of [`<p>&${name};</p>`, `<p title="&${name};"></p>`]) {
					const document = TextDocument.create('test://test/test.html', 'html', 0, source);
					const start = source.indexOf('&') + 1;
					const hover = ls.doHover(document, document.positionAt(start + 1), ls.parseHTMLDocument(document));
					assert.deepStrictEqual(hover, {
						contents: `Character entity representing '${value}', unicode equivalent '${codePoints}'`,
						range: Range.create(document.positionAt(start), document.positionAt(start + name.length + 1))
					});
				}
			});
		}
	}

	test('Single', function (): any {
		const descriptionAndReference =
			'The html element represents the root of an HTML document.' +
			'\n\n' +
			`![Baseline icon](${BaselineImages.BASELINE_HIGH}) _Widely available across major browsers (Baseline since 2015)_` +
			'\n\n' +
			'[MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/html)';

		const htmlContent: MarkupContent = {
			kind: 'markdown',
			value: descriptionAndReference
		};
		const closeHtmlContent: MarkupContent = {
			kind: 'markdown',
			value: descriptionAndReference
		};

		const entityDescription = `Character entity representing '\u00A0', unicode equivalent 'U+00A0'`;


		assertHover('|<html></html>', void 0, void 0);
		assertHover('<|html></html>', htmlContent, 1);
		assertHover('<h|tml></html>', htmlContent, 1);
		assertHover('<htm|l></html>', htmlContent, 1);
		assertHover('<html|></html>', htmlContent, 1);
		assertHover('<html>|</html>', void 0, void 0);
		assertHover('<html><|/html>', void 0, void 0);
		assertHover('<html></|html>', closeHtmlContent, 8);
		assertHover('<html></h|tml>', closeHtmlContent, 8);
		assertHover('<html></ht|ml>', closeHtmlContent, 8);
		assertHover('<html></htm|l>', closeHtmlContent, 8);
		assertHover('<html></html|>', closeHtmlContent, 8);
		assertHover('<html></html>|', void 0, void 0);

		assertHover2('<html>|&nbsp;</html>', '', '');
		assertHover2('<html>&|nbsp;</html>', entityDescription, 'nbsp;');
		assertHover2('<html>&n|bsp;</html>', entityDescription, 'nbsp;');
		assertHover2('<html>&nb|sp;</html>', entityDescription, 'nbsp;');
		assertHover2('<html>&nbs|p;</html>', entityDescription, 'nbsp;');
		assertHover2('<html>&nbsp|;</html>', entityDescription, 'nbsp;');
		assertHover2('<html>&nbsp;|</html>', '', '');

		const noDescription: MarkupContent = {
			kind: 'markdown',
			value: '[MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/html)'
		};
		assertHover2('<html|></html>', noDescription, 'html', undefined, { documentation: false });

		const noReferences: MarkupContent = {
			kind: 'markdown',
			value: 'The html element represents the root of an HTML document.' +
					`\n\n![Baseline icon](${BaselineImages.BASELINE_HIGH}) _Widely available across major browsers (Baseline since 2015)_`
		};
		assertHover2('<html|></html>', noReferences, 'html', undefined, { references: false });
	});
});
