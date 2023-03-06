import type { NextPage } from "next";
import Head from "next/head";
import Mint from "../components/Mint/Mint";
import React from "react";

const MintPage: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Blacksand - Mint</title>
        <meta name="description" content="Welcome to the BlackSand" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Mint />
      </main>
    </div>
  );
};

export default MintPage;
