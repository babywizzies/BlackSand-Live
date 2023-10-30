import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/css/wardrobe2.module.css"
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import CharacterSelect from "./CharacterSelect";
import { useUserTokens } from "@reservoir0x/reservoir-kit-ui";
import { useAccount } from "wagmi";
import useCharacterData from "../../hooks/useCharacterData"
import RenderCharacter from "./characterrender"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { matchTraitsToFile } from "./utils"; // Import the utility function
import { generateArt, RequestModel } from '../../utils/imageGene';
import axios from "axios";

import Items from './Items'
enum EquipScreen {
    CharacterSelection,
    Equip,
    Confirmation,
    Portal,
}

const CONTRACT_TO_COLLECTION_MAP: Record<string, string> = {
    '0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42': 'wizards',
    '0x4b1e130ae84c97b931ffbe91ead6b1da16993d45': 'babies',
    '0x9690b63eb85467be5267a3603f770589ab12dc95': 'warriors',
    '0x251b5f14a825c537ff788604ea1b58e49b70726f': 'souls'
};

const WARRIORS_CONTRACT = '0x9690b63eb85467be5267a3603f770589ab12dc95';

const BABIES_CONTRACT = '0x4b1e130ae84c97b931ffbe91ead6b1da16993d45';

const SOULS_CONTRACT = '0x251b5f14a825c537ff788604ea1b58e49b70726f';


