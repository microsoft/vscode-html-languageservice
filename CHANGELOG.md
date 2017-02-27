
2.0.1 / 2017-02-21
==================
  * Support for [base URLs](https://developer.mozilla.org/de/docs/Web/HTML/Element/base). `DocumentContext.resolveReferenc` now gets the base URI to take into account when resolving a reference. (links.test.ts)[https://github.com/Microsoft/vscode-html-languageservice/blob/master/src/test/links.test.ts] for guidance on how to implement a `DocumentContext`.
  * Added htmlLanguageService.findDocumentSymbols: Returns a symbol for each tag in the document. Symbol name is in the form tag(#id)?(.class)+.

2.0.0 / 2017-02-17
==================
  * Updating to [language server type 3.0](https://github.com/Microsoft/vscode-languageserver-node/tree/master/types) API