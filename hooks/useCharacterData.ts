import { useState, useEffect } from 'react';
import axios from 'axios';

interface characterData {
  name: string;
  image: string;
  attributes: any[];
  background_color: string;
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
        console.log('API response:', result);
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
