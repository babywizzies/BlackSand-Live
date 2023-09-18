/* eslint-disable react/no-unescaped-entities */
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "../../styles/css/wardrobe.module.css";
import { useAccount, useSignMessage } from "wagmi";
import useIsMounted from "../../hooks/useIsMounted";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { TokenMedia, useUserTokens } from "@reservoir0x/reservoir-kit-ui";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import TokenCard from "./TokenCard";
import EditionCard from "./EditionCard"
import PonyCard from "./PonyCard";
import SelectedTreatCard from "./SelectedTreatCard";
import axios from "axios";
import Confetti from "react-dom-confetti";
import useAudio from "../../hooks/useAudio";
import Modal from "../Modal";

export type SelectedTreat = {
  name: string;
  id: string;
  img: string;
};

const PONY_CONTRACT = "0xf55b615b479482440135ebf1b907fd4c37ed9420";
const BLACKSAND_EDITIONS ="0x9c4437bb194672b5fd75a4731f603cfba8941505"
const WIZARD_CONTRACT = "0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42";
const BS_MOUNT_CONTRACT = "0xf486f696b80164b5943191236eca114f4efab2ff";
const WARRIOR_CONTRACT = "0x9690b63eb85467be5267a3603f770589ab12dc95";
const ITEM_CONTRACT = "0x7c104b4db94494688027cced1e2ebfb89642c80f";
const COLLECTION_SET_ID =
  "c22b4bd34c1aed0b6ac30ca32937b787275f3c59315b57d4b441dafe196448a7";



