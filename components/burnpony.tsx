import { useState } from 'react';
import axios from 'axios';

const BurnPony = ({ apiUrl }) => {
  const [ponyName, setPonyName] = useState('');
  const [ponyId, setPonyId] = useState('');
  const [ponyImage, setPonyImage] = useState('');

  const handleSubmit = () => {
    axios.get(apiUrl)
      .then(function (response) {
        const { name, attributes } = response.data;

        const traitMappings = {
            pony: {
              soul_pony: 'soul_pony',
              fell_pony: 'soul_fell_pony',
              wold_pony: 'blight_infected_pony',
              ash_pony: 'shade_spectre_pony',
              dusk_pony: 'holy_spectre_pony',
              proto_pony: 'proto_soul_pony',
              steppe_pony: 'salacious_ghoul_pony',
              little_brown_pony: 'putrid_zombie_pony',
              xanthous_pony: 'ecto_spectre_pony',
              valley_pony: 'gangrene_infected_pony',
              draft_pony: 'sick_ghoul_pony',
              dappled_pony: 'ghost_pony',
              dream_pony: 'pale_ghoul_pony',
              pearl_pony: 'consumption_zombie_pony',
              necro_pony: 'angelic_pony',
              cosmic_pony: 'ethereal_spectre_pony',
              pamplemousse_pony: 'gigas_pony',
              dazzling_zebra: 'skelepony',
              quagga: 'skelepony',
              sleipnirs_foal: 'sleipnirs_soul_foal',
              cyber_pony: 'cyber_soul_pony',
            },
            clothes: {
              blue_bandana: 'blue_soul_bandanna',
              brown_bandana: 'brown_soul_bandanna',
              red_bandana: 'red_soul_bandanna',
              yellow_bandana: 'yellow_soul_bandanna',
              purple_bandana: 'purple_soul_bandanna',
              green_bandana: 'green_soul_bandanna',
              saddle: 'soul_saddle',
              little_bowtie: 'skull_tie',
              purple_drape: 'purple_torn_drape',
              red_drape: 'red_torn_drape',
              yellow_caparison: 'yellow_soul_caparison',
              blue_caparison: 'blue_soul_caparison',
              brown_caparison: 'brown_soul_caparison',
              green_caparison: 'green_soul_caparison',
              purple_caparison: 'purple_soul_caparison',
              red_caparison: 'red_soul_caparison',
              leather_armor: 'leather_soul_armor',
              legendary_armor: 'legendary_soul_armor',
              steel_armor: 'ghost_armor',
              rainbow_caparison: 'rainbow_soul_caparison',
            },
            mouth: {
              pipe: 'zombie_mouth',
              spiked_ball_and_chain: 'spiked_ball_and_chain',
              bubble_pipe: 'slime_bubble_pipe',
              carrot: 'blood_eater',
              rose: 'slime_donut',
            },
            head: {
              red_bridle: 'soul_bridle',
              leather_bridle: 'bloody_eyes',
              yellow_bridle: 'gooey_eyes',
              spectacles: 'lich_horn',
              pony_wizard_hat: 'halo',
              sunglasses: 'wraith_hat',
              '3D_glasses': '3D_wraith_hat',
              unicorn_horn: 'dark_halo',
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
              Pony Name
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
              Pony ID
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

export default BurnPony;
