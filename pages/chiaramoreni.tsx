import type { NextPage } from 'next';
import Head from 'next/head';
import ChiaraMoreni from '../components/Market/ChiaraMoreni'

const ChiaraMoreniPage: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>BlackSand</title>
        <meta
          name="description"
          content="Welcome to the BlackSand"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="main">
        <ChiaraMoreni />
      </main>

     
    </div>
  );
};

export default ChiaraMoreniPage;
