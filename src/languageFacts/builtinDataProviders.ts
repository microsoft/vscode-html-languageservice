/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IHTMLDataProvider } from '../htmlLanguageTypes';
import { HTMLDataProvider } from './dataProvider';
import { htmlData } from './data/webCustomData';

export const builtinDataProviders: IHTMLDataProvider[] = [
	new HTMLDataProvider('html5', htmlData)
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