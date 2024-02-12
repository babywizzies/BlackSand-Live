const fs = require('fs');
const path = require('path');

const folderPath = './'; // Replace with your folder path

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('An error occurred:', err);
    return;
  }

  files.forEach(file => {
    const oldPath = path.join(folderPath, file);
    const newPath = path.join(folderPath, file.toLowerCase());

    fs.rename(oldPath, newPath, err => {
      if (err) {
        console.error(`Failed to rename ${file}:`, err);
      } else {
        console.log(`Successfully renamed ${file} to ${file.toLowerCase()}`);
      }
    });
  });
});