import type { NextPage } from 'next';
import Head from 'next/head';
import Mint from '../pages/Home/index'

const MintPage: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Blacksand Racing</title>
        <meta
          name="description"
          content="Welcome to the BlackSand"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="main">
      
        <Mint/>
      </main>

     
    </div>
  );
};

export default MintPage;
