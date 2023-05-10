import type { NextPage } from 'next';
import Head from 'next/head';
import TadMajor from '../components/Market/TadMajor'

const TadMajorPage: NextPage = () => {
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
        <TadMajor />
      </main>

     
    </div>
  );
};

export default TadMajorPage;
