/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { testCompletionFor, testQuoteCompletion, testTagCompletion } from "./completionUtil";

suite('HTML Completion', () => {
	test('Complete', function (): any {
		testCompletionFor('<|', {
			items: [
				{ label: '!DOCTYPE', resultText: '<!DOCTYPE html>' },
				{ label: 'iframe', resultText: '<iframe' },
				{ label: 'h1', resultText: '<h1' },
				{ label: 'div', resultText: '<div' }
			]
		});

		testCompletionFor('\n<|', {
			items: [{ label: '!DOCTYPE', notAvailable: true }, { label: 'iframe' }, { label: 'h1' }, { label: 'div' }]
		});

		testCompletionFor('< |', {
			items: [
				{ label: 'iframe', resultText: '<iframe' },
				{ label: 'h1', resultText: '<h1' },
				{ label: 'div', resultText: '<div' }
			]
		});

		testCompletionFor('<h|', {
			items: [
				{ label: 'html', resultText: '<html' },
				{ label: 'h1', resultText: '<h1' },
				{ label: 'header', resultText: '<header' }
			]
		});

		testCompletionFor('<input|', {
			items: [{ label: 'input', resultText: '<input' }]
		});
		testCompletionFor('<inp|ut', {
			items: [{ label: 'input', resultText: '<input' }]
		});
		testCompletionFor('<|inp', {
			items: [{ label: 'input', resultText: '<input' }]
		});
		testCompletionFor('<input |', {
			items: [
				{ label: 'type', resultText: '<input type="$1"' },
				{ label: 'style', resultText: '<input style="$1"' },
				{ label: 'onmousemove', resultText: '<input onmousemove="$1"' }
			]
		});

		testCompletionFor('<input t|', {
			items: [
				{ label: 'type', resultText: '<input type="$1"' },
				{ label: 'tabindex', resultText: '<input tabindex="$1"' }
			]
		});

		testCompletionFor('<input t|ype', {
			items: [
				{ label: 'type', resultText: '<input type="$1"' },
				{ label: 'tabindex', resultText: '<input tabindex="$1"' }
			]
		});

		testCompletionFor('<input t|ype="text"', {
			items: [
				{ label: 'type', resultText: '<input type="text"' },
				{ label: 'tabindex', resultText: '<input tabindex="text"' }
			]
		});

		testCompletionFor('<input type="text" |', {
			items: [
				{ label: 'style', resultText: '<input type="text" style="$1"' },
				{ label: 'type', notAvailable: true },
				{ label: 'size', resultText: '<input type="text" size="$1"' }
			]
		});

		testCompletionFor('<input | type="text"', {
			items: [
				{ label: 'style', resultText: '<input style="$1" type="text"' },
				{ label: 'type', notAvailable: true },
				{ label: 'size', resultText: '<input size="$1" type="text"' }
			]
		});

		testCompletionFor('<input type="text" type="number" |', {
			items: [
				{ label: 'style', resultText: '<input type="text" type="number" style="$1"' },
				{ label: 'type', notAvailable: true },
				{ label: 'size', resultText: '<input type="text" type="number" size="$1"' }
			]
		});

		testCompletionFor('<input type="text" s|', {
			items: [
				{ label: 'style', resultText: '<input type="text" style="$1"' },
				{ label: 'src', resultText: '<input type="text" src="$1"' },
				{ label: 'size', resultText: '<input type="text" size="$1"' }
			]
		});

		testCompletionFor('<input di| type="text"', {
			items: [
				{ label: 'disabled', resultText: '<input disabled type="text"' },
				{ label: 'dir', resultText: '<input dir="$1" type="text"' }
			]
		});

		testCompletionFor('<input disabled | type="text"', {
			items: [
				{ label: 'dir', resultText: '<input disabled dir="$1" type="text"' },
				{ label: 'style', resultText: '<input disabled style="$1" type="text"' }
			]
		});

		testCompletionFor('<input type=|', {
			items: [
				{ label: 'text', resultText: '<input type="text"' },
				{ label: 'checkbox', resultText: '<input type="checkbox"' }
			]
		});
		testCompletionFor('<input type="c|', {
			items: [
				{ label: 'color', resultText: '<input type="color' },
				{ label: 'checkbox', resultText: '<input type="checkbox' }
			]
		});
		testCompletionFor('<input type="|', {
			items: [
				{ label: 'color', resultText: '<input type="color' },
				{ label: 'checkbox', resultText: '<input type="checkbox' }
			]
		});
		testCompletionFor('<input type= |', {
			items: [
				{ label: 'color', resultText: '<input type= "color"' },
				{ label: 'checkbox', resultText: '<input type= "checkbox"' }
			]
		});
		testCompletionFor('<input src="c" type="color|" ', {
			items: [{ label: 'color', resultText: '<input src="c" type="color" ' }]
		});
		testCompletionFor('<iframe sandbox="allow-forms |', {
			items: [{ label: 'allow-modals', resultText: '<iframe sandbox="allow-forms allow-modals' }]
		});
		testCompletionFor('<iframe sandbox="allow-forms allow-modals|', {
			items: [{ label: 'allow-modals', resultText: '<iframe sandbox="allow-forms allow-modals' }]
		});
		testCompletionFor('<iframe sandbox="allow-forms all|"', {
			items: [{ label: 'allow-modals', resultText: '<iframe sandbox="allow-forms allow-modals"' }]
		});
		testCompletionFor('<iframe sandbox="allow-forms a|llow-modals "', {
			items: [{ label: 'allow-modals', resultText: '<iframe sandbox="allow-forms allow-modals "' }]
		});
		testCompletionFor('<input src="c" type=color| ', {
			items: [{ label: 'color', resultText: '<input src="c" type="color" ' }]
		});
		testCompletionFor('<div dir=|></div>', {
			items: [
				{ label: 'ltr', resultText: '<div dir="ltr"></div>' },
				{ label: 'rtl', resultText: '<div dir="rtl"></div>' }
			]
		});
		testCompletionFor('<ul><|>', {
			items: [{ label: '/ul', resultText: '<ul></ul>' }, { label: 'li', resultText: '<ul><li>' }]
		});
		testCompletionFor('<ul><li><|', {
			items: [{ label: '/li', resultText: '<ul><li></li>' }, { label: 'a', resultText: '<ul><li><a' }]
		});
		testCompletionFor('<goo></|>', {
			items: [{ label: '/goo', resultText: '<goo></goo>' }]
		});
		testCompletionFor('<foo></f|', {
			items: [{ label: '/foo', resultText: '<foo></foo>' }]
		});
		testCompletionFor('<foo></f|o', {
			items: [{ label: '/foo', resultText: '<foo></foo>' }]
		});
		testCompletionFor('<foo></|fo', {
			items: [{ label: '/foo', resultText: '<foo></foo>' }]
		});
		testCompletionFor('<foo></ |>', {
			items: [{ label: '/foo', resultText: '<foo></foo>' }]
		});
		testCompletionFor('<span></ s|', {
			items: [{ label: '/span', resultText: '<span></span>' }]
		});
		testCompletionFor('<li><br></ |>', {
			items: [{ label: '/li', resultText: '<li><br></li>' }]
		});
		testCompletionFor('<li/|>', {
			count: 0
		});
		testCompletionFor('  <div/|   ', {
			count: 0
		});
		testCompletionFor('<foo><br/></ f|>', {
			items: [{ label: '/foo', resultText: '<foo><br/></foo>' }]
		});
		testCompletionFor('<li><div/></|', {
			items: [{ label: '/li', resultText: '<li><div/></li>' }]
		});
		testCompletionFor('<li><br/|>', { count: 0 });
		testCompletionFor('<li><br>a/|', { count: 0 });

		testCompletionFor('<foo><bar></bar></|   ', {
			items: [{ label: '/foo', resultText: '<foo><bar></bar></foo>   ' }]
		});
		testCompletionFor('<div>\n  <form>\n    <div>\n      <label></label>\n      <|\n    </div>\n  </form></div>', {
			items: [
				{
					label: 'span',
					resultText: '<div>\n  <form>\n    <div>\n      <label></label>\n      <span\n    </div>\n  </form></div>'
				},

				{
					label: '/div',
					resultText: '<div>\n  <form>\n    <div>\n      <label></label>\n    </div>\n    </div>\n  </form></div>'
				}
			]
		});
		testCompletionFor('<body><div><div></div></div></|  >', {
			items: [{ label: '/body', resultText: '<body><div><div></div></div></body  >' }]
		});
		testCompletionFor(['<body>', '  <div>', '    </|'].join('\n'), {
			items: [{ label: '/div', resultText: ['<body>', '  <div>', '  </div>'].join('\n') }]
		});
		testCompletionFor('<div><a hre|</div>', {
			items: [{ label: 'href', resultText: '<div><a href="$1"</div>' }]
		});
		testCompletionFor('<a><b>foo</b><|f>', {
			items: [{ label: '/a', resultText: '<a><b>foo</b></a>' }, { notAvailable: true, label: '/f' }]
		});
		testCompletionFor('<a><b>foo</b><| bar.', {
			items: [{ label: '/a', resultText: '<a><b>foo</b></a> bar.' }, { notAvailable: true, label: '/bar' }]
		});
		testCompletionFor('<div><h1><br><span></span><img></| </h1></div>', {
			items: [{ label: '/h1', resultText: '<div><h1><br><span></span><img></h1> </h1></div>' }]
		});
		testCompletionFor('<div>|', {
			items: [{ label: '</div>', resultText: '<div>$0</div>' }]
		});
		testCompletionFor(
			'<div>|',
			{
				items: [{ notAvailable: true, label: '</div>' }]
			},
			{ hideAutoCompleteProposals: true }
		);
		testCompletionFor('<div d|', {
			items: [{ label: 'data-', resultText: '<div data-$1="$2"' }]
		});
		testCompletionFor('<div no-data-test="no-data" d|', {
			items: [{ notAvailable: true, label: 'no-data-test' }]
		});
		testCompletionFor('<div data-custom="test"><div d|', {
			items: [
				{ label: 'data-', resultText: '<div data-custom="test"><div data-$1="$2"' },
				{ label: 'data-custom', resultText: '<div data-custom="test"><div data-custom="$1"' }
			]
		});
		testCompletionFor('<div data-custom="test"><div data-custom-two="2"></div></div>\n <div d|', {
			items: [
				{
					label: 'data-',
					resultText: '<div data-custom="test"><div data-custom-two="2"></div></div>\n <div data-$1="$2"'
				},
				{
					label: 'data-custom',
					resultText: '<div data-custom="test"><div data-custom-two="2"></div></div>\n <div data-custom="$1"'
				},
				{
					label: 'data-custom-two',
					resultText: '<div data-custom="test"><div data-custom-two="2"></div></div>\n <div data-custom-two="$1"'
				}
			]
		});
		testCompletionFor(
			`<body data-ng-app=""><div id="first" data-ng-include=" 'firstdoc.html' "></div><div id="second" inc|></div></body>`,
			{
				items: [
					{
						label: 'data-ng-include',
						resultText: `<body data-ng-app=""><div id="first" data-ng-include=" 'firstdoc.html' "></div><div id="second" data-ng-include="$1"></div></body>`
					}
				]
			}
		);
	});

	test('References', () => {
		const doc =
			'The div element has no special meaning at all. It represents its children. It can be used with the class, lang, and title attributes to mark up semantics common to a group of consecutive elements.' +
			'\n\n' +
			'[MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/div)';

		testCompletionFor('<d|', {
			items: [{ label: 'div', resultText: '<div', documentation: { kind: 'markdown', value: doc } }]
		});
	});

	test('Case sensitivity', function () {
		testCompletionFor('<LI></|', {
			items: [{ label: '/LI', resultText: '<LI></LI>' }, { label: '/li', notAvailable: true }]
		});
		testCompletionFor('<lI></|', {
			items: [{ label: '/lI', resultText: '<lI></lI>' }]
		});
		testCompletionFor('<iNpUt |', {
			items: [{ label: 'type', resultText: '<iNpUt type="$1"' }]
		});
		testCompletionFor('<INPUT TYPE=|', {
			items: [{ label: 'color', resultText: '<INPUT TYPE="color"' }]
		});
		testCompletionFor('<dIv>|', {
			items: [{ label: '</dIv>', resultText: '<dIv>$0</dIv>' }]
		});
	});

	test('Handlebar Completion', function () {
		testCompletionFor('<script id="entry-template" type="text/x-handlebars-template"> <| </script>', {
			items: [
				{ label: 'div', resultText: '<script id="entry-template" type="text/x-handlebars-template"> <div </script>' }
			]
		});
	});

	test('Support script type="text/html"', function () {
		testCompletionFor('<script id="html-template" type="text/html"> <| </script>', {
			items: [
				{ label: 'div', resultText: '<script id="html-template" type="text/html"> <div </script>' }
			]
		});
	});

	test('Complete aria', function (): any {
		const expectedAriaAttributes = [
			{ label: 'aria-activedescendant' },
			{ label: 'aria-atomic' },
			{ label: 'aria-autocomplete' },
			{ label: 'aria-busy' },
			{ label: 'aria-checked' },
			{ label: 'aria-colcount' },
			{ label: 'aria-colindex' },
			{ label: 'aria-colspan' },
			{ label: 'aria-controls' },
			{ label: 'aria-current' },
			{ label: 'aria-describedby' },
			{ label: 'aria-disabled' },
			{ label: 'aria-dropeffect' },
			{ label: 'aria-errormessage' },
			{ label: 'aria-expanded' },
			{ label: 'aria-flowto' },
			{ label: 'aria-grabbed' },
			{ label: 'aria-haspopup' },
			{ label: 'aria-hidden' },
			{ label: 'aria-invalid' },
			{ label: 'aria-label' },
			{ label: 'aria-labelledby' },
			{ label: 'aria-level' },
			{ label: 'aria-live' },
			{ label: 'aria-modal' },
			{ label: 'aria-multiline' },
			{ label: 'aria-multiselectable' },
			{ label: 'aria-orientation' },
			{ label: 'aria-owns' },
			{ label: 'aria-placeholder' },
			{ label: 'aria-posinset' },
			{ label: 'aria-pressed' },
			{ label: 'aria-readonly' },
			{ label: 'aria-relevant' },
			{ label: 'aria-required' },
			{ label: 'aria-roledescription' },
			{ label: 'aria-rowcount' },
			{ label: 'aria-rowindex' },
			{ label: 'aria-rowspan' },
			{ label: 'aria-selected' },
			{ label: 'aria-setsize' },
			{ label: 'aria-sort' },
			{ label: 'aria-valuemax' },
			{ label: 'aria-valuemin' },
			{ label: 'aria-valuenow' },
			{ label: 'aria-valuetext' }
		];

		testCompletionFor('<div  |> </div >', { items: expectedAriaAttributes });
		testCompletionFor('<span  |> </span >', { items: expectedAriaAttributes });
		testCompletionFor('<input  |> </input >', { items: expectedAriaAttributes });
	});

	test('Settings', function (): any {
		testCompletionFor(
			'<|',
			{
				items: [{ label: 'div', notAvailable: true }]
			},
			{ html5: false }
		);
		testCompletionFor(
			'<div clas|',
			{
				items: [{ label: 'class', resultText: '<div class="$1"' }]
			},
			{ attributeDefaultValue: 'doublequotes' }
		);
		testCompletionFor(
			'<div clas|',
			{
				items: [{ label: 'class', resultText: '<div class=\'$1\'' }]
			},
			{ attributeDefaultValue: 'singlequotes' }
		);
		testCompletionFor(
			'<div clas|',
			{
				items: [{ label: 'class', resultText: '<div class=$1' }]
			},
			{ attributeDefaultValue: 'empty' }
		);
	});

	test('doQuoteComplete', function (): any {
		testQuoteCompletion('<a foo=|', '"$1"');
		testQuoteCompletion('<a foo=|', '\'$1\'', { attributeDefaultValue: 'singlequotes'});
		testQuoteCompletion('<a foo=|', null, { attributeDefaultValue: 'empty'});
		testQuoteCompletion('<a foo=|=', null);
		testQuoteCompletion('<a foo=|"bar"', null);
		testQuoteCompletion('<a foo=|></a>', '"$1"');
		testQuoteCompletion('<a foo="bar=|"', null);
		testQuoteCompletion('<a baz=| foo="bar">', '"$1"');
		testQuoteCompletion('<a>< foo=| /a>', null);
		testQuoteCompletion('<a></ foo=| a>', null);
		testQuoteCompletion('<a foo="bar" \n baz=| ></a>', '"$1"');
	});

	test('doTagComplete', function (): any {
		testTagCompletion('<div>|', '$0</div>');
		testTagCompletion('<div>|</div>', null);
		testTagCompletion('<div class="">|', '$0</div>');
		testTagCompletion('<img>|', null);
		testTagCompletion('<div><br></|', 'div>');
		testTagCompletion('<div><br><span></span></|', 'div>');
		testTagCompletion('<div><h1><br><span></span><img></| </h1></div>', 'h1>');
		testTagCompletion('<ng-template><td><ng-template></|   </td> </ng-template>', 'ng-template>');
	});

	test('Character entities', function (): any {
		testCompletionFor('<div>&|', {
			items: [
				{ label: '&hookrightarrow;', resultText: '<div>&hookrightarrow;' },
				{ label: '&plus;', resultText: '<div>&plus;' }
			]
		});
		testCompletionFor('<div>Hello&|', {
			items: [{ label: '&ZeroWidthSpace;', resultText: '<div>Hello&ZeroWidthSpace;' }]
		});
		testCompletionFor('<div>Hello&gt|', {
			items: [{ label: '&gtrdot;', resultText: '<div>Hello&gtrdot;' }]
		});
		testCompletionFor('<div class="&g|"', {
			items: [{ label: '&grave;', resultText: '<div class="&grave;"' }]
		});
		testCompletionFor('<div class=&d|', {
			items: [{ label: '&duarr;', resultText: '<div class=&duarr;' }]
		});
		testCompletionFor('<div &d|', {
			items: [{ label: '&duarr;', notAvailable: true }]
		});
		testCompletionFor('<div&d|', {
			items: [{ label: '&duarr;', notAvailable: true }]
		});
	});

	/**
	 * For https://github.com/microsoft/vscode/issues/80600
	 * When completing within <div> <| </div>, it prompts suggestion </div>
	 * that would replace whole line.
	 * If you have typed out `<div>`, this suggestion should be filtered out.
	 * Todo @Pine: make this incomplete completion list, and only include
	 * close tag suggestion after typing out </|
	 */
	test('filterText for close tag suggestion', () => {
		testCompletionFor('<div> <| </div>', {
			items: [{ label: '/div', filterText: '/div' }]
		});

		testCompletionFor('<div>\n  <|\n</div>', {
			items: [{ label: '/div', filterText: '  </div' }]
		});
	});

	test('non matching close tag suggestion', () => {
		testCompletionFor('</|', {
			items: [{ label: '/a', resultText: '</a>' }]
		});

		testCompletionFor('<div></div></|', {
			items: [{ label: '/a', resultText: '<div></div></a>' }]
		});
	});
});
