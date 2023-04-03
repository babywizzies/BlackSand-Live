import React, {useState} from "react";
import styles from '../../styles/css/market.module.css'
import Link from 'next/link'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Market = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded1, setIsExpanded1] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);
  return (
    <>
    <p className={styles.preview}>Coming soon, Preview Only</p>
      <h1 className={styles.title}>The BlackSand Market</h1>
      <p className={styles.text}>Welcome to the BlackSand Market! In the heart of the city of BlackSand, the Market is where you can use the Black Florins you have earned in BlackSand Racing. Based on available claims, you can use Black Florins to redeem commissions from your favorite Cult Artist. Explore the market and find the art that most speaks to you.
          <br /><br />
          To redeem a commission you just need to have enough Black Florins to meet the claim cost. After the claim, you will be connected to the artist you claimed for to discuss details of the commission. Examples of commissions will be provided for you to get an indicative reference.
      </p>
      <p className={styles.florin}>BLACK FLORIN BALANCE: 420</p>

     <div className={styles.container}>
      <Link href="/acideater">
        <div className={styles.card}>
          <img className={styles.img} src="/img/AcidEater/3.png"/>
          <img className={styles.avatar} src="/img/acid.png"/>
          <h1>Acideater</h1>
          <p>@_acideater_</p>
          <br/>
          <p className={styles.position}>Generative Artist and One-of-One Artist</p>
          <br/>
          <span>3 Sample</span>
        </div>
      </Link>
        <div className={styles.card}>
          <img className={styles.img} src="/img/2.jpg"/>
          <img className={styles.avatar} src="/img/marcofine.jpg"/>
          <h1>Marcofine</h1>
          <p>@marcofine_</p>
          <br/>
          <p className={styles.position}>Visiting Artist</p>
          <br/>
          <span>3 Sample</span>
        </div>
        <div className={styles.card}>
        <img className={styles.img} src="/img/2.jpg"/>
          <img className={styles.avatar} src="/img/ozzz.jpg"/>
          <h1>Ozzz</h1>
          <p>@ozzzmabro</p>
          <br/>
          <p className={styles.position}>One-of-One Artist</p>
          <br/>
          <span>3 Sample</span>
        </div>
        <div className={styles.card}>
        <img className={styles.img} src="/img/2.jpg"/>
          <img className={styles.avatar} src="/img/tania.jpg"/>
          <h1>Tania del Rio</h1>
          <p>@taniadelrio</p>
          <br/>
          <p className={styles.position}>Illustration Artist and One-of-One Artist</p>
          <br/>
          <span>3 Sample</span>
        </div>
     </div>
    </>
  );
};  

export default Market;
