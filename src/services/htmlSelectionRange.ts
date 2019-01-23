/**
 * Until SelectionRange lands in LSP, we'll return Range from server and convert it to
 * SelectionRange on client side
 */
import { Range, TextDocument, Position } from 'vscode-languageserver-types';
import { createScanner } from '../parser/htmlScanner';
import { parse, Node } from '../parser/htmlParser';
import { TokenType } from '../htmlLanguageTypes';

export function getSelectionRanges(document: TextDocument, position: Position) {
	const applicableRanges = getApplicableRanges(document, position);
	const ranges = applicableRanges.map(pair => {
		return Range.create(
			document.positionAt(pair[0]),
			document.positionAt(pair[1])
		);
	});
	return ranges;
}

export function getApplicableRanges(document: TextDocument, position: Position): number[][] {
	const htmlDoc = parse(document.getText());
	const currOffset = document.offsetAt(position);
	const currNode = htmlDoc.findNodeAt(currOffset);

	let result = getAllParentTagRanges(currNode);
	
	if (!currNode.startTagEnd || !currNode.endTagStart) {
		return result;
	}
	
	/**
	 * For html like
	 * `<div class="foo">bar</div>`
	 */
	
	/**
	 * Cursor inside `<div class="foo">`
	 */
	if (currNode.start < currOffset && currOffset < currNode.startTagEnd) {
		result.unshift([currNode.start + 1, currNode.startTagEnd - 1]);
		const attributeLevelRanges = getAttributeLevelRanges(document, currNode, currOffset);
		result = attributeLevelRanges.concat(result);
		return result;
	}
	/**
	 * Cursor inside `bar`
	 */
	else if (currNode.startTagEnd <= currOffset && currOffset <= currNode.endTagStart) {
		result.unshift([currNode.startTagEnd, currNode.endTagStart]);

		return result;
	}
	/**
	 * Cursor inside `</div>`
	 */
	else {
		// `div`
		if (currOffset >= currNode.endTagStart + 2) {
			result.unshift([currNode.endTagStart + 2, currNode.end - 1]);
		}
		return result;
	}
}

function getAllParentTagRanges(initialNode: Node) {
	let currNode = initialNode;

	const getNodeRanges = (n: Node) => {
		if (n.startTagEnd && n.endTagStart && n.startTagEnd < n.endTagStart) {
			return [
				[n.startTagEnd, n.endTagStart],
				[n.start, n.end]
			];
		}

		return [
			[n.start, n.end]
		];
	};

	const result: number[][] = [];

	while (currNode.parent) {
		currNode = currNode.parent;
		getNodeRanges(currNode).forEach(r => result.push(r));
	}
	
	return result;
}

function getAttributeLevelRanges(document: TextDocument, currNode: Node, currOffset: number) {
	const currNodeText = document.getText(offsetsToRange(document, currNode.start, currNode.end));
	const relativeOffset = currOffset - currNode.start;

	/**
	 * Tag level semantic selection
	 */

	const scanner = createScanner(currNodeText);
	let token = scanner.scan();
	
	/**
	 * For text like so
	 * <div class="foo">bar</div>
	 */
	const positionOffset = currNode.start;
	
	const result = [];

	let isInsideAttribute = false;
	let attrStart = -1;
	while (token !== TokenType.EOS) {
		switch (token) {
			case TokenType.AttributeName: {
				if (relativeOffset < scanner.getTokenOffset()) {
					isInsideAttribute = false;
					break;
				}

				if (relativeOffset <= scanner.getTokenEnd()) {
					// `class`
					result.unshift([scanner.getTokenOffset(), scanner.getTokenEnd()]);
				}
				
				isInsideAttribute = true;
				attrStart = scanner.getTokenOffset();
				break;
			}
			case TokenType.AttributeValue: {
				if (!isInsideAttribute) {
					break;
				}

				const valueText = scanner.getTokenText();
				if (relativeOffset < scanner.getTokenOffset()) {
					// `class="foo"`
					result.push([attrStart, scanner.getTokenEnd()]);
					break;
				}
				
				if (relativeOffset >= scanner.getTokenOffset() && relativeOffset <= scanner.getTokenEnd()) {
					// `"foo"`
					result.unshift([scanner.getTokenOffset(), scanner.getTokenEnd()]);

					// `foo`
					if ((valueText[0] === `"` && valueText[valueText.length - 1] === `"`) || (valueText[0] === `'` && valueText[valueText.length - 1] === `'`)) {
						if (relativeOffset >= scanner.getTokenOffset() + 1 && relativeOffset <= scanner.getTokenEnd() - 1) {
							result.unshift([scanner.getTokenOffset() + 1, scanner.getTokenEnd() - 1]);
						}
					}

					// `class="foo"`
					result.push([attrStart, scanner.getTokenEnd()]);
				}

				break;
			}
		}
		token = scanner.scan();
	}
	
	return result.map(pair => {
		return [pair[0] + positionOffset, pair[1] + positionOffset];
	});
}

function offsetsToRange(doc: TextDocument, offset1: number, offset2: number) {
	return Range.create(doc.positionAt(offset1), doc.positionAt(offset2));
}