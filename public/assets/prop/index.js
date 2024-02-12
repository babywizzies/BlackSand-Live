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
        if (file.startsWith('staff_')) {
            const oldPath = path.join(directoryPath, file);
            const newPath = path.join(directoryPath, file.replace('staff_', ''));
            
            fs.rename(oldPath, newPath, err => {
                if (err) {
                    console.error(`Error renaming file ${file}: ${err}`);
                } else {
                    console.log(`Renamed ${file} to ${file.replace('staff_', '')}`);
                }
            });
        }
    });
});
