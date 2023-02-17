import path from 'path';
import { promises as fs } from 'fs';

module.exports = async function handler(req, res) {
  const jsonDirectory = path.join(process.cwd(), 'json');
  
  try {
    const fileContents = await fs.readFile("TECWeek2Ranking.json", "utf8");
    let data = JSON.parse(fileContents);
    console.log("Data:", data);  // This will log the data from the JSON file
    data = Array.isArray(data)?data: [data]
    res.status(200).send(data);
  } catch (err) {
    console.error("Error:", err); // This will log the error message
    // If there was an error reading or parsing the file,
    // send a 500 error with a message
    res.status(500).send({
      error: "Error reading or parsing file",
      message: err.message
    });
  }
};
