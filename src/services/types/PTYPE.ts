const PTYPE = {
  King: "k",
  Queen: "q",
  Bishop: "b",
  Knight: "n",
  Rook: "r",
  Pawn: "p",
  EMPTY: ".",
} as const;
type PTYPE = typeof PTYPE[keyof typeof PTYPE];

export default PTYPE;
