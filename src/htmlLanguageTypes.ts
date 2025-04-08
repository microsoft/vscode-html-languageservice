/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {
	Position, Range, Location,
	MarkupContent, MarkupKind, MarkedString, DocumentUri,
	SelectionRange, WorkspaceEdit,
	CompletionList, CompletionItemKind, CompletionItem, CompletionItemTag, InsertTextMode, Command,
	SymbolInformation, DocumentSymbol, SymbolKind,
	Hover, TextEdit, InsertReplaceEdit, InsertTextFormat, DocumentHighlight, DocumentHighlightKind,
	DocumentLink, FoldingRange, FoldingRangeKind,
	SignatureHelp, Definition, Diagnostic, FormattingOptions, Color, ColorInformation, ColorPresentation
} from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';


export {
	TextDocument,
	Position, Range, Location,
	MarkupContent, MarkupKind, MarkedString, DocumentUri,
	SelectionRange, WorkspaceEdit,
	CompletionList, CompletionItemKind, CompletionItem, CompletionItemTag, InsertTextMode, Command,
	SymbolInformation, DocumentSymbol, SymbolKind,
	Hover, TextEdit, InsertReplaceEdit, InsertTextFormat, DocumentHighlight, DocumentHighlightKind,
	DocumentLink, FoldingRange, FoldingRangeKind,
	SignatureHelp, Definition, Diagnostic, FormattingOptions, Color, ColorInformation, ColorPresentation
};

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
	indentScripts?: 'keep' | 'separate' | 'normal';
	templating?: ('auto' | 'none' | 'angular' | 'django' | 'erb' | 'handlebars' | 'php' | 'smarty')[] | boolean;
	unformattedContentDelimiter?: string;

}

export interface HoverSettings {
	documentation?: boolean;
	references?: boolean
}

export interface CompletionConfiguration {
	[provider: string]: boolean | undefined | string;
	hideAutoCompleteProposals?: boolean;
	attributeDefaultValue?: 'empty' | 'singlequotes' | 'doublequotes';
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
	resolveReference(ref: string, base: string): string | undefined;
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

export interface IReference {
	name: string;
	url: string;
}

export interface ITagData {
	name: string;
	description?: string | MarkupContent;
	attributes: IAttributeData[];
	references?: IReference[];
	void?: boolean;
	browsers?: string[];
	status?: BaselineStatus;
}

export interface IAttributeData {
	name: string;
	description?: string | MarkupContent;
	valueSet?: string;
	values?: IValueData[];
	references?: IReference[];
	browsers?: string[];
	status?: BaselineStatus;
}

export interface IValueData {
	name: string;
	description?: string | MarkupContent;
	references?: IReference[];
	browsers?: string[];
	status?: BaselineStatus;
}

export interface IValueSet {
	name: string;
	values: IValueData[];
}

export interface HTMLDataV1 {
	version: 1 | 1.1;
	tags?: ITagData[];
	globalAttributes?: IAttributeData[];
	valueSets?: IValueSet[];
}

export interface BaselineStatus {
	baseline: Baseline;
	baseline_low_date?: string;
	baseline_high_date?: string;
}

export type Baseline = false | 'low' | 'high';

export interface IHTMLDataProvider {
	getId(): string;
	isApplicable(languageId: string): boolean;

	provideTags(): ITagData[];
	provideAttributes(tag: string): IAttributeData[];
	provideValues(tag: string, attribute: string): IValueData[];
}

/**
 * Describes what LSP capabilities the client supports
 */
export interface ClientCapabilities {
	/**
	 * The text document client capabilities
	 */
	textDocument?: {
		/**
		 * Capabilities specific to completions.
		 */
		completion?: {
			/**
			 * The client supports the following `CompletionItem` specific
			 * capabilities.
			 */
			completionItem?: {
				/**
				 * Client supports the follow content formats for the documentation
				 * property. The order describes the preferred format of the client.
				 */
				documentationFormat?: MarkupKind[];
			};

		};
		/**
		 * Capabilities specific to hovers.
		 */
		hover?: {
			/**
			 * Client supports the follow content formats for the content
			 * property. The order describes the preferred format of the client.
			 */
			contentFormat?: MarkupKind[];
		};
	};
}

export namespace ClientCapabilities {
	export const LATEST: ClientCapabilities = {
		textDocument: {
			completion: {
				completionItem: {
					documentationFormat: [MarkupKind.Markdown, MarkupKind.PlainText]
				}
			},
			hover: {
				contentFormat: [MarkupKind.Markdown, MarkupKind.PlainText]
			}
		}
	};
}

export interface LanguageServiceOptions {
	/**
	 * Unless set to false, the default HTML data provider will be used 
	 * along with the providers from customDataProviders.
	 * Defaults to true.
	 */
	useDefaultDataProvider?: boolean;

	/**
	 * Provide data that could enhance the service's understanding of
	 * HTML tag / attribute / attribute-value
	 */
	customDataProviders?: IHTMLDataProvider[];

	/**
	 * Abstract file system access away from the service.
	 * Used for path completion, etc.
	 */
	fileSystemProvider?: FileSystemProvider;

	/**
	 * Describes the LSP capabilities the client supports.
	 */
	clientCapabilities?: ClientCapabilities;
}

export enum FileType {
	/**
	 * The file type is unknown.
	 */
	Unknown = 0,
	/**
	 * A regular file.
	 */
	File = 1,
	/**
	 * A directory.
	 */
	Directory = 2,
	/**
	 * A symbolic link to a file.
	 */
	SymbolicLink = 64
}

export interface FileStat {
	/**
	 * The type of the file, e.g. is a regular file, a directory, or symbolic link
	 * to a file.
	 */
	type: FileType;
	/**
	 * The creation timestamp in milliseconds elapsed since January 1, 1970 00:00:00 UTC.
	 */
	ctime: number;
	/**
	 * The modification timestamp in milliseconds elapsed since January 1, 1970 00:00:00 UTC.
	 */
	mtime: number;
	/**
	 * The size in bytes.
	 */
	size: number;
}

export interface FileSystemProvider {
	stat(uri: DocumentUri): Promise<FileStat>;
	readDirectory?(uri: DocumentUri): Promise<[string, FileType][]>;
}
