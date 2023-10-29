const fs = require('fs').promises;
const path = require('path');

const homogenize = (data, sourceType) => {
  let id = data.idx || data.serial || null;
  let image = data.image || null;

  // Special case for wizards: Extract serial from attributes
  if (sourceType === 'wizards') {
    const serialAttribute = data.attributes.find(attr => attr.trait_type === 'Serial');
    if (serialAttribute) {
      id = serialAttribute.value;
    }
  }

  // Special case for warriors: Generate image URL
  if (sourceType === 'warriors') {
    image = `https://portal.forgottenrunes.com/api/warriors/img/${data.idx}`;
  }

  return {
    id,
    name: data.name || null,
    image,
    attributes: data.attributes.map(attr => ({
      trait_type: attr.trait_type,
      value: attr.value,
      filename: attr.filename || null
    })),
    compiler: data.compiler || null,
    background_color: data.background_color || null
  };
};


const processFolder = async (inputFolder, outputFolder, sourceType) => {
  // Create output folder if it doesn't exist
  await fs.mkdir(outputFolder, { recursive: true });

  const filenames = await fs.readdir(inputFolder);

  const processFile = async (filename) => {
    try {
      const filePath = path.join(inputFolder, filename);
      const fileData = await fs.readFile(filePath, 'utf-8');
      
      // Check if the file is empty or not
      if (!fileData.trim()) {
        console.warn(`Skipping empty file: ${filename}`);
        return;
      }
  
      const jsonData = JSON.parse(fileData);
      const homogenizedData = homogenize(jsonData, sourceType);
  
      const outputFilePath = path.join(outputFolder, filename);
      await fs.writeFile(outputFilePath, JSON.stringify(homogenizedData, null, 2));
    } catch (err) {
      console.error(`Error processing file ${filename}: ${err.message}`);
    }
  };
  

  // Process each file in the folder
  await Promise.all(filenames.map(processFile));
};

const main = async () => {
  await Promise.all([
    processFolder('./babies', './homogenized_babies', 'babies'),
    processFolder('./warriors', './homogenized_warriors', 'warriors'),
    processFolder('./wizards', './homogenized_wizards', 'wizards'),
    processFolder('./souls', './homogenized_souls', 'souls')
  ]);
};

main().catch(err => console.error(err));
