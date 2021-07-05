/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { getLanguageService, ITagData, IAttributeData, newHTMLDataProvider } from '../htmlLanguageService';

import { testCompletionFor } from './completionUtil';
import { assertHover2 } from './hoverUtil';
import { IValueSet, LanguageServiceOptions } from '../htmlLanguageTypes';

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
		},
		{
			name: 'Bar',
			description: {
				kind: 'markdown',
				value: 'The `<Bar>` element'
			},
			attributes: [
				{
					name: 'Xoo'
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
	const languageOptions: LanguageServiceOptions = { customDataProviders: [provider] };

	getLanguageService({ customDataProviders: [provider] });

	test('Completion', () => {
		testCompletionFor('<|', {
			items: [
				{ label: 'foo', documentation: { kind: 'markdown', value: 'The `<foo>` element' }, resultText: '<foo' },
				{ label: 'Bar', documentation: { kind: 'markdown', value: 'The `<Bar>` element' }, resultText: '<Bar' }
			]
		}, undefined, languageOptions);

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
		}, undefined, languageOptions);

		testCompletionFor('<foo bar=|', {
			items: [
				{
					label: 'baz',
					documentation: { kind: 'markdown', value: 'The `<foo bar="baz">` attribute' },
					resultText: `<foo bar="baz"`
				}
			]
		}, undefined, languageOptions);

		testCompletionFor('<foo xattr=|', {
			items: [
				{
					label: 'xval',
					documentation: { kind: 'markdown', value: '`xval` value' },
					resultText: `<foo xattr="xval"`
				}
			]
		}, undefined, languageOptions);

		testCompletionFor('<Bar |', {
			items: [
				{
					label: 'Xoo'
				}
			]
		}, undefined, languageOptions);

		// test global attributes
		testCompletionFor('<other |', {
			items: [
				{
					label: 'fooAttr',
					documentation: { kind: 'markdown', value: '`fooAttr` Attribute' },
					resultText: `<other fooAttr="$1"`
				},
				{
					label: 'xattr',
					documentation: { kind: 'markdown', value: '`xattr` attributes' },
					resultText: `<other xattr="$1"`
				}
			]
		}, undefined, languageOptions);

		testCompletionFor('<other xattr=|', {
			items: [
				{
					label: 'xval',
					documentation: { kind: 'markdown', value: '`xval` value' },
					resultText: `<other xattr="xval"`
				}
			]
		}, undefined, languageOptions);
	});

	test('Hover', () => {
		assertHover2('<f|oo></foo>', { kind: 'markdown', value: 'The `<foo>` element' }, 'foo', languageOptions);

		assertHover2('<foo |bar></foo>', { kind: 'markdown', value: 'The `<foo bar>` attribute' }, 'bar', languageOptions);
		assertHover2('<foo |xattr></foo>', { kind: 'markdown', value: '`xattr` attributes' }, 'xattr', languageOptions);

		assertHover2('<foo bar="|baz"></foo>', { kind: 'markdown', value: 'The `<foo bar="baz">` attribute' }, '"baz"', languageOptions);
		assertHover2('<foo xattr="|xval"></foo>', { kind: 'markdown', value: '`xval` value' }, '"xval"', languageOptions);

		assertHover2('<foo foo="xval" xattr="|xval"></foo>', { kind: 'markdown', value: '`xval` value' }, '"xval"', languageOptions);
	});
});
