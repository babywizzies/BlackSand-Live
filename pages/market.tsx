import type { NextPage } from "next";
import Head from "next/head";
import Market from "../components/Market/Market";
import React from "react";

const MarketPage: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>BlackSand - Market</title>
        <meta name="description" content="Welcome to the BlackSand" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Market />
      </main>
    </div>
  );
};

export default MarketPage;
