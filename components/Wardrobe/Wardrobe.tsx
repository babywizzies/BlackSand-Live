/* eslint-disable react/no-unescaped-entities */
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "../../styles/css/paddock.module.css";
import { useAccount, useSignMessage } from "wagmi";
import useIsMounted from "../../hooks/useIsMounted";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { TokenMedia, useUserTokens } from "@reservoir0x/reservoir-kit-ui";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import TokenCard from "./TokenCard";
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
const BS_MOUNT_CONTRACT = "0xf486f696b80164b5943191236eca114f4efab2ff";


const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const Wardrobe = () => {
  const poniesRef = createRef<HTMLDivElement>();
  const specialItemsRef = createRef<HTMLHeadingElement>();
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const isMounted = useIsMounted();
  const [selectedRacer, setSelectedRacer] = useState<string | undefined>();
  const [selectedItems, setSelectedItems] = useState<SelectedTreat[]>([]);
  const [discordHandle, setDiscordHandle] = useState("");
  const [success, setSuccess] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [registeredModalOpen, setRegisteredModalOpen] = useState(false);

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
      collectionsSetId: BS_MOUNT_CONTRACT,
      limit: 200,
    }
  );


  const ponyTokens = useMemo(
    () =>
      tokenData?.filter(
        (tokenData) => tokenData?.token?.contract === PONY_CONTRACT
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

  

  if (!isMounted) {
    return null;
  }

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
          <div
          className={styles.paddock_card}
          >
            <h2 className={styles.subtitle_card}>Racing Selection</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
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
              <div className={styles.card1}>

                <input
                  placeholder="Discord Handle"
                  className={styles["discord-handle-input"]}
                  value={discordHandle}
                  onChange={(e) => {
                    setDiscordHandle(e.target.value);
                  }}
                />
                <button
                  className={styles["register-button"]}
                  disabled={registering}
                  onClick={async () => {
                    try {
                      setRegistering(true);
                      setErrorText("");
                      setSuccess(false);
                      setRegisteredModalOpen(false);
                      if (!selectedRacer) {
                        setRegistering(false);
                        setErrorText("Please select a mount or a pony");
                        return;
                      }

                      if (discordHandle.length === 0) {
                        setRegistering(false);
                        setErrorText("Please enter a discord handle");
                        return;
                      }

                      const results = discordHandle.match(/(?!\s).+#\d{4}/i);
                      const sanitzedHandle =
                        results && results[0] ? results[0] : null;

                      if (!sanitzedHandle) {
                        setErrorText("Discord handle is invalid");
                        setRegistering(false);
                        return;
                      }

                      const signature = await signMessageAsync({
                        message: "Register for BlackSand Race",
                      });
                      const racerPieces = selectedRacer.split(":");

                      const response = await axios.post(
                        "https://blacksand.city/api/blacksand/registration/create",
                        {
                          id: racerPieces[1],
                          collection: racerPieces[0],
                          discord_handle: sanitzedHandle,
                          treats: selectedItems.map((item) => item.id),
                          signature,
                        }
                      );
                      if (response.status !== 200) {
                        throw `API Error: ${response.data}`;
                      }
                      setSuccess(true);
                      setRegisteredModalOpen(true);
                      setRegistering(false);
                      registeredSound?.play();
                    } catch (e) {
                      setErrorText("Something went wrong, please try again");
                      setSuccess(false);
                      setRegisteredModalOpen(false);
                      setRegistering(false);
                      console.error(e);
                    }
                  }}
                >
                  {registering && (
                    <div
                      className="loader"
                      style={{ width: 20, height: 20 }}
                    ></div>
                  )}{" "}
                  Register
                </button>
                {errorText.length > 0 && (
                  <p className={styles["error-text"]}>{errorText}</p>
                )}
              </div>
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
