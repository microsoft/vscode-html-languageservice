/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createScanner } from './parser/htmlScanner';
import { parse } from './parser/htmlParser';
import { HTMLCompletion } from './services/htmlCompletion';
import { HTMLHover } from './services/htmlHover';
import { format } from './services/htmlFormatter';
import { findDocumentLinks } from './services/htmlLinks';
import { findDocumentHighlights } from './services/htmlHighlighting';
import { findDocumentSymbols } from './services/htmlSymbolsProvider';
import { doRename } from './services/htmlRename';
import { findMatchingTagPosition } from './services/htmlMatchingTagPosition';
import { Position, CompletionList, Hover, Range, SymbolInformation, TextEdit, DocumentHighlight, DocumentLink, FoldingRange, SelectionRange, WorkspaceEdit } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Scanner, HTMLDocument, CompletionConfiguration, ICompletionParticipant, HTMLFormatConfiguration, DocumentContext, IHTMLDataProvider, HTMLDataV1, LanguageServiceOptions } from './htmlLanguageTypes';
import { getFoldingRanges } from './services/htmlFolding';
import { getSelectionRanges } from './services/htmlSelectionRange';
import { handleCustomDataProviders } from './languageFacts/builtinDataProviders';
import { HTMLDataProvider } from './languageFacts/dataProvider';

export * from './htmlLanguageTypes';
export { TextDocument } from 'vscode-languageserver-textdocument';
export * from 'vscode-languageserver-types';

export interface LanguageService {
	createScanner(input: string, initialOffset?: number): Scanner;
	parseHTMLDocument(document: TextDocument): HTMLDocument;
	findDocumentHighlights(document: TextDocument, position: Position, htmlDocument: HTMLDocument): DocumentHighlight[];
	doComplete(document: TextDocument, position: Position, htmlDocument: HTMLDocument, options?: CompletionConfiguration): CompletionList;
	setCompletionParticipants(registeredCompletionParticipants: ICompletionParticipant[]): void;
	doHover(document: TextDocument, position: Position, htmlDocument: HTMLDocument): Hover | null;
	format(document: TextDocument, range: Range | undefined, options: HTMLFormatConfiguration): TextEdit[];
	findDocumentLinks(document: TextDocument, documentContext: DocumentContext): DocumentLink[];
	findDocumentSymbols(document: TextDocument, htmlDocument: HTMLDocument): SymbolInformation[];
	doTagComplete(document: TextDocument, position: Position, htmlDocument: HTMLDocument): string | null;
	getFoldingRanges(document: TextDocument, context?: { rangeLimit?: number }): FoldingRange[];
	getSelectionRanges(document: TextDocument, positions: Position[]): SelectionRange[];
	doRename(document: TextDocument, position: Position, newName: string, htmlDocument: HTMLDocument): WorkspaceEdit | null;
	findMatchingTagPosition(document: TextDocument, position: Position, htmlDocument: HTMLDocument): Position | null;
}

export function getLanguageService(options?: LanguageServiceOptions): LanguageService {
	const htmlHover = new HTMLHover(options && options.clientCapabilities);
	const htmlCompletion = new HTMLCompletion(options && options.clientCapabilities);

	if (options && options.customDataProviders) {
		handleCustomDataProviders(options.customDataProviders);
	}

	return {
		createScanner,
		parseHTMLDocument: document => parse(document.getText()),
		doComplete: htmlCompletion.doComplete.bind(htmlCompletion),
		setCompletionParticipants: htmlCompletion.setCompletionParticipants.bind(htmlCompletion),
		doHover: htmlHover.doHover.bind(htmlHover),
		format,
		findDocumentHighlights,
		findDocumentLinks,
		findDocumentSymbols,
		getFoldingRanges,
		getSelectionRanges,
		doTagComplete: htmlCompletion.doTagComplete.bind(htmlCompletion),
		doRename,
		findMatchingTagPosition
	};
}

export function newHTMLDataProvider(id: string, customData: HTMLDataV1) : IHTMLDataProvider {
	return new HTMLDataProvider(id, customData);
}
