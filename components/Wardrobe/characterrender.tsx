import React from 'react';
import Image from 'next/image'; // Import the Image component
import styles from "../../styles/css/wardrobe2.module.css";

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

const generateImagePath = (type: string, value: string, filename: string, collection: string): string => {
  let finalFilename;

  if (collection === 'warriors') {
    finalFilename = `${filename}`;
    return `/assets/warriors/${finalFilename}`;
  }
  if (collection === 'souls') {
    finalFilename = `${filename}`;
    return `/assets/souls/${finalFilename}`;
  }
  finalFilename = value.replace(/\s+/g, '_').replace(/'/g, '').toLowerCase().replace(/,/g, '') + '.png';
  return `/assets/${type}/${finalFilename}`;
};


const CharacterRender: React.FC<CharacterRenderProps> = ({ traits, collection }) => {
  const orderedTraits = orderTraits(traits);

  return (
    <div className={styles.adventurer_container}>
      {orderedTraits.map((trait, index) => (
        // Add the key prop here
        <div key={index} className={styles.adventurer_item}>
          <Image
  className={styles.adventurer_img}
  src={generateImagePath(trait.trait_type, trait.value, trait.filename || '', collection)}
  alt={trait.value}
  width={500} // Set appropriate width
  height={500} // Set appropriate height
  layout="responsive" // Optional: Adjust layout as needed
/>

        </div>
      ))}
    </div>
  );
};

export default CharacterRender;
