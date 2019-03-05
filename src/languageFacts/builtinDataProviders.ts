/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { getHTML5DataProvider } from './data/html5';
import { IHTMLDataProvider } from '../htmlLanguageTypes';

export const builtinDataProviders: IHTMLDataProvider[] = [
	getHTML5DataProvider()
];

const customDataProviders: IHTMLDataProvider[] = [];

export function getAllDataProviders(): IHTMLDataProvider[] {
	return builtinDataProviders.concat(customDataProviders);
}

export function handleCustomDataProviders(providers: IHTMLDataProvider[]) {
	providers.forEach(p => {
		customDataProviders.push(p);
	});
}