import React from "react";
import styles from "../../styles/css/academy.module.css";
import artists from "../../public/data/Artists";
import Image from "next/image";
import { FaTwitter } from "react-icons/fa";
import Link from "next/link";
import useAudio from "../../hooks/useAudio";

const Academy = () => {
  useAudio("/audio/academy-bg.mp3", {
    autoplay: true,
    volume: 0.2,
    loop: true,
  });

  return (
    <>
      <h1 className={styles.title}>Academy</h1>
      <p className={styles.text}>
        The BlackSand Academy is where our culture flourishes. A place for
        Artists to imagine. A place for Developers (Architects) to build. A
        place for Bards to sing.
        <br />
        <br />
        Meet those who have brought life back to BlackSand. Meet those who have
        brought !magic back! Chant their names as they build our city. Learn of
        their achievements as they push for new discoveries. Join us as we
        welcome them to a new Home.
      </p>
      <div className={styles.img_container}>
        {artists.map((artist, i) => (
          <div key={i} className={styles.tooltip}>
            <Image
              className={styles.image}
              src={artist.img}
              fill
              alt="Artist image"
            />
            <span className={styles.tooltiptext}>
              <p
                className={styles.name}
                dangerouslySetInnerHTML={{ __html: artist.name }}
              ></p>
              <div>
                {artist.roles.map((role, i) => (
                  <p key={i} className={styles.role}>
                    {role}
                  </p>
                ))}
              </div>
              <Link
                href={`https://twitter.com/${artist.twitterHandle}`}
                target="_blank"
              >
                <FaTwitter className={styles.twitter} />
              </Link>
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Academy;
