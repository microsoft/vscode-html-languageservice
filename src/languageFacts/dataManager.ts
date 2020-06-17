/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IHTMLDataProvider } from '../htmlLanguageTypes';
import { HTMLDataProvider } from './dataProvider';
import { htmlData } from './data/webCustomData';

export class HTMLDataManager {
	private dataProviders: IHTMLDataProvider[] = [];

	constructor(options?: { useDefaultDataProvider?: boolean, customDataProviders?: IHTMLDataProvider[] }) {
		this.setDataProviders(options?.useDefaultDataProvider !== false, options?.customDataProviders || []);
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
}