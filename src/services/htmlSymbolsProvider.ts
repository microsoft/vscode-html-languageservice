/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { DocumentSymbol, Range, SymbolInformation, SymbolKind, TextDocument } from '../htmlLanguageTypes';
import { HTMLDocument, Node } from '../parser/htmlParser';

export function findDocumentSymbols(document: TextDocument, htmlDocument: HTMLDocument): SymbolInformation[] {
	const symbols: SymbolInformation[] = [];
	const symbols2 = findDocumentSymbols2(document, htmlDocument);

	for (const symbol of symbols2) {
		walk(symbol, undefined);
	}

	return symbols;

	function walk(node: DocumentSymbol, parent: DocumentSymbol | undefined) {
		const symbol = SymbolInformation.create(node.name, node.kind, node.range, document.uri, parent?.name);
		symbol.containerName ??= '';
		symbols.push(symbol);

		if (node.children) {
			for (const child of node.children) {
				walk(child, node);
			}
		}
	}
}

export function findDocumentSymbols2(document: TextDocument, htmlDocument: HTMLDocument): DocumentSymbol[] {
	const symbols: DocumentSymbol[] = [];

	htmlDocument.roots.forEach(node => {
		provideFileSymbolsInternal(document, node, symbols);
	});

	return symbols;
}

function provideFileSymbolsInternal(document: TextDocument, node: Node, symbols: DocumentSymbol[]): void {

	const name = nodeToName(node);
	const range = Range.create(document.positionAt(node.start), document.positionAt(node.end));
	const symbol = DocumentSymbol.create(
		name,
		undefined,
		SymbolKind.Field,
		range,
		range,
	);

	symbols.push(symbol);

	node.children.forEach(child => {
		symbol.children ??= [];
		provideFileSymbolsInternal(document, child, symbol.children);
	});
}

function nodeToName(node: Node): string {
	let name = node.tag;

	if (node.attributes) {
		const id = node.attributes['id'];
		const classes = node.attributes['class'];

		if (id) {
			name += `#${id.replace(/[\"\']/g, '')}`;
		}

		if (classes) {
			name += classes.replace(/[\"\']/g, '').split(/\s+/).map(className => `.${className}`).join('');
		}
	}

	return name || '?';
}