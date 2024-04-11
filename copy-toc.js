const fs = require("fs");
if (!fs.existsSync("test-files\\CMS-Documentation\\Table-of-Contents.md")) {
  fs.copyFile(
    "Table-of-Contents.md",
    "test-files\\CMS-Documentation\\Table-of-Contents.md",
    (err) => {
      if (err) throw err;
      console.log("File was copied to destination");
    }
  );
}

fs.readFile(
  "test-files\\CMS-Documentation\\.order",
  "utf8",
  function (err, data) {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    let lines = data.split("\n");

    lines =
      lines.filter((line) => !line.includes("PDF-version")) ||
      !line.includes("Table-of-Contents");

    lines.unshift("Table-of-Contents");

    let newData = lines.join("\n");

    fs.writeFile(
      "test-files\\CMS-Documentation\\.order",
      newData,
      "utf8",
      function (err) {
        if (err) {
          console.error("Error writing file:", err);
        }
      }
    );
  }
);
console.log("finished with no errors");
