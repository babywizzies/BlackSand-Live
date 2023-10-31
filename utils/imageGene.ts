import axios from 'axios';

export interface RequestModel {
    id: string | number | null;
    name: string | null;
    image: string | null;
    attributes: Attribute[];
    compiler?: string | null;
    background_color?: string | null;
    collectionType: string;
    buildObject: BuildObject[];
  }
  

interface Attribute {
  trait_type: string;
  value: string;
  filename?: string;
}

interface BuildObject {
  name: string;
  item: string;
}

export const generateArt = async (requestModel: RequestModel) => {
  // You might want to add some validation here to make sure requestModel fits the schema
  try {
    const response = await axios.post('http://localhost:5555/art/', requestModel);
    let storedImageLocation = response.data.replace(/\\/g, "/");
    return storedImageLocation;
  } catch (error) {
    console.error('Failed to generate art', error);
    return null;
  }
};
