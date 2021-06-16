/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./examples/index.ts":
/*!***************************!*\
  !*** ./examples/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! googleapis */ \"googleapis\");\n/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(googleapis__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _src_GoogleDocsRenderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/GoogleDocsRenderer */ \"./src/GoogleDocsRenderer.ts\");\nvar _process$env$GOOGLE_D, _process$env$GOOGLE_D2, _process$env$GOOGLE_D3;\n\n\n\n\n\n\ndotenv__WEBPACK_IMPORTED_MODULE_2___default().config();\nvar GOOGLE_DRIVE_API_CLIENT_EMAIL = (_process$env$GOOGLE_D = process.env.GOOGLE_DRIVE_API_CLIENT_EMAIL) !== null && _process$env$GOOGLE_D !== void 0 ? _process$env$GOOGLE_D : \"\";\nvar GOOGLE_DRIVE_API_PRIVATE_KEY = (_process$env$GOOGLE_D2 = process.env.GOOGLE_DRIVE_API_PRIVATE_KEY) !== null && _process$env$GOOGLE_D2 !== void 0 ? _process$env$GOOGLE_D2 : \"\";\nvar GOOGLE_DRIVE_API_PRIVATE_KEY_ID = (_process$env$GOOGLE_D3 = process.env.GOOGLE_DRIVE_API_PRIVATE_KEY_ID) !== null && _process$env$GOOGLE_D3 !== void 0 ? _process$env$GOOGLE_D3 : \"\";\n\nfunction authorize() {\n  var jwtClient = new googleapis__WEBPACK_IMPORTED_MODULE_3__.google.auth.JWT(GOOGLE_DRIVE_API_CLIENT_EMAIL, undefined, GOOGLE_DRIVE_API_PRIVATE_KEY.replace(/\\\\n/g, \"\\n\"), [\"https://www.googleapis.com/auth/drive.readonly\", \"https://www.googleapis.com/auth/documents.readonly\"], undefined, GOOGLE_DRIVE_API_PRIVATE_KEY_ID);\n  jwtClient.authorize(function (err) {\n    if (err) {\n      console.error(err);\n    }\n  });\n  return jwtClient;\n}\n\nvar app = express__WEBPACK_IMPORTED_MODULE_1___default()();\napp.use(\"/\", express__WEBPACK_IMPORTED_MODULE_1___default().static(path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, \"react\")));\napp.set(\"view engine\", \"ejs\");\napp.set(\"views\", path__WEBPACK_IMPORTED_MODULE_0___default().resolve(__dirname, \"views\")); // list\n\napp.get(\"/\", function (_req, res) {\n  var jwtCLient = authorize();\n\n  if (!jwtCLient) {\n    res.render(\"error\");\n  }\n\n  var drive = googleapis__WEBPACK_IMPORTED_MODULE_3__.google.drive({\n    version: \"v3\",\n    auth: jwtCLient\n  });\n  drive.files.list({\n    pageSize: 10,\n    supportsAllDrives: true,\n    supportsTeamDrives: true,\n    includeItemsFromAllDrives: true,\n    includeTeamDriveItems: true,\n    fields: \"nextPageToken, files(id, name)\",\n    q: \"mimeType!='application/vnd.google-apps.folder'\"\n  }).then(function (docs) {\n    res.render(\"index\", {\n      files: docs.data.files\n    });\n  })[\"catch\"](function (err) {\n    console.log(err);\n    res.render(\"error\");\n  });\n}); // ejs\n\napp.get(\"/ejs/:id\", function (req, res) {\n  var jwtCLient = authorize();\n\n  if (!jwtCLient) {\n    res.render(\"error\");\n  }\n\n  var docs = googleapis__WEBPACK_IMPORTED_MODULE_3__.google.docs({\n    version: \"v1\",\n    auth: jwtCLient\n  });\n  docs.documents.get({\n    documentId: req.params.id\n  }).then(function (doc) {\n    var gdr = new _src_GoogleDocsRenderer__WEBPACK_IMPORTED_MODULE_4__.default(doc.data);\n    res.render(\"file\", {\n      html: gdr.html\n    });\n  })[\"catch\"](function (err) {\n    console.log(err);\n    res.render(\"error\");\n  });\n}); // react\n\napp.get(\"/react/:id\", function (req, res) {\n  var jwtCLient = authorize();\n\n  if (!jwtCLient) {\n    res.render(\"error\");\n  }\n\n  var docs = googleapis__WEBPACK_IMPORTED_MODULE_3__.google.docs({\n    version: \"v1\",\n    auth: jwtCLient\n  });\n  docs.documents.get({\n    documentId: req.params.id\n  }).then(function (doc) {\n    var gdr = new _src_GoogleDocsRenderer__WEBPACK_IMPORTED_MODULE_4__.default(doc.data);\n    res.render(\"react\", {\n      json: gdr.document\n    });\n  })[\"catch\"](function (err) {\n    console.log(err);\n    res.render(\"error\");\n  });\n}); // json\n\napp.get(\"/:id\", function (req, res) {\n  var jwtCLient = authorize();\n\n  if (!jwtCLient) {\n    res.render(\"error\");\n  }\n\n  var docs = googleapis__WEBPACK_IMPORTED_MODULE_3__.google.docs({\n    version: \"v1\",\n    auth: jwtCLient\n  });\n  docs.documents.get({\n    documentId: req.params.id\n  }).then(function (doc) {\n    res.json(doc.data);\n  })[\"catch\"](function (err) {\n    console.log(err);\n    res.render(\"error\");\n  });\n});\napp.listen(3000, function () {\n  console.log(\"listen on http://localhost:3000\");\n});\n\n//# sourceURL=webpack://google-docs-renderer/./examples/index.ts?");

