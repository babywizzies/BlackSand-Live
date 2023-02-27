import React from "react";
import styles from "../../styles/css/paddock.module.css";
import { useAccount } from "wagmi";
import useIsMounted from "../../hooks/useIsMounted";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { TokenMedia, useUserTokens } from "@reservoir0x/reservoir-kit-ui";

const PONY_CONTRACT = "0xf55b615b479482440135ebf1b907fd4c37ed9420";
const BS_MOUNT_CONTRACT = "0xf486f696b80164b5943191236eca114f4efab2ff";

const Paddock = () => {
  const { address } = useAccount();
  const isMounted = useIsMounted();
  const ponyTokensResponse = useUserTokens(address, {
    collection: PONY_CONTRACT,
  });

  const bsTokensResponse = useUserTokens(address, {
    collection: BS_MOUNT_CONTRACT,
  });

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
        <>
          {ponyTokensResponse.data.length > 0 && (
            <>
              <h2>Ponies</h2>
            </>
          )}
          {bsTokensResponse.data.length > 0 && (
            <>
              <h2>Mounts</h2>
              <div className={styles["token-grid"]}>
                {bsTokensResponse.data.map((item, i) => {
                  if (item?.token) {
                    return (
                      <div
                        key={item?.token?.tokenId}
                        style={{
                          border: "1px solid black",
                          width: 200,
                          borderRadius: 8,
                        }}
                      >
                        <TokenMedia
                          token={item?.token as any}
                          style={{ width: 200, height: 200 }}
                        />
                        <p style={{ padding: 8 }}>{item.token.name}</p>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Paddock;
