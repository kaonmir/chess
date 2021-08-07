import ruleIF from "./ruleIF";
import { EMPTY_PIECE, isEmptyPiece } from "../types/Piece";
import SIDE from "../types/SIDE";
import ErrorMessage from "../types/string";
import { isEnemy } from "../types/Piece";

const pawnRule: ruleIF = {
  availableZone: (map, cur) => {
    const steps: { [id: number]: Array<number> } = {
      [SIDE.BLACK]: [8, 16, 7, 9], // F, L, R
      [SIDE.WHITE]: [-8, -16, -9, -7], // F, L, R
    };
    const initPosition: { [id: number]: number } = {
      [SIDE.BLACK]: 1,
      [SIDE.WHITE]: 6,
    };

    const side = map[cur].side;

    return steps[side]
      .map((step) => step + cur)
      .filter((dst, idx, dsts) => {
        if (idx === 0) return isEmptyPiece(map[dst]);
        if (idx === 1 && Math.floor(cur / 8) === initPosition[side])
          return isEmptyPiece(map[dsts[idx - 1]]) && isEmptyPiece(map[dst]);

        if (idx === 2 && dst % 8 === 7) return false;
        if (idx === 3 && dst % 8 === 0) return false;

        return isEnemy(map[cur], map[dst]);
      });
  },

  move: (map, cur, dst) => {
    if (pawnRule.availableZone(map, cur).includes(dst)) {
      map[dst] = map[cur];
      map[cur] = EMPTY_PIECE;
    } else throw Error(ErrorMessage.MOVE);

    return map;
  },
};

export default pawnRule;

/*
 0  1  2  3  4  5  6  7
 8  9 10 11 12 13 14 15
16 17 18 19 20 21 22 23
24 25 26 27 28 29 30 31
32 33 
 */
