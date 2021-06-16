import { CSSProperties, VFC } from "react";
import { render } from "react-dom";
import { v4 } from "uuid";
import {
    GdrDocument,
    ParagraphElement,
    TextElement,
    TextStyleMap
} from "../../types/GoogleDocsRenderer";

const Leaf: VFC<{ child: TextElement; id: string }> = ({ child, id }) => {
    const style = (style: TextStyleMap): CSSProperties => {
        return {
            backgroundColor: style.backgroundColor,
            color: style.foregroundColor,
            textDecoration: style.underline ? "underline" : undefined
        };
    };
    if (child.hr) {
        return <hr key={id} />;
    } else if (child.link) {
        return (
            <a key={id} href={child.link.url} style={style(child.style)}>
                {child.text}
            </a>
        );
    } else if (child.object) {
        return (
            <img
                key={id}
                src={
                    child.object.property.sourceUri ||
                    child.object.property.contentUri
                }
                alt={
                    child.object.property.title ||
                    child.object.property.description
                }
                style={style(child.style)}
            />
        );
    } else if (child.style.bold && child.style.italic) {
        return (
            <b key={id}>
                <i style={style(child.style)}>{child.text}</i>
            </b>
        );
    } else if (child.style.bold) {
        return (
            <b key={id} style={style(child.style)}>
                {child.text}
            </b>
        );
    } else if (child.style.italic) {
        return (
            <i key={id} style={style(child.style)}>
                {child.text}
            </i>
        );
    } else {
        return (
            <span key={id} style={style(child.style)}>
                {child.text}
            </span>
        );
    }
};

const Node: VFC<{
    node: ParagraphElement;
}> = ({ node }) => {
    const children = node.children.map((child, i) => (
        <Leaf key={`${node.id}[${i}]`} id={`${node.id}[${i}]`} child={child} />
    ));
    if (node.type === "HEADING_1") {
        return (
            <h1 key={node.id} data-id={node.id}>
                {children}
            </h1>
        );
    } else if (node.type === "HEADING_2") {
        return (
            <h2 key={node.id} data-id={node.id}>
                {children}
            </h2>
        );
    } else if (node.type === "HEADING_3") {
        return (
            <h3 key={node.id} data-id={node.id}>
                {children}
            </h3>
        );
    } else if (node.type === "HEADING_4") {
        return (
            <h4 key={node.id} data-id={node.id}>
                {children}
            </h4>
        );
    } else if (node.type === "HEADING_5") {
        return (
            <h5 key={node.id} data-id={node.id}>
                {children}
            </h5>
        );
    } else if (node.type === "HEADING_6") {
        return (
            <h6 key={node.id} data-id={node.id}>
                {children}
            </h6>
        );
    } else if (node.type === "LIST_CHILD") {
        return (
            <li key={node.id} data-id={node.id}>
                {children}
            </li>
        );
    } else {
        return (
            <p key={node.id} data-id={node.id}>
                {children}
            </p>
        );
    }
};

const App: VFC<{
    document: GdrDocument;
}> = ({ document }) => {
    return (
        <article
            id="gdr"
            className="gdr-document"
            data-gdr-document
            data-article-id={v4()}
        >
            {document.map((elem) => {
                switch (elem.type) {
                    case "ORDERED_LIST": {
                        const children = elem.children.map((child) => (
                            <Node node={child} key={child.id} />
                        ));
                        return (
                            <ol key={elem.id} data-list-id={elem.id}>
                                {children}
                            </ol>
                        );
                    }
                    case "UNORDERED_LIST": {
                        const children = elem.children.map((child) => (
                            <Node node={child} key={child.id} />
                        ));
                        return (
                            <ul key={elem.id} data-list-id={elem.id}>
                                {children}
                            </ul>
                        );
                    }
                    default: {
                        return <Node key={elem.id} node={elem} />;
                    }
                }
            })}
        </article>
    );
};

export const main = () => {
    const json = document.getElementById("page-data");
    const docData = JSON.parse(json.textContent) as GdrDocument;
    render(<App document={docData} />, document.getElementById("root"));
};

main();
