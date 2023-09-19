import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const CONTRACT_TO_COLLECTION_MAP: Record<string, string> = {
    '0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42': 'wizards',
    '0x4b1e130AE84c97b931FFBE91eAd6B1da16993D45': 'babies',
    // ... Add other mappings here
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { characterId, contract } = req.query;

    if (!characterId || !contract) {
        return res.status(400).json({ error: 'Missing characterId or contract' });
    }

    const collectionName = CONTRACT_TO_COLLECTION_MAP[contract as string];

    if (!collectionName) {
        return res.status(400).json({ error: 'Invalid contract address' });
    }
    const filePath = path.join(process.cwd(), 'json', collectionName, `${characterId}.json`);
    

    if (!fs.existsSync(filePath)) {
        console.log("Constructed file path:", filePath);
        return res.status(404).json({ error: filePath });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    return res.status(200).json(data);
}
