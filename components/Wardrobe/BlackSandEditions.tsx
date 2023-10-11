import React from 'react';
import styles from "../../styles/css/wardrobe2.module.css"

interface BlackSandEditionsItemProps {
    item: YourItemType;  
    handleEquipItem: (itemName: string, type: string) => void;
}
  

const BlackSandEditions: React.FC<BlackSandEditionsItemProps> = ({ item, handleEquipItem }) => {

  const imagePath = `/assets/blacksandeditions/oz2.png`;

  return (<>
    <img
      src="/assets/blacksandeditions/oz1.png"
      alt="MISSINGNO"
      onClick={() => handleEquipItem('oz1', 'background')}
      className={styles.BlackSandEditions_item}
    />
    <img
    src="/assets/blacksandeditions/oz2.png"
    alt="MISSINGNO"
    onClick={() => handleEquipItem('oz2', 'background')}
    className={styles.BlackSandEditions_item}
  />
      <img
    src="/assets/blacksandeditions/oz3.png"
    alt="MISSINGNO"
    onClick={() => handleEquipItem('oz3', 'background')}
    className={styles.BlackSandEditions_item}
  />
  </>
  );
};

export default BlackSandEditions;