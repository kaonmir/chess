import ruleIF from "./ruleIF";
import { EMPTY_PIECE } from "../types/Piece";
import ErrorMessage from "../types/string";

const kingRule: ruleIF = {
  availableZone: (map, cur) => {
    const p = { x: Math.floor(cur / 8), y: cur % 8 };
    const movable: [number, number][] = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    return movable
      .map(([x, y]) => [x + p.x, y + p.y])
      .filter(([x, y]) => 0 <= x && x <= 7 && 0 <= y && y <= 7)
      .map(([x, y]) => x * 8 + y)
      .filter((dst) => map[dst].side !== map[cur].side);
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
