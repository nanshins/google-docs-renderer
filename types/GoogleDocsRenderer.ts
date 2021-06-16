import { docs_v1 } from "googleapis";

export type ReactGoogleDocsProps = {
    title?: string;
    content?: docs_v1.Schema$StructuralElement[];
};

// consts
export type ELEMENT_TYPES =
    | "PARAGRAPH"
    | "TABLE_OF_CONTENTS"
    | "TABLE"
    | "SECTION_BREAK";

export type PARAGRAPH_ELEMENT_TYPES =
    | "PARAGRAPH"
    | "LIST_CHILD"
    | "HEADING_1"
    | "HEADING_2"
    | "HEADING_3"
    | "HEADING_4"
    | "HEADING_5"
    | "HEADING_6";

export type LIST_ELEMENT_TYPES = "UNORDERED_LIST" | "ORDERED_LIST";

export type TABLE_OF_CONTENTS_TYPES = "TABLE_OF_CONTENTS";

// parse structural elements
export type ParsedStructuralElement = {
    type: ELEMENT_TYPES;
    element:
        | docs_v1.Schema$SectionBreak
        | docs_v1.Schema$Paragraph
        | docs_v1.Schema$Table
        | docs_v1.Schema$TableOfContents;
};

export type ParseStructuralElement = (
    element: docs_v1.Schema$StructuralElement
) => ParsedStructuralElement | null;

export type StructuralElementFilter = (
    elements: docs_v1.Schema$StructuralElement[]
) => ParsedStructuralElement[];

// parse paragraph elements
export type ParsedList = {
    key: string;
    properties: docs_v1.Schema$ListProperties;
};

export type ParsedParagraphElement = {
    type: PARAGRAPH_ELEMENT_TYPES;
    id: string;
    element: docs_v1.Schema$Paragraph;
};

export type ParsedListElement = {
    type: LIST_ELEMENT_TYPES;
    id: string;
    elements: ParsedParagraphElement[];
};

export type ParsedParagraphs = (ParsedParagraphElement | ParsedListElement)[];

export type ParagraphFilter = (
    lists: {
        [key: string]: docs_v1.Schema$List;
    },
    elements: ParsedStructuralElement[]
) => ParsedParagraphs;

// object mapping
export type ObjectMappingFilterArgs = {
    elements: ParsedParagraphs;
    inlineObjects: {
        [key: string]: docs_v1.Schema$InlineObject;
    };
};

export type GdrDocument = (ListElement | ParagraphElement)[];

export type ObjectMappingFilter = (
    args: ObjectMappingFilterArgs
) => GdrDocument;

export type ListElement = {
    type: LIST_ELEMENT_TYPES;
    id: string;
    children: ParagraphElement[];
};

export type ParagraphElement = {
    type: PARAGRAPH_ELEMENT_TYPES;
    id: string;
    children: TextElement[];
};

export type TextElement = {
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

export type ObjectProperties = {
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

export type ParseRgbColor = (rgbColor: docs_v1.Schema$RgbColor) => string;

export type ParseTextStyle = (style: docs_v1.Schema$TextStyle) => TextStyleMap;

export type TextStyleMap = {
    backgroundColor?: string;
    foregroundColor?: string;
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
};
