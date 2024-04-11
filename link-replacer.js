const fs = require("fs");
const path = require("path");

const folderPath = "./test-files";

const jsonFilePath = "./file.json";
const linkReplacements = require(jsonFilePath);
const lowercaseLinks = Object.keys(linkReplacements).reduce((acc, key) => {
  acc[key.toLowerCase()] = linkReplacements[key];
  return acc;
}, {});

var replaced = [];
var noMatch = [];

async function replaceLinksInFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  const updatedContent = content
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, link) => {
      const queryIndex = link.indexOf("?");
      const azureIndex = link.indexOf("azure.com");
      if (queryIndex !== -1 && azureIndex !== -1) {
        const anchor = link.substring(queryIndex + 1);
        const anchorValueIndex = anchor.indexOf("=");

        if (anchorValueIndex !== -1) {
          const value = anchor.substring(anchorValueIndex + 1);
          replaced.push(`replaced ${match} with [${text}](#${value})`);

          return `[${text}](#${value})`;
        } else {
          console.log(`an error has occurred for ${match}`);
        }
      } else {
        const replacement = lowercaseLinks[text.toLowerCase()];
        if (replacement) {
          replaced.push(`replaced ${match} with [${text}](${replacement})`);
          return `[${text}](${replacement})`;
        }
        if (!/\.png|\.svg/i.test(match))
          noMatch.push(`the link ${match} has no replacements`);
        return match;
      }
    })
    .replace(
      /:exclamation:/g,
      "<span style='font-size:20px; color:red;'>!</span>"
    )
    .replace("❗", "<span style='font-size:20px; color:red;'>!</span>")
    .replace("[[_TOSP_]]", "");

  fs.writeFileSync(filePath, updatedContent, "utf8");
  fs.writeFileSync("replaced.json", JSON.stringify(replaced), "utf8");
  fs.writeFileSync("noMatch.json", JSON.stringify(noMatch), "utf8");
}
async function processFolder(folder) {
  const files = await fs.readdirSync(folder);
  files.forEach(async (file) => {
    const filePath = path.join(folder, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      await processFolder(filePath);
    } else if (stats.isFile() && path.extname(file) === ".md") {
      await replaceLinksInFile(filePath);
    }
  });
}

processFolder(folderPath);
console.log("success");

// ids
// const ids = Array.from(document.querySelectorAll("a"))
//   .filter((e) => !!e.id)
//   .map((e) => e.id)
//   .join("\n");

// console.log(ids);
