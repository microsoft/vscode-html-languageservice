/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { HTMLDataProvider } from '../dataProvider';
import { ITagData, IAttributeData } from '../../htmlLanguageTypes';

export function getHTML5DataProvider() {
	return new HTMLDataProvider('html5', {
		version: 1,
		tags: HTML5_TAGS,
		globalAttributes: [...HTML5_GLOBAL_ATTRIBUTES, ...HTML5_EVENTS],
		valueSets: HTML5_VALUE_MAP
	});
}

export const HTML5_TAGS: ITagData[] = [
	{
		name: 'html',
		description: 'The html element represents the root of an HTML document.',
		attributes: [
			{
				name: 'manifest'
			}
		]
	},
	{
		name: 'head',
		description: 'The head element represents a collection of metadata for the Document.',
		attributes: []
	},
	{
		name: 'title',
		description:
			"The title element represents the document's title or name. Authors should use titles that identify their documents even when they are used out of context, for example in a user's history or bookmarks, or in search results. The document's title is often different from its first heading, since the first heading does not have to stand alone when taken out of context.",
		attributes: []
	},
	{
		name: 'base',
		description:
			'The base element allows authors to specify the document base URL for the purposes of resolving relative URLs, and the name of the default browsing context for the purposes of following hyperlinks. The element does not represent any content beyond this information.',
		attributes: [
			{
				name: 'href'
			},
			{
				name: 'target'
			}
		]
	},
	{
		name: 'link',
		description: 'The link element allows authors to link their document to other resources.',
		attributes: [
			{
				name: 'href'
			},
			{
				name: 'crossorigin',
				valueSet: 'xo'
			},
			{
				name: 'rel'
			},
			{
				name: 'media'
			},
			{
				name: 'hreflang'
			},
			{
				name: 'type'
			},
			{
				name: 'sizes'
			}
		]
	},
	{
		name: 'meta',
		description:
			'The meta element represents various kinds of metadata that cannot be expressed using the title, base, link, style, and script elements.',
		attributes: [
			{
				name: 'name'
			},
			{
				name: 'http-equiv'
			},
			{
				name: 'content'
			},
			{
				name: 'charset'
			}
		]
	},
	{
		name: 'style',
		description:
			'The style element allows authors to embed style information in their documents. The style element is one of several inputs to the styling processing model. The element does not represent content for the user.',
		attributes: [
			{
				name: 'media'
			},
			{
				name: 'nonce'
			},
			{
				name: 'type'
			},
			{
				name: 'scoped',
				valueSet: 'v'
			}
		]
	},
	{
		name: 'body',
		description: 'The body element represents the content of the document.',
		attributes: [
			{
				name: 'onafterprint'
			},
			{
				name: 'onbeforeprint'
			},
			{
				name: 'onbeforeunload'
			},
			{
				name: 'onhashchange'
			},
			{
				name: 'onlanguagechange'
			},
			{
				name: 'onmessage'
			},
			{
				name: 'onoffline'
			},
			{
				name: 'ononline'
			},
			{
				name: 'onpagehide'
			},
			{
				name: 'onpageshow'
			},
			{
				name: 'onpopstate'
			},
			{
				name: 'onstorage'
			},
			{
				name: 'onunload'
			}
		]
	},
	{
		name: 'article',
		description:
			'The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content. Each article should be identified, typically by including a heading (h1–h6 element) as a child of the article element.',
		attributes: []
	},
	{
		name: 'section',
		description:
			'The section element represents a generic section of a document or application. A section, in this context, is a thematic grouping of content. Each section should be identified, typically by including a heading ( h1- h6 element) as a child of the section element.',
		attributes: []
	},
	{
		name: 'nav',
		description:
			'The nav element represents a section of a page that links to other pages or to parts within the page: a section with navigation links.',
		attributes: []
	},
	{
		name: 'aside',
		description:
			'The aside element represents a section of a page that consists of content that is tangentially related to the content around the aside element, and which could be considered separate from that content. Such sections are often represented as sidebars in printed typography.',
		attributes: []
	},
	{
		name: 'h1',
		description: 'The h1 element represents a section heading.',
		attributes: []
	},
	{
		name: 'h2',
		description: 'The h2 element represents a section heading.',
		attributes: []
	},
	{
		name: 'h3',
		description: 'The h3 element represents a section heading.',
		attributes: []
	},
	{
		name: 'h4',
		description: 'The h4 element represents a section heading.',
		attributes: []
	},
	{
		name: 'h5',
		description: 'The h5 element represents a section heading.',
		attributes: []
	},
	{
		name: 'h6',
		description: 'The h6 element represents a section heading.',
		attributes: []
	},
	{
		name: 'header',
		description:
			'The header element represents introductory content for its nearest ancestor sectioning content or sectioning root element. A header typically contains a group of introductory or navigational aids. When the nearest ancestor sectioning content or sectioning root element is the body element, then it applies to the whole page.',
		attributes: []
	},
	{
		name: 'footer',
		description:
			'The footer element represents a footer for its nearest ancestor sectioning content or sectioning root element. A footer typically contains information about its section such as who wrote it, links to related documents, copyright data, and the like.',
		attributes: []
	},
	{
		name: 'address',
		description:
			'The address element represents the contact information for its nearest article or body element ancestor. If that is the body element, then the contact information applies to the document as a whole.',
		attributes: []
	},
	{
		name: 'p',
		description: 'The p element represents a paragraph.',
		attributes: []
	},
	{
		name: 'hr',
		description:
			'The hr element represents a paragraph-level thematic break, e.g. a scene change in a story, or a transition to another topic within a section of a reference book.',
		attributes: []
	},
	{
		name: 'pre',
		description:
			'The pre element represents a block of preformatted text, in which structure is represented by typographic conventions rather than by elements.',
		attributes: []
	},
	{
		name: 'blockquote',
		description:
			'The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a footer or cite element, and optionally with in-line changes such as annotations and abbreviations.',
		attributes: [
			{
				name: 'cite'
			}
		]
	},
	{
		name: 'ol',
		description:
			'The ol element represents a list of items, where the items have been intentionally ordered, such that changing the order would change the meaning of the document.',
		attributes: [
			{
				name: 'reversed',
				valueSet: 'v'
			},
			{
				name: 'start'
			},
			{
				name: 'type',
				valueSet: 'lt'
			}
		]
	},
	{
		name: 'ul',
		description:
			'The ul element represents a list of items, where the order of the items is not important — that is, where changing the order would not materially change the meaning of the document.',
		attributes: []
	},
	{
		name: 'li',
		description:
			"The li element represents a list item. If its parent element is an ol, ul, or menu element, then the element is an item of the parent element's list, as defined for those elements. Otherwise, the list item has no defined list-related relationship to any other li element.",
		attributes: [
			{
				name: 'value'
			}
		]
	},
	{
		name: 'dl',
		description:
			'The dl element represents an association list consisting of zero or more name-value groups (a description list). A name-value group consists of one or more names (dt elements) followed by one or more values (dd elements), ignoring any nodes other than dt and dd elements. Within a single dl element, there should not be more than one dt element for each name.',
		attributes: []
	},
	{
		name: 'dt',
		description:
			'The dt element represents the term, or name, part of a term-description group in a description list (dl element).',
		attributes: []
	},
	{
		name: 'dd',
		description:
			'The dd element represents the description, definition, or value, part of a term-description group in a description list (dl element).',
		attributes: []
	},
	{
		name: 'figure',
		description:
			'The figure element represents some flow content, optionally with a caption, that is self-contained (like a complete sentence) and is typically referenced as a single unit from the main flow of the document.',
		attributes: []
	},
	{
		name: 'figcaption',
		description:
			"The figcaption element represents a caption or legend for the rest of the contents of the figcaption element's parent figure element, if any.",
		attributes: []
	},
	{
		name: 'main',
		description:
			'The main element represents the main content of the body of a document or application. The main content area consists of content that is directly related to or expands upon the central topic of a document or central functionality of an application.',
		attributes: []
	},
	{
		name: 'div',
		description:
			'The div element has no special meaning at all. It represents its children. It can be used with the class, lang, and title attributes to mark up semantics common to a group of consecutive elements.',
		attributes: []
	},
	{
		name: 'a',
		description:
			'If the a element has an href attribute, then it represents a hyperlink (a hypertext anchor) labeled by its contents.',
		attributes: [
			{
				name: 'href'
			},
			{
				name: 'target'
			},
			{
				name: 'download'
			},
			{
				name: 'ping'
			},
			{
				name: 'rel'
			},
			{
				name: 'hreflang'
			},
			{
				name: 'type'
			}
		]
	},
	{
		name: 'em',
		description: 'The em element represents stress emphasis of its contents.',
		attributes: []
	},
	{
		name: 'strong',
		description: 'The strong element represents strong importance, seriousness, or urgency for its contents.',
		attributes: []
	},
	{
		name: 'small',
		description: 'The small element represents side comments such as small print.',
		attributes: []
	},
	{
		name: 's',
		description: 'The s element represents contents that are no longer accurate or no longer relevant.',
		attributes: []
	},
	{
		name: 'cite',
		description:
			'The cite element represents a reference to a creative work. It must include the title of the work or the name of the author(person, people or organization) or an URL reference, or a reference in abbreviated form as per the conventions used for the addition of citation metadata.',
		attributes: []
	},
	{
		name: 'q',
		description: 'The q element represents some phrasing content quoted from another source.',
		attributes: [
			{
				name: 'cite'
			}
		]
	},
	{
		name: 'dfn',
		description:
			'The dfn element represents the defining instance of a term. The paragraph, description list group, or section that is the nearest ancestor of the dfn element must also contain the definition(s) for the term given by the dfn element.',
		attributes: []
	},
	{
		name: 'abbr',
		description:
			'The abbr element represents an abbreviation or acronym, optionally with its expansion. The title attribute may be used to provide an expansion of the abbreviation. The attribute, if specified, must contain an expansion of the abbreviation, and nothing else.',
		attributes: []
	},
	{
		name: 'ruby',
		description:
			'The ruby element allows one or more spans of phrasing content to be marked with ruby annotations. Ruby annotations are short runs of text presented alongside base text, primarily used in East Asian typography as a guide for pronunciation or to include other annotations. In Japanese, this form of typography is also known as furigana. Ruby text can appear on either side, and sometimes both sides, of the base text, and it is possible to control its position using CSS. A more complete introduction to ruby can be found in the Use Cases & Exploratory Approaches for Ruby Markup document as well as in CSS Ruby Module Level 1. [RUBY-UC] [CSSRUBY]',
		attributes: []
	},
	{
		name: 'rb',
		description:
			"The rb element marks the base text component of a ruby annotation. When it is the child of a ruby element, it doesn't represent anything itself, but its parent ruby element uses it as part of determining what it represents.",
		attributes: []
	},
	{
		name: 'rt',
		description:
			"The rt element marks the ruby text component of a ruby annotation. When it is the child of a ruby element or of an rtc element that is itself the child of a ruby element, it doesn't represent anything itself, but its ancestor ruby element uses it as part of determining what it represents.",
		attributes: []
	},
	{
		name: 'rp',
		description:
			"The rp element is used to provide fallback text to be shown by user agents that don't support ruby annotations. One widespread convention is to provide parentheses around the ruby text component of a ruby annotation.",
		attributes: []
	},
	{
		name: 'time',
		description:
			'The time element represents its contents, along with a machine-readable form of those contents in the datetime attribute. The kind of content is limited to various kinds of dates, times, time-zone offsets, and durations, as described below.',
		attributes: [
			{
				name: 'datetime'
			}
		]
	},
	{
		name: 'code',
		description:
			'The code element represents a fragment of computer code. This could be an XML element name, a file name, a computer program, or any other string that a computer would recognize.',
		attributes: []
	},
	{
		name: 'var',
		description:
			'The var element represents a variable. This could be an actual variable in a mathematical expression or programming context, an identifier representing a constant, a symbol identifying a physical quantity, a function parameter, or just be a term used as a placeholder in prose.',
		attributes: []
	},
	{
		name: 'samp',
		description: 'The samp element represents sample or quoted output from another program or computing system.',
		attributes: []
	},
	{
		name: 'kbd',
		description:
			'The kbd element represents user input (typically keyboard input, although it may also be used to represent other input, such as voice commands).',
		attributes: []
	},
	{
		name: 'sub',
		description: 'The sub element represents a subscript.',
		attributes: []
	},
	{
		name: 'sup',
		description: 'The sup element represents a superscript.',
		attributes: []
	},
	{
		name: 'i',
		description:
			'The i element represents a span of text in an alternate voice or mood, or otherwise offset from the normal prose in a manner indicating a different quality of text, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, transliteration, a thought, or a ship name in Western texts.',
		attributes: []
	},
	{
		name: 'b',
		description:
			'The b element represents a span of text to which attention is being drawn for utilitarian purposes without conveying any extra importance and with no implication of an alternate voice or mood, such as key words in a document abstract, product names in a review, actionable words in interactive text-driven software, or an article lede.',
		attributes: []
	},
	{
		name: 'u',
		description:
			'The u element represents a span of text with an unarticulated, though explicitly rendered, non-textual annotation, such as labeling the text as being a proper name in Chinese text (a Chinese proper name mark), or labeling the text as being misspelt.',
		attributes: []
	},
	{
		name: 'mark',
		description:
			"The mark element represents a run of text in one document marked or highlighted for reference purposes, due to its relevance in another context. When used in a quotation or other block of text referred to from the prose, it indicates a highlight that was not originally present but which has been added to bring the reader's attention to a part of the text that might not have been considered important by the original author when the block was originally written, but which is now under previously unexpected scrutiny. When used in the main prose of a document, it indicates a part of the document that has been highlighted due to its likely relevance to the user's current activity.",
		attributes: []
	},
	{
		name: 'bdi',
		description:
			'The bdi element represents a span of text that is to be isolated from its surroundings for the purposes of bidirectional text formatting. [BIDI]',
		attributes: []
	},
	{
		name: 'dbo',
		description:
			'The bdo element represents explicit text directionality formatting control for its children. It allows authors to override the Unicode bidirectional algorithm by explicitly specifying a direction override. [BIDI]',
		attributes: []
	},
	{
		name: 'span',
		description:
			"The span element doesn't mean anything on its own, but can be useful when used together with the global attributes, e.g. class, lang, or dir. It represents its children.",
		attributes: []
	},
	{
		name: 'br',
		description: 'The br element represents a line break.',
		attributes: []
	},
	{
		name: 'wbr',
		description: 'The wbr element represents a line break opportunity.',
		attributes: []
	},
	{
		name: 'ins',
		description: 'The ins element represents an addition to the document.',
		attributes: []
	},
	{
		name: 'del',
		description: 'The del element represents a removal from the document.',
		attributes: [
			{
				name: 'cite'
			},
			{
				name: 'datetime'
			}
		]
	},
	{
		name: 'picture',
		description:
			'The picture element is a container which provides multiple sources to its contained img element to allow authors to declaratively control or give hints to the user agent about which image resource to use, based on the screen pixel density, viewport size, image format, and other factors. It represents its children.',
		attributes: []
	},
	{
		name: 'img',
		description: 'An img element represents an image.',
		attributes: [
			{
				name: 'alt'
			},
			{
				name: 'src'
			},
			{
				name: 'srcset'
			},
			{
				name: 'crossorigin',
				valueSet: 'xo'
			},
			{
				name: 'usemap'
			},
			{
				name: 'ismap',
				valueSet: 'v'
			},
			{
				name: 'width'
			},
			{
				name: 'height'
			}
		]
	},
	{
		name: 'iframe',
		description: 'The iframe element represents a nested browsing context.',
		attributes: [
			{
				name: 'src'
			},
			{
				name: 'srcdoc'
			},
			{
				name: 'name'
			},
			{
				name: 'sandbox',
				valueSet: 'sb'
			},
			{
				name: 'seamless',
				valueSet: 'v'
			},
			{
				name: 'allowfullscreen',
				valueSet: 'v'
			},
			{
				name: 'width'
			},
			{
				name: 'height'
			}
		]
	},
	{
		name: 'embed',
		description:
			'The embed element provides an integration point for an external (typically non-HTML) application or interactive content.',
		attributes: [
			{
				name: 'src'
			},
			{
				name: 'type'
			},
			{
				name: 'width'
			},
			{
				name: 'height'
			}
		]
	},
	{
		name: 'object',
		description:
			'The object element can represent an external resource, which, depending on the type of the resource, will either be treated as an image, as a nested browsing context, or as an external resource to be processed by a plugin.',
		attributes: [
			{
				name: 'data'
			},
			{
				name: 'type'
			},
			{
				name: 'typemustmatch',
				valueSet: 'v'
			},
			{
				name: 'name'
			},
			{
				name: 'usemap'
			},
			{
				name: 'form'
			},
			{
				name: 'width'
			},
			{
				name: 'height'
			}
		]
	},
	{
		name: 'param',
		description:
			'The param element defines parameters for plugins invoked by object elements. It does not represent anything on its own.',
		attributes: [
			{
				name: 'name'
			},
			{
				name: 'value'
			}
		]
	},
	{
		name: 'video',
		description: 'A video element is used for playing videos or movies, and audio files with captions.',
		attributes: [
			{
				name: 'src'
			},
			{
				name: 'crossorigin',
				valueSet: 'xo'
			},
			{
				name: 'poster'
			},
			{
				name: 'preload',
				valueSet: 'pl'
			},
			{
				name: 'autoplay',
				valueSet: 'v'
			},
			{
				name: 'mediagroup'
			},
			{
				name: 'loop',
				valueSet: 'v'
			},
			{
				name: 'muted',
				valueSet: 'v'
			},
			{
				name: 'controls',
				valueSet: 'v'
			},
			{
				name: 'width'
			},
			{
				name: 'height'
			}
		]
	},
	{
		name: 'audio',
		description: 'An audio element represents a sound or audio stream.',
		attributes: [
			{
				name: 'src'
			},
			{
				name: 'crossorigin',
				valueSet: 'xo'
			},
			{
				name: 'preload',
				valueSet: 'pl'
			},
			{
				name: 'autoplay',
				valueSet: 'v'
			},
			{
				name: 'mediagroup'
			},
			{
				name: 'loop',
				valueSet: 'v'
			},
			{
				name: 'muted',
				valueSet: 'v'
			},
			{
				name: 'controls',
				valueSet: 'v'
			}
		]
	},
	{
		name: 'source',
		description:
			'The source element allows authors to specify multiple alternative media resources for media elements. It does not represent anything on its own.',
		attributes: [
			{
				name: 'src'
			},
			{
				name: 'type'
			}
		]
	},
	{
		name: 'track',
		description:
			'The track element allows authors to specify explicit external timed text tracks for media elements. It does not represent anything on its own.',
		attributes: [
			{
				name: 'default',
				valueSet: 'v'
			},
			{
				name: 'kind',
				valueSet: 'tk'
			},
			{
				name: 'label'
			},
			{
				name: 'src'
			},
			{
				name: 'srclang'
			}
		]
	},
	{
		name: 'map',
		description:
			'The map element, in conjunction with an img element and any area element descendants, defines an image map. The element represents its children.',
		attributes: [
			{
				name: 'name'
			}
		]
	},
	{
		name: 'area',
		description:
			'The area element represents either a hyperlink with some text and a corresponding area on an image map, or a dead area on an image map.',
		attributes: [
			{
				name: 'alt'
			},
			{
				name: 'coords'
			},
			{
				name: 'shape',
				valueSet: 'sh'
			},
			{
				name: 'href'
			},
			{
				name: 'target'
			},
			{
				name: 'download'
			},
			{
				name: 'ping'
			},
			{
				name: 'rel'
			},
			{
				name: 'hreflang'
			},
			{
				name: 'type'
			}
		]
	},
	{
		name: 'table',
		description: 'The table element represents data with more than one dimension, in the form of a table.',
		attributes: [
			{
				name: 'sortable',
				valueSet: 'v'
			},
			{
				name: 'border'
			}
		]
	},
	{
		name: 'caption',
		description:
			'The caption element represents the title of the table that is its parent, if it has a parent and that is a table element.',
		attributes: []
	},
	{
		name: 'colgroup',
		description:
			'The colgroup element represents a group of one or more columns in the table that is its parent, if it has a parent and that is a table element.',
		attributes: [
			{
				name: 'span'
			}
		]
	},
	{
		name: 'col',
		description:
			'If a col element has a parent and that is a colgroup element that itself has a parent that is a table element, then the col element represents one or more columns in the column group represented by that colgroup.',
		attributes: [
			{
				name: 'span'
			}
		]
	},
	{
		name: 'tbody',
		description:
			'The tbody element represents a block of rows that consist of a body of data for the parent table element, if the tbody element has a parent and it is a table.',
		attributes: []
	},
	{
		name: 'thead',
		description:
			'The thead element represents the block of rows that consist of the column labels (headers) for the parent table element, if the thead element has a parent and it is a table.',
		attributes: []
	},
	{
		name: 'tfoot',
		description:
			'The tfoot element represents the block of rows that consist of the column summaries (footers) for the parent table element, if the tfoot element has a parent and it is a table.',
		attributes: []
	},
	{
		name: 'tr',
		description: 'The tr element represents a row of cells in a table.',
		attributes: []
	},
	{
		name: 'td',
		description: 'The td element represents a data cell in a table.',
		attributes: [
			{
				name: 'colspan'
			},
			{
				name: 'rowspan'
			},
			{
				name: 'headers'
			}
		]
	},
	{
		name: 'th',
		description: 'The th element represents a header cell in a table.',
		attributes: [
			{
				name: 'colspan'
			},
			{
				name: 'rowspan'
			},
			{
				name: 'headers'
			},
			{
				name: 'scope',
				valueSet: 's'
			},
			{
				name: 'sorted'
			},
			{
				name: 'abbr'
			}
		]
	},
	{
		name: 'form',
		description:
			'The form element represents a collection of form-associated elements, some of which can represent editable values that can be submitted to a server for processing.',
		attributes: [
			{
				name: 'accept-charset'
			},
			{
				name: 'action'
			},
			{
				name: 'autocomplete',
				valueSet: 'o'
			},
			{
				name: 'enctype',
				valueSet: 'et'
			},
			{
				name: 'method',
				valueSet: 'm'
			},
			{
				name: 'name'
			},
			{
				name: 'novalidate',
				valueSet: 'v'
			},
			{
				name: 'target'
			}
		]
	},
	{
		name: 'label',
		description:
			"The label element represents a caption in a user interface. The caption can be associated with a specific form control, known as the label element's labeled control, either using the for attribute, or by putting the form control inside the label element itself.",
		attributes: [
			{
				name: 'form'
			},
			{
				name: 'for'
			}
		]
	},
	{
		name: 'input',
		description:
			'The input element represents a typed data field, usually with a form control to allow the user to edit the data.',
		attributes: [
			{
				name: 'accept'
			},
			{
				name: 'alt'
			},
			{
				name: 'autocomplete',
				valueSet: 'inputautocomplete'
			},
			{
				name: 'autofocus',
				valueSet: 'v'
			},
			{
				name: 'checked',
				valueSet: 'v'
			},
			{
				name: 'dirname'
			},
			{
				name: 'disabled',
				valueSet: 'v'
			},
			{
				name: 'form'
			},
			{
				name: 'formaction'
			},
			{
				name: 'formenctype',
				valueSet: 'et'
			},
			{
				name: 'formmethod',
				valueSet: 'fm'
			},
			{
				name: 'formnovalidate',
				valueSet: 'v'
			},
			{
				name: 'formtarget'
			},
			{
				name: 'height'
			},
			{
				name: 'inputmode',
				valueSet: 'im'
			},
			{
				name: 'list'
			},
			{
				name: 'max'
			},
			{
				name: 'maxlength'
			},
			{
				name: 'min'
			},
			{
				name: 'minlength'
			},
			{
				name: 'multiple',
				valueSet: 'v'
			},
			{
				name: 'name'
			},
			{
				name: 'pattern'
			},
			{
				name: 'placeholder'
			},
			{
				name: 'readonly',
				valueSet: 'v'
			},
			{
				name: 'required',
				valueSet: 'v'
			},
			{
				name: 'size'
			},
			{
				name: 'src'
			},
			{
				name: 'step'
			},
			{
				name: 'type',
				valueSet: 't'
			},
			{
				name: 'value'
			},
			{
				name: 'width'
			}
		]
	},
	{
		name: 'button',
		description: 'The button element represents a button labeled by its contents.',
		attributes: [
			{
				name: 'autofocus',
				valueSet: 'v'
			},
			{
				name: 'disabled',
				valueSet: 'v'
			},
			{
				name: 'form'
			},
			{
				name: 'formaction'
			},
			{
				name: 'formenctype',
				valueSet: 'et'
			},
			{
				name: 'formmethod',
				valueSet: 'fm'
			},
			{
				name: 'formnovalidate',
				valueSet: 'v'
			},
			{
				name: 'formtarget'
			},
			{
				name: 'name'
			},
			{
				name: 'type',
				valueSet: 'bt'
			},
			{
				name: 'value'
			}
		]
	},
	{
		name: 'select',
		description: 'The select element represents a control for selecting amongst a set of options.',
		attributes: [
			{
				name: 'autocomplete',
				valueSet: 'inputautocomplete'
			},
			{
				name: 'autofocus',
				valueSet: 'v'
			},
			{
				name: 'disabled',
				valueSet: 'v'
			},
			{
				name: 'form'
			},
			{
				name: 'multiple',
				valueSet: 'v'
			},
			{
				name: 'name'
			},
			{
				name: 'required',
				valueSet: 'v'
			},
			{
				name: 'size'
			}
		]
	},
	{
		name: 'datalist',
		description:
			'The datalist element represents a set of option elements that represent predefined options for other controls. In the rendering, the datalist element represents nothing and it, along with its children, should be hidden.',
		attributes: []
	},
	{
		name: 'optgroup',
		description: 'The optgroup element represents a group of option elements with a common label.',
		attributes: [
			{
				name: 'disabled',
				valueSet: 'v'
			},
			{
				name: 'label'
			}
		]
	},
	{
		name: 'option',
		description:
			'The option element represents an option in a select element or as part of a list of suggestions in a datalist element.',
		attributes: [
			{
				name: 'disabled',
				valueSet: 'v'
			},
			{
				name: 'label'
			},
			{
				name: 'selected',
				valueSet: 'v'
			},
			{
				name: 'value'
			}
		]
	},
	{
		name: 'textarea',
		description:
			"The textarea element represents a multiline plain text edit control for the element's raw value. The contents of the control represent the control's default value.",
		attributes: [
			{
				name: 'autocomplete',
				valueSet: 'inputautocomplete'
			},
			{
				name: 'autofocus',
				valueSet: 'v'
			},
			{
				name: 'cols'
			},
			{
				name: 'dirname'
			},
			{
				name: 'disabled',
				valueSet: 'v'
			},
			{
				name: 'form'
			},
			{
				name: 'inputmode',
				valueSet: 'im'
			},
			{
				name: 'maxlength'
			},
			{
				name: 'minlength'
			},
			{
				name: 'name'
			},
			{
				name: 'placeholder'
			},
			{
				name: 'readonly',
				valueSet: 'v'
			},
			{
				name: 'required',
				valueSet: 'v'
			},
			{
				name: 'rows'
			},
			{
				name: 'wrap',
				valueSet: 'w'
			}
		]
	},
	{
		name: 'output',
		description:
			'The output element represents the result of a calculation performed by the application, or the result of a user action.',
		attributes: [
			{
				name: 'for'
			},
			{
				name: 'form'
			},
			{
				name: 'name'
			}
		]
	},
	{
		name: 'progress',
		description:
			'The progress element represents the completion progress of a task. The progress is either indeterminate, indicating that progress is being made but that it is not clear how much more work remains to be done before the task is complete (e.g. because the task is waiting for a remote host to respond), or the progress is a number in the range zero to a maximum, giving the fraction of work that has so far been completed.',
		attributes: [
			{
				name: 'value'
			},
			{
				name: 'max'
			}
		]
	},
	{
		name: 'meter',
		description:
			'The meter element represents a scalar measurement within a known range, or a fractional value; for example disk usage, the relevance of a query result, or the fraction of a voting population to have selected a particular candidate.',
		attributes: [
			{
				name: 'value'
			},
			{
				name: 'min'
			},
			{
				name: 'max'
			},
			{
				name: 'low'
			},
			{
				name: 'high'
			},
			{
				name: 'optimum'
			}
		]
	},
	{
		name: 'fieldset',
		description: 'The fieldset element represents a set of form controls optionally grouped under a common name.',
		attributes: [
			{
				name: 'disabled',
				valueSet: 'v'
			},
			{
				name: 'form'
			},
			{
				name: 'name'
			}
		]
	},
	{
		name: 'legend',
		description:
			"The legend element represents a caption for the rest of the contents of the legend element's parent fieldset element, if any.",
		attributes: []
	},
	{
		name: 'details',
		description:
			'The details element represents a disclosure widget from which the user can obtain additional information or controls.',
		attributes: [
			{
				name: 'open',
				valueSet: 'v'
			}
		]
	},
	{
		name: 'summary',
		description:
			"The summary element represents a summary, caption, or legend for the rest of the contents of the summary element's parent details element, if any.",
		attributes: []
	},
	{
		name: 'dialog',
		description:
			'The dialog element represents a part of an application that a user interacts with to perform a task, for example a dialog box, inspector, or window.',
		attributes: []
	},
	{
		name: 'script',
		description:
			'The script element allows authors to include dynamic script and data blocks in their documents. The element does not represent content for the user.',
		attributes: [
			{
				name: 'src'
			},
			{
				name: 'type'
			},
			{
				name: 'charset'
			},
			{
				name: 'async',
				valueSet: 'v'
			},
			{
				name: 'defer',
				valueSet: 'v'
			},
			{
				name: 'crossorigin',
				valueSet: 'xo'
			},
			{
				name: 'nonce'
			}
		]
	},
	{
		name: 'noscript',
		description:
			"The noscript element represents nothing if scripting is enabled, and represents its children if scripting is disabled. It is used to present different markup to user agents that support scripting and those that don't support scripting, by affecting how the document is parsed.",
		attributes: []
	},
	{
		name: 'template',
		description:
			'The template element is used to declare fragments of HTML that can be cloned and inserted in the document by script.',
		attributes: []
	},
	{
		name: 'canvas',
		description:
			'The canvas element provides scripts with a resolution-dependent bitmap canvas, which can be used for rendering graphs, game graphics, art, or other visual images on the fly.',
		attributes: [
			{
				name: 'width'
			},
			{
				name: 'height'
			}
		]
	}
];

