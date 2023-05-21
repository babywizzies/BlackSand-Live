import { useState, useEffect, useContext } from "react";
//import Image from "next/image";
import styles from "../styles/css/layout.module.css"

import Actor from "./actor";
import { ActorContext } from "./actorContext";
import { useWindowWidth } from "../utils/hooks";
import Link from "next/link";
import Collapse from "@mui/material/Collapse";

export default function Header({...pageProps}) {
  const width1440 = useWindowWidth(1439);
  const runes = pageProps.pageRunes;
  const { descriptionOpen, setDescriptionOpen } = useContext(ActorContext);
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
        alert("The ANDTHENEUM currently only accepts those in possession of a MetaMask to connect. More modes of connection coming soon...");
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

  return(
    <>
      {!width1440 ?
        <div className={styles.headerHolder}>

          <h1 className={styles.pageTitle}>{pageProps.pageTitle}</h1>
          {currentAddress ? <Actor /> : <button className={styles.connectButton} onClick={connectWallet}>Connect</button>}
          <div className={styles.runeWord}>
            <Link href={pageProps.pageReturn}>
              <img src={pageProps.pageRunes[0]} className={styles.runeBtn}/>
            </Link>
            
          </div>
        </div>
      :
      <div className={styles.headerHolder}>
        <div className={styles.headerContent1440}>

          <div className={styles.headerText}>
            <h1 className={styles.pageTitle}>{pageProps.pageTitle}</h1>
            <p className={styles.pageDescription}>{pageProps.pageDescription}</p>
          </div>
          {currentAddress ? <Actor /> : <button className={styles.connectButton} onClick={connectWallet}>Connect</button>}
        </div>
        <div className={styles.runeWord}>
          <Link href={pageProps.pageReturn}>
            <img src={pageProps.pageRunes[0]} className={styles.runeBtn}/>
          </Link>
          {pageProps.pageRunes.filter((rune, index) => index !== 0).map((rune, index) =>
            <img src={rune} className={styles.runeImg} key={index}/>
          )}
        </div>
      </div>
      }
    </>

  )
}

{/* <img src={pageProps.pageImg} className={`${styles.headerImg} ANDtablet`}/>
<div>
  <h1 className={styles.pageTitle}>{pageProps.pageTitle}</h1>
  <p>{pageProps.pageDescription}</p>
</div> */}

/* Pre- Ground up responsive design

{width1400 && <Ghalb />}
{width2112 ?
  /* Large Screens */
    // <header id={styles.header} className="ANDtablet">
    //   <img src={pageProps.pageImg} className={`${styles.headerImg} ANDtablet`}/>
    //   <div>
    //     <h1 className={styles.pageTitle}>{pageProps.pageTitle}</h1>
    //     <p>{pageProps.pageDescription}</p>
    //   </div>
    // </header>
// :
  /* Small-Mid Screens */
//   <header id={styles.header} className="ANDtablet">
//     <div>
//       <img src={pageProps.pageImg} className={`${styles.headerImg} ANDtablet float-left`}/>
//       <h1 className={styles.pageTitle}>{pageProps.pageTitle}</h1>
//     </div>
//     <p className={styles.pageDescription}>{pageProps.pageDescription}</p>
//   </header>
// }
// <Actor />
{/* {width1024 && <Actor />} */}
