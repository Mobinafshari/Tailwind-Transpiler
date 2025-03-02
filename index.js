#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const userProjectDir = process.cwd();
const folderPath = process.argv[2] || "src"; 
const fullFolderPath = path.resolve(userProjectDir, folderPath);
const allClasses = new Set();

async function processFile(filePath) {
  const code = await fs.readFile(filePath, "utf-8");
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx" , "typescript"],
  });

  traverse(ast, {
    JSXAttribute(path) {
      if (path.node.name.name === "className") {
        const classValue = path.node.value;

        if (!classValue) return;

        if (classValue.type === "StringLiteral") {
          const classes = classValue.value.split(/\s+/);
          classes.forEach((cls) => {
            if (/\[.*?\]/.test(cls)) {
              allClasses.add(cls);
            }
          });
        }

        if (classValue.type === "JSXExpressionContainer") {
          const expression = classValue.expression;
          if (expression.type === "TemplateLiteral") {
            let fullClass = "";

            expression.quasis.forEach((quasi, index) => {
              fullClass += quasi.value.raw;
              if (expression.expressions[index]) {
                fullClass += `[${expression.expressions[index].name}]`;
              }
            });

            const classes = fullClass.split(/\s+/);
            classes.forEach((cls) => {
              if (/\[.*?\]/.test(cls)) {
                allClasses.add(cls);
              }
            });
          }
        }
      }
    },
  });
}

async function processFolder(folderPath) {
  const files = await fs.readdir(folderPath);
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      await processFolder(filePath);
    } else if (stat.isFile() && /\.(js|jsx|tsx)$/.test(file)) {
      await processFile(filePath);
    }
  }

  if (allClasses.size > 0) {
  const outputDir = "output";

  fs.ensureDirSync(outputDir);

  const outputPath = path.join(outputDir, "extracted-classes.json");

  fs.writeFileSync(outputPath, JSON.stringify([...allClasses], null, 2));

  console.log("All custom classes saved to extracted-classes.json");
}
}

processFolder(fullFolderPath)
  .then(() => console.log("✅ All files processed!"))
  .catch((err) => console.error("❌ Error:", err));
