/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ITagData, IAttributeData, IValueData, IHTMLDataProvider, HTMLDataV1, MarkupContent } from '../htmlLanguageTypes';
import { normalizeMarkupContent } from '../utils/markup';

export class HTMLDataProvider implements IHTMLDataProvider {
	isApplicable() {
		return true;
	}

	private _tags: ITagData[] = [];
	private _tagMap: { [t: string]: ITagData } = {};
	private _globalAttributes: IAttributeData[];
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
			this._tagMap[t.name.toLowerCase()] = t;
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

		const tagEntry = this._tagMap[tag.toLowerCase()];
		if (tagEntry) {
			tagEntry.attributes.forEach(processAttribute);
		}
		this._globalAttributes.forEach(processAttribute);

		return attributes;
	}

	provideValues(tag: string, attribute: string) {
		const values: IValueData[] = [];

		attribute = attribute.toLowerCase();

		const processAttributes = (attributes: IAttributeData[]) => {
			attributes.forEach(a => {
				if (a.name.toLowerCase() === attribute) {
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

		const tagEntry = this._tagMap[tag.toLowerCase()];
		if (tagEntry) {
			processAttributes(tagEntry.attributes);
		}
		processAttributes(this._globalAttributes);

		return values;
	}
}

/**
 * Generate Documentation used in hover/complete
 * From `documentation` and `references`
 */
export function generateDocumentation(item: ITagData | IAttributeData | IValueData, settings: { documentation?: boolean; references?: boolean; } = {}, doesSupportMarkdown: boolean): MarkupContent | undefined {
	const result: MarkupContent = {
		kind: doesSupportMarkdown ? 'markdown' : 'plaintext',
		value: ''
	};

	if (item.description && settings.documentation !== false) {
		const normalizedDescription = normalizeMarkupContent(item.description);
		if (normalizedDescription) {
			result.value += normalizedDescription.value;
		}
	}

	if (item.references && item.references.length > 0 && settings.references !== false) {
		if (result.value.length) {
			result.value += `\n\n`;
		}
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

	if (result.value === '') {
		return undefined;
	}

	return result;
}