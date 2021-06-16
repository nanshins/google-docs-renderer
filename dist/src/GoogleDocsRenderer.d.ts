import { docs_v1 } from "googleapis";
import { GdrDocument } from "../types/GoogleDocsRenderer";
export default class GoogleDocsRenderer {
    private modifiedDocument;
    private parse;
    constructor(document: docs_v1.Schema$Document);
    get document(): GdrDocument;
    get html(): string;
}
