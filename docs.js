const generator = require("jsdoc-to-markdown");
const fs = require("fs");

const title = "# [AIVIA JavaScript SDK](https://aivia.io/)";
const badges = `
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/dshm/aivia-sdk/LICENSE)
[![npm version](https://img.shields.io/npm/v/aivia.svg?style=flat)](https://www.npmjs.com/package/aivia)
`;

const install = `
### npm
npm install aivia -S
`;

const head = `
${title}
${badges}
${install}
`;

generator.render({ files: "src/**/*.js", separators: true }).then(docs => {
  fs.writeFile("./README.md", head + docs, () => {});
});
