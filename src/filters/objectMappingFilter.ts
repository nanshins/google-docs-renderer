import { docs_v1 } from "googleapis";
import {
    GdrDocument,
    ObjectProperties,
    ParagraphElement,
    ParsedListElement,
    ParsedParagraphElement,
    ParsedParagraphs,
    TextElement,
    TextStyleMap
} from "../../types/GoogleDocsRenderer";

function parseRgbColor(rgb: docs_v1.Schema$RgbColor): string {
    return `rgb(${rgb.red ? rgb.red * 255 : "0"}, ${
        rgb.blue ? rgb.blue * 255 : "0"
    }, ${rgb.green ? rgb.green * 255 : "0"})`;
}

function parseTextStyle(style: docs_v1.Schema$TextStyle): TextStyleMap {
    return {
        bold: style.bold || undefined,
        italic: style.italic || undefined,
        strikethrough: style.strikethrough || undefined,
        underline: style.underline || undefined,
        backgroundColor: style.backgroundColor?.color?.rgbColor
            ? parseRgbColor(style.backgroundColor.color.rgbColor)
            : undefined,
        foregroundColor: style.foregroundColor?.color?.rgbColor
            ? parseRgbColor(style.foregroundColor.color.rgbColor)
            : undefined
    };
}

function modifiedObject(
    id: string,
    inlineObjects: {
        [key: string]: docs_v1.Schema$InlineObject;
    }
): ObjectProperties | null {
    if (!inlineObjects[id]) {
        return null;
    }

    const object = inlineObjects[id];
    if (
        !(
            object.inlineObjectProperties &&
            object.inlineObjectProperties.embeddedObject
        )
    ) {
        return null;
    }

    if (!object.inlineObjectProperties.embeddedObject.imageProperties) {
        // only images
        return null;
    }

    const title = object.inlineObjectProperties.embeddedObject.title || "";
    const description =
        object.inlineObjectProperties.embeddedObject.description || "";
    const marginTop =
        object.inlineObjectProperties.embeddedObject.marginTop?.magnitude || 0;
    const marginBottom =
        object.inlineObjectProperties.embeddedObject.marginBottom?.magnitude ||
        0;
    const marginLeft =
        object.inlineObjectProperties.embeddedObject.marginLeft?.magnitude || 0;
    const marginRight =
        object.inlineObjectProperties.embeddedObject.marginRight?.magnitude ||
        0;
    const width =
        object.inlineObjectProperties.embeddedObject.size?.width?.magnitude ||
        0;
    const height =
        object.inlineObjectProperties.embeddedObject.size?.height?.magnitude ||
        0;
    const angle =
        object.inlineObjectProperties.embeddedObject.imageProperties.angle ||
        undefined;
    const brightness =
        object.inlineObjectProperties.embeddedObject.imageProperties
            .brightness || undefined;
    const contrast =
        object.inlineObjectProperties.embeddedObject.imageProperties.contrast ||
        undefined;
    const transparency =
        object.inlineObjectProperties.embeddedObject.imageProperties
            .transparency || undefined;
    const sourceUri =
        object.inlineObjectProperties.embeddedObject.imageProperties
            .sourceUri || undefined;
    const contentUri =
        object.inlineObjectProperties.embeddedObject.imageProperties
            .contentUri || undefined;
    const cropAngle =
        object.inlineObjectProperties.embeddedObject.imageProperties
            .cropProperties?.angle || undefined;
    const cropOffsetTop =
        object.inlineObjectProperties.embeddedObject.imageProperties
            .cropProperties?.offsetTop || undefined;
    const cropOffsetBottom =
        object.inlineObjectProperties.embeddedObject.imageProperties
            .cropProperties?.offsetBottom || undefined;
    const cropOffsetLeft =
        object.inlineObjectProperties.embeddedObject.imageProperties
            .cropProperties?.offsetLeft || undefined;
    const cropOffsetRight =
        object.inlineObjectProperties.embeddedObject.imageProperties
            .cropProperties?.offsetRight || undefined;
    return {
        title,
        description,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        width,
        height,
        angle,
        brightness,
        contrast,
        transparency,
        sourceUri,
        contentUri,
        cropAngle,
        cropOffsetTop,
        cropOffsetBottom,
        cropOffsetLeft,
        cropOffsetRight
    };
}

function modifiedTextElement(
    e: docs_v1.Schema$ParagraphElement,
    inlineObjects: {
        [key: string]: docs_v1.Schema$InlineObject;
    }
): TextElement {
    const hasLink = !!e.textRun?.textStyle?.link?.url;
    const hasObject = !!e.inlineObjectElement?.inlineObjectId;
    const hasHr = !!e.horizontalRule;
    const text = e.textRun?.content || "";
    const style = e.textRun?.textStyle
        ? parseTextStyle(e.textRun?.textStyle)
        : {};
    const link = hasLink
        ? {
              url: e.textRun?.textStyle?.link?.url as string,
              style: e.textRun?.textStyle
                  ? parseTextStyle(e.textRun.textStyle)
                  : {}
          }
        : undefined;
    const verifiedObject = hasObject
        ? modifiedObject(
              e.inlineObjectElement?.inlineObjectId as string,
              inlineObjects
          )
        : null;
    const object =
        hasObject && verifiedObject
            ? {
                  property: verifiedObject,
                  style: e.inlineObjectElement?.textStyle
                      ? parseTextStyle(e.inlineObjectElement.textStyle)
                      : {}
              }
            : undefined;
    const hr = hasHr
        ? {
              style: e.horizontalRule?.textStyle
                  ? parseTextStyle(e.horizontalRule.textStyle)
                  : {}
          }
        : undefined;
    return {
        text: text,
        style: style,
        link: hasLink ? link : undefined,
        hr: hasHr ? hr : undefined,
        object: hasObject ? object : undefined
    };
}

export function objectMappingFilter({
    elements,
    inlineObjects
}: {
    elements: ParsedParagraphs;
    inlineObjects: {
        [key: string]: docs_v1.Schema$InlineObject;
    };
}): GdrDocument {
    return elements.map((elem) => {
        if (elem.type === "ORDERED_LIST" || elem.type === "UNORDERED_LIST") {
            const _elem = elem as ParsedListElement;
            const _children = _elem.elements as ParsedParagraphElement[];
            const listChildren: ParagraphElement[] = _children.map((item) => {
                const _elements = item.element.elements;
                let children: TextElement[] = [];
                if (_elements) {
                    const mapped = _elements.map((e) => {
                        const textElement: TextElement = modifiedTextElement(
                            e,
                            inlineObjects
                        );
                        return textElement;
                    });
                    const filtered = mapped.filter(Boolean as any);
                    children = filtered;
                }
                return {
                    type: item.type,
                    id: item.id,
                    children: children
                };
            });
            return {
                type: _elem.type,
                id: _elem.id,
                children: listChildren
            };
        } else {
            const _elem = elem as ParsedParagraphElement;
            const _elements = _elem.element.elements;
            let pChildren: TextElement[] = [];
            if (_elements) {
                const mapped = _elements.map((e) => {
                    const textElement: TextElement = modifiedTextElement(
                        e,
                        inlineObjects
                    );
                    return textElement;
                });
                const filtered = mapped.filter(Boolean);
                pChildren = filtered;
            }
            return {
                type: _elem.type,
                id: _elem.id,
                children: pChildren
            };
        }
    });
}
