import ruleIF from "./ruleIF";
import { EMPTY_PIECE, isPieceSame } from "../types/Piece";
import ErrorMessage from "../types/string";

const rookRule: ruleIF = {
  availableZone: (map, cur) => {
    var answer: Array<number> = [];

    [-1, 1, -8, 8].forEach((step) => {
      for (var k = cur + step; ; k += step) {
        // out of bound
        if (k < 0 || 63 < k) break;
        if (step === -1 && k % 8 === 7) break;
        if (step === 1 && k % 8 === 0) break;
        // Alias
        else if (map[k].side === map[cur].side) break;
        // empty
        else if (isPieceSame(map[k], EMPTY_PIECE)) answer.push(k);
        // enemy
        else {
          answer.push(k);
          break;
        }
      }
    });

    return answer;
  },
  move: (map, cur, dst) => {
    if (rookRule.availableZone(map, cur).includes(dst)) {
      map[dst] = map[cur];
      map[cur] = EMPTY_PIECE;
    } else throw Error(ErrorMessage.MOVE);

    return map;
  },
};

export default rookRule;
