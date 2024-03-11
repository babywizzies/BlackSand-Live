import React from "react";
import { Viewport as PixiViewport } from "pixi-viewport";
import { PixiComponent } from "@pixi/react";
import { useApp } from "@pixi/react";
import { EventSystem, Application } from "pixi.js";

interface Props {
  children: React.ReactNode;
  screenWidth: number;
  screenHeight: number;
  worldWidth: number;
  worldHeight: number;
}

const Viewport = (props: Props) => {
  const app = useApp();
  return <PixiComponentViewport app={app} {...props} />;
};

interface PixiComponentProps {
  app: Application;
}

const PixiComponentViewport = PixiComponent("Viewport", {
  create: (props: PixiComponentProps & Props) => {
    if (!("events" in props.app.renderer)) {
      //@ts-ignore
      props.app.renderer.addSystem(EventSystem, "events");
    }

    document.addEventListener(
      "wheel",
      (e) => {
        const target = e.target as Element;
        if (target && target.id === "burnStage") {
          e?.preventDefault();
          e?.stopPropagation();
        }
      },
      {
        passive: false,
      }
    );

    const viewport = new PixiViewport({
      screenWidth: props.screenWidth,
      screenHeight: props.screenHeight,
      worldWidth: props.worldWidth,
      worldHeight: props.worldHeight,
      ticker: props.app.ticker,
      events: props.app.renderer.events,
      //@ts-ignore
      interaction: props.app.renderer.plugins.interaction,
      // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });

    viewport
      //.drag()
      //.pinch()
      //.wheel()
      .clamp({ direction: "all" })
      .clampZoom({
        minScale: 1,
        maxScale: 1,
        minHeight: 300,
        minWidth: 300,
        maxHeight: props.worldHeight,
        maxWidth: props.worldWidth,
      })
      .decelerate()
      .clamp({ direction: "all" })
      .moveCenter(props.worldWidth / 2, props.worldHeight / 2)
      .setZoom(0.5, true);

    return viewport;
  },
  applyProps: (instance, oldProps, newProps) => {
    console.log("applyProps");
  },
  didMount: () => {
    console.log("didMount");
  },
  willUnmount: () => {
    console.log("willUnmount");
  },
});
export default Viewport;
