import React from 'react';
import styles from "../../styles/css/wardrobe2.module.css"

interface Trait {
  trait_type: string;
  value: string;
  filename?: string; // Optional filename property
}

interface CharacterRenderProps {
  traits: Trait[];
  collection: string;
}

const traitOrder = ['background', 'body', 'head', 'familiar', 'rune', 'companion', 'shield', 'weapon', 'prop'];

const orderTraits = (traits: Trait[]): Trait[] => {
  return traitOrder.map((order) => traits.find((trait) => trait.trait_type.toLowerCase() === order) || { trait_type: order, value: '' });
};

const generateImagePath = (type: string, value: string, filename?: string | null, collection: string): string => {
  let finalFilename;

  // If filename is provided in the attribute, use the 'warriors' folder
  if (collection === 'warriors') {
    finalFilename = `${filename}`;
    return `/assets/warriors/${finalFilename}`;
  }
  if (collection === 'souls') {
    finalFilename = `${filename}`;
    return `/assets/souls/${finalFilename}`;
  }
  // Otherwise, generate the filename based on the trait value
  finalFilename = value.replace(/\s+/g, '_').replace(/'/g, '').toLowerCase().replace(/,/g, '') + '.png';
  return `/assets/${type}/${finalFilename}`;
};

const CharacterRender: React.FC<CharacterRenderProps> = ({ traits, collection }) => {  const orderedTraits = orderTraits(traits);

  return (
    <div className={styles.adventurer_container}>
      {orderedTraits.map((trait, index) => (
        <div className={styles.adventurer_item}>
        <img
          className={styles.adventurer_img}
          key={index}
          src={generateImagePath(trait.trait_type, trait.value, trait.filename, collection)}
          alt={trait.value}
        />
        </div>
      ))}
    </div>
  );
};

export default CharacterRender;
