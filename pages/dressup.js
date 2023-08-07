import {useState, useEffect, useContext } from "react";
import Layout from "../components/layout";
//import Authenticator from "../components/authenticator"
import { ActorContext } from "../components/actorContext"
import Fade from "@mui/material/Fade";
import Link from "next/link";
import Ghalb from "../components/ghalb";
import styles from "../styles/css/dressup.module.css";
import clientPromise from "../lib/mongoosedb";
import { Feedback } from "../utils/models";
import Poll from "../components/Poll";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSolid, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Dressup() {
  const ShiftingShelfTitle = "Magic Wardrobe";
  const ShiftingShelfDescription = ""
  const ShiftingShelfImg = "/images/The-Shifting-Shelf-complete.gif";
  const ShiftingShelfRunes = ["/images/homebutton.png", "/images/faqbutton.png"]; // Wisdom
  const ShiftingShelfReturn = "/";
  const [tokenId, setTokenId] = useState('')

  const [body, setBody] = useState("");
  const [prop, setProp] = useState("");
  const [head, setHead] = useState("");
  const [familiar, setFamiliar] =useState("");
  const [rune, setRune] =useState("");
  const [background, setBackground] = useState("");
  const [glasses, setGlasses] = useState("none");
  const [headSrc, setHeadSrc] = useState("");
  const [bodySrc, setBodySrc] = useState("");
  const [propSrc, setPropSrc] = useState("");
  const [familiarSrc, setFamiliarSrc] = useState("");
  const [backgroundSrc, setBackgroundSrc] = useState("");
  const [runeSrc, setRuneSrc] = useState("");
  const [glassesSrc, setGlassesSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [glassesPush, setGlassesPush] = useState("none");
  const [headPush, setHeadPush] = useState("")
  const [traits, setTraits] = useState();
  const [ownership, setOwnership] = useState(false);
  const [adult, setAdult] = useState(1);
  const [pushId, setPushId] = useState ("0");
  
 
  const [loadedWardrobe, setLoadedWardrobe] = useState(false);
  
  const { currentAddress } = useContext(ActorContext);
  const [showAddFeedback, setShowAddFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const { actorAvatar } = useContext(ActorContext);
  const { actorNfts } = useContext(ActorContext);



  useEffect(() => {
    setTokenId(actorAvatar.tokenId);

  })
  
  let getData =() =>{
    console.log(actorAvatar);
    console.log(actorAvatar.tokenId);
    console.log(actorAvatar.universe);
  }

  let getBaby =() => {
    setOwnership(false);
    console.log(tokenId);
    console.log(hasActor);
    console.log(actorAvatar.traits)
    console.log(actorNfts)
    setLoading(true);
    let newId = parseInt(tokenId)
    let idString = newId + 10000;
    return axios
      .get(`/api/tokens/${tokenId}`)
      .then((result) => {
        console.log(result);
        console.log(result.data.attributes); 
        console.log(result.data.attributes[0].value);      
        setLoading(false);
        setTraits(result.data.attributes);
        setLoading(false);
        setLoading(false);
        setTokenId(tokenId)
        setBackground(result.data.attributes[0].value);
        setBody(result.data.attributes[1].value);
        setHead(result.data.attributes[2].value);
        setFamiliar(result.data.attributes[3].value);
        setRune(result.data.attributes[5].value);
        setProp(result.data.attributes[4].value);
        setHeadSrc('/images/images/Baby_Heads/' + result.data.attributes[2].value.replace(/ /g, "_").replace(/,/g, "") +'.png');
        setHeadPush(result.data.attributes[2].value.replace(/ /g, "_").replace(/,/g, ""));
        setRuneSrc('/images/images/rune/' + result.data.attributes[5].value + '.png');
        setFamiliarSrc('/images/images/familiar/' + result.data.attributes[3].value + '.png');
        setBackgroundSrc('/images/images/background/' + result.data.attributes[0].value + '.png');
        setPropSrc('/images/images/props/' + result.data.attributes[4].value + '.png');
        setBodySrc('/images/images/body/' + result.data.attributes[1].value + '.png')
        setPushId(tokenId);
        setLoadedWardrobe(true);
        
      })
      .catch((error) => {
        console.error("error: ", error);
        setLoading(false);
      });
  };

  let getWizard =() => {
    setOwnership(false);
    setLoading(true);
    console.log(isBaby)
    return axios
      .get(`/api/wizards/${tokenId}`)
      .then((result) => {
        console.log(result);
        console.log(result.data.attributes);
          setTraits(result.data.attributes);
          setLoading(false);
          console.log(result.data.attributes[1].value)
          setBackground(result.data.attributes[1].value);
          setBody(result.data.attributes[2].value);
          setHead(result.data.attributes[4].value);
          setFamiliar(result.data.attributes[3].value);
          setRune(result.data.attributes[6].value);
          setProp(result.data.attributes[5].value);
          setHeadSrc('/images/images/Adult_Heads/' + result.data.attributes[4].value.replace(/ /g, "_").replace(/,/g, "") +'.png');
          setHeadPush(result.data.attributes[4].value.replace(/ /g, "_").replace(/,/g, ""));
          setRuneSrc('/images/images/rune/' + result.data.attributes[6].value + '.png');
          setFamiliarSrc('/images/images/familiar/' + result.data.attributes[3].value + '.png');
          setBackgroundSrc('/images/images/background/' + result.data.attributes[1].value + '.png');
          setPropSrc('/images/images/props/' + result.data.attributes[5].value + '.png');
          setBodySrc('/images/images/body/' + result.data.attributes[2].value.replace(/ /g, "_").replace(/,/g, "") + '.png')
          setPushId(tokenId);
        
      })
      .catch((error) => {
        console.error("error: ", error);
        setLoading(false);
      });
  };

  let getWarrior =() => {
    setOwnership(false);
    setLoading(true);
    return axios
      .get(`https://portal.forgottenrunes.com/api/warriors/data/${tokenId}`)
      .then((result) => {
        console.log(result);
        console.log(result.data.attributes);
          setTraits(result.data.attributes);
          setLoading(false);
          console.log(result.data.attributes[1].value)
          setBackground(result.data.attributes[0].value);
          setBody(result.data.attributes[2].value);
          setHead(result.data.attributes[3].value);
          setFamiliar(result.data.attributes[1].value);
          setRune(result.data.attributes[6].value);
          setProp(result.data.attributes[5].value);
          setHeadSrc('/images/images/warriors/heads/head-' + result.data.attributes[3].value.replace(/ /g, "-").replace(/,/g, "").toLowerCase() +'.png');
          setHeadPush(result.data.attributes[4].value.replace(/ /g, "_").replace(/,/g, ""));
          setRuneSrc('/images/images/warriors/rune/' + result.data.attributes[6].value + '.png');
          setFamiliarSrc('/images/images/warriors/companions/companion-' + result.data.attributes[1].value.replace(/ /g, "-") + '.png');
          setBackgroundSrc('/images/images/background/' + result.data.attributes[0].value + '.png');
          setPropSrc('/images/images/warriors/weapons/weapon-' + result.data.attributes[5].value.replace(/ /g, "-") + '.png');
          setBodySrc('/images/images/warriors/bodies/body-' + result.data.attributes[2].value.replace(/ /g, "-").replace(/,/g, "-").toLowerCase() + '.png')
          setPushId(tokenId);
        
      })
      .catch((error) => {
        console.error("error: ", error);
        setLoading(false);
      });
  };

  let jQuerycode = () => {
       
    let requestModel = {
        tokenId: pushId,
  
        buildObject : [
            {name: "background", "item": background},
            {name: "body", "item": body.replace(/ /g, "_")},
            {name: "head", "item": headPush.replace(/ /g, "_").replace(/,/g, "")},
            {name: "prop", "item": prop.replace(/ /g, "_").replace(/:/g, "").toLowerCase()},
            {name: "familiar", "item": familiar.replace(/ /g, "_").toLowerCase()},
            {name: "rune", "item": rune.replace(/ /g, "_")},
            {name: "glasses", "item": glassesPush.replace(/ /g, "_").replace(/,/g, "")}
        ]
    }
  
    axios.post('http://localhost:5555/art', requestModel)
    .then(function(response) {
        let storedImageLocation = response.data;
        let cleanImage = storedImageLocation.replace(/\\/g, "/");
        setInterval(() => {
            $('#babyImage').attr("src", "file:///"+cleanImage + "?rand=" + Math.random());
        }, 500);
    });
  
    }

    let jQuerycode2 = () => {
       
      let requestModel = {
          tokenId: pushId,
          name: actorAvatar.name,
          buildObject : [
              {name: "background", "item": background},
              {name: "body", "item": body.replace(/ /g, "_")},
              {name: "head", "item": headPush.replace(/ /g, "_").replace(/,/g, "")},
              {name: "prop", "item": prop.replace(/ /g, "_").replace(/:/g, "").toLowerCase()},
              {name: "familiar", "item": familiar.replace(/ /g, "_").toLowerCase()},
              {name: "rune", "item": rune.replace(/ /g, "_")},
              {name: "glasses", "item": glassesPush.replace(/ /g, "_").replace(/,/g, "")}
          ]
      }
    
      axios.post("/art/", requestModel)
      .then(function(response) {
          let storedImageLocation = response.data;
          let cleanImage = storedImageLocation.replace(/\\/g, "/");
          setInterval(() => {
              $('babyImage').attr("src", "file:///"+cleanImage + "?rand=" + Math.random());
          }, 500);
      });
    
      }
  
  






  const isBaby = (actorAvatar.universe === "Forgotten Babies Wizard Orphanage");


  const getButton = () => {
    if(actorAvatar.universe === "Forgotten Babies Wizard Orphanage"){
      getBaby();
    } else if(actorAvatar.universe === "Forgotten Runes Wizard Cult"){
      getWizard();
    } else if(actorAvatar.universe === "Forgotten Runes Warrior Guild"){
      getWarrior();
    }

  }

  const hasActor = (actorAvatar.universe != "ANDTHENEUM");

  return (
    <>
      <Layout pageTitle={ShiftingShelfTitle} pageDescription={ShiftingShelfDescription} pageImg={ShiftingShelfImg} pageRunes={ShiftingShelfRunes} pageReturn={ShiftingShelfReturn}>
      <div className={styles.main}>
      <div className={styles.portrait}>
          <div 
            style={{
              width: "300px",
              height: "300px",
              position: "absolute",
              backgroundSize: "300px 300px",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url("${backgroundSrc}")`,
              zIndex: 1
            }}
          ></div>
          <div 
            style={{
            width: "300px",
            height: "300px",
            position: "absolute",
            backgroundSize: "300px 300px",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url("${bodySrc.replace(/ /g, "_")}")`,     
            zIndex: 3
            }}
          ></div>
          <div 
            style={{
              position: "absolute",
              width: "300px",
              height: "300px",
              backgroundSize: "300px 300px",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url("${propSrc.replace(/ /g, "").replace(/ /g, "_")}")`,       
              zIndex: 4
            }}
          ></div>
          <div 
            style={{
              width: "300px",
              height: "300px",
              position: "absolute",
              backgroundSize: "300px 300px",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url("${glassesSrc.replace(/ /g, "_").replace(/,/g, "")}")`,       
              zIndex: 4
            }}
          ></div>
          <div 
            style={{
              width: "300px",
              height: "300px",
              position: "absolute",
              backgroundSize: "300px 300px",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url("${runeSrc.replace(/ /g, "_")}")`,
              zIndex: 3
            }}
          ></div>     
          <div 
            style={{
              width: "300px",
              height: "300px",
              position: "absolute",
              backgroundSize: "300px 300px",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url("${headSrc.replace(/ /g, "_").replace(/,/g, "")}")`,
              zIndex: 3
            }}
          ></div>
          <div 
            style={{
              width: "300px",
              height: "300px",
              position: "relative",
              backgroundSize: "300px 300px",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url("${familiarSrc.replace(/ /g, "_").toLowerCase()}")`,
              zIndex: 1
            }}
          ></div>
        </div>    
       </div>
       <div className={styles.grid}>
       <button
             style={{ marginTop: 24 }}
             className={styles.loadButton}
             onClick={() => getButton?.()}
           >
            {!hasActor &&(
              <p>Connect your wallet and load your character</p>
            )}
            {hasActor && !loadedWardrobe &&(
              <p>Load {actorAvatar.name}</p>
            )}
            {hasActor && loadedWardrobe &&(
              <p>Reset</p>
            )}
           </button>
           {hasActor && loadedWardrobe &&(
              
            
           <button style={{ marginTop: 24 }}
             className={styles.loadButton}
             onClick={() => jQuerycode2?.()}>
              <p>Save Metadata</p>
             </button>
             )}


      </div>
      <div className={styles.grid}>
         {isBaby && (
          <div className={styles.card}>
            <h2>Hat</h2>
            <select defaultValue = "null" onChange={(e) => {
                  setHead(e.target.value);
                  e.preventDefault();

                  
                  setHeadSrc('../images/assets/babies/Heads/' + head + '_farmer.png');
                  setHeadPush(head + '_farmer');
                
                  
            }}>
                
                  <option value="none">None</option>
                  <option value="farmer" >Farmer</option>
            </select>
          </div>
         )}
         {!isBaby && (
           <div className={styles.card}>
           <h2>Body</h2>
           <select defaultValue = "null" onChange={(e) => {
                          e.preventDefault();
                          
                          if(
                            e.target.value === "FringeVestFlareJeansHeels"
                            ||e.target.value === "Tie_Dye_light"
                            ||e.target.value === "Rainbow_Dress_Dark"
                            ||e.target.value === "Rainbow_Dress_Light"
                            ||e.target.value === "Tie_Dye_Dark"
                            ){    
                              setBody(e.target.value);
                              setBodySrc('/images/images/body/' + e.target.value + '.png');
                              setHeadSrc('/images/images/Adult_Heads/' + head +'.png');
                              setHeadPush(head);
                            }
                           else if(
                            e.target.value === "Baby_Baked_Bill_Onesie"
                          ||e.target.value === "Baby_Blue_Dino_Onesie"
                          ||e.target.value === "Baby_Pink_Dino_Onesie" 
                          ||e.target.value === "Baby_Orange_Dino_Onesie"
                          ||e.target.value === "Baby_Blue_Dino_Onesie"
                          ||e.target.value === "Baby_Green_Dino_Onesie" 
                          ||e.target.value === "Baby_Purple_Dino_Onesie"
                          ||e.target.value === "Baby_Cat_Onesie"
                          ||e.target.value === "Baby_Fox_Onesie"
                          ||e.target.value === "Baby_Wolf_Onesie")
                          {
                            setBody(e.target.value);
                            setBodySrc("/images/images/body/" + e.target.value + ".png");
                            setHeadSrc('/images/images/Baby_Heads/' + head + '_onesie.png');
                            setHeadPush(head + '_onesie');
                          }
                           else{
                          
                            setBody(e.target.value);
                            setBodySrc("/images/images/body/" + e.target.value + ".png");
                            setHeadSrc('/images/images/Adult_Heads/' + head + '_Onesie.png');
                            setHeadPush(head + '_Onesie');
                            
                        }
                           }}>
          
            <option value="Baked_Bill_Onesie" >Baked Bill Onesie</option>
            <option value="Blue_Dino_Onesie" >Blue Dino Onesie</option>
            <option value="Green_Dino_Onesie" >Green Dino Onesie</option>
            <option value="Orange_Dino_Onesie" >Orange Dino Onesie</option>
            <option value="Pink_Dino_Onesie" >Pink Dino Onesie</option>
            <option value="Purple_Dino_Onesie" >Purple Dino Onesie</option>
            <option value="Fox_Onesie" >Fox Onesie</option>
            <option value="Wolf_Onesie" >Wolf Onesie</option>
            <option value="Rainbow_Dress_Dark" >Tie Dye Dress (dark)</option>
            <option value="Rainbow_Dress_Light" >Tie Dye dress (light)</option>
            <option value="Rainbow_Dress_Green" >Tie Dye dress (green)</option>
            <option value="Tie_Dye_light">Tie Dye Outfit(light)</option>
            <option value="Tie_Dye_Dark" >Tie Dye Outfit (dark)</option>
            <option value="Tie_Dye_Green" >Tie Dye Outfit (green)</option>
            <option value="FringeVestFlareJeansHeels" >Fringe Vest</option>
            <option value="Cat_Onesie" >Cat Onesie</option>
            <option value="Giraffe_Onesie" >Giraffe Onesie</option>
            <option value="Penguin_Onesie" >Penguin Onesie</option>
            <option value="Kobold_Onesie" >Kobold Onesie</option>

       
          </select>
          </div>
         )}
         {isBaby && (
          <div className={styles.card}>
          <h2>Body</h2>
           <select defaultValue = "null" onChange={(e) => {
            e.preventDefault();
            if(
              e.target.value === "Baby_Baked_Bill_Onesie"
            ||e.target.value === "Baby_Blue_Dino_Onesie"
            ||e.target.value === "Baby_Pink_Dino_Onesie" 
            ||e.target.value === "Baby_Orange_Dino_Onesie"
            ||e.target.value === "Baby_Blue_Dino_Onesie"
            ||e.target.value === "Baby_Green_Dino_Onesie" 
            ||e.target.value === "Baby_Purple_Dino_Onesie"
            ||e.target.value === "Baby_Cat_Onesie"
            ||e.target.value === "Baby_Fox_Onesie"
            ||e.target.value === "Baby_Wolf_Onesie")
            {
              setBody(e.target.value);
              setBodySrc("/images/images/body/" + e.target.value + ".png");
              setHeadSrc('/images/images/Baby_Heads/' + head + '_onesie.png');
              setHeadPush(head + '_onesie');
            }
             else{
            
              setBody(e.target.value);
              setBodySrc("../images/assets/babies/Bodies/" + e.target.value + ".png");
              
          }
             }}>
            <option value={body} >Default</option>
            <option value="denim_overalls" >Denim Overalls</option>
            <option value="plaid_overalls" >Plaid Overalls</option>
            <option value="green_poncho" >Green Poncho</option>
            <option value="red_poncho" >Red Poncho</option>
            <option value="yellow_poncho" >Yellow Poncho</option>

            
           
           </select>
           </div>
         )}


          <div className={styles.card}>
            <h2>Prop</h2>
              <select defaultValue = "none" onChange={(e) => {
                          e.preventDefault();
                          setProp(e.target.value);
                          setPropSrc('../images/assets/babies/Props/' + e.target.value + '.png');
                           }}>
             <option value="none">none</option>
             <option value="basket_of_eggs">Basket of Eggs</option>
             <option value="basket_of_herbs">Basket of Herbs</option>
             <option value="bucket_of_water">Bucket of Water</option>
             <option value="daisy">Daisy</option>
             <option value="shovel">Shovel</option>
             <option value="spade_fork">Spade Fork</option>
             <option value="watering_can">Watering Can</option>
             <option value="wheat">Wheat</option>

             </select>
          </div>
          {!isBaby && (
          <div
              className={styles.card}

          >


            <h2>Glasses</h2>
            
              <select defaultValue = "null" onChange={(e) => {
                          e.preventDefault();
                          setGlasses(e.target.value);
                          if(e.target.value === "null"){
                          setGlassesPush("");
                          setGlassesSrc("");
                          } else {
                            setGlassesPush(head + '_' + e.target.value); 
                            setGlassesSrc('/images/images/Adult_Heads/' + head + '_' + e.target.value + '.png');
                          }
                          
                          
                           }}>
                <option value="null" >no glasses</option>
                <option value="Fractal" >Fractal</option>
                <option value="Green" >Green</option>
                <option value="Pink" >Pink</option>
                <option value="Yellow" >Yellow</option>
                <option value="Rasta" >Rasta</option>
                <option value="Rainbow" >Rainbow</option>
            </select>
          </div>
          )}

{!isBaby && (
          <div
              className={styles.card}
          >

            
            <h2>familiar</h2>
              <select defaultValue = "null" onChange={(e) => {
                          e.preventDefault();
                          setGlasses(e.target.value);
                          if(e.target.value === "null"){
                          setGlassesPush("");
                          setGlassesSrc("");
                          } else {
                            setFamiliar(e.target.value); 
                            setFamiliarSrc('/images/images/warriors/companions/' + e.target.value + '.png');
                          }
                          
                          
                           }}>
                <option value="none" >No Familiar</option>
                <option value="anykylosaurus" >Anykylosaurus</option>
                <option value="coyote" >Coyote</option>
                <option value="deathstalker_scorpion" >Deathstalker Scorpion</option>
                <option value="desert_bighorn_sheep" >Desert Bighorn Sheep</option>
                <option value="desert_hedgehog" >Desert Hedgehog</option>
                <option value="dwarf_crocodile" >Dwarf Crocodile</option>
                <option value="fennec_fox" >Fenec Fox</option>
                <option value="roadrunner" >Roadrunner</option>
                <option value="sand_cat" >Sand Cat</option>
                <option value="sun_bear" >Sun Bear</option>
                <option value="thorny_devil" >Thorny Devil</option>
                
            </select>
          </div>

)}



        </div>
        
       
        <div className={styles.grid}>
        <div>
        <img id="babyImage" height="512"/>
                </div>
        <p>TokenID: {tokenId}</p>
                        <p>PushID: {pushId} </p>
            <p>Body: {body}</p>
            <p>Head: {head}</p>
            
            <p>Prop: {propSrc}</p>
            <p>Familiar: {familiarSrc.replace(/ /g, "_")}</p>
            <p>Rune: {runeSrc.replace(/ /g, "_")}</p>
            <p>Glasses: {glassesSrc}</p>
            <p>Background: {backgroundSrc}</p>
            <p>Head link: {headSrc.replace(/ /g, "_").replace(/,/g, "")}</p>
            <p>Body link: {bodySrc}</p>
            <p>Glasses link: {glassesSrc.replace(/ /g, "_")}</p>
          </div>
       <Poll />                    
      </Layout>
    </>


  )
}

export async function getServerSideProps(context) {
  try {
    // const { client } = await connectToDatabase();

    const connection = await clientPromise;

    return {
      props: { isConnected: true },
    }
  } catch (err) {
    console.log(err);
    return {
      props: { isConnected: false },
    }
  }
}
