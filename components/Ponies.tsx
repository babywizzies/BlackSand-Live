import React from 'react';
import styles from "../styles/css/ponies.module.css"

export default function Pony() {

    const imageLink = `https://portal.forgottenrunes.com/api/shadowfax/img/18`;

  return (
<div>
  <div className={styles.container}>

    <div className={styles.header}>
        <div className={styles.sub_header}>
            <div className={styles.subcontainer}>
                <div className={styles.owner_name}>
                    <h1 className={styles.name}>Bill the Handsome</h1>
                    <p className={styles.owner}>Owner: Billgains.eth</p>
                </div>
            </div>
                <div className={styles.subcontainer_1}>
                    <div className={styles.origin_runes}>
                        <p className={styles.origin}>Origins: Blacksand</p>
                        <p className={styles.runes}>Rune: Gebo</p>
                    </div>
                    <div className={styles.level_exp}>
                        <p className={styles.level}>Level: 69</p>
                        <p className={styles.exp}>Experience: 420</p>
                    </div>
                </div>
        </div>
        <div className={styles.pony_img}>
            <img src={imageLink} key="18" className={styles.portrait} />
        </div>
    </div>


    <div className={styles.card_container}>
        <div className={styles.card}>
            <div className={styles.abilities}>
            <h1 className={styles.container_title}>Abilities</h1>
            <div className={styles.grid}>
                <p className={styles.container_text}>No abilities</p>
                <p className={styles.container_text}>Ability #2: shooo</p>
                <p className={styles.container_text}>Ability #3: asdfasd</p>
            </div>
            </div>
        </div>
        <div className={styles.card}>
        <div className={styles.abilities}>
            <h1 className={styles.container_title}>Treats</h1>
            <>
            <div className={styles.grid}>
                <p className={styles.container_text}>Treat #1: Treat</p>
                <p className={styles.container_text}>Treat #2: TRATS</p>
                <p className={styles.container_text}>Treat #3: TEEEEETS</p>
                
                <p className={styles.container_text}>Indigestion: no</p>
                <p className={styles.container_text}>Indigestion in Previous Race: ye</p>
            </div>
            </>
        </div>
        </div>

        <div className={styles.card}>
            <div className={styles.abilities}>
                <h1 className={styles.container_title}>Points</h1>
                <div className={styles.grid}>
                    <p className={styles.container_text}>Twitter Points: 1</p>
                    <p className={styles.container_text}>Treats Points: 2</p>
                    <p className={styles.container_text}>Ability Points: 3</p>
                    <p className={styles.container_text}>Loot Points: 4</p>
                    <p className={styles.container_text}>Training Points: 5</p>
                    <p className={styles.container_text}>Morale Points: 6</p>
                    <p className={styles.container_text}>Event Race Points:7</p>
                    <p className={styles.container_text}><b>Total Points: 8</b></p>
                </div>
            </div>
        </div>
        <div className={styles.card}>
            <div className={styles.abilities}>
                <h1 className={styles.container_title}>Ranking - Ether Cup</h1>
                <div className={styles.grid}>
                    <p className={styles.container_text}>Race Week #1:1</p>
                    <p className={styles.container_text}>Race Week #2: 2</p>
                    <p className={styles.container_text}>Race Week #3: 3</p>
                    <p className={styles.container_text}>Race Week #4: 4</p>
                    <p className={styles.container_text}>Race Week #5: 5</p>
                    <p className={styles.container_text}>Race Week #6: 6</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</div>
   
)};