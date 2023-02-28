import React, { useEffect, useRef } from "react";
import styles from "styles/css/about.module.css";
import Image from "next/image";

const Academy = () => {
  const videoEl = useRef<HTMLVideoElement | null>(null);
  const attemptPlay = (): void => {
    if (videoEl && videoEl.current) {
      videoEl.current.play().catch((error: Error) => {
        console.error("Error attempting to play", error);
      });
    }
  };
  useEffect(() => {
    attemptPlay();
  }, []);
  return (
    <>
      <div className={styles.banner}>
        <Image fill src={"/img/banner.png"} alt="banner" />
      </div>
      <h1 className={styles.title}>BlackSand</h1>
      <p className={styles.text}>
        Discover the history of the city of BlackSand. Explore its Past.
        Understand its Present. Prepare for its Future. Discover the City that
        Once Was.
      </p>

      <div className={styles.about_container}>
        <div className={styles.about_card}>
          <video
            style={{ maxWidth: "100%", width: "300px" }}
            playsInline
            autoPlay
            loop
            controls
            src="https://cdn.discordapp.com/attachments/1062163777459589242/1071802160871911477/BlackSand_Lore.mp4"
            ref={videoEl}
          />
        </div>
        <div className={styles.about_card}>
          <p className={styles.about_text}>
            Located between the Salt Sea and the Mountains of Light, BlackSand
            was once called Imperium. Imperium had been a flourishing hub of
            trade and culture. Merchants would bring their precious goods to the
            Imperium Port from lands far and wide. Scholars would travel to the
            City Keep to study ideas and philosophies. Pilgrims would journey to
            submit their offerings to the Temple of the True Gods. Wizards would
            convene in the Obsidian Tower to share their powerful magic and
            technological innovations. Art and music would spark from this
            melting pot of cultures, colliding in what felt like the pulsating
            heart of the entire Runiverse.
            <br />
            <br />
            But suddenly, one night, while the city quietly rested, Nature
            willed the end of Imperium, and the volcano Sceena carried out the
            task…
          </p>
        </div>
      </div>

      <div className={styles.about_container_reverse}>
        <div className={styles.about_card}>
          <p className={styles.about_text}>
            As BlackSand re-builds, New Citizens and Visitors are traveling to
            the city to spectate races and duels. Merchants are journeying to
            sell their precious wares. Play and fun are back as little pony
            dolls became the favorite toy of every kid in town.
            <br />
            <br />
            Artists are joining. They bring their colors. Bards are singing.
            They share their music. Wizards are back. They channel their magic.
            <br />
            <br />
            You and them, together, have brought back life. Together, you have
            put BlackSand back on the map. The City that Once Was became Once
            More.
          </p>
        </div>
        <div className={styles.map}>
          <Image fill src={"/img/map.png"} alt="map" />
        </div>
      </div>

      <div className={styles.about_container}>
        <div className={styles.about_card}>
          <video
            style={{ maxWidth: "100%", width: "300px" }}
            playsInline
            loop
            controls
          >
            <source src="/img/blacksand.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={styles.about_card}>
          <p className={styles.about_text}>
            BlackSand Mounts represent the next chapter for BlackSand. New
            Adventurers are summoned. Their help is needed to scout the lands
            nearby, to discover what lay beyond BlackSand. To know where our
            beloved city of BlackSand stops and the wilds of the Runiverse
            begin. Will you answer the call?
          </p>
        </div>
      </div>
    </>
  );
};

export default Academy;
