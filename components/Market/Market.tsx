import React from "react";
import styles from "styles/css/market.module.css";
import Image from "next/image";
import Link from "next/link";
import { A11y, Navigation, Pagination, Scrollbar, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Market = () => {
  return (
    <>
      <p className={styles.preview}>Coming soon, Preview Only</p>
      <h1 className={styles.title}>The BlackSand Market</h1>
      <p className={styles.text}>
        Welcome to the BlackSand Market! In the heart of the city of BlackSand,
        the Market is where you can use the Black Florins you have earned in
        BlackSand Racing. Based on available claims, you can use Black Florins
        to redeem commissions from your favorite Cult Artist. Explore the market
        and find the art that most speaks to you.
        <br />
        <br />
        To redeem a commission you just need to have enough Black Florins to
        meet the claim cost. After the claim, you will be connected to the
        artist you claimed for to discuss details of the commission. Examples of
        commissions will be provided for you to get an indicative reference.
      </p>
      <p className={styles.florin}>BLACK FLORIN BALANCE: 420</p>
      <div className={styles.container}>
        <Link href="#acideater">
          <div className={styles.cards}>
            <Image src="/img/acidborder.png" alt="acideater" fill />
            <p>AcidEater</p>
          </div>
        </Link>
        <Link href="#marco">
          <div className={styles.cards}>
            <Image src="/img/marcoborder.jpg" alt="marco" fill />
            <p>MarcoFine</p>
          </div>
        </Link>
        <Link href="#ozzz">
          <div className={styles.cards}>
            <Image src="/img/ozzzborder.jpg" alt="ozzz" fill />
            <p>Ozzz</p>
          </div>
        </Link>
        <Link href="#tania">
          <div className={styles.cards}>
            <Image src="/img/taniaborder.jpg" alt="tania" fill />
            <p>Tania</p>
          </div>
        </Link>
      </div>
      <div id="acideater" className={styles.artist_container}>
        <h1>AcidEater</h1>
        <div className={styles.card_container}>
          <div className={styles.card}>
            <p>
              Commission worth <br /> 0.05 ETH
            </p>
            <div className={styles.img}>
              <Image
                style={{ borderRadius: "10px" }}
                src="/img/0.05.jpg"
                alt="one"
                fill
              />
            </div>
            <button className={styles.button}>100 Black Florins</button>
          </div>
          <div className={styles.card}>
            <p>
              Commission worth <br /> 0.1 ETH
            </p>
            <div className={styles.img}>
              <Image
                style={{ borderRadius: "10px" }}
                src="/img/0.1.jpg"
                alt="two"
                fill
              />
            </div>
            <button className={styles.button}>300 Black Florins</button>
          </div>
          <div className={styles.card}>
            <p>
              Commission worth <br /> 0.2 ETH
            </p>
            <div className={styles.img}>
              <Image
                style={{ borderRadius: "10px" }}
                src="/img/0.2.jpg"
                alt="three"
                fill
              />
            </div>
            <button className={styles.button}>500 Black Florins</button>
          </div>
        </div>
        <h2>Example Artwork</h2>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          autoplay
          slidesPerView={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <SwiperSlide>
            <img src="/img/1.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/2.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/3.png" />
          </SwiperSlide>
        </Swiper>
      </div>
      <h1 className={styles.comingsoon}>
        Full Market Functionalities Coming Soon...
      </h1>
    </>
  );
};

export default Market;
