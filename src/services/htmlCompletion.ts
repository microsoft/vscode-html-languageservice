/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { TextDocument, Position, CompletionList, CompletionItemKind, Range, TextEdit, InsertTextFormat, CompletionItem } from 'vscode-languageserver-types';
import { HTMLDocument, Node } from '../parser/htmlParser';
import { createScanner } from '../parser/htmlScanner';
import { isEmptyElement } from '../parser/htmlTags';
import { getAllTagProviders } from './tagProviders';
import { CompletionConfiguration, ICompletionParticipant, ScannerState, TokenType } from '../htmlLanguageTypes';
import { entities } from '../parser/htmlEntities';

import * as nls from 'vscode-nls';
import { isLetterOrDigit, endsWith, startsWith } from '../utils/strings';
let localize = nls.loadMessageBundle();

export class HTMLCompletion {
	completionParticipants: ICompletionParticipant[];

	constructor() {
		this.completionParticipants = [];
	}

	setCompletionParticipants(registeredCompletionParticipants: ICompletionParticipant[]) {
		this.completionParticipants = registeredCompletionParticipants || [];
	}

	doComplete(document: TextDocument, position: Position, htmlDocument: HTMLDocument, settings?: CompletionConfiguration): CompletionList {
		let result: CompletionList = {
			isIncomplete: false,
			items: []
		};
		let completionParticipants = this.completionParticipants;
		let tagProviders = getAllTagProviders().filter(p => p.isApplicable(document.languageId) && (!settings || settings[p.getId()] !== false));

		let text = document.getText();
		let offset = document.offsetAt(position);

		let node = htmlDocument.findNodeBefore(offset);
		if (!node) {
			return result;
		}

		let scanner = createScanner(text, node.start);
		let currentTag: string = '';
		let currentAttributeName: string;

		function getReplaceRange(replaceStart: number, replaceEnd: number = offset): Range {
			if (replaceStart > offset) {
				replaceStart = offset;
			}
			return { start: document.positionAt(replaceStart), end: document.positionAt(replaceEnd) };
		}

		function collectOpenTagSuggestions(afterOpenBracket: number, tagNameEnd?: number): CompletionList {
			let range = getReplaceRange(afterOpenBracket, tagNameEnd);
			tagProviders.forEach((provider) => {
				provider.collectTags((tag, label) => {
					result.items.push({
						label: tag,
						kind: CompletionItemKind.Property,
						documentation: label,
						textEdit: TextEdit.replace(range, tag),
						insertTextFormat: InsertTextFormat.PlainText
					});
				});
			});
			return result;
		}

		function getLineIndent(offset: number) {
			let start = offset;
			while (start > 0) {
				let ch = text.charAt(start - 1);
				if ("\n\r".indexOf(ch) >= 0) {
					return text.substring(start, offset);
				}
				if (!isWhiteSpace(ch)) {
					return null;
				}
				start--;
			}
			return text.substring(0, offset);
		}

		function collectCloseTagSuggestions(afterOpenBracket: number, inOpenTag: boolean, tagNameEnd: number = offset): CompletionList {
			let range = getReplaceRange(afterOpenBracket, tagNameEnd);
			let closeTag = isFollowedBy(text, tagNameEnd, ScannerState.WithinEndTag, TokenType.EndTagClose) ? '' : '>';
			let curr: Node | undefined = node;
			if (inOpenTag) {
				curr = curr.parent; // don't suggest the own tag, it's not yet open
			}
			while (curr) {
				let tag = curr.tag;
				if (tag && (!curr.closed || curr.endTagStart && (curr.endTagStart > offset))) {
					let item: CompletionItem = {
						label: '/' + tag,
						kind: CompletionItemKind.Property,
						filterText: '/' + tag + closeTag,
						textEdit: TextEdit.replace(range, '/' + tag + closeTag),
						insertTextFormat: InsertTextFormat.PlainText
					};
					let startIndent = getLineIndent(curr.start);
					let endIndent = getLineIndent(afterOpenBracket - 1);
					if (startIndent !== null && endIndent !== null && startIndent !== endIndent) {
						let insertText = startIndent + '</' + tag + closeTag;
						item.textEdit = TextEdit.replace(getReplaceRange(afterOpenBracket - 1 - endIndent.length), insertText);
						item.filterText = endIndent + '</' + tag + closeTag;
					}
					result.items.push(item);
					return result;
				}
				curr = curr.parent;
			}
			if (inOpenTag) {
				return result;
			}

			tagProviders.forEach(provider => {
				provider.collectTags((tag, label) => {
					result.items.push({
						label: '/' + tag,
						kind: CompletionItemKind.Property,
						documentation: label,
						filterText: '/' + tag + closeTag,
						textEdit: TextEdit.replace(range, '/' + tag + closeTag),
						insertTextFormat: InsertTextFormat.PlainText
					});
				});
			});
			return result;
		}

		function collectAutoCloseTagSuggestion(tagCloseEnd: number, tag: string): CompletionList {
			if (settings && settings.hideAutoCompleteProposals) {
				return result;
			}
			if (!isEmptyElement(tag)) {
				let pos = document.positionAt(tagCloseEnd);
				result.items.push({
					label: '</' + tag + '>',
					kind: CompletionItemKind.Property,
					filterText: '</' + tag + '>',
					textEdit: TextEdit.insert(pos, '$0</' + tag + '>'),
					insertTextFormat: InsertTextFormat.Snippet
				});
			}
			return result;
		}

		function collectTagSuggestions(tagStart: number, tagEnd: number): CompletionList {
			collectOpenTagSuggestions(tagStart, tagEnd);
			collectCloseTagSuggestions(tagStart, true, tagEnd);
			return result;
		}

		function collectAttributeNameSuggestions(nameStart: number, nameEnd: number = offset): CompletionList {
			let replaceEnd = offset;
			while (replaceEnd < nameEnd && text[replaceEnd] !== '<') { // < is a valid attribute name character, but we rather assume the attribute name ends. See #23236.
				replaceEnd++;
			}
			let range = getReplaceRange(nameStart, replaceEnd);
			let value = isFollowedBy(text, nameEnd, ScannerState.AfterAttributeName, TokenType.DelimiterAssign) ? '' : '="$1"';
			let tag = currentTag.toLowerCase();
			let seenAttributes = Object.create(null);
			tagProviders.forEach(provider => {
				provider.collectAttributes(tag, (attribute, type?: string) => {
					if (seenAttributes[attribute]) {
						return;
					}
					seenAttributes[attribute] = true;

					let codeSnippet = attribute;
					let command;
					if (type !== 'v' && value.length) {
						codeSnippet = codeSnippet + value;
						if (type) {
							command = {
								title: 'Suggest',
								command: 'editor.action.triggerSuggest'
							};
						}
					}
					result.items.push({
						label: attribute,
						kind: type === 'handler' ? CompletionItemKind.Function : CompletionItemKind.Value,
						textEdit: TextEdit.replace(range, codeSnippet),
						insertTextFormat: InsertTextFormat.Snippet,
						command
					});
				});
			});
			collectDataAttributesSuggestions(range, seenAttributes);
			return result;
		}

		function collectDataAttributesSuggestions(range: Range, seenAttributes: { [attribute: string]: boolean }) {

			const dataAttr = 'data-';
			let dataAttributes: { [name: string]: string } = {};

			dataAttributes[dataAttr] = `${dataAttr}$1="$2"`;

			function addNodeDataAttributes(node: Node) {
				node.attributeNames.forEach(attr => {
					if (startsWith(attr, dataAttr) && !dataAttributes[attr] && !seenAttributes[attr]) {
						dataAttributes[attr] = attr + '="$1"';
					}
				});
				node.children.forEach(child => addNodeDataAttributes(child));
			}

			if (htmlDocument) {
				htmlDocument.roots.forEach(root => addNodeDataAttributes(root));
			}
			Object.keys(dataAttributes).forEach(attr => result.items.push({
				label: attr,
				kind: CompletionItemKind.Value,
				textEdit: TextEdit.replace(range, dataAttributes[attr]),
				insertTextFormat: InsertTextFormat.Snippet
			}));
		}

		function collectAttributeValueSuggestions(valueStart: number, valueEnd: number = offset): CompletionList {
			let range: Range;
			let addQuotes: boolean;
			let valuePrefix: string;
			if (offset > valueStart && offset <= valueEnd && isQuote(text[valueStart])) {
				// inside quoted attribute
				let valueContentStart = valueStart + 1;
				let valueContentEnd = valueEnd;
				// valueEnd points to the char after quote, which encloses the replace range
				if (valueEnd > valueStart && text[valueEnd - 1] === text[valueStart]) {
					valueContentEnd--;
				}

				let wsBefore = getWordStart(text, offset, valueContentStart);
				let wsAfter = getWordEnd(text, offset, valueContentEnd);
				range = getReplaceRange(wsBefore, wsAfter);
				valuePrefix = offset >= valueContentStart && offset <= valueContentEnd ? text.substring(valueContentStart, offset) : '';
				addQuotes = false;
			} else {
				range = getReplaceRange(valueStart, valueEnd);
				valuePrefix = text.substring(valueStart, offset);
				addQuotes = true;
			}

			let tag = currentTag.toLowerCase();
			let attribute = currentAttributeName.toLowerCase();

			if (completionParticipants.length > 0) {
				let fullRange = getReplaceRange(valueStart, valueEnd);
				for (let participant of completionParticipants) {
					if (participant.onHtmlAttributeValue) {
						participant.onHtmlAttributeValue({ document, position, tag, attribute, value: valuePrefix, range: fullRange });
					}
				}
			}

			let value = scanner.getTokenText();
			tagProviders.forEach(provider => {
				provider.collectValues(tag, attribute, value => {
					let insertText = addQuotes ? '"' + value + '"' : value;
					result.items.push({
						label: value,
						filterText: insertText,
						kind: CompletionItemKind.Unit,
						textEdit: TextEdit.replace(range, insertText),
						insertTextFormat: InsertTextFormat.PlainText
					});
				});
			});
			collectCharacterEntityProposals();
			return result;
		}

		function scanNextForEndPos(nextToken: TokenType): number {
			if (offset === scanner.getTokenEnd()) {
				token = scanner.scan();
				if (token === nextToken && scanner.getTokenOffset() === offset) {
					return scanner.getTokenEnd();
				}
			}
			return offset;
		}

		function collectInsideContent(): CompletionList {
			for (let participant of completionParticipants) {
				if (participant.onHtmlContent) {
					participant.onHtmlContent({ document, position });
				}
			}

			return collectCharacterEntityProposals();
		}

		function collectCharacterEntityProposals() {
			// character entities
			let k = offset - 1;
			let characterStart = position.character;
			while (k >= 0 && isLetterOrDigit(text, k)) {
				k--;
				characterStart--;
			}
			if (k >= 0 && text[k] === '&') {
				let range = Range.create(Position.create(position.line, characterStart - 1), position);
				for (let entity in entities) {
					if (endsWith(entity, ';')) {
						const label = '&' + entity;
						result.items.push({
							label,
							kind: CompletionItemKind.Keyword,
							documentation: localize('entity.propose', `Character entity representing '${entities[entity]}'`),
							textEdit: TextEdit.replace(range, label),
							insertTextFormat: InsertTextFormat.PlainText
						});
					}
				}
			}
			return result;
		}

		function suggestDoctype(replaceStart: number, replaceEnd: number) {
			let range = getReplaceRange(replaceStart, replaceEnd);
			result.items.push({
				label: '!DOCTYPE',
				kind: CompletionItemKind.Property,
				documentation: 'A preamble for an HTML document.',
				textEdit: TextEdit.replace(range, '!DOCTYPE html>'),
				insertTextFormat: InsertTextFormat.PlainText
			});
		}

		let token = scanner.scan();

		while (token !== TokenType.EOS && scanner.getTokenOffset() <= offset) {
			switch (token) {
				case TokenType.StartTagOpen:
					if (scanner.getTokenEnd() === offset) {
						let endPos = scanNextForEndPos(TokenType.StartTag);
						if (position.line === 0) {			
							suggestDoctype(offset, endPos);
						}
						return collectTagSuggestions(offset, endPos);
					}
					break;
				case TokenType.StartTag:
					if (scanner.getTokenOffset() <= offset && offset <= scanner.getTokenEnd()) {
						return collectOpenTagSuggestions(scanner.getTokenOffset(), scanner.getTokenEnd());
					}
					currentTag = scanner.getTokenText();
					break;
				case TokenType.AttributeName:
					if (scanner.getTokenOffset() <= offset && offset <= scanner.getTokenEnd()) {
						return collectAttributeNameSuggestions(scanner.getTokenOffset(), scanner.getTokenEnd());
					}
					currentAttributeName = scanner.getTokenText();
					break;
				case TokenType.DelimiterAssign:
					if (scanner.getTokenEnd() === offset) {
						let endPos = scanNextForEndPos(TokenType.AttributeValue);
						return collectAttributeValueSuggestions(offset, endPos);
					}
					break;
				case TokenType.AttributeValue:
					if (scanner.getTokenOffset() <= offset && offset <= scanner.getTokenEnd()) {
						return collectAttributeValueSuggestions(scanner.getTokenOffset(), scanner.getTokenEnd());
					}
					break;
				case TokenType.Whitespace:
					if (offset <= scanner.getTokenEnd()) {
						switch (scanner.getScannerState()) {
							case ScannerState.AfterOpeningStartTag:
								let startPos = scanner.getTokenOffset();
								let endTagPos = scanNextForEndPos(TokenType.StartTag);
								return collectTagSuggestions(startPos, endTagPos);
							case ScannerState.WithinTag:
							case ScannerState.AfterAttributeName:
								return collectAttributeNameSuggestions(scanner.getTokenEnd());
							case ScannerState.BeforeAttributeValue:
								return collectAttributeValueSuggestions(scanner.getTokenEnd());
							case ScannerState.AfterOpeningEndTag:
								return collectCloseTagSuggestions(scanner.getTokenOffset() - 1, false);
							case ScannerState.WithinContent:
								return collectInsideContent();
						}
					}
					break;
				case TokenType.EndTagOpen:
					if (offset <= scanner.getTokenEnd()) {
						let afterOpenBracket = scanner.getTokenOffset() + 1;
						let endOffset = scanNextForEndPos(TokenType.EndTag);
						return collectCloseTagSuggestions(afterOpenBracket, false, endOffset);
					}
					break;
				case TokenType.EndTag:
					if (offset <= scanner.getTokenEnd()) {
						let start = scanner.getTokenOffset() - 1;
						while (start >= 0) {
							let ch = text.charAt(start);
							if (ch === '/') {
								return collectCloseTagSuggestions(start, false, scanner.getTokenEnd());
							} else if (!isWhiteSpace(ch)) {
								break;
							}
							start--;
						}
					}
					break;
				case TokenType.StartTagClose:
					if (offset <= scanner.getTokenEnd()) {
						if (currentTag) {
							return collectAutoCloseTagSuggestion(scanner.getTokenEnd(), currentTag);
						}
					}
					break;
				case TokenType.Content:
					if (offset <= scanner.getTokenEnd()) {
						return collectInsideContent();
					}
					break;
				default:
					if (offset <= scanner.getTokenEnd()) {
						return result;
					}
					break;
			}
			token = scanner.scan();
		}

		return result;
	}

