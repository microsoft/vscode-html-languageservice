/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { getRazorDataProvider } from './data/razor';
import { getHTML5DataProvider } from './data/html5';
import { IHTMLDataProvider, HTMLData, HTMLDataProvider, ITagEntryData, IAttributeEntryData, IEntryData } from './dataProvider';

export const builtinDataProviders: IHTMLDataProvider[] = [
	getHTML5DataProvider()
];

const customDataProviders: IHTMLDataProvider[] = [
	getRazorDataProvider()
];

export function getAllDataProviders(): IHTMLDataProvider[] {
	return builtinDataProviders.concat(customDataProviders);
}

export function handleCustomData(customDataCollections: HTMLData[]) {
	let allTags: ITagEntryData[] = [];
	let allGlobalAttributes: IAttributeEntryData[] = [];
	let allValueSetMap: { [key: string]: IEntryData[] } = {};
	
	customDataCollections.forEach(customData => {
		const { tags, globalAttributes, valueSetMap } = customData;
		if (tags) {
			allTags = allTags.concat(tags);
		}
		if (globalAttributes) {
			allGlobalAttributes = allGlobalAttributes.concat(globalAttributes);
		}
		if (valueSetMap) {
			for (let v in valueSetMap) {
				allValueSetMap[v] = valueSetMap[v];
			}
		}
	});

	customDataProviders.push(new HTMLDataProvider('customData', {
		tags: allTags,
		globalAttributes: allGlobalAttributes,
		valueSetMap: allValueSetMap
	}));
}
