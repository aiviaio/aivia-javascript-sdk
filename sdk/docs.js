const generator = require("jsdoc-to-markdown");
const fs = require("fs");

generator.render({ files: "src/components/*.js", separators: true }).then(docs => {
  fs.writeFile("./README.md", docs, () => {});
});
