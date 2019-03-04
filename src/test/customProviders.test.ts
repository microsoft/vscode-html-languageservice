/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { getLanguageService, ITagData, IAttributeData, newHTMLDataProvider } from '../htmlLanguageService';

import { testCompletionFor } from './completionUtil';
import { assertHover } from './hoverUtil';

/**
 * Todo@Pine:
 * Once we have HTML attribute completion/hover documentation
 * Test them too
 */

suite('HTML Custom Tag Provider', () => {
	const tags: ITagData[] = [
		{
			name: 'foo',
			description: 'The foo element',
			attributes: [
				{ name: 'bar' },
				{
					name: 'baz',
					values: [
						{
							name: 'baz-val-1'
						}
					]
				}
			]
		}
	];

	const globalAttributes: IAttributeData[] = [
		{ name: 'fooAttr', description: 'Foo Attribute' },
		{ name: 'xattr', description: 'X attributes', valueSet: 'x' }
	];

	const valueSets = [
		{
			name: 'x',
			values: [
				{
					name: 'xval',
					description: 'x value'
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
			items: [{ label: 'foo', documentation: 'The foo element', resultText: '<foo' }]
		});

		testCompletionFor('<foo |', {
			items: [
				{ label: 'bar', resultText: `<foo bar="$1"` },
				{ label: 'baz', resultText: `<foo baz="$1"` },
				{ label: 'fooAttr', resultText: `<foo fooAttr="$1"` },
				{ label: 'xattr', resultText: `<foo xattr="$1"` }
			]
		});

		testCompletionFor('<foo baz=|', {
			items: [{ label: 'baz-val-1', resultText: `<foo baz="baz-val-1"` }]
		});

		testCompletionFor('<foo xattr=|', {
			items: [{ label: 'xval', resultText: `<foo xattr="xval"` }]
		});
	});

	test('Hover', () => {
		assertHover('<f|oo></foo>', '<foo>', 1);
	});
});
