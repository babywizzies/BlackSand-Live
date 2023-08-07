import { FC, useEffect, useState } from "react";

const backgroundPositions = [
  "19px 18px",
  "-156px 18px",
  "-328px 18px",
  "-502px 18px",
  "15px -158px",
  "-161px -158px",
  "-329px -158px",
  "-509px -158px",
  "15px -328px",
  "-155px -328px",
  "-331px -328px",
  "-503px -328px",
  "-503px -328px",
  "15px -501px",
  "-145px -501px",
  "-324px -501px",
  "-494px -501px",
];

const WIZARD_CONTRACT = "0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42";

const CharacterSelect: FC<{ id: string; contract: string }> = ({
  id,
  contract,
}) => {
  const [backgroundPosition, setBackgroundPosition] = useState(0);

  useEffect(() => {
    let position = backgroundPosition;
    const positionInterval = setInterval(() => {
      if (backgroundPositions[position + 1]) {
        position = position + 1;
      } else {
        position = 0;
      }
      setBackgroundPosition(position);
    }, 500);

    return () => {
      clearInterval(positionInterval);
    };
  }, [backgroundPositions]);

  const walkCycleType = contract === WIZARD_CONTRACT ? "wizard" : "warrior";

  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div
        style={{
          backgroundImage: 'url("/img/burn/scroll/frame.png")',
          backgroundSize: "200px 200px",
          backgroundRepeat: "no-repeat",
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      ></div>
      <div
        style={{
          zIndex: 1,
          width: 200,
          height: 200,
          backgroundImage: `url("https://www.forgottenrunes.com/api/art/wizard/${id}/spritesheet.png?width=1024")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: backgroundPositions[backgroundPosition],
          backgroundSize: "695px 695px",
          clipPath: "polygon(5% 3%, 94% 3%, 95% 97%, 5% 97%)",
        }}
      />
    </div>
  );
};

export default CharacterSelect;
