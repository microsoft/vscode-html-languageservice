/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { getLanguageService, ITagData, IAttributeData, newHTMLDataProvider } from '../htmlLanguageService';

import { testCompletionFor } from './completionUtil';
import { assertHover, assertHover2 } from './hoverUtil';
import { IValueSet } from '../htmlLanguageTypes';

suite('HTML Custom Tag Provider', () => {
	const tags: ITagData[] = [
		{
			name: 'foo',
			description: {
				kind: 'markdown',
				value: 'The `<foo>` element'
			},
			attributes: [
				{
					name: 'bar',
					description: {
						kind: 'markdown',
						value: 'The `<foo bar>` attribute'
					},
					values: [
						{
							name: 'baz',
							description: {
								kind: 'markdown',
								value: 'The `<foo bar="baz">` attribute'
							}
						}
					]
				}
			]
		}
	];

	const globalAttributes: IAttributeData[] = [
		{ name: 'fooAttr', description: { kind: 'markdown', value: '`fooAttr` Attribute' } },
		{ name: 'xattr', description: { kind: 'markdown', value: '`xattr` attributes' }, valueSet: 'x' }
	];

	const valueSets: IValueSet[] = [
		{
			name: 'x',
			values: [
				{
					name: 'xval',
					description: {
						kind: 'markdown',
						value: '`xval` value'
					}
				}
			]
		}
	];

	const provider = newHTMLDataProvider('test', {
		version: 1,
		tags,
		globalAttributes,
		valueSets
	});

	getLanguageService({ customDataProviders: [provider] });

	test('Completion', () => {
		testCompletionFor('<|', {
			items: [{ label: 'foo', documentation: { kind: 'markdown', value: 'The `<foo>` element' }, resultText: '<foo' }]
		});

		testCompletionFor('<foo |', {
			items: [
				{
					label: 'bar',
					documentation: { kind: 'markdown', value: 'The `<foo bar>` attribute' },
					resultText: `<foo bar="$1"`
				},
				{
					label: 'fooAttr',
					documentation: { kind: 'markdown', value: '`fooAttr` Attribute' },
					resultText: `<foo fooAttr="$1"`
				},
				{
					label: 'xattr',
					documentation: { kind: 'markdown', value: '`xattr` attributes' },
					resultText: `<foo xattr="$1"`
				}
			]
		});

		testCompletionFor('<foo bar=|', {
			items: [
				{
					label: 'baz',
					documentation: { kind: 'markdown', value: 'The `<foo bar="baz">` attribute' },
					resultText: `<foo bar="baz"`
				}
			]
		});

		testCompletionFor('<foo xattr=|', {
			items: [
				{
					label: 'xval',
					documentation: { kind: 'markdown', value: '`xval` value' },
					resultText: `<foo xattr="xval"`
				}
			]
		});
	});

	test('Hover', () => {
		assertHover2('<f|oo></foo>', { kind: 'markdown', value: '```html\n<foo>\n```\nThe `<foo>` element' }, 'foo');

		assertHover2('<foo |bar></foo>', { kind: 'markdown', value: 'The `<foo bar>` attribute' }, 'bar');
		assertHover2('<foo |xattr></foo>', { kind: 'markdown', value: '`xattr` attributes' }, 'xattr');

		assertHover2('<foo bar="|baz"></foo>', { kind: 'markdown', value: 'The `<foo bar="baz">` attribute' }, '"baz"');
		assertHover2('<foo xattr="|xval"></foo>', { kind: 'markdown', value: '`xval` value' }, '"xval"');

		assertHover2('<foo foo="xval" xattr="|xval"></foo>', { kind: 'markdown', value: '`xval` value' }, '"xval"');
	});
});
