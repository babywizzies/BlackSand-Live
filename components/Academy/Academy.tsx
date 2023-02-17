import React from 'react'
import styles from '../../styles/css/academy.module.css'
import Image from 'next/image'
import { Artist } from '../../styles/data/Artist'
import { FaTwitter } from 'react-icons/fa'
import Link from 'next/link'

const Academy = () => {
  return (
    <>
    <div className={styles.container}>
            
            <div className={styles.academy}>
                <div className={styles.card2}>
                    <h1 className={styles.title}>The BlackSand Academy</h1>
                    <p className={styles.text}>The BlackSand Academy is where our culture flourishes. A place for Artists to imagine. A place for Developers (Architects) to build. A place for Bards to sing.</p>
                    <p className={styles.text}>Meet those who have brought life back to BlackSand. Meet those who have brought !magic back! Chant their names as they build our city. Learn of their achievements as they push for new discoveries. Join us as we welcome them to a new Home.</p>
                </div>
            </div>
            
            <div className={styles.grid_container}>
            {Artist.map(({ id, title, artist }) => ( 
                <div className={styles.grid_box} key={id}>
                    <h1 className={styles.grid_title}>{title}</h1>
                    <div className={styles.grid}>
                        {artist.map(({id, image, name, twitter}) => ( 
                        <div className={styles.people} key={id}>
                            <div className={styles.img}><Image className={styles.img} style={{borderRadius: '10px'}} src={image} alt="people"/></div>
                            <p className={styles.name}>{name}</p>
                            <hr className={styles.line}/>
                            <div className={styles.socials}>
                            <a target="_blank" href={twitter} rel="noopener noreferrer"><FaTwitter className={styles.icon}/></a>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            ))}
            </div>
            
    </div>       
    </>
  )
}

export default Academy