import React, { useState, useRef, useEffect } from 'react'
import styles from '../../styles/css/about.module.css'
import Image from 'next/image'
import Banner from '../../styles/img/banner.png'
import Map from '../../styles/img/map.png'

const About = () => {
  
  const [isExpanded, setIsExpanded] = useState(false);

  const videoEl = useRef<HTMLVideoElement | null>(null);

  const attemptPlay = (): void => {
    if (videoEl && videoEl.current) {
    videoEl.current
    .play()
    .catch((error: Error) => {
    console.error("Error attempting to play", error);
    });
    }
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  return (
    <>
    <div className={styles.container}>

        <div className={styles.banner}>
            <Image src={Banner} alt="banner"/>
        </div>

        <div className={styles.subcontainer}>
          
          <div className={styles.about}>
            <h1 className={styles.title}>BlackSand</h1>
            <p className={styles.info}>Discover the history of the city of BlackSand. Explore its Past. Understand its Present. Prepare for its Future. Discover the City that Once Was</p>
          </div>

          <div className={styles.cards_container}>
            <div className={styles.cards}>
              <video
                style={{ maxWidth: "100%", width: "600px", margin: "0 auto", borderRadius: '20px' }}
                playsInline
                autoPlay
                loop
                controls
                src="https://cdn.discordapp.com/attachments/1062163777459589242/1071802160871911477/BlackSand_Lore.mp4"
                ref={videoEl}
              />
            </div>
            <div className={styles.cards}>
              <p className={styles.text}>Located between the Salt Sea and the Mountains of Light, BlackSand was once called Imperium.
              Imperium had been a flourishing hub of trade and culture. Merchants would bring their precious goods to the Imperium Port from lands far and wide. Scholars would travel to the City Keep to study ideas and philosophies. Pilgrims would journey to submit their offerings to the Temple of the True Gods. Wizards would convene in the Obsidian Tower to share their powerful magic and technological innovations. Art and music would spark from this melting pot of cultures, colliding in what felt like the pulsating heart of the entire Runiverse. 
              <br/><br/>But suddenly, one night, while the city quietly rested, Nature willed the end of Imperium, and the volcano Sceena carried out the task…</p>
            </div>
          </div>

          <div className={styles.cards_container1}>
            <div className={styles.cards}>
            <p className={styles.text}>As BlackSand re-builds, New Citizens and Visitors are traveling to the city to spectate races and duels. Merchants are journeying to sell their precious wares. Play and fun are back as little pony dolls became the favorite toy of every kid in town.<br/><br/>
            Artists are joining. They bring their colors. Bards are singing.  They share their music. Wizards are back. They channel their magic.<br/><br/>
            You and them, together, have brought back life. Together, you have put BlackSand back on the map. The City that Once Was became Once More.
            </p>

            </div>
            <div className={styles.cards}>
            <Image src={Map} alt="banner" style={{borderRadius: '20px'}}/>
            </div>
          </div>
          {/*<div className={styles.cards}>
            <p className={styles.subtitle}>History of BlackSand</p>
            <hr className={styles.divider}></hr>
            <p className={styles.subtext}>“This has to work” Azazel thought. “BlackSand needs it; BlackSand deserves it.” It had been several years since Azazel had been commissioned by the Order of Historians to do something, anything about the city that once was. Yet nothing had worked. His efforts to attract farmers or merchants had been futile. Investors could not be convinced to fund new infrastructure. No citizens from nearby cities could be persuaded to move. It was all extremely infuriating.</p>
            <p className={styles.subtext}>Azazel was an historian, a shaman of the arts. His love for the history of BlackSand had pushed him to work day and night to try to bring the city back to its former glory. For BlackSand used to be one of the most glorious, rich and lavish cities the Runiverse had ever known. At a time when it wasn&apos;t yet known as BlackSand. A time when it was known as Imperium.</p>
            <p className={styles.subtext}>Located between the Salt Sea and the Mountains of Light, Imperium had been a flourishing hub of trade and culture. Merchants would bring their precious goods to the Imperium Port from lands far and wide. Scholars would travel to the City Keep to study ideas and philosophies. Pilgrims would journey to submit their offerings to the Temple of the True Gods. Wizards would convene in the Obsidian Tower to share their powerful magic and technological innovations. Art and music would spark from this melting pot of cultures, colliding in what felt like the pulsating heart of the entire Runiverse.</p>
            <p className={styles.subtext}>But it all abruptly came to an end. Azazel&apos;s eyes swelled and watered every time he reminisced of that tragic day.</p>
            
            {isExpanded && 
            <p className={styles.subtext}>Imperium laid at the bottom of Sceena, the largest sleeping volcano in the Runiverse. Rich with resources, Sceena had been instrumental to the success of the city. But it also quickly became the very cause of its downfall.<br/><br/>
            One night, while Imperium quietly rested, Sceena suddenly erupted. Lava streamed down from its peak, flooding, burning and destroying everything on its path down to the Salt Sea’s shores.<br/><br/>
            No written report remains of that night. But the few stories that survived speak of inhumane screams of horror and pain as citizens succumbed to the unstoppable wrath of Sceena. For months walls of fires and smoke would rise from the incinerated land, making it impossible for anyone to aid the city.<br/><br/>
            In disbelief, Wizards from all lands tried to salvage the possible, conjuring their magic and deploying their technology. But nothing worked.<br/><br/>
            Nature had willed the end of Imperium, and Sceena had carried out the task.<br/><br/>
            Years later, Sceena&apos;s rage finally stopped. Left was only black sand running all the way from the mountains to the seashores. Dusty, barren land that would be impossible to farm. Land that would bear no harvest or feed no cattle. Nothing left to remind the world of the glorious days of Imperium.<br/><br/>
            Merchant stopped trading; Scholars migrated elsewhere. Pilgrims sought their gods in other, far lands. Wizards left. Imperium slowly vanished from the world map, leaving behind only its BlackSand.
            </p>}
            
            <div className={styles.read_more_less}>      
            <button className={styles.read_button} onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Read Less" : "Read More"}
            </button> 
            </div>  
            </div>*/}
        </div>
    </div>
    </>
  )
}

export default About