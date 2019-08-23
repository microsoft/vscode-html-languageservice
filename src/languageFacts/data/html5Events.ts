/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { IAttributeData } from '../../htmlLanguageTypes';

export const HTML5_EVENTS: IAttributeData[] = [
  {
    "name": "onabort",
    "description": {
      "kind": "markdown",
      "value": "The loading of a resource has been aborted."
    }
  },
  {
    "name": "onblur",
    "description": {
      "kind": "markdown",
      "value": "An element has lost focus (does not bubble)."
    }
  },
  {
    "name": "oncanplay",
    "description": {
      "kind": "markdown",
      "value": "The user agent can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content."
    }
  },
  {
    "name": "oncanplaythrough",
    "description": {
      "kind": "markdown",
      "value": "The user agent can play the media up to its end without having to stop for further buffering of content."
    }
  },
  {
    "name": "onchange",
    "description": {
      "kind": "markdown",
      "value": "The change event is fired for <input>, <select>, and <textarea> elements when a change to the element's value is committed by the user."
    }
  },
  {
    "name": "onclick",
    "description": {
      "kind": "markdown",
      "value": "A pointing device button has been pressed and released on an element."
    }
  },
  {
    "name": "oncontextmenu",
    "description": {
      "kind": "markdown",
      "value": "The right button of the mouse is clicked (before the context menu is displayed)."
    }
  },
  {
    "name": "ondblclick",
    "description": {
      "kind": "markdown",
      "value": "A pointing device button is clicked twice on an element."
    }
  },
  {
    "name": "ondrag",
    "description": {
      "kind": "markdown",
      "value": "An element or text selection is being dragged (every 350ms)."
    }
  },
  {
    "name": "ondragend",
    "description": {
      "kind": "markdown",
      "value": "A drag operation is being ended (by releasing a mouse button or hitting the escape key)."
    }
  },
  {
    "name": "ondragenter",
    "description": {
      "kind": "markdown",
      "value": "A dragged element or text selection enters a valid drop target."
    }
  },
  {
    "name": "ondragleave",
    "description": {
      "kind": "markdown",
      "value": "A dragged element or text selection leaves a valid drop target."
    }
  },
  {
    "name": "ondragover",
    "description": {
      "kind": "markdown",
      "value": "An element or text selection is being dragged over a valid drop target (every 350ms)."
    }
  },
  {
    "name": "ondragstart",
    "description": {
      "kind": "markdown",
      "value": "The user starts dragging an element or text selection."
    }
  },
  {
    "name": "ondrop",
    "description": {
      "kind": "markdown",
      "value": "An element is dropped on a valid drop target."
    }
  },
  {
    "name": "ondurationchange",
    "description": {
      "kind": "markdown",
      "value": "The duration attribute has been updated."
    }
  },
  {
    "name": "onemptied",
    "description": {
      "kind": "markdown",
      "value": "The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it."
    }
  },
  {
    "name": "onended",
    "description": {
      "kind": "markdown",
      "value": "Playback has stopped because the end of the media was reached."
    }
  },
  {
    "name": "onerror",
    "description": {
      "kind": "markdown",
      "value": "A resource failed to load."
    }
  },
  {
    "name": "onfocus",
    "description": {
      "kind": "markdown",
      "value": "An element has received focus (does not bubble)."
    }
  },
  {
    "name": "onformchange"
  },
  {
    "name": "onforminput"
  },
  {
    "name": "oninput",
    "description": {
      "kind": "markdown",
      "value": "The value of an element changes or the content of an element with the attribute contenteditable is modified."
    }
  },
  {
    "name": "oninvalid",
    "description": {
      "kind": "markdown",
      "value": "A submittable element has been checked and doesn't satisfy its constraints."
    }
  },
  {
    "name": "onkeydown",
    "description": {
      "kind": "markdown",
      "value": "A key is pressed down."
    }
  },
  {
    "name": "onkeypress",
    "description": {
      "kind": "markdown",
      "value": "A key is pressed down and that key normally produces a character value (use input instead)."
    }
  },
  {
    "name": "onkeyup",
    "description": {
      "kind": "markdown",
      "value": "A key is released."
    }
  },
  {
    "name": "onload",
    "description": {
      "kind": "markdown",
      "value": "A resource and its dependent resources have finished loading."
    }
  },
  {
    "name": "onloadeddata",
    "description": {
      "kind": "markdown",
      "value": "The first frame of the media has finished loading."
    }
  },
  {
    "name": "onloadedmetadata",
    "description": {
      "kind": "markdown",
      "value": "The metadata has been loaded."
    }
  },
  {
    "name": "onloadstart",
    "description": {
      "kind": "markdown",
      "value": "Progress has begun."
    }
  },
  {
    "name": "onmousedown",
    "description": {
      "kind": "markdown",
      "value": "A pointing device button (usually a mouse) is pressed on an element."
    }
  },
  {
    "name": "onmousemove",
    "description": {
      "kind": "markdown",
      "value": "A pointing device is moved over an element."
    }
  },
  {
    "name": "onmouseout",
    "description": {
      "kind": "markdown",
      "value": "A pointing device is moved off the element that has the listener attached or off one of its children."
    }
  },
  {
    "name": "onmouseover",
    "description": {
      "kind": "markdown",
      "value": "A pointing device is moved onto the element that has the listener attached or onto one of its children."
    }
  },
  {
    "name": "onmouseup",
    "description": {
      "kind": "markdown",
      "value": "A pointing device button is released over an element."
    }
  },
  {
    "name": "onmousewheel"
  },
  {
    "name": "onpause",
    "description": {
      "kind": "markdown",
      "value": "Playback has been paused."
    }
  },
  {
    "name": "onplay",
    "description": {
      "kind": "markdown",
      "value": "Playback has begun."
    }
  },
  {
    "name": "onplaying",
    "description": {
      "kind": "markdown",
      "value": "Playback is ready to start after having been paused or delayed due to lack of data."
    }
  },
  {
    "name": "onprogress",
    "description": {
      "kind": "markdown",
      "value": "In progress."
    }
  },
  {
    "name": "onratechange",
    "description": {
      "kind": "markdown",
      "value": "The playback rate has changed."
    }
  },
  {
    "name": "onreset",
    "description": {
      "kind": "markdown",
      "value": "A form is reset."
    }
  },
  {
    "name": "onresize",
    "description": {
      "kind": "markdown",
      "value": "The document view has been resized."
    }
  },
  {
    "name": "onreadystatechange",
    "description": {
      "kind": "markdown",
      "value": "The readyState attribute of a document has changed."
    }
  },
  {
    "name": "onscroll",
    "description": {
      "kind": "markdown",
      "value": "The document view or an element has been scrolled."
    }
  },
  {
    "name": "onseeked",
    "description": {
      "kind": "markdown",
      "value": "A seek operation completed."
    }
  },
  {
    "name": "onseeking",
    "description": {
      "kind": "markdown",
      "value": "A seek operation began."
    }
  },
  {
    "name": "onselect",
    "description": {
      "kind": "markdown",
      "value": "Some text is being selected."
    }
  },
  {
    "name": "onshow",
    "description": {
      "kind": "markdown",
      "value": "A contextmenu event was fired on/bubbled to an element that has a contextmenu attribute"
    }
  },
  {
    "name": "onstalled",
    "description": {
      "kind": "markdown",
      "value": "The user agent is trying to fetch media data, but data is unexpectedly not forthcoming."
    }
  },
  {
    "name": "onsubmit",
    "description": {
      "kind": "markdown",
      "value": "A form is submitted."
    }
  },
  {
    "name": "onsuspend",
    "description": {
      "kind": "markdown",
      "value": "Media data loading has been suspended."
    }
  },
  {
    "name": "ontimeupdate",
    "description": {
      "kind": "markdown",
      "value": "The time indicated by the currentTime attribute has been updated."
    }
  },
  {
    "name": "onvolumechange",
    "description": {
      "kind": "markdown",
      "value": "The volume has changed."
    }
  },
  {
    "name": "onwaiting",
    "description": {
      "kind": "markdown",
      "value": "Playback has stopped because of a temporary lack of data."
    }
  }
];