/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { ITagData } from '../../htmlLanguageTypes';

export const HTML5_TAGS: ITagData[] = [
  {
    "name": "html",
    "description": "The html element represents the root of an HTML document.",
    "attributes": [
      {
        "name": "manifest",
        "description": "Specifies the URI of a resource manifest indicating resources that should be cached locally. See [Using the application cache](/en-US/docs/Web/HTML/Using_the_application_cache) for details."
      }
    ]
  },
  {
    "name": "head",
    "description": "The head element represents a collection of metadata for the Document.",
    "attributes": []
  },
  {
    "name": "title",
    "description": "The title element represents the document's title or name. Authors should use titles that identify their documents even when they are used out of context, for example in a user's history or bookmarks, or in search results. The document's title is often different from its first heading, since the first heading does not have to stand alone when taken out of context.",
    "attributes": []
  },
  {
    "name": "base",
    "description": "The base element allows authors to specify the document base URL for the purposes of resolving relative URLs, and the name of the default browsing context for the purposes of following hyperlinks. The element does not represent any content beyond this information.",
    "attributes": [
      {
        "name": "href",
        "description": "The base URL to be used throughout the document for relative URL addresses. If this attribute is specified, this element must come before any other elements with attributes whose values are URLs. Absolute and relative URLs are allowed."
      },
      {
        "name": "target",
        "description": "A name or keyword indicating the default location to display the result when hyperlinks or forms cause navigation, for elements that do not have an explicit target reference. It is a name of, or keyword for, a _browsing context_ (for example: tab, window, or inline frame). The following keywords have special meanings:\n\n*   `_self`: Load the result into the same browsing context as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the result into a new unnamed browsing context.\n*   `_parent`: Load the result into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: Load the result into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.\n\nIf this attribute is specified, this element must come before any other elements with attributes whose values are URLs."
      }
    ]
  },
  {
    "name": "link",
    "description": "The link element allows authors to link their document to other resources.",
    "attributes": [
      {
        "name": "href",
        "description": "This attribute specifies the [URL](/en-US/docs/Glossary/URL \"URL: Uniform Resource Locator (URL) is a text string specifying where a resource can be found on the Internet.\") of the linked resource. A URL can be absolute or relative."
      },
      {
        "name": "crossorigin",
        "valueSet": "xo",
        "description": "This enumerated attribute indicates whether [CORS](/en-US/docs/Glossary/CORS \"CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.\") must be used when fetching the resource. [CORS-enabled images](/en-US/docs/Web/HTML/CORS_Enabled_Image) can be reused in the [`<canvas>`](/en-US/docs/Web/HTML/Element/canvas \"Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.\") element without being _tainted_. The allowed values are:\n\n`anonymous`\n\nA cross-origin request (i.e. with an [`Origin`](/en-US/docs/Web/HTTP/Headers/Origin \"The Origin request header indicates where a fetch originates from. It doesn't include any path information, but only the server name. It is sent with CORS requests, as well as with POST requests. It is similar to the Referer header, but, unlike this header, it doesn't disclose the whole path.\") HTTP header) is performed, but no credential is sent (i.e. no cookie, X.509 certificate, or HTTP Basic authentication). If the server does not give credentials to the origin site (by not setting the [`Access-Control-Allow-Origin`](/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin \"The Access-Control-Allow-Origin response header indicates whether the response can be shared with requesting code from the given origin.\") HTTP header) the image will be tainted and its usage restricted.\n\n`use-credentials`\n\nA cross-origin request (i.e. with an `Origin` HTTP header) is performed along with a credential sent (i.e. a cookie, certificate, and/or HTTP Basic authentication is performed). If the server does not give credentials to the origin site (through [`Access-Control-Allow-Credentials`](/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials \"The Access-Control-Allow-Credentials response header tells browsers whether to expose the response to frontend JavaScript code when the request's credentials mode (Request.credentials) is \"include\".\") HTTP header), the resource will be _tainted_ and its usage restricted.\n\nIf the attribute is not present, the resource is fetched without a [CORS](/en-US/docs/Glossary/CORS \"CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.\") request (i.e. without sending the `Origin` HTTP header), preventing its non-tainted usage. If invalid, it is handled as if the enumerated keyword **anonymous** was used. See [CORS settings attributes](/en-US/docs/Web/HTML/CORS_settings_attributes) for additional information."
      },
      {
        "name": "rel",
        "description": "This attribute names a relationship of the linked document to the current document. The attribute must be a space-separated list of the [link types values](/en-US/docs/Web/HTML/Link_types)."
      },
      {
        "name": "media",
        "description": "This attribute specifies the media that the linked resource applies to. Its value must be a media type / [media query](/en-US/docs/Web/CSS/Media_queries). This attribute is mainly useful when linking to external stylesheets — it allows the user agent to pick the best adapted one for the device it runs on.\n\n**Notes:**\n\n*   In HTML 4, this can only be a simple white-space-separated list of media description literals, i.e., [media types and groups](/en-US/docs/Web/CSS/@media), where defined and allowed as values for this attribute, such as `print`, `screen`, `aural`, `braille`. HTML5 extended this to any kind of [media queries](/en-US/docs/Web/CSS/Media_queries), which are a superset of the allowed values of HTML 4.\n*   Browsers not supporting [CSS3 Media Queries](/en-US/docs/Web/CSS/Media_queries) won't necessarily recognize the adequate link; do not forget to set fallback links, the restricted set of media queries defined in HTML 4."
      },
      {
        "name": "hreflang",
        "description": "This attribute indicates the language of the linked resource. It is purely advisory. Allowed values are determined by [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt). Use this attribute only if the `[href](/en-US/docs/Web/HTML/Element/a#attr-href)` attribute is present."
      },
      {
        "name": "type",
        "description": "This attribute is used to define the type of the content linked to. The value of the attribute should be a MIME type such as **text/html**, **text/css**, and so on. The common use of this attribute is to define the type of stylesheet being referenced (such as **text/css**), but given that CSS is the only stylesheet language used on the web, not only is it possible to omit the `type` attribute, but is actually now recommended practice. It is also used on `rel=\"preload\"` link types, to make sure the browser only downloads file types that it supports."
      },
      {
        "name": "sizes",
        "description": "This attribute defines the sizes of the icons for visual media contained in the resource. It must be present only if the `[rel](/en-US/docs/Web/HTML/Element/link#attr-rel)` contains a value of `icon` or a non-standard type such as Apple's `apple-touch-icon`. It may have the following values:\n\n*   `any`, meaning that the icon can be scaled to any size as it is in a vector format, like `image/svg+xml`.\n*   a white-space separated list of sizes, each in the format `_<width in pixels>_x_<height in pixels>_` or `_<width in pixels>_X_<height in pixels>_`. Each of these sizes must be contained in the resource.\n\n**Note:** Most icon formats are only able to store one single icon; therefore most of the time the `[sizes](/en-US/docs/Web/HTML/Global_attributes#attr-sizes)` contains only one entry. MS's ICO format does, as well as Apple's ICNS. ICO is more ubiquitous; you should definitely use it."
      }
    ]
  },
  {
    "name": "meta",
    "description": "The meta element represents various kinds of metadata that cannot be expressed using the title, base, link, style, and script elements.",
    "attributes": [
      {
        "name": "name",
        "description": "This attribute defines the name of a piece of document-level metadata. It should not be set if one of the attributes `[itemprop](/en-US/docs/Web/HTML/Global_attributes#attr-itemprop)`, `[http-equiv](/en-US/docs/Web/HTML/Element/meta#attr-http-equiv)` or `[charset](/en-US/docs/Web/HTML/Element/meta#attr-charset)` is also set.\n\nThis metadata name is associated with the value contained by the `[content](/en-US/docs/Web/HTML/Element/meta#attr-content)` attribute. The possible values for the name attribute are:\n\n*   `application-name` which defines the name of the application running in the web page.\n    \n    **Note:**\n    \n    *   Browsers may use this to identify the application. It is different from the [`<title>`](/en-US/docs/Web/HTML/Element/title \"The HTML Title element (<title>) defines the document's title that is shown in a browser's title bar or a page's tab.\") element, which usually contain the application name, but may also contain information like the document name or a status.\n    *   Simple web pages shouldn't define an application-name.\n    \n*   `author` which defines the name of the document's author.\n*   `description` which contains a short and accurate summary of the content of the page. Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages.\n*   `generator` which contains the identifier of the software that generated the page.\n*   `keywords` which contains words relevant to the page's content separated by commas.\n*   `referrer` which controls the [`Referer` HTTP header](/en-US/docs/Web/HTTP/Headers/Referer) attached to requests sent from the document:\n    \n    Values for the `content` attribute of `<meta name=\"referrer\">`\n    \n    `no-referrer`\n    \n    Do not send a HTTP `Referrer` header.\n    \n    `origin`\n    \n    Send the [origin](/en-US/docs/Glossary/Origin) of the document.\n    \n    `no-referrer-when-downgrade`\n    \n    Send the [origin](/en-US/docs/Glossary/Origin) as a referrer to URLs as secure as the current page, (https→https), but does not send a referrer to less secure URLs (https→http). This is the default behaviour.\n    \n    `origin-when-cross-origin`\n    \n    Send the full URL (stripped of parameters) for same-origin requests, but only send the [origin](/en-US/docs/Glossary/Origin) for other cases.\n    \n    `same-origin`\n    \n    A referrer will be sent for [same-site origins](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy), but cross-origin requests will contain no referrer information.\n    \n    `strict-origin`\n    \n    Only send the origin of the document as the referrer to a-priori as-much-secure destination (HTTPS->HTTPS), but don't send it to a less secure destination (HTTPS->HTTP).\n    \n    `strict-origin-when-cross-origin`\n    \n    Send a full URL when performing a same-origin request, only send the origin of the document to a-priori as-much-secure destination (HTTPS->HTTPS), and send no header to a less secure destination (HTTPS->HTTP).\n    \n    `unsafe-URL`\n    \n    Send the full URL (stripped of parameters) for same-origin or cross-origin requests.\n    \n    **Notes:**\n    \n    *   Some browsers support the deprecated values of `always`, `default`, and `never` for referrer.\n    *   Dynamically inserting `<meta name=\"referrer\">` (with [`document.write`](/en-US/docs/Web/API/Document/write) or [`appendChild`](/en-US/docs/Web/API/Node/appendChild)) makes the referrer behaviour unpredictable.\n    *   When several conflicting policies are defined, the no-referrer policy is applied.\n    \n\nThis attribute may also have a value taken from the extended list defined on [WHATWG Wiki MetaExtensions page](https://wiki.whatwg.org/wiki/MetaExtensions). Although none have been formally accepted yet, a few commonly used names are:\n\n*   `creator` which defines the name of the creator of the document, such as an organization or institution. If there are more than one, several [`<meta>`](/en-US/docs/Web/HTML/Element/meta \"The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.\") elements should be used.\n*   `googlebot`, a synonym of `robots`, is only followed by Googlebot (the indexing crawler for Google).\n*   `publisher` which defines the name of the document's publisher.\n*   `robots` which defines the behaviour that cooperative crawlers, or \"robots\", should use with the page. It is a comma-separated list of the values below:\n    \n    Values for the content of `<meta name=\"robots\">`\n    \n    Value\n    \n    Description\n    \n    Used by\n    \n    `index`\n    \n    Allows the robot to index the page (default).\n    \n    All\n    \n    `noindex`\n    \n    Requests the robot to not index the page.\n    \n    All\n    \n    `follow`\n    \n    Allows the robot to follow the links on the page (default).\n    \n    All\n    \n    `nofollow`\n    \n    Requests the robot to not follow the links on the page.\n    \n    All\n    \n    `none`\n    \n    Equivalent to `noindex, nofollow`\n    \n    [Google](https://support.google.com/webmasters/answer/79812)\n    \n    `noodp`\n    \n    Prevents using the [Open Directory Project](https://www.dmoz.org/) description, if any, as the page description in search engine results.\n    \n    [Google](https://support.google.com/webmasters/answer/35624#nodmoz), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/meta-tags-robotstxt-yahoo-search-sln2213.html#cont5), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    `noarchive`\n    \n    Requests the search engine not to cache the page content.\n    \n    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/SLN2213.html), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    `nosnippet`\n    \n    Prevents displaying any description of the page in search engine results.\n    \n    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    `noimageindex`\n    \n    Requests this page not to appear as the referring page of an indexed image.\n    \n    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives)\n    \n    `nocache`\n    \n    Synonym of `noarchive`.\n    \n    [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    **Notes:**\n    \n    *   Only cooperative robots follow these rules. Do not expect to prevent e-mail harvesters with them.\n    *   The robot still needs to access the page in order to read these rules. To prevent bandwidth consumption, use a _[robots.txt](/en-US/docs/Glossary/robots.txt \"robots.txt: Robots.txt is a file which is usually placed in the root of any website. It decides whether crawlers are permitted or forbidden access to the web site.\")_ file.\n    *   If you want to remove a page, `noindex` will work, but only after the robot visits the page again. Ensure that the `robots.txt` file is not preventing revisits.\n    *   Some values are mutually exclusive, like `index` and `noindex`, or `follow` and `nofollow`. In these cases the robot's behaviour is undefined and may vary between them.\n    *   Some crawler robots, like Google, Yahoo and Bing, support the same values for the HTTP header `X-Robots-Tag`; this allows non-HTML documents like images to use these rules.\n    \n*   `slurp`, is a synonym of `robots`, but only for Slurp - the crawler for Yahoo Search.\n*   `viewport`, which gives hints about the size of the initial size of the [viewport](/en-US/docs/Glossary/viewport \"viewport: A viewport represents a polygonal (normally rectangular) area in computer graphics that is currently being viewed. In web browser terms, it refers to the part of the document you're viewing which is currently visible in its window (or the screen, if the document is being viewed in full screen mode). Content outside the viewport is not visible onscreen until scrolled into view.\"). Used by mobile devices only.\n    \n    Values for the content of `<meta name=\"viewport\">`\n    \n    Value\n    \n    Possible subvalues\n    \n    Description\n    \n    `width`\n    \n    A positive integer number, or the text `device-width`\n    \n    Defines the pixel width of the viewport that you want the web site to be rendered at.\n    \n    `height`\n    \n    A positive integer, or the text `device-height`\n    \n    Defines the height of the viewport. Not used by any browser.\n    \n    `initial-scale`\n    \n    A positive number between `0.0` and `10.0`\n    \n    Defines the ratio between the device width (`device-width` in portrait mode or `device-height` in landscape mode) and the viewport size.\n    \n    `maximum-scale`\n    \n    A positive number between `0.0` and `10.0`\n    \n    Defines the maximum amount to zoom in. It must be greater or equal to the `minimum-scale` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.\n    \n    `minimum-scale`\n    \n    A positive number between `0.0` and `10.0`\n    \n    Defines the minimum zoom level. It must be smaller or equal to the `maximum-scale` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.\n    \n    `user-scalable`\n    \n    `yes` or `no`\n    \n    If set to `no`, the user is not able to zoom in the webpage. The default is `yes`. Browser settings can ignore this rule, and iOS10+ ignores it by default.\n    \n    Specification\n    \n    Status\n    \n    Comment\n    \n    [CSS Device Adaptation  \n    The definition of '<meta name=\"viewport\">' in that specification.](https://drafts.csswg.org/css-device-adapt/#viewport-meta)\n    \n    Working Draft\n    \n    Non-normatively describes the Viewport META element\n    \n    See also: [`@viewport`](/en-US/docs/Web/CSS/@viewport \"The @viewport CSS at-rule lets you configure the viewport through which the document is viewed. It's primarily used for mobile devices, but is also used by desktop browsers that support features like \"snap to edge\" (such as Microsoft Edge).\")\n    \n    **Notes:**\n    \n    *   Though unstandardized, this declaration is respected by most mobile browsers due to de-facto dominance.\n    *   The default values may vary between devices and browsers.\n    *   To learn about this declaration in Firefox for Mobile, see [this article](/en-US/docs/Mobile/Viewport_meta_tag \"Mobile/Viewport meta tag\")."
      },
      {
        "name": "http-equiv",
        "description": "Defines a pragma directive. The attribute is named `**http-equiv**(alent)` because all the allowed values are names of particular HTTP headers:\n\n*   `\"content-language\"`  \n    Defines the default language of the page. It can be overridden by the [lang](/en-US/docs/Web/HTML/Global_attributes/lang) attribute on any element.\n    \n    **Warning:** Do not use this value, as it is obsolete. Prefer the `lang` attribute on the [`<html>`](/en-US/docs/Web/HTML/Element/html \"The HTML <html> element represents the root (top-level element) of an HTML document, so it is also referred to as the root element. All other elements must be descendants of this element.\") element.\n    \n*   `\"content-security-policy\"`  \n    Allows page authors to define a [content policy](/en-US/docs/Web/Security/CSP/CSP_policy_directives) for the current page. Content policies mostly specify allowed server origins and script endpoints which help guard against cross-site scripting attacks.\n*   `\"content-type\"`  \n    Defines the [MIME type](/en-US/docs/Glossary/MIME_type) of the document, followed by its character encoding. It follows the same syntax as the HTTP `content-type` entity-header field, but as it is inside a HTML page, most values other than `text/html` are impossible. Therefore the valid syntax for its `content` is the string '`text/html`' followed by a character set with the following syntax: '`; charset=_IANAcharset_`', where `IANAcharset` is the _preferred MIME name_ for a character set as [defined by the IANA.](https://www.iana.org/assignments/character-sets)\n    \n    **Warning:** Do not use this value, as it is obsolete. Use the `[charset](/en-US/docs/Web/HTML/Element/meta#attr-charset)` attribute on the [`<meta>`](/en-US/docs/Web/HTML/Element/meta \"The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.\") element.\n    \n    **Note:** As [`<meta>`](/en-US/docs/Web/HTML/Element/meta \"The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.\") can't change documents' types in XHTML or HTML5's XHTML serialization, never set the MIME type to an XHTML MIME type with `<meta>`.\n    \n*   `\"refresh\"`  \n    This instruction specifies:\n    *   The number of seconds until the page should be reloaded - only if the `[content](/en-US/docs/Web/HTML/Element/meta#attr-content)` attribute contains a positive integer.\n    *   The number of seconds until the page should redirect to another - only if the `[content](/en-US/docs/Web/HTML/Element/meta#attr-content)` attribute contains a positive integer followed by the string '`;url=`', and a valid URL.\n*   `\"set-cookie\"`  \n    Defines a [cookie](/en-US/docs/cookie) for the page. Its content must follow the syntax defined in the [IETF HTTP Cookie Specification](https://tools.ietf.org/html/draft-ietf-httpstate-cookie-14).\n    \n    **Warning:** Do not use this instruction, as it is obsolete. Use the HTTP header [`Set-Cookie`](/en-US/docs/Web/HTTP/Headers/Set-Cookie) instead."
      },
      {
        "name": "content",
        "description": "This attribute contains the value for the `[http-equiv](/en-US/docs/Web/HTML/Element/meta#attr-http-equiv)` or `[name](/en-US/docs/Web/HTML/Element/meta#attr-name)` attribute, depending on which is used."
      },
      {
        "name": "charset",
        "description": "This attribute declares the page's character encoding. It must contain a [standard IANA MIME name for character encodings](https://www.iana.org/assignments/character-sets). Although the standard doesn't request a specific encoding, it suggests:\n\n*   Authors are encouraged to use [`UTF-8`](/en-US/docs/Glossary/UTF-8).\n*   Authors should not use ASCII-incompatible encodings to avoid security risk: browsers not supporting them may interpret harmful content as HTML. This happens with the `JIS_C6226-1983`, `JIS_X0212-1990`, `HZ-GB-2312`, `JOHAB`, the ISO-2022 family and the EBCDIC family.\n\n**Note:** ASCII-incompatible encodings are those that don't map the 8-bit code points `0x20` to `0x7E` to the `0x0020` to `0x007E` Unicode code points)\n\n*   Authors **must not** use `CESU-8`, `UTF-7`, `BOCU-1` and/or `SCSU` as [cross-site scripting](/en-US/docs/Glossary/Cross-site_scripting) attacks with these encodings have been demonstrated.\n*   Authors should not use `UTF-32` because not all HTML5 encoding algorithms can distinguish it from `UTF-16`.\n\n**Notes:**\n\n*   The declared character encoding must match the one the page was saved with to avoid garbled characters and security holes.\n*   The [`<meta>`](/en-US/docs/Web/HTML/Element/meta \"The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.\") element declaring the encoding must be inside the [`<head>`](/en-US/docs/Web/HTML/Element/head \"The HTML <head> element provides general information (metadata) about the document, including its title and links to its scripts and style sheets.\") element and **within the first 1024 bytes** of the HTML as some browsers only look at those bytes before choosing an encoding.\n*   This [`<meta>`](/en-US/docs/Web/HTML/Element/meta \"The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.\") element is only one part of the [algorithm to determine a page's character set](https://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html#encoding-sniffing-algorithm \"Algorithm charset page\"). The [`Content-Type` header](/en-US/docs/Web/HTTP/Headers/Content-Type) and any [Byte-Order Marks](/en-US/docs/Glossary/Byte-Order_Mark \"The definition of that term (Byte-Order Marks) has not been written yet; please consider contributing it!\") override this element.\n*   It is strongly recommended to define the character encoding. If a page's encoding is undefined, cross-scripting techniques are possible, such as the [`UTF-7` fallback cross-scripting technique](https://code.google.com/p/doctype-mirror/wiki/ArticleUtf7).\n*   The [`<meta>`](/en-US/docs/Web/HTML/Element/meta \"The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.\") element with a `charset` attribute is a synonym for the pre-HTML5 `<meta http-equiv=\"Content-Type\" content=\"text/html; charset=_IANAcharset_\">`, where _`IANAcharset`_ contains the value of the equivalent `[charset](/en-US/docs/Web/HTML/Element/meta#attr-charset)` attribute. This syntax is still allowed, although no longer recommended."
      }
    ]
  },
  {
    "name": "style",
    "description": "The style element allows authors to embed style information in their documents. The style element is one of several inputs to the styling processing model. The element does not represent content for the user.",
    "attributes": [
      {
        "name": "media",
        "description": "This attribute defines which media the style should be applied to. Its value is a [media query](/en-US/docs/Web/Guide/CSS/Media_queries), which defaults to `all` if the attribute is missing."
      },
      {
        "name": "nonce",
        "description": "A cryptographic nonce (number used once) used to whitelist inline styles in a [style-src Content-Security-Policy](/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src). The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource’s policy is otherwise trivial."
      },
      {
        "name": "type",
        "description": "This attribute defines the styling language as a MIME type (charset should not be specified). This attribute is optional and defaults to `text/css` if it is not specified — there is very little reason to include this in modern web documents."
      },
      {
        "name": "scoped",
        "valueSet": "v"
      }
    ]
  },
  {
    "name": "body",
    "description": "The body element represents the content of the document.",
    "attributes": [
      {
        "name": "onafterprint",
        "description": "Function to call after the user has printed the document."
      },
      {
        "name": "onbeforeprint",
        "description": "Function to call when the user requests printing of the document."
      },
      {
        "name": "onbeforeunload",
        "description": "Function to call when the document is about to be unloaded."
      },
      {
        "name": "onhashchange",
        "description": "Function to call when the fragment identifier part (starting with the hash (`'#'`) character) of the document's current address has changed."
      },
      {
        "name": "onlanguagechange",
        "description": "Function to call when the preferred languages changed."
      },
      {
        "name": "onmessage",
        "description": "Function to call when the document has received a message."
      },
      {
        "name": "onoffline",
        "description": "Function to call when network communication has failed."
      },
      {
        "name": "ononline",
        "description": "Function to call when network communication has been restored."
      },
      {
        "name": "onpagehide"
      },
      {
        "name": "onpageshow"
      },
      {
        "name": "onpopstate",
        "description": "Function to call when the user has navigated session history."
      },
      {
        "name": "onstorage",
        "description": "Function to call when the storage area has changed."
      },
      {
        "name": "onunload",
        "description": "Function to call when the document is going away."
      }
    ]
  },
  {
    "name": "article",
    "description": "The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content. Each article should be identified, typically by including a heading (h1–h6 element) as a child of the article element.",
    "attributes": []
  },
  {
    "name": "section",
    "description": "The section element represents a generic section of a document or application. A section, in this context, is a thematic grouping of content. Each section should be identified, typically by including a heading ( h1- h6 element) as a child of the section element.",
    "attributes": []
  },
  {
    "name": "nav",
    "description": "The nav element represents a section of a page that links to other pages or to parts within the page: a section with navigation links.",
    "attributes": []
  },
  {
    "name": "aside",
    "description": "The aside element represents a section of a page that consists of content that is tangentially related to the content around the aside element, and which could be considered separate from that content. Such sections are often represented as sidebars in printed typography.",
    "attributes": []
  },
  {
    "name": "h1",
    "description": "The h1 element represents a section heading.",
    "attributes": []
  },
  {
    "name": "h2",
    "description": "The h2 element represents a section heading.",
    "attributes": []
  },
  {
    "name": "h3",
    "description": "The h3 element represents a section heading.",
    "attributes": []
  },
  {
    "name": "h4",
    "description": "The h4 element represents a section heading.",
    "attributes": []
  },
  {
    "name": "h5",
    "description": "The h5 element represents a section heading.",
    "attributes": []
  },
  {
    "name": "h6",
    "description": "The h6 element represents a section heading.",
    "attributes": []
  },
  {
    "name": "header",
    "description": "The header element represents introductory content for its nearest ancestor sectioning content or sectioning root element. A header typically contains a group of introductory or navigational aids. When the nearest ancestor sectioning content or sectioning root element is the body element, then it applies to the whole page.",
    "attributes": []
  },
  {
    "name": "footer",
    "description": "The footer element represents a footer for its nearest ancestor sectioning content or sectioning root element. A footer typically contains information about its section such as who wrote it, links to related documents, copyright data, and the like.",
    "attributes": []
  },
  {
    "name": "address",
    "description": "The address element represents the contact information for its nearest article or body element ancestor. If that is the body element, then the contact information applies to the document as a whole.",
    "attributes": []
  },
  {
    "name": "p",
    "description": "The p element represents a paragraph.",
    "attributes": []
  },
  {
    "name": "hr",
    "description": "The hr element represents a paragraph-level thematic break, e.g. a scene change in a story, or a transition to another topic within a section of a reference book.",
    "attributes": []
  },
  {
    "name": "pre",
    "description": "The pre element represents a block of preformatted text, in which structure is represented by typographic conventions rather than by elements.",
    "attributes": []
  },
  {
    "name": "blockquote",
    "description": "The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a footer or cite element, and optionally with in-line changes such as annotations and abbreviations.",
    "attributes": [
      {
        "name": "cite",
        "description": "A URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote."
      }
    ]
  },
  {
    "name": "ol",
    "description": "The ol element represents a list of items, where the items have been intentionally ordered, such that changing the order would change the meaning of the document.",
    "attributes": [
      {
        "name": "reversed",
        "valueSet": "v",
        "description": "This Boolean attribute specifies that the items of the list are specified in reversed order."
      },
      {
        "name": "start",
        "description": "This integer attribute specifies the start value for numbering the individual list items. Although the ordering type of list elements might be Roman numerals, such as XXXI, or letters, the value of start is always represented as a number. To start numbering elements from the letter \"C\", use `<ol start=\"3\">`.\n\n**Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5."
      },
      {
        "name": "type",
        "valueSet": "lt",
        "description": "Indicates the numbering type:\n\n*   `'a'` indicates lowercase letters,\n*   `'A'` indicates uppercase letters,\n*   `'i'` indicates lowercase Roman numerals,\n*   `'I'` indicates uppercase Roman numerals,\n*   and `'1'` indicates numbers (default).\n\nThe type set is used for the entire list unless a different `[type](/en-US/docs/Web/HTML/Element/li#attr-type)` attribute is used within an enclosed [`<li>`](/en-US/docs/Web/HTML/Element/li \"The HTML <li> element is used to represent an item in a list. It must be contained in a parent element: an ordered list (<ol>), an unordered list (<ul>), or a menu (<menu>). In menus and unordered lists, list items are usually displayed using bullet points. In ordered lists, they are usually displayed with an ascending counter on the left, such as a number or letter.\") element.\n\n**Note:** This attribute was deprecated in HTML4, but reintroduced in HTML5.\n\nUnless the value of the list number matters (e.g. in legal or technical documents where items are to be referenced by their number/letter), the CSS [`list-style-type`](/en-US/docs/Web/CSS/list-style-type \"The list-style-type CSS property sets the marker (such as a disc, character, or custom counter style) of a list item element.\") property should be used instead."
      }
    ]
  },
  {
    "name": "ul",
    "description": "The ul element represents a list of items, where the order of the items is not important — that is, where changing the order would not materially change the meaning of the document.",
    "attributes": []
  },
  {
    "name": "li",
    "description": "The li element represents a list item. If its parent element is an ol, ul, or menu element, then the element is an item of the parent element's list, as defined for those elements. Otherwise, the list item has no defined list-related relationship to any other li element.",
    "attributes": [
      {
        "name": "value",
        "description": "This integer attribute indicates the current ordinal value of the list item as defined by the [`<ol>`](/en-US/docs/Web/HTML/Element/ol \"The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.\") element. The only allowed value for this attribute is a number, even if the list is displayed with Roman numerals or letters. List items that follow this one continue numbering from the value set. The **value** attribute has no meaning for unordered lists ([`<ul>`](/en-US/docs/Web/HTML/Element/ul \"The HTML <ul> element represents an unordered list of items, typically rendered as a bulleted list.\")) or for menus ([`<menu>`](/en-US/docs/Web/HTML/Element/menu \"The HTML <menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.\")).\n\n**Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5.\n\n**Note:** Prior to Gecko 9.0, negative values were incorrectly converted to 0. Starting in Gecko 9.0 all integer values are correctly parsed."
      }
    ]
  },
  {
    "name": "dl",
    "description": "The dl element represents an association list consisting of zero or more name-value groups (a description list). A name-value group consists of one or more names (dt elements) followed by one or more values (dd elements), ignoring any nodes other than dt and dd elements. Within a single dl element, there should not be more than one dt element for each name.",
    "attributes": []
  },
  {
    "name": "dt",
    "description": "The dt element represents the term, or name, part of a term-description group in a description list (dl element).",
    "attributes": []
  },
  {
    "name": "dd",
    "description": "The dd element represents the description, definition, or value, part of a term-description group in a description list (dl element).",
    "attributes": []
  },
  {
    "name": "figure",
    "description": "The figure element represents some flow content, optionally with a caption, that is self-contained (like a complete sentence) and is typically referenced as a single unit from the main flow of the document.",
    "attributes": []
  },
  {
    "name": "figcaption",
    "description": "The figcaption element represents a caption or legend for the rest of the contents of the figcaption element's parent figure element, if any.",
    "attributes": []
  },
  {
    "name": "main",
    "description": "The main element represents the main content of the body of a document or application. The main content area consists of content that is directly related to or expands upon the central topic of a document or central functionality of an application.",
    "attributes": []
  },
  {
    "name": "div",
    "description": "The div element has no special meaning at all. It represents its children. It can be used with the class, lang, and title attributes to mark up semantics common to a group of consecutive elements.",
    "attributes": []
  },
  {
    "name": "a",
    "description": "If the a element has an href attribute, then it represents a hyperlink (a hypertext anchor) labeled by its contents.",
    "attributes": [
      {
        "name": "href",
        "description": "Contains a URL or a URL fragment that the hyperlink points to."
      },
      {
        "name": "target",
        "description": "Specifies where to display the linked URL. It is a name of, or keyword for, a _browsing context_: a tab, window, or `<iframe>`. The following keywords have special meanings:\n\n*   `_self`: Load the URL into the same browsing context as the current one. This is the default behavior.\n*   `_blank`: Load the URL into a new browsing context. This is usually a tab, but users can configure browsers to use new windows instead.\n*   `_parent`: Load the URL into the parent browsing context of the current one. If there is no parent, this behaves the same way as `_self`.\n*   `_top`: Load the URL into the top-level browsing context (that is, the \"highest\" browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this behaves the same way as `_self`.\n\n**Note:** When using `target`, consider adding `rel=\"noreferrer\"` to avoid exploitation of the `window.opener` API.\n\n**Note:** Linking to another page using `target=\"_blank\"` will run the new page on the same process as your page. If the new page is executing expensive JS, your page's performance may suffer. To avoid this use `rel=\"noopener\"`."
      },
      {
        "name": "download",
        "description": "This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). There are no restrictions on allowed values, though `/` and `\\` are converted to underscores. Most file systems limit some punctuation in file names, and browsers will adjust the suggested name accordingly.\n\n**Notes:**\n\n*   This attribute only works for [same-origin URLs](/en-US/docs/Web/Security/Same-origin_policy).\n*   Although HTTP(s) URLs need to be in the same-origin, [`blob:` URLs](/en-US/docs/Web/API/URL.createObjectURL) and [`data:` URLs](/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) are allowed so that content generated by JavaScript, such as pictures created in an image-editor Web app, can be downloaded.\n*   If the HTTP header [`Content-Disposition:`](/en-US/docs/Web/HTTP/Headers/Content-Disposition) gives a different filename than this attribute, the HTTP header takes priority over this attribute.\n*   If `Content-Disposition:` is set to `inline`, Firefox prioritizes `Content-Disposition`, like the filename case, while Chrome prioritizes the `download` attribute."
      },
      {
        "name": "ping",
        "description": "Contains a space-separated list of URLs to which, when the hyperlink is followed, [`POST`](/en-US/docs/Web/HTTP/Methods/POST \"The HTTP POST method sends data to the server. The type of the body of the request is indicated by the Content-Type header.\") requests with the body `PING` will be sent by the browser (in the background). Typically used for tracking."
      },
      {
        "name": "rel",
        "description": "Specifies the relationship of the target object to the link object. The value is a space-separated list of [link types](/en-US/docs/Web/HTML/Link_types)."
      },
      {
        "name": "hreflang",
        "description": "This attribute indicates the human language of the linked resource. It is purely advisory, with no built-in functionality. Allowed values are determined by [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt \"Tags for Identifying Languages\")."
      },
      {
        "name": "type",
        "description": "Specifies the media type in the form of a [MIME type](/en-US/docs/Glossary/MIME_type \"MIME type: A MIME type (now properly called \"media type\", but also sometimes \"content type\") is a string sent along with a file indicating the type of the file (describing the content format, for example, a sound file might be labeled audio/ogg, or an image file image/png).\") for the linked URL. It is purely advisory, with no built-in functionality."
      }
    ]
  },
  {
    "name": "em",
    "description": "The em element represents stress emphasis of its contents.",
    "attributes": []
  },
  {
    "name": "strong",
    "description": "The strong element represents strong importance, seriousness, or urgency for its contents.",
    "attributes": []
  },
  {
    "name": "small",
    "description": "The small element represents side comments such as small print.",
    "attributes": []
  },
  {
    "name": "s",
    "description": "The s element represents contents that are no longer accurate or no longer relevant.",
    "attributes": []
  },
  {
    "name": "cite",
    "description": "The cite element represents a reference to a creative work. It must include the title of the work or the name of the author(person, people or organization) or an URL reference, or a reference in abbreviated form as per the conventions used for the addition of citation metadata.",
    "attributes": []
  },
  {
    "name": "q",
    "description": "The q element represents some phrasing content quoted from another source.",
    "attributes": [
      {
        "name": "cite",
        "description": "The value of this attribute is a URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote."
      }
    ]
  },
  {
    "name": "dfn",
    "description": "The dfn element represents the defining instance of a term. The paragraph, description list group, or section that is the nearest ancestor of the dfn element must also contain the definition(s) for the term given by the dfn element.",
    "attributes": []
  },
  {
    "name": "abbr",
    "description": "The abbr element represents an abbreviation or acronym, optionally with its expansion. The title attribute may be used to provide an expansion of the abbreviation. The attribute, if specified, must contain an expansion of the abbreviation, and nothing else.",
    "attributes": []
  },
  {
    "name": "ruby",
    "description": "The ruby element allows one or more spans of phrasing content to be marked with ruby annotations. Ruby annotations are short runs of text presented alongside base text, primarily used in East Asian typography as a guide for pronunciation or to include other annotations. In Japanese, this form of typography is also known as furigana. Ruby text can appear on either side, and sometimes both sides, of the base text, and it is possible to control its position using CSS. A more complete introduction to ruby can be found in the Use Cases & Exploratory Approaches for Ruby Markup document as well as in CSS Ruby Module Level 1. [RUBY-UC] [CSSRUBY]",
    "attributes": []
  },
  {
    "name": "rb",
    "description": "The rb element marks the base text component of a ruby annotation. When it is the child of a ruby element, it doesn't represent anything itself, but its parent ruby element uses it as part of determining what it represents.",
    "attributes": []
  },
  {
    "name": "rt",
    "description": "The rt element marks the ruby text component of a ruby annotation. When it is the child of a ruby element or of an rtc element that is itself the child of a ruby element, it doesn't represent anything itself, but its ancestor ruby element uses it as part of determining what it represents.",
    "attributes": []
  },
  {
    "name": "rp",
    "description": "The rp element is used to provide fallback text to be shown by user agents that don't support ruby annotations. One widespread convention is to provide parentheses around the ruby text component of a ruby annotation.",
    "attributes": []
  },
  {
    "name": "time",
    "description": "The time element represents its contents, along with a machine-readable form of those contents in the datetime attribute. The kind of content is limited to various kinds of dates, times, time-zone offsets, and durations, as described below.",
    "attributes": [
      {
        "name": "datetime",
        "description": "This attribute indicates the time and/or date of the element and must be in one of the formats described below."
      }
    ]
  },
  {
    "name": "code",
    "description": "The code element represents a fragment of computer code. This could be an XML element name, a file name, a computer program, or any other string that a computer would recognize.",
    "attributes": []
  },
  {
    "name": "var",
    "description": "The var element represents a variable. This could be an actual variable in a mathematical expression or programming context, an identifier representing a constant, a symbol identifying a physical quantity, a function parameter, or just be a term used as a placeholder in prose.",
    "attributes": []
  },
  {
    "name": "samp",
    "description": "The samp element represents sample or quoted output from another program or computing system.",
    "attributes": []
  },
  {
    "name": "kbd",
    "description": "The kbd element represents user input (typically keyboard input, although it may also be used to represent other input, such as voice commands).",
    "attributes": []
  },
  {
    "name": "sub",
    "description": "The sub element represents a subscript.",
    "attributes": []
  },
  {
    "name": "sup",
    "description": "The sup element represents a superscript.",
    "attributes": []
  },
  {
    "name": "i",
    "description": "The i element represents a span of text in an alternate voice or mood, or otherwise offset from the normal prose in a manner indicating a different quality of text, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, transliteration, a thought, or a ship name in Western texts.",
    "attributes": []
  },
  {
    "name": "b",
    "description": "The b element represents a span of text to which attention is being drawn for utilitarian purposes without conveying any extra importance and with no implication of an alternate voice or mood, such as key words in a document abstract, product names in a review, actionable words in interactive text-driven software, or an article lede.",
    "attributes": []
  },
  {
    "name": "u",
    "description": "The u element represents a span of text with an unarticulated, though explicitly rendered, non-textual annotation, such as labeling the text as being a proper name in Chinese text (a Chinese proper name mark), or labeling the text as being misspelt.",
    "attributes": []
  },
  {
    "name": "mark",
    "description": "The mark element represents a run of text in one document marked or highlighted for reference purposes, due to its relevance in another context. When used in a quotation or other block of text referred to from the prose, it indicates a highlight that was not originally present but which has been added to bring the reader's attention to a part of the text that might not have been considered important by the original author when the block was originally written, but which is now under previously unexpected scrutiny. When used in the main prose of a document, it indicates a part of the document that has been highlighted due to its likely relevance to the user's current activity.",
    "attributes": []
  },
  {
    "name": "bdi",
    "description": "The bdi element represents a span of text that is to be isolated from its surroundings for the purposes of bidirectional text formatting. [BIDI]",
    "attributes": []
  },
  {
    "name": "bdo",
    "description": "The bdo element represents explicit text directionality formatting control for its children. It allows authors to override the Unicode bidirectional algorithm by explicitly specifying a direction override. [BIDI]",
    "attributes": []
  },
  {
    "name": "span",
    "description": "The span element doesn't mean anything on its own, but can be useful when used together with the global attributes, e.g. class, lang, or dir. It represents its children.",
    "attributes": []
  },
  {
    "name": "br",
    "description": "The br element represents a line break.",
    "attributes": []
  },
  {
    "name": "wbr",
    "description": "The wbr element represents a line break opportunity.",
    "attributes": []
  },
  {
    "name": "ins",
    "description": "The ins element represents an addition to the document.",
    "attributes": []
  },
  {
    "name": "del",
    "description": "The del element represents a removal from the document.",
    "attributes": [
      {
        "name": "cite",
        "description": "A URI for a resource that explains the change (for example, meeting minutes)."
      },
      {
        "name": "datetime",
        "description": "This attribute indicates the time and date of the change and must be a valid date string with an optional time. If the value cannot be parsed as a date with an optional time string, the element does not have an associated time stamp. For the format of the string without a time, see [Format of a valid date string](/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_date_string \"Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.\") in [Date and time formats used in HTML](/en-US/docs/Web/HTML/Date_and_time_formats \"Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.\"). The format of the string if it includes both date and time is covered in [Format of a valid local date and time string](/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_local_date_and_time_string \"Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.\") in [Date and time formats used in HTML](/en-US/docs/Web/HTML/Date_and_time_formats \"Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.\")."
      }
    ]
  },
  {
    "name": "picture",
    "description": "The picture element is a container which provides multiple sources to its contained img element to allow authors to declaratively control or give hints to the user agent about which image resource to use, based on the screen pixel density, viewport size, image format, and other factors. It represents its children.",
    "attributes": []
  },
  {
    "name": "img",
    "description": "An img element represents an image.",
    "attributes": [
      {
        "name": "alt",
        "description": "This attribute defines an alternative text description of the image.\n\n**Note:** Browsers do not always display the image referenced by the element. This is the case for non-graphical browsers (including those used by people with visual impairments), if the user chooses not to display images, or if the browser cannot display the image because it is invalid or an [unsupported type](#Supported_image_formats). In these cases, the browser may replace the image with the text defined in this element's `alt` attribute. You should, for these reasons and others, provide a useful value for `alt` whenever possible.\n\n**Note:** Omitting this attribute altogether indicates that the image is a key part of the content, and no textual equivalent is available. Setting this attribute to an empty string (`alt=\"\"`) indicates that this image is _not_ a key part of the content (decorative), and that non-visual browsers may omit it from rendering."
      },
      {
        "name": "src",
        "description": "The image URL. This attribute is mandatory for the `<img>` element. On browsers supporting `srcset`, `src` is treated like a candidate image with a pixel density descriptor `1x` unless an image with this pixel density descriptor is already defined in `srcset,` or unless `srcset` contains '`w`' descriptors."
      },
      {
        "name": "srcset",
        "description": "A list of one or more strings separated by commas indicating a set of possible image sources for the user agent to use. Each string is composed of:\n\n1.  a URL to an image,\n2.  optionally, whitespace followed by one of:\n    *   A width descriptor, or a positive integer directly followed by '`w`'. The width descriptor is divided by the source size given in the `sizes` attribute to calculate the effective pixel density.\n    *   A pixel density descriptor, which is a positive floating point number directly followed by '`x`'.\n\nIf no descriptor is specified, the source is assigned the default descriptor: `1x`.\n\nIt is incorrect to mix width descriptors and pixel density descriptors in the same `srcset` attribute. Duplicate descriptors (for instance, two sources in the same `srcset` which are both described with '`2x`') are also invalid.\n\nThe user agent selects any one of the available sources at its discretion. This provides them with significant leeway to tailor their selection based on things like user preferences or bandwidth conditions. See our [Responsive images](/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) tutorial for an example."
      },
      {
        "name": "crossorigin",
        "valueSet": "xo",
        "description": "This enumerated attribute indicates if the fetching of the related image must be done using CORS or not. [CORS-enabled images](/en-US/docs/CORS_Enabled_Image) can be reused in the [`<canvas>`](/en-US/docs/Web/HTML/Element/canvas \"Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.\") element without being \"[tainted](/en-US/docs/Web/HTML/CORS_enabled_image#What_is_a_tainted_canvas).\" The allowed values are:"
      },
      {
        "name": "usemap",
        "description": "The partial URL (starting with '#') of an [image map](/en-US/docs/HTML/Element/map) associated with the element.\n\n**Note:** You cannot use this attribute if the `<img>` element is a descendant of an [`<a>`](/en-US/docs/Web/HTML/Element/a \"The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.\") or [`<button>`](/en-US/docs/Web/HTML/Element/button \"The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.\") element."
      },
      {
        "name": "ismap",
        "valueSet": "v",
        "description": "This Boolean attribute indicates that the image is part of a server-side map. If so, the precise coordinates of a click are sent to the server.\n\n**Note:** This attribute is allowed only if the `<img>` element is a descendant of an [`<a>`](/en-US/docs/Web/HTML/Element/a \"The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.\") element with a valid `[href](/en-US/docs/Web/HTML/Element/a#attr-href)` attribute."
      },
      {
        "name": "width",
        "description": "The intrinsic width of the image in pixels."
      },
      {
        "name": "height",
        "description": "The intrinsic height of the image in pixels."
      }
    ]
  },
  {
    "name": "iframe",
    "description": "The iframe element represents a nested browsing context.",
    "attributes": [
      {
        "name": "src",
        "description": "The URL of the page to embed. Use a value of `about:blank` to embed an empty page that conforms to the [same-origin policy](/en-US/docs/Web/Security/Same-origin_policy#Inherited_origins). Also note that programatically removing an `<iframe>`'s src attribute (e.g. via [`Element.removeAttribute()`](/en-US/docs/Web/API/Element/removeAttribute \"The Element method removeAttribute() removes the attribute with the specified name from the element.\")) causes `about:blank` to be loaded in the frame in Firefox (from version 65), Chromium-based browsers, and Safari/iOS."
      },
      {
        "name": "srcdoc",
        "description": "Inline HTML to embed, overriding the `src` attribute. If a browser does not support the `srcdoc` attribute, it will fall back to the URL in the `src` attribute."
      },
      {
        "name": "name",
        "description": "A targetable name for the embedded browsing context. This can be used in the `target` attribute of the [`<a>`](/en-US/docs/Web/HTML/Element/a \"The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.\"), [`<form>`](/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\"), or [`<base>`](/en-US/docs/Web/HTML/Element/base \"The HTML <base> element specifies the base URL to use for all relative URLs contained within a document. There can be only one <base> element in a document.\") elements; the `formtarget` attribute of the [`<input>`](/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") or [`<button>`](/en-US/docs/Web/HTML/Element/button \"The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.\") elements; or the `windowName` parameter in the [`window.open()`](/en-US/docs/Web/API/Window/open \"The Window interface's open() method loads the specified resource into the browsing context (window, <iframe> or tab) with the specified name. If the name doesn't exist, then a new window is opened and the specified resource is loaded into its browsing context.\") method."
      },
      {
        "name": "sandbox",
        "valueSet": "sb",
        "description": "Applies extra restrictions to the content in the frame. The value of the attribute can either be empty to apply all restrictions, or space-separated tokens to lift particular restrictions:\n\n*   `allow-forms`: Allows the resource to submit forms. If this keyword is not used, form submission is blocked.\n*   `allow-modals`: Lets the resource [open modal windows](https://html.spec.whatwg.org/multipage/origin.html#sandboxed-modals-flag).\n*   `allow-orientation-lock`: Lets the resource [lock the screen orientation](/en-US/docs/Web/API/Screen/lockOrientation).\n*   `allow-pointer-lock`: Lets the resource use the [Pointer Lock API](/en-US/docs/WebAPI/Pointer_Lock).\n*   `allow-popups`: Allows popups (such as `window.open()`, `target=\"_blank\"`, or `showModalDialog()`). If this keyword is not used, the popup will silently fail to open.\n*   `allow-popups-to-escape-sandbox`: Lets the sandboxed document open new windows without those windows inheriting the sandboxing. For example, this can safely sandbox an advertisement without forcing the same restrictions upon the page the ad links to.\n*   `allow-presentation`: Lets the resource start a [presentation session](/en-US/docs/Web/API/PresentationRequest).\n*   `allow-same-origin`: If this token is not used, the resource is treated as being from a special origin that always fails the [same-origin policy](/en-US/docs/Glossary/same-origin_policy \"same-origin policy: The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin.\").\n*   `allow-scripts`: Lets the resource run scripts (but not create popup windows).\n*   `allow-storage-access-by-user-activation` : Lets the resource request access to the parent's storage capabilities with the [Storage Access API](/en-US/docs/Web/API/Storage_Access_API).\n*   `allow-top-navigation`: Lets the resource navigate the top-level browsing context (the one named `_top`).\n*   `allow-top-navigation-by-user-activation`: Lets the resource navigate the top-level browsing context, but only if initiated by a user gesture.\n\n**Notes about sandboxing:**\n\n*   When the embedded document has the same origin as the embedding page, it is **strongly discouraged** to use both `allow-scripts` and `allow-same-origin`, as that lets the embedded document remove the `sandbox` attribute — making it no more secure than not using the `sandbox` attribute at all.\n*   Sandboxing is useless if the attacker can display content outside a sandboxed `iframe` — such as if the viewer opens the frame in a new tab. Such content should be also served from a _separate origin_ to limit potential damage.\n*   The `sandbox` attribute is unsupported in Internet Explorer 9 and earlier."
      },
      {
        "name": "seamless",
        "valueSet": "v"
      },
      {
        "name": "allowfullscreen",
        "valueSet": "v",
        "description": "Set to `true` if the `<iframe>` can activate fullscreen mode by calling the [`requestFullscreen()`](/en-US/docs/Web/API/Element/requestFullscreen \"The Element.requestFullscreen() method issues an asynchronous request to make the element be displayed in full-screen mode.\") method."
      },
      {
        "name": "width",
        "description": "The width of the frame in CSS pixels. Default is `300`."
      },
      {
        "name": "height",
        "description": "The height of the frame in CSS pixels. Default is `150`."
      }
    ]
  },
  {
    "name": "embed",
    "description": "The embed element provides an integration point for an external (typically non-HTML) application or interactive content.",
    "attributes": [
      {
        "name": "src",
        "description": "The URL of the resource being embedded."
      },
      {
        "name": "type",
        "description": "The MIME type to use to select the plug-in to instantiate."
      },
      {
        "name": "width",
        "description": "The displayed width of the resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). This must be an absolute value; percentages are _not_ allowed."
      },
      {
        "name": "height",
        "description": "The displayed height of the resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). This must be an absolute value; percentages are _not_ allowed."
      }
    ]
  },
  {
    "name": "object",
    "description": "The object element can represent an external resource, which, depending on the type of the resource, will either be treated as an image, as a nested browsing context, or as an external resource to be processed by a plugin.",
    "attributes": [
      {
        "name": "data",
        "description": "The address of the resource as a valid URL. At least one of **data** and **type** must be defined."
      },
      {
        "name": "type",
        "description": "The [content type](/en-US/docs/Glossary/Content_type) of the resource specified by **data**. At least one of **data** and **type** must be defined."
      },
      {
        "name": "typemustmatch",
        "valueSet": "v",
        "description": "This Boolean attribute indicates if the **type** attribute and the actual [content type](/en-US/docs/Glossary/Content_type) of the resource must match to be used."
      },
      {
        "name": "name",
        "description": "The name of valid browsing context (HTML5), or the name of the control (HTML 4)."
      },
      {
        "name": "usemap",
        "description": "A hash-name reference to a [`<map>`](/en-US/docs/Web/HTML/Element/map \"The HTML <map> element is used with <area> elements to define an image map (a clickable link area).\") element; that is a '#' followed by the value of a `[name](/en-US/docs/Web/HTML/Element/map#attr-name)` of a map element."
      },
      {
        "name": "form",
        "description": "The form element, if any, that the object element is associated with (its _form owner_). The value of the attribute must be an ID of a [`<form>`](/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\") element in the same document."
      },
      {
        "name": "width",
        "description": "The width of the display resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). -- (Absolute values only. [NO percentages](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes))"
      },
      {
        "name": "height",
        "description": "The height of the displayed resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). -- (Absolute values only. [NO percentages](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes))"
      }
    ]
  },
  {
    "name": "param",
    "description": "The param element defines parameters for plugins invoked by object elements. It does not represent anything on its own.",
    "attributes": [
      {
        "name": "name",
        "description": "Name of the parameter."
      },
      {
        "name": "value",
        "description": "Specifies the value of the parameter."
      }
    ]
  },
  {
    "name": "video",
    "description": "A video element is used for playing videos or movies, and audio files with captions.",
    "attributes": [
      {
        "name": "src"
      },
      {
        "name": "crossorigin",
        "valueSet": "xo"
      },
      {
        "name": "poster"
      },
      {
        "name": "preload",
        "valueSet": "pl"
      },
      {
        "name": "autoplay",
        "valueSet": "v",
        "description": "A Boolean attribute; if specified, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data."
      },
      {
        "name": "mediagroup"
      },
      {
        "name": "loop",
        "valueSet": "v"
      },
      {
        "name": "muted",
        "valueSet": "v"
      },
      {
        "name": "controls",
        "valueSet": "v"
      },
      {
        "name": "width"
      },
      {
        "name": "height"
      }
    ]
  },
  {
    "name": "audio",
    "description": "An audio element represents a sound or audio stream.",
    "attributes": [
      {
        "name": "src",
        "description": "The URL of the audio to embed. This is subject to [HTTP access controls](/en-US/docs/HTTP_access_control). This is optional; you may instead use the [`<source>`](/en-US/docs/Web/HTML/Element/source \"The HTML <source> element specifies multiple media resources for the <picture>, the <audio> element, or the <video> element.\") element within the audio block to specify the audio to embed."
      },
      {
        "name": "crossorigin",
        "valueSet": "xo",
        "description": "This enumerated attribute indicates whether to use CORS to fetch the related image. [CORS-enabled resources](/en-US/docs/CORS_Enabled_Image) can be reused in the [`<canvas>`](/en-US/docs/Web/HTML/Element/canvas \"Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.\") element without being _tainted_. The allowed values are:\n\nanonymous\n\nSends a cross-origin request without a credential. In other words, it sends the `Origin:` HTTP header without a cookie, X.509 certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (by not setting the `Access-Control-Allow-Origin:` HTTP header), the image will be _tainted_, and its usage restricted.\n\nuse-credentials\n\nSends a cross-origin request with a credential. In other words, it sends the `Origin:` HTTP header with a cookie, a certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (through `Access-Control-Allow-Credentials:` HTTP header), the image will be _tainted_ and its usage restricted.\n\nWhen not present, the resource is fetched without a CORS request (i.e. without sending the `Origin:` HTTP header), preventing its non-tainted used in [`<canvas>`](/en-US/docs/Web/HTML/Element/canvas \"Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.\") elements. If invalid, it is handled as if the enumerated keyword **anonymous** was used. See [CORS settings attributes](/en-US/docs/HTML/CORS_settings_attributes) for additional information."
      },
      {
        "name": "preload",
        "valueSet": "pl",
        "description": "This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience. It may have one of the following values:\n\n*   `none`: Indicates that the audio should not be preloaded.\n*   `metadata`: Indicates that only audio metadata (e.g. length) is fetched.\n*   `auto`: Indicates that the whole audio file can be downloaded, even if the user is not expected to use it.\n*   _empty string_: A synonym of the `auto` value.\n\nIf not set, `preload`'s default value is browser-defined (i.e. each browser may have its own default value). The spec advises it to be set to `metadata`.\n\n**Usage notes:**\n\n*   The `autoplay` attribute has precedence over `preload`. If `autoplay` is specified, the browser would obviously need to start downloading the audio for playback.\n*   The browser is not forced by the specification to follow the value of this attribute; it is a mere hint."
      },
      {
        "name": "autoplay",
        "valueSet": "v",
        "description": "A Boolean attribute: if specified, the audio will automatically begin playback as soon as it can do so, without waiting for the entire audio file to finish downloading.\n\n**Note**: Sites that automatically play audio (or videos with an audio track) can be an unpleasant experience for users, so should be avoided when possible. If you must offer autoplay functionality, you should make it opt-in (requiring a user to specifically enable it). However, this can be useful when creating media elements whose source will be set at a later time, under user control."
      },
      {
        "name": "mediagroup"
      },
      {
        "name": "loop",
        "valueSet": "v",
        "description": "A Boolean attribute: if specified, the audio player will automatically seek back to the start upon reaching the end of the audio."
      },
      {
        "name": "muted",
        "valueSet": "v",
        "description": "A Boolean attribute that indicates whether the audio will be initially silenced. Its default value is `false`."
      },
      {
        "name": "controls",
        "valueSet": "v",
        "description": "If this attribute is present, the browser will offer controls to allow the user to control audio playback, including volume, seeking, and pause/resume playback."
      }
    ]
  },
  {
    "name": "source",
    "description": "The source element allows authors to specify multiple alternative media resources for media elements. It does not represent anything on its own.",
    "attributes": [
      {
        "name": "src",
        "description": "Required for [`<audio>`](/en-US/docs/Web/HTML/Element/audio \"The HTML <audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.\") and [`<video>`](/en-US/docs/Web/HTML/Element/video \"The HTML Video element (<video>) embeds a media player which supports video playback into the document.\"), address of the media resource. The value of this attribute is ignored when the `<source>` element is placed inside a [`<picture>`](/en-US/docs/Web/HTML/Element/picture \"The HTML <picture> element contains zero or more <source> elements and one <img> element to provide versions of an image for different display/device scenarios.\") element."
      },
      {
        "name": "type",
        "description": "The MIME-type of the resource, optionally with a `codecs` parameter. See [RFC 4281](https://tools.ietf.org/html/rfc4281) for information about how to specify codecs."
      }
    ]
  },
  {
    "name": "track",
    "description": "The track element allows authors to specify explicit external timed text tracks for media elements. It does not represent anything on its own.",
    "attributes": [
      {
        "name": "default",
        "valueSet": "v",
        "description": "This attribute indicates that the track should be enabled unless the user's preferences indicate that another track is more appropriate. This may only be used on one `track` element per media element."
      },
      {
        "name": "kind",
        "valueSet": "tk",
        "description": "How the text track is meant to be used. If omitted the default kind is `subtitles`. If the attribute is not present, it will use the `subtitles`. If the attribute contains an invalid value, it will use `metadata`. (Versions of Chrome earlier than 52 treated an invalid value as `subtitles`.) The following keywords are allowed:\n\n*   `subtitles`\n    *   Subtitles provide translation of content that cannot be understood by the viewer. For example dialogue or text that is not English in an English language film.\n    *   Subtitles may contain additional content, usually extra background information. For example the text at the beginning of the Star Wars films, or the date, time, and location of a scene.\n*   `captions`\n    *   Closed captions provide a transcription and possibly a translation of audio.\n    *   It may include important non-verbal information such as music cues or sound effects. It may indicate the cue's source (e.g. music, text, character).\n    *   Suitable for users who are deaf or when the sound is muted.\n*   `descriptions`\n    *   Textual description of the video content.\n    *   Suitable for users who are blind or where the video cannot be seen.\n*   `chapters`\n    *   Chapter titles are intended to be used when the user is navigating the media resource.\n*   `metadata`\n    *   Tracks used by scripts. Not visible to the user."
      },
      {
        "name": "label",
        "description": "A user-readable title of the text track which is used by the browser when listing available text tracks."
      },
      {
        "name": "src",
        "description": "Address of the track (`.vtt` file). Must be a valid URL. This attribute must be specified and its URL value must have the same origin as the document — unless the [`<audio>`](/en-US/docs/Web/HTML/Element/audio \"The HTML <audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.\") or [`<video>`](/en-US/docs/Web/HTML/Element/video \"The HTML Video element (<video>) embeds a media player which supports video playback into the document.\") parent element of the `track` element has a `[crossorigin](/en-US/docs/Web/HTML/CORS_settings_attributes)` attribute."
      },
      {
        "name": "srclang",
        "description": "Language of the track text data. It must be a valid [BCP 47](https://r12a.github.io/app-subtags/) language tag. If the `kind` attribute is set to `subtitles,` then `srclang` must be defined."
      }
    ]
  },
  {
    "name": "map",
    "description": "The map element, in conjunction with an img element and any area element descendants, defines an image map. The element represents its children.",
    "attributes": [
      {
        "name": "name",
        "description": "The name attribute gives the map a name so that it can be referenced. The attribute must be present and must have a non-empty value with no space characters. The value of the name attribute must not be a compatibility-caseless match for the value of the name attribute of another map element in the same document. If the id attribute is also specified, both attributes must have the same value."
      }
    ]
  },
  {
    "name": "area",
    "description": "The area element represents either a hyperlink with some text and a corresponding area on an image map, or a dead area on an image map.",
    "attributes": [
      {
        "name": "alt"
      },
      {
        "name": "coords"
      },
      {
        "name": "shape",
        "valueSet": "sh"
      },
      {
        "name": "href"
      },
      {
        "name": "target"
      },
      {
        "name": "download"
      },
      {
        "name": "ping"
      },
      {
        "name": "rel"
      },
      {
        "name": "hreflang"
      },
      {
        "name": "type"
      }
    ]
  },
  {
    "name": "table",
    "description": "The table element represents data with more than one dimension, in the form of a table.",
    "attributes": [
      {
        "name": "sortable",
        "valueSet": "v"
      },
      {
        "name": "border"
      }
    ]
  },
  {
    "name": "caption",
    "description": "The caption element represents the title of the table that is its parent, if it has a parent and that is a table element.",
    "attributes": []
  },
  {
    "name": "colgroup",
    "description": "The colgroup element represents a group of one or more columns in the table that is its parent, if it has a parent and that is a table element.",
    "attributes": [
      {
        "name": "span"
      }
    ]
  },
  {
    "name": "col",
    "description": "If a col element has a parent and that is a colgroup element that itself has a parent that is a table element, then the col element represents one or more columns in the column group represented by that colgroup.",
    "attributes": [
      {
        "name": "span"
      }
    ]
  },
  {
    "name": "tbody",
    "description": "The tbody element represents a block of rows that consist of a body of data for the parent table element, if the tbody element has a parent and it is a table.",
    "attributes": []
  },
  {
    "name": "thead",
    "description": "The thead element represents the block of rows that consist of the column labels (headers) for the parent table element, if the thead element has a parent and it is a table.",
    "attributes": []
  },
  {
    "name": "tfoot",
    "description": "The tfoot element represents the block of rows that consist of the column summaries (footers) for the parent table element, if the tfoot element has a parent and it is a table.",
    "attributes": []
  },
  {
    "name": "tr",
    "description": "The tr element represents a row of cells in a table.",
    "attributes": []
  },
  {
    "name": "td",
    "description": "The td element represents a data cell in a table.",
    "attributes": [
      {
        "name": "colspan"
      },
      {
        "name": "rowspan"
      },
      {
        "name": "headers"
      }
    ]
  },
  {
    "name": "th",
    "description": "The th element represents a header cell in a table.",
    "attributes": [
      {
        "name": "colspan"
      },
      {
        "name": "rowspan"
      },
      {
        "name": "headers"
      },
      {
        "name": "scope",
        "valueSet": "s"
      },
      {
        "name": "sorted"
      },
      {
        "name": "abbr",
        "description": "This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself."
      }
    ]
  },
  {
    "name": "form",
    "description": "The form element represents a collection of form-associated elements, some of which can represent editable values that can be submitted to a server for processing.",
    "attributes": [
      {
        "name": "accept-charset",
        "description": "A space- or comma-delimited list of character encodings that the server accepts. The browser uses them in the order in which they are listed. The default value, the reserved string `\"UNKNOWN\"`, indicates the same encoding as that of the document containing the form element.  \nIn previous versions of HTML, the different character encodings could be delimited by spaces or commas. In HTML5, only spaces are allowed as delimiters."
      },
      {
        "name": "action",
        "description": "The URI of a program that processes the form information. This value can be overridden by a `[formaction](/en-US/docs/Web/HTML/Element/button#attr-formaction)` attribute on a [`<button>`](/en-US/docs/Web/HTML/Element/button \"The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.\") or [`<input>`](/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") element."
      },
      {
        "name": "autocomplete",
        "valueSet": "o",
        "description": "Indicates whether input elements can by default have their values automatically completed by the browser. This setting can be overridden by an `autocomplete` attribute on an element belonging to the form. Possible values are:\n\n*   `off`: The user must explicitly enter a value into each field for every use, or the document provides its own auto-completion method; the browser does not automatically complete entries.\n*   `on`: The browser can automatically complete values based on values that the user has previously entered in the form.\n\nFor most modern browsers (including Firefox 38+, Google Chrome 34+, IE 11+) setting the autocomplete attribute will not prevent a browser's password manager from asking the user if they want to store login fields (username and password), if the user permits the storage the browser will autofill the login the next time the user visits the page. See [The autocomplete attribute and login fields](/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion#The_autocomplete_attribute_and_login_fields)."
      },
      {
        "name": "enctype",
        "valueSet": "et",
        "description": "When the value of the `method` attribute is `post`, enctype is the [MIME type](https://en.wikipedia.org/wiki/Mime_type) of content that is used to submit the form to the server. Possible values are:\n\n*   `application/x-www-form-urlencoded`: The default value if the attribute is not specified.\n*   `multipart/form-data`: The value used for an [`<input>`](/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") element with the `type` attribute set to \"file\".\n*   `text/plain`: (HTML5)\n\nThis value can be overridden by a `[formenctype](/en-US/docs/Web/HTML/Element/button#attr-formenctype)` attribute on a [`<button>`](/en-US/docs/Web/HTML/Element/button \"The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.\") or [`<input>`](/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") element."
      },
      {
        "name": "method",
        "valueSet": "m",
        "description": "The [HTTP](/en-US/docs/Web/HTTP) method that the browser uses to submit the form. Possible values are:\n\n*   `post`: Corresponds to the HTTP [POST method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.5) ; form data are included in the body of the form and sent to the server.\n*   `get`: Corresponds to the HTTP [GET method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3); form data are appended to the `action` attribute URI with a '?' as separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.\n*   `dialog`: Use when the form is inside a [`<dialog>`](/en-US/docs/Web/HTML/Element/dialog \"The HTML <dialog> element represents a dialog box or other interactive component, such as an inspector or window.\") element to close the dialog when submitted.\n\nThis value can be overridden by a `[formmethod](/en-US/docs/Web/HTML/Element/button#attr-formmethod)` attribute on a [`<button>`](/en-US/docs/Web/HTML/Element/button \"The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.\") or [`<input>`](/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") element."
      },
      {
        "name": "name",
        "description": "The name of the form. In HTML 4, its use is deprecated (`id` should be used instead). It must be unique among the forms in a document and not just an empty string in HTML 5."
      },
      {
        "name": "novalidate",
        "valueSet": "v",
        "description": "This Boolean attribute indicates that the form is not to be validated when submitted. If this attribute is not specified (and therefore the form is validated), this default setting can be overridden by a `[formnovalidate](/en-US/docs/Web/HTML/Element/button#attr-formnovalidate)` attribute on a [`<button>`](/en-US/docs/Web/HTML/Element/button \"The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.\") or [`<input>`](/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") element belonging to the form."
      },
      {
        "name": "target",
        "description": "A name or keyword indicating where to display the response that is received after submitting the form. In HTML 4, this is the name/keyword for a frame. In HTML5, it is a name/keyword for a _browsing context_ (for example, tab, window, or inline frame). The following keywords have special meanings:\n\n*   `_self`: Load the response into the same HTML 4 frame (or HTML5 browsing context) as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the response into a new unnamed HTML 4 window or HTML5 browsing context.\n*   `_parent`: Load the response into the HTML 4 frameset parent of the current frame, or HTML5 parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: HTML 4: Load the response into the full original window, and cancel all other frames. HTML5: Load the response into the top-level browsing context (i.e., the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.\n*   _iframename_: The response is displayed in a named [`<iframe>`](/en-US/docs/Web/HTML/Element/iframe \"The HTML Inline Frame element (<iframe>) represents a nested browsing context, embedding another HTML page into the current one.\").\n\nHTML5: This value can be overridden by a `[formtarget](/en-US/docs/Web/HTML/Element/button#attr-formtarget)` attribute on a [`<button>`](/en-US/docs/Web/HTML/Element/button \"The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.\") or [`<input>`](/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") element."
      }
    ]
  },
  {
    "name": "label",
    "description": "The label element represents a caption in a user interface. The caption can be associated with a specific form control, known as the label element's labeled control, either using the for attribute, or by putting the form control inside the label element itself.",
    "attributes": [
      {
        "name": "form",
        "description": "The [`<form>`](/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\") element with which the label is associated (its _form owner_). If specified, the value of the attribute is the `id` of a [`<form>`](/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\") element in the same document. This lets you place label elements anywhere within a document, not just as descendants of their form elements."
      },
      {
        "name": "for",
        "description": "The `[id](/en-US/docs/Web/HTML/Global_attributes#attr-id)` of a [labelable](/en-US/docs/Web/Guide/HTML/Content_categories#Form_labelable) form-related element in the same document as the `<label>` element. The first element in the document with an `id` matching the value of the `for` attribute is the _labeled control_ for this label element, if it is a labelable element. If it is not labelable then the `for` attribute has no effect. If there are other elements which also match the `id` value, later in the document, they are not considered.\n\n**Note**: A `<label>` element can have both a `for` attribute and a contained control element, as long as the `for` attribute points to the contained control element."
      }
    ]
  },
  {
    "name": "input",
    "description": "The input element represents a typed data field, usually with a form control to allow the user to edit the data.",
    "attributes": [
      {
        "name": "accept"
      },
      {
        "name": "alt"
      },
      {
        "name": "autocomplete",
        "valueSet": "inputautocomplete"
      },
      {
        "name": "autofocus",
        "valueSet": "v"
      },
      {
        "name": "checked",
        "valueSet": "v"
      },
      {
        "name": "dirname"
      },
      {
        "name": "disabled",
        "valueSet": "v"
      },
      {
        "name": "form"
      },
      {
        "name": "formaction"
      },
      {
        "name": "formenctype",
        "valueSet": "et"
      },
      {
        "name": "formmethod",
        "valueSet": "fm"
      },
      {
        "name": "formnovalidate",
        "valueSet": "v"
      },
      {
        "name": "formtarget"
      },
      {
        "name": "height"
      },
      {
        "name": "inputmode",
        "valueSet": "im"
      },
      {
        "name": "list"
      },
      {
        "name": "max"
      },
      {
        "name": "maxlength"
      },
      {
        "name": "min"
      },
      {
        "name": "minlength"
      },
      {
        "name": "multiple",
        "valueSet": "v"
      },
      {
        "name": "name"
      },
      {
        "name": "pattern"
      },
      {
        "name": "placeholder"
      },
      {
        "name": "readonly",
        "valueSet": "v"
      },
      {
        "name": "required",
        "valueSet": "v"
      },
      {
        "name": "size"
      },
      {
        "name": "src"
      },
      {
        "name": "step"
      },
      {
        "name": "type",
        "valueSet": "t"
      },
      {
        "name": "value"
      },
      {
        "name": "width"
      }
    ]
  },
  {
    "name": "button",
    "description": "The button element represents a button labeled by its contents.",
    "attributes": [
      {
        "name": "autofocus",
        "valueSet": "v",
        "description": "This Boolean attribute lets you specify that the button should have input focus when the page loads, unless the user overrides it, for example by typing in a different control. Only one form-associated element in a document can have this attribute specified."
      },
      {
        "name": "disabled",
        "valueSet": "v",
        "description": "This Boolean attribute indicates that the user cannot interact with the button. If this attribute is not specified, the button inherits its setting from the containing element, for example [`<fieldset>`](/en-US/docs/Web/HTML/Element/fieldset \"The HTML <fieldset> element is used to group several controls as well as labels (<label>) within a web form.\"); if there is no containing element with the **disabled** attribute set, then the button is enabled.\n\nFirefox will, unlike other browsers, by default, [persist the dynamic disabled state](https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing) of a [`<button>`](/en-US/docs/Web/HTML/Element/button \"The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.\") across page loads. Use the `[autocomplete](/en-US/docs/Web/HTML/Element/button#attr-autocomplete)` attribute to control this feature."
      },
      {
        "name": "form",
        "description": "The form element that the button is associated with (its _form owner_). The value of the attribute must be the **id** attribute of a [`<form>`](/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\") element in the same document. If this attribute is not specified, the `<button>` element will be associated to an ancestor [`<form>`](/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\") element, if one exists. This attribute enables you to associate `<button>` elements to [`<form>`](/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\") elements anywhere within a document, not just as descendants of [`<form>`](/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\") elements."
      },
      {
        "name": "formaction",
        "description": "The URI of a program that processes the information submitted by the button. If specified, it overrides the `[action](/en-US/docs/Web/HTML/Element/form#attr-action)` attribute of the button's form owner."
      },
      {
        "name": "formenctype",
        "valueSet": "et",
        "description": "If the button is a submit button, this attribute specifies the type of content that is used to submit the form to the server. Possible values are:\n\n*   `application/x-www-form-urlencoded`: The default value if the attribute is not specified.\n*   `multipart/form-data`: Use this value if you are using an [`<input>`](/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") element with the `[type](/en-US/docs/Web/HTML/Element/input#attr-type)` attribute set to `file`.\n*   `text/plain`\n\nIf this attribute is specified, it overrides the `[enctype](/en-US/docs/Web/HTML/Element/form#attr-enctype)` attribute of the button's form owner."
      },
      {
        "name": "formmethod",
        "valueSet": "fm",
        "description": "If the button is a submit button, this attribute specifies the HTTP method that the browser uses to submit the form. Possible values are:\n\n*   `post`: The data from the form are included in the body of the form and sent to the server.\n*   `get`: The data from the form are appended to the **form** attribute URI, with a '?' as a separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.\n\nIf specified, this attribute overrides the `[method](/en-US/docs/Web/HTML/Element/form#attr-method)` attribute of the button's form owner."
      },
      {
        "name": "formnovalidate",
        "valueSet": "v",
        "description": "If the button is a submit button, this Boolean attribute specifies that the form is not to be validated when it is submitted. If this attribute is specified, it overrides the `[novalidate](/en-US/docs/Web/HTML/Element/form#attr-novalidate)` attribute of the button's form owner."
      },
      {
        "name": "formtarget",
        "description": "If the button is a submit button, this attribute is a name or keyword indicating where to display the response that is received after submitting the form. This is a name of, or keyword for, a _browsing context_ (for example, tab, window, or inline frame). If this attribute is specified, it overrides the `[target](/en-US/docs/Web/HTML/Element/form#attr-target)` attribute of the button's form owner. The following keywords have special meanings:\n\n*   `_self`: Load the response into the same browsing context as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the response into a new unnamed browsing context.\n*   `_parent`: Load the response into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: Load the response into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`."
      },
      {
        "name": "name",
        "description": "The name of the button, which is submitted with the form data."
      },
      {
        "name": "type",
        "valueSet": "bt",
        "description": "The type of the button. Possible values are:\n\n*   `submit`: The button submits the form data to the server. This is the default if the attribute is not specified, or if the attribute is dynamically changed to an empty or invalid value.\n*   `reset`: The button resets all the controls to their initial values.\n*   `button`: The button has no default behavior. It can have client-side scripts associated with the element's events, which are triggered when the events occur."
      },
      {
        "name": "value",
        "description": "The initial value of the button. It defines the value associated with the button which is submitted with the form data. This value is passed to the server in params when the form is submitted."
      }
    ]
  },
  {
    "name": "select",
    "description": "The select element represents a control for selecting amongst a set of options.",
    "attributes": [
      {
        "name": "autocomplete",
        "valueSet": "inputautocomplete",
        "description": "A [`DOMString`](/en-US/docs/Web/API/DOMString \"DOMString is a UTF-16 String. As JavaScript already uses such strings, DOMString is mapped directly to a String.\") providing a hint for a [user agent's](/en-US/docs/Glossary/user_agent \"user agent's: A user agent is a computer program representing a person, for example, a browser in a Web context.\") autocomplete feature. See [The HTML autocomplete attribute](/en-US/docs/Web/HTML/Attributes/autocomplete) for a complete list of values and details on how to use autocomplete."
      },
      {
        "name": "autofocus",
        "valueSet": "v",
        "description": "This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form element in a document can have the `autofocus` attribute."
      },
      {
        "name": "disabled",
        "valueSet": "v",
        "description": "This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example `fieldset`; if there is no containing element with the `disabled` attribute set, then the control is enabled."
      },
      {
        "name": "form",
        "description": "This attribute lets you specify the form element to which the select element is associated (that is, its \"form owner\"). If this attribute is specified, its value must be the same as the `id` of a form element in the same document. This enables you to place select elements anywhere within a document, not just as descendants of their form elements."
      },
      {
        "name": "multiple",
        "valueSet": "v",
        "description": "This Boolean attribute indicates that multiple options can be selected in the list. If it is not specified, then only one option can be selected at a time. When `multiple` is specified, most browsers will show a scrolling list box instead of a single line dropdown."
      },
      {
        "name": "name",
        "description": "This attribute is used to specify the name of the control."
      },
      {
        "name": "required",
        "valueSet": "v",
        "description": "A Boolean attribute indicating that an option with a non-empty string value must be selected."
      },
      {
        "name": "size",
        "description": "If the control is presented as a scrolling list box (e.g. when `multiple` is specified), this attribute represents the number of rows in the list that should be visible at one time. Browsers are not required to present a select element as a scrolled list box. The default value is 0.\n\n**Note:** According to the HTML5 specification, the default value for size should be 1; however, in practice, this has been found to break some web sites, and no other browser currently does that, so Mozilla has opted to continue to return 0 for the time being with Firefox."
      }
    ]
  },
  {
    "name": "datalist",
    "description": "The datalist element represents a set of option elements that represent predefined options for other controls. In the rendering, the datalist element represents nothing and it, along with its children, should be hidden.",
    "attributes": []
  },
  {
    "name": "optgroup",
    "description": "The optgroup element represents a group of option elements with a common label.",
    "attributes": [
      {
        "name": "disabled",
        "valueSet": "v",
        "description": "If this Boolean attribute is set, none of the items in this option group is selectable. Often browsers grey out such control and it won't receive any browsing events, like mouse clicks or focus-related ones."
      },
      {
        "name": "label",
        "description": "The name of the group of options, which the browser can use when labeling the options in the user interface. This attribute is mandatory if this element is used."
      }
    ]
  },
  {
    "name": "option",
    "description": "The option element represents an option in a select element or as part of a list of suggestions in a datalist element.",
    "attributes": [
      {
        "name": "disabled",
        "valueSet": "v",
        "description": "If this Boolean attribute is set, this option is not checkable. Often browsers grey out such control and it won't receive any browsing event, like mouse clicks or focus-related ones. If this attribute is not set, the element can still be disabled if one of its ancestors is a disabled [`<optgroup>`](/en-US/docs/Web/HTML/Element/optgroup \"The HTML <optgroup> element creates a grouping of options within a <select> element.\") element."
      },
      {
        "name": "label",
        "description": "This attribute is text for the label indicating the meaning of the option. If the `label` attribute isn't defined, its value is that of the element text content."
      },
      {
        "name": "selected",
        "valueSet": "v",
        "description": "If present, this Boolean attribute indicates that the option is initially selected. If the `<option>` element is the descendant of a [`<select>`](/en-US/docs/Web/HTML/Element/select \"The HTML <select> element represents a control that provides a menu of options\") element whose `[multiple](/en-US/docs/Web/HTML/Element/select#attr-multiple)` attribute is not set, only one single `<option>` of this [`<select>`](/en-US/docs/Web/HTML/Element/select \"The HTML <select> element represents a control that provides a menu of options\") element may have the `selected` attribute."
      },
      {
        "name": "value",
        "description": "The content of this attribute represents the value to be submitted with the form, should this option be selected. If this attribute is omitted, the value is taken from the text content of the option element."
      }
    ]
  },
  {
    "name": "textarea",
    "description": "The textarea element represents a multiline plain text edit control for the element's raw value. The contents of the control represent the control's default value.",
    "attributes": [
      {
        "name": "autocomplete",
        "valueSet": "inputautocomplete",
        "description": "This attribute indicates whether the value of the control can be automatically completed by the browser. Possible values are:\n\n*   `off`: The user must explicitly enter a value into this field for every use, or the document provides its own auto-completion method; the browser does not automatically complete the entry.\n*   `on`: The browser can automatically complete the value based on values that the user has entered during previous uses.\n\nIf the `autocomplete` attribute is not specified on a `<textarea>` element, then the browser uses the `autocomplete` attribute value of the `<textarea>` element's form owner. The form owner is either the [`<form>`](/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\") element that this `<textarea>` element is a descendant of or the form element whose `id` is specified by the `form` attribute of the input element. For more information, see the `[autocomplete](/en-US/docs/Web/HTML/Element/form#attr-autocomplete)` attribute in [`<form>`](/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\")."
      },
      {
        "name": "autofocus",
        "valueSet": "v",
        "description": "This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form-associated element in a document can have this attribute specified."
      },
      {
        "name": "cols",
        "description": "The visible width of the text control, in average character widths. If it is specified, it must be a positive integer. If it is not specified, the default value is `20`."
      },
      {
        "name": "dirname"
      },
      {
        "name": "disabled",
        "valueSet": "v",
        "description": "This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example [`<fieldset>`](/en-US/docs/Web/HTML/Element/fieldset \"The HTML <fieldset> element is used to group several controls as well as labels (<label>) within a web form.\"); if there is no containing element when the `disabled` attribute is set, the control is enabled."
      },
      {
        "name": "form",
        "description": "The form element that the `<textarea>` element is associated with (its \"form owner\"). The value of the attribute must be the `id` of a form element in the same document. If this attribute is not specified, the `<textarea>` element must be a descendant of a form element. This attribute enables you to place `<textarea>` elements anywhere within a document, not just as descendants of form elements."
      },
      {
        "name": "inputmode",
        "valueSet": "im"
      },
      {
        "name": "maxlength",
        "description": "The maximum number of characters (unicode code points) that the user can enter. If this value isn't specified, the user can enter an unlimited number of characters."
      },
      {
        "name": "minlength",
        "description": "The minimum number of characters (unicode code points) required that the user should enter."
      },
      {
        "name": "name",
        "description": "The name of the control."
      },
      {
        "name": "placeholder",
        "description": "A hint to the user of what can be entered in the control. Carriage returns or line-feeds within the placeholder text must be treated as line breaks when rendering the hint.\n\n**Note:** Placeholders should only be used to show an example of the type of data that should be entered into a form; they are _not_ a substitute for a proper [`<label>`](/en-US/docs/Web/HTML/Element/label \"The HTML <label> element represents a caption for an item in a user interface.\") element tied to the input. See [Labels and placeholders](/en-US/docs/Web/HTML/Element/input#Labels_and_placeholders \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") in [<input>: The Input (Form Input) element](/en-US/docs/Web/HTML/Element/input \"The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.\") for a full explanation."
      },
      {
        "name": "readonly",
        "valueSet": "v",
        "description": "This Boolean attribute indicates that the user cannot modify the value of the control. Unlike the `disabled` attribute, the `readonly` attribute does not prevent the user from clicking or selecting in the control. The value of a read-only control is still submitted with the form."
      },
      {
        "name": "required",
        "valueSet": "v",
        "description": "This attribute specifies that the user must fill in a value before submitting a form."
      },
      {
        "name": "rows",
        "description": "The number of visible text lines for the control."
      },
      {
        "name": "wrap",
        "valueSet": "w",
        "description": "Indicates how the control wraps text. Possible values are:\n\n*   `hard`: The browser automatically inserts line breaks (CR+LF) so that each line has no more than the width of the control; the `cols` attribute must also be specified for this to take effect.\n*   `soft`: The browser ensures that all line breaks in the value consist of a CR+LF pair, but does not insert any additional line breaks.\n*   `off` : Like `soft` but changes appearance to `white-space: pre` so line segments exceeding `cols` are not wrapped and the `<textarea>` becomes horizontally scrollable.\n\nIf this attribute is not specified, `soft` is its default value."
      }
    ]
  },
  {
    "name": "output",
    "description": "The output element represents the result of a calculation performed by the application, or the result of a user action.",
    "attributes": [
      {
        "name": "for",
        "description": "A space-separated list of other elements’ `[id](/en-US/docs/Web/HTML/Global_attributes/id)`s, indicating that those elements contributed input values to (or otherwise affected) the calculation."
      },
      {
        "name": "form",
        "description": "The [form element](/en-US/docs/Web/HTML/Element/form) that this element is associated with (its \"form owner\"). The value of the attribute must be an `id` of a form element in the same document. If this attribute is not specified, the output element must be a descendant of a form element. This attribute enables you to place output elements anywhere within a document, not just as descendants of their form elements."
      },
      {
        "name": "name",
        "description": "The name of the element, exposed in the [`HTMLFormElement`](/en-US/docs/Web/API/HTMLFormElement \"The HTMLFormElement interface represents a <form> element in the DOM; it allows access to and in some cases modification of aspects of the form, as well as access to its component elements.\") API."
      }
    ]
  },
  {
    "name": "progress",
    "description": "The progress element represents the completion progress of a task. The progress is either indeterminate, indicating that progress is being made but that it is not clear how much more work remains to be done before the task is complete (e.g. because the task is waiting for a remote host to respond), or the progress is a number in the range zero to a maximum, giving the fraction of work that has so far been completed.",
    "attributes": [
      {
        "name": "value",
        "description": "This attribute specifies how much of the task that has been completed. It must be a valid floating point number between 0 and `max`, or between 0 and 1 if `max` is omitted. If there is no `value` attribute, the progress bar is indeterminate; this indicates that an activity is ongoing with no indication of how long it is expected to take."
      },
      {
        "name": "max",
        "description": "This attribute describes how much work the task indicated by the `progress` element requires. The `max` attribute, if present, must have a value greater than zero and be a valid floating point number. The default value is 1."
      }
    ]
  },
  {
    "name": "meter",
    "description": "The meter element represents a scalar measurement within a known range, or a fractional value; for example disk usage, the relevance of a query result, or the fraction of a voting population to have selected a particular candidate.",
    "attributes": [
      {
        "name": "value",
        "description": "The current numeric value. This must be between the minimum and maximum values (`min` attribute and `max` attribute) if they are specified. If unspecified or malformed, the value is 0. If specified, but not within the range given by the `min` attribute and `max` attribute, the value is equal to the nearest end of the range.\n\n**Usage note:** Unless the `value` attribute is between `0` and `1` (inclusive), the `min` and `max` attributes should define the range so that the `value` attribute's value is within it."
      },
      {
        "name": "min",
        "description": "The lower numeric bound of the measured range. This must be less than the maximum value (`max` attribute), if specified. If unspecified, the minimum value is 0."
      },
      {
        "name": "max",
        "description": "The upper numeric bound of the measured range. This must be greater than the minimum value (`min` attribute), if specified. If unspecified, the maximum value is 1."
      },
      {
        "name": "low",
        "description": "The upper numeric bound of the low end of the measured range. This must be greater than the minimum value (`min` attribute), and it also must be less than the high value and maximum value (`high` attribute and `max` attribute, respectively), if any are specified. If unspecified, or if less than the minimum value, the `low` value is equal to the minimum value."
      },
      {
        "name": "high",
        "description": "The lower numeric bound of the high end of the measured range. This must be less than the maximum value (`max` attribute), and it also must be greater than the low value and minimum value (`low` attribute and **min** attribute, respectively), if any are specified. If unspecified, or if greater than the maximum value, the `high` value is equal to the maximum value."
      },
      {
        "name": "optimum",
        "description": "This attribute indicates the optimal numeric value. It must be within the range (as defined by the `min` attribute and `max` attribute). When used with the `low` attribute and `high` attribute, it gives an indication where along the range is considered preferable. For example, if it is between the `min` attribute and the `low` attribute, then the lower range is considered preferred."
      }
    ]
  },
  {
    "name": "fieldset",
    "description": "The fieldset element represents a set of form controls optionally grouped under a common name.",
    "attributes": [
      {
        "name": "disabled",
        "valueSet": "v",
        "description": "If this Boolean attribute is set, all form controls that are descendants of the `<fieldset>`, are disabled, meaning they are not editable and won't be submitted along with the `<form>`. They won't receive any browsing events, like mouse clicks or focus-related events. By default browsers display such controls grayed out. Note that form elements inside the [`<legend>`](/en-US/docs/Web/HTML/Element/legend \"The HTML <legend> element represents a caption for the content of its parent <fieldset>.\") element won't be disabled."
      },
      {
        "name": "form",
        "description": "This attribute takes the value of the `id` attribute of a [`<form>`](/en-US/docs/Web/HTML/Element/form \"The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.\") element you want the `<fieldset>` to be part of, even if it is not inside the form."
      },
      {
        "name": "name",
        "description": "The name associated with the group.\n\n**Note**: The caption for the fieldset is given by the first [`<legend>`](/en-US/docs/Web/HTML/Element/legend \"The HTML <legend> element represents a caption for the content of its parent <fieldset>.\") element nested inside it."
      }
    ]
  },
  {
    "name": "legend",
    "description": "The legend element represents a caption for the rest of the contents of the legend element's parent fieldset element, if any.",
    "attributes": []
  },
  {
    "name": "details",
    "description": "The details element represents a disclosure widget from which the user can obtain additional information or controls.",
    "attributes": [
      {
        "name": "open",
        "valueSet": "v",
        "description": "This Boolean attribute indicates whether or not the details — that is, the contents of the `<details>` element — are currently visible. The default, `false`, means the details are not visible."
      }
    ]
  },
  {
    "name": "summary",
    "description": "The summary element represents a summary, caption, or legend for the rest of the contents of the summary element's parent details element, if any.",
    "attributes": []
  },
  {
    "name": "dialog",
    "description": "The dialog element represents a part of an application that a user interacts with to perform a task, for example a dialog box, inspector, or window.",
    "attributes": []
  },
  {
    "name": "script",
    "description": "The script element allows authors to include dynamic script and data blocks in their documents. The element does not represent content for the user.",
    "attributes": [
      {
        "name": "src",
        "description": "This attribute specifies the URI of an external script; this can be used as an alternative to embedding a script directly within a document.\n\nIf a `script` element has a `src` attribute specified, it should not have a script embedded inside its tags."
      },
      {
        "name": "type",
        "description": "This attribute indicates the type of script represented. The value of this attribute will be in one of the following categories:\n\n*   **Omitted or a JavaScript MIME type:** For HTML5-compliant browsers this indicates the script is JavaScript. HTML5 specification urges authors to omit the attribute rather than provide a redundant MIME type. In earlier browsers, this identified the scripting language of the embedded or imported (via the `src` attribute) code. JavaScript MIME types are [listed in the specification](/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#JavaScript_types).\n*   **`module`:** For HTML5-compliant browsers the code is treated as a JavaScript module. The processing of the script contents is not affected by the `charset` and `defer` attributes. For information on using `module`, see [ES6 in Depth: Modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/). Code may behave differently when the `module` keyword is used.\n*   **Any other value:** The embedded content is treated as a data block which won't be processed by the browser. Developers must use a valid MIME type that is not a JavaScript MIME type to denote data blocks. The `src` attribute will be ignored.\n\n**Note:** in Firefox you could specify the version of JavaScript contained in a `<script>` element by including a non-standard `version` parameter inside the `type` attribute — for example `type=\"text/javascript;version=1.8\"`. This has been removed in Firefox 59 (see [bug 1428745](https://bugzilla.mozilla.org/show_bug.cgi?id=1428745 \"FIXED: Remove support for version parameter from script loader\"))."
      },
      {
        "name": "charset"
      },
      {
        "name": "async",
        "valueSet": "v",
        "description": "This is a Boolean attribute indicating that the browser should, if possible, load the script asynchronously.\n\nThis attribute must not be used if the `src` attribute is absent (i.e. for inline scripts). If it is included in this case it will have no effect.\n\nBrowsers usually assume the worst case scenario and load scripts synchronously, (i.e. `async=\"false\"`) during HTML parsing.\n\nDynamically inserted scripts (using [`document.createElement()`](/en-US/docs/Web/API/Document/createElement \"In an HTML document, the document.createElement() method creates the HTML element specified by tagName, or an HTMLUnknownElement if tagName isn't recognized.\")) load asynchronously by default, so to turn on synchronous loading (i.e. scripts load in the order they were inserted) set `async=\"false\"`.\n\nSee [Browser compatibility](#Browser_compatibility) for notes on browser support. See also [Async scripts for asm.js](/en-US/docs/Games/Techniques/Async_scripts)."
      },
      {
        "name": "defer",
        "valueSet": "v",
        "description": "This Boolean attribute is set to indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing `[DOMContentLoaded](/en-US/docs/Web/Events/DOMContentLoaded \"/en-US/docs/Web/Events/DOMContentLoaded\")`.\n\nScripts with the `defer` attribute will prevent the `DOMContentLoaded` event from firing until the script has loaded and finished evaluating.\n\nThis attribute must not be used if the `src` attribute is absent (i.e. for inline scripts), in this case it would have no effect.\n\nTo achieve a similar effect for dynamically inserted scripts use `async=\"false\"` instead. Scripts with the `defer` attribute will execute in the order in which they appear in the document."
      },
      {
        "name": "crossorigin",
        "valueSet": "xo",
        "description": "Normal `script` elements pass minimal information to the [`window.onerror`](/en-US/docs/Web/API/GlobalEventHandlers/onerror \"The onerror property of the GlobalEventHandlers mixin is an EventHandler that processes error events.\") for scripts which do not pass the standard [CORS](/en-US/docs/Glossary/CORS \"CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.\") checks. To allow error logging for sites which use a separate domain for static media, use this attribute. See [CORS settings attributes](/en-US/docs/Web/HTML/CORS_settings_attributes) for a more descriptive explanation of its valid arguments."
      },
      {
        "name": "nonce",
        "description": "A cryptographic nonce (number used once) to whitelist inline scripts in a [script-src Content-Security-Policy](/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src). The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource's policy is otherwise trivial."
      }
    ]
  },
  {
    "name": "noscript",
    "description": "The noscript element represents nothing if scripting is enabled, and represents its children if scripting is disabled. It is used to present different markup to user agents that support scripting and those that don't support scripting, by affecting how the document is parsed.",
    "attributes": []
  },
  {
    "name": "template",
    "description": "The template element is used to declare fragments of HTML that can be cloned and inserted in the document by script.",
    "attributes": []
  },
  {
    "name": "canvas",
    "description": "The canvas element provides scripts with a resolution-dependent bitmap canvas, which can be used for rendering graphs, game graphics, art, or other visual images on the fly.",
    "attributes": [
      {
        "name": "width",
        "description": "The width of the coordinate space in CSS pixels. Defaults to 300."
      },
      {
        "name": "height",
        "description": "The height of the coordinate space in CSS pixels. Defaults to 150."
      }
    ]
  }
]