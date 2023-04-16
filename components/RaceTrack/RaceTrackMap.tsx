import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import p5, { Vector } from "p5";
import styles from "../../styles/css/racetrack.module.css";

type Coordinate = { x: number; y: number };
type Participants = ReturnType<typeof createParticipants>;

let canvasWidth = 1000;
let canvasHeight = 800;
let lapPoints = 210;
let margin = 50;
const tileSize = 10;
const noiseScale = 1;
const images: p5.Image[] = [];
const tiles: p5.Image[] = [];
let seed = 160;
// desert, city, prison, sewers, hells, caves
let asset_pack = "city";
let background: p5.Image;

function preload(p5: p5) {
  background = p5.loadImage("./img/rgt_map_01.png");
  
  if (!images.length) {
    let asset_base = "/img/track-tiles/" + asset_pack + "_base.png";
    let asset_1 = "/img/track-tiles/" + asset_pack + "_1.png";
    let asset_2 = "/img/track-tiles/" + asset_pack + "_2.png";
    let asset_3 = "/img/track-tiles/" + asset_pack + "_3.png";
    let asset_4 = "/img/track-tiles/" + asset_pack + "_4.png";

    images.push(p5.loadImage(asset_1));
    images.push(p5.loadImage(asset_2));
    images.push(p5.loadImage(asset_3));
    images.push(p5.loadImage(asset_4));
    images.push(p5.loadImage(asset_base));
  }
}

function setup(p5: p5, parent: Element) {
  // preload(p5);
  p5.createCanvas(canvasWidth, canvasHeight).parent(parent);
  p5.frameRate(30);

  p5.randomSeed(seed);
  p5.noiseSeed(seed);
  // drawTerrain(p5);
}

function draw(p5: p5, participants: Participants) {
  p5.clear(0, 0, 0, 0);
  p5.image(
    background,
    0,
    0,
    canvasWidth,
    canvasHeight
  );
  p5.randomSeed(seed);
  p5.noiseSeed(seed);

  let track = createGrandTourTrack(p5);
  //let track = createRaceTrack(p5, 7);
  let desiredTrackWidth = 30; // Set the desired track width here
  let desiredTrackColor = 0; // Set the desired track color here
  drawRaceTrack(
    track,
    desiredTrackWidth + 8,
    p5.color(251, 234, 113, 80),
    p5
  );
  drawRaceTrack(track, desiredTrackWidth, p5.color(desiredTrackColor, 120), p5);
  drawStartingArc(track, p5);
  drawParticipants(track, participants, p5);
}

function sortClockwise(p5: p5, points: Vector[]) {
  let centroid = points
    .reduce((acc, p) => acc.add(p), p5.createVector())
    .div(points.length);
  points.sort(
    (a, b) =>
      p5.atan2(a.y - centroid.y, a.x - centroid.x) -
      p5.atan2(b.y - centroid.y, b.x - centroid.x)
  );
}

function createRaceTrack(p5: p5, numPoints: number) {
  let points = [];
  let attempts = 0;

  while (points.length < numPoints && attempts < 1000) {
    let candidate = p5.createVector(
      p5.random(margin, canvasWidth - margin),
      p5.random(margin, canvasHeight - margin)
    );
    let isValid = true;

    for (let i = 0; i < points.length; i++) {
      let distance = p5.dist(
        candidate.x,
        candidate.y,
        points[i].x,
        points[i].y
      );

      if (
        distance < 40 ||
        Math.abs(candidate.x - points[i].x) < 20 ||
        Math.abs(candidate.y - points[i].y) < 20
      ) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      points.push(p5.createVector(candidate.x, candidate.y));
    } else {
      attempts++;
    }
  }

  sortClockwise(p5, points);
  return points.reverse();
}

function createGrandTourTrack(p5: p5) {
  let points = [];
  points.push(p5.createVector(550, 230));
  points.push(p5.createVector(450, 350));
  points.push(p5.createVector(380, 350));
  points.push(p5.createVector(320, 400));
  points.push(p5.createVector(350, 450));
  points.push(p5.createVector(380, 500));
  points.push(p5.createVector(410, 580));
  points.push(p5.createVector(500, 550));
  points.push(p5.createVector(620, 580));
  points.push(p5.createVector(620, 500));
  points.push(p5.createVector(700, 350));
  points.push(p5.createVector(800, 280));
  points.push(p5.createVector(650, 250));
  return points;
}

function drawStartingArc(track: any, p5: p5) {
  let rectWidth = 10;
  let rectHeight = 20;
  let firstPoint = track[0];
  let secondPoint = track[1];
  let lastPoint = track[track.length - 1];

  // Calculate the tangent angle at the first point
  let tangent = secondPoint.copy().sub(lastPoint).normalize();
  let angle = p5.atan2(tangent.y, tangent.x);

  p5.fill(220, 220, 220);
  p5.noStroke();
  p5.rectMode(p5.CENTER);

  // Rotate the rectangle according to the tangent angle
  p5.push();
  p5.translate(firstPoint.x, firstPoint.y);
  p5.rotate(angle);
  p5.rect(0, 0, rectWidth, rectHeight + 15);
  p5.pop();
}

function drawRaceTrack(
  track: Coordinate[],
  trackWidth: number,
  trackColor: p5.Color,
  p5: p5
) {
  p5.stroke(trackColor);
  p5.strokeWeight(trackWidth);
  p5.noFill();

  p5.beginShape();
  for (let i = 0; i < track.length; i++) {
    let p = track[i];
    p5.curveVertex(p.x, p.y);
  }
  // Repeat the first three points to close the loop smoothly
  p5.curveVertex(track[0].x, track[0].y);
  p5.curveVertex(track[1].x, track[1].y);
  p5.curveVertex(track[2].x, track[2].y);
  p5.endShape();
}

