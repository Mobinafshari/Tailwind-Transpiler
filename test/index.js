const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const fs = require("fs-extra");
const generator = require("@babel/generator").default;

const folderPath = "../src/Second.jsx";

async function readFileAndParse() {
  try {
    const file = await fs.readFile(folderPath, "utf-8");
    const ast = parser.parse(file, {
      sourceType: "module",
      plugins: ["jsx"],
    });

    traverse(ast, {
      JSXAttribute(path) {
                if (path.node.name.name === "className") {
                    // console.log(path.node.value);
                }
      },
    });
    const newCode = generator(ast).code;
    console.log(newCode)
  } catch (error) {
    console.error("Error reading the file:", error);
  }
}

readFileAndParse();
