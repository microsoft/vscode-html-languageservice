/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createScanner } from '../parser/htmlScanner';
import * as strings from '../utils/strings';
import { URI as Uri } from 'vscode-uri';

import { TokenType, DocumentContext, TextDocument, Range, DocumentLink } from '../htmlLanguageTypes';

function normalizeRef(url: string): string {
	const first = url[0];
	const last = url[url.length - 1];
	if (first === last && (first === '\'' || first === '\"')) {
		url = url.substr(1, url.length - 2);
	}
	return url;
}

function validateRef(url: string, languageId: string): boolean {
	if (!url.length) {
		return false;
	}
	if (languageId === 'handlebars' && /{{|}}/.test(url)) {
		return false;
	}
	return /\b(w[\w\d+.-]*:\/\/)?[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/.test(url);
}

function getWorkspaceUrl(documentUri: string, tokenContent: string, documentContext: DocumentContext, base: string | undefined): string | undefined {
	if (/^\s*javascript\:/i.test(tokenContent) || /[\n\r]/.test(tokenContent)) {
		return undefined;
	}
	tokenContent = tokenContent.replace(/^\s*/g, '');

	const match = tokenContent.match(/^(\w[\w\d+.-]*):/);
	if (match) {
		// Absolute link that needs no treatment
		const schema = match[1].toLowerCase();
		if (schema === 'http' || schema === 'https' || schema === 'file') {
			return tokenContent;
		}
		return undefined;
	}
	if (/^\#/i.test(tokenContent)) {
		return documentUri + tokenContent;
	}
	if (/^\/\//i.test(tokenContent)) {
		// Absolute link (that does not name the protocol)
		const pickedScheme = strings.startsWith(documentUri, 'https://') ? 'https' : 'http';
		return pickedScheme + ':' + tokenContent.replace(/^\s*/g, '');
	}
	if (documentContext) {
		return documentContext.resolveReference(tokenContent, base || documentUri);
	}
	return tokenContent;
}

function createLink(document: TextDocument, documentContext: DocumentContext, attributeValue: string, startOffset: number, endOffset: number, base: string | undefined): DocumentLink | undefined {
	const tokenContent = normalizeRef(attributeValue);
	if (!validateRef(tokenContent, document.languageId)) {
		return undefined;
	}
	if (tokenContent.length < attributeValue.length) {
		startOffset++;
		endOffset--;
	}
	const workspaceUrl = getWorkspaceUrl(document.uri, tokenContent, documentContext, base);
	if (!workspaceUrl || !isValidURI(workspaceUrl)) {
		return undefined;
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
	const newLinks: DocumentLink[] = [];

	const scanner = createScanner(document.getText(), 0);
	let token = scanner.scan();
	let lastAttributeName: string | undefined = undefined;
	let afterBase = false;
	let base: string | undefined = void 0;
	const idLocations: { [id: string]: number | undefined } = {};

	while (token !== TokenType.EOS) {
		switch (token) {
			case TokenType.StartTag:
				if (!base) {
					const tagName = scanner.getTokenText().toLowerCase();
					afterBase = tagName === 'base';
				}
				break;
			case TokenType.AttributeName:
				lastAttributeName = scanner.getTokenText().toLowerCase();
				break;
			case TokenType.AttributeValue:
				if (lastAttributeName === 'src' || lastAttributeName === 'href') {
					const attributeValue = scanner.getTokenText();
					if (!afterBase) { // don't highlight the base link itself
						const link = createLink(document, documentContext, attributeValue, scanner.getTokenOffset(), scanner.getTokenEnd(), base);
						if (link) {
							newLinks.push(link);
						}
					}
					if (afterBase && typeof base === 'undefined') {
						base = normalizeRef(attributeValue);
						if (base && documentContext) {
							base = documentContext.resolveReference(base, document.uri);
						}
					}
					afterBase = false;
					lastAttributeName = undefined;
				} else if (lastAttributeName === 'id') {
					const id = normalizeRef(scanner.getTokenText());
					idLocations[id] = scanner.getTokenOffset();
				}
				break;
		}
		token = scanner.scan();
	}
	// change local links with ids to actual positions
	for (const link of newLinks) {
		const localWithHash = document.uri + '#';
		if (link.target && strings.startsWith(link.target, localWithHash)) {
			const target = link.target.substr(localWithHash.length);
			const offset = idLocations[target];
			if (offset !== undefined) {
				const pos = document.positionAt(offset);
				link.target = `${localWithHash}${pos.line + 1},${pos.character + 1}`;
			}
		}
	}
	return newLinks;
}