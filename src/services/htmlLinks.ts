/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { TokenType, createScanner } from '../parser/htmlScanner';
import { TextDocument, Range } from 'vscode-languageserver-types';
import * as paths from '../utils/paths';
import * as strings from '../utils/strings';
import Uri from 'vscode-uri';

import { DocumentLink, DocumentContext } from '../htmlLanguageService';

function normalizeRef(url: string, languageId: string): string {
	let first = url[0];
	let last = url[url.length - 1];
	if (first === last && (first === '\'' || first === '\"')) {
		url = url.substr(1, url.length - 2);
	}
	if (languageId === 'razor' && url[0] === '~') {
		url = url.substr(1);
	}
	return url;
}

function validateRef(url: string, languageId: string): boolean {
	if (!url.length) {
		return false;
	}
	if (languageId === 'handlebars' && /{{.*}}/.test(url)) {
		return false;
	}
	if (languageId === 'razor' && /@/.test(url)) {
		return false;
	}
	try {
		return !!Uri.parse(url);
	} catch (e) {
		return false;
	}
}

function getWorkspaceUrl(modelAbsoluteUri: Uri, tokenContent: string, documentContext: DocumentContext, base: string | undefined): string | null {
	if (/^\s*javascript\:/i.test(tokenContent) || /^\s*\#/i.test(tokenContent) || /[\n\r]/.test(tokenContent)) {
		return null;
	}
	tokenContent = tokenContent.replace(/^\s*/g, '');

	if (/^https?:\/\//i.test(tokenContent) || /^file:\/\//i.test(tokenContent)) {
		// Absolute link that needs no treatment
		return tokenContent;
	}

	if (/^\/\//i.test(tokenContent)) {
		// Absolute link (that does not name the protocol)
		let pickedScheme = 'http';
		if (modelAbsoluteUri.scheme === 'https') {
			pickedScheme = 'https';
		}
		return pickedScheme + ':' + tokenContent.replace(/^\s*/g, '');
	}
	if (documentContext) {
		return documentContext.resolveReference(tokenContent, base);
	}
	return tokenContent;
}

function createLink(document: TextDocument, documentContext: DocumentContext, attributeValue: string, startOffset: number, endOffset: number, base: string | undefined): DocumentLink | null {
	let documentUri = Uri.parse(document.uri);
	let tokenContent = normalizeRef(attributeValue, document.languageId);
	if (!validateRef(tokenContent, document.languageId)) {
		return null;
	}
	if (tokenContent.length < attributeValue.length) {
		startOffset++;
		endOffset--;
	}
	let workspaceUrl = getWorkspaceUrl(documentUri, tokenContent, documentContext, base);
	if (!workspaceUrl || !isValidURI(workspaceUrl)) {
		return null;
	}
	return {
		range: Range.create(document.positionAt(startOffset), document.positionAt(endOffset)),
		target: workspaceUrl
	};
}

function isValidURI(uri: string) {
	try {
		Uri.parse(uri);
		return true;
	} catch (e) {
		return false;
	}
}

export function findDocumentLinks(document: TextDocument, documentContext: DocumentContext): DocumentLink[] {
	let newLinks: DocumentLink[] = [];

	let rootAbsoluteUrl: Uri | null = null;

	let scanner = createScanner(document.getText(), 0);
	let token = scanner.scan();
	let afterHrefOrSrc = false;
	let afterBase = false;
	let base: string | undefined = void 0;
	while (token !== TokenType.EOS) {
		switch (token) {
			case TokenType.StartTag:
				if (!base) {
					let tagName = scanner.getTokenText().toLowerCase();
					afterBase = tagName === 'base';
				}
				break;
			case TokenType.AttributeName:
				let attributeName = scanner.getTokenText().toLowerCase();
				afterHrefOrSrc = attributeName === 'src' || attributeName === 'href';
				break;
			case TokenType.AttributeValue:
				if (afterHrefOrSrc) {
					let attributeValue = scanner.getTokenText();
					if (!afterBase) { // don't highlight the base link itself
						let link = createLink(document, documentContext, attributeValue, scanner.getTokenOffset(), scanner.getTokenEnd(), base);
						if (link) {
							newLinks.push(link);
						}
					}
					if (afterBase && typeof base === 'undefined') {
						base = normalizeRef(attributeValue, document.languageId);
						if (base && documentContext) {
							base = documentContext.resolveReference(base, document.uri);
						}
					}
					afterBase = false;
					afterHrefOrSrc = false;
				}
				break;
		}
		token = scanner.scan();
	}
	return newLinks;
}