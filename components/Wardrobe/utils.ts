// utils.ts
export const matchTraitsToFile = (traits: any) => {
    // Mocking your sample JSON for demonstration
    const mockJson = {
        
            "idx": "0",
            "name": "The Emissary",
            "traits": {
              "background": {
                "idx": "0",
                "filename": "bg_black.png",
                "trait": "background",
                "label": "Black"
              },
              "companion": {
                "idx": "198",
                "filename": "companion_goat_black.png",
                "trait": "companion",
                "label": "Black Goat"
              },
              "body": {
                "idx": "109",
                "filename": "body_plateArmor_black.png",
                "trait": "body",
                "label": "Dominion Plate Armor"
              },
              "head": {
                "idx": "398",
                "filename": "head_voideth.png",
                "trait": "head",
                "label": "Darkling"
              },
              "shield": {
                "idx": "449",
                "filename": "shield_eye.png",
                "trait": "shield",
                "label": "Illuminatus Shield"
              },
              "weapon": {
                "idx": "597",
                "filename": "weapon_sword_eye_meta.png",
                "trait": "weapon",
                "label": "Meta Sword"
              },
              "rune": {
                "idx": "421",
                "filename": "rune_omega.png",
                "trait": "rune",
                "label": "Rune of Omega"
              }
            }
          
    };
  
  // Transform your traits to fit into the mockJson format.
  const transformedTraits: { [key: string]: string } = {};

  traits.forEach((trait) => {
    // Transform the trait_type to match the keys in mockJson.traits. Adjust as needed.
    const transformedTraitType = trait.trait_type.toLowerCase();

    // Locate the filename in mockJson using the transformed trait_type and value.
    const filename = mockJson.traits[transformedTraitType]?.filename;

    // If filename is found, add it to the transformedTraits object.
    if (filename) {
      transformedTraits[transformedTraitType] = filename;
    }
  });
  
  return transformedTraits;
};
  