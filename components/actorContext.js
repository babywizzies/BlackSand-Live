import React, { createContext, useState, useEffect } from "react"
import { ethers } from "ethers"
import {
  FRWC_CONTRACT,
  FS_CONTRACT,
  FRIV_CONTRACT,
  FRP_CONTRACT,
  FRB_CONTRACT,
  FRBS_CONTRACT,
  FBWO_CONTRACT,
  GAWDS_CONTRACT,
  HOC_CONTRACT,
  BLACK_CONTRACT,
  /* CO_CONTRACT */
} from "../utils/constants"
import FRWC_ABI from "../utils/FRWC.json"
import FS_ABI from "../utils/FS.json"
import FRIV_ABI from "../utils/FRIV.json"
import FRP_ABI from "../utils/FRP.json"
import FRB_ABI from "../utils/FRB.json"
import FRBS_ABI from "../utils/FRBS.json"
import FBWO_ABI from "../utils/FBWO.json"
import GAWDS_ABI from "../utils/GAWDS.json"
import HOC_ABI from "../utils/HOC.json"
import BLACK_ABI from "../utils/BLACK.json"
import { ethersFetcher } from "use-nft"
// import CO_ABI from "../utils/CO.json";
const axios = require("axios")

// Create Global Actor Context
export const ActorContext = createContext()

