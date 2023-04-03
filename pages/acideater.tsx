import type { NextPage } from 'next';
import Head from 'next/head';
import AcidEater from '../components/Market/AcidEater'

const AcidEaterPage: NextPage = () => {
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
        <AcidEater />
      </main>

     
    </div>
  );
};

export default AcidEaterPage;
