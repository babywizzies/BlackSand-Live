import React from 'react'
import styles from '../../styles/css/artist.module.css'
import Link from 'next/link'

const TadMajor = () => {
  return (
    <div className={styles.container}>
        <header className={styles.header}>
            <img src="/img/tad.jpg"/>
            <div className={styles.name}>
                <h1>Tad</h1>
                <span>@Tadmajor</span>  
            </div>
        </header>
        {/*<p></p>*/}
        <div className={styles.social}>
            <p>Website: https://tadmajor.com</p>
            <p>Twitter: @tadmajor</p>
        </div>
        <div className={styles.subcontainer}>
      <Link href="/">
        <div className={styles.card}>
          <img className={styles.img} src="/img/TadMajor/1.png"/>
          <div className={styles.subcard}>
            <h1>Customized FRWC banner</h1>
            <p>Customized FRWC banner based on your token</p>
            <br/>
            <b>Redeem for</b>
            <div className={styles.button}>
                <button className={styles.button_9} role="button">20 FLORINS</button>
            </div>
          </div>
        </div>
      </Link>
        <div className={styles.card}>
          <img className={styles.img} src="/img/TadMajor/2.gif"/>
          <div className={styles.subcard}>
            <h1>Short Character Animation </h1>
            <p>Short pixel animation of your character</p>
            <br/>
            <b>Redeem for</b>
            <div className={styles.button}>
                <button className={styles.button_9} role="button">100 FLORINS</button>
            </div>
          </div>
        </div>
        <div className={styles.card}>
        <img className={styles.img} src="/img/TadMajor/3.gif"/>
          <div className={styles.subcard}>
            <h1>Long Character Animation</h1>
            <p>Long pixel animation of your character</p>
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

export default TadMajor