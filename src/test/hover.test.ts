/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { assertHover } from './hoverUtil';
import { MarkupContent } from 'vscode-languageserver-types';

suite('HTML Hover', () => {
	test('Single', function(): any {
		const descriptionAndReference =
			'The html element represents the root of an HTML document.' +
			'\n\n' +
			'[MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/html)';

		const htmlContent: MarkupContent = {
			kind: 'markdown',
			value: '```html\n<html>\n```\n' + descriptionAndReference
		};
		const closeHtmlContent: MarkupContent = {
			kind: 'markdown',
			value: '```html\n</html>\n```\n' + descriptionAndReference
		};

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
	});
});
