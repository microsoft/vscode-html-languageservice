/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createScanner } from './htmlScanner';
import { findFirst } from '../utils/arrays';
import { TokenType, TextDocument } from '../htmlLanguageTypes';
import { HTMLDataManager } from '../languageFacts/dataManager';

export class Node {
	public tag: string | undefined;
	public closed: boolean = false;
	public startTagEnd: number | undefined;
	public endTagStart: number | undefined;
	public attributes: { [name: string]: string | null } | undefined;
	public get attributeNames(): string[] { return this.attributes ? Object.keys(this.attributes) : []; }
	constructor(public start: number, public end: number, public children: Node[], public parent?: Node) {
	}
	public isSameTag(tagInLowerCase: string | undefined) {
		if (this.tag === undefined) {
			return tagInLowerCase === undefined;
		} else {
			return tagInLowerCase !== undefined && this.tag.length === tagInLowerCase.length && this.tag.toLowerCase() === tagInLowerCase;
		}
	}
	public get firstChild(): Node | undefined { return this.children[0]; }
	public get lastChild(): Node | undefined { return this.children.length ? this.children[this.children.length - 1] : void 0; }

	public findNodeBefore(offset: number): Node {
		const idx = findFirst(this.children, c => offset <= c.start) - 1;
		if (idx >= 0) {
			const child = this.children[idx];
			if (offset > child.start) {
				if (offset < child.end) {
					return child.findNodeBefore(offset);
				}
				const lastChild = child.lastChild;
				if (lastChild && lastChild.end === child.end) {
					return child.findNodeBefore(offset);
				}
				return child;
			}
		}
		return this;
	}

	public findNodeAt(offset: number): Node {
		const idx = findFirst(this.children, c => offset <= c.start) - 1;
		if (idx >= 0) {
			const child = this.children[idx];
			if (offset > child.start && offset <= child.end) {
				return child.findNodeAt(offset);
			}
		}
		return this;
	}
}

export interface HTMLDocument {
	roots: Node[];
	findNodeBefore(offset: number): Node;
	findNodeAt(offset: number): Node;
}

export class HTMLParser {
  constructor(private dataManager: HTMLDataManager) {

  }

  public parseDocument(document: TextDocument): HTMLDocument {
    return this.parse(document.getText(), this.dataManager.getVoidElements(document.languageId));
  }

  public parse(text: string, voidElements: string[]): HTMLDocument {
    const scanner = createScanner(text, undefined, undefined, true);

    const htmlDocument = new Node(0, text.length, [], void 0);
    let curr = htmlDocument;
    let endTagStart: number = -1;
    let endTagName: string | undefined = undefined;
    let pendingAttribute: string | null = null;
    let token = scanner.scan();
    while (token !== TokenType.EOS) {
      switch (token) {
        case TokenType.StartTagOpen:
          const child = new Node(scanner.getTokenOffset(), text.length, [], curr);
          curr.children.push(child);
          curr = child;
          break;
        case TokenType.StartTag:
          curr.tag = scanner.getTokenText();
          break;
        case TokenType.StartTagClose:
          if (curr.parent) {
            curr.end = scanner.getTokenEnd(); // might be later set to end tag position
            if (scanner.getTokenLength()) {
              curr.startTagEnd = scanner.getTokenEnd();
              if (curr.tag && this.dataManager.isVoidElement(curr.tag, voidElements)) {
                curr.closed = true;
                curr = curr.parent;
              }
            } else {
              // pseudo close token from an incomplete start tag
              curr = curr.parent;
            }
          }
          break;
        case TokenType.StartTagSelfClose:
          if (curr.parent) {
            curr.closed = true;
            curr.end = scanner.getTokenEnd();
            curr.startTagEnd = scanner.getTokenEnd();
            curr = curr.parent;
          }
          break;
        case TokenType.EndTagOpen:
          endTagStart = scanner.getTokenOffset();
          endTagName = undefined;
          break;
        case TokenType.EndTag:
          endTagName = scanner.getTokenText().toLowerCase();
          break;
        case TokenType.EndTagClose:
          let node = curr;
          // see if we can find a matching tag
          while (!node.isSameTag(endTagName) && node.parent) {
            node = node.parent;
          }
          if (node.parent) {
            while (curr !== node) {
              curr.end = endTagStart;
              curr.closed = false;
              curr = curr.parent!;
            }
            curr.closed = true;
            curr.endTagStart = endTagStart;
            curr.end = scanner.getTokenEnd();
            curr = curr.parent!;
          }
          break;
        case TokenType.AttributeName: {
          pendingAttribute = scanner.getTokenText();
          let attributes = curr.attributes;
          if (!attributes) {
            curr.attributes = attributes = {};
          }
          attributes[pendingAttribute] = null; // Support valueless attributes such as 'checked'
          break;
        }
        case TokenType.AttributeValue: {
          const value = scanner.getTokenText();
          const attributes = curr.attributes;
          if (attributes && pendingAttribute) {
            attributes[pendingAttribute] = value;
            pendingAttribute = null;
          }
          break;
        }
      }
      token = scanner.scan();
    }
    while (curr.parent) {
      curr.end = text.length;
      curr.closed = false;
      curr = curr.parent;
    }
    return {
      roots: htmlDocument.children,
      findNodeBefore: htmlDocument.findNodeBefore.bind(htmlDocument),
      findNodeAt: htmlDocument.findNodeAt.bind(htmlDocument)
    };
  }
}
