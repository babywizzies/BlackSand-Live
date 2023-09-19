import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/css/wardrobe.module.css";
import { HiOutlineArrowRight } from "react-icons/hi";
import CharacterSelect from "../Burn/CharacterSelect";
import { useUserTokens } from "@reservoir0x/reservoir-kit-ui";
import { useAccount } from "wagmi";
import useCharacterData from "../../hooks/useCharacterData"
import RenderCharacter from "./characterrender"

enum EquipScreen {
    CharacterSelection,
    Equip,
    Confirmation,
    Portal,
}
const Wardrobe2: React.FC = () => {
    const { address: accountAddress } = useAccount();
    const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
    const { characterData, loading } = useCharacterData(selectedCharacter?.id, selectedCharacter?.contract); // Modified this line
    const [equipScreen, setEquipScreen] = useState<EquipScreen>(EquipScreen.CharacterSelection);

    useEffect(() => {
        console.log(characterData);
    }, [characterData]);
    const handleCharacterSelect = (character: { characterId: string; contract: string }) => {
        setSelectedCharacter(character);
    };
    const handleEquipItem = (itemId: string) => {
        if (characterData && characterData.attributes) {
            // Find the 'prop' trait
            const propTrait = characterData.attributes.find((attr) => attr.trait_type.toLowerCase() === 'prop');
    
            if (propTrait) {
                // Update the trait's value
                propTrait.value = itemId;
    
                // Trigger a re-render
                setSelectedCharacter({ ...selectedCharacter });
            }
        }
    };
    
    const { data: tokens } = useUserTokens(accountAddress, {
        collectionsSetId: "2bbf8c77426ecef122b930e50d37eef1eefd8de0eaad268e3ee3abc05d3a2937",
    });
    const { data: athenaeumItems } = useUserTokens(accountAddress, {
        collectionsSetId: "6d5746c01bf4b37216420f1f23590386fb69bb1806d38cadcfec37481a14c0d0",
    });

    const extractRelevantTraits = (data) => {
        const relevantKeys = ['head', 'body', 'prop', 'familiar', 'rune', 'background'];
        let traits = {};
    
        data.attributes.forEach(attribute => {
            if (relevantKeys.includes(attribute.trait_type.toLowerCase())) {
                traits[attribute.trait_type.toLowerCase()] = attribute.value;
            }
        });
    
        return traits;
    }
    
    const orderTraits = (traits) => {
        const order = ['background', 'body', 'head', 'prop', 'familiar', 'rune'];
        return order.map(key => traits[key]);
    }

    
    

    return (
        
        <div>
            <h2 className={styles.title}>Choose your Adventurer</h2>
            {equipScreen === EquipScreen.Equip && (

             <div><RenderCharacter traits={characterData.attributes}  />
             <div className="athenaeum-items">
                 {athenaeumItems?.map((item, i) => {
                     const imagePath = `/assets/athenaeum/${item?.token?.name?.toLowerCase().replace(/\s+/g, '_')}.png`;
                     return (
                         <img
                             key={i}
                             src={imagePath}
                             alt="MISSINGNO"
                             width="25%"
                             onClick={() => handleEquipItem(item?.token?.name?.toLowerCase().replace(/\s+/g, '_').replace(/'/g, ''))}
                             className="athenaeum-item"
                         />
                     );
                 })}
             </div></div>   
            )}   
                
            {selectedCharacter && (
                <div>
                    Selected Character ID: {selectedCharacter.id}
                    Selected Character Contract: {selectedCharacter.contract}
                    {/* Modified this block to display the character data */}
                    {loading ? (
                        "Loading character data..."
                    ) : (
                        characterData && (
                            <div>
                                <p>Name: {characterData.name}</p>
                                <img src={characterData.image} alt={characterData.name} />
                                {characterData.attributes.map((attr, index) => (
                                    <p key={index}>
                                        {attr.trait_type}: {attr.value}
                                    </p>
                                ))}
                            </div>
                        )
                    )}
                </div>
            )}
            {equipScreen === EquipScreen.CharacterSelection && (
            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: 20,
                margin: "20px 60px",
                flexWrap: "wrap",
                overflowY: "auto",
                height: 600,
            }}>
                {tokens.map((token, i) => (
                    <CharacterSelect
                        id={token?.token?.tokenId as string}
                        contract={token?.token?.contract}
                        key={i}
                        onSelect={handleCharacterSelect}
                        isSelected={selectedCharacter?.id === token?.token?.tokenId}
                    />
                ))}
            </div>)}
            {equipScreen === EquipScreen.CharacterSelection && (
            <button
                className={styles["connect-button"]}
                onClick={() => setEquipScreen(EquipScreen.Equip)}>  {/* Modified this line */}
                Proceed <HiOutlineArrowRight color="#000" fontSize="16" />
            </button>)}
        </div>
    );
}

export default Wardrobe2;
