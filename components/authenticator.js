import React, { useState, useEffect, useContext } from "react";
import { ActorContext } from "./actorContext";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/css/authenticator.module.css";
import Link from "next/link";

export default function Authenticator({ isVisible }) {

  const { currentAddress, setCurrentAddress } = useContext(ActorContext);

  const checkIfUserIsConnected = async () => {
    try{
      const { ethereum } = window;
      if (!ethereum) {
        console.log("No Ethereum object found");
      } else {
        console.log("We have the ethereum object!");
      }
    } catch (err) {
      console.log("Error checking for connected wallet:", err);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("The ANDTHENEUM currently only accepts entrants in possession of a MetaMask. More modes of connection coming soon...");
      } else {
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        setCurrentAddress(accounts[0]);
        console.log("Accounts[0]:", accounts[0]);
      }
    } catch (err) {
      console.log("Error connecting wallet: ", err);
    }
  }

  useEffect(() => {
    checkIfUserIsConnected();
  }, [])

  // return null
  return(
      <motion.div
        key="authenticator"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className={styles.authenticatorHolder}>
          <div className={styles.oppressorHolder}>
            <div className={styles.oppressorAnimator}>
              <img src="/images/FUO Cropped.png" alt="Fair Unbalanced Oppressor" className={styles.oppressor} />
            </div>
          </div>
          <div className={`${styles.authenticator} ANDtablet`}>

            <h2>GATEWAY TO THE</h2>
            <h1 className={styles.h1}>ANDTHENEUM</h1>
            <p>Connect to proceed...</p>
            <button className="hover-btn" onClick={connectWallet}>Connect</button>
          </div>
        </div>
        <Link href="/AboutW0nd3r">
          <div className={styles.wonderLogoHolder}>
            <img className={styles.wonderLogo} src="/images/wonder_weird_logo.png" alt="wonder_weird_logo"  />
            <h3>Built by w0nd3r.eth</h3>
          </div>
        </Link>
      </motion.div>
      )
}
