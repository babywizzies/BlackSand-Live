import React from "react";
import styles from "../../styles/css/main.module.css";
import Accordion from "./Accordion";
import Link from "next/link";

const Main = () => {
  return (
    <>
      <div className={styles.container}>
        <img className={styles.volcano} src="/img/volcano.png" />
        <div className={styles.header}>
          <p className={styles.main_title}>BlackSand</p>
        </div>
        <div className={styles.subpages}>
          <div className={styles.card}>
            <Link href="/about">
              <div className={styles.subpages_card}>
                <img
                  className={styles.subpages_img}
                  src="/img/CityStreets.jpg"
                />
                <p className={styles.subpages_text}>City Streets</p>
              </div>
            </Link>
            <Link href="/academy">
              <div className={styles.subpages_card}>
                <img className={styles.subpages_img} src="/img/Academy.png" />
                <p className={styles.subpages_text}>Academy</p>
              </div>
            </Link>
            <Link href="/mint">
              <div className={styles.subpages_card}>
                <img className={styles.subpages_img} src="/img/Foundry.png" />
                <p className={styles.subpages_text}>Foundry</p>
              </div>
            </Link>
            <div className={styles.subpages_card}>
              <img
                className={styles.subpages_img}
                src="/img/BlackStables.png"
              />
              <p className={styles.subpages_text}>
                Black Stables - Coming Soon
              </p>
            </div>
            <div className={styles.subpages_card}>
              <img className={styles.subpages_img} src="/img/Temple.png" />
              <p className={styles.subpages_text}>Temple - Coming Soon</p>
            </div>
            <Link href="/market">
              <div className={styles.subpages_card}>
                <img className={styles.subpages_img} src="/img/Market.png" />
                <p className={styles.subpages_text}>Market</p>
              </div>
            </Link>
            <Link href="/rules">
              <div className={styles.subpages_card}>
                <img className={styles.subpages_img} src="/img/RaceTrack.png" />
                <p className={styles.subpages_text}>Race Track</p>
              </div>
            </Link>
            <div className={styles.subpages_card}>
              <img className={styles.subpages_img} src="/img/Arena.png" />
              <p className={styles.subpages_text}>Arena - Coming Soon</p>
            </div>
          </div>
        </div>

        <p className={styles.main_subtitle}>Frequently Asked Questions</p>
        <div className={styles.accordion}>
          <div className={styles.accordion_card}>
            <Accordion
              title="What is BlackSand Mounts?"
              content="BlackSand Mounts is a NFT collection on the Ethereum blockchain that minted on Ferbuary 8th 2023. Alongside Forgotten Runes Ponies, BlackSand Mounts are the core to BlackSand Racing, a dice based Discord game in the Forgotten Runes Wizard Cult secret tower. Owning at least 1 Mount grants you access to all BlackSand Races."
            />
            <Accordion
              title="How much does it cost to mint one Mount and how many can I buy?"
              content="Minting BlackSand Mounts costs 0.015 per token. Any wallet can mint a maximum of 25 tokens. After Mint you can still buy a Mount from the secondary market on Forgotten Market, OpenSea, LooksRare, or any NFT marketplace"
            />
            <Accordion
              title="What type of Mounts are there?"
              content="
          <p>At mint, BlackSand Mounts included 3 types of mounts.</p>
          </br>
          <p>1. Mecha Ponies: Built from the remains of robots and ponies fallen during the QuantaPony War, they are powered by Quantum Crystals. Mecha Ponies are your key to participate in all BlackSand Racing events and they are the very fuel to ignite discovery across the Runiverse.
          </p>
          </br>
          <p>2. One of One Mounts: Found roaming in the lands around BlackSand, new mythical species join the races! At first, the collection will include more than ten 1 of 1s mounts.</p>
          </br>
          <p>3. Soul Ponies and Wild Soul Ponies: Not directly mintable, but only unlockable through the Burning Ritual, they are the very soul of both existing and long forgotten mounts. To claim one of them, you will be required to burn 2 or more Mecha Ponies.</p>
          </br>
          <p>Different mount types/species have different racing abilities & have their own unique way of playing. @forgottenrunes Ponies will always be the core Racing Mounts. While it will not be easier to win with them, FRWC Ponies will always hold a special place amongst all Mounts.</p>
          "
            />
            <Accordion
              title="How many BlackSand Mounts are there?"
              content="
          <p>At first, the BlackSand Mounts collection will have 2,345 Mounts, including both Mecha Mounts and 10+ One of One Mounts. However, the collection will be able to include up to 10,000 Mounts at any given time.  Minting of additional mounts (on top of the initial 2,345) might be unlocked at any time.</p>
          </br>
          <p>There will only ever be a total of 777 Souls. 567 Soul Ponies (1 for every Forgotten Runes Ponies) and 210 Wild Soul Ponies.</p>
          "
            />
            <Accordion
              title="What is the Burning Ritual?"
              content="
          <p>Mecha Ponies can be burned to summon Soul Ponies. There will be two kinds of Soul Ponies: Soul Ponies and Wild Soul Ponies. Each Burning Ritual evokes only one of either kind.</p>
          </br>
          <p>Additionally, Scrap Materials are sometimes found in the process of the Burning Ritual. Soul Ponies and Wild Soul Ponies are summoned differently. Scrap Materials will have future usage. </p>
          "
            />
            <Accordion
              title="What are Soul Ponies?"
              content="
          <p>Soul Ponies are the very Soul of existing ponies. Their features and traits are linked to their living counterpart. Only Forgotten Runes Ponies holders have the privilege of summoning the Soul Ponies of their Ponies.</p>
          </br>
          <p>Summoning 1x Soul Pony requires owning a FRWC Pony and burning 2x Mecha Ponies. You DO NOT burn your Forgotten Runes Pony in the Burning Ritual. Only the Mecha Ponies are burned.</p>
          "
            />
          </div>
          <div className={styles.accordion_card}>
            <Accordion
              title="What are Wild Soul Ponies?"
              content="Wild Soul Ponies are the Souls of Ponies long lost. Their features and traits are random.Summoning 1x Wild Soul Pony requires burning 5x Mecha Ponies."
            />
            <Accordion
              title="Who is behind the project?"
              content="BlackSand Mounts is a Cult project by the Cult for the Cult and beyond. Visit our Academy page to learn more about all the fantastic artists working to bring the Mounts to life."
            />
            <Accordion
              title="What are the BlackSand Races?"
              content="The BlackSand Races are a Discord based dice game homed in the Forgotten Runes wizard Cult Discord. Learn more about the Mechanics in out Racing page and feel free to join the conversation on Discord to meet new racing partner and ask any questions!"
            />
            <Accordion
              title="Is there a BlackSand Twitter Account?"
              content="Yes, our account is: <a href='https://twitter.com/the_BlackSand'>https://twitter.com/the_BlackSand</a>"
            />
            <Accordion
              title="Is there a dedicated BlackSand Discord Server?"
              content="Yes, the BlackSand Discord server is: <a href='https://discord.gg/B49CuHY8TT'>https://discord.gg/B49CuHY8TT</a>"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
