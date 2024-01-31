import { useState } from 'react';
import axios from 'axios';

const BurnMech = ({ apiUrl }) => {
  const [ponyName, setPonyName] = useState('');
  const [ponyId, setPonyId] = useState('');
  const [ponyImage, setPonyImage] = useState('');

  const handleSubmit = () => {
    axios.get(apiUrl)
      .then(function (response) {
        const { name, attributes } = response.data;

        const traitMappings = {
            pony: {
              "mecha pony": "soul pony",
              brown_cyborg_pony: "blue_crystal_pony",
              brown_robo_pony: "blue_robo_pony",
              buckethead_atomic_26_pony_v2: "buckethead_atomic_26_soul",
              buckethead_atomic_79_pony_v2: "buckethead_atomic_79_soul",
              cyber_pony_premium: "cyber_pony_premium_soul",
              dark_painted_robo_pony: "slime_robo_pony",
              dark_wind_up_pony: "sparkle_soul",
              gray_cyborg_pony: "purple_crystal_pony",
              gray_robo_pony: "purple_robo_pony",
              green_mecha_pony: "yellow_crystal_pony",
              kobony: "pink_robo_pony",
              painted_robo_pony: "gore_robo_pony",
              painted_wind_up_pony: "painted_sparkle_soul",
              purple_mecha_pony: "green_crystal_pony",
              red_mecha_pony: "green_robo_pony",
              white_mecha_pony: "pink_crystal_pony",
            },
            clothes: {
              "mecha clothes": "soul mecha clothes",
              blue_mech_armor: "quantum_crystal_armor",
              cyborg_leg: "quantum_crystal_leg",
              blue_crystal_leg: "blue_crystal_leg",
              yellow_crystal_leg: "yellow_crystal_leg",
              fully_charged_armor: "charged_blue_crystal_armor",
              charged_pink_crystal_armor: "charged_pink_crystal_armor",
              charged_yellow_crystal_armor: "charged_yellow_crystal_armor",
              charged_quantum_crystal_armor: "charged_quantum_crystal_armor",
              fur_drape: "bedazzled_fur_drape",
              hover_horseshoes: "ruby_slippers",
              lazer_guns: "shard_shooter",
              mech_cloak: "blue_beaded_cloak",
              green_beaded_cloak: "green_beaded_cloak",
              quantum_beaded_cloak: "quantum_beaded_cloak",
              yellow_beaded_cloak: "yellow_beaded_cloak",
              odd_antenna: "blue_crystal_cyst",
              pink_crystal_cyst: "pink_crystal_cyst",
              quantum_crystal_cyst: "quantum_crystal_cyst",
              yellow_crystal_cyst: "yellow_crystal_cyst",
              red_battery_pack: "blue_crystal_pack",
              pink_crystal_pack: "pink_crystal_pack",
              quantum_crystal_pack: "quantum_crystal_pack",
              yellow_crystal_pack: "yellow_crystal_pack",
              green_crystal_pack: "green_crystal_pack",
              rocket_boosters: "ruby_slippers",
              transformer_armor: "quantum_crystal_armor",
            },
            head: {
              "mecha_head": "soul_mecha_head",
              antenna_helmet: "quantum_crystal_helmet",
              blue_mushroom_cap: "engorged_blue_mushroom_cap",
              cyber_champion_helmet: "despot_crown",
              electro_helm: "yellow_crystal_helmet",
              force_shield: "quantum_force_shield",
              gold_cyber_helmet: "duke_crown",
              green_headband: "green_flower_crown",
              green_mushroom_cap: "engorged_green_mushroom_cap",
              helmet_x_treme: "mane_x_treme",
              mech_hood: "quantum_hood",
              mech_visor: "quantum_visor",
              mysterious_mask: "crystal_eyes",
              red_headband: "red_flower_crown",
              red_mushroom_cap: "engorged_red_mushroom_cap",
              robo_helm: "pink_crystal_helmet",
              robo_mask: "crystallized_mask",
              tin_foil_hat: "blue_crystal_helmet",
              top_hat: "gold_crown",
              villainous_mask: "coal_eyes",
              visor: "rainbow_visor",
              yellow_headband: "yellow_flower_crown",
            },
            mouth: {
              mech_mouth: "soul_mech_mouth",
              battery: "purple_crystal",
              brown_boot: "ruby_slipper",
              claw_mask: "rotten_zombie_mask",
              cucumdog: "banana",
              exposed_mouth_wires: "yellow_crystal",
              exposed_robo_mouth: "blue_crystal",
              game_controller: "pink_crystal",
              green_boot: "glass_slipper",
              jelly_donut: "cheesy_pizza",
              joint: "sherlock_pipe",
              repair_kit: "boom_box",
              transformer_mask: "gore_mask",
            },
          };
          

        const traitsToInclude = ['background', 'pony', 'clothes', 'mouth', 'head'];

        const buildObject = attributes
          .filter(attribute => traitsToInclude.includes(attribute.trait_type))
          .map(attribute => ({
            name: attribute.trait_type,
            item: traitMappings[attribute.trait_type] && traitMappings[attribute.trait_type][attribute.value.replace(/ /g, '_').toLowerCase()] || attribute.value,
          }));

        const requestModel = {
          name: name || ponyName,
          tokenId: ponyId,
          buildObject,
        };

        axios
          .post('http://localhost:5555/art', requestModel)
          .then(function (response) {
            const storedImageLocation = response.data;
            const cleanImage = storedImageLocation.replace(/\\/g, '/');
            setPonyImage(cleanImage + '?rand=' + Math.random());
          });
      });
  };

  return (
    
    <div className="container">
      {/* Nav */}
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Pony Maker</span>
        </div>
      </nav>

      {/* Body */}
      <div className="row">
        <div className="col-md-12">
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Ponys Name
            </span>
            <input
              type="text"
              value={ponyName}
              onChange={(e) => setPonyName(e.target.value)}
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Ponys ID
            </span>
            <input
              type="text"
              value={ponyId}
              onChange={(e) => setPonyId(e.target.value)}
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>

          <button onClick={() => handleSubmit()} type="button" className="btn btn-primary">
            Create
          </button>
        </div>
      </div>

      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <img id="ponyImage" src={ponyImage} height="512" />
        </div>
      </div>
    </div>
    
  );
};

export default BurnMech;
