import React from "react";
import { Container, usePixiTicker } from "react-pixi-fiber";
import { tokenMap } from "../sprites/SlotToken";

export type Token = keyof typeof tokenMap;

interface ReelType {
  tokenList: Token[];
  target: number;
  right: number;
  reelHight: number;
  speed: number;
}

const Reel = ({ tokenList, target, right, reelHight, speed }: ReelType) => {
  return (
    <div>
      <Container x={right}></Container>
    </div>
  );
};

export default Reel;
