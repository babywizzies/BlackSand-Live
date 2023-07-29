import { useState, useEffect, useContext } from "react"
import { ActorContext } from "./actorContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faSolid, faRotate } from "@fortawesome/free-solid-svg-icons"
import Fade from "@mui/material/Fade"
const axios = require("axios")
import styles from "../styles/css/layout.module.css"
// import { useWindowWidth } from "../utils/hooks";

export default function Actor() {
  const { currentAddress, actorNfts } = useContext(ActorContext)
  const { actorAvatar, setActorAvatar } = useContext(ActorContext)
  const { loadingAvatars } = useContext(ActorContext)

  const { fbwoContract, hocContract, blackContract, setActorNfts } = useContext(ActorContext)
  const [babyInput, setBabyInput] = useState("")
  const [heroInput, setHeroInput] = useState("")
  const [horseInput, setHorseInput] = useState("")

  const [showAvatarSelect, setShowAvatarSelect] = useState(false)

  const runes = [
    "/images/runes/cham_rune.png",
    "/images/runes/sur_rune.png",
    "/images/runes/io_rune.png",
    "/images/runes/lo_rune.png",
  ] // Pride
  

  // const width1400 = useWindowWidth(1400);

  // Actions
  async function selectAvatar(avatarIndex) {
    setActorAvatar(actorNfts[avatarIndex]) //, {...actorNfts[avatarIndex], id: result.data.avatarId}
  }

  function handleBabyInput(e) {
    setBabyInput(e.target.value)
  }

  function handleHeroInput(e) {
    setHeroInput(e.target.value)
  }

  function handleHorseInput(e) {
    setHorseInput(e.target.value)
  }

  async function addBaby(babyTokenId) {
    // Check if Actor owns requested Baby, if true add-avatar, else alert
    const owner = await fbwoContract.ownerOf(babyTokenId)
    if (owner.toLowerCase() === currentAddress.toLowerCase()) {
      const newBabyURI = await (babyTokenId)
      const babyImageAddress = "/images/babies/" + babyTokenId + ".png"
      await axios.post("/api/tokens/" + (babyTokenId)).then((response) => {
        // const iBaby = {
        //     address: currentAddress,
        //     name: response.data.name,
        //     img: response.data.image,
        //     tokenId: babyTokenId,
        //     universe: "Forgotten Babies Wizard Orphanage"
        //   }
        let iBaby
        if (response.data.image.substring(0, 5) === "https") {
          iBaby = {
            address: currentAddress,
            name: response.data.name,
            img: babyImageAddress,
            tokenId: babyTokenId,
            universe: "Forgotten Babies Wizard Orphanage",
          }
        } else {
          iBaby = {
            address: currentAddress,
            name: response.data.name,
            img:babyImageAddress,
            tokenId: babyTokenId,
            universe: "Forgotten Babies Wizard Orphanage",
          }
        }
        if (
          actorNfts.some(
            (avatar) =>
              avatar.name === response.data.name &&
              avatar.tokenId.toString() === babyTokenId
          )
        ) {
          console.log(currentAddress + " already owns " + response.data.name)
          alert(
            "The ANDTHENEUM has already acknolwedged your adoption of " +
              response.data.name
          )
        } else {
          axios.post("/api/add-avatar", iBaby).then((response) => {
            setActorNfts((prevState) => [...prevState, response.data])
          })
          console.log(response.data.name + " added to " + currentAddress)
          alert(
            "The ANDTHENEUM acknowledges your adoption of " + response.data.name
          )
        }
      })
    } else {
      alert("The ANDTHENEUM does not acknowledge your adoption of this baby.")
    }
  }

  async function addHero(heroTokenId) {
    // Check if Actor owns requested Baby, if true add-avatar, else alert
    const owner = await hocContract.ownerOf(heroTokenId)
    if (owner.toLowerCase() === currentAddress.toLowerCase()) {
      const newHeroURI = await hocContract.tokenURI(heroTokenId)
      await axios.post("/api/cors", { uri: newHeroURI }).then((response) => {
        // const iBaby = {
        //     address: currentAddress,
        //     name: response.data.name,
        //     img: response.data.image,
        //     tokenId: babyTokenId,
        //     universe: "Forgotten Babies Wizard Orphanage"
        //   }
        let iHero

        console.log("response:", response.data)

        if (response.data.image.substring(0, 5) === "https") {
          iHero = {
            address: currentAddress,
            name: response.data.name,
            img: response.data.image,
            tokenId: heroTokenId,
            universe: "Heroes of Cumberland",
          }
        } else {
          iHero = {
            address: currentAddress,
            name: response.data.name,
            img:
              "https" +
              response.data.image.substring(4, response.data.image.length),
            tokenId: heroTokenId,
            universe: "Heroes of Cumberland",
          }
        }
        if (
          actorNfts.some(
            (avatar) =>
              avatar.name === response.data.name &&
              avatar.tokenId.toString() === heroTokenId
          )
        ) {
          console.log(currentAddress + " already owns " + response.data.name)
          alert(
            "The ANDTHENEUM has already acknolwedged your assimilation of " +
              response.data.name
          )
        } else {
          axios.post("/api/add-avatar", iHero).then((response) => {
            setActorNfts((prevState) => [...prevState, response.data])
          })
          console.log(response.data.name + " added to " + currentAddress)
          alert(
            "The ANDTHENEUM acknowledges your assimilation of " +
              response.data.name
          )
        }
      })
    } else {
      alert(
        "The ANDTHENEUM does not acknowledge your assimilation of this hero."
      )
    }
  }

  async function addHorse(HorseTokenId) {
    // Check if Actor owns requested Baby, if true add-avatar, else alert
    const owner = await blackContract.ownerOf(HorseTokenId)
    if (owner.toLowerCase() === currentAddress.toLowerCase()) {
      const newHorseURI = await blackContract.tokenURI(HorseTokenId)
      await axios.post("/api/cors", { uri: newHorseURI }).then((response) => {
        // const iBaby = {
        //     address: currentAddress,
        //     name: response.data.name,
        //     img: response.data.image,
        //     tokenId: babyTokenId,
        //     universe: "Forgotten Babies Wizard Orphanage"
        //   }
        let iHorse

        console.log("response:", response.data)

        if (response.data.image.substring(0, 5) === "https") {
          iHorse = {
            address: currentAddress,
            name: response.data.name,
            img: response.data.image,
            tokenId: HorseTokenId,
            universe: "BlackSand",
          }
        } else {
          iHorse = {
            address: currentAddress,
            name: response.data.name,
            img:
              "https" +
              response.data.image.substring(4, response.data.image.length),
            tokenId: horseTokenId,
            universe: "BlackSand",
          }
        }
        if (
          actorNfts.some(
            (avatar) =>
              avatar.name === response.data.name &&
              avatar.tokenId.toString() === horseTokenId
          )
        ) {
          console.log(currentAddress + " already owns " + response.data.name)
          alert(
            "The ANDTHENEUM has already acknolwedged your assimilation of " +
              response.data.name
          )
        } else {
          axios.post("/api/add-avatar", iHorse).then((response) => {
            setActorNfts((prevState) => [...prevState, response.data])
          })
          console.log(response.data.name + " added to " + currentAddress)
          alert(
            "The ANDTHENEUM acknowledges your assimilation of " +
              response.data.name
          )
        }
      })
    } else {
      alert(
        "The ANDTHENEUM does not acknowledge your assimilation of this hero."
      )
    }
  }

  // Memory leek triggered at 109, may need to clean up Avatar Select in useEffect
  return (
    <>
      <div id={styles.actor}>
        <img
          className={`${styles.headerImg} ANDtablet`}
          src={actorAvatar.img}
          onClick={() => {
            setShowAvatarSelect(!showAvatarSelect)
          }}
        />
        {/* <button className={`${styles.avatarSelectBtn} hover-btn`} onClick={() => {
          setShowAvatarSelect(!showAvatarSelect);
        }}>{actorAvatar.name}</button> */}
      </div>

      <Fade in={showAvatarSelect} timeout={333}>
        <div id={styles.avatarSelector} className="ANDtablet">
          <button
            type="button"
            className="hover-btn"
            onClick={() => {
              setShowAvatarSelect(!showAvatarSelect)
            }}
          >
            <FontAwesomeIcon icon={faXmark} style={{ fontSize: 20 }} />
          </button>
          <div className={styles.actorAddress}>{currentAddress}</div>
          <div className={styles.avatarProfileHolder}>
            <img className={styles.avatarProfileImg} src={actorAvatar.img} />
            <div className={styles.avatarProfileInfo}>
              <h2>{actorAvatar.name}</h2>
              <h4>{actorAvatar.universe}</h4>
            </div>
          </div>
          <div className={styles.runeWordAvatarSelect}>
            {runes.map((rune, index) => (
              <img src={rune} className={styles.runeImg} key={index} />
            ))}
          </div>
          <div className={styles.avatarSelectHolderWrapper}>
            <div className={styles.avatarSelectHolder}>
              {actorNfts.map((nft, index) => {
                if (nft.name !== "A Chaos Portal Opens...") {
                  return (
                    <div
                      className={styles.avatarSelect}
                      key={index}
                      onClick={() => selectAvatar(index)}
                    >
                      <img
                        className={`${styles.avatarSelectImg} ANDtablet`}
                        src={nft.img}
                      />
                      <h3>{nft.name}</h3>
                      <h4 className={styles.avatarSelectUniverse}>
                        {nft.universe}
                      </h4>
                    </div>
                  )
                } else {
                  return null
                }
              })}
              {loadingAvatars && (
                <div className={styles.avatarSelect}>
                  <img
                    className={`${styles.avatarSelectImg} ANDtablet`}
                    src="/images/Chaos_Portal.png"
                  />
                  <h3>Loading...</h3>
                </div>
              )}
              <div className={styles.avatarSelect}>
                <img
                  className={`${styles.avatarSelectImg} ANDtablet`}
                  src="/images/brown_cow.png"
                />
                <h3>Invite Forgotten Baby</h3>
                <form
                  className={styles.addBabyForm}
                  onSubmit={(e) => {
                    e.preventDefault()
                    addBaby(babyInput)
                    setBabyInput("")
                  }}
                >
                  <input
                    type="number"
                    min="0"
                    max="9999"
                    placeholder="Baby tokenId"
                    onChange={handleBabyInput}
                    value={babyInput}
                    className={styles.babyInput}
                  />
                  <button type="submit" className="hover-btn">
                    +
                  </button>
                </form>
              </div>
              <div className={styles.avatarSelect}>
                <img
                  className={`${styles.avatarSelectImg} ANDtablet`}
                  src="/images/brock_shucker.png"
                />
                <h3>Invite Cumberlander</h3>
                <form
                  className={styles.addBabyForm}
                  onSubmit={(e) => {
                    e.preventDefault()
                    addHero(heroInput)
                    setHeroInput("")
                  }}
                >
                  <input
                    type="number"
                    min="0"
                    max="4597"
                    placeholder="Hero tokenId"
                    onChange={handleHeroInput}
                    value={heroInput}
                    className={styles.babyInput}
                  />
                  <button type="submit" className="hover-btn">
                    +
                  </button>
                </form>
              </div>
              <div className={styles.avatarSelect}>
                <img
                  className={`${styles.avatarSelectImg} ANDtablet`}
                  src="/images/brock_shucker.png"
                />
                <h3>Invite BlackSand Horse</h3>
                <form
                  className={styles.addBabyForm}
                  onSubmit={(e) => {
                    e.preventDefault()
                    addHorse(horseInput)
                    setHorseInput("")
                  }}
                >
                  <input
                    type="number"
                    min="0"
                    max="9999"
                    placeholder="Horse tokenId"
                    onChange={handleHorseInput}
                    value={horseInput}
                    className={styles.babyInput}
                  />
                  <button type="submit" className="hover-btn">
                    +
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </>
  )
}
