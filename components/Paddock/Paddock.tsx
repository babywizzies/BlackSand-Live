/* eslint-disable react/no-unescaped-entities */
import React, { createRef, useCallback, useMemo, useState } from "react";
import styles from "../../styles/css/paddock.module.css";
import { useAccount } from "wagmi";
import useIsMounted from "../../hooks/useIsMounted";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { TokenMedia, useUserTokens } from "@reservoir0x/reservoir-kit-ui";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import TokenCard from "./TokenCard";
import SelectedTreatCard from "./SelectedTreatCard";
import axios from "axios";

export type SelectedTreat = {
  name: string;
  id: string;
  img: string;
};

const PONY_CONTRACT = "0xf55b615b479482440135ebf1b907fd4c37ed9420";
const BS_MOUNT_CONTRACT = "0xf486f696b80164b5943191236eca114f4efab2ff";
const ITEM_CONTRACT = "0x7c104b4db94494688027cced1e2ebfb89642c80f";
const COLLECTION_SET_ID =
  "fd9e9cda66f0d8a4b77416c483f5e7be5c8761a043161bd7722fcbf3e3609c8a";

const SPECIAL_RACE_RULES: Record<
  string,
  { dieSides: number; dieCount: number; max: number; required_item?: number }
> = {
  98: {
    dieSides: 4,
    dieCount: 1,
    max: 2,
  },
  95: {
    dieSides: 4,
    dieCount: 1,
    max: 2,
  },
  13: {
    dieSides: 4,
    dieCount: 1,
    max: 2,
  },
  131: {
    dieSides: 4,
    dieCount: 1,
    max: 2,
  },
  32: {
    dieSides: 4,
    dieCount: 1,
    max: 2,
  },
  139: {
    dieSides: 4,
    dieCount: 1,
    max: 2,
  },
  144: {
    dieSides: 4,
    dieCount: 1,
    max: 2,
  },
  10: {
    dieSides: 4,
    dieCount: 1,
    max: 3,
  },
  127: {
    dieSides: 4,
    dieCount: 1,
    max: 3,
  },
  97: {
    dieSides: 4,
    dieCount: 3,
    max: 1,
  },
  164: {
    dieSides: 6,
    dieCount: 1,
    max: 1,
  },
  0: {
    dieSides: 6,
    dieCount: 1,
    max: 2,
  },
  49: {
    dieSides: 6,
    dieCount: 1,
    max: 2,
  },
  93: {
    dieSides: 6,
    dieCount: 1,
    max: 3,
  },
  134: {
    dieSides: 6,
    dieCount: 2,
    max: 1,
  },
  136: {
    dieSides: 6,
    dieCount: 2,
    max: 1,
  },
  72: {
    dieSides: 6,
    dieCount: 3,
    max: 1,
    required_item: 46,
  },
  46: {
    dieSides: 6,
    dieCount: 3,
    max: 1,
    required_item: 72,
  },
  172: {
    dieSides: 8,
    dieCount: 1,
    max: 1,
  },
  128: {
    dieSides: 8,
    dieCount: 1,
    max: 2,
  },
  114: {
    dieSides: 8,
    dieCount: 1,
    max: 2,
  },
  96: {
    dieSides: 8,
    dieCount: 1,
    max: 2,
  },
  115: {
    dieSides: 8,
    dieCount: 1,
    max: 2,
  },
  28: {
    dieSides: 12,
    dieCount: 1,
    max: 1,
  },
  40: {
    dieSides: 12,
    dieCount: 1,
    max: 1,
  },
};

const DIE_IMGS: Record<string, string> = {
  4: "/img/d4.svg",
  6: "/img/d6.svg",
  8: "/img/d8.svg",
  12: "/img/d12.svg",
};

const SPECIAL_RACE_ITEMS = Object.keys(SPECIAL_RACE_RULES);

const canAddItem = (
  id: string,
  selectedItems: SelectedTreat[],
  totalOwned: number,
  itemsOwned: number[]
) => {
  if (selectedItems.length >= 3) {
    return false;
  }
  const selectedCount = selectedItems.filter((item) => item.id === id);

  if (totalOwned <= selectedCount.length) {
    return false;
  }

  const rules = SPECIAL_RACE_RULES[id];
  if (rules) {
    if (selectedCount.length >= rules.max) {
      return false;
    }

    if (rules.required_item && !itemsOwned.includes(rules.required_item)) {
      return false;
    }

    if (
      rules.required_item &&
      selectedItems.some((item) => Number(item.id) === rules.required_item)
    ) {
      return false;
    }
  }

  return true;
};

