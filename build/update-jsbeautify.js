/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

var path = require('path');
var fs = require('fs');

function getVersion(moduleName) {
    var packageJSONPath = path.join(__dirname, '..', 'node_modules', moduleName, 'package.json');
    return readFile(packageJSONPath).then(function (content) {
        try {
            return JSON.parse(content).version;
        } catch (e) {
            return Promise.resolve(null);
        }
    });
}

function readFile(path) {
    return new Promise((s, e) => {
        fs.readFile(path, (err, res) => {
            if (err) {
                e(err);
            } else {
                s(res.toString());
            }
        })
    });

}

function update(moduleName, repoPath, dest, addHeader, patch) {
    var contentPath = path.join(__dirname, '..', 'node_modules', moduleName, repoPath);
    console.log('Reading from ' + contentPath);
    return readFile(contentPath).then(function (content) {
        return getVersion(moduleName).then(function (version) {
            let header = '';
            if (addHeader) {
                header = '// copied from js-beautify/' + repoPath + '\n';
                if (version) {
                    header += '// version: ' + version + '\n';
                }
            }
            try {
                if (patch) {
                    content = patch(content);
                }
                fs.writeFileSync(dest, header + content);
                if (version) {
                    console.log('Updated ' + path.basename(dest) + ' (' + version + ')');
                } else {
                    console.log('Updated ' + path.basename(dest));
                }
            } catch (e) {
                console.error(e);
            }
        });

    }, console.error);
}

update('js-beautify', 'js/lib/beautify-html.js', './src/beautify/beautify-html.js', true);
update('js-beautify', 'js/lib/beautify-css.js', './src/beautify/beautify-css.js', true);
update('js-beautify', 'LICENSE', './src/beautify/beautify-license');

// ESM version
update('js-beautify', 'js/lib/beautify-html.js', './src/beautify/esm/beautify-html.js', true, function (contents) {
    contents = contents.replace(
        /\(function\(\) \{\nvar legacy_beautify_html/m,
        `import { js_beautify } from "./beautify";
import { css_beautify } from "./beautify-css";

var legacy_beautify_html`
    );
    contents = contents.substring(0, contents.indexOf('var style_html = legacy_beautify_html;'));
    contents = contents + `
export function html_beautify(html_source, options) {
    return legacy_beautify_html(html_source, options, js_beautify, css_beautify);
}
`;

    return contents;
});
update('js-beautify', 'js/lib/beautify-css.js', './src/beautify/esm/beautify-css.js', true, function (contents) {
    contents = contents.replace(
        /\(function\(\) \{\nvar legacy_beautify_css/m,
        'export const css_beautify'
    );
    contents = contents.substring(0, contents.indexOf('var css_beautify = legacy_beautify_css;'));
    return contents;
});