const Wardrobe2: React.FC = () => {
    const { address: accountAddress } = useAccount();
    const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
    const { characterData, loading } = useCharacterData(selectedCharacter?.id, selectedCharacter?.contract); // Modified this line
    const [equipScreen, setEquipScreen] = useState<EquipScreen>(EquipScreen.CharacterSelection);
    const [items, setItems] = useState([])
    const [freeItems, setFreeItems] = useState<string[]>([]);
    const [blacksandEditionsItem, setBlacksandEditionsItem] = useState<string[]>([]);


    
    useEffect(() => {
        console.log(characterData);
    }, [characterData]);
    const handleCharacterSelect = (character: { characterId: string; contract: string }) => {
        
        setSelectedCharacter(character);
    };

    useEffect(() => {
      // Apply the transformation logic only for warriors
      if (selectedCharacter?.contract === WARRIORS_CONTRACT && characterData && characterData.attributes) {
        const matchedFiles = matchTraitsToFile(characterData.attributes);
        // Do something with matchedFiles, e.g., pass it to RenderCharacter
      }
    }, [characterData, selectedCharacter]);



    
const handleEquipItem = (itemId: string, traitType: string) => {
  
  if (characterData && characterData.attributes) {
    // Add the contract check here
    const isWarrior = selectedCharacter.contract === WARRIORS_CONTRACT;
    console.log(isWarrior)

    let targetTrait = characterData.attributes.find((attr) => attr.trait_type.toLowerCase() === traitType.toLowerCase());

    if (targetTrait) {
      targetTrait.value = itemId.toLowerCase();
      targetTrait.filename = `${itemId.toLowerCase().replace(/ /g, '_').replace(/,/g, '').replace(/,/g, '')}.png`;
    }

    if (traitType.toLowerCase() === 'body') {
      const headTrait = characterData.attributes.find((attr) => attr.trait_type.toLowerCase() === 'head');

      if (itemId.endsWith('_Onesie')) {
        if (headTrait) {
          if (!headTrait.value.toLowerCase().replace(/,/g, '').endsWith('_onesie')) {
            // If the character is a warrior, use filename; otherwise, use trait value
            headTrait.value = isWarrior 
              ? headTrait.filename.split('.')[0] + '_onesie'
              : `${headTrait.value}_onesie`.toLowerCase();

            headTrait.filename = isWarrior 
              ? headTrait.filename.replace('.png', '_onesie.png').replace(/,/g, '')
              : `${headTrait.value.replace(/ /g, '_').replace(/,/g, '')}.png`;
          }
        } else {
          characterData.attributes.push({
            trait_type: 'head',
            value: 'default_onesie',
            filename: 'default_onesie.png',
          });
        }
      } else {
        if (headTrait && headTrait.value.toLowerCase().endsWith('_onesie')) {
          headTrait.value = headTrait.value.slice(0, -7).toLowerCase();
          headTrait.filename = `${headTrait.value.replace(/ /g, '_').replace(/,/g, '')}.png`;
        }
      }
    }

    setSelectedCharacter({ ...selectedCharacter });
  }
};
    
    

    
    
    const collectionName = CONTRACT_TO_COLLECTION_MAP[selectedCharacter?.contract]

    
    const { data: tokens } = useUserTokens(accountAddress, {
        collectionsSetId: "bf781912648d9b6c1e0148bc991dceefc09f47fc9050ae8421414e8e33077100",
    });
    const { data: athenaeumItems } = useUserTokens(accountAddress, {
        collectionsSetId: "6d5746c01bf4b37216420f1f23590386fb69bb1806d38cadcfec37481a14c0d0",
    });
    const { data: barrenCourt } = useUserTokens(accountAddress, {
      collectionsSetId: "d6fe4f1befd2ebe963bf0c43b0e48c76aa1f850f0944f51682b3e2a25b19f25a",
  });
  const { data: blacksandEditions } = useUserTokens(accountAddress, {
    collectionsSetId: "68829f4a0984256a3f10af3d371129ba55c179fd005f1601294b9d12b7e72c2e",
  });


  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(data => {
        // Check directly if the user owns any "babies" tokens
        const ownsBabies = tokens.some(token => token?.token?.contract === BABIES_CONTRACT);
        

          setFreeItems(data);
        
      });
  }, [tokens]);
  



    const itemsProps = {
      athenaeumItems,
      freeItems,
      barrenCourt,
      blacksandEditions,
      handleEquipItem,
    };
    
    const handleGenerateArt = async () => {
      if (characterData) {
        // Filter out unnecessary attributes if needed
        const relevantAttributes = characterData.attributes.filter(attr => 
          ["background", "body", "familiar", "head", "prop", "rune", "weapon", "shield"].includes(attr.trait_type)
        );
    
        // Prepare the buildObject array based on filtered attributes
        const buildObject = relevantAttributes.map(attr => ({
          name: attr.trait_type,
          item: attr.value.toLowerCase().replace(/ /g, '_').replace(/,/g, '')
        }));
    
        let modifiedTokenId = Number(characterData.id);  // Convert to number

        // Modify token ID based on the collection
        if (selectedCharacter?.contract === BABIES_CONTRACT) {
          modifiedTokenId += 10000;
        } else if (selectedCharacter?.contract === WARRIORS_CONTRACT) {
          modifiedTokenId += 20000;
        }
    
        const requestModel = {
          name: characterData.name,
          tokenId: modifiedTokenId,
          collectionType: collectionName,  // Make sure this field exists in your characterData
          buildObject
        };
    
        try {
          const response = await axios.post('http://localhost:5555/art/', requestModel);
          let storedImageLocation = response.data.replace(/\\/g, "/");
          console.log(`Image saved at: ${storedImageLocation}`);
        } catch (error) {
          console.error('Failed to generate art', error);
        }
      } else {
        console.log('Character data is not available.');
      }
    };
    
    

    return (
        
        <div className={styles.container}>
          {equipScreen === EquipScreen.Equip && (  
            <div className={styles.container1}>
              <h2 className={styles.title}>Costume Up</h2>
                <div className={styles.adventurer_select}>
                  <RenderCharacter traits={characterData.attributes} collection={collectionName} />
                </div>
                  <Items itemsProps={itemsProps} />
                  <div className={styles.buttons}>
                    <button className={styles.connect_button} onClick={() => setEquipScreen(EquipScreen.CharacterSelection)}>
                      Back <HiOutlineArrowLeft color="#000" fontSize="16" />
                    </button>     
                     <button className={styles.generate_art_button} onClick={handleGenerateArt}>
                      Generate Art
                    </button>
                    </div>
            </div>
          )}

          {equipScreen === EquipScreen.CharacterSelection && (
            <div className={styles.container3}>
              <h2 className={styles.title}>Choose your Adventurer</h2>
              <div className={styles.choose}>
                {tokens.map((token, i) => (
                      <CharacterSelect
                          id={token?.token?.tokenId as string}
                          contract={token?.token?.contract}
                          key={i}
                          onSelect={handleCharacterSelect}
                          isSelected={selectedCharacter?.id === token?.token?.tokenId}
                      />
                ))}
                </div>
            </div>
          )}    
           
            

            {equipScreen === EquipScreen.CharacterSelection && (
                <div className={styles.connect_container}>
             <ConnectButton.Custom>
             {({
               account,
               chain,
               openChainModal,
               openConnectModal,
               mounted,
             }) => {
               const ready = mounted && "loading";
               const connected = ready && account && chain && "authenticated";
 
               return (
                 <div
                   {...(!ready && {
                     "aria-hidden": true,
                     style: {
                       opacity: 0,
                       pointerEvents: "none",
                       userSelect: "none",
                     },
                   })}
                 >
                   {(() => {
                     if (!connected) {
                       return (
                         <button
                         className={styles.connect_button}
                           onClick={openConnectModal}
                           type="button"
                         >
                           Connect Wallet
                         </button>
                       );
                     }
 
                     if (chain.unsupported) {
                       return (
                         <button
                           className={styles["connect-button"]}
                           onClick={openChainModal}
                           type="button"
                         >
                           Switch Networks
                         </button>
                       );
                     }
 
                     return (
                       <button
                         className={styles.connect_button}
                         onClick={() => setEquipScreen(EquipScreen.Equip)}>  {/* Modified this line */}
                        
                         Proceed
                         <HiOutlineArrowRight color="#000" fontSize="16" />
                       </button>
                     );
                   })()}
                 </div>
               );
             }}
           </ConnectButton.Custom>

            
           </div>
            )}
        </div>
    );
}

export default Wardrobe2;
