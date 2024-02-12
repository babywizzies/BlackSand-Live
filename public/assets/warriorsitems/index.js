const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

const inputFolder = './';
const outputFolder = './output';

// Create output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Read the directory
fs.readdir(inputFolder, async (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err}`);
    return;
  }

  // Filter PNG files
  const pngFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');

  // Process each file
  for (const file of pngFiles) {
    const inputPath = path.join(inputFolder, file);
    const outputPath = path.join(outputFolder, file);

    try {
      // Load the image
      const image = await loadImage(inputPath);

      // Create a canvas with the new dimensions
      const canvas = createCanvas(image.width + 10, image.height + 10);
      const ctx = canvas.getContext('2d');

      // Draw the image at the new position (10 pixels down, 20 pixels to the right)
      ctx.drawImage(image, 12, 8);

      // Save the new image
      const out = fs.createWriteStream(outputPath);
      const stream = canvas.createPNGStream();
      stream.pipe(out);
      out.on('finish', () => console.log(`Processed ${file}`));
    } catch (err) {
      console.error(`Error processing ${file}: ${err}`);
    }
  }
});
