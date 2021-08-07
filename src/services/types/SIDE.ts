const SIDE = {
  WHITE: 0,
  BLACK: 1,
  EMPTY: 2,
} as const;

type SIDE = typeof SIDE[keyof typeof SIDE];

export default SIDE;

export const isEnemySide = (A: SIDE, B: SIDE): Boolean => {
  if (A === SIDE.WHITE && B === SIDE.BLACK) return true;
  else if (A === SIDE.BLACK && B === SIDE.WHITE) return true;
  else return false;
};
