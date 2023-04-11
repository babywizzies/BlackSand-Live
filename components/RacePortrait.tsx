import Image from "next/image";
import React, { FC } from "react";

type Props = {
  collectionId: string;
  tokenId: number;
  hasIndigestion: boolean;
};

const RacePortrait: FC<Props> = ({ tokenId, hasIndigestion }) => {
  let bottom = -17;
  let left = -5;

  switch (tokenId) {
    //1 of 1
    case 783: {
      bottom = -40;
      break;
    }
    case 1019: {
      bottom = -28;
      left = 7;
      break;
    }
    case 427: {
      bottom = -20;
      left = 5;
      break;
    }
    case 238: {
      bottom = -40;
      left = -3;
      break;
    }
    case 599: {
      bottom = -7;
      left = -34;
      break;
    }
    case 685: {
      bottom = 3;
      left = 0;
      break;
    }
    case 1177: {
      bottom = -35;
      left = -15;
      break;
    }
    case 15: {
      bottom = -16;
      left = -2;
      break;
    }
    case 495: {
      bottom = -24;
      left = 7;
      break;
    }
    case 1026: {
      bottom = 3;
      left = 7;
      break;
    }
    case 1111: {
      bottom = 24;
      left = -4;
      break;
    }
    case 1254: {
      bottom = -47;
      left = 5;
      break;
    }
    //Pygmy
    case 718:
    case 949: {
      bottom = 0;
      left = -11;
      break;
    }
  }

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        borderRadius: "50%",
        border: hasIndigestion ? "1px solid green" : "1px solid white",
        boxShadow: hasIndigestion ? "green 0px 0px 15px 0px" : "none",
        height: 50,
        width: 50,
        flexShrink: 0,
      }}
    >
      {hasIndigestion && (
        <Image
          src="/img/noxious-gas.png"
          width={50}
          height={50}
          alt="noxious gas"
          style={{ zIndex: 1, position: "absolute", inset: 0 }}
        />
      )}
      <div
        style={{
          height: 100,
          width: 100,
          position: "absolute",
          bottom: bottom,
          left: left,
        }}
      >
        <Image
          src={`https://forgottenbabies.com/ponies/${tokenId}.png`}
          unoptimized
          fill
          alt="Racer Image"
        />
      </div>
    </div>
  );
};

export default RacePortrait;
