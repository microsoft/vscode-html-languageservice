/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { assertHover, assertHover2 } from './hoverUtil';
import { MarkupContent } from '../htmlLanguageTypes';

suite('HTML Hover', () => {
	test('Single', function (): any {
		const descriptionAndReference =
			'The html element represents the root of an HTML document.' +
			'\n\n' +
			'[MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/html)';

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
			value: '[MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/html)'
		};
		assertHover2('<html|></html>', noDescription, 'html', undefined, { documentation: false });

		const noReferences: MarkupContent = {
			kind: 'markdown',
			value: 'The html element represents the root of an HTML document.'
		};
		assertHover2('<html|></html>', noReferences, 'html', undefined, { references: false });
	});
});
