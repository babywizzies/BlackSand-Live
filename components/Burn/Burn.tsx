import React, { useEffect, useMemo, useState } from "react";
import { Stage, Sprite, AnimatedSprite } from "@inlet/react-pixi";
import useIsMounted from "../../hooks/useIsMounted";
import ViewPort from "./ViewPort";
import { GlowFilter } from "@pixi/filter-glow";
import { Polygon } from "pixi.js";
import { useRouter } from "next/router";
import { useSpring, animated } from "react-spring";
import styles from "../../styles/css/main.module.css";
import useAudio from "../../hooks/useAudio";
import { HiOutlineArrowRight } from "react-icons/hi";
import { loadImage } from "../../utils/imageLoader";

//Hit Areas
const burnHitArea = new Polygon([
  1430, 620, 1800, 620, 1815, 1020, 1420, 1020,
]);
const noHitArea = new Polygon([]);

//Glow
const GLOW_MAX = 2;
const GLOW_MIN = 1;
const GOLD_GLOW = {
  distance: 5,
  innerStrength: 0,
  outerStrength: 0,
  color: 0xfbea71,
};
const BLACK_GLOW = {
  distance: 1,
  innerStrength: 0,
  outerStrength: 0,
  color: 0x000000,
};

const burnGlowFilter = new GlowFilter(GOLD_GLOW);
const burnBlackGlowFilter = new GlowFilter(BLACK_GLOW);

const foundryGlowFilter = new GlowFilter(GOLD_GLOW);
const foundryBlackGlowFilter = new GlowFilter(BLACK_GLOW);
const academyGlowFilter = new GlowFilter(GOLD_GLOW);
const academyBlackGlowFilter = new GlowFilter(BLACK_GLOW);
const blackStablesGlowFilter = new GlowFilter(GOLD_GLOW);
const blackStablesBlackGlowFilter = new GlowFilter(BLACK_GLOW);
const marketGlowFilter = new GlowFilter(GOLD_GLOW);
const marketBlackGlowFilter = new GlowFilter(BLACK_GLOW);
const racetrackGlowFilter = new GlowFilter(GOLD_GLOW);
const racetrackBlackGlowFilter = new GlowFilter(BLACK_GLOW);
const tavernGlowFilter = new GlowFilter(GOLD_GLOW);
const tavernBlackGlowFilter = new GlowFilter(BLACK_GLOW);
const templeGlowFilter = new GlowFilter(GOLD_GLOW);
const templeBlackGlowFilter = new GlowFilter(BLACK_GLOW);
const shackGlowFilter = new GlowFilter(GOLD_GLOW);
const shackBlackGlowFilter = new GlowFilter(BLACK_GLOW);

const allFilters = [
  foundryGlowFilter,
  foundryBlackGlowFilter,
  academyBlackGlowFilter,
  academyGlowFilter,
  blackStablesBlackGlowFilter,
  blackStablesGlowFilter,
  marketBlackGlowFilter,
  marketGlowFilter,
  racetrackBlackGlowFilter,
  racetrackGlowFilter,
  tavernBlackGlowFilter,
  tavernGlowFilter,
  templeBlackGlowFilter,
  templeGlowFilter,
  shackGlowFilter,
  shackBlackGlowFilter,
];

let glowIncrementing = true;
let activeFilters: GlowFilter[] = [];
let imageUrls = [
  "./img/burn/main_background.gif"
];