/***/ }),

/***/ "./src/GoogleDocsRenderer.ts":
/*!***********************************!*\
  !*** ./src/GoogleDocsRenderer.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ GoogleDocsRenderer)\n/* harmony export */ });\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ \"uuid\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _filters_objectMappingFilter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filters/objectMappingFilter */ \"./src/filters/objectMappingFilter.ts\");\n/* harmony import */ var _filters_paragraphElementFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filters/paragraphElementFilter */ \"./src/filters/paragraphElementFilter.ts\");\n/* harmony import */ var _filters_structuralElementFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./filters/structuralElementFilter */ \"./src/filters/structuralElementFilter.ts\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\n\n\nvar GoogleDocsRenderer = /*#__PURE__*/function () {\n  function GoogleDocsRenderer(document) {\n    var _document$body;\n\n    _classCallCheck(this, GoogleDocsRenderer);\n\n    this.modifiedDocument = this.parse({\n      content: ((_document$body = document.body) === null || _document$body === void 0 ? void 0 : _document$body.content) || [],\n      lists: document.lists || {},\n      inlineObjects: document.inlineObjects || {}\n    });\n  }\n\n  _createClass(GoogleDocsRenderer, [{\n    key: \"parse\",\n    value: function parse(document) {\n      var filteredStructuralElements = [];\n\n      if (document.content) {\n        filteredStructuralElements = (0,_filters_structuralElementFilter__WEBPACK_IMPORTED_MODULE_3__.structuralElementFilter)(document.content);\n      }\n\n      var filteredParagraphs = (0,_filters_paragraphElementFilter__WEBPACK_IMPORTED_MODULE_2__.paragraphFilter)(document.lists, filteredStructuralElements);\n      var mappedObjects = (0,_filters_objectMappingFilter__WEBPACK_IMPORTED_MODULE_1__.objectMappingFilter)({\n        elements: filteredParagraphs,\n        inlineObjects: document.inlineObjects\n      });\n      return mappedObjects;\n    }\n  }, {\n    key: \"document\",\n    get: function get() {\n      return this.modifiedDocument;\n    }\n  }, {\n    key: \"html\",\n    get: function get() {\n      var createStyle = function createStyle(style) {\n        return \"background-color: \".concat(style.backgroundColor || \"\", \"; color: \").concat(style.foregroundColor || \"\", \"; \").concat(style.underline ? \"text-decoration: underline\" : \"\");\n      };\n\n      var createLeaf = function createLeaf(child) {\n        if (child.hr) {\n          return \"<hr class=\\\"gdr-leaf\\\" data-gdr-leaf style=\\\"\".concat(createStyle(child.style), \"\\\" />\");\n        } else if (child.link) {\n          return \"<a class=\\\"gdr-leaf\\\" data-gdr-leaf href=\\\"\".concat(child.link.url, \"\\\" style=\\\"\").concat(createStyle(child.style), \"\\\">\").concat(child.text, \"</a>\");\n        } else if (child.object) {\n          return \"<img class=\\\"gdr-leaf\\\" data-gdr-leaf src=\\\"\".concat(child.object.property.sourceUri || child.object.property.contentUri, \"\\\" alt=\\\"\").concat(child.object.property.title, \"\\\" style=\\\"\").concat(createStyle(child.style), \"\\\" />\");\n        } else if (child.style.bold && child.style.italic) {\n          return \"<b class=\\\"gdr-leaf\\\" data-gdr-leaf><i class=\\\"gdr-leaf\\\" data-gdr-leaf style=\\\"\".concat(createStyle(child.style), \"\\\">\").concat(child.text, \"</i></b>\");\n        } else if (child.style.bold) {\n          return \"<b class=\\\"gdr-leaf\\\" data-gdr-leaf style=\\\"\".concat(createStyle(child.style), \"\\\">\").concat(child.text, \"</b>\");\n        } else if (child.style.italic) {\n          return \"<i class=\\\"gdr-leaf\\\" data-gdr-leaf style=\\\"\".concat(createStyle(child.style), \"\\\">\").concat(child.text, \"</i>\");\n        } else {\n          return \"<span class=\\\"gdr-leaf\\\" data-gdr-leaf style=\\\"\".concat(createStyle(child.style), \"\\\">\").concat(child.text, \"</span>\");\n        }\n      };\n\n      var createNode = function createNode(node) {\n        var children = node.children.map(function (child) {\n          return createLeaf(child);\n        }).join(\"\");\n\n        if (node.type === \"HEADING_1\") {\n          return \"<h1 class=\\\"gdr-node\\\" data-gdr-node data-node-id=\\\"\".concat(node.id, \"\\\">\").concat(children, \"</h1>\");\n        } else if (node.type === \"HEADING_2\") {\n          return \"<h2 class=\\\"gdr-node\\\" data-gdr-node data-node-id=\\\"\".concat(node.id, \"\\\">\").concat(children, \"</h2>\");\n        } else if (node.type === \"HEADING_3\") {\n          return \"<h3 class=\\\"gdr-node\\\" data-gdr-node data-node-id=\\\"\".concat(node.id, \"\\\">\").concat(children, \"</h3>\");\n        } else if (node.type === \"HEADING_4\") {\n          return \"<h4 class=\\\"gdr-node\\\" data-gdr-node data-node-id=\\\"\".concat(node.id, \"\\\">\").concat(children, \"</h4>\");\n        } else if (node.type === \"HEADING_5\") {\n          return \"<h5 class=\\\"gdr-node\\\" data-gdr-node data-node-id=\\\"\".concat(node.id, \"\\\">\").concat(children, \"</h5>\");\n        } else if (node.type === \"HEADING_6\") {\n          return \"<h6 class=\\\"gdr-node\\\" data-gdr-node data-node-id=\\\"\".concat(node.id, \"\\\">\").concat(children, \"</h6>\");\n        } else if (node.type === \"LIST_CHILD\") {\n          return \"<li class=\\\"gdr-node\\\" data-gdr-node data-node-id=\\\"\".concat(node.id, \"\\\">\").concat(children, \"</li>\");\n        } else {\n          return \"<p class=\\\"gdr-node\\\" data-gdr-node data-node-id=\\\"\".concat(node.id, \"\\\">\").concat(children, \"</p>\");\n        }\n      };\n\n      var htmlString = \"\\n        <article class=\\\"gdr-document\\\" data-gdr-document data-article-id=\\\"\".concat((0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)(), \"\\\">\").concat(this.modifiedDocument.map(function (elem) {\n        if (elem.type === \"UNORDERED_LIST\") {\n          var children = elem.children.map(function (child) {\n            return createNode(child);\n          }).join(\"\");\n          return \"<ul class=\\\"gdr-node\\\" data-gdr-node data-gdr-list data-node-id=\\\"\".concat(elem.id, \"\\\">\").concat(children, \"</ul>\");\n        } else if (elem.type === \"ORDERED_LIST\") {\n          var _children = elem.children.map(function (child) {\n            return createNode(child);\n          }).join(\"\");\n\n          return \"<ol class=\\\"gdr-node\\\" data-gdr-node data-gdr-list data-node-id=\\\"\".concat(elem.id, \"\\\">\").concat(_children, \"</ol>\");\n        } else {\n          return createNode(elem);\n        }\n      }).join(\"\"), \"</article>\\n        \");\n      return htmlString;\n    }\n  }]);\n\n  return GoogleDocsRenderer;\n}();\n\n\n\n//# sourceURL=webpack://google-docs-renderer/./src/GoogleDocsRenderer.ts?");

