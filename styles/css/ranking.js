import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import styles from "../../../styles/css/ponies.module.css"
import fs from 'fs'
import path from 'path'

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'pages', 'api', 'blacksand', 'EtherCupRanking.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const { data: diceRollData } = await axios.get(`http://localhost:3001/dice-rolls`)
  
  const { data: engineData } = await axios.get(`http://localhost:3001/engine`)
  console.log('engineData:', engineData)
 

  return {
    props: { rankingData: data, engineData },
  }
}



const Ranking = ({ rankingData, engineData }) => {
  const [poniesPoints, setPoniesPoints] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const poniesData = rankingData.map((ponyData) => {
      const twitterPoints = ponyData["Twitter Points"] ? parseInt(ponyData["Twitter Points"], 10) : 0;
      const abilityPoints = ponyData['Ability Points'] ? parseInt(ponyData['Ability Points'], 10) : 0;
      const lootPoints = ponyData['Loot Points'] ? parseInt(ponyData['Loot Points'], 10) : 0;
      const trainingPoints = ponyData['Training Points'] ? parseInt(ponyData['Training Points'], 10) : 0;
      const moralePoints = ponyData['Morale Points'] ? parseInt(ponyData['Morale Points'], 10) : 0;
      const racePoints = ponyData['Race Week Points'] ? parseInt(ponyData['Race Week Points'], 10) : 0;
    
      return {
        'ponyName': ponyData["Pony Name"],
        'ponyID': ponyData["Pony ID"],
        'Championship Points': ponyData["Championship Points"] ? parseInt(ponyData["Championship Points"], 10) : 0,
        'totalPoints': twitterPoints + abilityPoints + lootPoints + trainingPoints + moralePoints + racePoints
      };
    });

    setPoniesPoints(poniesData);
  }, [rankingData]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedPoniesPoints = poniesPoints.sort((a, b) => {
    let comparison = 0;
    if (a[sortBy] > b[sortBy]) {
      comparison = 1;
    } else if (a[sortBy] < b[sortBy]) {
      comparison = -1;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const combinedData = [...rankingData, ...engineData].reduce((acc, ponyData) => {
    const twitterPoints = ponyData["Twitter Points"] ? parseInt(ponyData["Twitter Points"], 10) : 0;
    const abilityPoints = ponyData['Ability Points'] ? parseInt(ponyData['Ability Points'], 10) : 0;
    const lootPoints = ponyData['Loot Points'] ? parseInt(ponyData['Loot Points'], 10) : 0;
    const trainingPoints = ponyData['Training Points'] ? parseInt(ponyData['Training Points'], 10) : 0;
    const moralePoints = ponyData['Morale Points'] ? parseInt(ponyData['Morale Points'], 10) : 0;
    const racePoints = ponyData['Race Week Points'] ? parseInt(ponyData['Race Week Points'], 10) : 0;
  
    const totalPoints = twitterPoints + abilityPoints + lootPoints + trainingPoints + moralePoints + racePoints;
    const ponyId = ponyData["Pony ID"];
    
    if (acc[ponyId]) {
      acc[ponyId].totalPoints += totalPoints;
    } else {
      acc[ponyId] = {
        "Pony Name": ponyData["Pony Name"],
        "Pony ID": ponyId,
        "Holder": ponyData["Holder"],
        "Championship Rank": ponyData["Championship Rank"],
        "Race Week #1 Rank": ponyData["Race Week #1 Rank"],
        "Race Week #2 Rank": ponyData["Race Week #2 Rank"],
        "Race Week #3 Rank": ponyData["Race Week #3 Rank"],
        "Race Week #4 Rank": ponyData["Race Week #4 Rank"],
        "Race Week #5 Rank": ponyData["Race Week #5 Rank"],
        "Race Week #6 Rank": ponyData["Race Week #6 Rank"],
        "Race Week #1 Championship Points": ponyData["Race Week #1 Championship Points"],
        "Race Week #2 Championship Points": ponyData["Race Week #2 Championship Points"],
        "Race Week #3 Championship Points": ponyData["Race Week #3 Championship Points"],
        "Race Week #4 Championship Points": ponyData["Race Week #4 Championship Points"],
        "Race Week #5 Championship Points": ponyData["Race Week #5 Championship Points"],
        "Race Week #6 Championship Points": ponyData["Race Week #6 Championship Points"],
        "Championship Points": ponyData["Championship Points"],
        "Race Week #7 Championship Points": totalPoints
      };
    }
  
    return acc;
  }, {});
  
  const sortedCombinedData = Object.values(combinedData).sort((a, b) => {
    let comparison = 0;
    if (a[sortBy] > b[sortBy]) {
      comparison = 1;
    } else if (a[sortBy] < b[sortBy]) {
      comparison = -1;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  console.log(combinedData);

 
  
  const imageLink = `https://portal.forgottenrunes.com/api/shadowfax/img/`;
  return (
    <div className={styles.card}>
    <div className={styles.attributes}>
      <h1>Ranking</h1>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort("Championship Rank")}>Championship Rank</th>
            <th>Pony Image</th>
            <th onClick={() => handleSort("Pony Name")}>Pony Name</th>
            <th>Holder</th>
            <th>Pony ID</th>
            <th>Championship Points</th>
            <th>Race Week #1 Rank</th>
            <th>Race Week #1 Championship Points</th>
            <th>Race Week #2 Rank</th>
            <th onClick={() => handleSort(["Race Week #2 Championship Points"])}>Race Week #2 Championship Points</th>
            <th>Race Week #3 Rank</th>
            <th onClick={() => handleSort(["Race Week #3 Championship Points"])}>Race Week #3 Championship Points</th>
            <th>Race Week #4 Rank</th>
            <th onClick={() => handleSort(["Race Week #4 Championship Points"])}>Race Week #4 Championship Points</th>
            <th>Race Week #5  Rank</th>
            <th onClick={() => handleSort(["Race Week #5 Championship Points"])}>Race Week #5 Championship Points</th>
            <th>Race Week #6 Rank</th>
            <th onClick={() => handleSort(["Race Week #6 Championship Points"])}>Race Week #6 Championship Points</th>
            <th onClick={() => handleSort(["Race Week #7 Rank"])}>Race Week #7 Rank</th>
            <th onClick={() => handleSort(["Race Week #7 Championship Points"])}>Race Week #7 Championship Points</th>
          </tr>
        </thead>
        <tbody>
        {Object.values(sortedCombinedData).map((ponyData, index) => (
            <tr key={index} className={styles.ranking}>
              <td>{ponyData["Championship Rank"]}</td>
              <td>
                <img src={imageLink + ponyData["Pony ID"]} alt={ponyData["Pony Name"]} height="100px" />
              </td>
              <td>{ponyData["Pony Name"]}</td>
              <td>{ponyData["Holder"]}</td>
              <td>{ponyData["Pony ID"]}</td>
              <td>{ponyData["Championship Points"]}</td>
              <td>{ponyData["Race Week #1 Rank"]}</td>
              <td>{ponyData["Race Week #1 Championship Points"]}</td>
              <td>{ponyData["Race Week #2 Rank"]}</td>
              <td>{ponyData["Race Week #2 Championship Points"]}</td>
              <td>{ponyData["Race Week #3 Rank"]}</td>
              <td>{ponyData["Race Week #3 Championship Points"]}</td>
              <td>{ponyData["Race Week #4 Rank"]}</td>
              <td>{ponyData["Race Week #4 Championship Points"]}</td>
              <td>{ponyData["Race Week #5 Rank"]}</td>
              <td>{ponyData["Race Week #5 Championship Points"]}</td>
              <td>{ponyData["Race Week #6 Rank"]}</td>
              <td>{ponyData["Race Week #6 Championship Points"]}</td>
              <td>{ponyData["Race Week #7 Rank"]}</td>
              <td>{ponyData["Race Week #7 Championship Points"]}</td>
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
  </div>
  );
};

export default Ranking;