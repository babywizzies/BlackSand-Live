import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const directoryPath = path.join(process.cwd(), 'public', 'assets', 'onesies'); // replace with your actual folder

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan directory' });
    }

    const imageFiles = files.filter(file => file.endsWith('.png')); // Assuming they are png images
    console.log(imageFiles)
    return res.status(200).json(imageFiles);
  });
}