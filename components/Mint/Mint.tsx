import React, {useRef, useState, useEffect} from 'react'
import Image from 'next/image'
import styles from '../../styles/css/mint.module.css'
import { FaMinus, FaPlus } from 'react-icons/fa'
import Baobob from '../../styles/img/baobob.png'
import Pony from '../../styles/img/ponies/ponies1.png'
import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import { BigNumber, ethers } from 'ethers';
import {useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction,} from 'wagmi';
import contractInterface from '../../contract-abi.json';

const contractConfig = {
  address: '0x701d0D1aAE9B50e22641A8c60681bc1A1E311601',
  abi: contractInterface,
};

function generateLeaf(address: string): Buffer {
  return Buffer.from(
    // Hash in appropriate Merkle format
    ethers.utils
      .solidityKeccak256(["address"], [address])
      .slice(2),
    "hex"
  );
}

const Mint = () => {
  const [totalMinted, setTotalMinted] = React.useState(0);
  const [mintCount, setMintCount] = React.useState(1);
  const [mintPrice, setMintPrice] = React.useState(.015);
  const [windowOpen, setWindowOpen] = React.useState(false)
  const [state, setState] = React.useState([
      "0xa2e6187a2cbb2c7e7f2983513349ca96a236c47e68e6746da2ba372fa800160a",
      "0xd4077dfcabb0083e19757e3d53f9b64e267ab7c6818152d52ad2a1e3d3810b11",
      "0x2e63a1a1f32748107853f221ab8e5c402386e64c41b0e6b2e1bd237f550923d0",
      "0x8befa861653b2d8e4871806c9cda0d4745ade9b592cb405ce3cb6172db5f1001",
      "0xdadf89dd835cb7176fb5ebe35bf0f3940bbf3793b50e67f80436618b821fd236",
      "0xec360a42cf696acc210ae86777c26b3bb64cca8bb583ee3477a0c90fece07604",
      "0xb942cd035e71e3c8649dd87b433eb8f196fe8274b0b78044750cb69067ea2764",
      "0x727905b61c4d9d6ae79c949cdc822ac91549389bf8a608468ea833be191bd4ff",
      "0xa1f2ae1abc78e8ca455a10566b6c87a04261ffc1fe7f746b5068c0041ccaa393",
      "0xeab8e4d3256b6a10dc0e6660bbc19c766a50e6ad13b8e89ff66e09f5bf6d3eba"
  ]);

  const openWindow = () => {
    setWindowOpen(true);
    console.log(`${windowOpen}`);
    console.log(`${address}`)
    const formattedAddress = `${address}`;
    console.log(`Generated Merkle root: ${freeMerkleRoot}`);
    const leaf: Buffer = generateLeaf(formattedAddress);
    const freeProof = freeMerkleTree.getHexProof(leaf);
    console.log(freeProof);
    console.log(freeProof.length > 0);
    console.log(formattedAddress);
    setState(freeProof);
    console.log(state);
  }


  const { address, isConnected } = useAccount();

  const freeMintAddresses = [
    "0x000d0b5210dcaaa7073ac91d2634f5261d392ff3",
    "0x3eEfD987F062d4141682ceDb65B2caF577E3ad32",
    "0x002c609dc34918269e2174d82fcb6ecb4f6cf386",
    "0x003f35595dce3187b4fff2b5a2c4303f7158208a",
    "0x0055afbe3b961885de3bb63b7659465a7583cdbe",
    "0x009c97e9315d9f9f064d2991657fe0191631d7ff"
    
  ]

const { config: contractWriteConfig } = usePrepareContractWrite({
  ...contractConfig,
    functionName: 'generalAdoption',
    args: [`${mintCount}`],
    overrides: {
       value: ethers.utils.parseEther(`${mintPrice}`),
    },
  }
);

const freeLeafNodes = freeMintAddresses.map(addr => keccak256(addr));
const freeMerkleTree = new MerkleTree(freeLeafNodes, keccak256, { sortPairs: true });
const freeMerkleRoot = freeMerkleTree.getHexRoot();

const incrementMintCount = () => {
    let newMintCount = mintCount + 1;
    let newMintPrice = mintPrice + .015;
    if (newMintCount > 100) {
      newMintCount = 100;
    }
    setMintCount(newMintCount);
    setMintPrice(newMintPrice);
    console.log(address)
};

const decreaseMintCount = () => {
    let newMintCount = mintCount - 1;
    let newMintPrice = newMintCount * .015;
    if (newMintCount < 0) {
      newMintCount = 0;
      newMintPrice = 0;
    }
    setMintCount(newMintCount);
    setMintPrice(newMintPrice);
};

const {
    data: mintData,
    write: theMinter,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
} = useContractWrite(contractWriteConfig);

const { data: totalSupplyData } = useContractRead({
    ...contractConfig,
    functionName: 'totalSupply',
    watch: true,
});

const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
} = useWaitForTransaction({
    hash: mintData?.hash,
});