export const ActorContextProvider = ({ children }) => {
  // Set the Actor's eth address and selected avatar as site-wide context
  const [currentAddress, setCurrentAddress] = useState(null)
  const [actorAvatar, setActorAvatar] = useState({
    address: currentAddress,
    name: "A Chaos Portal Opens...",
    nickname: "",
    img: "/images/Chaos_Portal.png",
    _id: null,
    universe: "ANDTHENEUM",
  })

  
  // Stateful Actor's NFTs
  const [actorNfts, setActorNfts] = useState([])

  // Contract States
  const [frwcContract, setFrwcContract] = useState(null)
  const [fsContract, setFsContract] = useState(null)
  const [frivContract, setFrivContract] = useState(null)
  const [frpContract, setFrpContract] = useState(null)
  const [frbContract, setFrbContract] = useState(null)
  const [frbsContract, setFrbsContract] = useState(null)
  const [fbwoContract, setFbwoContract] = useState(null)
  const [blackContract, setBlackContract] = useState(null)
  const [gawdsContract, setGawdsContract] = useState(null)
  const [hocContract, setHocContract] = useState(null)
  // const [colonyContract, setColonyContract] = useState(null);

  // Utility States
  const [isMarcy, setIsMarcy] = useState(false)
  const [descriptionOpen, setDescriptionOpen] = useState(false)
  const [loadingAvatars, setLoadingAvatars] = useState(true)

  useEffect(() => {
    if (
      currentAddress === "0x6c8a38b22b473b3737b87656b92dacc17c798fe3" &&
      actorAvatar.name === "Chaos Mage Marceline of the Andtheneum"
    ) {
      console.log("Hello Marcy")
      setIsMarcy(true)
    } else {
      setIsMarcy(false)
    }
  }, [actorAvatar])

  // Load the FRWC, GAWDS and Colony contracts into state as
  // frwcContract, gawdsContract, colonyContract
  useEffect(() => {
    const { ethereum } = window
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const contractFRWC = new ethers.Contract(FRWC_CONTRACT, FRWC_ABI, signer)
      const contractFS = new ethers.Contract(FS_CONTRACT, FS_ABI, signer)
      const contractFRIV = new ethers.Contract(FRIV_CONTRACT, FRIV_ABI, signer)
      const contractFRP = new ethers.Contract(FRP_CONTRACT, FRP_ABI, signer)
      const contractFRB = new ethers.Contract(FRB_CONTRACT, FRB_ABI, signer)
      const contractFRBS = new ethers.Contract(FRBS_CONTRACT, FRBS_ABI, signer)
      const contractFBWO = new ethers.Contract(FBWO_CONTRACT, FBWO_ABI, signer)
      const contractBLACK = new ethers.Contract(BLACK_CONTRACT, BLACK_ABI, signer)
      const contractGAWDS = new ethers.Contract(
        GAWDS_CONTRACT,
        GAWDS_ABI,
        signer
      )
      const contractHOC = new ethers.Contract(HOC_CONTRACT, HOC_ABI, signer)
      // const contractCO = new ethers.Contract(
      //   CO_CONTRACT,
      //   CO_ABI,
      //   signer
      // )
      setFrwcContract(contractFRWC)
      setFsContract(contractFS)
      setFrivContract(contractFRIV)
      setFrpContract(contractFRP)
      setFrbContract(contractFRB)
      setFrbsContract(contractFRBS)
      setFbwoContract(contractFBWO)
      setGawdsContract(contractGAWDS)
      setHocContract(contractHOC)
      setBlackContract(contractBLACK)
      // setColonyContract(contractCO);
    } else {
      console.log("No ethereum object found")
    }
  }, [])

  // Retrieve the Actor's Forgotten Runes NFT avatars from the contracts, save into state as actorNfts
  useEffect(() => {
    const getActorNFTs = async () => {
      try {
        // If Actor exists, fetch/refresh avatars, else save/load avatars
        const getActorNFTs = await axios.get("/api/get-actor/" + currentAddress)
        setActorNfts(getActor.data.avatars)
        setActorAvatar(
          getActor.data.avatars.filter(
            (avatar) => avatar.name === "A Chaos Portal Opens..."
          )[0]
        )

        // CULL AVATARS transfered out of Actor's currentAddress
        for (i = 0; i < getActor.data.avatars.length; i++) {
          if (
            getActor.data.avatars[i].universe === "Forgotten Runes Wizard Cult"
          ) {
            const addressCheck = await frwcContract.ownerOf(
              getActor.data.avatars[i].tokenId
            )
            if (addressCheck.toLowerCase() !== currentAddress.toLowerCase()) {
              console.log(
                currentAddress +
                  " no longer owns " +
                  getActor.data.avatars[i].name +
                  ", removing tokenId from " +
                  currentAddress
              )
              setActorNfts(
                getActor.data.avatars.filter(
                  (avatar) => avatar.name !== getActor.data.avatars[i].name
                )
              )
              await axios
                .patch(
                  "/api/remove-avatar/" +
                    currentAddress +
                    "/" +
                    getActor.data.avatars[i]._id
                )
                .then((result) => {
                  console.log(result.data)
                })
            } else {
              console.log(
                getActor.data.avatars[i].name +
                  " need not be removed from " +
                  currentAddress
              )
            }
          } else if (getActor.data.avatars[i].universe === "Forgotten Souls") {
            const addressCheck = await fsContract.ownerOf(
              getActor.data.avatars[i].tokenId
            )
            if (addressCheck.toLowerCase() !== currentAddress.toLowerCase()) {
              console.log(
                currentAddress +
                  " no longer owns " +
                  getActor.data.avatars[i].name +
                  ", removing tokenId from " +
                  currentAddress
              )
              setActorNfts((prevState) =>
                prevState.filter(
                  (avatar) => avatar.name !== getActor.data.avatars[i].name
                )
              )
              await axios
                .patch(
                  "/api/remove-avatar/" +
                    currentAddress +
                    "/" +
                    getActor.data.avatars[i]._id
                )
                .then((result) => {
                  console.log("remove-avatar result:", result.data)
                })
            } else {
              console.log(
                getActor.data.avatars[i].name +
                  " need not be removed from " +
                  currentAddress
              )
            }
          } else if (
            getActor.data.avatars[i].universe === "Forgotten Runes Ponies"
          ) {
            const addressCheck = await frpContract.ownerOf(
              getActor.data.avatars[i].tokenId
            )
            if (addressCheck.toLowerCase() !== currentAddress.toLowerCase()) {
              console.log(
                currentAddress +
                  " no longer owns " +
                  getActor.data.avatars[i].name +
                  ", removing tokenId from " +
                  currentAddress
              )
              setActorNfts((prevState) =>
                prevState.filter(
                  (avatar) => avatar.name !== getActor.data.avatars[i].name
                )
              )
              await axios
                .patch(
                  "/api/remove-avatar/" +
                    currentAddress +
                    "/" +
                    getActor.data.avatars[i]._id
                )
                .then((result) => {
                  console.log("remove-avatar result:", result.data)
                })
            } else {
              console.log(
                getActor.data.avatars[i].name +
                  " need not be removed from " +
                  currentAddress
              )
            }
          } else if (
            getActor.data.avatars[i].universe === "Forgotten Runes Beasts"
          ) {
            const addressCheck = await frbContract.ownerOf(
              getActor.data.avatars[i].tokenId
            )
            if (addressCheck.toLowerCase() !== currentAddress.toLowerCase()) {
              console.log(
                currentAddress +
                  " no longer owns " +
                  getActor.data.avatars[i].name +
                  ", removing tokenId from " +
                  currentAddress
              )
              setActorNfts((prevState) =>
                prevState.filter(
                  (avatar) => avatar.name !== getActor.data.avatars[i].name
                )
              )
              await axios
                .patch(
                  "/api/remove-avatar/" +
                    currentAddress +
                    "/" +
                    getActor.data.avatars[i]._id
                )
                .then((result) => {
                  console.log("remove-avatar result:", result.data)
                })
            } else {
              console.log(
                getActor.data.avatars[i].name +
                  " need not be removed from " +
                  currentAddress
              )
            }
          } else if (
            getActor.data.avatars[i].universe === "Forgotten Runes Beast Spawn"
          ) {
            const addressCheck = await frbsContract.ownerOf(
              getActor.data.avatars[i].tokenId
            )
            if (addressCheck.toLowerCase() !== currentAddress.toLowerCase()) {
              console.log(
                currentAddress +
                  " no longer owns " +
                  getActor.data.avatars[i].name +
                  ", removing tokenId from " +
                  currentAddress
              )
              setActorNfts((prevState) =>
                prevState.filter(
                  (avatar) => avatar.name !== getActor.data.avatars[i].name
                )
              )
              await axios
                .patch(
                  "/api/remove-avatar/" +
                    currentAddress +
                    "/" +
                    getActor.data.avatars[i]._id
                )
                .then((result) => {
                  console.log("remove-avatar result:", result.data)
                })
            } else {
              console.log(
                getActor.data.avatars[i].name +
                  " need not be removed from " +
                  currentAddress
              )
            }
          } else if (
            getActor.data.avatars[i].universe === "Forgotten Babies Wizard Orphanage"
          ) {
            const addressCheck = await fbwoContract.ownerOf(
              getActor.data.avatars[i].tokenId
            )
            if (addressCheck.toLowerCase() !== currentAddress.toLowerCase()) {
              console.log(
                currentAddress +
                  " no longer owns " +
                  getActor.data.avatars[i].name +
                  ", removing tokenId from " +
                  currentAddress
              )
              setActorNfts((prevState) =>
                prevState.filter(
                  (avatar) => avatar.name !== getActor.data.avatars[i].name
                )
              )
              await axios
                .patch(
                  "/api/remove-avatar/" +
                    currentAddress +
                    "/" +
                    getActor.data.avatars[i]._id
                )
                .then((result) => {
                  console.log("remove-avatar result:", result.data)
                })
            } else {
              console.log(
                getActor.data.avatars[i].name +
                  " need not be removed from " +
                  currentAddress
              )
            }
          } else if (
            getActor.data.avatars[i].universe ===  "BlackSand Mounts"
          ) {
            const addressCheck = await blackContract.ownerOf(
              getActor.data.avatars[i].tokenId
            )
            if (addressCheck.toLowerCase() !== currentAddress.toLowerCase()) {
              console.log(
                currentAddress +
                  " no longer owns " +
                  getActor.data.avatars[i].name +
                  ", removing tokenId from " +
                  currentAddress
              )
              setActorNfts((prevState) =>
                prevState.filter(
                  (avatar) => avatar.name !== getActor.data.avatars[i].name
                )
              )
              await axios
                .patch(
                  "/api/remove-avatar/" +
                    currentAddress +
                    "/" +
                    getActor.data.avatars[i]._id
                )
                .then((result) => {
                  console.log("remove-avatar result:", result.data)
                })
            } else {
              console.log(
                getActor.data.avatars[i].name +
                  " need not be removed from " +
                  currentAddress
              )
            }
          }
        }

        // ADD AVATARS which are newly added to currentAddress

        // Check Actor's FRWC balance, add-avatar if missing
        const actorWizBalance = await frwcContract.balanceOf(currentAddress)
        for (let i = 0; i < actorWizBalance; i++) {
          const newWiz = await frwcContract.tokenOfOwnerByIndex(
            currentAddress,
            i
          )
          const newWizURI = await frwcContract.tokenURI(newWiz.toNumber())
          const newWizPinataURI =
            "https://gateway.pinata.cloud/ipfs/" +
            newWizURI.substring(7, newWizURI.length)
          await axios.get(newWizPinataURI).then((response) => {
            if (
              getActor.data.avatars.some(
                (avatar) =>
                  avatar.name === "Chaos Mage Marceline of the Andtheneum" &&
                  avatar.tokenId === 660
              )
            ) {
              console.log(
                currentAddress +
                  " already owns Chaos Mage Marceline of the Andtheneum"
              )
            } else if (
              getActor.data.avatars.some(
                (avatar) =>
                  avatar.name === response.data.name &&
                  avatar.tokenId === newWiz.toNumber()
              )
            ) {
              console.log(
                currentAddress + " already owns " + response.data.name
              )
            } else {
              const wizImg = response.data.image
              const wizFinalImg =
                "https://gateway.pinata.cloud/ipfs/" +
                wizImg.substring(7, wizImg.length)
              const iWiz = {
                address: currentAddress,
                name: response.data.name,
                img: wizFinalImg,
                tokenId: newWiz.toNumber(),
                universe: "Forgotten Runes Wizard Cult",
              }
              axios.post("/api/add-avatar", iWiz).then((response) => {
                setActorNfts((prevState) => [...prevState, response.data])
              })
              console.log(response.data.name + " added to " + currentAddress)
            }
          })
        }

        // Check Actor's FS balance, add-avatar if missing
        const actorSoulBalance = await fsContract.balanceOf(currentAddress)
        for (let i = 0; i < actorSoulBalance; i++) {
          const newSoul = await fsContract.tokenOfOwnerByIndex(
            currentAddress,
            i
          )
          const newSoulURI = await fsContract.tokenURI(newSoul.toNumber())
          await axios.get(newSoulURI).then((response) => {
            if (
              getActor.data.avatars.some(
                (avatar) =>
                  avatar.name === response.data.name &&
                  avatar.tokenId === newSoul.toNumber()
              )
            ) {
              console.log(
                currentAddress + " already owns " + response.data.name
              )
            } else {
              const iSoul = {
                address: currentAddress,
                name: response.data.name,
                img: response.data.image,
                tokenId: newSoul.toNumber(),
                universe: "Forgotten Souls",
              }
              axios.post("/api/add-avatar", iSoul).then((response) => {
                setActorNfts((prevState) => [...prevState, response.data])
              })
              console.log(response.data.name + " added to " + currentAddress)
            }
          })
        }

        // Check Actor's FRP balance, add-avatar if missing
        const actorPonyBalance = await frpContract.balanceOf(currentAddress)
        for (let i = 0; i < actorPonyBalance; i++) {
          const newPony = await frpContract.tokenOfOwnerByIndex(
            currentAddress,
            i
          )
          const newPonyURI = await frpContract.tokenURI(newPony.toNumber())
          await axios.get(newPonyURI).then((response) => {
            if (
              getActor.data.avatars.some(
                (avatar) =>
                  avatar.name === response.data.name &&
                  avatar.tokenId === newPony.toNumber()
              )
            ) {
              console.log(
                currentAddress + " already owns " + response.data.name
              )
            } else {
              const iPony = {
                address: currentAddress,
                name: response.data.name,
                img: response.data.image,
                tokenId: newPony.toNumber(),
                universe: "Forgotten Runes Ponies",
              }
              axios.post("/api/add-avatar", iPony).then((response) => {
                setActorNfts((prevState) => [...prevState, response.data])
              })
              console.log(response.data.name + " added to " + currentAddress)
            }
          })
        }

        

        // Check Actor's FRB balance, add-avatar if missing
        const actorBeastBalance = await frbContract.balanceOf(currentAddress)
        if (actorBeastBalance > 0) {
          const numBeasts = await frbContract.numMinted()
          for (let i = 1; i <= numBeasts.toNumber(); i++) {
            const owner = await frbContract.ownerOf(i)
            if (owner === currentAddress) {
              const newBeastURI = await frbContract.tokenURI(i)
              await axios.get(newBeastURI).then((response) => {
                if (
                  getActor.data.avatars.some(
                    (avatar) =>
                      avatar.name === response.data.name && avatar.tokenId === i
                  )
                ) {
                  console.log(
                    currentAddress + " already owns " + response.data.name
                  )
                } else {
                  const iBeast = {
                    address: currentAddress,
                    name: response.data.name,
                    img: response.data.image,
                    tokenId: i,
                    universe: "Forgotten Runes Beasts",
                  }
                  axios.post("/api/add-avatar", iBeast).then((response) => {
                    setActorNfts((prevState) => [...prevState, response.data])
                  })
                  console.log(
                    response.data.name + " added to " + currentAddress
                  )
                }
              })
            }
          }
        }

        // Check Actor's FRBS balance, add-avatar if missing
        const actorSpawnBalance = await frbsContract.balanceOf(currentAddress)
        if (actorSpawnBalance > 0) {
          const numSpawns = await frbsContract.numMinted()
          for (let i = 0; i < numSpawns.toNumber(); i++) {
            const owner = await frbsContract.ownerOf(i)
            if (owner === currentAddress) {
              const newSpawnURI = await frbsContract.tokenURI(i)
              await axios.get(newSpawnURI).then((response) => {
                if (
                  getActor.data.avatars.some(
                    (avatar) =>
                      avatar.name === response.data.name && avatar.tokenId === i
                  )
                ) {
                  console.log(
                    currentAddress + " already owns " + response.data.name
                  )
                } else {
                  const iSpawn = {
                    address: currentAddress,
                    name: response.data.name + " #" + i,
                    img: response.data.image,
                    tokenId: i,
                    universe: "Forgotten Runes Beast Spawn",
                  }
                  axios.post("/api/add-avatar", iSpawn).then((response) => {
                    setActorNfts((prevState) => [...prevState, response.data])
                  })
                  console.log(
                    response.data.name + " added to " + currentAddress
                  )
                }
              })
            }
          }
        }

        const actorHorseBalance = await blackContract.balanceOf(currentAddress)
        for (let i = 0; i < actorHorseBalance; i++) {
          const newHorse = await blackContract.tokenOfOwnerByIndex(
            currentAddress,
            i
          )
          const newHorseURI = await blackContract.tokenURI(newHorse.toNumber())
          await axios.get(newHorseURI).then((response) => {
            if (
              getActor.data.avatars.some(
                (avatar) =>
                  avatar.name === response.data.name &&
                  avatar.tokenId === newHorse.toNumber()
              )
            ) {
              console.log(
                currentAddress + " already owns " + response.data.name
              )
            } else {
              const iHorse = {
                address: currentAddress,
                name: response.data.name,
                img: response.data.image,
                tokenId: newHorse.toNumber(),
                universe: "BlackSand Mounts",
              }
              axios.post("/api/add-avatar", iHorse).then((response) => {
                setActorNfts((prevState) => [...prevState, response.data])
              })
              console.log(response.data.name + " added to " + currentAddress)
            }
          })
        }

        // KEEP BELOW
        //   // Retrieve Actor's Babies ERC721Enumerable
        //   // const actorBabyBalance = await fbwoContract.balanceOf(currentAddress);
        //   // for (let i = 0; i < actorBabyBalance; i++) {
        //   //   const newBaby = await fbwoContract.tokenOfOwnerByIndex(currentAddress, i);
        //   //   const newBabyURI = await fbwoContract.tokenURI(newBaby.toNumber());
        //   //   await axios.get(newBabyURI).then(response => {
        //   //     const iBaby = {
        //   //       address: currentAddress,
        //   //       name: response.data.name,
        //   //       img: response.data.image,
        //   //       universe: "Forgotten Babies Wizard Orphanage"
        //   //     }
        //   //     axios.post("/api/add-avatar", iBaby).then(response => {
        //   //       setActorNfts(prevState => [...prevState, response.data]);
        //   //     })
        //   //   })
        //   // }
        //
        //   //SILENCED UNTIL ENUMERATION RESOLUTION
        //   // Retrieve Actor's Babies
        //   // const numBabies = 10000;
        //   // for (let i = 0; i < numBabies; i++) {
        //   //   const owner = await fbwoContract.ownerOf(i);
        //   //   console.log("on baby ", i);
        //   //   console.log("owner", owner);
        //   //   if (owner === currentAddress) {
        //   //     const newBabyURI = await fbwoContract.tokenURI(i);
        //   //     await axios.get(newBabyURI).then(response => {
        //   //       const iBaby = {
        //   //           address: currentAddress,
        //   //           name: response.data.name,
        //   //           img: response.data.image,
        //   //           universe: "Forgotten Babies Wizard Orphanage"
        //   //         }
        //   //         axios.post("/api/add-avatar", iBaby).then(response => {
        //   //           setActorNfts(prevState => [...prevState, response.data]);
        //   //         })
        //   //     })
        //   //   }
        //   // }
        //

        // Check w0nd3r's GAWDS balance, add-avatar if missing
        if (currentAddress === "0x6c8a38b22b473b3737b87656b92dacc17c798fe3") {
          const actorGawdsBalance = await gawdsContract.balanceOf(
            currentAddress
          )
          for (let i = 0; i < actorGawdsBalance; i++) {
            const newGawd = await gawdsContract.tokenOfOwnerByIndex(
              currentAddress,
              i
            )
            const newGawdURI = await gawdsContract.tokenURI(newGawd.toNumber())
            await axios
              .post("/api/cors", { uri: newGawdURI })
              .then((response) => {
                if (
                  getActor.data.avatars.some(
                    (avatar) =>
                      avatar.name === response.data.name &&
                      avatar.tokenId === newGawd.toNumber()
                  )
                ) {
                  console.log(
                    currentAddress + " already owns " + response.data.name
                  )
                } else {
                  const iGawd = {
                    address: currentAddress,
                    name: response.data.name,
                    img: response.data.image,
                    tokenId: newGawd.toNumber(),
                    universe: "Gawds",
                  }
                  axios.post("/api/add-avatar", iGawd).then((response) => {
                    setActorNfts((prevState) => [...prevState, response.data])
                  })
                  console.log(
                    response.data.name + " added to " + currentAddress
                  )
                }
              })
          }

          // Retrieve Actor's Colonists
          // const actorColonistsBalance = await colonyContract.balanceOf(currentAddress);
          // for (let i = 0; i < actorColonistsBalance; i++) {
          //   const newColonist = await colonyContract.tokenOfOwnerByIndex(currentAddress, i);
          //   const newColonistURI = await colonyContract.tokenURI(newColonist.toNumber());
          //   const getNewColonistInfo = await axios.post("/api/cors", {uri: newColonistURI}).then((response) => {
          //     const iColonist = {
          //       address: currentAddress,
          //       name: response.data.name,
          //       img: response.data.image,
          //       universe: "Colony Online"
          //     }
          //     axios.post("/api/add-avatar", iColonist).then(response => {
          //       setActorNfts(prevState => [...prevState, response.data]);
          //     })
          //   })
          // }
        }

        getActor = []
        setLoadingAvatars(false)
      } catch (err) {
        console.log("Error Getting Actor NFTs:", err)
      }
    }
    if (
      frwcContract &&
      fsContract &&
      frpContract &&
      frbContract &&
      frbsContract &&
      fbwoContract &&
      blackContract &&
      // hocContract &&
      gawdsContract /* && colonyContract */
    ) {
      getActorNFTs()
    }
  }, [currentAddress])

  // useEffect(() => {
  //
  //   setActorAvatar((prevState) =>(
  //     {
  //       ...prevState,
  //       address: currentAddress
  //     })
  //   )
  // }, [currentAddress]);

  return (
    <ActorContext.Provider
      value={{
        currentAddress,
        setCurrentAddress,
        actorAvatar,
        setActorAvatar,
        actorNfts,
        setActorNfts,
        isMarcy,
        loadingAvatars,
        descriptionOpen,
        setDescriptionOpen,
        fbwoContract,
        blackContract,
        hocContract,
      }}
    >
      {children}
    </ActorContext.Provider>
  )
}

