import React, { useState } from 'react'
import Navbar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import styles from '../../styles/css/ponies.module.css'
import Image from 'next/image'
import { Ponies } from '../../styles/data/Ponies'

const BlackStables = () => {

  const [toggleStates, setToggleStates] = useState([false, false]);

  const handleToggle = (index: number) => {
    setToggleStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <>
        <Navbar/>
            <div className={styles.container}>
              <h1 className={styles.title}>The Black Stables</h1>
              
                <div className={styles.ponies_container}>
                  
                  {/*Category*/}
                {Ponies.map(({ id, number, image, name, details, level, exp, origin, rune, color }) => (
                  <div className={styles.card} style={{backgroundColor: color}} key={id}>
                    <p className={styles.number}>#{number}</p>
                    <div className={styles.img}>
                      <Image onClick={() => handleToggle(id)}  src={image} style={{borderRadius: '20px'}} alt="Pony"/>
                      {toggleStates[id] ? '' : ''}
                    </div>
                      <p className={styles.ponies_name}>{name}</p>
                    
                    {/*Item*/}
                    {details.map(({ id, owner, image, badge, bgcolor }) => (
                      <div key={id}>
                        {toggleStates[id] && 
                          <div className={styles.services__modal} >
                            <div className={styles.popup_container} style={{backgroundColor: bgcolor}}>
                            <button className={styles.button_close} onClick={() => handleToggle(id)}>{toggleStates[id] ? 'X' : ''}</button>

                              <div className={styles.popup_card}>
                                <div className={styles.popup_details}>
                                  <p className={styles.popup_text}>{name}</p>
                                  <p className={styles.popup_owner}>Owner: {owner}</p>
                                  <p className={styles.popup_number}>#{number}</p>
                                  <div className={styles.leor}>
                                    <div>
                                      <p className={styles.exp}>Level: {level}</p>
                                      <p className={styles.level}>Experience: {exp}</p>
                                    </div>
                                    <div>
                                      <p className={styles.exp}>Origin: {origin}</p>
                                      <p className={styles.level}>Rune: {rune}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className={styles.popup_image}>
                                  <Image src={image} alt="pony"/>
                                </div>
                              </div>
                              
                              <div className={styles.badge_container}>
                                <h1 className={styles.badge_text}>Career Badge</h1>
                              </div>

                              <div className={styles.badge}>
                                <Image src={badge} alt="badge"/>
                                <Image src={badge} alt="badge"/>
                                <Image src={badge} alt="badge"/>
                              </div>

                              <div className={styles.badge_container}>
                                <h1 className={styles.badge_text}>Abilities</h1>
                              </div>

                              <div className={styles.badge}>
                                <Image src={badge} alt="badge"/>
                                <Image src={badge} alt="badge"/>
                                <Image src={badge} alt="badge"/>
                              </div>

                              <div className={styles.badge_container}>
                                <h1 className={styles.badge_text}>Inventory</h1>
                              </div>

                              <div className={styles.badge}>
                                <Image src={badge} alt="badge"/>
                                <Image src={badge} alt="badge"/>
                                <Image src={badge} alt="badge"/>
                              </div>
                              
                              
                            </div>
                          </div>
                        }
                      </div>
                    ))}
                    
                 </div>
                 ))}

                </div>
                
            </div>
        <Footer/>
    </>
  )
}

export default BlackStables