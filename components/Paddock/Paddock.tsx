import React, { useState } from "react";
import styles from "../../styles/css/paddock.module.css";
import { useAccount } from "wagmi";
import useIsMounted from "../../hooks/useIsMounted";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { TokenMedia, useUserTokens } from "@reservoir0x/reservoir-kit-ui";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";

const PONY_CONTRACT = "0xf55b615b479482440135ebf1b907fd4c37ed9420";
const BS_MOUNT_CONTRACT = "0xf486f696b80164b5943191236eca114f4efab2ff";
const ITEM_CONTRACT = "0x7c104b4db94494688027cced1e2ebfb89642c80f";
const COLLECTION_SET_ID =
  "fd9e9cda66f0d8a4b77416c483f5e7be5c8761a043161bd7722fcbf3e3609c8a";

const RACE_ITEMS_RULES = {
  d4: {
    2: ["98", "95", "13", "131", "32", "139", "144"],
    3: ["10", "127"],
  },
  d4_3: {
    1: ["97"],
  },
  d6: {
    1: ["164"],
    2: ["0", "49"],
    3: ["93"],
  },
  d6_2: {
    1: ["134", "136"],
  },
  d6_3: {
    1: ["72", "46"], //Combo
  },
  d8: {
    1: ["172"],
    2: ["128", "114", "96"],
  },
  d12: {
    1: ["28", "40"],
  },
};

const SPECIAL_RACE_ITEMS = Object.values(RACE_ITEMS_RULES)
  .flatMap((die) => Object.values(die))
  .flat();

const Paddock = () => {
  // const { address } = useAccount();
  const address = "0x95ddad467801e292ee9e7f9f040ceb54d5e30439";
  const isMounted = useIsMounted();
  const [selectedRacer, setSelectedRacer] = useState<string | undefined>();
  const { data: tokenData } = useUserTokens(address, {
    collectionsSetId: COLLECTION_SET_ID,
    limit: 200,
  });

  const { data: itemTokenData } = useUserTokens(address, {
    collection: ITEM_CONTRACT,
    limit: 200,
  });

  const ponyTokens = tokenData?.filter(
    (tokenData) => tokenData?.token?.contract === PONY_CONTRACT
  );
  const mountTokens = tokenData?.filter(
    (tokenData) => tokenData?.token?.contract === BS_MOUNT_CONTRACT
  );

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Paddock</h1>
      {!address && (
        <>
          <div className={styles["connect-subtitle"]}>
            Connect your wallet to see the mounts in your paddock
          </div>
          <ConnectButton />
        </>
      )}
      {address && (
        <div style={{ display: "flex", gap: 30 }}>
          <div style={{ borderRight: "1px solid white", paddingRight: 30 }}>
            <h2 className={styles.subtitle}>Racing Selection</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className={styles["selection-pony"]}>
                {!selectedRacer ? (
                  <>
                    <FaPlus />
                    <Image
                      src="/img/pony.png"
                      width={60}
                      height={60}
                      alt="Placeholder"
                    />
                  </>
                ) : (
                  <Image
                    src={`https://api.reservoir.tools/redirect/tokens/${selectedRacer}/image/v1`}
                    alt="Racer"
                    fill
                    loader={({ src }) => src}
                  />
                )}
              </div>
              <div
                style={{ display: "flex", gap: 10, flexDirection: "column" }}
              >
                <div className={styles["selection-placeholder-treat"]}>
                  <FaPlus /> Treat
                </div>
                <div className={styles["selection-placeholder-treat"]}>
                  <FaPlus /> Treat
                </div>
                <div className={styles["selection-placeholder-treat"]}>
                  <FaPlus /> Treat
                </div>
              </div>
            </div>
          </div>
          <div>
            {ponyTokens.length > 0 && (
              <>
                <h2 className={styles.subtitle}>Ponies</h2>
                <div className={styles["token-grid"]}>
                  {ponyTokens.map((item) => {
                    if (item?.token) {
                      return (
                        <div
                          key={item?.token?.tokenId}
                          className={styles["token-card"]}
                        >
                          <TokenMedia token={item?.token as any} />
                          <p className={styles["token-name"]}>
                            {item.token.name}
                          </p>
                          <div className={styles["token-actions"]}>
                            <Link
                              href={`/stables/ponies/${item.token.tokenId}`}
                            >
                              <button className={styles["token-button"]}>
                                View
                              </button>
                            </Link>
                            <Link
                              href={`/stables/ponies/${item.token.tokenId}`}
                            >
                              <button className={styles["token-button"]}>
                                Race
                              </button>
                            </Link>
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </>
            )}
            {mountTokens.length > 0 && (
              <>
                <h2 className={styles.subtitle}>Mounts</h2>
                <div className={styles["token-grid"]}>
                  {mountTokens.map((item) => {
                    if (item?.token) {
                      return (
                        <div
                          key={item?.token?.tokenId}
                          className={styles["token-card"]}
                        >
                          <TokenMedia token={item?.token as any} />
                          <p className={styles["token-name"]}>
                            {item.token.name}
                          </p>
                          <div className={styles["token-actions"]}>
                            <Link href={`/stables/mecha/${item.token.tokenId}`}>
                              <button className={styles["token-button"]}>
                                View
                              </button>
                            </Link>
                            <button
                              className={styles["token-button"]}
                              onClick={() => {
                                setSelectedRacer(
                                  `${item.token?.collection?.id}:${item.token?.tokenId}`
                                );
                              }}
                            >
                              Race
                            </button>
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Paddock;
