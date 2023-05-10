import React from 'react'
import styles from '../../styles/css/artist.module.css'
import Link from 'next/link'

const ChiaraMoreni = () => {
  return (
    <div className={styles.container}>
        <header className={styles.header}>
            <img src="/img/chiara.jpg"/>
            <div className={styles.name}>
                <h1>Chiara Moreni</h1>
                <span>@ChiaraMoreni</span>  
            </div>
        </header>
        {/*<p></p>*/}
        <div className={styles.social}>
            <p>Website: https://chiaramorenie.com</p>
            <p>Twitter: @ChiaraMoreni</p>
        </div>
        <div className={styles.subcontainer}>
      <Link href="/acideater">
        <div className={styles.card}>
          <img className={styles.img} src="/img/ChiaraMoreni/1.png"/>
          <div className={styles.subcard}>
            <h1>Line Art</h1>
            {/*<p></p>*/}
            <br/>
            <b>Redeem for</b>
            <div className={styles.button}>
                <button className={styles.button_9} role="button">450 FLORINS</button>
            </div>
          </div>
        </div>
      </Link>
     </div>
    </div>
  )
}

export default ChiaraMoreni