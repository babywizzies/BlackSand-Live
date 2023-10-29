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
const WARRIOR_CONTRACT = "0x9690b63eb85467be5267a3603f770589ab12dc95";
const BABY_CONTRACT = "0x4b1e130ae84c97b931ffbe91ead6b1da16993d45";
const SOUL_CONTRACT =
"0x251b5f14a825c537ff788604ea1b58e49b70726f";

enum CharacterType {
  None,
  Wizard,
  Warrior,
  Baby,
  Soul
}

const CharacterSelect: FC<{ id: string; contract: string; onSelect: (character: { id: string; contract: string }) => void; isSelected: boolean }> = ({
  id,
  contract,
  onSelect,
  isSelected,
}) => {
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [selectedCharacterType, setSelectedCharacterType] = useState(CharacterType.None);
  const [isHovered, setIsHovered] = useState(false);
  const handleSelection = (type: CharacterType) => {
    setSelectedCharacterType(type);
  };

  useEffect(() => {
    let position = backgroundPosition;
    const positionInterval = setInterval(() => {
      if (backgroundPositions[position + 1]) {
        position = position + 0;
      } else {
        position = 0;
      }
      setBackgroundPosition(position);
    }, 500);

    return () => {
      clearInterval(positionInterval);
    };
  }, [backgroundPositions]);

  let walkCycleType = "";  

  if (contract === WIZARD_CONTRACT) {
    walkCycleType = "wizard";
  } else if (contract === WARRIOR_CONTRACT) {
    walkCycleType = "warrior";
  } else if (contract === BABY_CONTRACT) {
    walkCycleType = "baby";
  } else if (contract === SOUL_CONTRACT) {
    walkCycleType = "soul"
  }

  let backgroundImageUrl = "";

  switch (walkCycleType) {
    case "wizard":
      backgroundImageUrl = `https://www.forgottenrunes.com/api/art/wizards/${id}.png`;
      break;
    case "warrior":
      backgroundImageUrl = `https://portal.forgottenrunes.com/api/warriors/img/${id}.png`;
      break;
    case "baby":
      backgroundImageUrl = `https://forgottenbabies.com//uri/json/${id}.png`;
      break;
    case "soul":
       backgroundImageUrl = `https://portal.forgottenrunes.com/api/souls/img/${id}`;
       break;
    default:
      // Handle unknown walkCycleType, if needed
  }
  
  return (
      <div
            onClick={() => onSelect({ id, contract })}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ overflow: "hidden", position: "relative", border: isSelected ? '3px solid green' : 'none' }}
        >
            <div style={{ overflow: "hidden", position: "relative" }}>
                <div
                    style={{
                        backgroundImage: isHovered ? 'url("/img/frame_on.png")' : 'url("/img/frame_off.png")',
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
          backgroundImage: `url("${backgroundImageUrl}")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: backgroundPositions[backgroundPosition],
          backgroundSize: "80%",
          clipPath: "polygon(5% 3%, 94% 3%, 95% 97%, 5% 97%)",
        }}
      />
      </div>
    </div>
  );
};

export default CharacterSelect;
