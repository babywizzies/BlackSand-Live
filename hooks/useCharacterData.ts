import { useState, useEffect } from 'react';
import axios from 'axios';

interface Attribute {
  trait_type: string;
  value: string;
  filename?: string;
}

interface CharacterData {
  id: string | number | null;
  name: string | null;
  image: string | null;
  attributes: Attribute[];
  compiler?: string | null;
  background_color?: string | null;
}

function useCharacterData(characterId: string | null, contractAddress: string | null) {
  const [characterData, setCharacterData] = useState<CharacterData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!characterId || !contractAddress) return;

    axios
      .get(`/api/character-data`, {
        params: {
          characterId: characterId,
          contract: contractAddress,
        },
      })
      .then((result) => {
        // You might want to add some data validation or transformation logic here
        setCharacterData(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error: ", error);
        setLoading(false);
      });
  }, [characterId, contractAddress]);

  return { characterData, loading };
}

export default useCharacterData;
