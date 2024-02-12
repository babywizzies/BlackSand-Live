import React from 'react';
import styles from "../../styles/css/wardrobe2.module.css"

interface FreeItemProps {
    itemName: string;  // The plain name of the item fetched from server, e.g., "item1"
    handleEquipFreeItem: (itemName: string, type: string) => void;
  }
  
  const FreeItems: React.FC<FreeItemProps> = ({ itemName, handleEquipFreeItem }) => {
    const imagePath = `/assets/onesies/${itemName}`;  
    const cleanedItemName = itemName.replace('.png', '');

    return (
      <img
        src={imagePath}
        alt="MISSINGNO"
        onClick={() => handleEquipFreeItem(cleanedItemName, 'body')}
        className={styles.free_item}
      />      
    );
  };
  

export default FreeItems;
