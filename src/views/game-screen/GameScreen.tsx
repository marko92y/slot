import { useMemo, useState, useEffect } from "react";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { genTokenList } from "../../generator/generateTokens";
import { tokenMap } from "../../sprites/SlotToken";
import ReelBoard from "../ReelBoard";
import { betLost, betWon, placeBet } from "../../store/potReducer";

import "./GameScreen.css";

const calcEndingToken = (reel: (keyof typeof tokenMap)[]) =>
  Math.floor(reel.length / 2 + (Math.random() * reel.length) / 2 - 3);

const calcWinStatus = (
  reels: (keyof typeof tokenMap)[][],
  line: [number, number, number, number, number]
) => {
  const winnings: Record<string, number> = {};
  line
    .map((e, i) => {
      return reels[i][e];
    })
    .forEach((e) => {
      winnings[e] ? winnings[e]++ : (winnings[e] = 1);
    });
  const winningsArr = Object.entries(winnings);
  return winningsArr.slice(1).reduce((acc, e) => (e[1] > acc[1] ? e : acc), winningsArr[0]);
};

function GameScreen() {
  const reelLen = 50;
  const [reels, setReels] = useState(Array.apply(null, Array(5)).map((e) => genTokenList(7)));
  const [midHLine, setMidHLine] = useState<[number, number, number, number, number]>([
    2, 2, 2, 2, 2,
  ]);
  const [winMessage, setWinMessage] = useState("Ready to start.");
  const winStatus = useMemo(() => calcWinStatus(reels, midHLine), [reels, midHLine]);
  const [spinning, setSpinning] = useState(true);
  const [balance, bet] = useSelector<RootState, [number, number]>((state) => [
    state.pot.balance,
    state.pot.bet,
  ]);

  const dispatch = useDispatch();

  const spin = () => {
    setSpinning(true);
    window.setTimeout(() => setSpinning(false), 11000);
    setWinMessage("Spinning...");
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

  useEffect(() => {
    setMidHLine(
      Array.apply(null, Array(5)).map((e, i) => calcEndingToken(reels[i])) as [
        number,
        number,
        number,
        number,
        number
      ]
    );
  }, [reels]);

  useEffect(() => {
    if (!spinning) {
      setWinMessage(
        winStatus[1] > 2 ? `You won ${winStatus[1]} ${winStatus[0]}s!` : "Better luck next time"
      );
      if (winStatus[1] > 2) {
        dispatch(betWon(bet * (winStatus[1] - 1)));
      } else {
        dispatch(betLost());
      }
    }
  }, [spinning]);

  return (
    <div id="game-container">
      <div id="game-title">
        <h1>SpinnySpinner</h1>
        <div>CASH {balance}$</div>
      </div>

      <div id="reel-board">
        <ReelBoard reels={reels} targetList={midHLine}></ReelBoard>
        <div className="message-diaplay">
          <div>Bet {bet}$</div> <div>{winMessage}</div>
        </div>
      </div>

      <div id="game-controls">
        <div className="fancy-button" onClick={spin}>
          Spin
        </div>

        <div className="fancy-button" onClick={() => dispatch(placeBet(1))}>
          1$
        </div>
        <div className="fancy-button" onClick={() => dispatch(placeBet(5))}>
          5$
        </div>
        <div className="fancy-button" onClick={() => dispatch(placeBet(10))}>
          10$
        </div>
      </div>
    </div>
  );
}

export default GameScreen;
