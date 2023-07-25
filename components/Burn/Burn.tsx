import React, { useEffect, useState, useRef } from "react";
import { Stage, AnimatedSprite } from "@inlet/react-pixi";
import useIsMounted from "../../hooks/useIsMounted";
import ViewPort from "./ViewPort";
import styles from "../../styles/css/burn.module.css";
import { HiOutlineArrowRight } from "react-icons/hi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Polygon } from "pixi.js";
import CharacterSelect from "./CharacterSelect";
import { useUserTokens } from "@reservoir0x/reservoir-kit-ui";
import { useAccount } from "wagmi";

const noHitArea = new Polygon([]);

enum BurnScreen {
  Start,
  CharacterSelection,
  Lore,
  Confirmation,
  Portal,
}

const Burn = () => {
  const { address: accountAddress } = useAccount();
  const videoEl = useRef<HTMLVideoElement | null>(null);
  const attemptPlay = (): void => {
    if (videoEl && videoEl.current) {
      videoEl.current.play().catch((error: Error) => {
        console.error("Error attempting to play", error);
      });
    }
  };
  useEffect(() => {
    attemptPlay();
  }, []);
  const mounted = useIsMounted();
  const [windowSize, setWindowSize] = useState([
    typeof window !== "undefined" ? window.innerWidth : 0,
    typeof window !== "undefined" ? window.innerHeight : 0,
  ]);
  const [burnScreen, setBurnScreen] = useState<BurnScreen>(BurnScreen.Start);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const { data: tokens } = useUserTokens(accountAddress);

  if (!mounted || typeof window === "undefined") {
    return null;
  }

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        height: 700,
        width: "100%",
      }}
    >
      {burnScreen === BurnScreen.Start && (
        <div className={styles["video-hero"]}>
          <video
            style={{ maxWidth: "100%", width: "1000px" }}
            playsInline
            loop
            autoPlay
            controls
            ref={videoEl}
          >
            <source src="/video/burn_video.mp4" type="video/mp4" />
          </video>

          <div>
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted && "loading";
                const connected = ready && account && chain && "authenticated";

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
                            className={styles["connect-button"]}
                            onClick={openConnectModal}
                            type="button"
                          >
                            Connect Wallet
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button
                            className={styles["connect-button"]}
                            onClick={openChainModal}
                            type="button"
                          >
                            Switch Networks
                          </button>
                        );
                      }

                      return (
                        <button
                          className={styles["connect-button"]}
                          onClick={() =>
                            setBurnScreen(BurnScreen.CharacterSelection)
                          }
                        >
                          Enter The Temple{" "}
                          <HiOutlineArrowRight color="#000" fontSize="16" />
                        </button>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      )}
      {burnScreen === BurnScreen.CharacterSelection && (
        <div>
          <h2 className={styles.title}>Choose your Adventurer</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              margin: "20px 60px",
              flexWrap: "wrap",
              overflowY: "auto",
              height: 600,
            }}
          >
            {tokens.map((token, i) => (
              <CharacterSelect id={token?.token?.tokenId as string} key={i} />
            ))}
          </div>
        </div>
      )}
      {burnScreen === BurnScreen.Portal && (
        <>
          <Stage width={windowSize[0]} height={700} id="burnStage">
            <ViewPort
              screenWidth={windowSize[0]}
              screenHeight={700}
              worldWidth={1400}
              worldHeight={750}
            >
              <AnimatedSprite
                isPlaying={true}
                images={[
                  "./img/burn/main1.png",
                  "./img/burn/main2.png",
                  "./img/burn/main3.png",
                  "./img/burn/main4.png",
                ]}
                animationSpeed={0.07}
                x={0}
                y={0}
                interactive={false}
                hitArea={noHitArea}
                cursor="pointer"
                width={1400}
              />
              <AnimatedSprite
                interactive={true}
                isPlaying={true}
                images={[
                  "./img/burn/portal1.png",
                  "./img/burn/portal2.png",
                  "./img/burn/portal3.png",
                  "./img/burn/portal4.png",
                ]}
                animationSpeed={0.07}
                x={0}
                y={0}
                hitArea={noHitArea}
                cursor="pointer"
                width={1400}
              />
            </ViewPort>
          </Stage>
        </>
      )}
    </div>
  );
};

export default Burn;
