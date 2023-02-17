import type { NextPage } from 'next';
import Head from 'next/head';
import Ponies from '../components/Ponies'

const PoniesPage: NextPage = () => {
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
      
        <Ponies/>
      </main>

     
    </div>
  );
};

export default PoniesPage;
