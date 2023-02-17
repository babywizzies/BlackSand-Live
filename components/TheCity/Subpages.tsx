import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/css/subpages.module.css'
import { LinkAcademy } from '../../styles/data/LinkAcademy'


const Subpages = () => {
  return (
  <div className={styles.container}>
    <h1 className={styles.subtitle}>The City</h1>
    {LinkAcademy.map(({ id, number, link, image, title, classname }) => ( 
      <div className={styles.cards_subpages} key={id}>
        <div className={styles.card_content}>
          <p className={styles.number}>{number}</p>
        </div>
        <Link href={link}>
        <div className={styles.card_content_img} id={classname}>
          <div className={styles.shape}>
            <div className={styles.img}><Image style={{borderRadius: '10px'}} src={image} alt="sub1"/></div>
            <p className={styles.card_text}>{title}</p>
          </div>
        </div>
        </Link>
      </div>
    ))}

  </div>
  )
}

export default Subpages