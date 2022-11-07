import React, { useState } from "react";
import { Container, usePixiTicker } from "react-pixi-fiber/index";
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
  const [st, setSt] = useState({
    baseOffset: -100 * tokenList.length + reelHight,
    targetOffset: target * 100,
    step: (target * 100) / speed,
  });

  return (
    <Container x={right} y={st.baseOffset}>
      {[...tokenList]
        .reverse()
        .map((t, i) =>
          React.createElement(tokenMap[t], { x: 100, y: (i + 1) * 100 - 50, key: t + i })
        )}
    </Container>
  );
};

export default Reel;