/***/ }),

/***/ "./src/filters/objectMappingFilter.ts":
/*!********************************************!*\
  !*** ./src/filters/objectMappingFilter.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"objectMappingFilter\": () => (/* binding */ objectMappingFilter)\n/* harmony export */ });\nvar parseRgbColor = function parseRgbColor(rgb) {\n  return \"rgb(\".concat(rgb.red ? rgb.red * 255 : \"0\", \", \").concat(rgb.blue ? rgb.blue * 255 : \"0\", \", \").concat(rgb.green ? rgb.green * 255 : \"0\", \")\");\n};\n\nvar parseTextStyle = function parseTextStyle(style) {\n  var _style$backgroundColo, _style$backgroundColo2, _style$foregroundColo, _style$foregroundColo2;\n\n  return {\n    bold: style.bold || undefined,\n    italic: style.italic || undefined,\n    strikethrough: style.strikethrough || undefined,\n    underline: style.underline || undefined,\n    backgroundColor: (_style$backgroundColo = style.backgroundColor) !== null && _style$backgroundColo !== void 0 && (_style$backgroundColo2 = _style$backgroundColo.color) !== null && _style$backgroundColo2 !== void 0 && _style$backgroundColo2.rgbColor ? parseRgbColor(style.backgroundColor.color.rgbColor) : undefined,\n    foregroundColor: (_style$foregroundColo = style.foregroundColor) !== null && _style$foregroundColo !== void 0 && (_style$foregroundColo2 = _style$foregroundColo.color) !== null && _style$foregroundColo2 !== void 0 && _style$foregroundColo2.rgbColor ? parseRgbColor(style.foregroundColor.color.rgbColor) : undefined\n  };\n};\n\nvar modifiedObject = function modifiedObject(id, inlineObjects) {\n  var _object$inlineObjectP, _object$inlineObjectP2, _object$inlineObjectP3, _object$inlineObjectP4, _object$inlineObjectP5, _object$inlineObjectP6, _object$inlineObjectP7, _object$inlineObjectP8, _object$inlineObjectP9, _object$inlineObjectP10, _object$inlineObjectP11, _object$inlineObjectP12, _object$inlineObjectP13;\n\n  if (!inlineObjects[id]) {\n    return null;\n  }\n\n  var object = inlineObjects[id];\n\n  if (!(object.inlineObjectProperties && object.inlineObjectProperties.embeddedObject)) {\n    return null;\n  }\n\n  if (!object.inlineObjectProperties.embeddedObject.imageProperties) {\n    // only images\n    return null;\n  }\n\n  var title = object.inlineObjectProperties.embeddedObject.title || \"\";\n  var description = object.inlineObjectProperties.embeddedObject.description || \"\";\n  var marginTop = ((_object$inlineObjectP = object.inlineObjectProperties.embeddedObject.marginTop) === null || _object$inlineObjectP === void 0 ? void 0 : _object$inlineObjectP.magnitude) || 0;\n  var marginBottom = ((_object$inlineObjectP2 = object.inlineObjectProperties.embeddedObject.marginBottom) === null || _object$inlineObjectP2 === void 0 ? void 0 : _object$inlineObjectP2.magnitude) || 0;\n  var marginLeft = ((_object$inlineObjectP3 = object.inlineObjectProperties.embeddedObject.marginLeft) === null || _object$inlineObjectP3 === void 0 ? void 0 : _object$inlineObjectP3.magnitude) || 0;\n  var marginRight = ((_object$inlineObjectP4 = object.inlineObjectProperties.embeddedObject.marginRight) === null || _object$inlineObjectP4 === void 0 ? void 0 : _object$inlineObjectP4.magnitude) || 0;\n  var width = ((_object$inlineObjectP5 = object.inlineObjectProperties.embeddedObject.size) === null || _object$inlineObjectP5 === void 0 ? void 0 : (_object$inlineObjectP6 = _object$inlineObjectP5.width) === null || _object$inlineObjectP6 === void 0 ? void 0 : _object$inlineObjectP6.magnitude) || 0;\n  var height = ((_object$inlineObjectP7 = object.inlineObjectProperties.embeddedObject.size) === null || _object$inlineObjectP7 === void 0 ? void 0 : (_object$inlineObjectP8 = _object$inlineObjectP7.height) === null || _object$inlineObjectP8 === void 0 ? void 0 : _object$inlineObjectP8.magnitude) || 0;\n  var angle = object.inlineObjectProperties.embeddedObject.imageProperties.angle || undefined;\n  var brightness = object.inlineObjectProperties.embeddedObject.imageProperties.brightness || undefined;\n  var contrast = object.inlineObjectProperties.embeddedObject.imageProperties.contrast || undefined;\n  var transparency = object.inlineObjectProperties.embeddedObject.imageProperties.transparency || undefined;\n  var sourceUri = object.inlineObjectProperties.embeddedObject.imageProperties.sourceUri || undefined;\n  var contentUri = object.inlineObjectProperties.embeddedObject.imageProperties.contentUri || undefined;\n  var cropAngle = ((_object$inlineObjectP9 = object.inlineObjectProperties.embeddedObject.imageProperties.cropProperties) === null || _object$inlineObjectP9 === void 0 ? void 0 : _object$inlineObjectP9.angle) || undefined;\n  var cropOffsetTop = ((_object$inlineObjectP10 = object.inlineObjectProperties.embeddedObject.imageProperties.cropProperties) === null || _object$inlineObjectP10 === void 0 ? void 0 : _object$inlineObjectP10.offsetTop) || undefined;\n  var cropOffsetBottom = ((_object$inlineObjectP11 = object.inlineObjectProperties.embeddedObject.imageProperties.cropProperties) === null || _object$inlineObjectP11 === void 0 ? void 0 : _object$inlineObjectP11.offsetBottom) || undefined;\n  var cropOffsetLeft = ((_object$inlineObjectP12 = object.inlineObjectProperties.embeddedObject.imageProperties.cropProperties) === null || _object$inlineObjectP12 === void 0 ? void 0 : _object$inlineObjectP12.offsetLeft) || undefined;\n  var cropOffsetRight = ((_object$inlineObjectP13 = object.inlineObjectProperties.embeddedObject.imageProperties.cropProperties) === null || _object$inlineObjectP13 === void 0 ? void 0 : _object$inlineObjectP13.offsetRight) || undefined;\n  return {\n    title: title,\n    description: description,\n    marginTop: marginTop,\n    marginBottom: marginBottom,\n    marginLeft: marginLeft,\n    marginRight: marginRight,\n    width: width,\n    height: height,\n    angle: angle,\n    brightness: brightness,\n    contrast: contrast,\n    transparency: transparency,\n    sourceUri: sourceUri,\n    contentUri: contentUri,\n    cropAngle: cropAngle,\n    cropOffsetTop: cropOffsetTop,\n    cropOffsetBottom: cropOffsetBottom,\n    cropOffsetLeft: cropOffsetLeft,\n    cropOffsetRight: cropOffsetRight\n  };\n};\n\nvar modifiedTextElement = function modifiedTextElement(e, inlineObjects) {\n  var _e$textRun, _e$textRun$textStyle, _e$textRun$textStyle$, _e$inlineObjectElemen, _e$textRun2, _e$textRun3, _e$textRun4, _e$textRun5, _e$textRun5$textStyle, _e$textRun5$textStyle2, _e$textRun6, _e$inlineObjectElemen2, _e$inlineObjectElemen3, _e$horizontalRule;\n\n  var hasLink = !!((_e$textRun = e.textRun) !== null && _e$textRun !== void 0 && (_e$textRun$textStyle = _e$textRun.textStyle) !== null && _e$textRun$textStyle !== void 0 && (_e$textRun$textStyle$ = _e$textRun$textStyle.link) !== null && _e$textRun$textStyle$ !== void 0 && _e$textRun$textStyle$.url);\n  var hasObject = !!((_e$inlineObjectElemen = e.inlineObjectElement) !== null && _e$inlineObjectElemen !== void 0 && _e$inlineObjectElemen.inlineObjectId);\n  var hasHr = !!e.horizontalRule;\n  var text = ((_e$textRun2 = e.textRun) === null || _e$textRun2 === void 0 ? void 0 : _e$textRun2.content) || \"\";\n  var style = (_e$textRun3 = e.textRun) !== null && _e$textRun3 !== void 0 && _e$textRun3.textStyle ? parseTextStyle((_e$textRun4 = e.textRun) === null || _e$textRun4 === void 0 ? void 0 : _e$textRun4.textStyle) : {};\n  var link = hasLink ? {\n    url: (_e$textRun5 = e.textRun) === null || _e$textRun5 === void 0 ? void 0 : (_e$textRun5$textStyle = _e$textRun5.textStyle) === null || _e$textRun5$textStyle === void 0 ? void 0 : (_e$textRun5$textStyle2 = _e$textRun5$textStyle.link) === null || _e$textRun5$textStyle2 === void 0 ? void 0 : _e$textRun5$textStyle2.url,\n    style: (_e$textRun6 = e.textRun) !== null && _e$textRun6 !== void 0 && _e$textRun6.textStyle ? parseTextStyle(e.textRun.textStyle) : {}\n  } : undefined;\n  var verifiedObject = hasObject ? modifiedObject((_e$inlineObjectElemen2 = e.inlineObjectElement) === null || _e$inlineObjectElemen2 === void 0 ? void 0 : _e$inlineObjectElemen2.inlineObjectId, inlineObjects) : null;\n  var object = hasObject && verifiedObject ? {\n    property: verifiedObject,\n    style: (_e$inlineObjectElemen3 = e.inlineObjectElement) !== null && _e$inlineObjectElemen3 !== void 0 && _e$inlineObjectElemen3.textStyle ? parseTextStyle(e.inlineObjectElement.textStyle) : {}\n  } : undefined;\n  var hr = hasHr ? {\n    style: (_e$horizontalRule = e.horizontalRule) !== null && _e$horizontalRule !== void 0 && _e$horizontalRule.textStyle ? parseTextStyle(e.horizontalRule.textStyle) : {}\n  } : undefined;\n  return {\n    text: text,\n    style: style,\n    link: hasLink ? link : undefined,\n    hr: hasHr ? hr : undefined,\n    object: hasObject ? object : undefined\n  };\n};\n\nvar objectMappingFilter = function objectMappingFilter(_ref) {\n  var elements = _ref.elements,\n      inlineObjects = _ref.inlineObjects;\n  return elements.map(function (elem) {\n    if (elem.type === \"ORDERED_LIST\" || elem.type === \"UNORDERED_LIST\") {\n      var _elem = elem;\n\n      var listChildren = _elem.elements.map(function (item) {\n        var _elements = item.element.elements;\n        var children = [];\n\n        if (_elements) {\n          var mapped = _elements.map(function (e) {\n            var textElement = modifiedTextElement(e, inlineObjects);\n            return textElement;\n          });\n\n          var filtered = mapped.filter(Boolean);\n          children = filtered;\n        }\n\n        return {\n          type: item.type,\n          id: item.id,\n          children: children\n        };\n      });\n\n      return {\n        type: _elem.type,\n        id: _elem.id,\n        children: listChildren\n      };\n    } else {\n      var _elem2 = elem;\n      var _elements = _elem2.element.elements;\n      var pChildren = [];\n\n      if (_elements) {\n        var mapped = _elements.map(function (e) {\n          var textElement = modifiedTextElement(e, inlineObjects);\n          return textElement;\n        });\n\n        var filtered = mapped.filter(Boolean);\n        pChildren = filtered;\n      }\n\n      return {\n        type: _elem2.type,\n        id: _elem2.id,\n        children: pChildren\n      };\n    }\n  });\n};\n\n//# sourceURL=webpack://google-docs-renderer/./src/filters/objectMappingFilter.ts?");

