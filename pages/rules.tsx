import type { NextPage } from "next";
import Head from "next/head";
import Rules from "../components/Rules/Rules";

const RulesPage: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>BlackSand</title>
        <meta name="description" content="Welcome to the BlackSand" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Rules />
      </main>
    </div>
  );
};

export default RulesPage;
