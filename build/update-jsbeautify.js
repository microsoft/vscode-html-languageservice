/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

var path = require('path');
var fs = require('fs');
var https = require('https');
var url = require('url');

function getOptions(urlString) {
    var _url = url.parse(urlString);
    return {
        protocol: _url.protocol,
        host: _url.host,
        port: _url.port,
        path: _url.path,
        headers: {
            'User-Agent': 'NodeJS'
        }
    }
}

function download(url) {
    return new Promise((c, e) => {
        var content = '';
        var request = https.get(getOptions(url), function (response) {
            response.on('data', function (data) {
                content += data.toString();
            }).on('end', function () {
                c(content);
            });
        }).on('error', function (err) {
            e(err.message);
        });
    });
}

function getCommitSha(repoId, repoPath) {
    var commitInfo = 'https://api.github.com/repos/' + repoId + '/commits?path=' + repoPath;
    return download(commitInfo).then(function (content) {
        try {
            let lastCommit = JSON.parse(content)[0];
            return Promise.resolve({
                commitSha: lastCommit.sha,
                commitDate: lastCommit.commit.author.date
            });
        } catch (e) {
            return Promise.resolve(null);
        }
    }, function () {
        console.err('Failed loading ' + commitInfo);
        return Promise.resolve(null);
    });
}

function update(repoId, repoPath, dest, addHeader, patch) {
    var contentPath = 'https://raw.githubusercontent.com/' + repoId + '/master/' + repoPath;
    console.log('Reading from ' + contentPath);
    return download(contentPath).then(function (content) {
        return getCommitSha(repoId, repoPath).then(function (info) {
            let header = '';
            if (addHeader) {
                header = '// copied from ' + contentPath + '\n';
                if (info) {
                    let version = 'https://github.com/' + repoId + '/commit/' + info.commitSha;
                    header += '// ' + version + '\n';
                }
            }
            try {
                if (patch) {
                    content = patch(content);
                }
                fs.writeFileSync(dest, header + content);
                if (info) {
                    console.log('Updated ' + path.basename(dest) + ' to ' + repoId + '@' + info.commitSha.substr(0, 7) + ' (' + info.commitDate.substr(0, 10) + ')');
                } else {
                    console.log('Updated ' + path.basename(dest));
                }
            } catch (e) {
                console.error(e);
            }
        });

    }, console.error);
}

function patchHTMLFormatter(content) {
    return content.replace('this.indent_level = 0;', 'this.indent_level = (options.indent_level === undefined) ? 0 : parseInt(options.indent_level, 10);');
}

update('beautify-web/js-beautify', 'js/lib/beautify-html.js', './src/beautify/beautify-html.js', true, patchHTMLFormatter);
update('beautify-web/js-beautify', 'js/lib/beautify-css.js', './src/beautify/beautify-css.js', true);
update('beautify-web/js-beautify', 'LICENSE', './src/beautify/beautify-license');