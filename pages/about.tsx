import type { NextPage } from 'next';
import Head from 'next/head';
import About from '../components/About/About'

const AboutPage: NextPage = () => {
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
      
        <About/>
      </main>

     
    </div>
  );
};

export default AboutPage;