/***/ }),

/***/ "./src/filters/paragraphElementFilter.ts":
/*!***********************************************!*\
  !*** ./src/filters/paragraphElementFilter.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"paragraphFilter\": () => (/* binding */ paragraphFilter)\n/* harmony export */ });\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ \"uuid\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);\n\nvar paragraphFilter = function paragraphFilter(lists, elements) {\n  var listKeys = new Set();\n  var listElements = [];\n  var parsedParagraphs = elements.map(function (paragraph) {\n    if (paragraph.type === \"PARAGRAPH\") {\n      var element = paragraph.element; // list\n\n      if (element.bullet && element.bullet.listId) {\n        var listKey = element.bullet.listId;\n\n        if (listKeys.has(listKey)) {\n          var listProperties = lists[listKey].listProperties;\n\n          if (listProperties && listProperties.nestingLevels) {\n            var parent = listElements.filter(function (list) {\n              return list.id === listKey;\n            })[0];\n            parent.elements.push({\n              type: \"LIST_CHILD\",\n              id: (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)(),\n              element: element\n            });\n          }\n\n          return null;\n        } else {\n          var _listProperties = lists[listKey].listProperties;\n\n          if (_listProperties && _listProperties.nestingLevels) {\n            listKeys.add(listKey);\n            var listType = (_listProperties === null || _listProperties === void 0 ? void 0 : _listProperties.nestingLevels[0].glyphType) === \"DECIMAL\" ? \"ORDERED_LIST\" : \"UNORDERED_LIST\";\n            var listChildren = [];\n            var parsedElement = {\n              type: listType,\n              id: listKey,\n              elements: listChildren\n            };\n            listElements.push(parsedElement);\n            listChildren.push({\n              type: \"LIST_CHILD\",\n              id: (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)(),\n              element: element\n            });\n            return parsedElement;\n          }\n\n          return null;\n        }\n      } else {\n        var _element$paragraphSty;\n\n        // paragraph\n        if ((_element$paragraphSty = element.paragraphStyle) !== null && _element$paragraphSty !== void 0 && _element$paragraphSty.namedStyleType) {\n          var type = \"PARAGRAPH\";\n\n          switch (element.paragraphStyle.namedStyleType) {\n            case \"NORMAL_TEXT\":\n              {\n                type = \"PARAGRAPH\";\n                break;\n              }\n\n            case \"TITLE\":\n              {\n                type = \"HEADING_1\";\n                break;\n              }\n\n            case \"SUBTITLE\":\n              {\n                type = \"HEADING_2\";\n                break;\n              }\n\n            case \"HEADING_1\":\n              {\n                type = \"HEADING_1\";\n                break;\n              }\n\n            case \"HEADING_2\":\n              {\n                type = \"HEADING_2\";\n                break;\n              }\n\n            case \"HEADING_3\":\n              {\n                type = \"HEADING_3\";\n                break;\n              }\n\n            case \"HEADING_4\":\n              {\n                type = \"HEADING_4\";\n                break;\n              }\n\n            case \"HEADING_5\":\n              {\n                type = \"HEADING_5\";\n                break;\n              }\n\n            case \"HEADING_6\":\n              {\n                type = \"HEADING_6\";\n                break;\n              }\n\n            default:\n              {\n                type = \"PARAGRAPH\";\n              }\n          }\n\n          var _parsedElement = {\n            type: type,\n            id: (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)(),\n            element: element\n          };\n          return _parsedElement;\n        }\n\n        return null;\n      }\n    } else if (paragraph.type === \"TABLE\") {\n      // incompatible elements\n      return null;\n    } else if (paragraph.type === \"SECTION_BREAK\") {\n      // incompatible elements\n      return null;\n    } else if (paragraph.type === \"TABLE_OF_CONTENTS\") {\n      // incompatible elements\n      return null;\n    }\n\n    return null;\n  });\n  return parsedParagraphs.filter(Boolean);\n};\n\n//# sourceURL=webpack://google-docs-renderer/./src/filters/paragraphElementFilter.ts?");

