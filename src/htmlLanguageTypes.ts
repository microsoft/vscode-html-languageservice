/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { TextDocument, Position, Range } from 'vscode-languageserver-types';

export interface HTMLFormatConfiguration {
	tabSize?: number;
	insertSpaces?: boolean;
	indentEmptyLines?: boolean;
	wrapLineLength?: number;
	unformatted?: string;
	contentUnformatted?: string;
	indentInnerHtml?: boolean;
	wrapAttributes?: 'auto' | 'force' | 'force-aligned' | 'force-expand-multiline' | 'aligned-multiple' | 'preserve' | 'preserve-aligned';
	wrapAttributesIndentSize?: number;
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
	startTagEnd: number | undefined;
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
	resolveReference(ref: string, base?: string): string | undefined;
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

export interface ITagData {
	name: string;
	description?: string;
	attributes: IAttributeData[];
}

export interface IAttributeData {
	name: string;
	description?: string;
	valueSet?: string;
	values?: IValueData[];
}

export interface IValueData {
	name: string;
	description?: string;
}

export interface IValueSet {
	name: string;
	values: IValueData[];
}

export interface HTMLDataV1 {
	version: 1;
	tags?: ITagData[];
	globalAttributes?: IAttributeData[];
	valueSets?: IValueSet[];
}

export interface IHTMLDataProvider {
	getId(): string;
	isApplicable(languageId: string): boolean;

	provideTags(): ITagData[];
	provideAttributes(tag: string): IAttributeData[];
	provideValues(tag: string, attribute: string): IValueData[];
}
