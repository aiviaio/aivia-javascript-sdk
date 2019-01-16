const generator = require("jsdoc-to-markdown");
const fs = require("fs");

const title = "# [AIVIA JavaScript SDK](https://aivia.io/)";
const badges = `
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/aiviaio/aivia-javscript-sdk/LICENSE)
[![npm version](https://img.shields.io/npm/v/aivia.svg?style=flat)](https://www.npmjs.com/package/aivia)
[![npm version](https://img.shields.io/badge/coverage-93%25-blue.svg)](https://github.com/aiviaio/aivia-javscript-sdk/)

`;

const description = `
JavaScript Wrapper for interaction with AIVIA Protocol. 
`;
const install = `
## Installation
This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 10.0 or higher is required.

\`\`\`bash
  npm install aivia -S
\`\`\`
`;

const example = `
## Example

\`\`\`JavaScript
const AIVIA_SDK = require("aivia"); // es6
const AIVIA_SDK = require("aivia/sdk"); // es5

const ENTRY_POINT = "0x0000000000000000000000000000000000000000" // protocol entry point contract address
const HTTP_PROVIDER = "http://127.0.0.1:8545";
const DEFAULT_GAS_PRICE = 10000000000 // in wei, default value 50000000000 (50 gWei)
const SDK = new AIVIA_SDK(ENTRY_POINT, HTTP_PROVIDER, DEFAULT_GAS_PRICE );
\`\`\`

`;

const head = `
${title} ${badges}
${description}
${install}
${example}
`;

generator.render({ files: "src/**/*.js", separators: true }).then(docs => {
  fs.writeFile("./README.md", head + docs, () => {});
});
