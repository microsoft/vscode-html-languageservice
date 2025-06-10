/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import * as htmlLanguageService from '../htmlLanguageService';
import { TextDocument } from '../htmlLanguageService';

interface OffsetWithText {
  0: number;
  1: string;
}

export async function testMatchingTagPosition(value: string, expected: OffsetWithText[]): Promise<void> {
  const originalValue = value;

  let offset = value.indexOf('|');
  value = value.substr(0, offset) + value.substr(offset + 1);

  const ls = htmlLanguageService.getLanguageService();

  const document = TextDocument.create('test://test/test.html', 'html', 0, value);
  const position = document.positionAt(offset);
  const htmlDoc = await ls.parseHTMLDocument(document);

  const syncedRegions = ls.findLinkedEditingRanges(document, position, htmlDoc);
  if (!syncedRegions) {
    if (expected.length > 0) {
      assert.fail(`No linked editing ranges for ${originalValue} but expecting\n${JSON.stringify(expected)}`);
    } else {
      return;
    }
  }

  const actual: OffsetWithText[] = syncedRegions.map(r => {
    return [document.offsetAt(r.start), document.getText(r)];
  });

  assert.deepStrictEqual(actual, expected, `Actual\n${JSON.stringify(actual)}\ndoes not match expected:\n${JSON.stringify(expected)}`);
}

suite('HTML Linked Editing', () => {
  test('Linked Editing', async () => {
    await testMatchingTagPosition('|<div></div>', []);
    await testMatchingTagPosition('<|div></div>', [[1, 'div'], [7, 'div']]);
    await testMatchingTagPosition('<d|iv></div>', [[1, 'div'], [7, 'div']]);
    await testMatchingTagPosition('<di|v></div>', [[1, 'div'], [7, 'div']]);
    await testMatchingTagPosition('<div|></div>', [[1, 'div'], [7, 'div']]);

    await testMatchingTagPosition('<div>|</div>', []);
    await testMatchingTagPosition('<div><|/div>', []);

    await testMatchingTagPosition('<div></|div>', [[1, 'div'], [7, 'div']]);
    await testMatchingTagPosition('<div></d|iv>', [[1, 'div'], [7, 'div']]);
    await testMatchingTagPosition('<div></di|v>', [[1, 'div'], [7, 'div']]);
    await testMatchingTagPosition('<div></div|>', [[1, 'div'], [7, 'div']]);

    await testMatchingTagPosition('<div></div>|', []);
    await testMatchingTagPosition('<div><div|</div>', []);
    await testMatchingTagPosition('<div><div><div|</div></div>', []);

    await testMatchingTagPosition('<div| ></div>', [[1, 'div'], [8, 'div']]);
    await testMatchingTagPosition('<div| id="foo"></div>', [[1, 'div'], [16, 'div']]);

    await testMatchingTagPosition('<|></>', [[1, ''], [4, '']]);
    await testMatchingTagPosition('<><div></div></|>', [[1, ''], [15, '']]);
  });
});