const Paddock = () => {
  const poniesRef = createRef<HTMLDivElement>();
  const specialItemsRef = createRef<HTMLHeadingElement>();
  const { address } = useAccount();
  const isMounted = useIsMounted();
  const [selectedRacer, setSelectedRacer] = useState<string | undefined>();
  const [selectedItems, setSelectedItems] = useState<SelectedTreat[]>([]);
  const [discordHandle, setDiscordHandle] = useState("");
  const [errorText, setErrorText] = useState("");
  const { data: tokenData, isLoading: isLoadingTokens } = useUserTokens(
    address,
    {
      collectionsSetId: COLLECTION_SET_ID,
      limit: 200,
    }
  );

  const { data: itemTokenData } = useUserTokens(address, {
    collection: ITEM_CONTRACT,
    limit: 200,
  });

  const specialItems = useMemo(
    () =>
      itemTokenData
        ?.filter((tokenData) =>
          tokenData?.token?.tokenId
            ? SPECIAL_RACE_ITEMS.includes(tokenData?.token?.tokenId)
            : false
        )
        .sort((a, b) => {
          const diceSidesA =
            SPECIAL_RACE_RULES[a?.token?.tokenId || 0].dieSides || 0;
          const diceSidesB =
            SPECIAL_RACE_RULES[b?.token?.tokenId || 0].dieSides || 0;
          return diceSidesB - diceSidesA;
        }),
    [itemTokenData]
  );

  const otherItems = useMemo(
    () =>
      itemTokenData?.filter((tokenData) =>
        tokenData?.token?.tokenId
          ? !SPECIAL_RACE_ITEMS.includes(tokenData?.token?.tokenId)
          : false
      ),
    [itemTokenData]
  );

  const ponyTokens = useMemo(
    () =>
      tokenData?.filter(
        (tokenData) => tokenData?.token?.contract === PONY_CONTRACT
      ),
    [tokenData]
  );
  const mountTokens = useMemo(
    () =>
      tokenData?.filter(
        (tokenData) => tokenData?.token?.contract === BS_MOUNT_CONTRACT
      ),
    [tokenData]
  );

  const scrollToItemSection = useCallback(() => {
    specialItemsRef.current?.scrollIntoView({
      block: "nearest",
      inline: "start",
      behavior: "smooth",
      //@ts-ignore
      alignToTop: false,
    });
  }, [specialItemsRef]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Paddock</h1>
      {!address && (
        <div className={styles["connect-container"]}>
          <div className={styles["connect-subtitle"]}>
            Connect your wallet to see the mounts in your paddock
          </div>
          <ConnectButton />
        </div>
      )}
      {address && (
        <div style={{ display: "flex", gap: 30 }}>
          <div
            style={{
              alignSelf: "flex-start",
              position: "sticky",
              height: "auto",
              top: 70,
            }}
          >
            <h2 className={styles.subtitle}>Racing Selection</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div
                className={styles["selection-pony"]}
                onClick={() => {
                  if (!selectedRacer) {
                    poniesRef.current?.scrollIntoView({
                      block: "nearest",
                      inline: "start",
                      behavior: "smooth",
                      //@ts-ignore
                      alignToTop: false,
                    });
                  }
                }}
              >
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
                    unoptimized
                    loader={({ src }) => src}
                  />
                )}
              </div>
              <div
                style={{ display: "flex", gap: 10, flexDirection: "column" }}
              >
                <SelectedTreatCard
                  treat={selectedItems[0]}
                  dieCount={
                    selectedItems[0]
                      ? SPECIAL_RACE_RULES[selectedItems[0].id]?.dieCount
                      : undefined
                  }
                  dieSidesImg={
                    selectedItems[0]
                      ? DIE_IMGS[
                          SPECIAL_RACE_RULES[selectedItems[0].id]?.dieSides
                        ]
                      : undefined
                  }
                  scrollToItemSection={scrollToItemSection}
                  removeTreat={() => {
                    const items = selectedItems.slice();
                    items.splice(0, 1);
                    setSelectedItems(items);
                  }}
                />
                <SelectedTreatCard
                  treat={selectedItems[1]}
                  dieCount={
                    selectedItems[1]
                      ? SPECIAL_RACE_RULES[selectedItems[1].id]?.dieCount
                      : undefined
                  }
                  dieSidesImg={
                    selectedItems[1]
                      ? DIE_IMGS[
                          SPECIAL_RACE_RULES[selectedItems[1].id]?.dieSides
                        ]
                      : undefined
                  }
                  scrollToItemSection={scrollToItemSection}
                  removeTreat={() => {
                    const items = selectedItems.slice();
                    items.splice(1, 1);
                    setSelectedItems(items);
                  }}
                />
                <SelectedTreatCard
                  treat={selectedItems[2]}
                  dieCount={
                    selectedItems[2]
                      ? SPECIAL_RACE_RULES[selectedItems[2].id]?.dieCount
                      : undefined
                  }
                  dieSidesImg={
                    selectedItems[2]
                      ? DIE_IMGS[
                          SPECIAL_RACE_RULES[selectedItems[2].id]?.dieSides
                        ]
                      : undefined
                  }
                  scrollToItemSection={scrollToItemSection}
                  removeTreat={() => {
                    const items = selectedItems.slice();
                    items.splice(2, 1);
                    setSelectedItems(items);
                  }}
                />
                <input
                  placeholder="Discord Handle"
                  className={styles["discord-handle-input"]}
                  value={discordHandle}
                  onChange={(e) => {
                    setDiscordHandle(e.target.value);
                  }}
                />
                <button
                  className={styles["register-button"]}
                  onClick={() => {
                    setErrorText("");
                    if (!selectedRacer) {
                      setErrorText("Please select a mount or a pony");
                      return;
                    }

                    if (discordHandle.length === 0) {
                      setErrorText("Please enter a discord handle");
                      return;
                    }
                    const racerPieces = selectedRacer.split(":");

                    axios
                      .post("https://blacksand.city/gameengine/register", {
                        id: racerPieces[1],
                        collection: racerPieces[0],
                        discord: discordHandle,
                        wallet: address,
                        treats: selectedItems.map((item) => item.id),
                      })
                      .then(() => {
                        console.log("Success!");
                      })
                      .catch((e) => {
                        setErrorText("Something went wrong, please try again");
                        throw e;
                      });
                  }}
                >
                  Register
                </button>
                <p className={styles["error-text"]}>{errorText}</p>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "relative",
              width: "100%",
              borderLeft: "1px solid white",
              paddingLeft: 30,
            }}
          >
            {isLoadingTokens && (
              <div
                className="loader"
                style={{
                  position: "absolute",
                  zIndex: 1000,
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginTop: 50,
                  inset: 0,
                }}
              ></div>
            )}
            <div ref={poniesRef}></div>
            <h2 className={styles.subtitle}>Ponies</h2>
            {ponyTokens.length > 0 && (
              <div className={styles["token-grid"]}>
                {ponyTokens.map((item, i) => (
                  <TokenCard
                    key={i}
                    item={item}
                    setSelectedRacer={setSelectedRacer}
                  />
                ))}
              </div>
            )}
            {ponyTokens.length <= 0 && !isLoadingTokens && (
              <div className={styles["token-grid-empty"]}>
                <p
                  style={{
                    color: "white",
                  }}
                >
                  Looks like you don't have any ponies
                </p>
                <a
                  href={`https://forgotten.market/${PONY_CONTRACT}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button>Get a Pony</button>
                </a>
              </div>
            )}
            <h2 className={styles.subtitle}>Mounts</h2>
            <div className={styles["token-grid"]}>
              {mountTokens.map((item, i) => (
                <TokenCard
                  key={i}
                  item={item}
                  setSelectedRacer={setSelectedRacer}
                />
              ))}
            </div>
            {mountTokens.length <= 0 && !isLoadingTokens && (
              <div className={styles["token-grid-empty"]}>
                <p
                  style={{
                    color: "white",
                  }}
                >
                  Looks like you don't have any mounts
                </p>
                <Link href="/mint" legacyBehavior>
                  <button>Get a Mount</button>
                </Link>
              </div>
            )}
            <h2 ref={specialItemsRef} className={styles.subtitle}>
              Special Treats
            </h2>
            <div className={styles["treat-grid"]}>
              {specialItems.map((item) => {
                if (item?.token && item?.token?.tokenId) {
                  const canAdd = canAddItem(
                    item.token.tokenId,
                    selectedItems,
                    Number(item.ownership?.tokenCount || 1),
                    specialItems.map((item) => Number(item?.token?.tokenId))
                  );

                  return (
                    <div
                      key={item?.token?.tokenId}
                      className={styles["treat-card"]}
                      style={
                        !canAdd
                          ? {
                              filter: "grayscale(1)",
                              opacity: 0.7,
                            }
                          : {}
                      }
                    >
                      <TokenMedia
                        token={item?.token as any}
                        className={styles["token-image"]}
                      />
                      <div className={styles["token-title"]}>
                        <p
                          className={styles["token-name"]}
                          title={item.token.name}
                        >
                          {item.token.name}
                        </p>
                        <span className={styles["token-quantity"]}>
                          {`x${item.ownership?.tokenCount}`}
                        </span>
                      </div>
                      <div className={styles["token-actions"]}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <p style={{ color: "white" }}>
                            x{SPECIAL_RACE_RULES[item.token.tokenId].dieCount}
                          </p>
                          <Image
                            src={
                              DIE_IMGS[
                                SPECIAL_RACE_RULES[item.token.tokenId].dieSides
                              ]
                            }
                            alt="Dice Icon"
                            width={45}
                            height={45}
                          />
                        </div>
                        <p style={{ color: "white" }}>
                          Max: {SPECIAL_RACE_RULES[item.token.tokenId].max}
                        </p>
                        <button
                          className={styles["token-button"]}
                          onClick={() => {
                            if (!item.token || !item.token.tokenId) {
                              return;
                            }
                            const canAdd = canAddItem(
                              item.token.tokenId,
                              selectedItems,
                              Number(item.ownership?.tokenCount || 1),
                              specialItems.map((item) =>
                                Number(item?.token?.tokenId)
                              )
                            );
                            if (canAdd) {
                              setSelectedItems([
                                ...selectedItems,
                                {
                                  id: item.token.tokenId as string,
                                  name: item.token.name as string,
                                  img: item.token.image as string,
                                },
                              ]);
                            }
                          }}
                        >
                          Stow
                        </button>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
            {specialItems.length <= 0 && !isLoadingTokens && (
              <div className={styles["token-grid-empty"]}>
                <p
                  style={{
                    color: "white",
                  }}
                >
                  Looks like you don't have any special treats
                </p>
                <a
                  href={`https://forgotten.market/${ITEM_CONTRACT}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button>Get Special Treats</button>
                </a>
              </div>
            )}
            <h2 className={styles.subtitle}>Treats</h2>
            <div className={styles["treat-grid"]}>
              {otherItems.map((item) => {
                if (item?.token && item.token.tokenId) {
                  const canAdd = canAddItem(
                    item.token.tokenId,
                    selectedItems,
                    Number(item.ownership?.tokenCount || 1),
                    otherItems.map((item) => Number(item?.token?.tokenId))
                  );
                  return (
                    <div
                      key={item?.token?.tokenId}
                      className={styles["treat-card"]}
                      style={
                        !canAdd
                          ? {
                              filter: "grayscale(1)",
                              opacity: 0.7,
                            }
                          : {}
                      }
                    >
                      <TokenMedia
                        token={item?.token as any}
                        className={styles["token-image"]}
                      />
                      <div className={styles["token-title"]}>
                        <p
                          className={styles["token-name"]}
                          title={item.token.name}
                        >
                          {item.token.name}
                        </p>
                        <span className={styles["token-quantity"]}>
                          {`x${item.ownership?.tokenCount}`}
                        </span>
                      </div>
                      <div className={styles["token-actions"]}>
                        <button
                          className={styles["token-button"]}
                          onClick={() => {
                            if (!item.token || !item.token?.tokenId) {
                              return;
                            }

                            const canAdd = canAddItem(
                              item.token?.tokenId,
                              selectedItems,
                              Number(item.ownership?.tokenCount || 1),
                              otherItems.map((item) =>
                                Number(item?.token?.tokenId)
                              )
                            );
                            if (canAdd) {
                              setSelectedItems([
                                ...selectedItems,
                                {
                                  id: item.token.tokenId as string,
                                  name: item.token.name as string,
                                  img: item.token.image as string,
                                },
                              ]);
                            }
                          }}
                        >
                          Stow
                        </button>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
            {otherItems.length <= 0 && !isLoadingTokens && (
              <div className={styles["token-grid-empty"]}>
                <p
                  style={{
                    color: "white",
                  }}
                >
                  Looks like you don't have any treats
                </p>
                <a
                  href={`https://forgotten.market/${ITEM_CONTRACT}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button>Get Treats</button>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Paddock;
