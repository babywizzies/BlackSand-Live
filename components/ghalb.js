import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/css/ghalb.module.css";
import { useWindowWidth } from "../utils/hooks";

export default function Ghalb() {
  // const width = useWindowWidth(1400);
  // const test2 = window.innerWidth;
  // console.log(width);
  // console.log(test2);

  return (
    <div className={styles.ghalbHolder}>
      <div className={styles.ghalbHolder1}>
        <div className={styles.ghalbHolder2}>
          {/* <Image
            src={"/images/Ghalb the Mouth.png"}
            layout="fill"
            objectFit="contain"
            alt="Ghalb the Mouth"
          /> */}
          <img className={styles.ghalbImg} src="/images/Ghalb_detail.png" />
        </div>
      </div>
    </div>

  )
}
