import React from 'react'
import styles from '../../styles/css/artist.module.css'
import Link from 'next/link'

const MarcoFine = () => {
  return (
    <div className={styles.container}>
        <header className={styles.header}>
            <img src="/img/marcofine.jpg"/>
            <div className={styles.name}>
                <h1>MarcoFine</h1>
                <span>@marcofine_</span>  
            </div>
        </header>
        {/*<p></p>*/}
        <div className={styles.social}>
            <p>Website: https://marcofine.com</p>
            <p>Twitter: @marcofine_</p>
        </div>
        <div className={styles.subcontainer}>
      <Link href="/">
        <div className={styles.card}>
          <img className={styles.img} src="/img/MarcoFine/1.png"/>
          <div className={styles.subcard}>
            <h1>Line Art</h1>
            <p>Exclusive Recovered version of your forgotten rune character (any token from the Forgotten Runes ecosystem)</p>
            <br/>
            <b>Redeem for</b>
            <div className={styles.button}>
                <button className={styles.button_9} role="button">100 FLORINS</button>
            </div>
          </div>
        </div>
      </Link>
     </div>
    </div>
  )
}

export default MarcoFine