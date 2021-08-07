import ruleIF from "./ruleIF";
import { EMPTY_PIECE } from "../types/Piece";
import ErrorMessage from "../types/string";

/*
 0  1  2  3  4  5  6  7
 8  9 10 11 12 13 14 15
16 17 18 19 20 21 22 23
24 25 26 27 28 29 30 31
32 33 34 35 36 *37* 38 39
40 41 42 43 44 45 46 47
48 49 50 51 52 53 54 55
56 57 58 59 60 61 62 63
*/

const knightRule: ruleIF = {
  availableZone: (map, cur) => {
    const p = { x: Math.floor(cur / 8), y: cur % 8 };
    // l: 6, 15, -10, -17
    const movable: [number, number][] = [
      [-1, -2],
      [1, -2],
      [-2, -1],
      [2, -1],
      [-2, 1],
      [2, 1],
      [-1, 2],
      [1, 2],
    ];
    return movable
      .map(([x, y]) => [x + p.x, y + p.y])
      .filter(([x, y]) => 0 <= x && x <= 7 && 0 <= y && y <= 7)
      .map(([x, y]) => x * 8 + y)
      .filter((dst) => map[dst].side !== map[cur].side);
  },
  move: (map, cur, dst) => {
    if (knightRule.availableZone(map, cur).includes(dst)) {
      map[dst] = map[cur];
      map[cur] = EMPTY_PIECE;
    } else throw Error(ErrorMessage.MOVE);

    return map;
  },
};

export default knightRule;

/*
 0  1  2  3  4  5  6  7
 8  9 10 11 12 13 14 15
16 17 18 19 20 21 22 23
24 25 26 27 28 29 30 31
32 33 34 35 36 *37* 38 39
40 41 42 43 44 45 46 47
48 49 50 51 52 53 54 55
56 57 58 59 60 61 62 63
*/
