import React, { ComponentPropsWithoutRef, useCallback } from "react";
import { Stage, Graphics } from "@inlet/react-pixi";
import * as PIXI from "pixi.js";

const STAGE_WIDTH = 600;
const STAGE_HEIGHT = 600;

const RaceMap = () => {
  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.lineStyle(4, 0xffd900, 1);
    // g.lineTo(0, 0);
    // g.lineTo(500, 0);
    g.quadraticCurveTo(0, 0, 250, 500);
  }, []);

  return (
    <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT}>
      <Graphics draw={draw} />
    </Stage>
  );
};

export default RaceMap;
