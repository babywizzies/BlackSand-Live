import React from "react";
import styles from "styles/css/ponies.module.css";
import { TokenMedia, useTokens } from "@reservoir0x/reservoir-kit-ui";
import useEnsResolver from "../../../hooks/useENSResolver";
import { useRouter } from "next/router";

export default function MechaPony() {
  const router = useRouter();
  const { data: tokenData } = useTokens(
    router.query.id !== undefined
      ? {
          tokens: [
            `0xf486f696b80164b5943191236eca114f4efab2ff:${router.query.id}`,
          ],
        }
      : false
  );

  const token = tokenData[0]?.token;
  const owner = useEnsResolver(token?.owner);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TokenMedia
          token={token}
          style={{ width: 300, borderRadius: 10, height: "auto" }}
        />
        <div className={styles.owner_name}>
          <h1 className={styles.name}>{token?.name}</h1>
          <p className={styles.owner}>Pony Owner: {owner.displayName}</p>
        </div>
      </div>

      <h1 className={styles["container-title"]}>Abilities</h1>
      <div className={styles["card-grid"]}>
        <div className={styles.card}>
          <p className={styles["card-title"]}>!serve:</p>
          <span className={styles["container-text"]}>
            give 2 race points to another random pony, earn 1 race point
            yourself (can be done 1 time per day, max 3 times per race)
          </span>
        </div>
        <div className={styles.card}>
          <p className={styles["card-title"]}>!robocharge:</p>
          <span className={styles["container-text"]}>
            roll 1x D8, outcomes below
          </span>
          <p className={styles["card-example-text"]}>
            1: Engine break! -2 Race points
          </p>
          <p className={styles["card-example-text"]}>
            2-3: Out of steam! Nothing happens, 0 points{" "}
          </p>
          <p className={styles["card-example-text"]}>
            4-5-6-7: Charge! +3 Race points
          </p>
          <p className={styles["card-example-text"]}>
            8: Quantum Crystal shock! +5 Race points
          </p>
        </div>
      </div>
    </div>
  );
}
