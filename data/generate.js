/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

const fs = require('fs')
const path = require('path')

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
				a.description = matchingAttrDescription.description
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

const htmlDataSrc = `${PREFIX}${JSON.stringify(htmlTags, null, 2)}`

fs.writeFileSync(path.resolve(__dirname, '../src/languageFacts/data/html5Tags.ts'), htmlDataSrc)
console.log('Done writing html5Tags.ts')

const ariaData = require('./ariaData.json')
const ariaSpec = require('./ariaSpec.json')

const ariaMap = {}

ariaData.forEach(ad => {
	ariaMap[ad.name] = {
		...ad
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

const ariaDataSrc = `${ARIA_PREFIX}${JSON.stringify(ariaOut, null, 2)}`

fs.writeFileSync(path.resolve(__dirname, '../src/languageFacts/data/html5Aria.ts'), ariaDataSrc)
console.log('Done writing html5Aria.ts')