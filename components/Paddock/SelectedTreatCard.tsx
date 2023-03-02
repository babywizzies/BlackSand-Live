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
        <div className={styles["selected-treat-details"]}>
          <p style={{ color: "white" }}>x{dieCount}</p>
          {dieSidesImg && (
            <Image src={dieSidesImg} alt="Dice Icon" width={45} height={45} />
          )}
        </div>
      )}
    </div>
  );
};

export default SelectedTreatCard;
