import React from 'react'
import styles from '../../styles/css/footer.module.css'
import { FaTwitter, FaDiscord } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import Opensea from '../../styles/img/opensea.png'

const Footer = () => {
  return (
    <footer className={styles.container}>
        <h3 className={styles.title}>BlackSand</h3>
        <div className={styles.social}>
            <a target="_blank" href="https://twitter.com/the_BlackSand?s=20&t=GbO6icozR7BmHK3853VSfA" rel="noopener noreferrer"><FaTwitter className={styles.twitter}/></a>
            <a target="_blank" href="https://discord.gg/B49CuHY8TT" rel="noopener noreferrer"><FaDiscord className={styles.discord}/></a>
            <a target="_blank" href="https://opensea.io/collection/blacksandmounts" rel="noopener noreferrer"><Image alt="Opensea" width={28} height={28} src={Opensea}/></a>
        </div>
        <div className={styles.thanks}>
        </div>
    </footer>
  )
}

export default Footer