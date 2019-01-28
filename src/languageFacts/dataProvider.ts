/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { ITagData, IAttributeData, IValueData, IHTMLDataProvider } from '../htmlLanguageTypes';

export interface HTMLData {
	tags?: ITagData[];
	globalAttributes?: IAttributeData[];
	valueSetMap?: { [setName: string]: IValueData[] };
}

export class HTMLDataProvider implements IHTMLDataProvider {
	isApplicable() {
		return true;
	}

	private _tags: ITagData[];
	private _tagMap: { [t: string]: ITagData } = {};
	private _globalAttributes: IAttributeData[];
	private _attributeMap: { [a: string]: IAttributeData } = {};
	private _valueSetMap: { [setName: string]: IValueData[] } = {};

	constructor(private readonly id: string, customData: HTMLData) {
		this._tags = customData.tags || [];
		this._globalAttributes = customData.globalAttributes || [];

		this._tags.forEach(t => {
			this._tagMap[t.name] = t;
			t.attributes.forEach(a => {
				this._attributeMap[a.name] = a;
			});
		});

		this._globalAttributes.forEach(a => {
			this._attributeMap[a.name] = a;
		});

		if (customData.valueSetMap) {
			this._valueSetMap = customData.valueSetMap;
		}
	}

	getId() {
		return this.id;
	}

	provideTags() {
		return this._tags;
	}

	provideAttributes(tag: string) {
		const attributes: IAttributeData[] = [];
		const processAttribute = (a: IAttributeData) => {
			attributes.push({
				name: a.name,
				description: a.description,
				valueSet: a.valueSet
			});
		};

		if (this._tagMap[tag]) {
			this._tagMap[tag].attributes.forEach(a => {
				processAttribute(a);
			});
		}

		this._globalAttributes.forEach(ga => {
			processAttribute(ga);
		});

		return attributes;
	}

	provideValues(tag: string, attribute: string) {
		const values: IValueData[] = [];

		const processAttributes = (attributes: IAttributeData[]) => {
			attributes.forEach(a => {
				if (a.name === attribute) {
					if (a.values) {
						a.values.forEach(v => {
							values.push(v);
						});
					}
	
					if (a.valueSet) {
						if (this._valueSetMap[a.valueSet]) {
							this._valueSetMap[a.valueSet].forEach(v => {
								values.push(v);
							});
						}
					}
				}
			});
		};
		
		if (!this._tagMap[tag]) {
			return [];
		}

		processAttributes(this._tagMap[tag].attributes);
		processAttributes(this._globalAttributes);

		return values;
	}
}
