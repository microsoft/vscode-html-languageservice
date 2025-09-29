/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import * as htmlLanguageService from '../htmlLanguageService';
import { TextDocument } from '../htmlLanguageService';

export async function testMatchingTagPosition(value: string): Promise<void> {
  let offset = value.indexOf('|');
  value = value.substr(0, offset) + value.substr(offset + 1);
  const mirrorOffset = value.indexOf('$');
  value = value.substr(0, mirrorOffset) + value.substr(mirrorOffset + 1);
  if (mirrorOffset < offset) {
    offset -= 1; // because `$` before it is removed
  }

  const ls = htmlLanguageService.getLanguageService();

  const document = TextDocument.create('test://test/test.html', 'html', 0, value);
  const position = document.positionAt(offset);
  const htmlDoc = await ls.parseHTMLDocument(document);

  const mirrorPosition = ls.findMatchingTagPosition(document, position, htmlDoc);
  if (!mirrorPosition) {
    assert.fail('Failed to find mirror position');
  }
  assert.equal(
    document.offsetAt(mirrorPosition),
    mirrorOffset,
    `Actual offset ${document.offsetAt(mirrorPosition)} does not match expected offset ${mirrorOffset}`
  );
}

suite('HTML find matching tag position', () => {
  test('Matching position', async () => {
    await testMatchingTagPosition('<|div></$div>');
    await testMatchingTagPosition('<d|iv></d$iv>');
    await testMatchingTagPosition('<di|v></di$v>');
    await testMatchingTagPosition('<div|></div$>');

    await testMatchingTagPosition('<$div></|div>');
    await testMatchingTagPosition('<d$iv></d|iv>');
    await testMatchingTagPosition('<di$v></di|v>');
    await testMatchingTagPosition('<div$></div|>');

    await testMatchingTagPosition('<div| ></div$>');
    await testMatchingTagPosition('<div| id="foo"></div$>');

    await testMatchingTagPosition('<div$ ></div|>');
    await testMatchingTagPosition('<div$ id="foo"></div|>');
  });
});
