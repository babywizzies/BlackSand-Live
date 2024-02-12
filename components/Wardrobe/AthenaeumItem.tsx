import React from 'react';
import styles from "../../styles/css/wardrobe2.module.css"

interface AthenaeumItemProps {
  item: any;  // Replace any with the type of your item, if available.
  handleEquipItem: (itemName: string, type: string) => void;
}

const AthenaeumItem: React.FC<AthenaeumItemProps> = ({ item, handleEquipItem }) => {
  const imagePath = `/assets/athenaeum/${item?.token?.name?.toLowerCase().replace(/\s+/g, '_').replace(/'/g, "")}.png`;

  return (
    <img
      src={imagePath}
      alt="MISSINGNO"
      onClick={() => handleEquipItem(item?.token?.name?.toLowerCase().replace(/\s+/g, '_').replace(/'/g, ""), 'prop')}
      className={styles.athenaeum_item}
    />
  );
};

export default AthenaeumItem;
