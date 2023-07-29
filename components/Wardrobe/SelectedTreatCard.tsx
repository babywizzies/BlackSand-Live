import Image from "next/image";
import styles from "../../styles/css/paddock.module.css";
import React, { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { SelectedTreat } from "./Paddock";

type Props = {
  treat?: SelectedTreat;
  dieCount?: number;
  dieSidesImg?: string;
  scrollToItemSection: () => void;
  removeTreat: () => void;
};

const SelectedTreatCard: FC<Props> = ({
  treat,
  dieCount,
  dieSidesImg,
  scrollToItemSection,
  removeTreat,
}) => {
  return (
    <div className={styles["selection-placeholder-container"]}>
      <div
        className={styles["selection-placeholder-treat"]}
        onClick={() => {
          if (!treat) {
            scrollToItemSection();
          }
        }}
      >
        {treat ? (
          <>
            <button className={styles["remove-button"]} onClick={removeTreat}>
              <AiFillCloseCircle
                style={{ color: "red", width: 20, height: 20 }}
              />
            </button>
            <Image
              style={{
                borderRadius: 8,
              }}
              src={treat.img}
              alt="Item"
              fill
              unoptimized
              loader={({ src }) => src}
            />
          </>
        ) : (
          <>
            <FaPlus /> Treat
          </>
        )}
      </div>
      {treat && (
        <div
          style={{
            display: "flex",
            gap: 5,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <p
            style={{
              color: "white",
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: 80,
            }}
            title={treat.name}
          >
            {treat.name}
          </p>
          <div className={styles["selected-treat-details"]}>
            <p style={{ color: "white" }}>x{dieCount || 1}</p>
            <Image
              src={dieSidesImg || "/img/d2.svg"}
              alt="Dice Icon"
              width={30}
              height={30}
            />
          </div>
          <div />
        </div>
      )}
    </div>
  );
};

export default SelectedTreatCard;
