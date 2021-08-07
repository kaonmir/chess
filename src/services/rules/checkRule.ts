import Piece, { EMPTY_PIECE } from "../types/Piece";
import ruleBook from "./ruleBook";
import { isEnemy } from "../types/Piece";
import SIDE from "../types/SIDE";
import PTYPE from "../types/PTYPE";
import { isPieceSame } from "../types/Piece";

const checkRule = {
  isAvailable(map: Array<Piece>, cur: number, dst: number) {
    // TODO: 체크가 나 있을 때 엉뚱한 기물을 움직일 수 없도록 조치해야 한다.
    // TODO: 만약 기물을 움직였을 때 상대의 체크가 난다면 옴직일 수 없다.
    // SOLVE: 움직였을 때 아무런 체크가 없으면 된다
    const copyMap: Array<Piece> = JSON.parse(JSON.stringify(map));
    copyMap[dst] = copyMap[cur];
    copyMap[cur] = EMPTY_PIECE;

    return !this.isChecked(copyMap, copyMap[dst].side);
  },

  isChecked(map: Array<Piece>, side: SIDE) {
    const curKing = map.findIndex((piece) =>
      isPieceSame(piece, { ptype: PTYPE.King, side })
    );
    return map.some((piece, cur) => {
      if (piece !== EMPTY_PIECE && isEnemy(piece, map[curKing])) {
        const availableZones = ruleBook[piece.ptype].map((rule) =>
          rule.availableZone(map, cur)
        );

        return availableZones.some((availableZone) =>
          availableZone.includes(curKing)
        );
      }
    });
  },
};

export default checkRule;