export const HTML5_GLOBAL_ATTRIBUTES: IAttributeData[] = [
	{
		name: 'aria-activedescendant'
	},
	{
		name: 'aria-atomic',
		valueSet: 'b'
	},
	{
		name: 'aria-autocomplete',
		valueSet: 'autocomplete'
	},
	{
		name: 'aria-busy',
		valueSet: 'b'
	},
	{
		name: 'aria-checked',
		valueSet: 'tristate'
	},
	{
		name: 'aria-colcount'
	},
	{
		name: 'aria-colindex'
	},
	{
		name: 'aria-colspan'
	},
	{
		name: 'aria-controls'
	},
	{
		name: 'aria-current',
		valueSet: 'current'
	},
	{
		name: 'aria-describedat'
	},
	{
		name: 'aria-describedby'
	},
	{
		name: 'aria-disabled',
		valueSet: 'b'
	},
	{
		name: 'aria-dropeffect',
		valueSet: 'dropeffect'
	},
	{
		name: 'aria-errormessage'
	},
	{
		name: 'aria-expanded',
		valueSet: 'u'
	},
	{
		name: 'aria-flowto'
	},
	{
		name: 'aria-grabbed',
		valueSet: 'u'
	},
	{
		name: 'aria-haspopup',
		valueSet: 'b'
	},
	{
		name: 'aria-hidden',
		valueSet: 'b'
	},
	{
		name: 'aria-invalid',
		valueSet: 'invalid'
	},
	{
		name: 'aria-kbdshortcuts'
	},
	{
		name: 'aria-label'
	},
	{
		name: 'aria-labelledby'
	},
	{
		name: 'aria-level'
	},
	{
		name: 'aria-live',
		valueSet: 'live'
	},
	{
		name: 'aria-modal',
		valueSet: 'b'
	},
	{
		name: 'aria-multiline',
		valueSet: 'b'
	},
	{
		name: 'aria-multiselectable',
		valueSet: 'b'
	},
	{
		name: 'aria-orientation',
		valueSet: 'orientation'
	},
	{
		name: 'aria-owns'
	},
	{
		name: 'aria-placeholder'
	},
	{
		name: 'aria-posinset'
	},
	{
		name: 'aria-pressed',
		valueSet: 'tristate'
	},
	{
		name: 'aria-readonly',
		valueSet: 'b'
	},
	{
		name: 'aria-relevant',
		valueSet: 'relevant'
	},
	{
		name: 'aria-required',
		valueSet: 'b'
	},
	{
		name: 'aria-roledescription'
	},
	{
		name: 'aria-rowcount'
	},
	{
		name: 'aria-rowindex'
	},
	{
		name: 'aria-rowspan'
	},
	{
		name: 'aria-selected',
		valueSet: 'u'
	},
	{
		name: 'aria-setsize'
	},
	{
		name: 'aria-sort',
		valueSet: 'sort'
	},
	{
		name: 'aria-valuemax'
	},
	{
		name: 'aria-valuemin'
	},
	{
		name: 'aria-valuenow'
	},
	{
		name: 'aria-valuetext'
	},
	{
		name: 'accesskey'
	},
	{
		name: 'class'
	},
	{
		name: 'contenteditable',
		valueSet: 'b'
	},
	{
		name: 'contextmenu'
	},
	{
		name: 'dir',
		valueSet: 'd'
	},
	{
		name: 'draggable',
		valueSet: 'b'
	},
	{
		name: 'dropzone'
	},
	{
		name: 'hidden',
		valueSet: 'v'
	},
	{
		name: 'id'
	},
	{
		name: 'itemid'
	},
	{
		name: 'itemprop'
	},
	{
		name: 'itemref'
	},
	{
		name: 'itemscope',
		valueSet: 'v'
	},
	{
		name: 'itemtype'
	},
	{
		name: 'lang'
	},
	{
		name: 'role',
		valueSet: 'roles'
	},
	{
		name: 'spellcheck',
		valueSet: 'b'
	},
	{
		name: 'style'
	},
	{
		name: 'tabindex'
	},
	{
		name: 'title'
	},
	{
		name: 'translate',
		valueSet: 'y'
	}
];

