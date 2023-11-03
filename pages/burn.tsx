import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
const Burn = dynamic(() => import("../components/Burn/Burn"), { ssr: false });

const BurnPage: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>BlackSand</title>
        <meta name="description" content="Welcome to the BlackSand" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main_burn">
        <Burn />
      </main>
    </div>
  );
};

export default BurnPage;
