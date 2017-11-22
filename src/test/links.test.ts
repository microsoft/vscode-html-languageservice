
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import * as assert from 'assert';
import { TextDocument } from 'vscode-languageserver-types';
import * as htmlLanguageService from '../htmlLanguageService';
import * as url from 'url';

suite('HTML Link Detection', () => {

	const ext2lang : { [ext:string] : string } = {
		html: 'html',
		cshtml: 'razor',
		hbs: 'handlebars'
	};

	function getDocumentContext(documentUrl: string): htmlLanguageService.DocumentContext {
		return {
			resolveReference: (ref, base) => {
				if (base) {
					documentUrl = url.resolve(documentUrl, base);
				}
				return url.resolve(documentUrl, ref);
			}
		};
	}

	function testLinkCreation(modelUrl: string, tokenContent: string, expected: string | null): void {
		let langId = ext2lang[modelUrl.substr(modelUrl.lastIndexOf('.') + 1)] || 'html';
		let document = TextDocument.create(modelUrl, langId, 0, `<a href="${tokenContent}">`);
		let ls = htmlLanguageService.getLanguageService();
		let links = ls.findDocumentLinks(document, getDocumentContext(modelUrl));
		assert.equal(links[0] && links[0].target, expected);
	}

	function testLinkDetection(value: string, expectedLinks: { offset: number, target: string; }[]): void {
		let document = TextDocument.create('http://test/data/abc/test.html', 'html', 0, value);
		let ls = htmlLanguageService.getLanguageService();
		let links = ls.findDocumentLinks(document, getDocumentContext(document.uri));
		assert.deepEqual(links.map(l => ({ offset: l.range.start.character, target: l.target })), expectedLinks);
	}

	test('Link creation', () => {
		testLinkCreation('http://model/1.html', 'javascript:void;', null);
		testLinkCreation('http://model/1.html', ' \tjavascript:alert(7);', null);
		testLinkCreation('http://model/1.html', ' #relative', null);
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
		testLinkCreation('file:///C:/Alex/src/path/to/file.html', ' #relative', null);
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

		testLinkCreation('http://foo/xoo/bar.cshtml', './class.js', 'http://foo/xoo/class.js');
		testLinkCreation('http://foo/xoo/bar.cshtml', '../@name', null);
		testLinkCreation('http://foo/xoo/bar.cshtml', '~/img/image.jpg', 'http://foo/img/image.jpg');
	});

	test('Link detection', () => {
		testLinkDetection('<img src="foo.png">', [{ offset: 10, target: 'http://test/data/abc/foo.png' }]);
		testLinkDetection('<a href="http://server/foo.html">', [{ offset: 9, target: 'http://server/foo.html' }]);
		testLinkDetection('<img src="">', []);
		testLinkDetection('<LINK HREF="a.html">', [{ offset: 12, target: 'http://test/data/abc/a.html' }]);
		testLinkDetection('<LINK HREF="a.html\n>\n', []);

		testLinkDetection('<html><base href="docs/"><img src="foo.png"></html>', [{ offset: 35, target: 'http://test/data/abc/docs/foo.png' }]);
		testLinkDetection('<html><base href="http://www.example.com/page.html"><img src="foo.png"></html>', [{ offset: 62, target: 'http://www.example.com/foo.png' }]);
		testLinkDetection('<html><base href=".."><img src="foo.png"></html>', [{ offset: 32, target: 'http://test/data/foo.png' }]);
		testLinkDetection('<html><base href="."><img src="foo.png"></html>', [{ offset: 31, target: 'http://test/data/abc/foo.png' }]);
		testLinkDetection('<html><base href="/docs/"><img src="foo.png"></html>', [{ offset: 36, target: 'http://test/docs/foo.png' }]);
	});

});