/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
import { TextDocument, Position, Range } from 'vscode-languageserver-types';

import { FoldingRangeType, FoldingRange, FoldingRangeList, TokenType } from '../htmlLanguageTypes';
import { binarySearch } from '../utils/arrays';
import { createScanner } from '../parser/htmlScanner';

function limitRanges(ranges: FoldingRange[], maxRanges: number) {
	ranges = ranges.sort((r1, r2) => {
		let diff = r1.startLine - r2.startLine;
		if (diff === 0) {
			diff = r1.endLine - r2.endLine;
		}
		return diff;
	});

	// compute each range's nesting level in 'nestingLevels'.
	// count the number of ranges for each level in 'nestingLevelCounts'
	let top: FoldingRange | undefined = void 0;
	let previous: FoldingRange[] = [];
	let nestingLevels: number[] = [];
	let nestingLevelCounts: number[] = [];

	let setNestingLevel = (index: number, level: number) => {
		nestingLevels[index] = level;
		if (level < 30) {
			nestingLevelCounts[level] = (nestingLevelCounts[level] || 0) + 1;
		}
	};

	// compute nesting levels and sanitize
	for (let i = 0; i < ranges.length; i++) {
		let entry = ranges[i];
		if (!top) {
			top = entry;
			setNestingLevel(i, 0);
		} else {
			if (entry.startLine > top.startLine) {
				if (entry.endLine <= top.endLine) {
					previous.push(top);
					top = entry;
					setNestingLevel(i, previous.length);
				} else if (entry.startLine > top.endLine) {
					do {
						top = previous.pop();
					} while (top && entry.startLine > top.endLine);
					if (top) {
						previous.push(top);
					}
					top = entry;
					setNestingLevel(i, previous.length);
				}
			}
		}
	}
	let entries = 0;
	let maxLevel = 0;
	for (let i = 0; i < nestingLevelCounts.length; i++) {
		let n = nestingLevelCounts[i];
		if (n) {
			if (n + entries > maxRanges) {
				maxLevel = i;
				break;
			}
			entries += n;
		}
    }
	return ranges.filter((r, index) => (typeof nestingLevels[index] === 'number') && nestingLevels[index] < maxLevel);
}

export const EMPTY_ELEMENTS: string[] = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];

export function isEmptyElement(e: string): boolean {
	return !!e && binarySearch(EMPTY_ELEMENTS, e.toLowerCase(), (s1: string, s2: string) => s1.localeCompare(s2)) >= 0;
}

export function getFoldingRanges(document: TextDocument, context: { maxRanges?: number}): FoldingRangeList {
	const scanner = createScanner(document.getText());
	let token = scanner.scan();
	let ranges: FoldingRange[] = [];
	let stack: { startLine: number, tagName: string }[] = [];
	let lastTagName = null;
	let prevStart = -1;

	function addRange(range: FoldingRange) {
		ranges.push(range);
		prevStart = range.startLine;
	}

	while (token !== TokenType.EOS) {
		switch (token) {
			case TokenType.StartTag: {
				let tagName = scanner.getTokenText();
				let startLine = document.positionAt(scanner.getTokenOffset()).line;
				stack.push({ startLine, tagName });
				lastTagName = tagName;
				break;
			}
			case TokenType.EndTag: {
				lastTagName = scanner.getTokenText();
				break;
			}
			case TokenType.StartTagClose:
				if (!lastTagName || !isEmptyElement(lastTagName)) {
					break;
				}
			// fallthrough
			case TokenType.EndTagClose:
			case TokenType.StartTagSelfClose: {
				let i = stack.length - 1;
				while (i >= 0 && stack[i].tagName !== lastTagName) {
					i--;
				}
				if (i >= 0) {
					let stackElement = stack[i];
					stack.length = i;
					let line = document.positionAt(scanner.getTokenOffset()).line;
					let startLine = stackElement.startLine;
					let endLine = line - 1;
					if (endLine > startLine && prevStart !== startLine) {
						addRange({ startLine, endLine });
					}
				}
				break;
			}
			case TokenType.Comment: {
				let startLine = document.positionAt(scanner.getTokenOffset()).line;
				let text = scanner.getTokenText();
				let m = text.match(/^\s*#(region\b)|(endregion\b)/);
				if (m) {
					if (m[1]) { // start pattern match
						stack.push({ startLine, tagName: '' }); // empty tagName marks region
					} else {
						let i = stack.length - 1;
						while (i >= 0 && stack[i].tagName.length) {
							i--;
						}
						if (i >= 0) {
							let stackElement = stack[i];
							stack.length = i;
							let endLine = startLine;
							startLine = stackElement.startLine;
							if (endLine > startLine && prevStart !== startLine) {
								addRange({ startLine, endLine, type: FoldingRangeType.Region });
							}
						}
					}
				} else {
					let endLine = document.positionAt(scanner.getTokenOffset() + scanner.getTokenLength()).line;
					if (startLine < endLine) {
						addRange({ startLine, endLine, type: FoldingRangeType.Comment });
					}
				}
				break;
			}
		}
		token = scanner.scan();
	}

	let maxRanges = context && context.maxRanges || Number.MAX_VALUE;
	if (ranges.length > maxRanges) {
		ranges = limitRanges(ranges, maxRanges);
	}
	return { ranges };
}