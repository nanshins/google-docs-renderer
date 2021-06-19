/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { docs_v1 } from "googleapis";
import type { ParsedStructuralElement } from "../../types/GoogleDocsRenderer";

function parseStructuralElementTypes(
    element: docs_v1.Schema$StructuralElement
): ParsedStructuralElement | null {
    try {
        if (element.paragraph) {
            return {
                type: "PARAGRAPH",
                element: element.paragraph!
            };
        } else if (element.tableOfContents) {
            // incompatible elements
            return null;
        } else if (element.table) {
            return {
                type: "TABLE",
                element: element.table!
            };
        } else if (element.sectionBreak) {
            return {
                type: "SECTION_BREAK",
                element: element.sectionBreak!
            };
        } else {
            // incompatible elements
            return null;
        }
    } catch (e) {
        console.error(e);
        return null;
    }
}

export function structuralElementFilter(
    elements: docs_v1.Schema$StructuralElement[]
): ParsedStructuralElement[] {
    const parsedElements = elements.map((element) =>
        parseStructuralElementTypes(element)
    );
    return parsedElements.filter(Boolean as any);
}
