import React from "react";
import styles from "styles/css/footer.module.css";
import { FaTwitter, FaDiscord } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <h3 className={styles.title}>BlackSand</h3>
      <div className={styles.social}>
        <a
          target="_blank"
          href="https://twitter.com/the_BlackSand?s=20&t=GbO6icozR7BmHK3853VSfA"
          rel="noopener noreferrer"
        >
          <FaTwitter className={styles.twitter} />
        </a>
        <a
          target="_blank"
          href="https://discord.gg/B49CuHY8TT"
          rel="noopener noreferrer"
        >
          <FaDiscord className={styles.discord} />
        </a>
      </div>
      <p style={{ fontWeight: "500" }}>
        <Link href="https://opensea.io/collection/blacksandmounts">
          Opensea
        </Link>{" "}
        |{" "}
        <Link href="https://forgotten.market/0xf486f696b80164b5943191236eca114f4efab2ff">
          Forgotten Market
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
