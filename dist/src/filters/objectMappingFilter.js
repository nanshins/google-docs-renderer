"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectMappingFilter = void 0;
var parseRgbColor = function (rgb) {
    return "rgb(" + (rgb.red ? rgb.red * 255 : "0") + ", " + (rgb.blue ? rgb.blue * 255 : "0") + ", " + (rgb.green ? rgb.green * 255 : "0") + ")";
};
var parseTextStyle = function (style) {
    var _a, _b, _c, _d;
    return {
        bold: style.bold || undefined,
        italic: style.italic || undefined,
        strikethrough: style.strikethrough || undefined,
        underline: style.underline || undefined,
        backgroundColor: ((_b = (_a = style.backgroundColor) === null || _a === void 0 ? void 0 : _a.color) === null || _b === void 0 ? void 0 : _b.rgbColor)
            ? parseRgbColor(style.backgroundColor.color.rgbColor)
            : undefined,
        foregroundColor: ((_d = (_c = style.foregroundColor) === null || _c === void 0 ? void 0 : _c.color) === null || _d === void 0 ? void 0 : _d.rgbColor)
            ? parseRgbColor(style.foregroundColor.color.rgbColor)
            : undefined
    };
};
var modifiedObject = function (id, inlineObjects) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    if (!inlineObjects[id]) {
        return null;
    }
    var object = inlineObjects[id];
    if (!(object.inlineObjectProperties &&
        object.inlineObjectProperties.embeddedObject)) {
        return null;
    }
    if (!object.inlineObjectProperties.embeddedObject.imageProperties) {
        return null;
    }
    var title = object.inlineObjectProperties.embeddedObject.title || "";
    var description = object.inlineObjectProperties.embeddedObject.description || "";
    var marginTop = ((_a = object.inlineObjectProperties.embeddedObject.marginTop) === null || _a === void 0 ? void 0 : _a.magnitude) || 0;
    var marginBottom = ((_b = object.inlineObjectProperties.embeddedObject.marginBottom) === null || _b === void 0 ? void 0 : _b.magnitude) ||
        0;
    var marginLeft = ((_c = object.inlineObjectProperties.embeddedObject.marginLeft) === null || _c === void 0 ? void 0 : _c.magnitude) || 0;
    var marginRight = ((_d = object.inlineObjectProperties.embeddedObject.marginRight) === null || _d === void 0 ? void 0 : _d.magnitude) ||
        0;
    var width = ((_f = (_e = object.inlineObjectProperties.embeddedObject.size) === null || _e === void 0 ? void 0 : _e.width) === null || _f === void 0 ? void 0 : _f.magnitude) ||
        0;
    var height = ((_h = (_g = object.inlineObjectProperties.embeddedObject.size) === null || _g === void 0 ? void 0 : _g.height) === null || _h === void 0 ? void 0 : _h.magnitude) ||
        0;
    var angle = object.inlineObjectProperties.embeddedObject.imageProperties.angle ||
        undefined;
    var brightness = object.inlineObjectProperties.embeddedObject.imageProperties
        .brightness || undefined;
    var contrast = object.inlineObjectProperties.embeddedObject.imageProperties.contrast ||
        undefined;
    var transparency = object.inlineObjectProperties.embeddedObject.imageProperties
        .transparency || undefined;
    var sourceUri = object.inlineObjectProperties.embeddedObject.imageProperties
        .sourceUri || undefined;
    var contentUri = object.inlineObjectProperties.embeddedObject.imageProperties
        .contentUri || undefined;
    var cropAngle = ((_j = object.inlineObjectProperties.embeddedObject.imageProperties
        .cropProperties) === null || _j === void 0 ? void 0 : _j.angle) || undefined;
    var cropOffsetTop = ((_k = object.inlineObjectProperties.embeddedObject.imageProperties
        .cropProperties) === null || _k === void 0 ? void 0 : _k.offsetTop) || undefined;
    var cropOffsetBottom = ((_l = object.inlineObjectProperties.embeddedObject.imageProperties
        .cropProperties) === null || _l === void 0 ? void 0 : _l.offsetBottom) || undefined;
    var cropOffsetLeft = ((_m = object.inlineObjectProperties.embeddedObject.imageProperties
        .cropProperties) === null || _m === void 0 ? void 0 : _m.offsetLeft) || undefined;
    var cropOffsetRight = ((_o = object.inlineObjectProperties.embeddedObject.imageProperties
        .cropProperties) === null || _o === void 0 ? void 0 : _o.offsetRight) || undefined;
    return {
        title: title,
        description: description,
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
        width: width,
        height: height,
        angle: angle,
        brightness: brightness,
        contrast: contrast,
        transparency: transparency,
        sourceUri: sourceUri,
        contentUri: contentUri,
        cropAngle: cropAngle,
        cropOffsetTop: cropOffsetTop,
        cropOffsetBottom: cropOffsetBottom,
        cropOffsetLeft: cropOffsetLeft,
        cropOffsetRight: cropOffsetRight
    };
};
var modifiedTextElement = function (e, inlineObjects) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    var hasLink = !!((_c = (_b = (_a = e.textRun) === null || _a === void 0 ? void 0 : _a.textStyle) === null || _b === void 0 ? void 0 : _b.link) === null || _c === void 0 ? void 0 : _c.url);
    var hasObject = !!((_d = e.inlineObjectElement) === null || _d === void 0 ? void 0 : _d.inlineObjectId);
    var hasHr = !!e.horizontalRule;
    var text = ((_e = e.textRun) === null || _e === void 0 ? void 0 : _e.content) || "";
    var style = ((_f = e.textRun) === null || _f === void 0 ? void 0 : _f.textStyle)
        ? parseTextStyle((_g = e.textRun) === null || _g === void 0 ? void 0 : _g.textStyle)
        : {};
    var link = hasLink
        ? {
            url: (_k = (_j = (_h = e.textRun) === null || _h === void 0 ? void 0 : _h.textStyle) === null || _j === void 0 ? void 0 : _j.link) === null || _k === void 0 ? void 0 : _k.url,
            style: ((_l = e.textRun) === null || _l === void 0 ? void 0 : _l.textStyle)
                ? parseTextStyle(e.textRun.textStyle)
                : {}
        }
        : undefined;
    var verifiedObject = hasObject
        ? modifiedObject((_m = e.inlineObjectElement) === null || _m === void 0 ? void 0 : _m.inlineObjectId, inlineObjects)
        : null;
    var object = hasObject && verifiedObject
        ? {
            property: verifiedObject,
            style: ((_o = e.inlineObjectElement) === null || _o === void 0 ? void 0 : _o.textStyle)
                ? parseTextStyle(e.inlineObjectElement.textStyle)
                : {}
        }
        : undefined;
    var hr = hasHr
        ? {
            style: ((_p = e.horizontalRule) === null || _p === void 0 ? void 0 : _p.textStyle)
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
};
var objectMappingFilter = function (_a) {
    var elements = _a.elements, inlineObjects = _a.inlineObjects;
    return elements.map(function (elem) {
        if (elem.type === "ORDERED_LIST" || elem.type === "UNORDERED_LIST") {
            var _elem = elem;
            var listChildren = _elem.elements.map(function (item) {
                var _elements = item.element.elements;
                var children = [];
                if (_elements) {
                    var mapped = _elements.map(function (e) {
                        var textElement = modifiedTextElement(e, inlineObjects);
                        return textElement;
                    });
                    var filtered = mapped.filter(Boolean);
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
        }
        else {
            var _elem = elem;
            var _elements = _elem.element.elements;
            var pChildren = [];
            if (_elements) {
                var mapped = _elements.map(function (e) {
                    var textElement = modifiedTextElement(e, inlineObjects);
                    return textElement;
                });
                var filtered = mapped.filter(Boolean);
                pChildren = filtered;
            }
            return {
                type: _elem.type,
                id: _elem.id,
                children: pChildren
            };
        }
    });
};
exports.objectMappingFilter = objectMappingFilter;
//# sourceMappingURL=objectMappingFilter.js.map