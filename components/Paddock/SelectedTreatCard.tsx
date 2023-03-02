import Image from "next/image";
import styles from "../../styles/css/paddock.module.css";
import React, { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { SelectedTreat } from "./Paddock";

type Props = {
  treat?: SelectedTreat;
  scrollToItemSection: () => void;
  dieCount?: number;
  dieSidesImg?: string;
};

const SelectedTreatCard: FC<Props> = ({
  treat,
  scrollToItemSection,
  dieCount,
  dieSidesImg,
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
          <Image
            src={treat.img}
            alt="Item"
            fill
            unoptimized
            loader={({ src }) => src}
          />
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
          >
            {treat.name}
          </p>
          {dieCount && dieSidesImg && (
            <div className={styles["selected-treat-details"]}>
              <p style={{ color: "white" }}>x{dieCount}</p>
              <Image src={dieSidesImg} alt="Dice Icon" width={30} height={30} />
            </div>
          )}
          {!dieCount && !dieSidesImg && <p style={{ color: "white" }}>1 Pt</p>}
          <div />
        </div>
      )}
    </div>
  );
};

export default SelectedTreatCard;
