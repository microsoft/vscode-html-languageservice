/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import * as htmlLanguageService from '../htmlLanguageService';

import { HtmlAttributeValueContext, HtmlContentContext, Position, TextDocument } from '../htmlLanguageService';

export interface ExpectedHtmlAttributeValue {
  tag: string;
  attribute: string;
  value: string;
  replaceContent: string;
}

export interface ExpectedHtmlContent {
}

suite('HTML Completion Participant', () => {

  const prepareDocument = (value: string): { document: TextDocument, position: Position } => {
    const offset = value.indexOf('|');
    value = value.substr(0, offset) + value.substr(offset + 1);
    const document = TextDocument.create('test://test/test.html', 'html', 0, value);
    const position = document.positionAt(offset);
    return { document, position };
  };

  const testHtmlAttributeValues = (value: string, expected: ExpectedHtmlAttributeValue[]): void => {
    const ls = htmlLanguageService.getLanguageService();
    const { document, position } = prepareDocument(value);

    const actuals: ExpectedHtmlAttributeValue[] = [];
    const participant: htmlLanguageService.ICompletionParticipant = {
      onHtmlAttributeValue: (context: HtmlAttributeValueContext) => {
        const replaceContent = document.getText().substring(document.offsetAt(context.range.start), document.offsetAt(context.range.end));
        assert.equal(context.document, document);
        assert.equal(context.position, position);
        actuals.push({
          tag: context.tag,
          attribute: context.attribute,
          value: context.value,
          replaceContent
        });
      }
    };
    ls.setCompletionParticipants([participant]);
    const htmlDoc = ls.parseHTMLDocument(document);
    const list = ls.doComplete(document, position, htmlDoc);

    const c = (a1: ExpectedHtmlAttributeValue, a2: ExpectedHtmlAttributeValue) => {
      return new String(a1.tag + a1.attribute + a1.value).localeCompare(a2.tag + a2.attribute + a2.value);
    };
    assert.deepEqual(actuals.sort(c), expected.sort(c));
  };

  const testHtmlContent = (value: string, expected: ExpectedHtmlContent[]): void => {
    const ls = htmlLanguageService.getLanguageService();
    const { document, position } = prepareDocument(value);

    const actuals: {}[] = [];
    const participant: htmlLanguageService.ICompletionParticipant = {
      onHtmlContent: (context: HtmlContentContext) => {
        actuals.push(Object.create(null));
      }
    };
    ls.setCompletionParticipants([participant]);
    const htmlDoc = ls.parseHTMLDocument(document);
    const list = ls.doComplete(document, position, htmlDoc);
    assert.deepEqual(actuals.length, expected.length);
  };

  test('onHtmlAttributeValue', () => {
    testHtmlAttributeValues('<|', []);
    testHtmlAttributeValues('<div |>', []);
    testHtmlAttributeValues('<div class|>', []);
    testHtmlAttributeValues('<div>|', []);
    testHtmlAttributeValues('<div>|</div>', []);

    testHtmlAttributeValues('<div class="|"></div>', [{
      tag: 'div',
      attribute: 'class',
      value: '',
      replaceContent: '""'
    }]);
    testHtmlAttributeValues('<div class="|f"></div>', [{
      tag: 'div',
      attribute: 'class',
      value: '',
      replaceContent: '"f"'
    }]);
    testHtmlAttributeValues('<div class="foo|"></div>', [{
      tag: 'div',
      attribute: 'class',
      value: 'foo',
      replaceContent: '"foo"'
    }]);
    testHtmlAttributeValues(`<div class='foo'|></div>`, [{
      tag: 'div',
      attribute: 'class',
      value: '',
      replaceContent: `'foo'`
    }]);
    testHtmlAttributeValues(`<div class=|'foo'></div>`, [{
      tag: 'div',
      attribute: 'class',
      value: '',
      replaceContent: `'foo'`
    }]);
    testHtmlAttributeValues(`<div class=|foo></div>`, [{
      tag: 'div',
      attribute: 'class',
      value: '',
      replaceContent: 'foo'
    }]);
    testHtmlAttributeValues(`<div class=foo|></div>`, [{
      tag: 'div',
      attribute: 'class',
      value: 'foo',
      replaceContent: 'foo'
    }]);
    testHtmlAttributeValues(`<div class=fo|o></div>`, [{
      tag: 'div',
      attribute: 'class',
      value: 'fo',
      replaceContent: 'foo'
    }]);
  });

  test('onHtmlContent', () => {
    testHtmlContent('<|', []);
    testHtmlContent('<div |>', []);
    testHtmlContent('<div class|>', []);
    testHtmlContent('<div class="|">', []);
    testHtmlContent('<div class="foo |">', []);
    testHtmlContent('<div class="foo">d|', [{}]);
    testHtmlContent('<div class="foo">d|</div>', [{}]);
  });

});