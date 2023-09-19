import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {

  const query = req.query
  const tokenId = query.id;

  const jsonDirectory = path.join(process.cwd(), 'json');

  try {
    const fileContents = await fs.readFile(jsonDirectory + `/${tokenId}.json`, 'utf8');
    res.status(200).send(JSON.parse(fileContents));
  } catch ( err ) {
    console.log(err);
    res.status(200).json({error: "Token does not exist"});
  }
}