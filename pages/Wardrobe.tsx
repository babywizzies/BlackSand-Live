import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Wardrobe2 from "../components/Wardrobe/Wardrobe2";

const WardrobePage: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Blacksand - Wardrobe</title>
        <meta name="description" content="Welcome to the BlackSand" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Wardrobe2 />
      </main>
    </div>
  );
};

export default WardrobePage;
