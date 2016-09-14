/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var gulp = require('gulp');
var tsb = require('gulp-tsb');
var assign = require('object-assign');
var rimraf = require('rimraf');
var merge = require('merge-stream');

var compilation = tsb.create(assign({ verbose: true }, require('./src/tsconfig.json').compilerOptions));
var tsSources = 'src/**/*.ts';

var outFolder = 'lib';

function compileTask() {
	return merge(
        gulp.src('src/beautify/*.js', { base: 'src' }),
		gulp.src(tsSources).pipe(compilation())
	)
	.pipe(gulp.dest(outFolder));
}

gulp.task('clean-out', function(cb) { rimraf(outFolder, { maxBusyTries: 1 }, cb); });
gulp.task('compile', ['clean-out'], compileTask);
gulp.task('compile-without-clean', compileTask);
gulp.task('watch', ['compile'], function() {
	gulp.watch(tsSources, ['compile-without-clean']);
});


var vscodeHTMLLibFolder = '../vscode/extensions/html/server/node_modules/vscode-html-languageservice/lib';

gulp.task('clean-vscode-html', function(cb) { rimraf(vscodeHTMLLibFolder, { maxBusyTries: 1 }, cb); });
gulp.task('compile-vscode-html', ['clean-out', 'clean-vscode-html', 'compile-vscode-html-without-clean']);
gulp.task('compile-vscode-html-without-clean', function() {
	return compileTask().pipe(gulp.dest(vscodeHTMLLibFolder));
});
gulp.task('watch-vscode-html', ['compile-vscode-html'], function() {
	gulp.watch(tsSources, ['compile-vscode-html-without-clean']);
});