React.useEffect(() => {
    if (totalSupplyData && totalSupplyData as BigNumber) {
      setTotalMinted((totalSupplyData as BigNumber).toNumber());
    }
}, [totalSupplyData]);

const isMinted = txSuccess;



  const videoEl = useRef<HTMLVideoElement | null>(null);

  const attemptPlay = (): void => {
    if (videoEl && videoEl.current) {
    videoEl.current
    .play()
    .catch((error: Error) => {
    console.error("Error attempting to play", error);
    });
    }
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  return (
    <>
      <audio
        style={{ maxWidth: "100%", width: "150px", borderRadius: '20px', position: 'fixed', bottom: '10px', left: '10px' }}
        playsInline autoPlay loop controls
        src="https://cdn.discordapp.com/attachments/1070567978896216094/1070568473190735953/BlackSand_MSTR_1_Jan22_2023.wav"
        ref={videoEl}/>  
                      
    <div className={styles.container}>
      <div className={styles.subcontainer}>
      <div className={styles.card}>
        <div>
          <img className={styles.img} style={{borderRadius: '20px'}} src="https://media.discordapp.net/attachments/1070567978896216094/1072769175212273704/animated.gif?width=473&height=473" width={473} height={473} alt="baobob"/>
        </div>
      </div>
        <div className={styles.card1}>
          <h1 className={styles.title}>BlackSand Mounts Mint</h1>
          <p className={styles.text}>A new breed of steeds is roaming the lands of BlackSand. Constructed with magic from the remains of the QuantaPony War and powered by Quantum Crystals, the Mecha Ponies are built to defend the city and enable travel across the land. They were built to serve you.</p>
          <p className={styles.text}>Are you brave enough to embark on this new quest in the land of BlackSand?</p>
          <p className={styles.text}>Minting a BlackSand Mount will grant you a Mecha Pony, or in rare instances a 1 of 1 Mount. The initial mintable Supply of BlackSand Mounts is of <b style={{color: 'blue'}}>2,345</b> Mounts. Press the Mint bottom to initiate mint. Mint cost is <b style={{color: 'blue'}}>0.015</b> ETH + gas fees.</p>
          {/*<p className={styles.price}>Price: <span className={styles.bold}>0.1 ETH</span></p>
          <p className={styles.price}>Supply: <span className={styles.bold}>1111</span></p>*/}          
          <div className={styles.mint_container}>
           
          <div className={styles.supply_price}>
                <div className={styles.supply}>
                  <p className={styles.supply_title}>Minted from Current Supply</p>
                  <p className={styles.supply_text}>{totalMinted} / 2,345</p>
                </div>
                <div className={styles.price_mint}>
                  <p className={styles.supply_title}>Price per<br/> Token</p>
                  <p className={styles.supply_text}>0.015 ETH</p>
                </div>
                
          </div>
          <p className={styles.supply_subtext}>Max total supply of 10,000 from future additions.</p>
            <div className={styles.mint}>

              {/*Mint Button*/}
              <div className={styles.mint_card_button}>
                <div className={styles.plus}>      <button className={styles.minusbutton} onClick={() => decreaseMintCount?.()}><FaMinus/></button></div>
                <div className={styles.number}>{mintCount}</div>
                <div className={styles.minus}><button className={styles.incrementbutton} onClick={() => incrementMintCount?.()}><FaPlus/></button></div>
              </div>

              <p className={styles.totalcost}>Total Cost: {mintPrice} ETH</p>

              {/*Mint Button*/}
              <div className={styles.mint_card}>
              <button className={styles.mintbutton} disabled={!theMinter || isMintLoading || isMintStarted}
                        data-mint-loading={isMintLoading} data-mint-started={isMintStarted} onClick={() => theMinter?.()}>
                            MINT
                                {isMintLoading && 'Waiting for approval'}
                                {isMintStarted && 'Minting...'}
                                {!isMintLoading && !isMintStarted && ' '}
                    </button>
              </div>

            </div>
          </div>
        </div>
      </div>



    </div>
    
    </>
  )
}

export default Mint