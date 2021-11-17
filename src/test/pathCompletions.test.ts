/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import 'mocha';
import * as assert from 'assert';
import * as path from 'path';
import { URI } from 'vscode-uri';
import { getDocumentContext } from './testUtil/documentContext';
import { CompletionItemKind, TextDocument, getLanguageService } from '../htmlLanguageService';
import { getFsProvider } from './testUtil/fsProvider';
import { assertCompletion } from './completionUtil';
export interface ItemDescription {
	label: string;
	documentation?: string;
	kind?: CompletionItemKind;
	resultText?: string;
	command?: { title: string, command: string };
	notAvailable?: boolean;
}

const testUri = 'test://test/test.html';
const testWorkspaceFolderUri = 'test://test';


async function testCompletion2For(value: string, expected: { count?: number, items?: ItemDescription[] }, uri = testUri, workspaceFolderUri = testWorkspaceFolderUri) {
	let offset = value.indexOf('|');
	value = value.substr(0, offset) + value.substr(offset + 1);


	let document = TextDocument.create(uri, 'html', 0, value);
	let position = document.positionAt(offset);

	const ls = getLanguageService({ fileSystemProvider: getFsProvider() });

	const context = getDocumentContext(workspaceFolderUri);

	const htmlDocument = ls.parseHTMLDocument(document);

	const list = await ls.doComplete2(document, position, htmlDocument, context);

	if (expected.count) {
		assert.equal(list.items.length, expected.count);
	}
	if (expected.items) {
		for (let item of expected.items) {
			assertCompletion(list, item, document);
		}
	}
}


