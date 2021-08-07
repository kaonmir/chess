import PTYPE from "./PTYPE";
import SIDE, { isEnemySide } from "./SIDE";

type Piece = { ptype: PTYPE; side: SIDE };

export default Piece;
export const EMPTY_PIECE = { ptype: PTYPE.EMPTY, side: SIDE.EMPTY };
export const isPieceSame = (A: Piece, B: Piece) =>
  A.ptype === B.ptype && A.side === B.side;

export const isEmptyPiece = (A: Piece) => isPieceSame(A, EMPTY_PIECE);
export const isEnemy = (A: Piece, B: Piece) => isEnemySide(A.side, B.side);

export const fromPiecetoString = ({ ptype, side }: Piece): String => {
  if (side === SIDE.WHITE) return ptype.toUpperCase();
  else return ptype;
};

export const fromStringToPiece = (c: String): Piece => {
  const ptype = c.toLowerCase() as PTYPE;
  if (c === PTYPE.EMPTY) return EMPTY_PIECE;
  else if (c === ptype) return { ptype, side: SIDE.BLACK };
  else return { ptype, side: SIDE.WHITE };
};
