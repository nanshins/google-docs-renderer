import { docs_v1 } from "googleapis";
import { v4 } from "uuid";
import {
    GdrDocument,
    ParagraphElement,
    ParsedStructuralElement,
    TextElement,
    TextStyleMap
} from "../types/GoogleDocsRenderer";
import { objectMappingFilter } from "./filters/objectMappingFilter";
import { paragraphFilter } from "./filters/paragraphElementFilter";
import { structuralElementFilter } from "./filters/structuralElementFilter";

export default class GoogleDocsRenderer {
    private modifiedDocument: GdrDocument;

    private parse(document: {
        content: docs_v1.Schema$StructuralElement[];
        lists: {
            [key: string]: docs_v1.Schema$List;
        };
        inlineObjects: {
            [key: string]: docs_v1.Schema$InlineObject;
        };
    }) {
        let filteredStructuralElements: ParsedStructuralElement[] = [];
        if (document.content) {
            filteredStructuralElements = structuralElementFilter(
                document.content
            );
        }
        const filteredParagraphs = paragraphFilter(
            document.lists,
            filteredStructuralElements
        );
        const mappedObjects = objectMappingFilter({
            elements: filteredParagraphs,
            inlineObjects: document.inlineObjects
        });
        return mappedObjects;
    }

    constructor(document: docs_v1.Schema$Document) {
        this.modifiedDocument = this.parse({
            content: document.body?.content || [],
            lists: document.lists || {},
            inlineObjects: document.inlineObjects || {}
        });
    }

    get document(): GdrDocument {
        return this.modifiedDocument;
    }

    get html(): string {
        const createStyle = (style: TextStyleMap) => {
            return `background-color: ${style.backgroundColor || ""}; color: ${
                style.foregroundColor || ""
            }; ${style.underline ? "text-decoration: underline" : ""}`;
        };
        const createLeaf = (child: TextElement) => {
            if (child.hr) {
                return `<hr class="gdr-leaf" data-gdr-leaf style="${createStyle(
                    child.style
                )}" />`;
            } else if (child.link) {
                return `<a class="gdr-leaf" data-gdr-leaf href="${
                    child.link.url
                }" style="${createStyle(child.style)}">${child.text}</a>`;
            } else if (child.object) {
                return `<img class="gdr-leaf" data-gdr-leaf src="${
                    child.object.property.sourceUri ||
                    child.object.property.contentUri
                }" alt="${child.object.property.title}" style="${createStyle(
                    child.style
                )}" />`;
            } else if (child.style.bold && child.style.italic) {
                return `<b class="gdr-leaf" data-gdr-leaf><i class="gdr-leaf" data-gdr-leaf style="${createStyle(
                    child.style
                )}">${child.text}</i></b>`;
            } else if (child.style.bold) {
                return `<b class="gdr-leaf" data-gdr-leaf style="${createStyle(
                    child.style
                )}">${child.text}</b>`;
            } else if (child.style.italic) {
                return `<i class="gdr-leaf" data-gdr-leaf style="${createStyle(
                    child.style
                )}">${child.text}</i>`;
            } else {
                return `<span class="gdr-leaf" data-gdr-leaf style="${createStyle(
                    child.style
                )}">${child.text}</span>`;
            }
        };
        const createNode = (node: ParagraphElement) => {
            const children = node.children
                .map((child) => createLeaf(child))
                .join("");
            if (node.type === "HEADING_1") {
                return `<h1 class="gdr-node" data-gdr-node data-node-id="${node.id}">${children}</h1>`;
            } else if (node.type === "HEADING_2") {
                return `<h2 class="gdr-node" data-gdr-node data-node-id="${node.id}">${children}</h2>`;
            } else if (node.type === "HEADING_3") {
                return `<h3 class="gdr-node" data-gdr-node data-node-id="${node.id}">${children}</h3>`;
            } else if (node.type === "HEADING_4") {
                return `<h4 class="gdr-node" data-gdr-node data-node-id="${node.id}">${children}</h4>`;
            } else if (node.type === "HEADING_5") {
                return `<h5 class="gdr-node" data-gdr-node data-node-id="${node.id}">${children}</h5>`;
            } else if (node.type === "HEADING_6") {
                return `<h6 class="gdr-node" data-gdr-node data-node-id="${node.id}">${children}</h6>`;
            } else if (node.type === "LIST_CHILD") {
                return `<li class="gdr-node" data-gdr-node data-node-id="${node.id}">${children}</li>`;
            } else {
                return `<p class="gdr-node" data-gdr-node data-node-id="${node.id}">${children}</p>`;
            }
        };
        const htmlString = `
        <article class="gdr-document" data-gdr-document data-article-id="${v4()}">${this.modifiedDocument
            .map((elem) => {
                if (elem.type === "UNORDERED_LIST") {
                    const children = elem.children
                        .map((child) => createNode(child))
                        .join("");
                    return `<ul class="gdr-node" data-gdr-node data-gdr-list data-node-id="${elem.id}">${children}</ul>`;
                } else if (elem.type === "ORDERED_LIST") {
                    const children = elem.children
                        .map((child) => createNode(child))
                        .join("");
                    return `<ol class="gdr-node" data-gdr-node data-gdr-list data-node-id="${elem.id}">${children}</ol>`;
                } else {
                    return createNode(elem as ParagraphElement);
                }
            })
            .join("")}</article>
        `;
        return htmlString;
    }
}

export * from "../types/GoogleDocsRenderer";
