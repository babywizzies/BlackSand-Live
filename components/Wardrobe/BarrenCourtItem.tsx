import React from 'react';
import styles from "../../styles/css/wardrobe2.module.css"

interface BarrenCourtItemProps {
    item: any;  // Replace any with the type of your item, if available.
    handleEquipItem: (itemName: string, type: string) => void;
  }
  

const BarrenCourt: React.FC<BarrenCourtItemProps> = ({ item, handleEquipItem }) => {

  const tokenName = item?.token?.name;

  if (!tokenName) {
    // Handle this case appropriately
    return <div>Error: Invalid Item</div>;
  }

  const sanitizedTokenName = tokenName.toLowerCase().replace(/\s+/g, '_').replace(/'/g, "");
  const imagePath = `/assets/barrencourt/${sanitizedTokenName}.png`;

  return (
    <img
      src={imagePath}
      alt="MISSINGNO"
      onClick={() => handleEquipItem(sanitizedTokenName, 'familiar')}
      className={styles.BarrenCourt_item}
    />
  );
};

export default BarrenCourt;