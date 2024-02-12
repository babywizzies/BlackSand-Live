import React from 'react';
import styles from "../../styles/css/wardrobe2.module.css"

interface YourItemType {
  // Define the shape of the item here
  name: string;
  type: string;
  // ... other properties
}

interface BlackSandEditionsItemProps {
      handleEquipItem: (itemName: string, type: string) => void;
}
  
const BlackSandEditions: React.FC<BlackSandEditionsItemProps> = ({ handleEquipItem }) => {
  const imagePath = `/assets/blacksandeditions/oz2.png`;

  return (<>
    <h2 className={styles.title_item}>Background</h2>
      <div className={styles.blacksand_container}>
        <div className={styles.background_item}>
          <img
            src="/assets/blacksandeditions/oz1.png"
            alt="MISSINGNO"
            onClick={() => handleEquipItem('oz1', 'background')}
            className={styles.background_pic}
          />
        </div>
        <div className={styles.background_item}>
          <img
            src="/assets/blacksandeditions/oz2.png"
            alt="MISSINGNO"
            onClick={() => handleEquipItem('oz2', 'background')}
            className={styles.background_pic}
          />
        </div>
        <div className={styles.background_item}>
            <img
            src="/assets/blacksandeditions/oz3.png"
            alt="MISSINGNO"
            onClick={() => handleEquipItem('oz3', 'background')}
            className={styles.background_pic}
          />
        </div>
      </div>
  </>
  );
};

export default BlackSandEditions;