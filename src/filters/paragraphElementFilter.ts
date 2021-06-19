import { docs_v1 } from "googleapis";
import { v4 } from "uuid";
import {
    LIST_ELEMENT_TYPES,
    PARAGRAPH_ELEMENT_TYPES,
    ParsedListElement,
    ParsedParagraphElement,
    ParsedParagraphs,
    ParsedStructuralElement
} from "../../types/GoogleDocsRenderer";

export function paragraphFilter(
    lists: {
        [key: string]: docs_v1.Schema$List;
    },
    elements: ParsedStructuralElement[]
): ParsedParagraphs {
    const listKeys = new Set<string>();
    const listElements: ParsedListElement[] = [];
    const parsedParagraphs = elements.map((paragraph) => {
        if (paragraph.type === "PARAGRAPH") {
            const element = paragraph.element as docs_v1.Schema$Paragraph;
            if (element.bullet && element.bullet.listId) {
                // list
                // リストIDが既出か否かの判定
                const listKey = element.bullet.listId;
                const listProperties = lists[listKey].listProperties;
                const nestingLevel = element.bullet.nestingLevel || 0;
                if (!listProperties || !listProperties.nestingLevels) {
                    // not list properties
                    return null;
                }
                if (listKeys.has(listKey)) {
                    // リストIDが既出の場合
                    const parent = listElements.filter(
                        (list) => list.listKey === listKey
                    )[0];
                    parent.elements.push({
                        type: "LIST_CHILD",
                        id: v4(),
                        element: element
                    });
                    return null;
                } else {
                    // リストIDが初出の場合
                    listKeys.add(listKey);
                    const listType: LIST_ELEMENT_TYPES =
                        listProperties.nestingLevels[0].glyphType === "DECIMAL"
                            ? "ORDERED_LIST"
                            : "UNORDERED_LIST";
                    const listChildren: ParsedParagraphElement[] = [];
                    listChildren.push({
                        type: "LIST_CHILD",
                        id: v4(),
                        element: element
                    });
                    const parsedElement: ParsedListElement = {
                        type: listType,
                        listKey: listKey,
                        nestingLevel: nestingLevel,
                        id: v4(),
                        elements: listChildren
                    };
                    listElements.push(parsedElement);
                    return parsedElement;
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
    const filteredParagraphs = parsedParagraphs.filter(
        Boolean as any
    ) as ParsedParagraphs;
    return filteredParagraphs;
}
