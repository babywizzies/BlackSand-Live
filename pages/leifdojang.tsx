import type { NextPage } from 'next';
import Head from 'next/head';
import LeifDojang from '../components/Market/LeifDojang'

const LeifDojangPage: NextPage = () => {
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
        <LeifDojang />
      </main>

     
    </div>
  );
};

export default LeifDojangPage;
