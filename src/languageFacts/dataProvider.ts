/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ITagData, IAttributeData, IValueData, IHTMLDataProvider, HTMLDataV1 } from '../htmlLanguageTypes';
import { MarkupContent } from 'vscode-languageserver-types';
import { normalizeMarkupContent } from '../utils/markup';

export class HTMLDataProvider implements IHTMLDataProvider {
	isApplicable() {
		return true;
	}

	private _tags: ITagData[] = [];
	private _tagMap: { [t: string]: ITagData } = {};
	private _globalAttributes: IAttributeData[];
	private _attributeMap: { [a: string]: IAttributeData } = {};
	private _valueSetMap: { [setName: string]: IValueData[] } = {};

	/**
	 * Currently, unversioned data uses the V1 implementation
	 * In the future when the provider handles multiple versions of HTML custom data,
	 * use the latest implementation for unversioned data
	 */
	constructor(private readonly id: string, customData: HTMLDataV1) {
		this._tags = customData.tags || [];
		this._globalAttributes = customData.globalAttributes || [];

		this._tags.forEach(t => {
			this._tagMap[t.name] = t;
			if (t.attributes) {
				t.attributes.forEach(a => {
					this._attributeMap[a.name] = a;
				});
			}
		});

		this._globalAttributes.forEach(a => {
			this._attributeMap[a.name] = a;
		});

		if (customData.valueSets) {
			customData.valueSets.forEach(vs => {
				this._valueSetMap[vs.name] = vs.values;
			});
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
			attributes.push(a);
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

/**
 * Generate Documentation used in hover/complete
 * From `documentation` and `references`
 */
export function generateDocumentation(item: ITagData | IAttributeData | IValueData, doesSupportMarkdown: boolean): MarkupContent {
	const result: MarkupContent = {
		kind: doesSupportMarkdown ? 'markdown' : 'plaintext',
		value: ''
	};
	
	if (item.description) {
		const normalizedDescription = normalizeMarkupContent(item.description);
		if (normalizedDescription) {
			result.value += normalizedDescription.value;
		}
	}
	
	if (item.references && item.references.length > 0) {
		result.value += `\n\n`;
		if (doesSupportMarkdown) {
			result.value += item.references.map(r => {
				return `[${r.name}](${r.url})`;
			}).join(' | ');
		} else {
			result.value += item.references.map(r => {
				return `${r.name}: ${r.url}`;
			}).join('\n');
		}
	}
	
	return result;
}