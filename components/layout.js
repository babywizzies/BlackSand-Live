import { useState, useContext, useEffect } from "react";
//import { useWindowWidth } from "../utils/hooks";
import Head from "next/head";
//import Ghalb from "./ghalb";
import Header from "./header";
import Footer from "./footer";
//import Actor from "./actor";
//import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
//import Authenticator from "./authenticator";
import { ActorContext } from "./actorContext";

export default function Layout({isVisible, children, isConnected, ...pageProps}) {
  const { currentAddress } = useContext(ActorContext)

  return(
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      initial={{ opacity: 0 }}
    >
      <div id="layout-holder">
        <Head>
          <title>Forgotten Runes Cult Content</title>
          <meta property="og:title" content="CultContent.wtf" key="title" />
        </Head>
        <Header
          className="container-fluid"
          pageTitle={pageProps.pageTitle}
          pageDescription={pageProps.pageDescription}
          
          pageRunes={pageProps.pageRunes}
          pageReturn={pageProps.pageReturn}
        />
        {children}
        <Footer />
      </div>
    </motion.div>
  )
}

export async function getServerSideProps(context) {
  try {
    const { client } = await connectToDatabase();

    return {
      props: { isConnected: true },
    }
  } catch (err) {
    console.log(err);
    return {
      props: { isConnected: false },
    }
  }
}

// Includes Authenticator
 <>
 {/*} {currentAddress ?
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      initial={{ opacity: 0 }}
    >
      <div id="layout-holder">
        <Head>
          <title>THE ANDTHENEUM</title>
          <meta property="og:title" content="ANDTHENEUM" key="title" />
        </Head>
        <Header
          className="container-fluid"
          pageTitle={pageProps.pageTitle}
          pageDescription={pageProps.pageDescription}
          pageImg={pageProps.pageImg}
          pageRunes={pageProps.pageRunes}
          pageReturn={pageProps.pageReturn}
        />
        {children}
        <Footer />
      </div>
    </motion.div>
  :
 <Authenticator /> 
  }*/}
</>
