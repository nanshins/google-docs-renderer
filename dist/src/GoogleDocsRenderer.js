"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var objectMappingFilter_1 = require("./filters/objectMappingFilter");
var paragraphElementFilter_1 = require("./filters/paragraphElementFilter");
var structuralElementFilter_1 = require("./filters/structuralElementFilter");
var GoogleDocsRenderer = (function () {
    function GoogleDocsRenderer(document) {
        var _a;
        this.modifiedDocument = this.parse({
            content: ((_a = document.body) === null || _a === void 0 ? void 0 : _a.content) || [],
            lists: document.lists || {},
            inlineObjects: document.inlineObjects || {}
        });
    }
    GoogleDocsRenderer.prototype.parse = function (document) {
        var filteredStructuralElements = [];
        if (document.content) {
            filteredStructuralElements = structuralElementFilter_1.structuralElementFilter(document.content);
        }
        var filteredParagraphs = paragraphElementFilter_1.paragraphFilter(document.lists, filteredStructuralElements);
        var mappedObjects = objectMappingFilter_1.objectMappingFilter({
            elements: filteredParagraphs,
            inlineObjects: document.inlineObjects
        });
        return mappedObjects;
    };
    Object.defineProperty(GoogleDocsRenderer.prototype, "document", {
        get: function () {
            return this.modifiedDocument;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GoogleDocsRenderer.prototype, "html", {
        get: function () {
            var createStyle = function (style) {
                return "background-color: " + (style.backgroundColor || "") + "; color: " + (style.foregroundColor || "") + "; " + (style.underline ? "text-decoration: underline" : "");
            };
            var createLeaf = function (child) {
                if (child.hr) {
                    return "<hr class=\"gdr-leaf\" data-gdr-leaf style=\"" + createStyle(child.style) + "\" />";
                }
                else if (child.link) {
                    return "<a class=\"gdr-leaf\" data-gdr-leaf href=\"" + child.link.url + "\" style=\"" + createStyle(child.style) + "\">" + child.text + "</a>";
                }
                else if (child.object) {
                    return "<img class=\"gdr-leaf\" data-gdr-leaf src=\"" + (child.object.property.sourceUri ||
                        child.object.property.contentUri) + "\" alt=\"" + child.object.property.title + "\" style=\"" + createStyle(child.style) + "\" />";
                }
                else if (child.style.bold && child.style.italic) {
                    return "<b class=\"gdr-leaf\" data-gdr-leaf><i class=\"gdr-leaf\" data-gdr-leaf style=\"" + createStyle(child.style) + "\">" + child.text + "</i></b>";
                }
                else if (child.style.bold) {
                    return "<b class=\"gdr-leaf\" data-gdr-leaf style=\"" + createStyle(child.style) + "\">" + child.text + "</b>";
                }
                else if (child.style.italic) {
                    return "<i class=\"gdr-leaf\" data-gdr-leaf style=\"" + createStyle(child.style) + "\">" + child.text + "</i>";
                }
                else {
                    return "<span class=\"gdr-leaf\" data-gdr-leaf style=\"" + createStyle(child.style) + "\">" + child.text + "</span>";
                }
            };
            var createNode = function (node) {
                var children = node.children
                    .map(function (child) { return createLeaf(child); })
                    .join("");
                if (node.type === "HEADING_1") {
                    return "<h1 class=\"gdr-node\" data-gdr-node data-node-id=\"" + node.id + "\">" + children + "</h1>";
                }
                else if (node.type === "HEADING_2") {
                    return "<h2 class=\"gdr-node\" data-gdr-node data-node-id=\"" + node.id + "\">" + children + "</h2>";
                }
                else if (node.type === "HEADING_3") {
                    return "<h3 class=\"gdr-node\" data-gdr-node data-node-id=\"" + node.id + "\">" + children + "</h3>";
                }
                else if (node.type === "HEADING_4") {
                    return "<h4 class=\"gdr-node\" data-gdr-node data-node-id=\"" + node.id + "\">" + children + "</h4>";
                }
                else if (node.type === "HEADING_5") {
                    return "<h5 class=\"gdr-node\" data-gdr-node data-node-id=\"" + node.id + "\">" + children + "</h5>";
                }
                else if (node.type === "HEADING_6") {
                    return "<h6 class=\"gdr-node\" data-gdr-node data-node-id=\"" + node.id + "\">" + children + "</h6>";
                }
                else if (node.type === "LIST_CHILD") {
                    return "<li class=\"gdr-node\" data-gdr-node data-node-id=\"" + node.id + "\">" + children + "</li>";
                }
                else {
                    return "<p class=\"gdr-node\" data-gdr-node data-node-id=\"" + node.id + "\">" + children + "</p>";
                }
            };
            var htmlString = "\n        <article class=\"gdr-document\" data-gdr-document data-article-id=\"" + uuid_1.v4() + "\">" + this.modifiedDocument
                .map(function (elem) {
                if (elem.type === "UNORDERED_LIST") {
                    var children = elem.children
                        .map(function (child) { return createNode(child); })
                        .join("");
                    return "<ul class=\"gdr-node\" data-gdr-node data-gdr-list data-node-id=\"" + elem.id + "\">" + children + "</ul>";
                }
                else if (elem.type === "ORDERED_LIST") {
                    var children = elem.children
                        .map(function (child) { return createNode(child); })
                        .join("");
                    return "<ol class=\"gdr-node\" data-gdr-node data-gdr-list data-node-id=\"" + elem.id + "\">" + children + "</ol>";
                }
                else {
                    return createNode(elem);
                }
            })
                .join("") + "</article>\n        ";
            return htmlString;
        },
        enumerable: false,
        configurable: true
    });
    return GoogleDocsRenderer;
}());
exports.default = GoogleDocsRenderer;
//# sourceMappingURL=GoogleDocsRenderer.js.map