import React from "react";
import { Stage } from "react-pixi-fiber/index.js";

const options = {
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio,
  width: 700,
  height: 300,
  antialias: true,
  autoDensity: true,
};

const style = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const RealBoard = () => {
  return (
    <Stage options={options} style={style}>
      RealBoard
    </Stage>
  );
};

export default RealBoard;
