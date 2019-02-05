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