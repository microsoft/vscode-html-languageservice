/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IHTMLDataProvider } from '../htmlLanguageTypes';
import { HTMLDataProvider } from './dataProvider';
import { htmlData } from './data/webCustomData';
import * as arrays from '../utils/arrays';

export class HTMLDataManager {
	private dataProviders: IHTMLDataProvider[] = [];

	constructor(options: { useDefaultDataProvider?: boolean, customDataProviders?: IHTMLDataProvider[] }) {
		this.setDataProviders(options.useDefaultDataProvider !== false, options.customDataProviders || []);
	}
	setDataProviders(builtIn: boolean, providers: IHTMLDataProvider[]) {
		this.dataProviders = [];
		if (builtIn) {
			this.dataProviders.push(new HTMLDataProvider('html5', htmlData));
		}
		this.dataProviders.push(...providers);
	}

	getDataProviders() {
		return this.dataProviders;
	}

	isVoidElement(e: string, voidElements: string[]) {
		return !!e && arrays.binarySearch(voidElements, e.toLowerCase(), (s1: string, s2: string) => s1.localeCompare(s2)) >= 0;
	}

	getVoidElements(languageId: string):string[];
	getVoidElements(dataProviders: IHTMLDataProvider[]): string[];
	getVoidElements(languageOrProviders: string| IHTMLDataProvider[]): string[] {
		const dataProviders = Array.isArray(languageOrProviders) ? languageOrProviders : this.getDataProviders().filter(p => p.isApplicable(languageOrProviders!));
		const voidTags: string[] = [];
		dataProviders.forEach((provider) => {
			provider.provideTags().filter(tag => tag.void).forEach(tag => voidTags.push(tag.name));
		});
		return voidTags.sort();
	}
}