/***/ }),

/***/ "./src/filters/structuralElementFilter.ts":
/*!************************************************!*\
  !*** ./src/filters/structuralElementFilter.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"structuralElementFilter\": () => (/* binding */ structuralElementFilter)\n/* harmony export */ });\n/* eslint-disable @typescript-eslint/no-non-null-assertion */\nvar parseStructuralElementTypes = function parseStructuralElementTypes(element) {\n  try {\n    if (element.paragraph) {\n      return {\n        type: \"PARAGRAPH\",\n        element: element.paragraph\n      };\n    } else if (element.tableOfContents) {\n      // incompatible elements\n      return null;\n    } else if (element.table) {\n      return {\n        type: \"TABLE\",\n        element: element.table\n      };\n    } else if (element.sectionBreak) {\n      return {\n        type: \"SECTION_BREAK\",\n        element: element.sectionBreak\n      };\n    } else {\n      // incompatible elements\n      return null;\n    }\n  } catch (e) {\n    console.error(e);\n    return null;\n  }\n};\n\nvar structuralElementFilter = function structuralElementFilter(elements) {\n  var parsedElements = elements.map(function (element) {\n    return parseStructuralElementTypes(element);\n  });\n  return parsedElements.filter(Boolean);\n};\n\n//# sourceURL=webpack://google-docs-renderer/./src/filters/structuralElementFilter.ts?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "googleapis":
/*!*****************************!*\
  !*** external "googleapis" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("googleapis");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");;

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./examples/index.ts");
/******/ 	
/******/ })()
;