/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as arrays from '../utils/arrays';

// As defined in https://www.w3.org/TR/html5/syntax.html#void-elements
export const VOID_ELEMENTS: string[] = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];

export function isVoidElement(e: string): boolean {
	return !!e && arrays.binarySearch(VOID_ELEMENTS, e.toLowerCase(), (s1: string, s2: string) => s1.localeCompare(s2)) >= 0;
}