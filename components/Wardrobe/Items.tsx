import React from 'react';
import AthenaeumItem from './AthenaeumItem';
import FreeItems from './FreeItems';
import styles from "../../styles/css/wardrobe2.module.css"

// Replace YourItemType with the actual type you're using for the items
interface YourItemType {
    // Define the properties of YourItemType here
  }
  
  interface ItemsProps {
    itemsProps: {
      athenaeumItems: YourItemType[];
      freeItems: string[];
      handleEquipItem: (item: YourItemType) => void;
    };
  }
  
  const Items: React.FC<ItemsProps> = ({ itemsProps }) => {
    const { athenaeumItems, freeItems, handleEquipItem } = itemsProps;
  
    return (
      <div>
        <div className={styles.athenaeum_container}>
          {athenaeumItems?.map((item, i) => (
            <AthenaeumItem key={i} item={item} handleEquipItem={handleEquipItem} />
          ))}
        </div>
        <div className={styles.free_item_container}>
          {freeItems?.map((itemName, i) => (
            <FreeItems key={i} itemName={itemName} handleEquipFreeItem={handleEquipItem} />
          ))}
        </div>
      </div>
    );
  };
  
  export default Items;