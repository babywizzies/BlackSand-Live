import React from 'react';

interface Trait {
    trait_type: string;
    value: string;
}

interface CharacterRenderProps {
    traits: Trait[];
    collection: string;
}

interface CollectionConfig {
    singleFolder: boolean;
    folderName?: string;
}



const collectionsConfig: Record<string, CollectionConfig> = {
    'wizards': { singleFolder: false }, // Existing collection
    'warriors': { singleFolder: true, folderName: 'warriors' },
    'babies': { singleFolder: false }, // Existing collection

};


const traitOrder = ['background', 'body', 'head', 'familiar', 'companion', 'weapon', 'prop', 'rune'];

const orderTraits = (traits: Trait[]): Trait[] => {
    return traitOrder.map((order) => traits.find((trait) => trait.trait_type.toLowerCase() === order) || { trait_type: order, value: 'default' });
};

const generateImagePath = (type: string, value: string, collection: string) => {
    const config = collectionsConfig[collection];
    
    if (!config) {
        console.error(`No configuration found for collection: ${collection}`);
        return ''; // Return a default path or handle this case as you see fit.
    }

    let formattedValue = value.replace(/\s+/g, '_').replace(/'/g, '').toLowerCase() + '.png';

    if (config.singleFolder && config.folderName) {
        formattedValue = `${type}_${formattedValue}`;
        return `/assets/${config.folderName}/${formattedValue}`;
    } else {
        return `/assets/${type}/${formattedValue}`;
    }
};




const CharacterRender: React.FC<CharacterRenderProps> = ({ traits, collection }) => {
    console.log("Props in CharacterRender:", { traits, collection });    const orderedTraits = orderTraits(traits);

    return (
        <div style={{ width: '500px', height: '500px', position: 'relative' }}>
            {orderedTraits.map((trait, index) => {
    console.log(generateImagePath(trait.trait_type, trait.value));
    return (
<img 
    key={index}
    src={generateImagePath(trait.trait_type, trait.value, collection)} // Pass the collection's name here
    alt={trait.value}
    style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    }}
/>
    );
})}
        </div>
    );
};

export default CharacterRender;
