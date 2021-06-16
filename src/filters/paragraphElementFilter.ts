import { docs_v1 } from "googleapis";
import { v4 } from "uuid";
import {
    LIST_ELEMENT_TYPES,
    ParagraphFilter,
    PARAGRAPH_ELEMENT_TYPES,
    ParsedListElement,
    ParsedParagraphElement
} from "../../types/GoogleDocsRenderer";

export const paragraphFilter: ParagraphFilter = (lists, elements) => {
    const listKeys = new Set<string>();
    const listElements: ParsedListElement[] = [];
    const parsedParagraphs = elements.map((paragraph) => {
        if (paragraph.type === "PARAGRAPH") {
            const element = paragraph.element as docs_v1.Schema$Paragraph;
            // list
            if (element.bullet && element.bullet.listId) {
                const listKey = element.bullet.listId;
                if (listKeys.has(listKey)) {
                    const listProperties = lists[listKey].listProperties;
                    if (listProperties && listProperties.nestingLevels) {
                        const parent = listElements.filter(
                            (list) => list.id === listKey
                        )[0];
                        parent.elements.push({
                            type: "LIST_CHILD",
                            id: v4(),
                            element: element
                        });
                    }
                    return null;
                } else {
                    const listProperties = lists[listKey].listProperties;
                    if (listProperties && listProperties.nestingLevels) {
                        listKeys.add(listKey);
                        const listType: LIST_ELEMENT_TYPES =
                            listProperties?.nestingLevels[0].glyphType ===
                            "DECIMAL"
                                ? "ORDERED_LIST"
                                : "UNORDERED_LIST";
                        const listChildren: ParsedParagraphElement[] = [];
                        const parsedElement: ParsedListElement = {
                            type: listType,
                            id: listKey,
                            elements: listChildren
                        };
                        listElements.push(parsedElement);
                        listChildren.push({
                            type: "LIST_CHILD",
                            id: v4(),
                            element: element
                        });
                        return parsedElement;
                    }
                    return null;
                }
            } else {
                // paragraph
                if (element.paragraphStyle?.namedStyleType) {
                    let type: PARAGRAPH_ELEMENT_TYPES = "PARAGRAPH";
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
                    const parsedElement: ParsedParagraphElement = {
                        type: type,
                        id: v4(),
                        element: element
                    };
                    return parsedElement;
                }
                return null;
            }
        } else if (paragraph.type === "TABLE") {
            // incompatible elements
            return null;
        } else if (paragraph.type === "SECTION_BREAK") {
            // incompatible elements
            return null;
        } else if (paragraph.type === "TABLE_OF_CONTENTS") {
            // incompatible elements
            return null;
        }
        return null;
    });
    return parsedParagraphs.filter(Boolean as any);
};
