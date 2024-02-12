const fs = require('fs');
const path = require('path');

const folderPath = './warriors'; // Replace with the path to your folder containing JSON files

// Read all files in the folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    const filePath = path.join(folderPath, file);

    // Read each JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${file}:`, err);
        return;
      }

      let jsonData = JSON.parse(data);

      // Update the 'value' field
      jsonData.attributes.forEach(attr => {
        if (attr.filename) {
          attr.value = attr.filename.replace('.png', '');
        }
      });

      // Write the updated JSON back to the file
      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', err => {
        if (err) {
          console.error(`Error writing to file ${file}:`, err);
        }
      });
    });
  });
});