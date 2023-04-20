import React, {useState} from "react";
import styles from "../../styles/css/tabs.module.css"
import Mint from "../../components/Mint/Mint"
import OpenEdition from "../../components/Mint/OpenEdition"

const Tabs = () => {

    const [activeTab, setActiveTab] = useState("tab1");
    
    const handleTab1 = () => {
        // update the state to tab1
        setActiveTab("tab1");
      };
      const handleTab2 = () => {
        // update the state to tab2
        setActiveTab("tab2");
      };

  return (
    <div className={styles.Tabs}>
      {/* Tab nav */}
      <ul className={styles.nav}>
        <li className={activeTab === "tab1" ? "active" : ""} onClick={handleTab1}>BlackSand Mounts</li>
        <li className={activeTab === "tab2" ? "active" : ""} onClick={handleTab2}>BlackSand Editions</li>
      </ul>
      <div className={styles.outlet}>
        {activeTab === "tab1" ? <Mint /> : <OpenEdition />}
      </div>
    </div>
  );
};
export default Tabs