import type { NextPage } from 'next';
import Head from 'next/head';
import Daniela from '../components/Market/Daniela'

const DanielaPage: NextPage = () => {
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
        <Daniela />
      </main>

     
    </div>
  );
};

export default DanielaPage;
