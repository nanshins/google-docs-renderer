import path from "path";
import express from "express";
import dotenv from "dotenv";
import { google } from "googleapis";
import GDR from "../src/GoogleDocsRenderer";

dotenv.config();

const GOOGLE_DRIVE_API_CLIENT_EMAIL =
    process.env.GOOGLE_DRIVE_API_CLIENT_EMAIL ?? "";
const GOOGLE_DRIVE_API_PRIVATE_KEY =
    process.env.GOOGLE_DRIVE_API_PRIVATE_KEY ?? "";
const GOOGLE_DRIVE_API_PRIVATE_KEY_ID =
    process.env.GOOGLE_DRIVE_API_PRIVATE_KEY_ID ?? "";

function authorize() {
    const jwtClient = new google.auth.JWT(
        GOOGLE_DRIVE_API_CLIENT_EMAIL,
        undefined,
        GOOGLE_DRIVE_API_PRIVATE_KEY.replace(/\\n/g, "\n"),
        [
            "https://www.googleapis.com/auth/drive.readonly",
            "https://www.googleapis.com/auth/documents.readonly"
        ],
        undefined,
        GOOGLE_DRIVE_API_PRIVATE_KEY_ID
    );
    jwtClient.authorize((err) => {
        if (err) {
            console.error(err);
        }
    });
    return jwtClient;
}

const app = express();

app.use("/", express.static(path.join(__dirname, "react")));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// list
app.get("/", (_req, res) => {
    const jwtCLient = authorize();
    if (!jwtCLient) {
        res.render("error");
    }
    const drive = google.drive({
        version: "v3",
        auth: jwtCLient
    });
    drive.files
        .list({
            pageSize: 10,
            supportsAllDrives: true,
            supportsTeamDrives: true,
            includeItemsFromAllDrives: true,
            includeTeamDriveItems: true,
            fields: "nextPageToken, files(id, name)",
            q: "mimeType!='application/vnd.google-apps.folder'"
        })
        .then((docs) => {
            res.render("index", {
                files: docs.data.files
            });
        })
        .catch((err) => {
            console.log(err);
            res.render("error");
        });
});

// ejs
app.get("/ejs/:id", (req, res) => {
    const jwtCLient = authorize();
    if (!jwtCLient) {
        res.render("error");
    }
    const docs = google.docs({
        version: "v1",
        auth: jwtCLient
    });
    docs.documents
        .get({
            documentId: req.params.id
        })
        .then((doc) => {
            const gdr = new GDR(doc.data);
            res.render("file", {
                html: gdr.html
            });
        })
        .catch((err) => {
            console.log(err);
            res.render("error");
        });
});

// react
app.get("/react/:id", (req, res) => {
    const jwtCLient = authorize();
    if (!jwtCLient) {
        res.render("error");
    }
    const docs = google.docs({
        version: "v1",
        auth: jwtCLient
    });
    docs.documents
        .get({
            documentId: req.params.id
        })
        .then((doc) => {
            const gdr = new GDR(doc.data);
            res.render("react", {
                json: gdr.document
            });
        })
        .catch((err) => {
            console.log(err);
            res.render("error");
        });
});

// json
app.get("/:id", (req, res) => {
    const jwtCLient = authorize();
    if (!jwtCLient) {
        res.render("error");
    }
    const docs = google.docs({
        version: "v1",
        auth: jwtCLient
    });
    docs.documents
        .get({
            documentId: req.params.id
        })
        .then((doc) => {
            res.json(doc.data);
        })
        .catch((err) => {
            console.log(err);
            res.render("error");
        });
});

app.listen(3000, () => {
    console.log("listen on http://localhost:3000");
});
