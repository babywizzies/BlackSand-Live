// components/WarriorCard.js
import Image from 'next/image';

const WarriorCard = ({ warrior }) => {
  return (
    <div className="warrior-card">
      <h3>{warrior.name}</h3>
      <div className="warrior-traits">
        {Object.keys(warrior.traits).map((traitKey) => {
          const trait = warrior.traits[traitKey];
          const imgSrc = `/assets/warriors/${trait.filename}`;
          return (
            <div key={trait.idx} className="trait">
              <Image src={imgSrc} alt={trait.label} width={50} height={50} />
              <p>{trait.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WarriorCard;