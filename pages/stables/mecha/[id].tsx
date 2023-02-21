import React from "react";
import axios from "axios";
import styles from "../../../styles/css/ponies.module.css";
import fs from "fs";
import path from "path";
import { GetServerSideProps } from "next";
import { EnginePoints } from "../../../types/EnginePoints";
import { TokenMedia, useTokens } from "@reservoir0x/reservoir-kit-ui";
import useEnsResolver from "../../../hooks/useENSResolver";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const filePath2 = path.join(
    process.cwd(),
    "pages",
    "api",
    "blacksand",
    "EtherCupRanking.json"
  );
  const data2 = JSON.parse(fs.readFileSync(filePath2, "utf8"));
  const ranking = data2.find((p: any) => p["Pony ID"] === parseInt(id)) || {};
  const { data: diceRollData } = await axios.get(
    `https://blacksand.city/gameengine/dice-rolls`
  );
  const treatRolls = diceRollData.filter((p: any) => p["id"] === id);
  const engineResponse = await axios.get(
    `https://blacksand.city/gameengine/engine`
  );
  const engineData: EnginePoints[] = engineResponse.data;
  const enginePoints =
    engineData.find((obj: any) => obj["Pony ID"] === parseInt(id)) || {};

  if (!treatRolls) {
    return {
      props: { id, ranking, treatRolls: null, enginePoints },
    };
  }

  return {
    props: { id, ranking, treatRolls, enginePoints },
  };
};

type PoniesProps = {
  id: string;
  ranking: any;
  treatRolls: any;
  enginePoints: EnginePoints;
};

