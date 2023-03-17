import React, { useState } from "react";
import styles from "../../styles/css/rules.module.css";
import Image from "next/image";
import Link from "next/link";
import Rolling from "../../public/img/rolling.gif";
import Bot from "../../public/img/bot.png";
import Modal from "react-modal";

const Rules = () => {
  const [isOpen, setIsOpen] = useState(false);
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      backdropFilter: "blur(10px)",
    },
  };
  return (
    <>
      <h1 className={styles.title}>BlackSand Racing</h1>
      <p className={styles.text}>Game Rules and Mechanics</p>
      <p className={styles.subtext}>
        BlackSand Racing is a <b>Forgotten Runes Community</b> Discord bot game
        in which you lead your pony or mount to victory by executing both
        commands in the Forgotten Runes Wizards Cult Discord to score Race
        Points.
      </p>
      <div style={{ marginTop: "50px" }}>
        <Image
          style={{ height: "100%", width: "100%" }}
          src={Rolling}
          alt="trojanhorse"
        />
      </div>

      <div className={styles.container}>
        <h6 className={styles.title_container_first}>
          The key elements of BlackSand Racing
        </h6>
        <div className={styles.rules_container_three}>
          <Link href="/racemechanics" legacyBehavior>
            <div className={styles.card_three}>
              <div className={styles.logo_span}>
                <img className={styles.logo} src="/img/rules_logo.png" />
                <span>Race Mechanics</span>
              </div>
            </div>
          </Link>
          <Link href="/paddock">
            <div className={styles.card_three}>
              <div className={styles.logo_span}>
                <img className={styles.logo} src="/img/horse_logo.png" />
                <span>Enter a Race</span>
              </div>
            </div>
          </Link>
          <Link href="/racetrack">
            <div className={styles.card_three}>
              <div className={styles.logo_span}>
                <img className={styles.logo} src="/img/horse_gold_logo.png" />
                <span>Leaderboards</span>
              </div>
            </div>
          </Link>
          <Link href="/market">
            <div className={styles.card_three}>
              <div className={styles.logo_span}>
                <img className={styles.logo} src="/img/champion_logo.png" />
                <span>Claim Rewards</span>
              </div>
            </div>
          </Link>
        </div>

        <h6 className={styles.title_container}>
          How to play: BlackSand Discord Bot
        </h6>
        <div className={styles.rules_container_one}>
          <div>
            <p className={styles.card_text}>
              To play in BlackSand Racing you need to join the{" "}
              <Link href="https://discord.gg/forgottenrunes" legacyBehavior>
                <a
                  style={{ color: "#d4b42c", fontWeight: "700" }}
                  target="_blank"
                >
                  Forgotten Runes Wizards Cult Discord
                </a>
              </Link>{" "}
              and head to the BlackSand-racing thread under the secret-tower
              channel
              <br />
              <br />
              In every race, you will be able to use bot commands to score
              points and play abilities or events for your mount. See the
              graphic below for a full list of bot commands.{" "}
              <Link href="/racemechanics" legacyBehavior>
                <a style={{ color: "#d4b42c", fontWeight: "700" }}>
                  Explore the Participate in Races and Championships page
                </a>
              </Link>{" "}
              to learn more.
            </p>
          </div>
          <div className={styles.img}>
            <Image
              onClick={() => setIsOpen(true)}
              style={{ borderRadius: "20px", width: "100%", height: "auto" }}
              src={Bot}
              alt="bot"
            />
          </div>
          <Modal
            className={styles.content}
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
          >
            <div className={styles.modal}>
              <button
                className={styles.close_modal}
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
              <div style={{ border: "10px solid grey", borderRadius: "20px" }}>
                <Image
                  style={{
                    borderRadius: "10px",
                    width: "100%",
                    height: "auto",
                  }}
                  src={Bot}
                  alt="bot"
                />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Rules;
