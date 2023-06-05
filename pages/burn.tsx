import type { NextPage } from "next";
import Head from "next/head";
import Burn from "../components/Burn/Burn";

const BurnPage: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>BlackSand</title>
        <meta name="description" content="Welcome to the BlackSand" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Burn />
      </main>
    </div>
  );
};

export default BurnPage;
