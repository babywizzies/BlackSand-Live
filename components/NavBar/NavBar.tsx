import Link from "next/link";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import styles from '../../styles/css/navbar.module.css'
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);

  return (
    <header className={styles.header}>
      <nav id={styles.nav} className={styles.nav}>
        
        <Link href={"/"}>
          <h1 className={styles.logo}>BlackSand</h1>
        </Link>

        <div className={`${navActive ? styles["active"] : ""} `+""+ styles["nav__menu__list"]}>
            <div onClick={() => { setNavActive(false);}}>
              <Link href="/" className={styles.nav__item}>
                Home
              </Link>
            </div>
            <div onClick={() => { setNavActive(false);}}>
              <Link href="/about" className={styles.nav__item}>
                About
              </Link>
            </div>
            <div onClick={() => { setNavActive(false);}}>
              <Link href="/academy" className={styles.nav__item}>
                Academy
              </Link>
            </div>
            <div onClick={() => { setNavActive(false);}}>
              <Link href="/mint" className={styles.nav__item}>
                Mint
              </Link>
            </div>
            <div className={styles.connect__button}>
              <ConnectButton />
            </div>
        </div>
        
        <div onClick={() => setNavActive(!navActive)} className={styles.nav__menu__bar}>
          <FaBars />
        </div>

      </nav>
    </header>
  );
};

export default Navbar;
