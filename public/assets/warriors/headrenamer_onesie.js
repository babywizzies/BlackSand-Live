const fs = require('fs');
const path = require('path');

function renameFilesInDirectory(directoryPath, appendString) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      const oldPath = path.join(directoryPath, file);
      const fileExtension = path.extname(file);
      const baseName = path.basename(file, fileExtension);
      const newPath = path.join(directoryPath, `${baseName}${appendString}${fileExtension}`);
      
      fs.rename(oldPath, newPath, err => {
        if (err) throw err;
        console.log(`${file} -> ${path.basename(newPath)}`);
      });
    });
  });
}

// Usage
const directoryPath = './';  // Replace with your directory path
const appendString = '_onesie';
renameFilesInDirectory(directoryPath, appendString);
