import React from 'react'
import styles from '../../styles/css/artist.module.css'
import Link from 'next/link'

const LeifDojang = () => {
  return (
    <div className={styles.container}>
        <header className={styles.header}>
            <img src="/img/leif.jpg"/>
            <div className={styles.name}>
                <h1>Leif Dojang</h1>
                <span>@LDojangMusic</span>  
            </div>
        </header>
        <p>Sound Designer, Composer & Musician, crafting original pieces for BlackSand Citizens, Racers and the wider FRWC community.</p>
        <div className={styles.social}>
            <p>Website: https:/leifdojang.com</p>
            <p>Twitter: @LDojangMusic</p>
        </div>
        <div className={styles.subcontainer}>
        <div className={styles.card}>
        <iframe width="380" height="215" src="https://www.youtube.com/embed/hSElehoZ3zc?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          <div className={styles.subcard}>
            <h1>Music Piece</h1>
            <p>Short original theme song for your FRWC character of choice.</p>
            <br/>
            <b>Redeem for</b>
            <div className={styles.button}>
                <button className={styles.button_9} role="button">250 FLORINS</button>
            </div>
          </div>
        </div>
      <Link href="/acideater">
        <div className={styles.card}>
        <iframe width="380" height="215" src="https://player.vimeo.com/video/788867872?h=119de51e9b&title=0&byline=0" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
          <div className={styles.subcard}>
            <h1>Music + Narrated Lore Piece</h1>
            <p>Theme song based on your existing lore, that ties music and lore together.</p>
            <br/>
            <b>Redeem for</b>
            <div className={styles.button}>
                <button className={styles.button_9} role="button">500 FLORINS</button>
            </div>
          </div>
        </div>
      </Link>
     </div>
    </div>
  )
}

export default LeifDojang