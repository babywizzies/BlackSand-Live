import { useState } from 'react';
import axios from 'axios';
import type { NextPage } from "next";
import BurnPony from '../components/burnpony.tsx';
import BurnMech from '../components/burnmech.tsx';

const BurnPage: NextPage = () => {
  const [ponyName, setPonyName] = useState('');
  const [ponyId, setPonyId] = useState('');
  const [ponyImage, setPonyImage] = useState('');


  
  return (
    <>
    <BurnPony apiUrl="http://localhost:3000/api/getCharacterData" />
    <BurnMech apiUrl="https://forgottenbabies.com/blacksand/uri/" />
    </>
  );
};

export default BurnPage;