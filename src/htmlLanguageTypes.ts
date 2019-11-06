/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Position, Range, MarkupContent, MarkupKind } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';

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

export interface IReference {
	name: string;
	url: string;
}

export interface ITagData {
	name: string;
	description?: string | MarkupContent;
	attributes: IAttributeData[];
	references?: IReference[];
}

export interface IAttributeData {
	name: string;
	description?: string | MarkupContent;
	valueSet?: string;
	values?: IValueData[];
	references?: IReference[];
}

export interface IValueData {
	name: string;
	description?: string | MarkupContent;
	references?: IReference[];
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
	 * Provide data that could enhance the service's understanding of
	 * HTML tag / attribute / attribute-value
	 */
	customDataProviders?: IHTMLDataProvider[];

	/**
	 * Describes the LSP capabilities the client supports.
	 */
	clientCapabilities?: ClientCapabilities;
}