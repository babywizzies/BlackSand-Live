
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { characterId, contractAddress } = req.query;

  try {
    const filePath = path.join(process.cwd(), 'json', (contractAddress ?? 'default').toString(), `${characterId}.json`);    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    
    res.status(200).json(jsonData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch character data." });
  }
}
