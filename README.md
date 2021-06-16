# Google docs renderer

...in development.

## Usage
```sh
$ git clone https://github.com/Nanshin-Seisakujo/google-docs-renderer
```
```ts
import GDR from "google-react-renderer";
import { google } from "googleapis";

...
// fetch your google document
const gdr = new GDR(doc);

// get HTML
const html = gdr.html;

// get document map
const map = gdr.document;
```