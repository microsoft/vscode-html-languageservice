/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { IHTMLDataProvider } from '../../htmlLanguageTypes';

const RAZOR_TAGS: { [tag: string]: string[] } = {
	a: ['asp-action', 'asp-controller', 'asp-fragment', 'asp-host', 'asp-protocol', 'asp-route'],
	div: ['asp-validation-summary'],
	form: ['asp-action', 'asp-controller', 'asp-anti-forgery'],
	input: ['asp-for', 'asp-format'],
	label: ['asp-for'],
	select: ['asp-for', 'asp-items'],
	span: ['asp-validation-for']
};

export function getRazorDataProvider(): IHTMLDataProvider {

	return {
		getId: () => 'razor',
		isApplicable: languageId => languageId === 'razor',
		provideTags() {
			return [];
		},
		provideAttributes(tag: string) {
			const attributes = RAZOR_TAGS[tag];

			if (!attributes) {
				return [];
			}

			return attributes.map(a => {
				return {
					name: a 
				};
			});
		},
		provideValues(tag: string, attribute: string) {
			return [];
		}
	};
}
