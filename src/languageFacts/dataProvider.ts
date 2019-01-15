/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { startsWith } from '../utils/strings';

export interface IHTMLDataProvider {
	getId(): string;
	isApplicable(languageId: string): boolean;
	collectTags(collector: (tag: string, description?: string) => void): void;
	collectAttributes(tag: string, collector: (attribute: string, type?: string, description?: string) => void): void;
	collectValues(tag: string, attribute: string, collector: (value: string) => void): void;
}

export interface IEntryData {
	name: string;
	description?: string;
}

export interface IAttributeEntryData extends IEntryData {
	values?: IEntryData[];
}

export interface ITagEntryData extends IEntryData {
	attributes: IAttributeEntryData[];
}

export interface HTMLData {
	tags?: ITagEntryData[];
	globalAttributes?: IAttributeEntryData[];
	valueSetMap?: { [setName: string]: IEntryData[] };
}

export class HTMLDataProvider implements IHTMLDataProvider {
	isApplicable() {
		return true;
	}

	private _tags: ITagEntryData[];
	private _tagMap: { [t: string]: ITagEntryData } = {};
	private _globalAttributes: IAttributeEntryData[];
	private _attributeMap: { [a: string]: IAttributeEntryData } = {};
	private _valueSetMap: { [setName: string]: IEntryData[] } = {};

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

	collectTags(collector: (tag: string, description?: string) => void) {
		this._tags.forEach(t => {
			collector(t.name, t.description);
		});
	}

	collectAttributes(tag: string, collector: (attribute: string, type?: string, description?: string) => void) {
		const processAttribute = (a: IAttributeEntryData) => {
			if (a.name.indexOf(':') !== -1) {
				const [aName, aSetName] = a.name.split(':');
				collector(aName, aSetName, a.description);
			} else {
				collector(a.name, undefined, a.description);
			}
		};

		if (this._tagMap[tag]) {
			this._tagMap[tag].attributes.forEach(a => {
				processAttribute(a);
			});
		}

		this._globalAttributes.forEach(ga => {
			processAttribute(ga);
		});
	}

	collectValues(tag: string, attribute: string, collector: (value: string) => void) {
		const processAttributes = (attributes: IAttributeEntryData[]) => {
			attributes.forEach(a => {
				if (a.values) {
					a.values.forEach(v => {
						collector(v.name);
					});
				}

				if (startsWith(a.name, attribute + ':')) {
					const setName = a.name.split(':')[1];
					if (setName === 'v') {
						collector(attribute);
					} else {
						if (setName && this._valueSetMap[setName]) {
							this._valueSetMap[setName].forEach(v => {
								collector(v.name);
							});
						}
					}
				}
			});
		};

		if (this._tagMap[tag]) {
			processAttributes(this._tagMap[tag].attributes);
		}

		processAttributes(this._globalAttributes);
	}
}
