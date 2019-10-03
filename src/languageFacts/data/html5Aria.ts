/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { IAttributeData } from '../../htmlLanguageTypes';

export const ARIA_ATTRIBUTES: IAttributeData[] = [
  {
    "name": "aria-activedescendant",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Identifies the currently active element when DOM focus is on a [`composite`](https://www.w3.org/TR/wai-aria-1.1/#composite) widget, [`textbox`](https://www.w3.org/TR/wai-aria-1.1/#textbox), [`group`](https://www.w3.org/TR/wai-aria-1.1/#group), or [`application`](https://www.w3.org/TR/wai-aria-1.1/#application)."
    }
  },
  {
    "name": "aria-atomic",
    "valueSet": "b",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-atomic"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates whether [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology) will present all, or only parts of, the changed region based on the change notifications defined by the [`aria-relevant`](https://www.w3.org/TR/wai-aria-1.1/#aria-relevant) attribute."
    }
  },
  {
    "name": "aria-autocomplete",
    "valueSet": "autocomplete",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made."
    }
  },
  {
    "name": "aria-busy",
    "valueSet": "b",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-busy"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates an element is being modified and that assistive technologies _MAY_ want to wait until the modifications are complete before exposing them to the user."
    }
  },
  {
    "name": "aria-checked",
    "valueSet": "tristate",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-checked"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates the current \"checked\" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of checkboxes, radio buttons, and other [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected)."
    }
  },
  {
    "name": "aria-colcount",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-colcount"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Defines the total number of columns in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex)."
    }
  },
  {
    "name": "aria-colindex",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-colindex"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) column index or position with respect to the total number of columns within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-colcount) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan)."
    }
  },
  {
    "name": "aria-colspan",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-colspan"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Defines the number of columns spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan)."
    }
  },
  {
    "name": "aria-controls",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-controls"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) whose contents or presence are controlled by the current element. See related [`aria-owns`](https://www.w3.org/TR/wai-aria-1.1/#aria-owns)."
    }
  },
  {
    "name": "aria-current",
    "valueSet": "current",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-current"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that represents the current item within a container or set of related elements."
    }
  },
  {
    "name": "aria-describedat",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-describedat"
      }
    ]
  },
  {
    "name": "aria-describedby",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-describedby"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that describes the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby)."
    }
  },
  {
    "name": "aria-disabled",
    "valueSet": "b",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-disabled"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is [perceivable](https://www.w3.org/TR/wai-aria-1.1/#dfn-perceivable) but disabled, so it is not editable or otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-hidden`](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden) and [`aria-readonly`](https://www.w3.org/TR/wai-aria-1.1/#aria-readonly)."
    }
  },
  {
    "name": "aria-dropeffect",
    "valueSet": "dropeffect",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-dropeffect"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "\\[Deprecated in ARIA 1.1\\] Indicates what functions can be performed when a dragged object is released on the drop target."
    }
  },
  {
    "name": "aria-errormessage",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides an error message for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-invalid`](https://www.w3.org/TR/wai-aria-1.1/#aria-invalid) and [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)."
    }
  },
  {
    "name": "aria-expanded",
    "valueSet": "u",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-expanded"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed."
    }
  },
  {
    "name": "aria-flowto",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-flowto"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Identifies the next [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order."
    }
  },
  {
    "name": "aria-grabbed",
    "valueSet": "u",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-grabbed"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "\\[Deprecated in ARIA 1.1\\] Indicates an element's \"grabbed\" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) in a drag-and-drop operation."
    }
  },
  {
    "name": "aria-haspopup",
    "valueSet": "b",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)."
    }
  },
  {
    "name": "aria-hidden",
    "valueSet": "b",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-hidden"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates whether the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is exposed to an accessibility API. See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled)."
    }
  },
  {
    "name": "aria-invalid",
    "valueSet": "invalid",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-invalid"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates the entered value does not conform to the format expected by the application. See related [`aria-errormessage`](https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage)."
    }
  },
  {
    "name": "aria-kbdshortcuts",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-kbdshortcuts"
      }
    ]
  },
  {
    "name": "aria-label",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-label"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Defines a string value that labels the current element. See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby)."
    }
  },
  {
    "name": "aria-labelledby",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that labels the current element. See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)."
    }
  },
  {
    "name": "aria-level",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-level"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Defines the hierarchical level of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) within a structure."
    }
  },
  {
    "name": "aria-live",
    "valueSet": "live",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-live"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates that an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) will be updated, and describes the types of updates the [user agents](https://www.w3.org/TR/wai-aria-1.1/#dfn-user-agent), [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology), and user can expect from the [live region](https://www.w3.org/TR/wai-aria-1.1/#dfn-live-region)."
    }
  },
  {
    "name": "aria-modal",
    "valueSet": "b",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-modal"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates whether an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is modal when displayed."
    }
  },
  {
    "name": "aria-multiline",
    "valueSet": "b",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-multiline"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates whether a text box accepts multiple lines of input or only a single line."
    }
  },
  {
    "name": "aria-multiselectable",
    "valueSet": "b",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates that the user may select more than one item from the current selectable descendants."
    }
  },
  {
    "name": "aria-orientation",
    "valueSet": "orientation",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-orientation"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous."
    }
  },
  {
    "name": "aria-owns",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-owns"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Identifies an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in order to define a visual, functional, or contextual parent/child [relationship](https://www.w3.org/TR/wai-aria-1.1/#dfn-relationship) between DOM elements where the DOM hierarchy cannot be used to represent the relationship. See related [`aria-controls`](https://www.w3.org/TR/wai-aria-1.1/#aria-controls)."
    }
  },
  {
    "name": "aria-placeholder",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format."
    }
  },
  {
    "name": "aria-posinset",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-posinset"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Defines an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)'s number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-setsize`](https://www.w3.org/TR/wai-aria-1.1/#aria-setsize)."
    }
  },
  {
    "name": "aria-pressed",
    "valueSet": "tristate",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-pressed"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates the current \"pressed\" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of toggle buttons. See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected)."
    }
  },
  {
    "name": "aria-readonly",
    "valueSet": "b",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-readonly"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is not editable, but is otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled)."
    }
  },
  {
    "name": "aria-relevant",
    "valueSet": "relevant",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-relevant"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. See related [`aria-atomic`](https://www.w3.org/TR/wai-aria-1.1/#aria-atomic)."
    }
  },
  {
    "name": "aria-required",
    "valueSet": "b",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-required"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates that user input is required on the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) before a form may be submitted."
    }
  },
  {
    "name": "aria-roledescription",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Defines a human-readable, author-localized description for the [role](https://www.w3.org/TR/wai-aria-1.1/#dfn-role) of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)."
    }
  },
  {
    "name": "aria-rowcount",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Defines the total number of rows in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex)."
    }
  },
  {
    "name": "aria-rowindex",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) row index or position with respect to the total number of rows within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan)."
    }
  },
  {
    "name": "aria-rowspan",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Defines the number of rows spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan)."
    }
  },
  {
    "name": "aria-selected",
    "valueSet": "u",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-selected"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates the current \"selected\" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of various [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed)."
    }
  },
  {
    "name": "aria-setsize",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-setsize"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-posinset`](https://www.w3.org/TR/wai-aria-1.1/#aria-posinset)."
    }
  },
  {
    "name": "aria-sort",
    "valueSet": "sort",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-sort"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Indicates if items in a table or grid are sorted in ascending or descending order."
    }
  },
  {
    "name": "aria-valuemax",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Defines the maximum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget)."
    }
  },
  {
    "name": "aria-valuemin",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Defines the minimum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget)."
    }
  },
  {
    "name": "aria-valuenow",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Defines the current value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-valuetext`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)."
    }
  },
  {
    "name": "aria-valuetext",
    "references": [
      {
        "name": "WAI-ARIA Reference",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext"
      }
    ],
    "description": {
      "kind": "markdown",
      "value": "Defines the human readable text alternative of [`aria-valuenow`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow) for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget)."
    }
  },
  {
    "name": "aria-details",
    "description": {
      "kind": "markdown",
      "value": "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides a detailed, extended description for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)."
    }
  },
  {
    "name": "aria-keyshortcuts",
    "description": {
      "kind": "markdown",
      "value": "Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element."
    }
  }
];