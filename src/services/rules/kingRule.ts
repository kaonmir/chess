import ruleIF from "./ruleIF";
import { EMPTY_PIECE } from "../types/Piece";
import ErrorMessage from "../types/string";

const kingRule: ruleIF = {
  availableZone: (map, cur) => {
    const steps = [-9, -8, -7, -1, 1, 7, 8, 9];
    return steps
      .map((step) => step + cur)
      .filter((dst) => 0 <= dst && dst < 64) // out of bound
      .filter((dst) => map[cur].side !== map[dst].side); // empty or enemy
  },
  move: (map, cur, dst) => {
    if (kingRule.availableZone(map, cur).includes(dst)) {
      map[dst] = map[cur];
      map[cur] = EMPTY_PIECE;
    } else throw Error(ErrorMessage.MOVE);

    return map;
  },
};

export default kingRule;