export const HTML5_EVENTS: IAttributeData[] = [
	{ name: 'onabort' },
	{ name: 'onblur' },
	{ name: 'oncanplay' },
	{ name: 'oncanplaythrough' },
	{ name: 'onchange' },
	{ name: 'onclick' },
	{ name: 'oncontextmenu' },
	{ name: 'ondblclick' },
	{ name: 'ondrag' },
	{ name: 'ondragend' },
	{ name: 'ondragenter' },
	{ name: 'ondragleave' },
	{ name: 'ondragover' },
	{ name: 'ondragstart' },
	{ name: 'ondrop' },
	{ name: 'ondurationchange' },
	{ name: 'onemptied' },
	{ name: 'onended' },
	{ name: 'onerror' },
	{ name: 'onfocus' },
	{ name: 'onformchange' },
	{ name: 'onforminput' },
	{ name: 'oninput' },
	{ name: 'oninvalid' },
	{ name: 'onkeydown' },
	{ name: 'onkeypress' },
	{ name: 'onkeyup' },
	{ name: 'onload' },
	{ name: 'onloadeddata' },
	{ name: 'onloadedmetadata' },
	{ name: 'onloadstart' },
	{ name: 'onmousedown' },
	{ name: 'onmousemove' },
	{ name: 'onmouseout' },
	{ name: 'onmouseover' },
	{ name: 'onmouseup' },
	{ name: 'onmousewheel' },
	{ name: 'onpause' },
	{ name: 'onplay' },
	{ name: 'onplaying' },
	{ name: 'onprogress' },
	{ name: 'onratechange' },
	{ name: 'onreset' },
	{ name: 'onresize' },
	{ name: 'onreadystatechange' },
	{ name: 'onscroll' },
	{ name: 'onseeked' },
	{ name: 'onseeking' },
	{ name: 'onselect' },
	{ name: 'onshow' },
	{ name: 'onstalled' },
	{ name: 'onsubmit' },
	{ name: 'onsuspend' },
	{ name: 'ontimeupdate' },
	{ name: 'onvolumechange' },
	{ name: 'onwaiting' }
];

