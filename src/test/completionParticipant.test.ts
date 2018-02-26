/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import * as assert from 'assert';
import * as htmlLanguageService from '../htmlLanguageService';

import { CompletionList, TextDocument, CompletionItemKind, TextEdit, Range, Position } from 'vscode-languageserver-types';
import { applyEdits } from './textEditSupport';

export interface ItemDescription {
	label: string;
	documentation?: string;
	kind?: CompletionItemKind;
	resultText?: string;
	notAvailable?: boolean;
}

suite('HTML Completion Participant', () => {

  let assertCompletion = function (completions: CompletionList, expected: ItemDescription, document: TextDocument, offset: number) {
		let matches = completions.items.filter(completion => {
			return completion.label === expected.label;
		});
		if (expected.notAvailable) {
			assert.equal(matches.length, 0, expected.label + " should not existing is results");
			return;
		}

		assert.equal(matches.length, 1, expected.label + " should only existing once: Actual: " + completions.items.map(c => c.label).join(', '));
		let match = matches[0];
		if (expected.documentation) {
			assert.equal(match.documentation, expected.documentation);
		}
		if (expected.kind) {
			assert.equal(match.kind, expected.kind);
		}
		if (expected.resultText && match.textEdit) {
			assert.equal(applyEdits(document, [match.textEdit]), expected.resultText);
		}
	};

	let testCompletionWithParticipantsFor= function (value: string, participants: htmlLanguageService.ICompletionParticipant[]): PromiseLike<void> {
		let offset = value.indexOf('|');
		value = value.substr(0, offset) + value.substr(offset + 1);

		let ls = htmlLanguageService.getLanguageService();

		let document = TextDocument.create('test://test/test.html', 'html', 0, value);
		let position = document.positionAt(offset);
    let htmlDoc = ls.parseHTMLDocument(document);
    ls.setCompletionParticipants(participants);
    let list = ls.doComplete(document, position, htmlDoc);

		return Promise.resolve();
  };
  
  test('onHtmlAttributeValue', () => {
    let attributeValueParticipationCount = 0;
    let tag, attribute, value;
    let range: Range = Range.create(Position.create(0, 0), Position.create(0, 0));

    const participant: htmlLanguageService.ICompletionParticipant = {
      onHtmlAttributeValue: (context: { tag: string, attribute: string; value: string; range: Range }) => {
        tag = context.tag;
        attribute = context.attribute;
        value = context.value;
        range = context.range;
        attributeValueParticipationCount++;
      }
    };
    testCompletionWithParticipantsFor('<|', [participant]);
    testCompletionWithParticipantsFor('<div |>', [participant]);
    testCompletionWithParticipantsFor('<div class|>', [participant]);
    testCompletionWithParticipantsFor('<div>|', [participant]);
    testCompletionWithParticipantsFor('<div>|</div>', [participant]);
    assert.equal(attributeValueParticipationCount, 0);

    testCompletionWithParticipantsFor('<div class="|"></div>', [participant]);
    assert.equal(attributeValueParticipationCount, 1);
    assert.equal(tag, 'div');
    assert.equal(attribute, 'class');
    assert.equal(value, '""');
    assert.equal(range.start.line, 0);
    assert.equal(range.start.character, 12);
    assert.equal(range.end.line, 0);
    assert.equal(range.end.character, 12);

    testCompletionWithParticipantsFor('<div class="foo|"></div>', [participant]);
    assert.equal(attributeValueParticipationCount, 2);
    assert.equal(tag, 'div');
    assert.equal(attribute, 'class');
    assert.equal(value, '"foo"');
    assert.equal(range.start.line, 0);
    assert.equal(range.start.character, 12);
    assert.equal(range.end.line, 0);
    assert.equal(range.end.character, 15);

    testCompletionWithParticipantsFor(`<div class=foo></div>`, [participant]);
    assert.equal(value, '"foo"');
  });

  test('onHtmlContent', () => {
    let contentParticipationCount = 0;

    const participant: htmlLanguageService.ICompletionParticipant = {
      onHtmlContent: () => {
        contentParticipationCount++;
      }
    };

    testCompletionWithParticipantsFor('<|', [participant]);
    testCompletionWithParticipantsFor('<div |>', [participant]);
    testCompletionWithParticipantsFor('<div class|>', [participant]);
    testCompletionWithParticipantsFor('<div class="|">', [participant]);
    testCompletionWithParticipantsFor('<div class="foo |">', [participant]);
    assert.equal(contentParticipationCount, 0);

    testCompletionWithParticipantsFor('<div class="foo">d|', [participant]);
    assert.equal(contentParticipationCount, 1);
    testCompletionWithParticipantsFor('<div class="foo">d|</div>', [participant]);
    assert.equal(contentParticipationCount, 2);
  });
});