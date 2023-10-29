import axios from 'axios';

interface Attribute {
  trait_type: string;
  value: string;
  filename?: string;
}

interface BuildObject {
  name: string;
  item: string;
}

interface RequestModel {
  id: string | number | null; // Added id to match the homogenized schema
  name: string | null;
  image: string | null; // Added image to match the homogenized schema
  attributes: Attribute[]; // Added attributes to match the homogenized schema
  compiler?: string | null; // Optional fields
  background_color?: string | null; // Optional fields
  collectionType: string;
  buildObject: BuildObject[];
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