export const HTML5_VALUE_MAP = [
	{
		name: 'b',
		values: [
			{
				name: 'true'
			},
			{
				name: 'false'
			}
		]
	},
	{
		name: 'u',
		values: [
			{
				name: 'true'
			},
			{
				name: 'false'
			},
			{
				name: 'undefined'
			}
		]
	},
	{
		name: 'o',
		values: [
			{
				name: 'on'
			},
			{
				name: 'off'
			}
		]
	},
	{
		name: 'y',
		values: [
			{
				name: 'yes'
			},
			{
				name: 'no'
			}
		]
	},
	{
		name: 'w',
		values: [
			{
				name: 'soft'
			},
			{
				name: 'hard'
			}
		]
	},
	{
		name: 'd',
		values: [
			{
				name: 'ltr'
			},
			{
				name: 'rtl'
			},
			{
				name: 'auto'
			}
		]
	},
	{
		name: 'm',
		values: [
			{
				name: 'GET'
			},
			{
				name: 'POST'
			},
			{
				name: 'dialog'
			}
		]
	},
	{
		name: 'fm',
		values: [
			{
				name: 'GET'
			},
			{
				name: 'POST'
			}
		]
	},
	{
		name: 's',
		values: [
			{
				name: 'row'
			},
			{
				name: 'col'
			},
			{
				name: 'rowgroup'
			},
			{
				name: 'colgroup'
			}
		]
	},
	{
		name: 't',
		values: [
			{
				name: 'hidden'
			},
			{
				name: 'text'
			},
			{
				name: 'search'
			},
			{
				name: 'tel'
			},
			{
				name: 'url'
			},
			{
				name: 'email'
			},
			{
				name: 'password'
			},
			{
				name: 'datetime'
			},
			{
				name: 'date'
			},
			{
				name: 'month'
			},
			{
				name: 'week'
			},
			{
				name: 'time'
			},
			{
				name: 'datetime-local'
			},
			{
				name: 'number'
			},
			{
				name: 'range'
			},
			{
				name: 'color'
			},
			{
				name: 'checkbox'
			},
			{
				name: 'radio'
			},
			{
				name: 'file'
			},
			{
				name: 'submit'
			},
			{
				name: 'image'
			},
			{
				name: 'reset'
			},
			{
				name: 'button'
			}
		]
	},
	{
		name: 'im',
		values: [
			{
				name: 'verbatim'
			},
			{
				name: 'latin'
			},
			{
				name: 'latin-name'
			},
			{
				name: 'latin-prose'
			},
			{
				name: 'full-width-latin'
			},
			{
				name: 'kana'
			},
			{
				name: 'kana-name'
			},
			{
				name: 'katakana'
			},
			{
				name: 'numeric'
			},
			{
				name: 'tel'
			},
			{
				name: 'email'
			},
			{
				name: 'url'
			}
		]
	},
	{
		name: 'bt',
		values: [
			{
				name: 'button'
			},
			{
				name: 'submit'
			},
			{
				name: 'reset'
			},
			{
				name: 'menu'
			}
		]
	},
	{
		name: 'lt',
		values: [
			{
				name: '1'
			},
			{
				name: 'a'
			},
			{
				name: 'A'
			},
			{
				name: 'i'
			},
			{
				name: 'I'
			}
		]
	},
	{
		name: 'mt',
		values: [
			{
				name: 'context'
			},
			{
				name: 'toolbar'
			}
		]
	},
	{
		name: 'mit',
		values: [
			{
				name: 'command'
			},
			{
				name: 'checkbox'
			},
			{
				name: 'radio'
			}
		]
	},
	{
		name: 'et',
		values: [
			{
				name: 'application/x-www-form-urlencoded'
			},
			{
				name: 'multipart/form-data'
			},
			{
				name: 'text/plain'
			}
		]
	},
	{
		name: 'tk',
		values: [
			{
				name: 'subtitles'
			},
			{
				name: 'captions'
			},
			{
				name: 'descriptions'
			},
			{
				name: 'chapters'
			},
			{
				name: 'metadata'
			}
		]
	},
	{
		name: 'pl',
		values: [
			{
				name: 'none'
			},
			{
				name: 'metadata'
			},
			{
				name: 'auto'
			}
		]
	},
	{
		name: 'sh',
		values: [
			{
				name: 'circle'
			},
			{
				name: 'default'
			},
			{
				name: 'poly'
			},
			{
				name: 'rect'
			}
		]
	},
	{
		name: 'xo',
		values: [
			{
				name: 'anonymous'
			},
			{
				name: 'use-credentials'
			}
		]
	},
	{
		name: 'sb',
		values: [
			{
				name: 'allow-forms'
			},
			{
				name: 'allow-modals'
			},
			{
				name: 'allow-pointer-lock'
			},
			{
				name: 'allow-popups'
			},
			{
				name: 'allow-popups-to-escape-sandbox'
			},
			{
				name: 'allow-same-origin'
			},
			{
				name: 'allow-scripts'
			},
			{
				name: 'allow-top-navigation'
			}
		]
	},
	{
		name: 'tristate',
		values: [
			{
				name: 'true'
			},
			{
				name: 'false'
			},
			{
				name: 'mixed'
			},
			{
				name: 'undefined'
			}
		]
	},
	{
		name: 'inputautocomplete',
		values: [
			{
				name: 'additional-name'
			},
			{
				name: 'address-level1'
			},
			{
				name: 'address-level2'
			},
			{
				name: 'address-level3'
			},
			{
				name: 'address-level4'
			},
			{
				name: 'address-line1'
			},
			{
				name: 'address-line2'
			},
			{
				name: 'address-line3'
			},
			{
				name: 'bday'
			},
			{
				name: 'bday-year'
			},
			{
				name: 'bday-day'
			},
			{
				name: 'bday-month'
			},
			{
				name: 'billing'
			},
			{
				name: 'cc-additional-name'
			},
			{
				name: 'cc-csc'
			},
			{
				name: 'cc-exp'
			},
			{
				name: 'cc-exp-month'
			},
			{
				name: 'cc-exp-year'
			},
			{
				name: 'cc-family-name'
			},
			{
				name: 'cc-given-name'
			},
			{
				name: 'cc-name'
			},
			{
				name: 'cc-number'
			},
			{
				name: 'cc-type'
			},
			{
				name: 'country'
			},
			{
				name: 'country-name'
			},
			{
				name: 'current-password'
			},
			{
				name: 'email'
			},
			{
				name: 'family-name'
			},
			{
				name: 'fax'
			},
			{
				name: 'given-name'
			},
			{
				name: 'home'
			},
			{
				name: 'honorific-prefix'
			},
			{
				name: 'honorific-suffix'
			},
			{
				name: 'impp'
			},
			{
				name: 'language'
			},
			{
				name: 'mobile'
			},
			{
				name: 'name'
			},
			{
				name: 'new-password'
			},
			{
				name: 'nickname'
			},
			{
				name: 'organization'
			},
			{
				name: 'organization-title'
			},
			{
				name: 'pager'
			},
			{
				name: 'photo'
			},
			{
				name: 'postal-code'
			},
			{
				name: 'sex'
			},
			{
				name: 'shipping'
			},
			{
				name: 'street-address'
			},
			{
				name: 'tel-area-code'
			},
			{
				name: 'tel'
			},
			{
				name: 'tel-country-code'
			},
			{
				name: 'tel-extension'
			},
			{
				name: 'tel-local'
			},
			{
				name: 'tel-local-prefix'
			},
			{
				name: 'tel-local-suffix'
			},
			{
				name: 'tel-national'
			},
			{
				name: 'transaction-amount'
			},
			{
				name: 'transaction-currency'
			},
			{
				name: 'url'
			},
			{
				name: 'username'
			},
			{
				name: 'work'
			}
		]
	},
	{
		name: 'autocomplete',
		values: [
			{
				name: 'inline'
			},
			{
				name: 'list'
			},
			{
				name: 'both'
			},
			{
				name: 'none'
			}
		]
	},
	{
		name: 'current',
		values: [
			{
				name: 'page'
			},
			{
				name: 'step'
			},
			{
				name: 'location'
			},
			{
				name: 'date'
			},
			{
				name: 'time'
			},
			{
				name: 'true'
			},
			{
				name: 'false'
			}
		]
	},
	{
		name: 'dropeffect',
		values: [
			{
				name: 'copy'
			},
			{
				name: 'move'
			},
			{
				name: 'link'
			},
			{
				name: 'execute'
			},
			{
				name: 'popup'
			},
			{
				name: 'none'
			}
		]
	},
	{
		name: 'invalid',
		values: [
			{
				name: 'grammar'
			},
			{
				name: 'false'
			},
			{
				name: 'spelling'
			},
			{
				name: 'true'
			}
		]
	},
	{
		name: 'live',
		values: [
			{
				name: 'off'
			},
			{
				name: 'polite'
			},
			{
				name: 'assertive'
			}
		]
	},
	{
		name: 'orientation',
		values: [
			{
				name: 'vertical'
			},
			{
				name: 'horizontal'
			},
			{
				name: 'undefined'
			}
		]
	},
	{
		name: 'relevant',
		values: [
			{
				name: 'additions'
			},
			{
				name: 'removals'
			},
			{
				name: 'text'
			},
			{
				name: 'all'
			},
			{
				name: 'additions text'
			}
		]
	},
	{
		name: 'sort',
		values: [
			{
				name: 'ascending'
			},
			{
				name: 'descending'
			},
			{
				name: 'none'
			},
			{
				name: 'other'
			}
		]
	},
	{
		name: 'roles',
		values: [
			{
				name: 'alert'
			},
			{
				name: 'alertdialog'
			},
			{
				name: 'button'
			},
			{
				name: 'checkbox'
			},
			{
				name: 'dialog'
			},
			{
				name: 'gridcell'
			},
			{
				name: 'link'
			},
			{
				name: 'log'
			},
			{
				name: 'marquee'
			},
			{
				name: 'menuitem'
			},
			{
				name: 'menuitemcheckbox'
			},
			{
				name: 'menuitemradio'
			},
			{
				name: 'option'
			},
			{
				name: 'progressbar'
			},
			{
				name: 'radio'
			},
			{
				name: 'scrollbar'
			},
			{
				name: 'searchbox'
			},
			{
				name: 'slider'
			},
			{
				name: 'spinbutton'
			},
			{
				name: 'status'
			},
			{
				name: 'switch'
			},
			{
				name: 'tab'
			},
			{
				name: 'tabpanel'
			},
			{
				name: 'textbox'
			},
			{
				name: 'timer'
			},
			{
				name: 'tooltip'
			},
			{
				name: 'treeitem'
			},
			{
				name: 'combobox'
			},
			{
				name: 'grid'
			},
			{
				name: 'listbox'
			},
			{
				name: 'menu'
			},
			{
				name: 'menubar'
			},
			{
				name: 'radiogroup'
			},
			{
				name: 'tablist'
			},
			{
				name: 'tree'
			},
			{
				name: 'treegrid'
			},
			{
				name: 'application'
			},
			{
				name: 'article'
			},
			{
				name: 'cell'
			},
			{
				name: 'columnheader'
			},
			{
				name: 'definition'
			},
			{
				name: 'directory'
			},
			{
				name: 'document'
			},
			{
				name: 'feed'
			},
			{
				name: 'figure'
			},
			{
				name: 'group'
			},
			{
				name: 'heading'
			},
			{
				name: 'img'
			},
			{
				name: 'list'
			},
			{
				name: 'listitem'
			},
			{
				name: 'math'
			},
			{
				name: 'none'
			},
			{
				name: 'note'
			},
			{
				name: 'presentation'
			},
			{
				name: 'region'
			},
			{
				name: 'row'
			},
			{
				name: 'rowgroup'
			},
			{
				name: 'rowheader'
			},
			{
				name: 'separator'
			},
			{
				name: 'table'
			},
			{
				name: 'term'
			},
			{
				name: 'text'
			},
			{
				name: 'toolbar'
			},
			{
				name: 'banner'
			},
			{
				name: 'complementary'
			},
			{
				name: 'contentinfo'
			},
			{
				name: 'form'
			},
			{
				name: 'main'
			},
			{
				name: 'navigation'
			},
			{
				name: 'region'
			},
			{
				name: 'search'
			},
			{
				name: 'doc-abstract'
			},
			{
				name: 'doc-acknowledgments'
			},
			{
				name: 'doc-afterword'
			},
			{
				name: 'doc-appendix'
			},
			{
				name: 'doc-backlink'
			},
			{
				name: 'doc-biblioentry'
			},
			{
				name: 'doc-bibliography'
			},
			{
				name: 'doc-biblioref'
			},
			{
				name: 'doc-chapter'
			},
			{
				name: 'doc-colophon'
			},
			{
				name: 'doc-conclusion'
			},
			{
				name: 'doc-cover'
			},
			{
				name: 'doc-credit'
			},
			{
				name: 'doc-credits'
			},
			{
				name: 'doc-dedication'
			},
			{
				name: 'doc-endnote'
			},
			{
				name: 'doc-endnotes'
			},
			{
				name: 'doc-epigraph'
			},
			{
				name: 'doc-epilogue'
			},
			{
				name: 'doc-errata'
			},
			{
				name: 'doc-example'
			},
			{
				name: 'doc-footnote'
			},
			{
				name: 'doc-foreword'
			},
			{
				name: 'doc-glossary'
			},
			{
				name: 'doc-glossref'
			},
			{
				name: 'doc-index'
			},
			{
				name: 'doc-introduction'
			},
			{
				name: 'doc-noteref'
			},
			{
				name: 'doc-notice'
			},
			{
				name: 'doc-pagebreak'
			},
			{
				name: 'doc-pagelist'
			},
			{
				name: 'doc-part'
			},
			{
				name: 'doc-preface'
			},
			{
				name: 'doc-prologue'
			},
			{
				name: 'doc-pullquote'
			},
			{
				name: 'doc-qna'
			},
			{
				name: 'doc-subtitle'
			},
			{
				name: 'doc-tip'
			},
			{
				name: 'doc-toc'
			}
		]
	},
	{
		name: 'metanames',
		values: [
			{
				name: 'application-name'
			},
			{
				name: 'author'
			},
			{
				name: 'description'
			},
			{
				name: 'format-detection'
			},
			{
				name: 'generator'
			},
			{
				name: 'keywords'
			},
			{
				name: 'publisher'
			},
			{
				name: 'referrer'
			},
			{
				name: 'robots'
			},
			{
				name: 'theme-color'
			},
			{
				name: 'viewport'
			}
		]
	}
];
