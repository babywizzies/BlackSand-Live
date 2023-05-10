import type { NextPage } from 'next';
import Head from 'next/head';
import MarcoFine from '../components/Market/MarcoFine'

const MarcoFinePage: NextPage = () => {
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
        <MarcoFine />
      </main>

     
    </div>
  );
};

export default MarcoFinePage;
