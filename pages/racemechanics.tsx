import type { NextPage } from "next";
import Head from "next/head";
import RaceMechanics from "../components/Rules/RaceMechanics"
import React from "react";

const RaceMechanicsPage: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>BlackSand</title>
        <meta name="description" content="Welcome to the BlackSand" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <RaceMechanics />
      </main>
    </div>
  );
};

export default RaceMechanicsPage;
