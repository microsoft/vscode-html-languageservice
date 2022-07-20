
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import { TextDocument } from '../htmlLanguageTypes';
import * as htmlLanguageService from '../htmlLanguageService';
import { getDocumentContext } from './testUtil/documentContext';

suite('HTML Link Detection', () => {

	const ext2lang: { [ext: string]: string } = {
		html: 'html',
		hbs: 'handlebars'
	};

	function testLinkCreation(modelUrl: string, tokenContent: string, expected: string | null): void {
		const langId = ext2lang[modelUrl.substr(modelUrl.lastIndexOf('.') + 1)] || 'html';
		const document = TextDocument.create(modelUrl, langId, 0, `<a href="${tokenContent}">`);
		const ls = htmlLanguageService.getLanguageService();
		const links = ls.findDocumentLinks(document, getDocumentContext());
		assert.equal(links[0] && links[0].target, expected);
	}

	function testLinkDetection(value: string, expectedLinks: { offset: number, length: number, target: string; }[]): void {
		const document = TextDocument.create('file:///test/data/abc/test.html', 'html', 0, value);
		const ls = htmlLanguageService.getLanguageService();
		const links = ls.findDocumentLinks(document, getDocumentContext());
		assert.deepEqual(links.map(l => ({ offset: l.range.start.character, length: l.range.end.character - l.range.start.character, target: l.target })), expectedLinks);
	}

	test('Link creation', () => {
		testLinkCreation('http://model/1.html', 'javascript:void;', null);
		testLinkCreation('http://model/1.html', ' \tjavascript:alert(7);', null);
		testLinkCreation('http://model/1.html', ' #relative', 'http://model/1.html#relative');
		testLinkCreation('http://model/1.html', 'file:///C:\\Alex\\src\\path\\to\\file.txt', 'file:///C:\\Alex\\src\\path\\to\\file.txt');
		testLinkCreation('http://model/1.html', 'http://www.microsoft.com/', 'http://www.microsoft.com/');
		testLinkCreation('http://model/1.html', 'https://www.microsoft.com/', 'https://www.microsoft.com/');
		testLinkCreation('http://model/1.html', '//www.microsoft.com/', 'http://www.microsoft.com/');
		testLinkCreation('http://model/x/1.html', 'a.js', 'http://model/x/a.js');
		testLinkCreation('http://model/x/1.html', './a2.js', 'http://model/x/a2.js');
		testLinkCreation('http://model/x/1.html', '/b.js', 'http://model/b.js');
		testLinkCreation('http://model/x/y/1.html', '../../c.js', 'http://model/c.js');

		testLinkCreation('file:///C:/Alex/src/path/to/file.html', 'javascript:void;', null);
		testLinkCreation('file:///C:/Alex/src/path/to/file.html', ' \tjavascript:alert(7);', null);
		testLinkCreation('file:///C:/Alex/src/path/to/file.html', ' #relative', 'file:///C:/Alex/src/path/to/file.html#relative');
		testLinkCreation('file:///C:/Alex/src/path/to/file.html', 'file:///C:\\Alex\\src\\path\\to\\file.txt', 'file:///C:\\Alex\\src\\path\\to\\file.txt');
		testLinkCreation('file:///C:/Alex/src/path/to/file.html', 'http://www.microsoft.com/', 'http://www.microsoft.com/');
		testLinkCreation('file:///C:/Alex/src/path/to/file.html', 'https://www.microsoft.com/', 'https://www.microsoft.com/');
		testLinkCreation('file:///C:/Alex/src/path/to/file.html', '  //www.microsoft.com/', 'http://www.microsoft.com/');
		testLinkCreation('file:///C:/Alex/src/path/to/file.html', 'a.js', 'file:///C:/Alex/src/path/to/a.js');
		testLinkCreation('file:///C:/Alex/src/path/to/file.html', '/a.js', 'file:///a.js');

		testLinkCreation('https://www.test.com/path/to/file.html', 'file:///C:\\Alex\\src\\path\\to\\file.txt', 'file:///C:\\Alex\\src\\path\\to\\file.txt');
		testLinkCreation('https://www.test.com/path/to/file.html', '//www.microsoft.com/', 'https://www.microsoft.com/');
		testLinkCreation('https://www.test.com/path/to/file.html', '//www.microsoft.com/', 'https://www.microsoft.com/');

		// invalid uris are ignored
		testLinkCreation('https://www.test.com/path/to/file.html', '%', null);

		// Bug #18314: Ctrl + Click does not open existing file if folder's name starts with 'c' character
		testLinkCreation('file:///c:/Alex/working_dir/18314-link-detection/test.html', '/class/class.js', 'file:///class/class.js');

		testLinkCreation('http://foo/bar.hbs', '/class/class.js', 'http://foo/class/class.js');
		testLinkCreation('http://foo/bar.hbs', '{{asset foo}}/class/class.js', null);
		testLinkCreation('http://foo/bar.hbs', '{{href-to', null); // issue https://github.com/microsoft/vscode/issues/134334
	});

	test('Link detection', () => {
		testLinkDetection('<img src="foo.png">', [{ offset: 10, length: 7, target: 'file:///test/data/abc/foo.png' }]);
		testLinkDetection('<a href="http://server/foo.html">', [{ offset: 9, length: 22, target: 'http://server/foo.html' }]);
		testLinkDetection('<img src="">', []);
		testLinkDetection('<LINK HREF="a.html">', [{ offset: 12, length: 6, target: 'file:///test/data/abc/a.html' }]);
		testLinkDetection('<LINK HREF="a.html\n>\n', []);
		testLinkDetection('<a href=http://www.example.com></a>', [{ offset: 8, length: 22, target: 'http://www.example.com' }]);

		testLinkDetection('<html><base href="docs/"><img src="foo.png"></html>', [{ offset: 35, length: 7, target: 'file:///test/data/abc/docs/foo.png' }]);
		testLinkDetection('<html><base href="http://www.example.com/page.html"><img src="foo.png"></html>', [{ offset: 62, length: 7, target: 'http://www.example.com/foo.png' }]);
		testLinkDetection('<html><base href=".."><img src="foo.png"></html>', [{ offset: 32, length: 7, target: 'file:///test/data/foo.png' }]);
		testLinkDetection('<html><base href="."><img src="foo.png"></html>', [{ offset: 31, length: 7, target: 'file:///test/data/abc/foo.png' }]);
		testLinkDetection('<html><base href="/docs/"><img src="foo.png"></html>', [{ offset: 36, length: 7, target: 'file:///docs/foo.png' }]);

		testLinkDetection('<a href="mailto:<%- mail %>@<%- domain %>" > <% - mail %>@<% - domain %> </a>', []);

		testLinkDetection('<link rel="icon" type="image/x-icon" href="data:@file/x-icon;base64,AAABAAIAQEAAAAEAIAAoQgAAJgA">', []);
	});

	test('Local targets', () => {
		testLinkDetection('<body><h1 id="title"></h1><a href="#title"</a></body>', [{ offset: 35, length: 6, target: 'file:///test/data/abc/test.html#1,14' }]);
		testLinkDetection('<body><h1 id="title"></h1><a href="file:///test/data/abc/test.html#title"</a></body>', [{ offset: 35, length: 37, target: 'file:///test/data/abc/test.html#1,14' }]);
	});

});