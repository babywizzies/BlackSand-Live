import React from 'react'
import styles from '../../styles/css/artist.module.css'
import Link from 'next/link'

const Daniela = () => {
  return (
    <div className={styles.container}>
        <header className={styles.header}>
            <img src="/img/daniela.jpg"/>
            <div className={styles.name}>
                <h1>Daniela</h1>
                <span>@Daniela_ilustra</span>  
            </div>
        </header>
        {/*<p></p>*/}
        <div className={styles.social}>
            <p>Website: https://daniela.com</p>
            <p>Twitter: @Daniela_ilustra</p>
        </div>
        <div className={styles.subcontainer}>
      <Link href="/acideater">
        <div className={styles.card}>
          <img className={styles.img} src="/img/Daniela/small.jpeg"/>
          <div className={styles.subcard}>
            <h1>Small Physical + Digital Art Piece</h1>
            <p>Small art piece (21x30cm) delivered both digitally and physically upon request (shipping cost not included)</p>
            <br/>
            <b>Redeem for</b>
            <div className={styles.button}>
                <button className={styles.button_9} role="button">50 FLORINS</button>
            </div>
          </div>
        </div>
      </Link>
        <div className={styles.card}>
          <img className={styles.img} src="/img/Daniela/medium.jpeg"/>
          <div className={styles.subcard}>
            <h1>Medium Physical + Digital Art Piece</h1>
            <p>Medium art piece (25.5x35.5cm) delivered both digitally and physically upon request (shipping cost not included)</p>
            <br/>
            <b>Redeem for</b>
            <div className={styles.button}>
                <button className={styles.button_9} role="button">100 FLORINS</button>
            </div>
          </div>
        </div>
        <div className={styles.card}>
        <img className={styles.img} src="/img/Daniela/large.jpeg"/>
          <div className={styles.subcard}>
            <h1>Large Physical + Digital Art Piece</h1>
            <p>Large art piece (35.5x50cm) delivered both digitally and physically upon request (shipping cost not included)</p>
            <br/>
            <b>Redeem for</b>
            <div className={styles.button}>
                <button className={styles.button_9} role="button">160 FLORINS</button>
            </div>
          </div>
        </div>
     </div>
    </div>
  )
}

export default Daniela