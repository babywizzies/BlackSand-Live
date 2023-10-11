import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  try {
    // You can parameterize 'onesies' based on the query or other conditions
    const assetType = req.query.type || 'onesies';
    const directoryPath = path.join(process.cwd(), 'public', 'assets', assetType);

    const files = await fs.readdir(directoryPath);

    const imageFiles = files.filter((file) => file.endsWith('.png'));

    // Optionally, implement caching here

    return res.status(200).json(imageFiles);

  } catch (err) {
    // Log the error for debugging; in production, send it to a monitoring service
    console.error(err);
    return res.status(500).json({ error: 'Unable to scan directory' });
  }
}
