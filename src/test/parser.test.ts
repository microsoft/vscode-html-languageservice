/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import { HTMLParser, Node } from '../parser/htmlParser';
import { HTMLDataManager } from '../languageFacts/dataManager';

suite('HTML Parser', () => {
	async function parse(text: string) {
		const htmlDataManager = new HTMLDataManager({});
		const voidElements = await htmlDataManager.getVoidElements('html');
		return new HTMLParser(htmlDataManager).parse(text, voidElements);
	}
	function toJSON(node: Node): any {
		return { tag: node.tag, start: node.start, end: node.end, endTagStart: node.endTagStart, closed: node.closed, children: node.children.map(toJSON) };
	}

	function toJSONWithAttributes(node: Node): any {
		return { tag: node.tag, attributes: node.attributes, children: node.children.map(toJSONWithAttributes) };
	}

	async function assertDocument(input: string, expected: any) {
		const document = await parse(input);
		assert.deepEqual(document.roots.map(toJSON), expected);
	}

	async function assertNodeBefore(input: string, offset: number, expectedTag: string | undefined) {
		const document = await parse(input);
		const node = document.findNodeBefore(offset);
		assert.equal(node ? node.tag : '', expectedTag, "offset " + offset);
	}

	async function assertAttributes(input: string, expected: any) {
		const document = await parse(input);
		assert.deepEqual(document.roots.map(toJSONWithAttributes), expected);
	}

	test('Simple', async () => {
		await assertDocument('<html></html>', [{ tag: 'html', start: 0, end: 13, endTagStart: 6, closed: true, children: [] }]);
		await assertDocument('<html><body></body></html>', [{ tag: 'html', start: 0, end: 26, endTagStart: 19, closed: true, children: [{ tag: 'body', start: 6, end: 19, endTagStart: 12, closed: true, children: [] }] }]);
		await assertDocument('<html><head></head><body></body></html>', [{ tag: 'html', start: 0, end: 39, endTagStart: 32, closed: true, children: [{ tag: 'head', start: 6, end: 19, endTagStart: 12, closed: true, children: [] }, { tag: 'body', start: 19, end: 32, endTagStart: 25, closed: true, children: [] }] }]);
	});

	test('SelfClose', async () => {
		await assertDocument('<br/>', [{ tag: 'br', start: 0, end: 5, endTagStart: void 0, closed: true, children: [] }]);
		await assertDocument('<div><br/><span></span></div>', [{ tag: 'div', start: 0, end: 29, endTagStart: 23, closed: true, children: [{ tag: 'br', start: 5, end: 10, endTagStart: void 0, closed: true, children: [] }, { tag: 'span', start: 10, end: 23, endTagStart: 16, closed: true, children: [] }] }]);
	});

	test('EmptyTag', async () => {
		await assertDocument('<meta>', [{ tag: 'meta', start: 0, end: 6, endTagStart: void 0, closed: true, children: [] }]);
		await assertDocument('<div><input type="button"><span><br><br></span></div>', [{
			tag: 'div', start: 0, end: 53, endTagStart: 47, closed: true, children: [
				{ tag: 'input', start: 5, end: 26, endTagStart: void 0, closed: true, children: [] },
				{ tag: 'span', start: 26, end: 47, endTagStart: 40, closed: true, children: [{ tag: 'br', start: 32, end: 36, endTagStart: void 0, closed: true, children: [] }, { tag: 'br', start: 36, end: 40, endTagStart: void 0, closed: true, children: [] }] }
			]
		}]);
	});

	test('MissingTags', async () => {
		await assertDocument('</meta>', []);
		await assertDocument('<div></div></div>', [{ tag: 'div', start: 0, end: 11, endTagStart: 5, closed: true, children: [] }]);
		await assertDocument('<div><div></div>', [{ tag: 'div', start: 0, end: 16, endTagStart: void 0, closed: false, children: [{ tag: 'div', start: 5, end: 16, endTagStart: 10, closed: true, children: [] }] }]);
		await assertDocument('<title><div></title>', [{ tag: 'title', start: 0, end: 20, endTagStart: 12, closed: true, children: [{ tag: 'div', start: 7, end: 12, endTagStart: void 0, closed: false, children: [] }] }]);
		await assertDocument('<h1><div><span></h1>', [{ tag: 'h1', start: 0, end: 20, endTagStart: 15, closed: true, children: [{ tag: 'div', start: 4, end: 15, endTagStart: void 0, closed: false, children: [{ tag: 'span', start: 9, end: 15, endTagStart: void 0, closed: false, children: [] }] }] }]);
	});

	test('MissingBrackets', async () => {
		await assertDocument('<div><div</div>', [{ tag: 'div', start: 0, end: 15, endTagStart: 9, closed: true, children: [{ tag: 'div', start: 5, end: 9, endTagStart: void 0, closed: false, children: [] }] }]);
		await assertDocument('<div><div\n</div>', [{ tag: 'div', start: 0, end: 16, endTagStart: 10, closed: true, children: [{ tag: 'div', start: 5, end: 10, endTagStart: void 0, closed: false, children: [] }] }]);
		await assertDocument('<div><div></div</div>', [{ tag: 'div', start: 0, end: 21, endTagStart: 15, closed: true, children: [{ tag: 'div', start: 5, end: 15, endTagStart: 10, closed: true, children: [] }] }]);
	});

	test('FindNodeBefore', async () => {
		const str = '<div><input type="button"><span><br><hr></span></div>';
		await assertNodeBefore(str, 0, void 0);
		await assertNodeBefore(str, 1, 'div');
		await assertNodeBefore(str, 5, 'div');
		await assertNodeBefore(str, 6, 'input');
		await assertNodeBefore(str, 25, 'input');
		await assertNodeBefore(str, 26, 'input');
		await assertNodeBefore(str, 27, 'span');
		await assertNodeBefore(str, 32, 'span');
		await assertNodeBefore(str, 33, 'br');
		await assertNodeBefore(str, 36, 'br');
		await assertNodeBefore(str, 37, 'hr');
		await assertNodeBefore(str, 40, 'hr');
		await assertNodeBefore(str, 41, 'hr');
		await assertNodeBefore(str, 42, 'hr');
		await assertNodeBefore(str, 47, 'span');
		await assertNodeBefore(str, 48, 'span');
		await assertNodeBefore(str, 52, 'span');
		await assertNodeBefore(str, 53, 'div');
	});

	test('FindNodeBefore - incomplete node', async () => {
		const str = '<div><span><br></div>';
		await assertNodeBefore(str, 15, 'br');
		await assertNodeBefore(str, 18, 'br');
		await assertNodeBefore(str, 21, 'div');
	});

	test('Attributes', async () => {
		const str = '<div class="these are my-classes" id="test"><span aria-describedby="test"></span></div>';
		await assertAttributes(str, [{
			tag: 'div',
			attributes: {
				class: '"these are my-classes"',
				id: '"test"'
			},
			children: [{
				tag: 'span',
				attributes: {
					'aria-describedby': '"test"'
				},
				children: []
			}]
		}]);
	});

	test('Attributes without value', async () => {
		const str = '<div checked id="test"></div>';
		await assertAttributes(str, [{
			tag: 'div',
			attributes: {
				checked: null,
				id: '"test"'
			},
			children: []
		}]);
	});
});
