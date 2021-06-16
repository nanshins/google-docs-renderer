import { docs_v1 } from "googleapis";
export declare type ReactGoogleDocsProps = {
    title?: string;
    content?: docs_v1.Schema$StructuralElement[];
};
export declare type ELEMENT_TYPES = "PARAGRAPH" | "TABLE_OF_CONTENTS" | "TABLE" | "SECTION_BREAK";
export declare type PARAGRAPH_ELEMENT_TYPES = "PARAGRAPH" | "LIST_CHILD" | "HEADING_1" | "HEADING_2" | "HEADING_3" | "HEADING_4" | "HEADING_5" | "HEADING_6";
export declare type LIST_ELEMENT_TYPES = "UNORDERED_LIST" | "ORDERED_LIST";
export declare type TABLE_OF_CONTENTS_TYPES = "TABLE_OF_CONTENTS";
export declare type ParsedStructuralElement = {
    type: ELEMENT_TYPES;
    element: docs_v1.Schema$SectionBreak | docs_v1.Schema$Paragraph | docs_v1.Schema$Table | docs_v1.Schema$TableOfContents;
};
export declare type ParseStructuralElement = (element: docs_v1.Schema$StructuralElement) => ParsedStructuralElement | null;
export declare type StructuralElementFilter = (elements: docs_v1.Schema$StructuralElement[]) => ParsedStructuralElement[];
export declare type ParsedList = {
    key: string;
    properties: docs_v1.Schema$ListProperties;
};
export declare type ParsedParagraphElement = {
    type: PARAGRAPH_ELEMENT_TYPES;
    id: string;
    element: docs_v1.Schema$Paragraph;
};
export declare type ParsedListElement = {
    type: LIST_ELEMENT_TYPES;
    id: string;
    elements: ParsedParagraphElement[];
};
export declare type ParsedParagraphs = (ParsedParagraphElement | ParsedListElement)[];
export declare type ParagraphFilter = (lists: {
    [key: string]: docs_v1.Schema$List;
}, elements: ParsedStructuralElement[]) => ParsedParagraphs;
export declare type ObjectMappingFilterArgs = {
    elements: ParsedParagraphs;
    inlineObjects: {
        [key: string]: docs_v1.Schema$InlineObject;
    };
};
export declare type GdrDocument = (ListElement | ParagraphElement)[];
export declare type ObjectMappingFilter = (args: ObjectMappingFilterArgs) => GdrDocument;
export declare type ListElement = {
    type: LIST_ELEMENT_TYPES;
    id: string;
    children: ParagraphElement[];
};
export declare type ParagraphElement = {
    type: PARAGRAPH_ELEMENT_TYPES;
    id: string;
    children: TextElement[];
};
export declare type TextElement = {
    text: string;
    style: TextStyleMap;
    link?: {
        url: string;
        style: TextStyleMap;
    };
    linkUrl?: string;
    hr?: {
        style: TextStyleMap;
    };
    object?: {
        property: ObjectProperties;
        style: TextStyleMap;
    };
};
export declare type ObjectProperties = {
    title: string;
    description: string;
    marginTop: number;
    marginBottom: number;
    marginLeft: number;
    marginRight: number;
    width: number;
    height: number;
    angle?: number;
    brightness?: number;
    contrast?: number;
    transparency?: number;
    sourceUri?: string;
    contentUri?: string;
    cropAngle?: number;
    cropOffsetTop?: number;
    cropOffsetBottom?: number;
    cropOffsetLeft?: number;
    cropOffsetRight?: number;
};
export declare type ParseRgbColor = (rgbColor: docs_v1.Schema$RgbColor) => string;
export declare type ParseTextStyle = (style: docs_v1.Schema$TextStyle) => TextStyleMap;
export declare type TextStyleMap = {
    backgroundColor?: string;
    foregroundColor?: string;
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
};
