import type { NextPage } from 'next';
import Head from 'next/head';
import Main from '../components/Main/Main'

const Home: NextPage = () => {
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
      
        <Main/>
      </main>

     
    </div>
  );
};

export default Home;
