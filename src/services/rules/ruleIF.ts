import Log from "../types/Log";
import Piece from "../types/Piece";

export default interface ruleIF {
  availableZone(map: Array<Piece>, cur: number, lastLog?: Log): Array<number>;
  move(
    map: Array<Piece>,
    cur: number,
    dst: number,
    lastLog?: Log
  ): Array<Piece>;
}
