/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const customData = require('@vscode/web-custom-data/data/browsers.html-data.json');
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function toJavaScript(obj) {
	return JSON.stringify(obj, null, '\t');
}

const DATA_TYPE = 'HTMLDataV1';
const output = [
	'/*---------------------------------------------------------------------------------------------',
	' *  Copyright (c) Microsoft Corporation. All rights reserved.',
	' *  Licensed under the MIT License. See License.txt in the project root for license information.',
	' *--------------------------------------------------------------------------------------------*/',
	'// file generated from @vscode/web-custom-data NPM package',
	'',
	`import { ${DATA_TYPE} } from '../../htmlLanguageTypes.js';`,
	'',
	`export const htmlData : ${DATA_TYPE} = ` + toJavaScript(customData) + ';'
];

const outputPath = path.resolve(__dirname, '../src/languageFacts/data/webCustomData.ts');
console.log('Writing to: ' + outputPath);
const content = output.join(os.EOL);
fs.writeFileSync(outputPath, content);
console.log('Done');