	doTagComplete(document: TextDocument, position: Position, htmlDocument: HTMLDocument): string | null {
		let offset = document.offsetAt(position);
		if (offset <= 0) {
			return null;
		}
		let char = document.getText().charAt(offset - 1);
		if (char === '>') {
			let node = htmlDocument.findNodeBefore(offset);
			if (node && node.tag && !isEmptyElement(node.tag) && node.start < offset && (!node.endTagStart || node.endTagStart > offset)) {
				let scanner = createScanner(document.getText(), node.start);
				let token = scanner.scan();
				while (token !== TokenType.EOS && scanner.getTokenEnd() <= offset) {
					if (token === TokenType.StartTagClose && scanner.getTokenEnd() === offset) {
						return `$0</${node.tag}>`;
					}
					token = scanner.scan();
				}
			}
		} else if (char === '/') {
			let node: Node | undefined = htmlDocument.findNodeBefore(offset);
			while (node && node.closed) {
				node = node.parent;
			}
			if (node && node.tag) {
				let scanner = createScanner(document.getText(), node.start);
				let token = scanner.scan();
				while (token !== TokenType.EOS && scanner.getTokenEnd() <= offset) {
					if (token === TokenType.EndTagOpen && scanner.getTokenEnd() === offset) {
						return `${node.tag}>`;
					}
					token = scanner.scan();
				}
			}
		}
		return null;
	}
}

function isQuote(s: string): boolean {
	return /^["']*$/.test(s);
}

function isWhiteSpace(s: string): boolean {
	return /^\s*$/.test(s);
}

function isFollowedBy(s: string, offset: number, intialState: ScannerState, expectedToken: TokenType) {
	let scanner = createScanner(s, offset, intialState);
	let token = scanner.scan();
	while (token === TokenType.Whitespace) {
		token = scanner.scan();
	}
	return token === expectedToken;
}

function getWordStart(s: string, offset: number, limit: number): number {
	while (offset > limit && !isWhiteSpace(s[offset - 1])) {
		offset--;
	}
	return offset;
}

function getWordEnd(s: string, offset: number, limit: number): number {
	while (offset < limit && !isWhiteSpace(s[offset])) {
		offset++;
	}
	return offset;
}
