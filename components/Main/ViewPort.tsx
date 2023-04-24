import React from "react";
import { Viewport as PixiViewport } from "pixi-viewport";
import { PixiComponent } from "@inlet/react-pixi";
import { useApp } from "@inlet/react-pixi";
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
        if (target && target.id === "bsMap") {
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
      .drag()
      .pinch()
      .wheel()
      .clamp({ direction: "all" })
      .clampZoom({
        minScale: 0.25,
        maxScale: 1.25,
        maxHeight: props.worldHeight,
        maxWidth: props.worldWidth,
      })
      .decelerate();

    viewport.clamp({ direction: "all" });
    viewport
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
