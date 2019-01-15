/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { getRazorDataProvider } from './data/razor';
import { getHTML5DataProvider } from './data/html5';
import { IHTMLDataProvider, HTMLData, HTMLDataProvider } from './dataProvider';

export const builtinDataProviders: IHTMLDataProvider[] = [
	getHTML5DataProvider()
];

const customDataProviders: IHTMLDataProvider[] = [
	getRazorDataProvider()
];

export function getAllDataProviders(): IHTMLDataProvider[] {
	return builtinDataProviders.concat(customDataProviders);
}

export function addCustomData(customData: HTMLData) {
	customDataProviders.push(new HTMLDataProvider('customData', customData));
}
