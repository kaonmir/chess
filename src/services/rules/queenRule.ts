import ruleIF from "./ruleIF";
import { EMPTY_PIECE } from "../types/Piece";
import ErrorMessage from "../types/string";
import bishopRule from "./bishopRule";
import rookRule from "./rookRule";

const queenRule: ruleIF = {
  availableZone: (map, cur) => [
    ...bishopRule.availableZone(map, cur),
    ...rookRule.availableZone(map, cur),
  ],
  move: (map, cur, dst) => {
    if (queenRule.availableZone(map, cur).includes(dst)) {
      map[dst] = map[cur];
      map[cur] = EMPTY_PIECE;
    } else throw Error(ErrorMessage.MOVE);

    return map;
  },
};

export default queenRule;

/*
 0  1  2  3  4  5  6  7
 8  9 10 11 12 13 14 15
16 17 18 19 20 21 22 23
24 25 26 27 28 29 30 31
32 33 
 */
