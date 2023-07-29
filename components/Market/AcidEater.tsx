import React from 'react'
import styles from '../../styles/css/artist.module.css'
import Link from 'next/link'

const AcidEater = () => {
  return (
    <div className={styles.container}>
        <header className={styles.header}>
            <img src="/img/acid.png"/>
            <div className={styles.name}>
                <h1>AcidEater</h1>
                <span>@_acideater_</span>  
            </div>
        </header>
        {/*<p></p>*/}
        <div className={styles.social}>
            <p>Website: https://acideater.com</p>
            <p>Twitter: @_acideater_</p>
        </div>
        <div className={styles.subcontainer}>
      <Link href="/">
        <div className={styles.card}>
          <img className={styles.img} src="/img/AcidEater/2.png"/>
          <div className={styles.subcard}>
            <h1>Pixel Portrait</h1>
            <br/>
            <b>Redeem for</b>
            <div className={styles.button}>
                <button className={styles.button_9} role="button">70 FLORINS</button>
            </div>
          </div>
        </div>
      </Link>
        <div className={styles.card}>
          <img className={styles.img} src="/img/AcidEater/3.png"/>
          <div className={styles.subcard}>
            <h1>Pixel Landscape</h1>
            <br/>
            <b>Redeem for</b>
            <div className={styles.button}>
                <button className={styles.button_9} role="button">150 FLORINS</button>
            </div>
          </div>
        </div>
        <div className={styles.card}>
        <img className={styles.img} src="/img/AcidEater/4.png"/>
          <div className={styles.subcard}>
            <h1>Line Portrait</h1>
            <br/>
            <b>Redeem for</b>
            <div className={styles.button}>
                <button className={styles.button_9} role="button">200 FLORINS</button>
            </div>
          </div>
        </div>
     </div>
    </div>
  )
}

export default AcidEater