const canAddItem = (
  id: string,
  selectedItems: SelectedTreat[],
  totalOwned: number,
  itemsOwned: number[]
) => {
  if (selectedItems.length >= 3) {
    return false;
  }
  const selectedCount = selectedItems.filter((item) => item.id === id);

  if (totalOwned <= selectedCount.length) {
    return false;
  }


  return true;
};

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const Wardrobe = () => {
  const poniesRef = createRef<HTMLDivElement>();
  const editionRef = createRef<HTMLDivElement>();
  const ponyRef = createRef<HTMLDivElement>();
  const specialItemsRef = createRef<HTMLHeadingElement>();
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const isMounted = useIsMounted();
  const [selectedRacer, setSelectedRacer] = useState<string | undefined>();
  const [selectedItems, setSelectedItems] = useState<SelectedTreat[]>([]);
  const [selectedEdition, setSelectedEdition] = useState<string | undefined>();
  const [selectedPony, setSelectedPony] = useState<string | undefined>();
 
  const [success, setSuccess] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [registeredModalOpen, setRegisteredModalOpen] = useState(false);
  const [openWindow, setOpenWindow] = useState(false);
  const [openEdition, setOpenEdition] = useState(false);
  const [openPony, setOpenPony] = useState(false);
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
  

  // Sounds
  useAudio("/audio/paddock-bg.mp3", {
    autoplay: true,
    volume: 0.2,
    loop: true,
  });
  const horseSelectedSound = useAudio("/audio/horse-selected.mp3", {
    volume: 0.2,
  });
  const treatSound1 = useAudio("/audio/treat-sound-1.mp3", {
    volume: 0.2,
  });
  const treatSound2 = useAudio("/audio/treat-sound-2.mp3", {
    volume: 0.2,
  });
  const treatSound3 = useAudio("/audio/treat-sound-3.mp3", {
    volume: 0.3,
  });
  const treatSounds = [treatSound1, treatSound2, treatSound3];
  const registeredSound = useAudio("/audio/horses-galloping.mp3", {
    volume: 0.4,
  });
  const { data: tokenData, isLoading: isLoadingTokens } = useUserTokens(
    address,
    {
      collectionsSetId: COLLECTION_SET_ID,
      limit: 200,
    }
  );

  const { data: itemTokenData } = useUserTokens(address, {
    collection: ITEM_CONTRACT,
    limit: 200,
  });


  const itemTokens = useMemo(
    () =>
      itemTokenData?.filter((tokenData) =>
        tokenData?.token?.tokenId
      ),
    [itemTokenData]
  );
  const ponyTokens = useMemo(
    () =>
      tokenData?.filter(
        (tokenData) => tokenData?.token?.contract === PONY_CONTRACT
      ),
    [tokenData]
  );
  const wizardTokens = useMemo(
    () =>
      tokenData?.filter(
        (tokenData) => tokenData?.token?.contract === WIZARD_CONTRACT
      ),
    [tokenData]
  );
  const mountTokens = useMemo(
    () =>
      tokenData?.filter(
        (tokenData) => tokenData?.token?.contract === BS_MOUNT_CONTRACT
      ),
    [tokenData]
  );
  const editionsTokens = useMemo(
    () =>
      tokenData?.filter(
        (tokenData) => tokenData?.token?.contract === BLACKSAND_EDITIONS
      ),
    [tokenData]
  );
  const warriorTokens = useMemo(
    () =>
      tokenData?.filter(
        (tokenData) => tokenData?.token?.contract === WARRIOR_CONTRACT
      ),
    [tokenData]
  );

  



  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Paddock</h1>
      {!address && (
        <div className={styles["connect-container"]}>
          <div className={styles["connect-subtitle"]}>
            Connect your wallet to see the mounts in your paddock
          </div>
          <ConnectButton />
        </div>
      )}
      {address && (
        <div className={styles.paddock_container}>

          <div className={styles.paddock_card}>
            <h2 className={styles.subtitle_card}>Racing Selection</h2>
            <div
              className={styles.racing_selection}
            >

              {/*Edition */}
              {openEdition && (
              <div
                className={styles["selection-pony"]}
                onClick={() => {
                  if (!selectedEdition) {
                    editionRef.current?.scrollIntoView({
                      block: "nearest",
                      inline: "start",
                      behavior: "smooth",
                      //@ts-ignore
                      alignToTop: false,
                    });
                  }
                }}
              >
                {!selectedEdition ? (
                  <>
                    <FaPlus />
                    <Image
                      src="/img/pony.png"
                      width={60}
                      height={60}
                      alt="Placeholder"
                    />
                  </>
                ) : (
                  <Image
                    src={`https://api.reservoir.tools/redirect/tokens/${selectedEdition}/image/v1`}
                    alt="Racer"
                    fill
                    unoptimized
                    loader={({ src }) => src}
                  />
                )}
              </div>
              )}
              
              {/* Mounts */}
              {openWindow && (
              <div
                className={styles["selection-pony"]}
                onClick={() => {
                  if (!selectedRacer) {
                    poniesRef.current?.scrollIntoView({
                      block: "nearest",
                      inline: "start",
                      behavior: "smooth",
                      //@ts-ignore
                      alignToTop: false,
                    });
                  }
                }}
              >
                {!selectedRacer ? (
                  <>
                    <FaPlus />
                    <Image
                      src="/img/pony.png"
                      width={60}
                      height={60}
                      alt="Placeholder"
                    />
                  </>
                ) : (
                  <Image
                    src={`https://api.reservoir.tools/redirect/tokens/${selectedRacer}/image/v1`}
                    alt="Racer"
                    fill
                    unoptimized
                    loader={({ src }) => src}
                  />
                )}
              </div>
              )}

              {/* Pony */}
              {openPony && (
              <div
                className={styles["selection-pony"]}
                onClick={() => {
                  if (!selectedPony) {
                    ponyRef.current?.scrollIntoView({
                      block: "nearest",
                      inline: "start",
                      behavior: "smooth",
                      //@ts-ignore
                      alignToTop: false,
                    });
                  }
                }}
              >
                {!selectedPony ? (
                  <>
                    <FaPlus />
                    <Image
                      src="/img/pony.png"
                      width={60}
                      height={60}
                      alt="Placeholder"
                    />
                  </>
                ) : (
                  <Image
                    src={`https://api.reservoir.tools/redirect/tokens/${selectedPony}/image/v1`}
                    alt="Racer"
                    fill
                    unoptimized
                    loader={({ src }) => src}
                  />
                )}
              </div>
              )}

              
            </div>

          </div>

          <div className={styles.card2}>
            <Confetti
              active={success}
              className={styles["confetti"]}
              config={{
                angle: 90,
                spread: 360,
                startVelocity: 40,
                elementCount: 500,
                dragFriction: 0.12,
                duration: 3000,
                stagger: 3,
                width: "10px",
                height: "10px",
                //@ts-ignore
                perspective: "500px",
                colors: ["#000", "#f00", "#fbea71", "#d4b42c"],
              }}
            />
            {isLoadingTokens && (
              <div
                className="loader"
                style={{
                  position: "absolute",
                  zIndex: 1000,
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginTop: 50,
                  inset: 0,
                  width: 48,
                  height: 48,
                }}
              ></div>
            )}
            <div ref={poniesRef}></div>
            {/* <h2 className={styles.subtitle}>Ponies</h2>
            {ponyTokens.length > 0 && (
              <div className={styles["token-grid"]}>
                {ponyTokens.map((item, i) => (
                  <TokenCard
                    key={i}
                    item={item}
                    setSelectedRacer={setSelectedRacer}
                  />
                ))}
              </div>
            )}
            {ponyTokens.length <= 0 && !isLoadingTokens && (
              <div className={styles["token-grid-empty"]}>
                <p
                  style={{
                    color: "white",
                  }}
                >
                  Looks like you don't have any ponies
                </p>
                <a
                  href={`https://forgotten.market/${PONY_CONTRACT}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button>Get a Pony</button>
                </a>
              </div>
            )} */}
          
          <div className={styles.selection}>
          
          <button className={styles.buttons} onClick={() => setOpenEdition(true)}>Edtion</button>
          {openEdition && (
          <button className={styles.buttons_x} onClick={() => setOpenEdition(false)}>X</button>
          )}

          {/* ... */}
          
          <button className={styles.buttons} onClick={() => setOpenWindow(true)}>Mounts</button>
          {openWindow && (
          <button className={styles.buttons_x} onClick={() => setOpenWindow(false)}>X</button>
          )}
          {/* ... */}

          <button className={styles.buttons} onClick={() => setOpenPony(true)}>Ponies</button>
          {openPony && (
          <button className={styles.buttons_x} onClick={() => setOpenPony(false)}>X</button>
          )}
          {/* ... */}
        </div>

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
          
 
 {openEdition && (
  <>
    <div className={styles.card3}>
      <h2 className={styles.subtitle_card3}>Editions</h2>
      <div className={styles["token-grid"]}>
        {editionsTokens.map((item, i) => (
          <EditionCard key={i} item={item} 
            setSelectedEdition={(id)=> {
            setSelectedEdition(id);
            horseSelectedSound?.play();
            }
        }/>
      ))}
    </div>
      {editionsTokens.length <= 0 && !isLoadingTokens && ( 
        <div className={styles["token-grid-empty"]}>
          <p style={{ color: "white" }}>
            Looks like you don't have any Blacksand Editions
          </p>
            <Link href="/mint" legacyBehavior>
              <button>Get a Mount</button>
            </Link>
        </div>
      )}
    </div>
  </>
 )}

{openWindow && (<>
          
          <div className={styles.card3}>
      
          <h2 className={styles.subtitle_card3}>Mounts</h2>
          <div className={styles["token-grid"]}>
            {mountTokens.map((item, i) => (
              <TokenCard
                key={i}
                item={item}
                setSelectedRacer={(id) => {
                  setSelectedRacer(id);
                  horseSelectedSound?.play();
                }}
              />
            ))}
            
          </div>
          
          {mountTokens.length <= 0 && !isLoadingTokens && (
            <div className={styles["token-grid-empty"]}>
              <p
                style={{
                  color: "white",
                }}
              >
                Looks like you don't have any mounts
              </p>
              <Link href="/mint" legacyBehavior>
                <button>Get a Mount</button>
              </Link>
            </div>
          )}
          </div>
          <div className={styles.card3}>
      
      <h2 className={styles.subtitle_card3}>Ponies</h2>
      <div className={styles["token-grid"]}>
        {ponyTokens.map((item, i) => (
          <TokenCard
            key={i}
            item={item}
            setSelectedRacer={(id) => {
              setSelectedRacer(id);
              horseSelectedSound?.play();
            }}
          />
        ))}
        
      </div>
      
      {ponyTokens.length <= 0 && !isLoadingTokens && (
        <div className={styles["token-grid-empty"]}>
          <p
            style={{
              color: "white",
            }}
          >
            Looks like you don't have any mounts
          </p>
          <Link href="/mint" legacyBehavior>
            <button>Get a Mount</button>
          </Link>
        </div>
      )}
      </div>
          <div className={styles.card3}>
      
          <h2 className={styles.subtitle_card3}>Wizards</h2>
          <div className={styles["token-grid"]}>
            {wizardTokens.map((item, i) => (
              <TokenCard
                key={i}
                item={item}
                setSelectedRacer={(id) => {
                  setSelectedRacer(id);
                  horseSelectedSound?.play();
                }}
              />
            ))}
            
          </div>
          
          {wizardTokens.length <= 0 && !isLoadingTokens && (
            <div className={styles["token-grid-empty"]}>
              <p
                style={{
                  color: "white",
                }}
              >
                Looks like you don't have any mounts
              </p>
              <Link href="/mint" legacyBehavior>
                <button>Get a Mount</button>
              </Link>
            </div>
          )}
          </div>

          <div className={styles.card3}>
      
      <h2 className={styles.subtitle_card3}>Warriors</h2>
      <div className={styles["token-grid"]}>
        {warriorTokens.map((item, i) => (
          <TokenCard
            key={i}
            item={item}
            setSelectedRacer={(id) => {
              setSelectedRacer(id);
              horseSelectedSound?.play();
            }}
          />
        ))}
        
      </div>
      
      {warriorTokens.length <= 0 && !isLoadingTokens && (
        <div className={styles["token-grid-empty"]}>
          <p
            style={{
              color: "white",
            }}
          >
            Looks like you don't have any mounts
          </p>
          <Link href="/mint" legacyBehavior>
            <button>Get a Mount</button>
          </Link>
        </div>
      )}
          </div>
          </>
        )}

{openPony && (<>
          
          <div className={styles.card3}>
      
          <h2 className={styles.subtitle_card3}>Ponies</h2>
          <div className={styles["token-grid"]}>
            {ponyTokens.map((item, i) => (
              <PonyCard
                key={i}
                item={item}
                setSelectedPony={(id) => {
                  setSelectedPony(id);
                  horseSelectedSound?.play();
                }}
              />
            ))}
            
          </div>
          
          {ponyTokens.length <= 0 && !isLoadingTokens && (
            <div className={styles["token-grid-empty"]}>
              <p
                style={{
                  color: "white",
                }}
              >
                Looks like you don't have any mounts
              </p>
              <Link href="/mint" legacyBehavior>
                <button>Get a Mount</button>
              </Link>
            </div>
          )}
          </div>
    

          
          </>
        )}
          </div>

        </div>

        
      )}
      <Modal open={registeredModalOpen} setOpen={setRegisteredModalOpen}>
        <h2 className={styles["modal-title"]}>Off to the Races!</h2>
        <p style={{ color: "white", textAlign: "center" }}>
          You're all set, if you'd like to update your registration you can by
          submitting again before the race starts.
        </p>
        <div className={styles["modal-actions"]}>
          <a
            href="https://discord.com/channels/853432452181262346/1047907741999566959"
            target="_blank"
            rel="noreferrer noopener"
          >
            <button className={styles["modal-button"]}>Start Rolling</button>
          </a>
          <Link href="/racetrack">
            <button className={styles["modal-button"]}>Race Track</button>
          </Link>
        </div>
      </Modal>
    </div>
  );
};

export default Wardrobe;
