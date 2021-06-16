"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paragraphFilter = void 0;
var uuid_1 = require("uuid");
var paragraphFilter = function (lists, elements) {
    var listKeys = new Set();
    var listElements = [];
    var parsedParagraphs = elements.map(function (paragraph) {
        var _a;
        if (paragraph.type === "PARAGRAPH") {
            var element = paragraph.element;
            if (element.bullet && element.bullet.listId) {
                var listKey_1 = element.bullet.listId;
                if (listKeys.has(listKey_1)) {
                    var listProperties = lists[listKey_1].listProperties;
                    if (listProperties && listProperties.nestingLevels) {
                        var parent_1 = listElements.filter(function (list) { return list.id === listKey_1; })[0];
                        parent_1.elements.push({
                            type: "LIST_CHILD",
                            id: uuid_1.v4(),
                            element: element
                        });
                    }
                    return null;
                }
                else {
                    var listProperties = lists[listKey_1].listProperties;
                    if (listProperties && listProperties.nestingLevels) {
                        listKeys.add(listKey_1);
                        var listType = (listProperties === null || listProperties === void 0 ? void 0 : listProperties.nestingLevels[0].glyphType) ===
                            "DECIMAL"
                            ? "ORDERED_LIST"
                            : "UNORDERED_LIST";
                        var listChildren = [];
                        var parsedElement = {
                            type: listType,
                            id: listKey_1,
                            elements: listChildren
                        };
                        listElements.push(parsedElement);
                        listChildren.push({
                            type: "LIST_CHILD",
                            id: uuid_1.v4(),
                            element: element
                        });
                        return parsedElement;
                    }
                    return null;
                }
            }
            else {
                if ((_a = element.paragraphStyle) === null || _a === void 0 ? void 0 : _a.namedStyleType) {
                    var type = "PARAGRAPH";
                    switch (element.paragraphStyle.namedStyleType) {
                        case "NORMAL_TEXT": {
                            type = "PARAGRAPH";
                            break;
                        }
                        case "TITLE": {
                            type = "HEADING_1";
                            break;
                        }
                        case "SUBTITLE": {
                            type = "HEADING_2";
                            break;
                        }
                        case "HEADING_1": {
                            type = "HEADING_1";
                            break;
                        }
                        case "HEADING_2": {
                            type = "HEADING_2";
                            break;
                        }
                        case "HEADING_3": {
                            type = "HEADING_3";
                            break;
                        }
                        case "HEADING_4": {
                            type = "HEADING_4";
                            break;
                        }
                        case "HEADING_5": {
                            type = "HEADING_5";
                            break;
                        }
                        case "HEADING_6": {
                            type = "HEADING_6";
                            break;
                        }
                        default: {
                            type = "PARAGRAPH";
                        }
                    }
                    var parsedElement = {
                        type: type,
                        id: uuid_1.v4(),
                        element: element
                    };
                    return parsedElement;
                }
                return null;
            }
        }
        else if (paragraph.type === "TABLE") {
            return null;
        }
        else if (paragraph.type === "SECTION_BREAK") {
            return null;
        }
        else if (paragraph.type === "TABLE_OF_CONTENTS") {
            return null;
        }
        return null;
    });
    return parsedParagraphs.filter(Boolean);
};
exports.paragraphFilter = paragraphFilter;
//# sourceMappingURL=paragraphElementFilter.js.map