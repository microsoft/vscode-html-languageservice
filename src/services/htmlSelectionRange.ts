/**
 * Until SelectionRange lands in LSP, we'll return Range from server and convert it to
 * SelectionRange on client side
 */
import { Range, TextDocument, Position } from 'vscode-languageserver-types';
import { createScanner } from '../parser/htmlScanner';
import { parse, Node } from '../parser/htmlParser';
import { TokenType, SelectionRange, SelectionRangeKind } from '../htmlLanguageTypes';

export function getSelectionRanges(document: TextDocument, positions: Position[]): SelectionRange[][] {

	function getSelectionRange(position: Position): SelectionRange[] {
		const applicableRanges = getApplicableRanges(document, position);
		const ranges = applicableRanges
			/**
			 * Filter duplicated ranges
			 */
			.filter((pair, i) => {
				if (i === 0) {
					return true;
				}
				const prev = applicableRanges[i - 1];
				if (pair[0] === prev[0] && pair[1] === prev[1]) {
					return false;
				}
				return true;
			})
			.map(pair => {
				return {
					range: Range.create(
						document.positionAt(pair[0]),
						document.positionAt(pair[1])
					),
					kind: SelectionRangeKind.Declaration
				};
			});

		return ranges;
	}

	return positions.map(getSelectionRange);
}

function getApplicableRanges(document: TextDocument, position: Position): number[][] {
	const htmlDoc = parse(document.getText());
	const currOffset = document.offsetAt(position);
	const currNode = htmlDoc.findNodeAt(currOffset);

	let result = getAllParentTagRanges(currNode);

	// Self-closing or void elements
	if (currNode.startTagEnd && !currNode.endTagStart) {
		const closeRange = Range.create(document.positionAt(currNode.startTagEnd - 2), document.positionAt(currNode.startTagEnd));
		const closeText = document.getText(closeRange);

		// Self-closing element
		if (closeText === '/>') {
			result.unshift([currNode.start + 1, currNode.startTagEnd - 2]);
		}
		// Void element
		else {
			result.unshift([currNode.start + 1, currNode.startTagEnd - 1]);
		}

		const attributeLevelRanges = getAttributeLevelRanges(document, currNode, currOffset);
		result = attributeLevelRanges.concat(result);
		return result;
	}

	if (!currNode.startTagEnd || !currNode.endTagStart) {
		return result;
	}

	/**
	 * For html like
	 * `<div class="foo">bar</div>`
	 */
	result.unshift([currNode.start, currNode.end]);

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
		// `div` inside `</div>`
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
	const currNodeRange = Range.create(document.positionAt(currNode.start), document.positionAt(currNode.end));
	const currNodeText = document.getText(currNodeRange);
	const relativeOffset = currOffset - currNode.start;

	/**
	 * Tag level semantic selection
	 */

	const scanner = createScanner(currNodeText);
	let token = scanner.scan();

	/**
	 * For text like
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