import React, { useState } from 'react';
import AthenaeumItem from './AthenaeumItem';
import FreeItems from './FreeItems';
import BarrenCourt from './BarrenCourtItem';
import BlackSandEditions from './BlackSandEditions';
import styles from "../../styles/css/wardrobe2.module.css";

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
  const [activeTab, setActiveTab] = useState('athenaeum');

  const renderContent = () => {
    switch (activeTab) {
      case 'athenaeum':
        return (
          <div className={styles.athenaeum_container}>
            {athenaeumItems?.map((item, i) => (
              <AthenaeumItem key={i} item={item} handleEquipItem={handleEquipItem} />
            ))}
          </div>
        );
      case 'costume':
        return (
          <div className={styles.costume_item_container}>
            {freeItems?.map((itemName, i) => (
              <FreeItems key={i} itemName={itemName} handleEquipFreeItem={handleEquipItem} />
            ))}
          </div>
        );
      case 'blacksand':
        return <BlackSandEditions handleEquipItem={handleEquipItem} />;
      case 'barrenCourt':
        return (
          <div className={styles.barren_item_container}>
            {barrenCourt?.map((item, i) => (
              <BarrenCourt key={i} item={item} handleEquipItem={handleEquipItem} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.items_container}>
      <div className={styles.tabs}>
        <button className={activeTab === 'athenaeum' ? 'active' : ''} onClick={() => setActiveTab('athenaeum')}>Athenaeum</button>
        <button className={activeTab === 'costume' ? 'active' : ''} onClick={() => setActiveTab('costume')}>Costume</button>
        <button className={activeTab === 'blacksand' ? 'active' : ''} onClick={() => setActiveTab('blacksand')}>Black Sand Editions</button>
        <button className={activeTab === 'barrenCourt' ? 'active' : ''} onClick={() => setActiveTab('barrenCourt')}>Barren Court</button>
      </div>
      {renderContent()}
    </div>
  );
};

export default Items;
