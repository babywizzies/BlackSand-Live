import React, { FC } from "react";
import styles from "../../styles/css/paddock.module.css";
import { TokenMedia, useUserTokens } from "@reservoir0x/reservoir-kit-ui";
import Link from "next/link";

type Token = NonNullable<ReturnType<typeof useUserTokens>["data"]>[0];

type Props = {
  item?: Token;
  setSelectedRacer: (id: string) => void;
};

const TokenCard: FC<Props> = ({ item, setSelectedRacer }) => {
  if (!item || !item.token) {
    return null;
  }

  return (
    <div key={item?.token?.tokenId} className={styles["token-card"]}>
      <TokenMedia
        className={styles["token-image"]}
        token={item?.token as any}
      />
      <p className={styles["token-name"]} title={item.token.name}>
        {item.token.name}
      </p>
      <div className={styles["token-actions"]}>
        <Link href={`/stables/mecha/${item.token.tokenId}`}>
          <button className={styles["token-button"]}>View</button>
        </Link>
        <button
          className={styles["token-button"]}
          onClick={() => {
            setSelectedRacer(
              `${item.token?.collection?.id}:${item.token?.tokenId}`
            );
          }}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default TokenCard;
