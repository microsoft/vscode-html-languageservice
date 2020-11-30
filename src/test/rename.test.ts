/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import * as htmlLanguageService from '../htmlLanguageService';
import { WorkspaceEdit, TextDocument } from '../htmlLanguageService';


export function testRename(value: string, newName: string, expectedDocContent: string): void {
  const offset = value.indexOf('|');
  value = value.substr(0, offset) + value.substr(offset + 1);

  const ls = htmlLanguageService.getLanguageService();

  const document = TextDocument.create('test://test/test.html', 'html', 0, value);
  const position = document.positionAt(offset);
  const htmlDoc = ls.parseHTMLDocument(document);

  const workspaceEdit: WorkspaceEdit | null = ls.doRename(document, position, newName, htmlDoc);

  if (!workspaceEdit || !workspaceEdit.changes) {
    assert.fail('No workspace edits');
  }

  const edits = workspaceEdit.changes[document.uri.toString()];
  if (!edits) {
    assert.fail(`No edits for file at ${document.uri.toString()}`);
  }

  const newDocContent = TextDocument.applyEdits(document, edits);
  assert.equal(newDocContent, expectedDocContent, `Expected: ${expectedDocContent}\nActual: ${newDocContent}`);
}

export function testNoRename(value: string, newName: string): void {
  const offset = value.indexOf('|');
  value = value.substr(0, offset) + value.substr(offset + 1);

  const ls = htmlLanguageService.getLanguageService();

  const document = TextDocument.create('test://test/test.html', 'html', 0, value);
  const position = document.positionAt(offset);
  const htmlDoc = ls.parseHTMLDocument(document);

  const workspaceEdit: WorkspaceEdit | null = ls.doRename(document, position, newName, htmlDoc);

  assert.ok(workspaceEdit?.changes === undefined, 'Should not rename but rename happened');
}

suite('HTML Rename', () => {
  test('Rename tag', () => {
    testRename('<|div></div>', 'h1', '<h1></h1>');
    testRename('<d|iv></div>', 'h1', '<h1></h1>');
    testRename('<di|v></div>', 'h1', '<h1></h1>');
    testRename('<div|></div>', 'h1', '<h1></h1>');
    testRename('<|div></div>', 'h1', '<h1></h1>');
    testRename('<|div></div>', 'h1', '<h1></h1>');

    testNoRename('|<div></div>', 'h1');
    testNoRename('<div>|</div>', 'h1');
    testNoRename('<div><|/div>', 'h1');
    testNoRename('<div></div>|', 'h1');

    testNoRename('<div |id="foo"></div>', 'h1');
    testNoRename('<div i|d="foo"></div>', 'h1');
    testNoRename('<div id|="foo"></div>', 'h1');
    testNoRename('<div id=|"foo"></div>', 'h1');
    testNoRename('<div id="|foo"></div>', 'h1');
    testNoRename('<div id="f|oo"></div>', 'h1');
    testNoRename('<div id="fo|o"></div>', 'h1');
    testNoRename('<div id="foo|"></div>', 'h1');
    testNoRename('<div id="foo"|></div>', 'h1');
  });

  test('Rename self-closing tag', () => {
    testRename('<|br>', 'h1', `<h1>`);
    testRename('<|br/>', 'h1', `<h1/>`);
    testRename('<|br />', 'h1', `<h1 />`);
  });

  test('Rename inner tag', () => {
    testRename('<div><|h1></h1></div>', 'h2', '<div><h2></h2></div>');
  });

  test('Rename unmatched tag', () => {
    testRename('<div><|h1></div>', 'h2', '<div><h2></div>');
    testRename('<|div><h1></h1></div>', 'span', '<span><h1></h1></span>');
  });
});
