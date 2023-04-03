import React, { FC, createRef, useEffect, useMemo, useState } from "react";
import p5 from "p5";

type Coordinate = { x: number; y: number };
type Participants = ReturnType<typeof createParticipants>;

let canvasWidth = 800;
let canvasHeight = 600;
let margin = 50;
let numPointsTrack = 10;
let lapPoints = 30;
const tileSize = 10;
const noiseScale = 1;
const images: p5.Image[] = [];
const tiles: p5.Image[] = [];
let seed = 12;
// desert, city, prison, sewers, hells, caves
let asset_pack = "desert";

function preload(p5: p5) {
  if (!images.length) {
    let asset_base = "./assets/" + asset_pack + "_base.png";
    let asset_1 = "./assets/" + asset_pack + "_1.png";
    let asset_2 = "./assets/" + asset_pack + "_2.png";
    let asset_3 = "./assets/" + asset_pack + "_3.png";
    let asset_4 = "./assets/" + asset_pack + "_4.png";

    images.push(p5.loadImage(asset_1));
    images.push(p5.loadImage(asset_2));
    images.push(p5.loadImage(asset_3));
    images.push(p5.loadImage(asset_4));
    images.push(p5.loadImage(asset_base));
  }
}

function setup(p5: p5, parent: Element) {
  p5.createCanvas(canvasWidth, canvasHeight).parent(parent);
  p5.frameRate(30);

  p5.randomSeed(seed);
  p5.noiseSeed(seed);
  drawTerrain(p5);
}

function draw(p5: p5, participants: Participants) {
  p5.randomSeed(seed);
  p5.noiseSeed(seed);

  let track = createRaceTrack(numPointsTrack, p5);
  let desiredTrackWidth = 50; // Set the desired track width here
  let desiredTrackColor = 0; // Set the desired track color here
  drawRaceTrack(
    track,
    desiredTrackWidth + 8,
    p5.color(desiredTrackColor + 100),
    p5
  );
  drawRaceTrack(track, desiredTrackWidth, p5.color(desiredTrackColor), p5);
  drawStartingArc(track, p5);
  drawParticipants(track, participants, p5);
}

function createRaceTrack(numPoints: number, p5: p5) {
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

  sortClockwise(points, p5);
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

  p5.fill(100, 100, 100);
  p5.noStroke();
  p5.rectMode(p5.CENTER);

  // Rotate the rectangle according to the tangent angle
  p5.push();
  p5.translate(firstPoint.x, firstPoint.y);
  p5.rotate(angle);
  p5.rect(0, 0, rectWidth, rectHeight + 35);
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

function sortClockwise(points: any[], p5: p5) {
  let centroid = points
    .reduce((acc, p) => acc.add(p), p5.createVector())
    .div(points.length);
  points.sort(
    (a, b) =>
      p5.atan2(a.y - centroid.y, a.x - centroid.x) -
      p5.atan2(b.y - centroid.y, b.x - centroid.x)
  );
}

function createParticipants(results: any) {
  let participants = [];

  for (let i = 0; i < results[0].race_data.length; i++) {
    let score = results[0].race_data[i].total_points;
    participants.push({ score: score, data: results[0].race_data[i] });
  }

  return participants;
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
  for (let i = 0; i < participants.length; i++) {
    let score = participants[i].score;
    if (score == 0) {
      continue;
    }
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

    switch (laps % 4) {
      case 0:
        p5.fill(255, 0, 0); // Red for the first lap
        break;
      case 1:
        p5.fill(0, 0, 255); // Blue for the second lap
        break;
      case 2:
        p5.fill(0, 255, 0); // Green for the third lap
        break;
      case 3:
        p5.fill(128, 0, 128); // Purple for the fourth lap
        break;
    }

    if (score < 0) {
      p5.fill(194, 0, 194); // Purple for the fourth lap
    }
    let randomX = p.x + p5.random(-15, 15);
    let randomY = p.y + p5.random(-15, 15);
    // let participant = p5.ellipse(randomX, randomY, 8);
    //@ts-ignore
    var d = p5.dist(mouseX, mouseY, randomX, randomY);
    if (d < 3) {
      p5.fill(0, 0, 0); // Purple for the fourth lap
      p5.rect(0, canvasHeight, 400, 100, 10);
      p5.fill(255, 255, 255); // Purple for the fourth lap
      p5.text(
        participants[i].data.registration.discord_handle +
          " - " +
          participants[i].score,
        20,
        canvasHeight - 20
      );
    }
  }
}

function drawTerrain(p5: p5) {
  var x = 0;
  var y = 0;
  var w = canvasWidth;
  var h = canvasHeight;

  let xRO = x % tileSize;
  let yRO = y % tileSize;
  let xTO = parseInt(`${x / tileSize}`);
  let yTO = parseInt(`${y / tileSize}`);

  function getTile(x: number, y: number, p5: p5) {
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
      const tile = getTile(i, j, p5);
      if (tile) {
        tiles[i + j * w] = tile;
      }
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
  const canvasParentRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const currentp5 = new p5((p) => {
      p.setup = () => {
        //@ts-ignore
        setup(currentp5, canvasParentRef.current);
      };
      p.draw = () => {
        draw(currentp5, participants);
      };
    });
    setTrackP5(currentp5);
  }, []);

  //SSR not supported
  if (typeof window === "undefined") {
    return null;
  }

  return <div ref={canvasParentRef} />;
};

export default RaceTrackMap;
