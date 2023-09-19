import React from 'react';

interface Trait {
    trait_type: string;
    value: string;
}

interface CharacterRenderProps {
    traits: Trait[];
}

const traitOrder = ['background', 'body', 'head', 'familiar', 'prop', 'rune'];

const orderTraits = (traits: Trait[]): Trait[] => {
    return traitOrder.map((order) => traits.find((trait) => trait.trait_type.toLowerCase() === order) || { trait_type: order, value: 'default' });
};

const generateImagePath = (type: string, value: string) => {
    const formattedValue = value.replace(/\s+/g, '_').replace(/:/g, '').replace(/,/g, '').toLowerCase() + '.png';
    return `/assets/${type}/${formattedValue}`;
};

const CharacterRender: React.FC<CharacterRenderProps> = ({ traits }) => {
    const orderedTraits = orderTraits(traits);

    return (
        <div style={{ width: '500px', height: '500px', position: 'relative' }}>
            {orderedTraits.map((trait, index) => {
    console.log(generateImagePath(trait.trait_type, trait.value));
    return (
        <img 
            key={index}
            src={generateImagePath(trait.trait_type, trait.value)}
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
