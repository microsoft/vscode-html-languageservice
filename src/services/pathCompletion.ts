/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ICompletionParticipant, TextDocument, CompletionItemKind, CompletionItem, TextEdit, Range, Position, DocumentUri, FileType, HtmlAttributeValueContext, DocumentContext, CompletionList } from '../htmlLanguageTypes';
import { HTMLDataManager } from '../languageFacts/dataManager';
import { startsWith } from '../utils/strings';

export class PathCompletionParticipant implements ICompletionParticipant {
	private atributeCompletions: HtmlAttributeValueContext[] = [];

	constructor(private dataManager: HTMLDataManager, private readonly readDirectory: (uri: DocumentUri) => Promise<[string, FileType][]>) {
	}

	public onHtmlAttributeValue(context: HtmlAttributeValueContext) {
		if (this.dataManager.isPathAttribute(context.tag, context.attribute)) {
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
					const suggestions = await this.providePathSuggestions(attributeCompletion.value, replaceRange, document, documentContext, attributeCompletion);
					for (const item of suggestions) {
						result.items.push(item);
					}
				}
			}
		}
		return result;
	}

	private async providePathSuggestions(valueBeforeCursor: string, replaceRange: Range, document: TextDocument, documentContext: DocumentContext, context?: HtmlAttributeValueContext) {
		const valueBeforeLastSlash = valueBeforeCursor.substring(0, valueBeforeCursor.lastIndexOf('/') + 1); // keep the last slash

		let parentDir = documentContext.resolveReference(valueBeforeLastSlash || '.', document.uri);
		if (parentDir) {
			try {
				const result: CompletionItem[] = [];
				const infos = await this.readDirectory(parentDir);
				
				// Determine file extensions to prioritize/filter based on tag and attributes
				const extensionFilter = this.getExtensionFilter(context);
				
				for (const [name, type] of infos) {
					// Exclude paths that start with `.`
					if (name.charCodeAt(0) !== CharCode_dot) {
						const item = createCompletionItem(name, type === FileType.Directory, replaceRange);
						
						// Apply filtering/sorting based on file extension
						if (extensionFilter) {
							if (type === FileType.Directory) {
								// Always include directories
								result.push(item);
							} else {
								// For files, check if they match the filter
								const matchesFilter = extensionFilter.extensions.some(ext => name.toLowerCase().endsWith(ext));
								if (matchesFilter) {
									// Add matching files with higher sort priority
									item.sortText = '0_' + name;
									result.push(item);
								} else if (!extensionFilter.exclusive) {
									// Add non-matching files with lower sort priority if not exclusive
									item.sortText = '1_' + name;
									result.push(item);
								}
								// If exclusive and doesn't match, don't add the file
							}
						} else {
							result.push(item);
						}
					}
				}
				return result;
			} catch (e) {
				// ignore
			}
		}
		return [];
	}

	/**
	 * Determines which file extensions to filter/prioritize based on the HTML tag and attributes
	 */
	private getExtensionFilter(context?: HtmlAttributeValueContext): { extensions: string[], exclusive: boolean } | undefined {
		if (!context) {
			return undefined;
		}

		// Handle <link> tag with rel="stylesheet"
		if (context.tag === 'link' && context.attribute === 'href' && context.attributes) {
			const rel = context.attributes['rel'];
			if (rel === 'stylesheet' || rel === '"stylesheet"' || rel === "'stylesheet'") {
				// Filter to CSS files for stylesheets
				return { extensions: ['.css', '.scss', '.sass', '.less'], exclusive: false };
			}
			if (rel === 'icon' || rel === '"icon"' || rel === "'icon'" || 
			    rel === 'apple-touch-icon' || rel === '"apple-touch-icon"' || rel === "'apple-touch-icon'") {
				// Filter to image files for icons
				return { extensions: ['.ico', '.png', '.svg', '.jpg', '.jpeg', '.gif', '.webp'], exclusive: false };
			}
		}

		// Handle <script> tag with src attribute - prioritize JS files
		if (context.tag === 'script' && context.attribute === 'src') {
			return { extensions: ['.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx'], exclusive: false };
		}

		// Handle <img> tag with src attribute - prioritize image files
		if (context.tag === 'img' && context.attribute === 'src') {
			return { extensions: ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp', '.ico'], exclusive: false };
		}

		// Handle <video> tag with src attribute - prioritize video files
		if (context.tag === 'video' && context.attribute === 'src') {
			return { extensions: ['.mp4', '.webm', '.ogg', '.mov', '.avi'], exclusive: false };
		}

		// Handle <audio> tag with src attribute - prioritize audio files
		if (context.tag === 'audio' && context.attribute === 'src') {
			return { extensions: ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac'], exclusive: false };
		}

		return undefined;
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