const BlackSandMap = () => {
  const router = useRouter();
  const mounted = useIsMounted();
  const [windowSize, setWindowSize] = useState([
    typeof window !== "undefined" ? window.innerWidth : 0,
    typeof window !== "undefined" ? window.innerHeight : 0,
  ]);
  const [progressPercent, setProgressPercent] = useState(0);
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);
  const [textSpringProps, textSpringApi] = useSpring(() => ({
    from: { x: 50, y: 70 },
  }));
  const [bottomText, setBottomText] = useState("");
  const [enteredBlackSand, setEnteredBlackSand] = useState(false);

  //Audio
  useAudio("./audio/map/background.mp3", {
    loop: true,
    volume: 0.09,
    autoplay: true,
  });

  const academyAudio = useAudio("./audio/map/academy.mp3", {
    loop: true,
    volume: 0.09,
  });

  const stablesAudio = useAudio("./audio/map/stables.mp3", {
    loop: true,
    volume: 0.09,
  });

  const marketAudio = useAudio("./audio/map/market.mp3", {
    loop: true,
    volume: 0.09,
  });

  const foundryAudio = useAudio("./audio/map/foundry.mp3", {
    loop: true,
    volume: 0.09,
  });

  const tavernAudio = useAudio("./audio/map/tavern.mp3", {
    loop: true,
    volume: 0.09,
  });

  const templeAudio = useAudio("./audio/map/temple.mp3", {
    loop: true,
    volume: 0.09,
  });

  const racetrackAudio = useAudio("./audio/map/racetrack.mp3", {
    loop: true,
    volume: 0.09,
  });

  const loreAudio = useAudio("./audio/map/shack.mp3", {
    loop: true,
    volume: 0.09,
  });

  const mouseClick = useAudio("./audio/map/mouse_click.mp3", {
    volume: 0.09,
    onEnded: (audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    },
  });

  const allAudio = useMemo(
    () => [
      academyAudio,
      stablesAudio,
      marketAudio,
      foundryAudio,
      tavernAudio,
      templeAudio,
      racetrackAudio,
      loreAudio,
    ],
    [
      academyAudio,
      stablesAudio,
      marketAudio,
      foundryAudio,
      tavernAudio,
      templeAudio,
      racetrackAudio,
      loreAudio,
    ]
  );

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
    let activeAudio: HTMLAudioElement | undefined;
    switch (hoveredBuilding) {
      case "foundry": {
        setBottomText("Foundry");
        activeAudio = foundryAudio;
        activeFilters = [foundryBlackGlowFilter, foundryGlowFilter];
        break;
      }
      case "academy": {
        setBottomText("Academy");
        activeAudio = academyAudio;
        activeFilters = [academyBlackGlowFilter, academyGlowFilter];
        break;
      }
      case "blackstables": {
        setBottomText("Black Stables - Coming soon");
        activeAudio = stablesAudio;
        activeFilters = [blackStablesBlackGlowFilter, blackStablesGlowFilter];
        break;
      }
      case "market": {
        setBottomText("Market");
        activeAudio = marketAudio;
        activeFilters = [marketBlackGlowFilter, marketGlowFilter];
        break;
      }
      case "racetrack": {
        setBottomText("Race Track");
        activeAudio = racetrackAudio;
        activeFilters = [racetrackBlackGlowFilter, racetrackGlowFilter];
        break;
      }
      case "tavern": {
        setBottomText("Tavern - Coming soon");
        activeAudio = tavernAudio;
        activeFilters = [tavernBlackGlowFilter, tavernGlowFilter];
        break;
      }
      case "temple": {
        setBottomText("Temple - Coming soon");
        activeAudio = templeAudio;
        activeFilters = [templeBlackGlowFilter, templeGlowFilter];
        break;
      }
      case "shack": {
        setBottomText("Lore");
        activeAudio = loreAudio;
        activeFilters = [shackBlackGlowFilter, shackGlowFilter];
        break;
      }
      //todo lore
      default: {
        activeFilters = [];
        break;
      }
    }

    allAudio.forEach((audio) => {
      if (activeAudio !== audio) {
        const fadeAudio = () => {
          let timer = null;
          if (audio && audio.volume > 0.0005) {
            audio.volume -= 0.0005;
            timer = setTimeout(fadeAudio, 5);
          } else if (audio) {
            audio.pause();
            audio.currentTime = 0;
          }
        };
        fadeAudio();
      } else {
        if (audio) {
          audio.volume = 0.09;
          audio?.play();
        }
      }
    });

    if (hoveredBuilding) {
      textSpringApi.start({
        from: {
          y: 70,
        },
        to: { y: -15 },
      });
    } else {
      textSpringApi.start({
        from: {
          y: -15,
        },
        to: { y: 70 },
      });
    }
  }, [hoveredBuilding, allAudio]);

  if (!mounted || typeof window === "undefined") {
    return null;
  }

  return (
    <div style={{ position: "relative", overflow: "hidden", height: 700 }}>
      {enteredBlackSand ? (
        <>
          <Stage
            width={windowSize[0]}
            height={700}
            id="bsMap"
            onMount={(app) => {
              let progress = 0;
              imageUrls.forEach((url) => {
                loadImage(url).then(() => {
                  progress += 1;
                  setProgressPercent(progress);
                });
              });

              app.ticker.add(() => {
                // Glow
                if (activeFilters.length > 0) {
                  const glowFilter = activeFilters[0];
                  const blackGlowFilter = activeFilters[1];
                  if (glowFilter.outerStrength < GLOW_MAX && glowIncrementing) {
                    glowFilter.outerStrength += 0.009;
                    blackGlowFilter.innerStrength += 0.009;
                  } else if (glowFilter.outerStrength >= GLOW_MIN) {
                    glowIncrementing = false;
                    glowFilter.outerStrength -= 0.009;
                    blackGlowFilter.innerStrength -= 0.009;
                  } else {
                    glowIncrementing = true;
                  }
                }

                const inactiveFilters = allFilters.filter(
                  (filter) => !activeFilters.includes(filter)
                );

                inactiveFilters.forEach((filter) => {
                  if (filter.outerStrength > 0) {
                    filter.outerStrength -= 0.009;
                  }
                  if (filter.innerStrength > 0) {
                    filter.innerStrength -= 0.009;
                  }
                });
              });
            }}
          >
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
                interactive={false}
                hitArea={burnHitArea}
                cursor="pointer"
                width={1400}
              />

            </ViewPort>
          </Stage>
          <animated.div
            className={styles["map_legend"]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              ...textSpringProps,
            }}
          >
            {bottomText}
          </animated.div>
          {progressPercent < imageUrls.length && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(4px)",
              }}
            >
              <div
                style={{
                  background: "white",
                  display: "flex",
                  gap: 10,
                  borderRadius: 4,
                  padding: 4,
                  fontSize: 20,
                }}
              >
                <p>Loading</p>{" "}
                {Math.floor((progressPercent / imageUrls.length) * 100)}/{100}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={styles["map-hero"]}>
          <img src="./img/map/bs_hero_logo.png" width={450} />
          <p className={styles["map-hero-text"]}>
            The city that once was is yours again to explore. Walk the streets,
            visit the ancient buildings, head to the race track. Start the
            journey to find your !magic
          </p>
          <button
            className={styles["map-hero-button"]}
            onClick={() => setEnteredBlackSand(true)}
          >
            Explore <HiOutlineArrowRight color="#000" fontSize="16" />
          </button>
        </div>
      )}
    </div>
  );
};

export default BlackSandMap;
