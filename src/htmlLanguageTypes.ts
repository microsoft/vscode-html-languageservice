/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { TextDocument, Position, Range } from 'vscode-languageserver-types';


export interface HTMLFormatConfiguration {
    tabSize?: number;
    insertSpaces?: boolean;
    wrapLineLength?: number;
    unformatted?: string;
    contentUnformatted?: string;
    indentInnerHtml?: boolean;
    wrapAttributes?: 'auto' | 'force' | 'force-aligned' | 'force-expand-multiline';
    preserveNewLines?: boolean;
    maxPreserveNewLines?: number;
    indentHandlebars?: boolean;
    endWithNewline?: boolean;
    extraLiners?: string;
}

export interface CompletionConfiguration {
    [provider: string]: boolean | undefined;
    hideAutoCompleteProposals?: boolean;
}

export interface Node {
    tag: string | undefined;
    start: number;
    end: number;
    endTagStart: number | undefined;
    children: Node[];
    parent?: Node;
    attributes?: { [name: string]: string | null } | undefined;
}


export enum TokenType {
    StartCommentTag,
    Comment,
    EndCommentTag,
    StartTagOpen,
    StartTagClose,
    StartTagSelfClose,
    StartTag,
    EndTagOpen,
    EndTagClose,
    EndTag,
    DelimiterAssign,
    AttributeName,
    AttributeValue,
    StartDoctypeTag,
    Doctype,
    EndDoctypeTag,
    Content,
    Whitespace,
    Unknown,
    Script,
    Styles,
    EOS
}

export enum ScannerState {
    WithinContent,
    AfterOpeningStartTag,
    AfterOpeningEndTag,
    WithinDoctype,
    WithinTag,
    WithinEndTag,
    WithinComment,
    WithinScriptContent,
    WithinStyleContent,
    AfterAttributeName,
    BeforeAttributeValue
}

export interface Scanner {
    scan(): TokenType;
    getTokenType(): TokenType;
    getTokenOffset(): number;
    getTokenLength(): number;
    getTokenEnd(): number;
    getTokenText(): string;
    getTokenError(): string | undefined;
    getScannerState(): ScannerState;
}

export declare type HTMLDocument = {
    roots: Node[];
    findNodeBefore(offset: number): Node;
    findNodeAt(offset: number): Node;
};

export interface DocumentContext {
    resolveReference(ref: string, base?: string): string;
}

export interface HtmlAttributeValueContext {
    document: TextDocument;
    position: Position;
    tag: string;
    attribute: string;
    value: string;
    range: Range;
}

export interface HtmlContentContext {
    document: TextDocument;
    position: Position;
}

export interface ICompletionParticipant {
    onHtmlAttributeValue?: (context: HtmlAttributeValueContext) => void;
    onHtmlContent?: (context: HtmlContentContext) => void;
}


/**
 * Enum of known range kinds
 */
export enum FoldingRangeKind {
	/**
	 * Folding range for a comment
	 */
	Comment = 'comment',
	/**
	 * Folding range for a imports or includes
	 */
	Imports = 'imports',
	/**
	 * Folding range for a region (e.g. `#region`)
	 */
	Region = 'region'
}

/**
 * Represents a folding range.
 */
export interface FoldingRange {

	/**
	 * The zero-based line number from where the folded range starts.
	 */
	startLine: number;

	/**
	 * The zero-based character offset from where the folded range starts. If not defined, defaults to the length of the start line.
	 */
	startCharacter?: number;

	/**
	 * The zero-based line number where the folded range ends.
	 */
	endLine: number;

	/**
	 * The zero-based character offset before the folded range ends. If not defined, defaults to the length of the end line.
	 */
	endCharacter?: number;

	/**
	 * Describes the kind of the folding range such as `comment' or 'region'. The kind
	 * is used to categorize folding ranges and used by commands like 'Fold all comments'. See
	 * [FoldingRangeKind](#FoldingRangeKind) for an enumeration of standardized kinds.
	 */
	kind?: string;
}