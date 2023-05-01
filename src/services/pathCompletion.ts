/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ICompletionParticipant, TextDocument, CompletionItemKind, CompletionItem, TextEdit, Range, Position, DocumentUri, FileType, HtmlAttributeValueContext, DocumentContext, CompletionList } from '../htmlLanguageTypes';
import { startsWith } from '../utils/strings';

export class PathCompletionParticipant implements ICompletionParticipant {
	private atributeCompletions: HtmlAttributeValueContext[] = [];

	constructor(private readonly readDirectory: (uri: DocumentUri) => Promise<[string, FileType][]>) {
	}

	public onHtmlAttributeValue(context: HtmlAttributeValueContext) {
		if (isPathAttribute(context.tag, context.attribute)) {
			this.atributeCompletions.push(context);
		}
	}

	public async computeCompletions(document: TextDocument, documentContext: DocumentContext): Promise<CompletionList> {
		const result: CompletionList = { items: [], isIncomplete: false };
		for (const attributeCompletion of this.atributeCompletions) {
			const fullValue = stripQuotes(document.getText(attributeCompletion.range));
			if (isCompletablePath(fullValue)) {
				if (fullValue === '.' || fullValue === '..') {
					result.isIncomplete = true;
				} else {
					const replaceRange = pathToReplaceRange(attributeCompletion.value, fullValue, attributeCompletion.range);
					const suggestions = await this.providePathSuggestions(attributeCompletion.value, replaceRange, document, documentContext);
					for (const item of suggestions) {
						result.items.push(item);
					}
				}
			}
		}
		return result;
	}

	private async providePathSuggestions(valueBeforeCursor: string, replaceRange: Range, document: TextDocument, documentContext: DocumentContext) {
		const valueBeforeLastSlash = valueBeforeCursor.substring(0, valueBeforeCursor.lastIndexOf('/') + 1); // keep the last slash

		let parentDir = documentContext.resolveReference(valueBeforeLastSlash || '.', document.uri);
		if (parentDir) {
			try {
				const result: CompletionItem[] = [];
				const infos = await this.readDirectory(parentDir);
				for (const [name, type] of infos) {
					// Exclude paths that start with `.`
					if (name.charCodeAt(0) !== CharCode_dot) {
						result.push(createCompletionItem(name, type === FileType.Directory, replaceRange));
					}
				}
				return result;
			} catch (e) {
				// ignore
			}
		}
		return [];
	}

}

const CharCode_dot = '.'.charCodeAt(0);

function stripQuotes(fullValue: string) {
	if (startsWith(fullValue, `'`) || startsWith(fullValue, `"`)) {
		return fullValue.slice(1, -1);
	} else {
		return fullValue;
	}
}

function isCompletablePath(value: string) {
	if (startsWith(value, 'http') || startsWith(value, 'https') || startsWith(value, '//')) {
		return false;
	}
	return true;
}

function isPathAttribute(tag: string, attr: string) {
	if (attr === 'src' || attr === 'href') {
		return true;
	}
	const a = PATH_TAG_AND_ATTR[tag];
	if (a) {
		if (typeof a === 'string') {
			return a === attr;
		} else {
			return a.indexOf(attr) !== -1;
		}
	}
	return false;
}

function pathToReplaceRange(valueBeforeCursor: string, fullValue: string, range: Range) {
	let replaceRange: Range;
	const lastIndexOfSlash = valueBeforeCursor.lastIndexOf('/');
	if (lastIndexOfSlash === -1) {
		replaceRange = shiftRange(range, 1, -1);
	} else {
		// For cases where cursor is in the middle of attribute value, like <script src="./s|rc/test.js">
		// Find the last slash before cursor, and calculate the start of replace range from there
		const valueAfterLastSlash = fullValue.slice(lastIndexOfSlash + 1);
		const startPos = shiftPosition(range.end, -1 - valueAfterLastSlash.length);

		// If whitespace exists, replace until there is no more
		const whitespaceIndex = valueAfterLastSlash.indexOf(' ');
		let endPos;
		if (whitespaceIndex !== -1) {
			endPos = shiftPosition(startPos, whitespaceIndex);
		} else {
			endPos = shiftPosition(range.end, -1);
		}
		replaceRange = Range.create(startPos, endPos);
	}
	return replaceRange;
}


function createCompletionItem(p: string, isDir: boolean, replaceRange: Range): CompletionItem {
	if (isDir) {
		p = p + '/';
		return {
			label: p,
			kind: CompletionItemKind.Folder,
			textEdit: TextEdit.replace(replaceRange, p),
			command: {
				title: 'Suggest',
				command: 'editor.action.triggerSuggest'
			}
		};
	} else {
		return {
			label: p,
			kind: CompletionItemKind.File,
			textEdit: TextEdit.replace(replaceRange, p)
		};
	}
}

function shiftPosition(pos: Position, offset: number): Position {
	return Position.create(pos.line, pos.character + offset);
}
function shiftRange(range: Range, startOffset: number, endOffset: number): Range {
	const start = shiftPosition(range.start, startOffset);
	const end = shiftPosition(range.end, endOffset);
	return Range.create(start, end);
}

// Selected from https://stackoverflow.com/a/2725168/1780148
const PATH_TAG_AND_ATTR: { [tag: string]: string | string[] } = {
	// HTML 4
	a: 'href',
	area: 'href',
	body: 'background',
	blockquote: 'cite',
	del: 'cite',
	form: 'action',
	frame: ['src', 'longdesc'],
	img: ['src', 'longdesc'],
	ins: 'cite',
	link: 'href',
	object: 'data',
	q: 'cite',
	script: 'src',
	// HTML 5
	audio: 'src',
	button: 'formaction',
	command: 'icon',
	embed: 'src',
	html: 'manifest',
	input: ['src', 'formaction'],
	source: 'src',
	track: 'src',
	video: ['src', 'poster']
};
