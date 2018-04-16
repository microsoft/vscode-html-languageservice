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


export interface FoldingRangeList {
    /**
     * The folding ranges.
     */
    ranges: FoldingRange[];
}
export const enum FoldingRangeType {
    /**
     * Folding range for a comment
     */
    Comment = "comment",
    /**
     * Folding range for a imports or includes
     */
    Imports = "imports",
    /**
     * Folding range for a region (e.g. `#region`)
     */
    Region = "region",
}

/**
 * Represents a folding range.
 */
export interface FoldingRange {
    /**
     * The start line number of the folding range.
     */
    startLine: number;
    /**
     * The start column of the folding range. If not set, this defaults to the length of the start line.
     */
    startColumn?: number;
    /**
     * The end line number. The last line will be hidden.
     */
    endLine: number;
    /**
     * The start column of the folding range. If not set, this defaults to the length of the end line.
     */
    endColumn?: number;
    /**
     * The type of folding range.
     */
    type?: FoldingRangeType | string;
}