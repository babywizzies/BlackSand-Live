import type { NextPage } from 'next';
import Head from 'next/head';
import Academy from '../components/Academy/Academy'

const AcademyPage: NextPage = () => {
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
      
        <Academy/>
      </main>

     
    </div>
  );
};

export default AcademyPage;
