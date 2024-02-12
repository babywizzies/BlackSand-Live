const fs = require('fs');
const path = require('path');

// Specify the directory path
const directoryPath = './'; // Replace with your folder path

// Read directory
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error(`Error reading the directory: ${err}`);
        return;
    }

    files.forEach(file => {
        const oldPath = path.join(directoryPath, file);
        const newPath = path.join(directoryPath, file.toLowerCase());

        // Ensure you're not renaming to an existing filename
        if (!files.includes(file.toLowerCase()) || file === file.toLowerCase()) {
            fs.rename(oldPath, newPath, err => {
                if (err) {
                    console.error(`Error renaming file ${file}: ${err}`);
                } else {
                    console.log(`Renamed ${file} to ${file.toLowerCase()}`);
                }
            });
        } else {
            console.warn(`Skipped renaming ${file} as ${file.toLowerCase()} already exists.`);
        }
    });
});