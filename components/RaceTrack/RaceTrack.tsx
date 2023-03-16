import React, { createRef, useCallback, useMemo, useState } from "react";
import styles from "../../styles/css/racetrack.module.css";
import useSWR from "swr";
import RacePortrait from "../RacePortrait";
import { Tooltip } from "react-tooltip";
import useTimeSince from "../../hooks/useTimeSince";
import useAudio from "../../hooks/useAudio";

const RaceTrack = () => {
  useAudio("/audio/race-track.mp3", {
    autoplay: true,
    volume: 0.01,
  });
  const { data } = useSWR(
    "https://blacksand.city/api/blacksand/races/1",
    null,
    {
      refreshInterval: 1000 * 60, //1 minute
    }
  );
  const race = useMemo(() => {
    return data && data[0] ? data[0] : {};
  }, [data]);
  const raceEndTimestamp = useMemo(() => {
    return race.end_time ? new Date(race.end_time).getTime() / 1000 : undefined;
  }, [race]);
  const raceName = race.name || "";

  const positions = useMemo(() => {
    const raceData = race.race_data || [];
    return raceData.sort((a: any, b: any) => {
      const aPoints = a.total_points || 0;
      const bPoints = b.total_points || 0;

      return bPoints - aPoints;
    });
  }, [race.race_data]);
  const countdownTime = useTimeSince(raceEndTimestamp);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Race Track</h1>
      <div className={styles["race-details"]}>
        <h2 className={styles.subtitle}>{raceName}</h2>
        <div className={styles["race-info"]}>
          <p>
            {countdownTime && countdownTime.includes("ago")
              ? "Race Finished"
              : countdownTime}
          </p>
          <p>{positions.length} contestants</p>
        </div>
      </div>
      <div className={styles["leaderboard-table"]}>
        <div className={styles["leaderboard-row-header"]}>
          <div></div>
          <div>Points</div>
          <div>Name</div>
          <div>Rider</div>
          <div>Treat Rolls</div>
        </div>
        {positions.map((position: any) => {
          const treatPoints =
            (position.treat_1_roll || 0) +
            (position.treat_2_roll || 0) +
            (position.treat_3_roll || 0);
          const walletAddress = position.registration.wallet || "";
          return (
            <div
              key={`${position.registration.collection}:${position.registration.id}`}
              className={styles["leaderboard-row"]}
            >
              <RacePortrait
                collectionId={position.registration.collection}
                tokenId={position.registration.id}
              />
              <div
                className="racetrack-tooltip"
                data-tooltip-html={`Event Points: ${position.event_points} <br/> Treat Points: ${treatPoints} <br/> Ability Points: ${position.race_ability_points}`}
              >
                {position.total_points || 0}
              </div>
              <div>{position.registration.pony_name}</div>
              <div
                className="racetrack-tooltip"
                data-tooltip-content={
                  walletAddress.slice(0, 4) + "…" + walletAddress.slice(-4)
                }
              >
                {position.registration.discord_handle}
              </div>
              <div>{position.treat_rolls}</div>
            </div>
          );
        })}
      </div>
      <Tooltip
        anchorSelect=".racetrack-tooltip"
        place="left"
        offset={-4}
        style={{ zIndex: 100000, opacity: 1 }}
      />
    </div>
  );
};

export default RaceTrack;
