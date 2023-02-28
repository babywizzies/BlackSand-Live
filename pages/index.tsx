import type { NextPage } from "next";
import Head from "next/head";
import Main from "../components/Main/Main";
import React from "react";

const Home: NextPage = () => {
  return (
    <div id="star">
      <Head>
        <title>BlackSand</title>
        <meta name="description" content="Welcome to the BlackSand" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Main />
      </main>
    </div>
  );
};

export default Home;
