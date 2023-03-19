import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const Modal: FC<PropsWithChildren & Props> = ({ children, open, setOpen }) => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        display: "flex",
        alignItems: "flex-start",
        margin: 10,
        visibility: open ? "visible" : "hidden",
        transition: open ? "" : "visibility 0 ease-in 200ms",
      }}
    >
      <div
        style={{
          display: "flex",
          border: "1px solid white",
          flexDirection: "column",
          borderRadius: 8,
          background: "black",
          margin: "0 auto",
          width: "auto",
          minWidth: 400,
          minHeight: 200,
          marginTop: 40,
          padding: 16,
          maxWidth: 500,
          zIndex: 2,
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-100px)",
          transition: "all 200ms ease-in",
        }}
      >
        <>
          <button
            style={{
              border: 0,
              position: "absolute",
              top: -6,
              right: -6,
              background: "black",
              height: 16,
              width: 16,
            }}
            onClick={() => {
              setOpen(false);
            }}
          >
            <FaWindowClose color="#fff" fontSize="16" />
          </button>
          {children}
        </>
      </div>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          background: "rgba(0,0,0,0.7)",
          visibility: open ? "visible" : "hidden",
          opacity: open ? 1 : 0,
          transition: open
            ? "opacity 200ms ease-in"
            : "opacity 200ms ease-in, visibility 0 ease-in 200ms",
        }}
        onClick={() => {
          setOpen(false);
        }}
      ></div>
    </div>
  );
};

export default Modal;
