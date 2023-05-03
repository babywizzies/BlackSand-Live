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
const foundryHitArea = new Polygon([
  1430, 620, 1800, 620, 1815, 1020, 1420, 1020,
]);
const academyHitArea = new Polygon([
  2654, 1188, 3171, 1188, 3171, 1677, 2654, 1677,
]);
const blackstablesHitArea = new Polygon([
  250, 1200, 640, 1190, 640, 1480, 250, 1480,
]);
const marketHitArea = new Polygon([
  120, 1780, 1500, 1780, 1500, 2470, 120, 2470,
]);
const racetrackHitArea = new Polygon([
  407, 1530, 450, 1487, 605, 1385, 1145, 1390, 1150, 1680, 390, 1680,
]);
const tavernHitArea = new Polygon([
  1350, 1709, 1730, 1709, 1745, 2118, 1350, 2118,
]);
const templeHitArea = new Polygon([460, 300, 660, 284, 665, 480, 460, 480]);
const shackHitArea = new Polygon([2083, 311, 2234, 311, 2234, 434, 2083, 434]);
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
  "./img/map/land.png",
  "./img/map/vignette.png",
  "./img/map/smallBuildingsWest.png",
  "./img/map/smallBuildingsEast.png",
  "./img/map/water_1.png",
  "./img/map/water_2.png",
  "./img/map/water_3.png",
  "./img/map/foundry.png",
  "./img/map/shack.png",
  "./img/map/academy.png",
  "./img/map/blackStables.png",
  "./img/map/market.png",
  "./img/map/racetrack.png",
  "./img/map/tavern.png",
  "./img/map/temple.png",
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
              worldWidth={3600}
              worldHeight={3000}
            >
              <Sprite image="./img/map/land.png" x={0} y={0} />
              <Sprite image="./img/map/vignette.png" x={0} y={0} />
              <Sprite
                image="./img/map/smallBuildingsWest.png"
                x={0}
                y={0}
                interactive={false}
                hitArea={noHitArea}
              />
              <Sprite
                image="./img/map/smallBuildingsEast.png"
                x={0}
                y={0}
                interactive={false}
                hitArea={noHitArea}
                cursor="pointer"
              />
              <AnimatedSprite
                isPlaying={true}
                images={[
                  "./img/map/smoke_1.png",
                  "./img/map/smoke_2.png",
                  "./img/map/smoke_3.png",
                ]}
                animationSpeed={0.07}
                x={0}
                y={0}
                interactive={false}
                hitArea={noHitArea}
                cursor="pointer"
              />
              <AnimatedSprite
                isPlaying={true}
                images={[
                  "./img/map/water_1.png",
                  "./img/map/water_2.png",
                  "./img/map/water_3.png",
                ]}
                animationSpeed={0.07}
                x={0}
                y={0}
                interactive={false}
                hitArea={noHitArea}
                cursor="pointer"
              />
              <Sprite
                interactive={true}
                image="./img/map/foundry.png"
                x={0}
                y={0}
                filters={[foundryGlowFilter, foundryBlackGlowFilter]}
                hitArea={foundryHitArea}
                cursor="pointer"
                onclick={(e) => {
                  mouseClick?.play();
                  router.push("/mint", undefined, { shallow: true });
                }}
                ontouchend={() => {
                  mouseClick?.play();
                  router.push("/mint", undefined, { shallow: true });
                }}
                onmouseenter={() => setHoveredBuilding("foundry")}
                onmouseleave={() => setHoveredBuilding(null)}
              />
              <Sprite
                interactive={true}
                image="./img/map/shack.png"
                x={0}
                y={0}
                filters={[shackGlowFilter, shackBlackGlowFilter]}
                hitArea={shackHitArea}
                cursor="pointer"
                onclick={(e) => {
                  mouseClick?.play();
                  router.push("/about", undefined, { shallow: true });
                }}
                ontouchend={() => {
                  mouseClick?.play();
                  router.push("/about", undefined, { shallow: true });
                }}
                onmouseenter={() => setHoveredBuilding("shack")}
                onmouseleave={() => setHoveredBuilding(null)}
              />
              <Sprite
                image="./img/map/academy.png"
                x={0}
                y={0}
                filters={[academyGlowFilter, academyBlackGlowFilter]}
                interactive={true}
                hitArea={academyHitArea}
                cursor="pointer"
                onclick={(e) => {
                  mouseClick?.play();
                  router.push("/academy", undefined, { shallow: true });
                }}
                ontouchend={() => {
                  mouseClick?.play();
                  router.push("/academy", undefined, { shallow: true });
                }}
                onmouseenter={() => setHoveredBuilding("academy")}
                onmouseleave={() => setHoveredBuilding(null)}
              />
              <Sprite
                image="./img/map/blackStables.png"
                x={0}
                y={0}
                filters={[blackStablesBlackGlowFilter, blackStablesGlowFilter]}
                interactive={true}
                hitArea={blackstablesHitArea}
                onmouseenter={() => setHoveredBuilding("blackstables")}
                onmouseleave={() => setHoveredBuilding(null)}
              />
              <Sprite
                image="./img/map/market.png"
                x={0}
                y={0}
                filters={[marketBlackGlowFilter, marketGlowFilter]}
                interactive={true}
                hitArea={marketHitArea}
                cursor="pointer"
                onclick={(e) => {
                  mouseClick?.play();
                  router.push("/market", undefined, { shallow: true });
                }}
                ontouchend={() => {
                  mouseClick?.play();
                  router.push("/market", undefined, { shallow: true });
                }}
                onmouseenter={() => setHoveredBuilding("market")}
                onmouseleave={() => setHoveredBuilding(null)}
              />
              <Sprite
                image="./img/map/racetrack.png"
                x={0}
                y={0}
                filters={[racetrackBlackGlowFilter, racetrackGlowFilter]}
                interactive={true}
                hitArea={racetrackHitArea}
                cursor="pointer"
                onclick={(e) => {
                  mouseClick?.play();
                  router.push("/rules", undefined, { shallow: true });
                }}
                ontouchend={() => {
                  mouseClick?.play();
                  router.push("/rules", undefined, { shallow: true });
                }}
                onmouseenter={() => setHoveredBuilding("racetrack")}
                onmouseleave={() => setHoveredBuilding(null)}
              />
              <Sprite
                image="./img/map/tavern.png"
                x={0}
                y={0}
                filters={[tavernBlackGlowFilter, tavernGlowFilter]}
                interactive={true}
                hitArea={tavernHitArea}
                onmouseenter={() => setHoveredBuilding("tavern")}
                onmouseleave={() => setHoveredBuilding(null)}
              />

              <Sprite
                image="./img/map/temple.png"
                x={0}
                y={0}
                filters={[templeBlackGlowFilter, templeGlowFilter]}
                interactive={true}
                hitArea={templeHitArea}
                onmouseenter={() => setHoveredBuilding("temple")}
                onmouseleave={() => setHoveredBuilding(null)}
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
