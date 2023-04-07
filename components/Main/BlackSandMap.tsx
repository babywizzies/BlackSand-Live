import React, { useEffect, useState } from "react";
import { Stage, Sprite } from "@inlet/react-pixi";
import useIsMounted from "../../hooks/useIsMounted";
import ViewPort from "./ViewPort";
import { GlowFilter } from "@pixi/filter-glow";
import { Polygon, TextStyle } from "pixi.js";
import { useRouter } from "next/router";
import { Text } from "@inlet/react-pixi/animated";
import { useSpring } from "react-spring";

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
];

let glowIncrementing = true;
let activeFilters: GlowFilter[] = [];
const textStyle = new TextStyle({
  align: "center",
  fontFamily: "Origen",
  fontSize: 50,
  fontWeight: "bold",
  fill: ["#fbea71", "#d4b42c"],
});

const BlackSandMap = () => {
  const router = useRouter();
  const mounted = useIsMounted();
  const [windowSize, setWindowSize] = useState([
    typeof window !== "undefined" ? window.innerWidth : 0,
    typeof window !== "undefined" ? window.innerHeight : 0,
  ]);
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);
  const [textSpringProps, textSpringApi] = useSpring(() => ({
    from: { x: 50, y: 700 },
  }));
  const [bottomText, setBottomText] = useState("");

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
    switch (hoveredBuilding) {
      case "foundry": {
        setBottomText("Foundry");
        activeFilters = [foundryBlackGlowFilter, foundryGlowFilter];
        break;
      }
      case "academy": {
        setBottomText("Academy");
        activeFilters = [academyBlackGlowFilter, academyGlowFilter];
        break;
      }
      case "blackstables": {
        setBottomText("Black Stables - Coming soon");
        activeFilters = [blackStablesBlackGlowFilter, blackStablesGlowFilter];
        break;
      }
      case "market": {
        setBottomText("Market");
        activeFilters = [marketBlackGlowFilter, marketGlowFilter];
        break;
      }
      case "racetrack": {
        setBottomText("Race Track");
        activeFilters = [racetrackBlackGlowFilter, racetrackGlowFilter];
        break;
      }
      case "tavern": {
        setBottomText("Tavern - Coming soon");
        activeFilters = [tavernBlackGlowFilter, tavernGlowFilter];
        break;
      }
      case "temple": {
        setBottomText("Temple - Coming soon");
        activeFilters = [templeBlackGlowFilter, templeGlowFilter];
        break;
      }
      default: {
        activeFilters = [];
        break;
      }
    }

    if (hoveredBuilding) {
      textSpringApi.start({
        from: {
          y: 700,
        },
        to: { y: 500 },
      });
    } else {
      textSpringApi.start({
        from: {
          y: 500,
        },
        to: { y: 700 },
      });
    }
  }, [hoveredBuilding]);

  if (!mounted || typeof window === "undefined") {
    return null;
  }

  return (
    <Stage
      width={windowSize[0]}
      height={600}
      id="bsMap"
      onMount={(app) => {
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
        screenHeight={600}
        worldWidth={3600}
        worldHeight={3000}
      >
        <Sprite image="./img/map/land.png" x={0} y={0} />
        <Sprite image="./img/map/vignette-73_opacity.png" x={0} y={0} />
        {/* <Sprite image="./img/map/lights-divide.png" x={0} y={0} /> */}
        {/* <Sprite image="./img/map/shadows-multiply.png" x={0} y={0} /> */}
        <Sprite
          image="./img/map/shack.png"
          x={0}
          y={0}
          interactive={false}
          hitArea={noHitArea}
        />
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
        <Sprite
          interactive={true}
          image="./img/map/foundry.png"
          x={0}
          y={0}
          filters={[foundryGlowFilter, foundryBlackGlowFilter]}
          hitArea={foundryHitArea}
          cursor="pointer"
          onclick={(e) => {
            router.push("/mint", undefined, { shallow: true });
          }}
          onmouseenter={() => setHoveredBuilding("foundry")}
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
      <Text text={bottomText} style={textStyle} {...textSpringProps} />
    </Stage>
  );
};

export default BlackSandMap;