suite('HTML Path Completion', () => {
	const triggerSuggestCommand = {
		title: 'Suggest',
		command: 'editor.action.triggerSuggest'
	};

	const fixtureRoot = path.resolve(__dirname, '../../../src/test/pathCompletionFixtures');
	const workspaceFolderUri = URI.file(fixtureRoot).toString();
	const indexHtmlUri = URI.file(path.resolve(fixtureRoot, 'index.html')).toString();
	const aboutHtmlUri = URI.file(path.resolve(fixtureRoot, 'about/about.html')).toString();

	test('Basics - Correct label/kind/result/command', async () => {
		await testCompletion2For('<script src="./|">', {
			items: [
				{ label: 'about/', kind: CompletionItemKind.Folder, resultText: '<script src="./about/">', command: triggerSuggestCommand },
				{ label: 'index.html', kind: CompletionItemKind.File, resultText: '<script src="./index.html">' },
				{ label: 'src/', kind: CompletionItemKind.Folder, resultText: '<script src="./src/">', command: triggerSuggestCommand }
			]
		}, indexHtmlUri);
	});

	test('Basics - Single Quote', async () => {
		await testCompletion2For(`<script src='./|'>`, {
			items: [
				{ label: 'about/', kind: CompletionItemKind.Folder, resultText: `<script src='./about/'>`, command: triggerSuggestCommand },
				{ label: 'index.html', kind: CompletionItemKind.File, resultText: `<script src='./index.html'>` },
				{ label: 'src/', kind: CompletionItemKind.Folder, resultText: `<script src='./src/'>`, command: triggerSuggestCommand }
			]
		}, indexHtmlUri);
	});

	test('No completion for remote paths', async () => {
		await testCompletion2For('<script src="http:">', { items: [] });
		await testCompletion2For('<script src="http:/|">', { items: [] });
		await testCompletion2For('<script src="http://|">', { items: [] });
		await testCompletion2For('<script src="https:|">', { items: [] });
		await testCompletion2For('<script src="https:/|">', { items: [] });
		await testCompletion2For('<script src="https://|">', { items: [] });
		await testCompletion2For('<script src="//|">', { items: [] });
	});

	test('Relative Path', async () => {
		await testCompletion2For('<script src="../|">', {
			items: [
				{ label: 'about/', resultText: '<script src="../about/">' },
				{ label: 'index.html', resultText: '<script src="../index.html">' },
				{ label: 'src/', resultText: '<script src="../src/">' }
			]
		}, aboutHtmlUri);

		await testCompletion2For('<script src="../src/|">', {
			items: [
				{ label: 'feature.js', resultText: '<script src="../src/feature.js">' },
				{ label: 'test.js', resultText: '<script src="../src/test.js">' },
			]
		}, aboutHtmlUri);
	});

	test('Absolute Path', async () => {
		await testCompletion2For('<script src="/|">', {
			items: [
				{ label: 'about/', resultText: '<script src="/about/">' },
				{ label: 'index.html', resultText: '<script src="/index.html">' },
				{ label: 'src/', resultText: '<script src="/src/">' },
			]
		}, indexHtmlUri, workspaceFolderUri);

		await testCompletion2For('<script src="/src/|">', {
			items: [
				{ label: 'feature.js', resultText: '<script src="/src/feature.js">' },
				{ label: 'test.js', resultText: '<script src="/src/test.js">' },
			]
		}, aboutHtmlUri, workspaceFolderUri);
	});

	test('Empty Path Value', async () => {
		// document: index.html
		await testCompletion2For('<script src="|">', {
			items: [
				{ label: 'about/', resultText: '<script src="about/">' },
				{ label: 'index.html', resultText: '<script src="index.html">' },
				{ label: 'src/', resultText: '<script src="src/">' },
			]
		}, indexHtmlUri);
		// document: about.html
		await testCompletion2For('<script src="|">', {
			items: [
				{ label: 'about.css', resultText: '<script src="about.css">' },
				{ label: 'about.html', resultText: '<script src="about.html">' },
				{ label: 'media/', resultText: '<script src="media/">' },
			]
		}, aboutHtmlUri);
	});
	test('Incomplete Path', async () => {
		await testCompletion2For('<script src="/src/f|">', {
			items: [
				{ label: 'feature.js', resultText: '<script src="/src/feature.js">' },
				{ label: 'test.js', resultText: '<script src="/src/test.js">' },
			]
		}, aboutHtmlUri, workspaceFolderUri);

		await testCompletion2For('<script src="../src/f|">', {
			items: [
				{ label: 'feature.js', resultText: '<script src="../src/feature.js">' },
				{ label: 'test.js', resultText: '<script src="../src/test.js">' },
			]
		}, aboutHtmlUri, workspaceFolderUri);
	});

	test('No leading dot or slash', async () => {
		// document: index.html
		await testCompletion2For('<script src="s|">', {
			items: [
				{ label: 'about/', resultText: '<script src="about/">' },
				{ label: 'index.html', resultText: '<script src="index.html">' },
				{ label: 'src/', resultText: '<script src="src/">' },
			]
		}, indexHtmlUri, workspaceFolderUri);

		await testCompletion2For('<script src="src/|">', {
			items: [
				{ label: 'feature.js', resultText: '<script src="src/feature.js">' },
				{ label: 'test.js', resultText: '<script src="src/test.js">' },
			]
		}, indexHtmlUri, workspaceFolderUri);

		await testCompletion2For('<script src="src/f|">', {
			items: [
				{ label: 'feature.js', resultText: '<script src="src/feature.js">' },
				{ label: 'test.js', resultText: '<script src="src/test.js">' },
			]
		}, indexHtmlUri, workspaceFolderUri);

		// document: about.html
		await testCompletion2For('<script src="s|">', {
			items: [
				{ label: 'about.css', resultText: '<script src="about.css">' },
				{ label: 'about.html', resultText: '<script src="about.html">' },
				{ label: 'media/', resultText: '<script src="media/">' },
			]
		}, aboutHtmlUri, workspaceFolderUri);

		await testCompletion2For('<script src="media/|">', {
			items: [
				{ label: 'icon.pic', resultText: '<script src="media/icon.pic">' }
			]
		}, aboutHtmlUri, workspaceFolderUri);

		await testCompletion2For('<script src="media/f|">', {
			items: [
				{ label: 'icon.pic', resultText: '<script src="media/icon.pic">' }
			]
		}, aboutHtmlUri, workspaceFolderUri);
	});

	test('Trigger completion in middle of path', async () => {
		// document: index.html
		await testCompletion2For('<script src="src/f|eature.js">', {
			items: [
				{ label: 'feature.js', resultText: '<script src="src/feature.js">' },
				{ label: 'test.js', resultText: '<script src="src/test.js">' },
			]
		}, indexHtmlUri, workspaceFolderUri);

		await testCompletion2For('<script src="s|rc/feature.js">', {
			items: [
				{ label: 'about/', resultText: '<script src="about/">' },
				{ label: 'index.html', resultText: '<script src="index.html">' },
				{ label: 'src/', resultText: '<script src="src/">' },
			]
		}, indexHtmlUri, workspaceFolderUri);

		// document: about.html
		await testCompletion2For('<script src="media/f|eature.js">', {
			items: [
				{ label: 'icon.pic', resultText: '<script src="media/icon.pic">' }
			]
		}, aboutHtmlUri, workspaceFolderUri);

		await testCompletion2For('<script src="m|edia/feature.js">', {
			items: [
				{ label: 'about.css', resultText: '<script src="about.css">' },
				{ label: 'about.html', resultText: '<script src="about.html">' },
				{ label: 'media/', resultText: '<script src="media/">' },
			]
		}, aboutHtmlUri, workspaceFolderUri);
	});


	test('Trigger completion in middle of path and with whitespaces', async () => {
		await testCompletion2For('<script src="./| about/about.html>', {
			items: [
				{ label: 'about/', resultText: '<script src="./about/ about/about.html>' },
				{ label: 'index.html', resultText: '<script src="./index.html about/about.html>' },
				{ label: 'src/', resultText: '<script src="./src/ about/about.html>' },
			]
		}, indexHtmlUri, workspaceFolderUri);

		await testCompletion2For('<script src="./a|bout /about.html>', {
			items: [
				{ label: 'about/', resultText: '<script src="./about/ /about.html>' },
				{ label: 'index.html', resultText: '<script src="./index.html /about.html>' },
				{ label: 'src/', resultText: '<script src="./src/ /about.html>' },
			]
		}, indexHtmlUri, workspaceFolderUri);
	});

	test('Completion should ignore files/folders starting with dot', async () => {
		await testCompletion2For('<script src="./|"', {
			count: 3
		}, indexHtmlUri, workspaceFolderUri);
	});

	test('Unquoted Path', async () => {
		/* Unquoted value is not supported in html language service yet
		await testCompletion2For(`<div><a href=about/|>`, {
			items: [
				{ label: 'about.html', resultText: `<div><a href=about/about.html>` }
			]
		}, testUri);
		*/
	});

	test('Trigger completion in src and href attributes of custom elements', async () => {
		await testCompletion2For('<my-custom-element src="../|">', {
			items: [
				{ label: 'about/', resultText: '<my-custom-element src="../about/">' },
				{ label: 'index.html', resultText: '<my-custom-element src="../index.html">' },
				{ label: 'src/', resultText: '<my-custom-element src="../src/">' }
			]
		}, aboutHtmlUri);

		await testCompletion2For('<my-custom-element href="../src/|">', {
			items: [
				{ label: 'feature.js', resultText: '<my-custom-element href="../src/feature.js">' },
				{ label: 'test.js', resultText: '<my-custom-element href="../src/test.js">' },
			]
		}, aboutHtmlUri);
	});
});
