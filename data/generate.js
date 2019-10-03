/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

const fs = require('fs')
const path = require('path')
const bcd = require('mdn-browser-compat-data')

/*---------------------------------------------------------------------------------------------
 * Tags
 *--------------------------------------------------------------------------------------------*/

const PREFIX =
`/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { ITagData } from '../../htmlLanguageTypes';

export const HTML5_TAGS: ITagData[] = `

const htmlTags = require('./htmlTags.json')
const htmlTagDescriptions = require('./mdnTagDescriptions.json')

htmlTags.forEach(t => {
	const matchingTagDescription = htmlTagDescriptions.filter(td => td.name === t.name)
		? htmlTagDescriptions.filter(td => td.name === t.name)[0]
		: null

	if (matchingTagDescription) {
		t.attributes.forEach(a => {
			const matchingAttrDescription = matchingTagDescription.attributes.filter(ad => ad.name === a.name)
				? matchingTagDescription.attributes.filter(ad => ad.name === a.name)[0]
				: null
				
			if (matchingAttrDescription) {
				if (matchingAttrDescription.description) {
					a.description = {
						kind: 'markdown',
						value: matchingAttrDescription.description
					}
				}
			}
		})
		
		const moreAttrs = []
		matchingTagDescription.attributes.forEach(ad => {
			if (t.attributes.filter(a => a.name === ad.name).length === 0) {
				moreAttrs.push(ad)
			}
		})
		t.attributes = t.attributes.concat(moreAttrs)
	}
})

htmlTags.forEach(t => {
	if (t.description) {
		t.description = {
			kind: 'markdown',
			value: t.description
		}
	}
})

const bcdHTMLElements = bcd.html.elements
htmlTags.forEach(t => {
	if (bcdHTMLElements[t.name]) {
		const bcdMatchingTag = bcdHTMLElements[t.name]
		if (bcdMatchingTag.__compat && bcdMatchingTag.__compat.mdn_url) {
			if (!t.references) {
				t.references =[];
			}
			t.references.push({
				name: 'MDN Reference',
				url: bcdMatchingTag.__compat.mdn_url
			})
		}
	}
})

const htmlDataSrc = `${PREFIX}${JSON.stringify(htmlTags, null, 2)};`

fs.writeFileSync(path.resolve(__dirname, '../src/languageFacts/data/html5Tags.ts'), htmlDataSrc)
console.log('Done writing html5Tags.ts')

/*---------------------------------------------------------------------------------------------
 * Global Attributes
 *--------------------------------------------------------------------------------------------*/

const GLOBAL_ATTRS_PREFIX =
`/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { IAttributeData } from '../../htmlLanguageTypes';

export const HTML5_GLOBAL_ATTRIBUTES: IAttributeData[] = `

const htmlGlobalAttributes = require('./htmlGlobalAttributes.json')

const bcdGlobalAttributes = bcd.html.global_attributes

htmlGlobalAttributes.forEach(a => {
	if (a.description) {
		a.description = {
			kind: 'markdown',
			value: a.description
		}
	}
	if (bcdGlobalAttributes[a.name] && bcdGlobalAttributes[a.name].__compat && bcdGlobalAttributes[a.name].__compat.mdn_url) {
		if (!a.references) {
			a.references = [];
		}
		a.references.push({
			name: 'MDN Reference',
			url: bcdGlobalAttributes[a.name].__compat.mdn_url
		})
	}
})

const htmlGlobalAttributesSrc = `${GLOBAL_ATTRS_PREFIX}${JSON.stringify(htmlGlobalAttributes, null, 2)};`

fs.writeFileSync(path.resolve(__dirname, '../src/languageFacts/data/html5GlobalAttributes.ts'), htmlGlobalAttributesSrc)
console.log('Done writing html5GlobalAttributes.ts')

/*---------------------------------------------------------------------------------------------
 * Events
 *--------------------------------------------------------------------------------------------*/

const EVENTS_PREFIX = 
`/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { IAttributeData } from '../../htmlLanguageTypes';

export const HTML5_EVENTS: IAttributeData[] = `

const htmlEvents = require('./htmlEvents.json')
/**
 * Todo@Pine Clean up new HTML events and drop the old events
 */
const oldEvents = require('./oldEvents.json')

oldEvents.forEach(e => {
	const match = htmlEvents.find(x => x.name === e.name)
	if (match) {
		if (match.description) {
			e.description = {
				kind: 'markdown',
				value: match.description
			}
		}
	}
})

const htmlEventsSrc = `${EVENTS_PREFIX}${JSON.stringify(oldEvents, null, 2)};`

fs.writeFileSync(path.resolve(__dirname, '../src/languageFacts/data/html5Events.ts'), htmlEventsSrc)
console.log('Done writing html5Events.ts')

/*---------------------------------------------------------------------------------------------
 * Aria
 *--------------------------------------------------------------------------------------------*/

const ariaData = require('./ariaData.json')
const ariaSpec = require('./ariaSpec.json')

ariaSpec.forEach(ariaItem => {
	if (ariaItem.description) {
		ariaItem.description = {
			kind: 'markdown',
			value: ariaItem.description
		}
	}
})
const ariaMap = {}

ariaData.forEach(ad => {
	ariaMap[ad.name] = {
		...ad,
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: `https://www.w3.org/TR/wai-aria-1.1/#${ad.name}`
      }
    ]
	}
})
ariaSpec.forEach(as => {
	if (!ariaMap[as.name]) {
		ariaMap[as.name] = {
			...as
		}
	} else {
		ariaMap[as.name] = {
			...ariaMap[as.name],
			...as
		}
	}
})

const ariaOut = []
for (let a in ariaMap) {
	ariaOut.push(ariaMap[a])
}

const ARIA_PREFIX = 
`/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { IAttributeData } from '../../htmlLanguageTypes';

export const ARIA_ATTRIBUTES: IAttributeData[] = `

const ariaDataSrc = `${ARIA_PREFIX}${JSON.stringify(ariaOut, null, 2)};`

fs.writeFileSync(path.resolve(__dirname, '../src/languageFacts/data/html5Aria.ts'), ariaDataSrc)
console.log('Done writing html5Aria.ts')