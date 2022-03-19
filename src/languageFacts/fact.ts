/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as arrays from '../utils/arrays';
import { HTMLDataManager } from './dataManager';
import { IHTMLDataProvider } from '../htmlLanguageTypes';
export function isVoidElement(e: string, voidElements: string[]): boolean {
	return !!e && arrays.binarySearch(voidElements, e.toLowerCase(), (s1: string, s2: string) => s1.localeCompare(s2)) >= 0;
}

export function getVoidElements(dataManager: HTMLDataManager, languageId: string):string[];
export function getVoidElements(dataProviders: IHTMLDataProvider[]): string[];
export function getVoidElements(dataManager: HTMLDataManager | IHTMLDataProvider[], languageId?: string): string[] {
	const dataProviders = Array.isArray(dataManager) ? dataManager : dataManager.getDataProviders().filter(p => p.isApplicable(languageId!));
	const voidTags: string[] = [];
	dataProviders.forEach((provider) => {
		provider.provideTags().filter(tag => tag.void).forEach(tag => voidTags.push(tag.name));
	});
	return voidTags.sort();
}
