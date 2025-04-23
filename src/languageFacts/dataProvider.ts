/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ITagData, IAttributeData, IValueData, IHTMLDataProvider, HTMLDataV1, MarkupContent, BaselineStatus } from '../htmlLanguageTypes';
import { normalizeMarkupContent } from '../utils/markup';

export const BaselineImages = {
	BASELINE_LIMITED: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCA1NDAgMzAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxzdHlsZT4KICAgIC5ncmF5LXNoYXBlIHsKICAgICAgZmlsbDogI0M2QzZDNjsgLyogTGlnaHQgbW9kZSAqLwogICAgfQoKICAgIEBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHsKICAgICAgLmdyYXktc2hhcGUgewogICAgICAgIGZpbGw6ICM1NjU2NTY7IC8qIERhcmsgbW9kZSAqLwogICAgICB9CiAgICB9CiAgPC9zdHlsZT4KICA8cGF0aCBkPSJNMTUwIDBMMjQwIDkwTDIxMCAxMjBMMTIwIDMwTDE1MCAwWiIgZmlsbD0iI0YwOTQwOSIvPgogIDxwYXRoIGQ9Ik00MjAgMzBMNTQwIDE1MEw0MjAgMjcwTDM5MCAyNDBMNDgwIDE1MEwzOTAgNjBMNDIwIDMwWiIgY2xhc3M9ImdyYXktc2hhcGUiLz4KICA8cGF0aCBkPSJNMzMwIDE4MEwzMDAgMjEwTDM5MCAzMDBMNDIwIDI3MEwzMzAgMTgwWiIgZmlsbD0iI0YwOTQwOSIvPgogIDxwYXRoIGQ9Ik0xMjAgMzBMMTUwIDYwTDYwIDE1MEwxNTAgMjQwTDEyMCAyNzBMMCAxNTBMMTIwIDMwWiIgY2xhc3M9ImdyYXktc2hhcGUiLz4KICA8cGF0aCBkPSJNMzkwIDBMNDIwIDMwTDE1MCAzMDBMMTIwIDI3MEwzOTAgMFoiIGZpbGw9IiNGMDk0MDkiLz4KPC9zdmc+',
	BASELINE_LOW: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCA1NDAgMzAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxzdHlsZT4KICAgIC5ibHVlLXNoYXBlIHsKICAgICAgZmlsbDogI0E4QzdGQTsgLyogTGlnaHQgbW9kZSAqLwogICAgfQoKICAgIEBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHsKICAgICAgLmJsdWUtc2hhcGUgewogICAgICAgIGZpbGw6ICMyRDUwOUU7IC8qIERhcmsgbW9kZSAqLwogICAgICB9CiAgICB9CgogICAgLmRhcmtlci1ibHVlLXNoYXBlIHsKICAgICAgICBmaWxsOiAjMUI2RUYzOwogICAgfQoKICAgIEBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHsKICAgICAgICAuZGFya2VyLWJsdWUtc2hhcGUgewogICAgICAgICAgICBmaWxsOiAjNDE4NUZGOwogICAgICAgIH0KICAgIH0KCiAgPC9zdHlsZT4KICA8cGF0aCBkPSJNMTUwIDBMMTgwIDMwTDE1MCA2MEwxMjAgMzBMMTUwIDBaIiBjbGFzcz0iYmx1ZS1zaGFwZSIvPgogIDxwYXRoIGQ9Ik0yMTAgNjBMMjQwIDkwTDIxMCAxMjBMMTgwIDkwTDIxMCA2MFoiIGNsYXNzPSJibHVlLXNoYXBlIi8+CiAgPHBhdGggZD0iTTQ1MCA2MEw0ODAgOTBMNDUwIDEyMEw0MjAgOTBMNDUwIDYwWiIgY2xhc3M9ImJsdWUtc2hhcGUiLz4KICA8cGF0aCBkPSJNNTEwIDEyMEw1NDAgMTUwTDUxMCAxODBMNDgwIDE1MEw1MTAgMTIwWiIgY2xhc3M9ImJsdWUtc2hhcGUiLz4KICA8cGF0aCBkPSJNNDUwIDE4MEw0ODAgMjEwTDQ1MCAyNDBMNDIwIDIxMEw0NTAgMTgwWiIgY2xhc3M9ImJsdWUtc2hhcGUiLz4KICA8cGF0aCBkPSJNMzkwIDI0MEw0MjAgMjcwTDM5MCAzMDBMMzYwIDI3MEwzOTAgMjQwWiIgY2xhc3M9ImJsdWUtc2hhcGUiLz4KICA8cGF0aCBkPSJNMzMwIDE4MEwzNjAgMjEwTDMzMCAyNDBMMzAwIDIxMEwzMzAgMTgwWiIgY2xhc3M9ImJsdWUtc2hhcGUiLz4KICA8cGF0aCBkPSJNOTAgNjBMMTIwIDkwTDkwIDEyMEw2MCA5MEw5MCA2MFoiIGNsYXNzPSJibHVlLXNoYXBlIi8+CiAgPHBhdGggZD0iTTM5MCAwTDQyMCAzMEwxNTAgMzAwTDAgMTUwTDMwIDEyMEwxNTAgMjQwTDM5MCAwWiIgY2xhc3M9ImRhcmtlci1ibHVlLXNoYXBlIi8+Cjwvc3ZnPg==',
	BASELINE_HIGH: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCA1NDAgMzAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxzdHlsZT4KICAgIC5ncmVlbi1zaGFwZSB7CiAgICAgIGZpbGw6ICNDNEVFRDA7IC8qIExpZ2h0IG1vZGUgKi8KICAgIH0KCiAgICBAbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7CiAgICAgIC5ncmVlbi1zaGFwZSB7CiAgICAgICAgZmlsbDogIzEyNTIyNTsgLyogRGFyayBtb2RlICovCiAgICAgIH0KICAgIH0KICA8L3N0eWxlPgogIDxwYXRoIGQ9Ik00MjAgMzBMMzkwIDYwTDQ4MCAxNTBMMzkwIDI0MEwzMzAgMTgwTDMwMCAyMTBMMzkwIDMwMEw1NDAgMTUwTDQyMCAzMFoiIGNsYXNzPSJncmVlbi1zaGFwZSIvPgogIDxwYXRoIGQ9Ik0xNTAgMEwzMCAxMjBMNjAgMTUwTDE1MCA2MEwyMTAgMTIwTDI0MCA5MEwxNTAgMFoiIGNsYXNzPSJncmVlbi1zaGFwZSIvPgogIDxwYXRoIGQ9Ik0zOTAgMEw0MjAgMzBMMTUwIDMwMEwwIDE1MEwzMCAxMjBMMTUwIDI0MEwzOTAgMFoiIGZpbGw9IiMxRUE0NDYiLz4KPC9zdmc+'
}

