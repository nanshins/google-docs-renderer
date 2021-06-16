"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.structuralElementFilter = void 0;
var parseStructuralElementTypes = function (element) {
    try {
        if (element.paragraph) {
            return {
                type: "PARAGRAPH",
                element: element.paragraph
            };
        }
        else if (element.tableOfContents) {
            return null;
        }
        else if (element.table) {
            return {
                type: "TABLE",
                element: element.table
            };
        }
        else if (element.sectionBreak) {
            return {
                type: "SECTION_BREAK",
                element: element.sectionBreak
            };
        }
        else {
            return null;
        }
    }
    catch (e) {
        console.error(e);
        return null;
    }
};
var structuralElementFilter = function (elements) {
    var parsedElements = elements.map(function (element) {
        return parseStructuralElementTypes(element);
    });
    return parsedElements.filter(Boolean);
};
exports.structuralElementFilter = structuralElementFilter;
//# sourceMappingURL=structuralElementFilter.js.map