export default function MechaPony({
  id,
  ranking,
  treatRolls,
  enginePoints,
}: PoniesProps) {
  const { data: tokenData } = useTokens({
    tokens: [`0xf486f696b80164b5943191236eca114f4efab2ff:${id}`],
  });
  const token = tokenData[0]?.token;
  const owner = useEnsResolver(token?.owner);

  const treat1 = treatRolls?.filter((p: any) => p.hasOwnProperty("treat1"));
  const treat2 = treatRolls?.filter((p: any) => p.hasOwnProperty("treat2"));
  const treat3 = treatRolls?.filter((p: any) => p.hasOwnProperty("treat3"));
  let treat1Value =
    treat1?.length > 0 && treat1[0].roll ? parseInt(treat1[0].roll, 10) : 0;
  let treat2Value =
    treat2?.length > 0 && treat2[0].roll ? parseInt(treat2[0].roll, 10) : 0;
  let treat3Value =
    treat3?.length > 0 && treat3[0].roll ? parseInt(treat3[0].roll, 10) : 0;
  const treatPoints = treat1Value + treat2Value + treat3Value;

  const twitterPoints = enginePoints["Twitter Points"]
    ? parseInt(`${enginePoints["Twitter Points"]}`, 10)
    : 0;

  const abilityPoints = enginePoints["Ability Points"]
    ? parseInt(`${enginePoints["Ability Points"]}`, 10)
    : 0;
  const lootPoints = enginePoints["Loot Points"]
    ? parseInt(`${enginePoints["Loot Points"]}`, 10)
    : 0;
  const trainingPoints = enginePoints["Training Points"]
    ? parseInt(`${enginePoints["Training Points"]}`, 10)
    : 0;
  const moralePoints = enginePoints["Morale Points"]
    ? parseInt(`${enginePoints["Morale Points"]}`, 10)
    : 0;
  const racePoints = enginePoints["Race Week Points"]
    ? parseInt(`${enginePoints["Race Week Points"]}`, 10)
    : 0;

  const totalPoints =
    twitterPoints +
    treatPoints +
    abilityPoints +
    lootPoints +
    trainingPoints +
    moralePoints +
    racePoints;

  // const allAbilitiesEmpty =
  //   pony["Ability #1"] === "" &&
  //   pony["Ability #2"] === "" &&
  //   pony["Ability #3"] === "";
  const allAbilitiesEmpty = true;

  // const allTreatsEmpty =
  //   pony["Treat #1"] === "" &&
  //   pony["Treat #2"] === "" &&
  //   pony["Treat #3"] === "";
  const allTreatsEmpty = true;

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.sub_header}>
            <div className={styles.sub_header}>
              <div className={styles.owner_name}>
                <h1 className={styles.name}>{token?.name}</h1>
                <p className={styles.owner}>Pony Owner: {owner.displayName}</p>
              </div>
            </div>
            <div className={styles.subcontainer_1}>
              <div className={styles.level_exp}>
                <p className={styles.level}>Level: 0</p>
                <p className={styles.exp}>Experience: 0</p>
              </div>
            </div>
          </div>
          <TokenMedia
            token={token}
            style={{ width: "100%", borderRadius: 10, height: "auto" }}
          />

          <div className={styles.card_container}>
            <div className={styles.card}>
              <div className={styles.abilities}>
                <h1 className={styles.container_title}>Abilities</h1>
                {allAbilitiesEmpty && (
                  <p className={styles.container_text}>No abilities</p>
                )}
                {/* {!allAbilitiesEmpty && (
                  <div className={styles.grid}>
                    {pony["Ability #1"] && (
                      <p className={styles.container_text}>
                        Ability #1: {pony["Ability #1"]}
                      </p>
                    )}
                    {pony["Ability #2"] && (
                      <p className={styles.container_text}>
                        Ability #2: {pony["Ability #2"]}
                      </p>
                    )}
                    {pony["Ability #3"] && (
                      <p className={styles.container_text}>
                        Ability #3: {pony["Ability #3"]}
                      </p>
                    )}
                  </div>
                )} */}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.abilities}>
                <h1 className={styles.container_title}>Treats</h1>
                <div className={styles.grid}>
                  {/* {!allTreatsEmpty && (
                    <>
                      <p className={styles.container_text}>
                        Treat #1: {pony["Treat #1"]}{" "}
                        {treat1[0] && treat1[0].roll
                          ? treat1[0].roll
                          : "Not rolled this week"}
                      </p>
                      <p className={styles.container_text}>
                        Treat #2: {pony["Treat #2"]}{" "}
                        {treat2[0] && treat2[0].roll
                          ? treat2[0].roll
                          : "Not rolled this week"}
                      </p>
                      <p className={styles.container_text}>
                        Treat #3: {pony["Treat #3"]}{" "}
                        {treat3[0] && treat3[0].roll ? treat3[0].roll : "✔️ "}
                      </p>
                    </>
                  )} */}
                  {allTreatsEmpty && <p>No treats used</p>}
                  <p className={styles.container_text}>
                    Indigestion: {enginePoints.Indigestion}
                  </p>
                  <p className={styles.container_text}>
                    Indigestion in Previous Race:{" "}
                    {enginePoints["Recent Indigestion"]}
                  </p>
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
                <p>
                  <b>Total Points: {totalPoints}</b>
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.abilities}>
                <h1 className={styles.container_title}>Ranking - Ether Cup</h1>
                <div className={styles.grid}>
                  <p className={styles.container_text}>
                    Race Week #1: {ranking["Race Week #1 Rank"]}
                  </p>
                  <p className={styles.container_text}>
                    Race Week #2: {ranking["Race Week #2 Rank"]}
                  </p>
                  <p className={styles.container_text}>
                    Race Week #3: {ranking["Race Week #3 Rank"]}
                  </p>
                  <p className={styles.container_text}>
                    Race Week #4: {ranking["Race Week #4 Rank"]}
                  </p>
                  <p className={styles.container_text}>
                    Race Week #5: {ranking["Race Week #5 Rank"]}
                  </p>
                  <p className={styles.container_text}>
                    Race Week #6: {ranking["Race Week #6 Rank"]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
