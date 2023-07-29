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
      <Link href="/tadmajor">
        <div className={styles.card}>
          <img className={styles.img} src="/img/TadMajor/2.gif"/>
          <img className={styles.avatar} src="/img/tad.jpg"/>
          <h1>Tad</h1>
          <p>@Tadmajor</p>
          <br/>
          <p className={styles.position}>Visiting Artist</p>
          <br/>
          <span>3 Sample</span>
        </div>
      </Link>
      <Link href="/marcofine">
        <div className={styles.card}>
          <img className={styles.img} src="/img/MarcoFine/1.png"/>
          <img className={styles.avatar} src="/img/marcofine.jpg"/>
          <h1>MarcoFine</h1>
          <p>@marcofine_</p>
          <br/>
          <p className={styles.position}>Visiting Artist</p>
          <br/>
          <span>1 Sample</span>
        </div>
      </Link>
      <Link href="/leifdojang">
        <div className={styles.card}>
        <img className={styles.img} src="/img/LeifDojang/leif.png"/>
          <img className={styles.avatar} src="/img/leif.jpg"/>
          <h1>Leif Dojang</h1>
          <p>@LDojangMusic</p>
          <br/>
          <p className={styles.position}>Bard</p>
          <br/>
          <span>2 Sample</span>
        </div>
      </Link>
      <Link href="/daniela">
        <div className={styles.card}>
        <img className={styles.img} src="/img/Daniela/medium.jpeg"/>
          <img className={styles.avatar} src="/img/daniela.jpg"/>
          <h1>Daniela</h1>
          <p>@Daniela_ilustra</p>
          <br/>
          <p className={styles.position}>One-of-One Artist</p>
          <br/>
          <span>1 Sample</span>
        </div>
      </Link>
      <Link href="/chiaramoreni">
        <div className={styles.card}>
        <img className={styles.img} src="/img/ChiaraMoreni/1.png"/>
          <img className={styles.avatar} src="/img/chiara.jpg"/>
          <h1>Chiara Moreni</h1>
          <p>@ChiaraMoreni</p>
          <br/>
          <p className={styles.position}>One-of-One Artist</p>
          <br/>
          <span>1 Sample</span>
        </div>
      </Link>
     </div>
    </>
  );
};  

export default Market;
