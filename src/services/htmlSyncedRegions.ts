/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { TextDocument, Position, Range } from 'vscode-languageserver-types';
import { HTMLDocument } from '../parser/htmlParser';

export function findOnTypeRenameRanges(
  document: TextDocument,
  position: Position,
  htmlDocument: HTMLDocument
): Range[] | null {
  const offset = document.offsetAt(position);
  const node = htmlDocument.findNodeAt(offset);

  if (!node.tag) {
    return null;
  }

  if (!node.endTagStart) {
    return null;
  }

  if (
	  // Within open tag, compute close tag
		(node.start + '<'.length <= offset && offset <= node.start + '<'.length + node.tag.length) ||
	  // Within closing tag, compute open tag
		node.endTagStart + '</'.length <= offset && offset <= node.endTagStart + '</'.length + node.tag.length
	) {
    return [
      Range.create(
        document.positionAt(node.start + '<'.length),
        document.positionAt(node.start + '<'.length + node.tag.length)
      ),
      Range.create(
        document.positionAt(node.endTagStart + '</'.length),
        document.positionAt(node.endTagStart + '</'.length + node.tag.length)
      )
    ];
  }

  return null;
}
