import fs from 'fs/promises';
import path from 'path';

// In-memory cache for directory scan results.
const dirCache = new Map();

export default async function handler(req, res) {
  try {
    const assetType = req.query.type ? String(req.query.type) : 'onesies'; // Explicit cast to string for security
    const sanitizedAssetType = assetType.replace(/\.\./g, '');  // Remove directory traversal attempts

    const directoryPath = path.join(process.cwd(), 'public', 'assets', sanitizedAssetType);

    let imageFiles;

    if (dirCache.has(directoryPath)) {
      imageFiles = dirCache.get(directoryPath);
    } else {
      const files = await fs.readdir(directoryPath);
      imageFiles = files.filter((file) => file.endsWith('.png'));

      dirCache.set(directoryPath, imageFiles);  // Cache the result
    }

    return res.status(200).json(imageFiles);

  } catch (err) {
    console.error(err); // Log the error for debugging; in production, send it to a monitoring service
    return res.status(500).json({ error: 'An error occurred' }); // Generic error message
  }
}
