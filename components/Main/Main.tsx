import React from 'react'
import Image from 'next/image'
import styles from '../../styles/css/main.module.css'
import Welcome from '../../styles/img/welcome.png'
import BGICON from '../../styles/img/bg-icon.png'
import { FaTwitter, FaDiscord, FaShoppingBag } from 'react-icons/fa'
import Subpages from '../TheCity/Subpages'
import Faq from '../FAQ/FAQ'
import Opensea from '../../styles/img/opensea.png'
import Link from 'next/link'

const Main = () => {
  return (
    <>
      <div className={styles.container}>

          <div className={styles.bg_icon}>
            <Image src={BGICON} alt="bgicon"/>
          </div>

          <div className={styles.cards_container}>

            <div className={styles.cards}>
              <div className={styles.title}>WELCOME TO BLACKSAND!
              <p className={styles.text}>Welcome to the city of BlackSand! A Forgotten City of the Runiverse, BlackSand is building. Feel free to roam around and join in our journey.</p>
              
              </div>
              <div className={styles.socials}>
              <a target="_blank" href="https://twitter.com/the_BlackSand?s=20&t=GbO6icozR7BmHK3853VSfA" rel="noopener noreferrer"><FaTwitter className={styles.icon}/></a>
              <a target="_blank" href="https://discord.gg/B49CuHY8TT" rel="noopener noreferrer"><FaDiscord className={styles.icon}/></a>
              <a target="_blank" href="https://opensea.io/collection/blacksandmounts" rel="noopener noreferrer"><Image width={28} height={28} src={Opensea}/></a>
              </div>
              
            </div>
            
            
            <div className={styles.cards}>
              
              <div className={styles.img}>
                <Image src={Welcome} alt="Welcome"/>
              </div>
            </div>

          </div>

            <Subpages/>
            <Faq/>
            
      </div>
    </>
  )
}

export default Main