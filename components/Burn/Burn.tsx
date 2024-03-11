import React, { useEffect, useState, useRef } from "react";
import { AnimatedSprite, Container, Sprite, Stage } from "@pixi/react";

import useIsMounted from "../../hooks/useIsMounted";
import ViewPort from "./ViewPort";
import styles from "../../styles/css/burn.module.css";
import { HiOutlineArrowRight } from "react-icons/hi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Polygon } from "pixi.js";
import CharacterSelect from "./CharacterSelect";
import { useUserTokens } from "@reservoir0x/reservoir-kit-ui";
import { useAccount } from "wagmi";
import * as PIXI from "pixi.js";

const noHitArea = new Polygon([]);

enum BurnScreen {
  Start,
  CharacterSelection,
  Lore,
  Confirmation,
  Portal,
}

const frameWidth =  1017// Set the width of each frame in your sprite sheet
const frameHeight = 947// Set the height of each frame in your sprite sheet
const totalFrames = 4;
const rows = 4.3;
const animationSpeed = 200;
const startX = 400; // X position at the start of the canvas
const endX = 430;


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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSecondStage, setIsSecondStage] = useState(false);
  const handleButtonClick = () => {
    setIsSecondStage(true);
  };
  const [currentFrame, setCurrentFrame] = useState(0);
  const [spriteX, setSpriteX] = useState(startX);
  const [characterNumber, setCharacterNumber] = useState(0);
  const mounted = useIsMounted();
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
  const [showImage, setShowImage] = useState(false);
  const handleCharacterSelect = (character: { id: string; contract: string }) => {
    setSelectedCharacter(character);
    
  };
  const [windowSize, setWindowSize] = useState([
    typeof window !== "undefined" ? window.innerWidth : 0,
    typeof window !== "undefined" ? window.innerHeight : 0,
  ]);
  const [burnScreen, setBurnScreen] = useState<BurnScreen>(BurnScreen.Start);
  const { data: tokens } = useUserTokens(accountAddress, {
    collectionsSetId:
      "2bbf8c77426ecef122b930e50d37eef1eefd8de0eaad268e3ee3abc05d3a2937",
  });

  useEffect(() => {
    attemptPlay();
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % totalFrames);
    }, animationSpeed);

    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  useEffect(() => {
    if (spriteX < endX) {
      const moveInterval = setInterval(() => {
        setSpriteX((prevX) => prevX + 2); // Adjust the movement speed as needed
        if (spriteX >= endX) {
          clearInterval(moveInterval);
        }
      }, 30); // Adjust the interval to control the movement speed
      return () => {
        clearInterval(moveInterval);
      };
    }
  }, [spriteX]);

  const handleCharacterNumberChange = (event:any) => {
    // Update the character number when the input changes
    setCharacterNumber(event.target.value);
    setCurrentFrame(0);
    setSpriteX(startX);
  };

  const spriteSheetUrl = `https://www.forgottenrunes.com/api/art/warriors/${characterNumber}/spritesheet.png?width=1024`;
  const stopspriteSheetUrl = `https://www.forgottenrunes.com/api/art/warriors/${characterNumber}/spritesheet.png?width=1024`;

  const row = rows - 1; // The last row index
  let frameX = currentFrame * frameWidth; // Calculate X position based on the current frame
  let frameY = row * frameHeight; // Calculate Y position based on the last row

  const spriteTexture = PIXI.Texture.from(spriteX >= endX ? stopspriteSheetUrl : spriteSheetUrl); //const spriteTexture = PIXI.Texture.from(spriteSheetImage);

 // Add a useEffect to toggle the image visibility when spriteX reaches endX
 useEffect(() => {
   if (spriteX >= endX) {
     setShowImage(true);
   } else {
     setShowImage(false);
   }
 }, [spriteX]);

 const handleSpriteClick = () => {
  if (spriteX >= endX) {
    setIsTransitioning(true);
  }
};

 if (spriteX >= endX) {
    frameX = 0; // X position of the first frame
    frameY = 0; // Y position of the first frame
  }

  if (!mounted || typeof window === "undefined") {
    return null;
  }

  return (
    <>
    <div className={styles.container}>
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
                            className={styles.connect_button}
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
                            className={styles.connect_button}
                            onClick={openChainModal}
                            type="button"
                          >
                            Switch Networks
                          </button>
                        );
                      }

                      return (
                        <button
                          className={styles.connect_button}
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
        <div className={styles.container1}>
          <h2 className={styles.title}>Choose your Adventurer</h2>
          {selectedCharacter && (
        <div>
          Selected Character ID: {selectedCharacter.id}
        </div>
      )}
          <div

            className={styles.adventure_container}
          >
            {tokens.map((token, i) => (
              <CharacterSelect
                id={token?.token?.tokenId as string}
                contract={token?.token?.contract || "defaultContractValue"} // Provide a default value
                key={i}
                onSelect={handleCharacterSelect}
                isSelected={selectedCharacter?.id === token?.token?.tokenId}
              />
            ))}
          </div>
          <button
                          className={styles.proceed_button}
                          onClick={() =>
                            setBurnScreen(BurnScreen.Portal)
                          }
                          
                        >
                          Proceed{" "}
                          <HiOutlineArrowRight color="#000" fontSize="16" />
                        </button>
        </div>
      )}
      {burnScreen === BurnScreen.Portal && !isTransitioning && (
        <div style={{ position: "relative", overflow: "hidden", height: 600 }}>
        <Stage
            width={windowSize[0]}
            height={2400}
            id="bsMap"
          >
            <ViewPort
              screenWidth={windowSize[0]}
              screenHeight={2400}
              worldWidth={600}
              worldHeight={600}
            >
          <Sprite image="./img/burn/burn.png" x={0} y={0} />
          <AnimatedSprite
                isPlaying={true}
                images={[
                  "./img/burn/burn1.png",
                  "./img/burn/burn2.png",
                  "./img/burn/burn3.png",
                  "./img/burn/burn4.png",
                ]}
                animationSpeed={0.07}
                x={0}
                y={0}
                interactive={false}
                hitArea={noHitArea}
                cursor="pointer"
              />
             <Sprite
              texture={new PIXI.Texture(spriteTexture.baseTexture, new PIXI.Rectangle(frameX, frameY, frameWidth, frameHeight))}
              x={spriteX}
              y={95.5} // Adjust the Y position based on your needs
              width={frameWidth * 0.066}
              height={frameHeight * 0.066}
              scale={{ x: 1, y: 1 }}
              anchor={new PIXI.Point(0.5, 0.5)}
            />
            <Sprite image="./img/burn/shazam.png"
            width={25}
            height={44}
            x={445}
            y={82}
            />
            
            {showImage && (
            <Sprite
              image="./img/burn/box.png"
              width={100}
              height={28} // Replace with the path to your image
              x={460}
              y={50}
              interactive
            pointerdown={handleSpriteClick}
            cursor="pointer"
            />
          )}
          </ViewPort>
          
        </Stage>
      </div>
      )}
      {isTransitioning && !isSecondStage && (
      <>
       <div className={styles.container2}>
        <p style={{color: 'white', fontSize: '122px'}}>Graphic of Burn</p>
          <button className={styles.continue} onClick={handleButtonClick} >Continue</button>
       </div>
      </>
      )}
      {isSecondStage && (
        <div style={{ position: "relative", overflow: "hidden", height: 600 }}>
        <Stage
            width={windowSize[0]}
            height={2600}
            id="bsMap"
          >
            <ViewPort
              screenWidth={windowSize[0]}
              screenHeight={2600}
              worldWidth={2000}
              worldHeight={2600}
            >
          <Sprite image="./img/burn/main1.png" x={0} y={0} />
          </ViewPort>
          
        </Stage>
      </div>
      )}
    </div>
    <input
          type="number"
          value={characterNumber}
          onChange={handleCharacterNumberChange}
        />
    </>
  );
};

export default Burn;
