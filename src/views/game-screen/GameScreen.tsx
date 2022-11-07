import { useMemo, useState } from "react";
import { genTokenList } from "../../generator/generateTokens";
import { tokenMap } from "../../sprites/SlotToken";
import ReelBoard from "../ReelBoard";

import "./GameScreen.css";

const calcEndingToken = (reel: (keyof typeof tokenMap)[]) =>
  Math.floor(reel.length / 2 + (Math.random() * reel.length) / 2 - 3);

function GameScreen() {
  const reelLen = 50;
  const [reels, setReels] = useState(Array.apply(null, Array(5)).map((e) => genTokenList(reelLen)));
  const spin = () => {
    setReels((prev) => {
      return Array.apply(null, Array(5)).map((e, i) => {
        return [
          reels[i][midHLine[i] - 1],
          reels[i][midHLine[i]],
          reels[i][midHLine[i] + 1],
          ...genTokenList(reelLen).slice(3),
        ];
      });
    });
  };

  const midHLine = useMemo(
    () =>
      Array.apply(null, Array(5)).map((e, i) => calcEndingToken(reels[i])) as [
        number,
        number,
        number,
        number,
        number
      ],
    [reels]
  );

  return (
    <div id="game-container">
      <ReelBoard reels={reels} targetList={midHLine} />
      <div className="fancy-button" onClick={spin}>
        Spin
      </div>
    </div>
  );
}

export default GameScreen;
