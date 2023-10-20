import React from 'react';
import AthenaeumItem from './AthenaeumItem';
import FreeItems from './FreeItems';
import BarrenCourt from './BarrenCourtItem';
import BlackSandEditions from './BlackSandEditions'
import styles from "../../styles/css/wardrobe2.module.css"

// Replace YourItemType with the actual type you're using for the items
interface YourItemType {
    // Define the properties of YourItemType here
  }
  
  interface ItemsProps {
    itemsProps: {
      athenaeumItems: YourItemType[];
      freeItems: string[];
      barrenCourt: YourItemType[];
      blacksandEditions: YourItemType[];
      handleEquipItem: (item: YourItemType) => void;
    };
  }
  
  const Items: React.FC<ItemsProps> = ({ itemsProps }) => {
    const { athenaeumItems, freeItems, barrenCourt, handleEquipItem } = itemsProps;
  
    return (
      <div className={styles.items_container}>
        <div>
          <h2 className={styles.title_item}>Athenaeum</h2>
            <div className={styles.athenaeum_container}>
              {athenaeumItems?.map((item, i) => (
                <AthenaeumItem key={i} item={item} handleEquipItem={handleEquipItem} />
              ))}
            </div>
        </div>

        <div>
          <h2 className={styles.title_item}>Costume</h2>
            <div className={styles.costume_item_container}>  
              {freeItems?.map((itemName, i) => (
                <FreeItems key={i} itemName={itemName} handleEquipFreeItem={handleEquipItem} />
              ))}
            </div>
        </div>

        <div className={styles.blacksand_item_container}>
          <BlackSandEditions handleEquipItem={handleEquipItem} />
        </div>

        <div className={styles.barren_item_container}>
          {barrenCourt?.map((item, i) => (
            <BarrenCourt key={i} item={item} handleEquipItem={handleEquipItem} />
          ))}
        </div>
      </div>
    );
  };
  
  export default Items;