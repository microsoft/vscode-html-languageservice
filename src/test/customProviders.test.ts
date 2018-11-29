/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { ITagSet, IAttributeSet, getLanguageService } from '../htmlLanguageService';
import { HTMLTagSpecification } from '../parser/htmlTags';

import { testCompletionFor } from './completionUtil';
import { assertHover } from "./hoverUtil";

/**
 * Todo@Pine:
 * Once we have HTML attribute completion/hover documentation
 * Test them too
 */

suite('HTML Custom Tag Provider', () => {
	const tagSet: ITagSet = {
		foo: new HTMLTagSpecification('The foo element', ['bar', 'baz'])
	};

	const attributeSet: IAttributeSet = {
		fooAttr: { label: 'fooAttr', description: 'Foo Attribute' }
	};

	/**
	 * Todo@Pine:
	 * Currently initializing a LS with custom tag/attr will make all Language Service instances
	 * Make each Language Service stateful and containing its own custom tag/attr sets
	 */ 
	getLanguageService({
		customTags: tagSet,
		customAttributes: attributeSet
	});

	test('Completion', () => {
		testCompletionFor('<|', {
			items: [
				{ label: 'foo', documentation: 'The foo element', resultText: '<foo' }
			]
		});

		testCompletionFor('<foo |', {
			items: [
				{ label: 'bar', resultText: `<foo bar="$1"` },
				{ label: 'baz', resultText: `<foo baz="$1"` },
				{ label: 'fooAttr', resultText: `<foo fooAttr="$1"` }
			]
		});
	});

	test('Hover', () => {
		assertHover('<f|oo></foo>', '<foo>', 1);
	});
});
