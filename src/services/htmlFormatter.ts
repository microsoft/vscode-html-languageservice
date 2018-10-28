/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { HTMLFormatConfiguration } from '../htmlLanguageTypes';
import { TextDocument, Range, TextEdit, Position } from 'vscode-languageserver-types';
import { IBeautifyHTMLOptions, html_beautify } from '../beautify/beautify-html';
import { repeat } from '../utils/strings';

export function format(document: TextDocument, range: Range | undefined, options: HTMLFormatConfiguration): TextEdit[] {
	let value = document.getText();
	let includesEnd = true;
	let initialIndentLevel = 0;
	let tabSize = options.tabSize || 4;
	let dontTrunk = false; //TODO: Place this better
	if (range) {
		let startOffset = document.offsetAt(range.start);

		// include all leading whitespace iff at the beginning of the line
		let extendedStart = startOffset;
		while (extendedStart > 0 && isWhitespace(value, extendedStart - 1)) {
			extendedStart--;
		}
		if (extendedStart === 0 || isEOL(value, extendedStart - 1)) {
			startOffset = extendedStart;
		} else {
			// else keep at least one whitespace
			if (extendedStart < startOffset) {
				startOffset = extendedStart + 1;
			}
		}

		// include all following whitespace until the end of the line
		let endOffset = document.offsetAt(range.end);
		let extendedEnd = endOffset;
		while (extendedEnd < value.length && isWhitespace(value, extendedEnd)) {
			extendedEnd++;
		}
		if (extendedEnd === value.length || isEOL(value, extendedEnd)) {
			endOffset = extendedEnd;
		}
		range = Range.create(document.positionAt(startOffset), document.positionAt(endOffset));

		//check if substring in inside an element
		//TODO instead of regex find out if last < is opening or closing
		let firstHalf = value.substring(0, startOffset);
		let secondHalf = value.substring(endOffset, value.length);
		if ((firstHalf.match(new RegExp(/</g)) || []).length > (firstHalf.match(new RegExp(/>/g)) || []).length &&
		 (secondHalf.match(new RegExp(/</g)) || []).length < (secondHalf.match(new RegExp(/>/g)) || []).length){
			//set no truncation
			let noChangeHTML: IBeautifyHTMLOptions = {};
				return [{
					range: range,
					newText: html_beautify(value, noChangeHTML)
			}];
		}

		includesEnd = endOffset === value.length;
		value = value.substring(startOffset, endOffset);

		if (startOffset !== 0) {
			let startOfLineOffset = document.offsetAt(Position.create(range.start.line, 0));
			initialIndentLevel = computeIndentLevel(document.getText(), startOfLineOffset, options);
		}
	} else {
		range = Range.create(Position.create(0, 0), document.positionAt(value.length));
	}
	let htmlOptions: IBeautifyHTMLOptions = {
		indent_size: options.insertSpaces ? tabSize : 1,
		indent_char: options.insertSpaces ? ' ' : '\t',
		wrap_line_length: getFormatOption(options, 'wrapLineLength', 120),
		unformatted: getTagsFormatOption(options, 'unformatted', void 0),
		content_unformatted: getTagsFormatOption(options, 'contentUnformatted', void 0),
		indent_inner_html: getFormatOption(options, 'indentInnerHtml', false),
		preserve_newlines: getFormatOption(options, 'preserveNewLines', true),
		max_preserve_newlines: getFormatOption(options, 'maxPreserveNewLines', 32786),
		indent_handlebars: getFormatOption(options, 'indentHandlebars', false),
		end_with_newline: includesEnd && getFormatOption(options, 'endWithNewline', false),
		extra_liners: getTagsFormatOption(options, 'extraLiners', void 0),
		wrap_attributes: getFormatOption(options, 'wrapAttributes', 'auto'),
		wrap_attributes_indent_size: getFormatOption(options, 'wrapAttributesIndentSize', void 0),
		eol: '\n'
	};

	//TODO:set dont truncate whitetext before this line


	let result = html_beautify(value, htmlOptions);
	if (initialIndentLevel > 0) {
		let indent = options.insertSpaces ? repeat(' ', tabSize * initialIndentLevel) : repeat('\t', initialIndentLevel);
		result = result.split('\n').join('\n' + indent);
		if (range.start.character === 0) {
			result = indent + result; // keep the indent
		}
	}
	return [{
		range: range,
		newText: result
	}];
}

function getFormatOption(options: HTMLFormatConfiguration, key: keyof HTMLFormatConfiguration, dflt: any): any {
	if (options && options.hasOwnProperty(key)) {
		let value = options[key];
		if (value !== null) {
			return value;
		}
	}
	return dflt;
}

function getTagsFormatOption(options: HTMLFormatConfiguration, key: keyof HTMLFormatConfiguration, dflt: string[] | undefined): string[] | undefined {
	let list = <string>getFormatOption(options, key, null);
	if (typeof list === 'string') {
		if (list.length > 0) {
			return list.split(',').map(t => t.trim().toLowerCase());
		}
		return [];
	}
	return dflt;
}

function computeIndentLevel(content: string, offset: number, options: HTMLFormatConfiguration): number {
	let i = offset;
	let nChars = 0;
	let tabSize = options.tabSize || 4;
	while (i < content.length) {
		let ch = content.charAt(i);
		if (ch === ' ') {
			nChars++;
		} else if (ch === '\t') {
			nChars += tabSize;
		} else {
			break;
		}
		i++;
	}
	return Math.floor(nChars / tabSize);
}

function getEOL(document: TextDocument): string {
	let text = document.getText();
	if (document.lineCount > 1) {
		let to = document.offsetAt(Position.create(1, 0));
		let from = to;
		while (from > 0 && isEOL(text, from - 1)) {
			from--;
		}
		return text.substr(from, to - from);
	}
	return '\n';
}

function isEOL(text: string, offset: number) {
	return '\r\n'.indexOf(text.charAt(offset)) !== -1;
}

function isWhitespace(text: string, offset: number) {
	return ' \t'.indexOf(text.charAt(offset)) !== -1;
}
