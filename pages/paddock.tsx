import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Paddock from "../components/Paddock/Paddock";

const PaddockPage: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Blacksand - Paddock</title>
        <meta name="description" content="Welcome to the BlackSand" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Paddock />
      </main>
    </div>
  );
};

export default PaddockPage;
