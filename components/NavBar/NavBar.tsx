import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import Link from "next/link";
import styles from "styles/css/navbar.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);

  return (
    <header className={styles.header}>
      <nav id={styles.nav} className={styles.nav}>
        <Link href="/">
          <h1 className={styles.logo}>BlackSand</h1>
        </Link>
        <div
          className={
            `${navActive ? styles["active"] : ""} ` +
            "" +
            styles["nav__menu__list"]
          }
        >
          <div
            onClick={() => {
              setNavActive(false);
            }}
          >
            <Link href="/about" className={styles.nav__item}>
              Lore
            </Link>
          </div>
          <div
            onClick={() => {
              setNavActive(false);
            }}
          >
            <Link href="/academy" className={styles.nav__item}>
              Academy
            </Link>
          </div>
          <div
            onClick={() => {
              setNavActive(false);
            }}
          >
            <Link href="/mint" className={styles.nav__item}>
              Mint
            </Link>
          </div>
          <div
            onClick={() => {
              setNavActive(false);
            }}
          >
            <Link href="/market" className={styles.nav__item}>
              Market
            </Link>
          </div>
          <div
            onClick={() => {
              setNavActive(false);
            }}
          >
            <Link href="/racetrack" className={styles.nav__item}>
              Racetrack
            </Link>
          </div>
          <div
            onClick={() => {
              setNavActive(false);
            }}
          >
            <Link href="/paddock" className={styles.nav__item}>
              Paddock
            </Link>
          </div>
          <div className={styles.connect__button}>
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && "loading";
                const connected = ready && account && chain && "authenticated";

                return (
                  <div
                    {...(!ready && {
                      "aria-hidden": true,
                      style: {
                        opacity: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            style={{
                              backgroundColor: "transparent",
                              fontSize: "16px",
                              color: "white",
                              fontWeight: "600",
                              cursor: "pointer",
                            }}
                            onClick={openConnectModal}
                            type="button"
                          >
                            Connect Wallet
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button onClick={openChainModal} type="button">
                            Wrong network
                          </button>
                        );
                      }

                      return (
                        <button
                          style={{
                            backgroundColor: "transparent",
                            fontSize: "16px",
                            color: "white",
                            fontWeight: "700",
                            cursor: "pointer",
                          }}
                          onClick={openAccountModal}
                          type="button"
                        >
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ""}
                        </button>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>

        <div
          onClick={() => setNavActive(!navActive)}
          className={styles.nav__menu__bar}
        >
          <FaBars />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
