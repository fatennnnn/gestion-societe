const fs = require("fs");
const path = require("path");
const clearPdf = (filePath, folder) => {
  filePath = path.join(__dirname, folder, filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

module.exports = clearPdf;
