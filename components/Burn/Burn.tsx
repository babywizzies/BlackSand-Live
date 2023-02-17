import React, {useRef, useEffect, useState} from 'react'
import Image from 'next/image'
import styles from '../../styles/css/burn.module.css'
import Navbar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import Pony from '../../styles/img/ponies/ponies1.png'

const runes = [  
    {
        id: 1,
        image: Pony,
        alt: "Pony 1",
    },
    {
        id: 2,
        image: Pony,
        alt: "Pony 2",
    },
    {
        id: 3,
        image: Pony,
        alt: "Pony 3",
    },
    {
        id: 4,
        image: Pony,
        alt: "Pony 4",
    },
    {
        id: 5,
        image: Pony,
        alt: "Pony 5",
    },
    {
        id: 6,
        image: Pony,
        alt: "Pony 6",
    },
    {
        id: 7,
        image: Pony,
        alt: "Pony 7",
    },
    {
        id: 8,
        image: Pony,
        alt: "Pony 8",
    },
];

const mounts = [  
  {
      id: 1,
      image: Pony,
      alt: "Mecha Pony 1",
  },
  {
      id: 2,
      image: Pony,
      alt: "Mecha Pony 2",
  },
  {
      id: 3,
      image: Pony,
      alt: "Mecha Pony 3",
  },
  {
      id: 4,
      image: Pony,
      alt: "Mecha Pony 4",
  },
  {
      id: 5,
      image: Pony,
      alt: "Mecha Pony 5",
  },
  {
      id: 6,
      image: Pony,
      alt: "Mecha Pony 6",
  },
  {
      id: 7,
      image: Pony,
      alt: "Mecha Pony 7",
  },
  {
      id: 8,
      image: Pony,
      alt: "Mecha Pony 8",
  },
];


const Burn = () => {

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

  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageSelection = (image: string) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((i) => i !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const [selectedImages1, setSelectedImages1] = useState<string[]>([]);

  const handleImageSelection1 = (image: string) => {
    if (selectedImages1.includes(image)) {
      setSelectedImages1(selectedImages1.filter((i) => i !== image));
    } else {
      setSelectedImages1([...selectedImages1, image]);
    }
  };

  return (
    <>
    <Navbar/>

      <audio
        style={{ maxWidth: "100%", width: "150px", borderRadius: '20px', position: 'fixed', bottom: '10px', left: '10px' }}
        playsInline autoPlay loop controls
        src="https://cdn.discordapp.com/attachments/1070567978896216094/1070568473190735953/BlackSand_MSTR_1_Jan22_2023.wav"
        ref={videoEl}/>  

          <div className={styles.container}>
            
            <div className={styles.subcontainer}>
              <h1 className={styles.sub_title}>Temple</h1>
              <p className={styles.text}>Mecha Ponies can be burned to summon Soul Ponies or Wild Sould Ponies. Each Burning Ritual evokes only one of either kind. Additionally, Scrap Materials* are sometimes found in the process of the Burning Ritual. </p>
              <p className={styles.text}>To summon a Soul Pony, you need to have 1 Forgotten Runes Pony in your wallet and burn 2x Mecha Ponies</p>
              <p className={styles.text}>To summon a Wild Soul Pony, you need to burn 5x Mecha Ponies. Select the tokens you want to burn below, and press the Burn bottom to initiate the Burning Ritual. The Burning Ritual is free + gas fees</p>
              <div className={styles.owned_container}>

                <div className={styles.owned_card}>
                  <h1 className={styles.owned_title}>Forgotten Runes Ponies</h1>
                    <div className={styles.owned}>    
                    {runes.map(({ id, image, alt }) => (
                      <Image key={id} src={image} alt={alt}
                      onClick={() => handleImageSelection(alt)}
                      style={{ opacity: selectedImages.includes(alt) ? "0.3" : "none", cursor: "pointer", borderRadius: "10px", }} width={350} height={350}/>
                    ))}
                    </div>
                      <p className={styles.selected}>Your Selected Mounts:<span style={{color: '#8b0000', marginTop: '5px', fontWeight: '900'}}> {selectedImages.length ? selectedImages.join(", ") : "None"}</span></p>  
                </div>

                <div className={styles.owned_card}>
                  <h1 className={styles.owned_title}>BlackSand Mounts</h1>
                    <div className={styles.owned}>
                    {mounts.map(({ id, image, alt }) => (
                      <Image key={id} src={image} alt={alt}
                      onClick={() => handleImageSelection1(alt)}
                      style={{ opacity: selectedImages1.includes(alt) ? "0.3" : "none", cursor: "pointer", borderRadius: "10px", }} width={350} height={350}/>
                    ))}
                    </div>
                    <p className={styles.selected}>Your Selected Mounts:<span style={{color: '#8b0000', marginTop: '5px', fontWeight: '900'}}> {selectedImages1.length ? selectedImages1.join(", ") : "None"}</span></p>  
                </div>

              </div>
            </div>

            <div className={styles.mint_button}>
              <button>Mint</button>
            </div>

          </div>

    <Footer/>
    </>
  )
}

export default Burn