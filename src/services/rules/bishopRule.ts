import ruleIF from "./ruleIF";
import { EMPTY_PIECE, isPieceSame } from "../types/Piece";
import ErrorMessage from "../types/string";

const bishopRule: ruleIF = {
  availableZone: (map, cur) => {
    var answer: Array<number> = [];

    [
      [-9, 7], // LU
      [-7, 0], // RU
      [7, 7], // LD
      [9, 0], // RD
    ].forEach(([step, bound]) => {
      for (var k = cur + step; ; k += step) {
        // out of bound
        if (k < 0 || 63 < k || k % 8 === bound) break;
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
    if (bishopRule.availableZone(map, cur).includes(dst)) {
      map[dst] = map[cur];
      map[cur] = EMPTY_PIECE;
    } else throw Error(ErrorMessage.MOVE);

    return map;
  },
};

export default bishopRule;

/*
 0  1  2  3  4  5  6  7
 8  9 10 11 12 13 14 15
16 17 18 19 20 21 22 23
24 25 26 27 28 29 30 31
32 33 
 */
