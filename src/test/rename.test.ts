/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import * as htmlLanguageService from '../htmlLanguageService';
import { WorkspaceEdit, TextDocument } from '../htmlLanguageService';


export async function testRename(value: string, newName: string, expectedDocContent: string): Promise<void> {
  const offset = value.indexOf('|');
  value = value.substr(0, offset) + value.substr(offset + 1);

  const ls = htmlLanguageService.getLanguageService();

  const document = TextDocument.create('test://test/test.html', 'html', 0, value);
  const position = document.positionAt(offset);
  const htmlDoc = await ls.parseHTMLDocument(document);

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

export async function testNoRename(value: string, newName: string): Promise<void> {
  const offset = value.indexOf('|');
  value = value.substr(0, offset) + value.substr(offset + 1);

  const ls = htmlLanguageService.getLanguageService();

  const document = TextDocument.create('test://test/test.html', 'html', 0, value);
  const position = document.positionAt(offset);
  const htmlDoc = await ls.parseHTMLDocument(document);

  const workspaceEdit: WorkspaceEdit | null = ls.doRename(document, position, newName, htmlDoc);

  assert.ok(workspaceEdit?.changes === undefined, 'Should not rename but rename happened');
}

suite('HTML Rename', () => {
  test('Rename tag', async () => {
    await testRename('<|div></div>', 'h1', '<h1></h1>');
    await testRename('<d|iv></div>', 'h1', '<h1></h1>');
    await testRename('<di|v></div>', 'h1', '<h1></h1>');
    await testRename('<div|></div>', 'h1', '<h1></h1>');
    await testRename('<|div></div>', 'h1', '<h1></h1>');
    await testRename('<|div></div>', 'h1', '<h1></h1>');

    await testNoRename('|<div></div>', 'h1');
    await testNoRename('<div>|</div>', 'h1');
    await testNoRename('<div><|/div>', 'h1');
    await testNoRename('<div></div>|', 'h1');

    await testNoRename('<div |id="foo"></div>', 'h1');
    await testNoRename('<div i|d="foo"></div>', 'h1');
    await testNoRename('<div id|="foo"></div>', 'h1');
    await testNoRename('<div id=|"foo"></div>', 'h1');
    await testNoRename('<div id="|foo"></div>', 'h1');
    await testNoRename('<div id="f|oo"></div>', 'h1');
    await testNoRename('<div id="fo|o"></div>', 'h1');
    await testNoRename('<div id="foo|"></div>', 'h1');
    await testNoRename('<div id="foo"|></div>', 'h1');
  });

  test('Rename self-closing tag', async () => {
    await testRename('<|br>', 'h1', `<h1>`);
    await testRename('<|br/>', 'h1', `<h1/>`);
    await testRename('<|br />', 'h1', `<h1 />`);
  });

  test('Rename inner tag', async () => {
    await testRename('<div><|h1></h1></div>', 'h2', '<div><h2></h2></div>');
  });

  test('Rename unmatched tag', async () => {
    await testRename('<div><|h1></div>', 'h2', '<div><h2></div>');
    await testRename('<|div><h1></h1></div>', 'span', '<span><h1></h1></span>');
  });
});
