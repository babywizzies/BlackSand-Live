import React from 'react';
import axios from 'axios';
import styles from "../../../styles/css/ponies.module.css";
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

export async function getServerSideProps(context) {
  const { params } = context
  const { id } = params;
  const filePath = path.join(process.cwd(), 'pages', 'api', 'blacksand', 'TECWeek7Engine.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const filePath2 = path.join(process.cwd(), 'pages', 'api', 'blacksand', 'EtherCupRanking.json')
  const data2 = JSON.parse(fs.readFileSync(filePath2, 'utf8'))
  const ranking = data2.find(p => p["Pony ID"] === parseInt(id));
  const { data: diceRollData } = await axios.get(`https://blacksand.city/gameengine/dice-rolls`)
  const treatRolls = diceRollData.filter(p => p["id"] === id);
  const { data: engineData } = await axios.get(`https://blacksand.city/gameengine/engine`)
  console.log('engineData:', engineData)
  const enginePoints = engineData.find(obj => obj["Pony ID"] === parseInt(id)) || {}

  const pony = data.find(p => p["Pony ID"] === parseInt(id));

  if (!pony) {
    return { props: { pony: null } }
  }
  if (!treatRolls) {
    return { props: { pony: pony, ranking: ranking, treatRolls: null, enginePoints } }
  }


  return {
    props: { pony, ranking, treatRolls, engineData, enginePoints },
  }


}

export default function Pony({ pony, ranking,  treatRolls, engineData, enginePoints = {}}) {

  const treat1 = treatRolls?.filter(p => p.hasOwnProperty('treat1'));
  const treat2 = treatRolls?.filter(p => p.hasOwnProperty('treat2'));
  const treat3 = treatRolls?.filter(p => p.hasOwnProperty('treat3'));
  let treat1Value = treat1?.length > 0 && treat1[0].roll ? parseInt(treat1[0].roll, 10) : 0;
  let treat2Value = treat2?.length > 0 && treat2[0].roll ? parseInt(treat2[0].roll, 10) : 0;
  let treat3Value = treat3?.length > 0 && treat3[0].roll ? parseInt(treat3[0].roll, 10) : 0;
  const treatPoints = treat1Value + treat2Value + treat3Value;

  const twitterPoints = enginePoints["Twitter Points"] ? parseInt(enginePoints["Twitter Points"], 10) : 0;

const abilityPoints = enginePoints['Ability Points'] ? parseInt(enginePoints['Ability Points'], 10) : 0;
const lootPoints = enginePoints['Loot Points'] ? parseInt(enginePoints['Loot Points'], 10) : 0;
const trainingPoints = enginePoints['Training Points'] ? parseInt(enginePoints['Training Points'], 10) : 0;
const moralePoints = enginePoints['Morale Points'] ? parseInt(enginePoints['Morale Points'], 10) : 0;
const racePoints = enginePoints['Race Week Points'] ? parseInt(enginePoints['Race Week Points'], 10) : 0;

const totalPoints = twitterPoints + treatPoints + abilityPoints + lootPoints + trainingPoints + moralePoints + racePoints;

  const router = useRouter()
  if (!pony) {
    return <h1>Pony not found</h1>
  }

  const allAbilitiesEmpty = pony['Ability #1'] === '' && pony['Ability #2'] === '' && pony['Ability #3'] === '';
    
    const allTreatsEmpty = pony['Treat #1'] === '' && pony['Treat #2'] === '' && pony['Treat #3'] === '';

    const noTreatPoints = pony['Treats Points 1'] === '';

    const imageLink = `https://portal.forgottenrunes.com/api/shadowfax/img/${pony["Pony ID"]}`;

  
  console.log(enginePoints["Twitter Points"])
  console.log('treat:', treatRolls)
  return (
    <div>
       <div className={styles.container}>

          <div className={styles.header}>
            <div className={styles.sub_header}>
              <div className={styles.sub_header}>
                <div className={styles.owner_name}>
                 <h1 className={styles.name}>{pony['Pony Name']}</h1>
                 <p className={styles.owner}>Pony Owner: {pony.Holder.toUpperCase()}</p>
                </div>
              </div>
              <div className={styles.subcontainer_1}>
                    <div className={styles.origin_runes}>
                        <p className={styles.origin}>Origins: {pony.Origins}</p>
                        <p className={styles.runes}>Rune: {pony.Rune}</p>
                    </div>
                    <div className={styles.level_exp}>
                        <p className={styles.level}>Level: {pony["Level"]}</p>
                        <p className={styles.exp}>Experience: {pony['Race Week Experience']}</p> 
                    </div>
                </div>   
          </div>
          <img src={imageLink} key={pony.id} className={styles.portrait}/>
          

        <div className={styles.card_container}>
              <div className={styles.card}>
              <div className={styles.abilities}>
              <h1 className={styles.container_title}>Abilities</h1>
            {allAbilitiesEmpty && (
                <p className={styles.container_text}>No abilities</p>
            )}
            {!allAbilitiesEmpty && (
              <div className={styles.grid}>
  {pony['Ability #1'] && <p className={styles.container_text}>Ability #1: {pony['Ability #1']}</p>}
  {pony['Ability #2'] &&<p className={styles.container_text}>Ability #2: {pony['Ability #2']}</p>}
  {pony['Ability #3'] && <p className={styles.container_text}>Ability #3: {pony['Ability #3']}</p>}
  </div>
           
       
        
            )}
             
             </div>
            </div>
        

        <div className={styles.card}>
        <div className={styles.abilities}>
           <h1 className={styles.container_title}>Treats</h1>
           <div className={styles.grid}>
            
            {!allTreatsEmpty && (
              <>
                <p className={styles.container_text}>Treat #1: {pony['Treat #1']} {treat1[0] && treat1[0].roll ? treat1[0].roll : 'Not rolled this week'}</p>
                <p className={styles.container_text}>Treat #2: {pony['Treat #2']} {treat2[0] && treat2[0].roll ? treat2[0].roll : 'Not rolled this week'}</p>
                <p className={styles.container_text}>Treat #3: {pony['Treat #3']} {treat3[0] && treat3[0].roll ? treat3[0].roll : '✔️ '}</p>
              </>
            )}
            {allTreatsEmpty && (
              <p>No treats used</p>
            )}
            <p className={styles.container_text}>Indigestion: {enginePoints.Indigestion}</p>
            <p className={styles.container_text}>Indigestion in Previous Race: {enginePoints["Recent Indigestion"]}</p>

            </div>
            </div>
    </div>

          <div className={styles.card}>
            <div className={styles.abilities}>
                <h1 className={styles.container_title}>Points</h1>
            <p>Twitter Points: {twitterPoints}</p>
                <p>Treats Points: {treatPoints}</p>
                <p>Ability Points: {abilityPoints}</p>
                <p>Loot Points: {lootPoints}</p>
                <p>Training Points: {trainingPoints}</p>
                <p>Morale Points: {moralePoints}</p>
                <p>Event Race Points: {racePoints}</p>
                <p><b>Total Points: {totalPoints}</b></p>
                </div>
            </div>


            <div className={styles.card}>
            <div className={styles.abilities}>
                <h1 className={styles.container_title}>Ranking - Ether Cup</h1>
                <div className={styles.grid}>
                <p className={styles.container_text}>Race Week #1: {ranking["Race Week #1 Rank"]}</p>
                <p className={styles.container_text}>Race Week #2: {ranking["Race Week #2 Rank"]}</p>
                <p className={styles.container_text}>Race Week #3: {ranking["Race Week #3 Rank"]}</p>
                <p className={styles.container_text}>Race Week #4: {ranking["Race Week #4 Rank"]}</p>
                <p className={styles.container_text}>Race Week #5: {ranking["Race Week #5 Rank"]}</p>
                <p className={styles.container_text}>Race Week #6: {ranking["Race Week #6 Rank"]}</p>
      </div>

    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
)};