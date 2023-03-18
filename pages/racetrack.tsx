import type { NextPage } from "next";
import Head from "next/head";
import RaceTrack from "../components/RaceTrack/RaceTrack";
import React from "react";

const RaceTrackPage: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>BlackSand - Race Track</title>
        <meta name="description" content="Welcome to the BlackSand" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <RaceTrack />
      </main>
    </div>
  );
};

export default RaceTrackPage;
