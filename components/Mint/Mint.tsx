import React, { useEffect, useState } from "react";
import useIsMounted from "../../hooks/useIsMounted";
import styles from "styles/css/mint.module.css";
import type { NextPage } from "next";
import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import { ethers } from "ethers";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import contractInterface from "./ponies.json";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

const contractConfig = {
  address: "0xf486f696B80164B5943191236ECa114f4EfAb2FF",
  abi: contractInterface,
};

function generateLeaf(address: string): Buffer {
  return Buffer.from(
    // Hash in appropriate Merkle format
    ethers.utils.solidityKeccak256(["address"], [address]).slice(2),
    "hex"
  );
}

const Home: NextPage = () => {
  const mounted = useIsMounted();
  const [totalMinted, setTotalMinted] = useState(0);
  const [mintCount, setMintCount] = useState(1);
  const [mintPrice, setMintPrice] = useState(0.015);
  const [windowOpen, setWindowOpen] = useState(false);
  const [state, setState] = useState([
    "0xa2e6187a2cbb2c7e7f2983513349ca96a236c47e68e6746da2ba372fa800160a",
    "0xd4077dfcabb0083e19757e3d53f9b64e267ab7c6818152d52ad2a1e3d3810b11",
    "0x2e63a1a1f32748107853f221ab8e5c402386e64c41b0e6b2e1bd237f550923d0",
    "0x8befa861653b2d8e4871806c9cda0d4745ade9b592cb405ce3cb6172db5f1001",
    "0xdadf89dd835cb7176fb5ebe35bf0f3940bbf3793b50e67f80436618b821fd236",
    "0xec360a42cf696acc210ae86777c26b3bb64cca8bb583ee3477a0c90fece07604",
    "0xb942cd035e71e3c8649dd87b433eb8f196fe8274b0b78044750cb69067ea2764",
    "0x727905b61c4d9d6ae79c949cdc822ac91549389bf8a608468ea833be191bd4ff",
    "0xa1f2ae1abc78e8ca455a10566b6c87a04261ffc1fe7f746b5068c0041ccaa393",
    "0xeab8e4d3256b6a10dc0e6660bbc19c766a50e6ad13b8e89ff66e09f5bf6d3eba",
  ]);

  const { address, isConnected } = useAccount();

  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "generalMinting",
    args: [`${mintCount}`],
    overrides: {
      value: ethers.utils.parseEther(`${mintPrice}`),
    },
  });

  const openWindow = () => {
    setWindowOpen(true);
    console.log(`${windowOpen}`);
    console.log(`${address}`);
    const formattedAddress = `${address}`;
    console.log(`Generated Merkle root: ${freeMerkleRoot}`);
    const leaf: Buffer = generateLeaf(formattedAddress);
    const freeProof = freeMerkleTree.getHexProof(leaf);
    console.log(freeProof);
    console.log(freeProof.length > 0);
    console.log(formattedAddress);
    setState(freeProof);
    console.log(state);
  };

  const freeMintAddresses = [
    "0xa278ac5baeb8c9d61009de01bf645b37a99f3cb0",
    "0xba7a9701a17577438ba4c6a678b533404cef3be0",
    "0x49Bb41AcC0652B73d256CbFbD6D03a380b66C9B4",
    "0x7bb5b34557b1d9e8c1314d0b3d252e89e67e3e05",
    "0x9baf1b105b591b2107620017dbe02ca8d7589a49",
    "0x16afc501d6fc8bf59eceb099c47856365146b3ae",
    "0xAd77B519C6478916f50041fC4f67e61AF24791bD",
    "0x642486e3e2a495ef250914b51b880d92423779b4",
    "0x1c91f3034c235f24d39157e9f052d152f4c3857e",
    "0x03d98afe917cdb9c5e281fb2b5d265c97c64c658",
    "0x0de23a9ecd3dd9029d8e02b2e4cb75995f8892a5",
    "0x3c6cf50343d972db4373a3e8482c9681efbda6f6",
    "0x04639dde98f7a4a0baae251b72d185d135054d82",
    "0x311e19313b2f9227071b9c0ea628ff1d7c37e33b",
    "0x80786110d07ce195c27efa51dd4056b32e6cd5f6",
    "0x16dc0c47c6e9b6714083581c961247604df1ac0d",
    "0x47a85fc0944f4c3de37ae7bfa8ed6dededa52384",
    "0xb2c124efed88b47d799a88969461bfbb314b31a6",
    "0xb2c034dd75be61609a63e490770d3ff06762365d",
    "0x7468d5c63b8d86f48e59356663b919860fe493f5",
    "0xac3b04591aeb4ab599c09207cbfafbab53d9074f",
    "0x331436ce8cd0da36e3f635a25a76db5fc90d3874",
    "0x40cdc151735b4e48befa23914bb85ad397b7663e",
    "0xf6607ad5992f32448d307ddc20f71d88b4fe35a5",
    "0xef51C8BE528Fa9AD489fE06aB9F87Bcb927BB4d2",
    "0x5576eb650629a895ea152373154441d0248ccfa7",
    "0x65b051f26aa4489a9cc2f6ca522aa047ed0794e7",
    "0xf49ee5fe8641e7b7d01f587c9c9470875f6971fa",
    "0x145eb0c7f29e0d9481473623ef3c2182a58ede01",
    "0x51bf7c8c7fff8104602e8301f1a8f2eeb9252c9d",
    "0x6b6f551b381b843c086d1999a0131d108aecf103",
    "0x0d36b66c49cd24d8f166aa63fd06f1db65820e6a",
    "0x6bac312510ab444294d8581da819ac6d4f97f64c",
    "0x4c47fc9583a2cd55eca27f566c02adc282b2813b",
    "0x46711ca6043df42ecc9da99851649eecd99f8cd7",
    "0x1ed9c08cd235345c7d429c4b4bbf661d20ff3459",
    "0xf8a065f287d91d77cd626af38ffa220d9b552a2b",
    "0x155bf49e1a07928dd6603b2314737c5fb95157a2",
    "0x13ed8515ea47b0b2dc20c7478f839e92b48f6a3b",
    "0xbf892063bd9dd3a28364a68d286a9ef840712d03",
    "0x1df6a2a5c1f90a23aa52f65ee5bdc82a195c188a",
    "0x946a58054fadf84018ca798bddad14ebba0a042d",
    "0x164054859641a56bf767713f983777ab1278cac4",
    "0x16a7cf1b739fc45d7ceac90ad6a7582126db4b00",
    "0xc185ffb12406b8bd994c7805ed0339ce9f2529ec",
    "0x0e6c79ce2cd7f3ab2a2d512979974a4a7707ffa4",
    "0xa1457afa30b8e396cde5bac320ed7c8e7b521bc8",
    "0x68a76d0e226aae0f7b98006376c067da7b86d8dd",
    "0x4bb4c1B0745ef7B4642fEECcd0740deC417ca0a0",
    "0x1282f34438cb205d201dd357398b85e7729dd3a2",
    "0xfd90bb9b16a4c5e8982656f9aff71f598b90887b",
    "0xa682a34618dcb2b0b4e38dd55af4e9281726b021",
    "0x1cf2663f97e55212d11f917812efca8a63326207",
    "0x92999a52c3503fa56467ae64b3859285d206fc31",
    "0x026ecda77935e24dac6044cc86a946926ea097d5",
    "0x6dc88b231cd04dd1b1e525161162993f47140006",
    "0x5e9539bb342d293856d10c2f10756a3f84f21aa8",
    "0xfda57ccdf46804b4b0d892e078f5537682954c5a",
    "0x73efda13bc0d0717b4f2f36418279fd4e2cd0af9",
    "0x26e2bf786dc254de9d260cc9b283731ec6f73baa",
    "0x1A494A36637888D1A9Acd950b32530Ef462E6110",
    "0xf7fdb7652171d5c2722b4cdd62c92e90f73c437e",
    "0x8d12b8c3bef358d1901d891a74fa801aba2b79b0",
    "0x722b53fa46c646fdd49bdaf659ea79584c552303",
    "0xd836a2851b8174b44c4b292941f95576a0377ea5",
    "0x80786110d07ce195c27efa51dd4056b32e6cd5f6",
    "0x36a23c6bd25f0599c2a6fb20fa493f0cff934b0a",
    "0xd9ff1f43c2ebee45cef21c6145196659b9d0fc52",
    "0x36bb8b403846cdab5721601b008630eae76d0079",
    "0x8b98f66b5f97caeb4e28965863ebb106b0989e3f",
    "0x1a7d839dad213e8664411be731754ca9abcac2f7",
    "0x077e88ffe6f64fbd91620587df23c88282cb3711",
    "0x19ae234341234e494121fd2364d5e730a8dd9115",
    "0x62799b3b97baac306498f721079f3a9405a91e41",
    "0xc64cff13b928f67fec4545d3a485af317a535f91",
    "0xd3e7183f85af100ebea219a8b831548360096639",
    "0x632b9317ea3c2f51b79d7f7e22e597075fcf1f4e",
    "0x9d041df7ba6d00b6fc2965d9641de6792d120922",
    "0xcfe772359db751f44b24ff72b4a74f68a2f8675a",
    "0x193ac8ecb86c04292ed3f2afa04faa4f384a0dae",
    "0x8ccb07293755004942f4451aeba897db44631061",
    "0x36867a20de281a3735e4ecfc7dc4e207665a73de",
    "0xdd6fc77a8906fa244c87b4d973fbf0fe5c14c8a9",
    "0x712ba94da536a4508b2f766c4cbf709002b6e85c",
    "0x75a41e5ed80182a386adf89c7a389c97d5cff6ff",
    "0x58024b6c1005de40eac2d4c06bc947ebf2a302af",
    "0x87172f6be6b072f8ed3d9e17287b3f01f15ea7a8",
    "0xd6568542b1f65bb18a45d710b1072dc73225b840",
    "0x2ae2075bb52b6789ce7ed2b39df3ac57b9bcf978",
    "0x58214fe23f3efd4105a3674fa951e3968435b774",
    "0x4261737782fe47196e0ba23efdcd8ddadda6ee52",
    "0x32cc2ec897f21a77a704e9a7313af6a640c47bb5",
    "0x7595aae132f157951071e09fc5ab2d8091696d0b",
    "0x3D118873c7EB884F6FdA06EFD4D04B89BF780aCb",
    "0xf71c76f3449bc86997b69f0cb3702dcb4e01a9c3",
    "0xb4128149024e4bb06261a3fb47a24268022def9a",
    "0x85c0c09570c955f6e07522e9ad6041716cbbb7fe",
    "0x7a9414cf84f0f46d16f25db90a6a39b2d3b6fea3",
    "0xac6745e88c85a44a6d8bddc11de2c93a94ef900c",
    "0x794a4cd6d00ec47bfbbaafe1f4ff78ac4f72b38e",
    "0xaff3fac3690e531a311cb7b3d4b77b37f49bfab3",
    "0x3D6cCBa8486ca6fbA9dce7566c1Aed6389c6eA30",
    "0xCa26c23a4887a7fb3609CFFF5cBFEB1f31bE3200",
    "0x72F8e33464945f59aF27b1CCeD86DE811d25bDDb",
    "0x6D198eAaC23ffb8e6E85A905A214acF04CBc6e62",
    "0x18Cf929E79FfC16c636efCDeada5825Ff3176Aa0",
    "0x18Cf929E79FfC16c636efCDeada5825Ff3176Aa0",
    "0x5263e948afF6849Ce33E3B3745C6950e4ce18d93",
    "0x13A7d2Fb3F73B57EF539C35C4Ec59Ed49b1833cA",
    "0xe7F41de4E3452C4FE63EA301bc126049608F8E97",
    "0x65eEBd65FF97C16dF7edbC40A1b20B7CdcAE101A",
    "0x0303eE7033319F99D5486EaaBeF6E3D685eF89cB",
    "0x11A707fDbEe1b53400C27e6A3d1765f00203112c",
    "0x9301ABc00151c3E5AF33ab24704D5bC47BabbdE2",
    "0x4a521144bFCbFCDe2dBe4be1F69D6a527C46dDbF",
    "0x3f8004e81067052aA9fABd5a8Ee68B4f265dDE2E",
    "0x6dF382c91387F616168B16B45b55df7FB19F51cA",
    "0x9F286319BE34810f17FdaD364D9CCaefac31407D",
    "0x72F6f6B069109889152B764833e40AF1409eFf5A",
    "0x62D6B3e413FBf7B3483640eC617C124aF982B85F",
    "0xBa82d3985ab1A2590df4D13c941f38B36f3CC20c",
    "0xFa43b254584C0EdAE92e57db903e0eac695908e9",
    "0xEC17972701B011c3983F1EaFdFB4450028284bc7",
    "0x53dfeee3c7f446bbe6b8b995908b9571a3e7f5df",
    "0x084c47930E7480e818cf2C373e9fa9411d5f1382",
    "0x48F56f5a6F5F15d91D477cEACa08223de21AA28A",
    "0x9B63E090Ca2dc9581D24267417dDfC6dBDf12e30",
    "0x023455cc4b39493cef4f53886211e867c6e8e833",
    "0xD0306ee0ec152E4d2289992ce5d2Dba98d07D103",
    "0xAB5cC2dEec956719632694a02B1942819AB0D349",
  ];

  const freeLeafNodes = freeMintAddresses.map((addr) => keccak256(addr));
  const freeMerkleTree = new MerkleTree(freeLeafNodes, keccak256, {
    sortPairs: true,
  });
  const freeMerkleRoot = freeMerkleTree.getHexRoot();

  const incrementMintCount = () => {
    let newMintCount = mintCount + 1;
    let newMintPrice = Math.round(mintPrice * 1000 + 0.015 * 1000) / 1000;
    if (newMintCount > 25) {
      newMintCount = 25;
    }
    if (newMintPrice > 0.375) {
      newMintPrice = 0.375;
    }
    setMintCount(newMintCount);
    setMintPrice(newMintPrice);
  };

  const decreaseMintCount = () => {
    let newMintCount = mintCount - 1;
    let newMintPrice = Math.round(mintPrice * 1000 - 0.015 * 1000) / 1000;
    if (newMintCount < 0) {
      newMintCount = 0;
      newMintPrice = 0;
    }
    setMintCount(newMintCount);
    setMintPrice(newMintPrice);
    console.log(theMinter);
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
    functionName: "totalSupply",
    watch: true,
  });

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted((totalSupplyData as any).toNumber());
    }
  }, [totalSupplyData]);

  const isMinted = txSuccess;

  return (
    <>
      <div className={styles.card1}>
        <h1 className={styles.title}>Mint: BlackSand Mounts</h1>
        <p className={styles.text}>
          A new breed of steeds is roaming the lands of BlackSand. Constructed
          with magic from the remains of the QuantaPony War and powered by
          Quantum Crystals, the Mecha Ponies are built to defend the city and
          enable travel across the land.
          <br />
          <br />
          They were built to serve you. Are you brave enough to embark on this
          new quest in the land of BlackSand? Minting a BlackSand Mount will
          grant you a Mecha Pony, or in rare instances a 1 of 1 Mount. The
          initial mintable Supply of BlackSand Mounts is 2,345 Mounts. Press the
          Mint button to initiate mint. Mint cost is 0.015 ETH + gas fees.
        </p>
        <div className={styles["mint-animation"]}>
          <Image
            style={{ borderRadius: "30px" }}
            className={styles["mint-animation-gif"]}
            alt="mint animation"
            src="/img/mint-animation.gif"
            layout="fill"
          />
        </div>
        <div className={styles.mint_container}>
          <div className={styles.supply_price}>
            <div className={styles.minted}>
              <p className={styles.supply_title}>Minted</p>
              <p className={styles.supply_text}>{totalMinted}</p>
            </div>
            <div className={styles.supply}>
              <p className={styles.supply_title}>Supply</p>
              <p className={styles.supply_text}>2,345</p>
            </div>
            <div className={styles.price_mint}>
              <p className={styles.supply_title}>Price</p>
              <p className={styles.supply_text}>0.015 ETH</p>
            </div>
          </div>
          <p className={styles.supply_subtext}>
            Max total supply of 10,000 from future additions.
          </p>
          <div className={styles.mint}>
            <div className={styles.mint_card_button}>
              <div className={styles.plus}>
                {" "}
                <button
                  className={styles.minusbutton}
                  onClick={() => decreaseMintCount?.()}
                >
                  -
                </button>
              </div>
              <div className={styles.number}>{mintCount}</div>
              <div className={styles.minus}>
                <button
                  className={styles.incrementbutton}
                  onClick={() => incrementMintCount?.()}
                >
                  +
                </button>
              </div>
            </div>
            <p className={styles.totalcost}>Total Cost: {mintPrice} ETH</p>
            {windowOpen && !isMinted && (
              <button className={styles.book} onClick={() => openWindow?.()}>
                Check presale status
              </button>
            )}
            {!windowOpen && !isMinted && mounted && (
              <div className={styles.mint_card}>
                {!isConnected && (
                  <ConnectButton.Custom>
                    {({
                      account,
                      chain,
                      openAccountModal,
                      openChainModal,
                      openConnectModal,
                      mounted,
                    }) => {
                      // Note: If your app doesn't use authentication, you
                      // can remove all 'authenticationStatus' checks
                      const ready = mounted && "loading";
                      const connected =
                        ready && account && chain && "authenticated";

                      return (
                        <div
                          {...(!ready && {
                            "aria-hidden": true,
                            style: {
                              opacity: 0,
                              pointerEvents: "none",
                              userSelect: "none",
                            },
                          })}
                        >
                          {(() => {
                            if (!connected) {
                              return (
                                <button
                                  style={{
                                    backgroundColor: "white",
                                    fontSize: "18px",
                                    padding: "10px 20px 10px 20px",
                                    borderRadius: "15px",
                                    color: "black",
                                    fontWeight: "800",
                                    cursor: "pointer",
                                  }}
                                  onClick={openConnectModal}
                                  type="button"
                                >
                                  Connect Wallet
                                </button>
                              );
                            }

                            if (chain?.unsupported) {
                              return (
                                <button onClick={openChainModal} type="button">
                                  Wrong network
                                </button>
                              );
                            }

                            /*return (
                      <button style={{backgroundColor: 'transparent', fontSize: '16px', color: 'white', fontWeight: '700', cursor: 'pointer'}} onClick={openAccountModal} type="button">
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ''}
                      </button>
                  );*/
                          })()}
                        </div>
                      );
                    }}
                  </ConnectButton.Custom>
                )}
                {mounted && isConnected && (
                  <button
                    className={styles.mintbutton}
                    disabled={!theMinter || isMintLoading || isMintStarted}
                    data-mint-loading={isMintLoading}
                    data-mint-started={isMintStarted}
                    onClick={() => theMinter?.()}
                  >
                    {!theMinter &&
                      isConnected &&
                      "You are unable to mint at this time"}
                    {theMinter && !isMintStarted && "Mint"}
                    {isMintLoading && "Waiting for approval"}
                    {isMintStarted && "Minting..."}
                    {!isMintLoading && !isMintStarted && " "}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
