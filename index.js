const fs = require("fs-extra"); 
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

const folderPath = "./src";
const allClasses = new Set(); 

async function processFile(filePath) {
  const code = await fs.readFile(filePath, "utf-8"); 
  const ast = parser.parse(code, {
    sourceType: "module", 
    plugins: ["jsx"], 
  });

  const customClasses = new Set(); 

  traverse(ast, {
    JSXAttribute(path) {
      if (path.node.name.name === "className") {
        const classValue = path.node.value;

        if (!classValue) return;

        if (classValue.type === "StringLiteral") {
          const classes = classValue.value.split(/\s+/);
          classes.forEach((cls) => {
            if (/\[.*?\]/.test(cls)) {
              customClasses.add(cls);
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
                  customClasses.add(cls);
                  allClasses.add(cls);
                }
              });
            }
          }
      }
    },
  });

//   if (customClasses.size > 0) {
//     console.log(`Extracted from ${filePath}:`, Array.from(customClasses));
//     const newCode = generator(ast).code; 
//     await fs.writeFile(filePath, newCode); 
//   }
}

async function processFolder(folderPath) {
  const files = await fs.readdir(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stat = await fs.stat(filePath);

    if (stat.isFile() && /\.(js|jsx|tsx)$/.test(file)) {
      await processFile(filePath);
    }
  }

  if (allClasses.size > 0) {
    fs.writeFileSync(
      "output/extracted-tailwind-classes.json",
      JSON.stringify([...allClasses], null, 2)
    );
    console.log(
      "All custom classes saved to extracted-tailwind-classes.json"
    );
  }
}

processFolder(folderPath)
  .then(() => console.log("✅ All files processed!"))
  .catch((err) => console.error("❌ Error:", err));