function getEntryBaselineImage(status?: BaselineStatus) {
	if (!status) {
		return '';
	}

	let baselineImg: string;
	switch (status?.baseline) {
		case 'low':
			baselineImg = BaselineImages.BASELINE_LOW;
			break;
		case 'high':
			baselineImg = BaselineImages.BASELINE_HIGH;
			break;
		default:
			baselineImg = BaselineImages.BASELINE_LIMITED;
	}
	return `![Baseline icon](${baselineImg})`;
}

function getEntryBaselineStatus(status?: BaselineStatus, browsers?: string[]): string {
	if (!status) {
		return '';
	}
	if (status.baseline === false) {
		const missingBrowsers = getMissingBaselineBrowsers(browsers);
		let status = `Limited availability across major browsers`;
		if (missingBrowsers) {
			status += ` (Not fully implemented in ${missingBrowsers})`;
		}
		return status;
	}

	const baselineYear = status.baseline_low_date?.split('-')[0];
	return `${status.baseline === 'low' ? 'Newly' : 'Widely'} available across major browsers (Baseline since ${baselineYear})`;
}

export const browserNames = {
	'C': {
		name: 'Chrome',
		platform: 'desktop'
	},
	'CA': {
		name: 'Chrome',
		platform: 'Android'
	},
	'E': {
		name: 'Edge',
		platform: 'desktop'
	},
	'FF': {
		name: 'Firefox',
		platform: 'desktop'
	},
	'FFA': {
		name: 'Firefox',
		platform: 'Android'
	},
	'S': {
		name: 'Safari',
		platform: 'macOS'
	},
	'SM': {
		name: 'Safari',
		platform: 'iOS'
	}
};

const shortCompatPattern = /(E|FFA|FF|SM|S|CA|C|IE|O)([\d|\.]+)?/;

// TODO: Remove "as any" when tsconfig supports es2021+
const missingBaselineBrowserFormatter = new (Intl as any).ListFormat("en", {
	style: "long",
	type: "disjunction",
});

/**
 * Input is like [E12, FF28, FM28, C29, CM29, IE11, O16]
 * Output is like `Safari`
 */
export function getMissingBaselineBrowsers(browsers?: string[]): string {
	if (!browsers) {
		return '';
	}
	const missingBrowsers = new Map(Object.entries(browserNames));
	for (const shortCompatString of browsers) {
		const match = shortCompatPattern.exec(shortCompatString);
		if (!match) {
			continue;
		}
		const browser = match[1];
		missingBrowsers.delete(browser);
	}

	return missingBaselineBrowserFormatter.format(Object.values(Array.from(missingBrowsers.entries()).reduce((browsers: Record<string, string>, [browserId, browser]) => {
		if (browser.name in browsers || browserId === 'E') {
			browsers[browser.name] = browser.name;
			return browsers;
		}
		// distinguish between platforms when applicable 
		browsers[browser.name] = `${browser.name} on ${browser.platform}`;
		return browsers;
	}, {})));
}

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

	if (item.status && settings.documentation !== false) {
		if (result.value.length) {
			result.value += `\n\n`;
		}
		const baselineStatus = getEntryBaselineStatus(item.status, item.browsers);
		if (doesSupportMarkdown) {
			result.value += `${getEntryBaselineImage(item.status)} _${baselineStatus}_`;
		} else {
			result.value += baselineStatus;
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
