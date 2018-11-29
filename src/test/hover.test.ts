/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { assertHover } from "./hoverUtil";

suite('HTML Hover', () => {
	test('Single', function (): any {
		assertHover('|<html></html>', void 0, void 0);
		assertHover('<|html></html>', '<html>', 1);
		assertHover('<h|tml></html>', '<html>', 1);
		assertHover('<htm|l></html>', '<html>', 1);
		assertHover('<html|></html>', '<html>', 1);
		assertHover('<html>|</html>', void 0, void 0);
		assertHover('<html><|/html>', void 0, void 0);
		assertHover('<html></|html>', '</html>', 8);
		assertHover('<html></h|tml>', '</html>', 8);
		assertHover('<html></ht|ml>', '</html>', 8);
		assertHover('<html></htm|l>', '</html>', 8);
		assertHover('<html></html|>', '</html>', 8);
		assertHover('<html></html>|', void 0, void 0);
	});
});