function createParticipants(results: any) {
  return results.map((result: any) => ({
    score: result.total_points,
    data: result,
  }));
}

function catmullRomPoint(
  p0: any,
  p1: any,
  p2: any,
  p3: any,
  t: any,
  tension = 0.5
) {
  let t2 = t * t;
  let t3 = t2 * t;
  let a1 = 2 * t3 - 3 * t2 + 1;
  let a2 = t3 - 2 * t2 + t;
  let a3 = t3 - t2;
  let a4 = -2 * t3 + 3 * t2;

  //@ts-ignore
  let p = p5.Vector.mult(p1, a1)
    //@ts-ignore
    .add(p5.Vector.mult(p2, a4))
    //@ts-ignore
    .add(p5.Vector.mult(p5.Vector.sub(p2, p0), a2).mult(tension))
    //@ts-ignore
    .add(p5.Vector.mult(p5.Vector.sub(p3, p1), a3).mult(tension));

  return p;
}

function drawParticipants(
  track: p5.Vector[],
  participants: Participants,
  p5: p5
) {
  let trackLength = track.length;
  let closestParticipant = null;
  for (let i = 0; i < participants.length; i++) {
    let score = participants[i].score;
    // if (score == 0) {
    //   continue;
    // }
    let laps = Math.floor(score / lapPoints); // One lap is 30 points
    let normalizedScore = score;
    if (score < 0) {
      normalizedScore = lapPoints + score;
    }
    let position = p5.lerp(
      0,
      trackLength,
      (normalizedScore % lapPoints) / lapPoints
    );

    let idx1 = p5.int(position);
    let t = position - p5.int(position);

    let p0 = track[(idx1 - 1 + trackLength) % trackLength];
    let p1 = track[idx1 % trackLength];
    let p2 = track[(idx1 + 1) % trackLength];
    let p3 = track[(idx1 + 2) % trackLength];

    let p = catmullRomPoint(p0, p1, p2, p3, t);

    let randomX = p.x + p5.random(-7, 7);
    let randomY = p.y + p5.random(-7, 7);

    p5.push();
    p5.fill(30, 30, 30);
    p5.ellipse(randomX, randomY, 10);
    p5.pop();

    switch (laps % 4) {
      case 0:
        p5.fill(251, 234, 113); // Gold for the first lap
        break;
      case 1:
        p5.fill(255, 255, 255); // White for the second lap
        break;
      case 2:
        p5.fill(255, 0, 0); // Red for the third lap
        break;
      case 3:
        p5.fill(128, 0, 128); // Purple for the fourth lap
        break;
    }

    if (score <= 0) {
      p5.fill(100, 100, 100, 90); // Purple for the non starters
    }

    p5.push();
    p5.ellipse(randomX, randomY, 8);
    p5.pop();
    //@ts-ignore
    var d = p5.dist(p5.mouseX, p5.mouseY, randomX, randomY);
    if (d < 3) {
      closestParticipant = participants[i];
    }
  }

  if (closestParticipant) {
    const text = `${closestParticipant.data.registration.discord_handle} - ${closestParticipant.score}`;
    p5.textSize(14);
    p5.fill(255, 255, 255);
    const width = p5.textWidth(text);
    const ascent = p5.textAscent();
    const descent = p5.textDescent();
    const textHeight = ascent + descent;
    p5.rect(p5.mouseX, p5.mouseY - 30, width + 16, textHeight + 8, 8);
    p5.fill(0, 0, 0);
    p5.text(text, p5.mouseX - width / 2, p5.mouseY - 25);
  }
}

function drawTerrain(p5: p5) {
  var x = 0;
  var y = 0;
  var w = canvasWidth;
  var h = canvasHeight;

  // let xRO = x % tileSize;
  // let yRO = y % tileSize;
  let xTO = x / tileSize;
  let yTO = y / tileSize;

  function getTile(x: number, y: number) {
    let v = p5.noise((xTO + x) * noiseScale, (yTO + y) * noiseScale);

    let scales = [0.1, 0.15, 0.25, 0.4, 1];
    for (let i = 0; i < scales.length; i++) {
      let terrainScale = scales[i];
      if (v <= terrainScale) {
        return images[i];
      }
    }
  }

  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      //@ts-ignore
      tiles[i + j * w] = getTile(i, j);
    }
  }

  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      p5.image(
        tiles[i + j * w],
        i * tileSize,
        j * tileSize,
        tileSize,
        tileSize
      );
    }
  }
}

type Props = {
  data: any;
};

const RaceTrackMap: FC<Props> = ({ data }) => {
  const participants = useMemo(() => createParticipants(data), [data]);
  const [trackp5, setTrackP5] = useState<p5 | undefined>();
  const canvasParentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trackp5 === undefined) {
      const currentp5 = new p5((p) => {
        p.setup = () => {
          //@ts-ignore
          setup(p, canvasParentRef.current);
        };
      });
      setTrackP5(currentp5);
    }
  }, []);

  useEffect(() => {
    if (trackp5) {

      preload(trackp5);

      trackp5.draw = () => {
        draw(trackp5, participants);
      };
      trackp5.windowResized = () => {
        canvasWidth = window.innerWidth > 1000 ? 1000 : window.innerWidth;
        trackp5.resizeCanvas(canvasWidth, canvasHeight);
      };
    }
  }, [participants]);

  //SSR not supported
  if (typeof window === "undefined") {
    return null;
  }

  return <div className={styles["race-map"]} ref={canvasParentRef} />;
};

export default RaceTrackMap;
