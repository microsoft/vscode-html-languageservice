/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import {getHTML5TagProvider, getAngularTagProvider, getIonicTagProvider, IHTMLTagProvider} from '../parser/htmlTags';
import {getRazorTagProvider} from '../parser/razorTags';

export let allTagProviders : IHTMLTagProvider[] = [
	getHTML5TagProvider(),
	getAngularTagProvider(),
	getIonicTagProvider(),
	getRazorTagProvider()
];

export {IHTMLTagProvider as HTMLTagProvider} from '../parser/htmlTags';

export function registerTagProvider(tagProvider: IHTMLTagProvider) {
	const index = findIndex(allTagProviders, p => p.getId() === tagProvider.getId());
	if (index >= 0) {
		allTagProviders.splice(index, 1);
	}
	allTagProviders.push(tagProvider);
}

function findIndex(array: Array<any>, predicate: (item: any, index: number) => boolean) {
	for (let i = 0; i < array.length; i++) {
		if (predicate(array[i], i)) return i;
	}
	return -1;
}