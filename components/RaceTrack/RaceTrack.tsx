import React, { useMemo } from "react";
import styles from "../../styles/css/racetrack.module.css";
import useSWR from "swr";
import RacePortrait from "../RacePortrait";
import { Tooltip } from "react-tooltip";
import useTimeSince from "../../hooks/useTimeSince";
import useAudio from "../../hooks/useAudio";
import Image from "next/image";
import dayjs from "dayjs";

const RaceTrack = () => {
  useAudio("/audio/race-track.mp3", {
    autoplay: true,
    volume: 0.09,
    loop: true,
  });
  const { data } = useSWR(
    "https://blacksand.city/api/blacksand/races/2",
    null,
    {
      refreshInterval: 1000 * 60, //1 minute
    }
  );
  const race = useMemo(() => {
    return data && data[0] ? data[0] : {};
  }, [data]);
  const raceStartTimestamp = useMemo(() => {
    return race.end_time
      ? new Date(`${race.start_time}Z`).getTime() / 1000
      : undefined;
  }, [race]);
  const raceStarted = useMemo(() => {
    if (raceStartTimestamp) {
      const now = dayjs();
      const startTime = dayjs.unix(raceStartTimestamp);
      return !startTime.isAfter(now);
    }
    return false;
  }, [raceStartTimestamp]);
  const raceEndTimestamp = useMemo(() => {
    return race.end_time
      ? new Date(`${race.end_time}Z`).getTime() / 1000
      : undefined;
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
  const countdownStart = useTimeSince(raceStartTimestamp);
  const countdownEnd = useTimeSince(raceEndTimestamp);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Race Track</h1>
      <div className={styles["race-details"]}>
        <h2 className={styles.subtitle}>{raceName}</h2>
        <div className={styles["race-info"]}>
          {race && raceStarted && (
            <p>
              {countdownEnd && countdownEnd.includes("ago")
                ? "Race Finished"
                : `Ends ${countdownEnd}`}
            </p>
          )}
          {race && !raceStarted && <p>Race starts {countdownStart}</p>}
          <p>{positions.length} contestants</p>
        </div>
      </div>
      {positions && positions.length > 0 && (
        <div className={styles["leaderboard-table"]}>
          <div className={styles["leaderboard-row-header"]}>
            <div></div>
            <div>Points</div>
            <div>Name</div>
            <div>Rider</div>
            <div>Treats</div>
          </div>
          {positions.map((position: any, i: number) => {
            const treatPoints =
              (position.treat_1_roll || 0) +
              (position.treat_2_roll || 0) +
              (position.treat_3_roll || 0);
            const walletAddress = position.registration.wallet || "";
            const treats: { roll: number; id: string }[] = position.registration
              .treats
              ? position.registration.treats.map((id: number, i: number) => {
                  return {
                    roll: position[`treat_${i + 1}_roll`],
                    id,
                  };
                })
              : [];
            return (
              <div
                key={`${position.registration.collection}:${position.registration.id}`}
                className={styles["leaderboard-row"]}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                  className={position.indigestion ? "racetrack-tooltip" : ""}
                  data-tooltip-content={
                    position.indigestion ? "Indigestion" : undefined
                  }
                >
                  <div style={{ flexShrink: 0 }}>#{i + 1}</div>
                  <RacePortrait
                    collectionId={position.registration.collection}
                    tokenId={position.registration.id}
                    hasIndigestion={position.indigestion}
                  />
                </div>
                <div
                  className="racetrack-tooltip"
                  data-tooltip-html={`<b>Event Points:</b> ${position.event_points} <br/> <b>Treat Points:</b> ${treatPoints} <br/> <b>Ability Points:</b> ${position.race_ability_points}`}
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
                <div className={styles["treat-cell"]}>
                  {treats.map((treat, i) => (
                    <div key={i} className={styles["treat-container"]}>
                      <div
                        className="racetrack-tooltip"
                        data-tooltip-html={`<b>Treat Points:</b> ${
                          treat.roll > 0 ? treat.roll : "Not Rolled"
                        }`}
                        data-tooltip-place="top"
                      >
                        <div className={styles["treat-image"]}>
                          <Image
                            src={`https://api.reservoir.tools/redirect/tokens/0x7c104b4db94494688027cced1e2ebfb89642c80f:${treat.id}/image/v1`}
                            unoptimized
                            fill
                            alt=""
                            style={{
                              filter: `grayscale(${
                                treat.roll > 0 ? "0" : "1"
                              })`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
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
