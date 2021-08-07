import Chess from "../src/services/Chess";
import Piece, { EMPTY_PIECE } from "../src/services/types/Piece";
import PTYPE from "../src/services/types/PTYPE";
import SIDE from "../src/services/types/SIDE";

test("sadf", () => {
  expect(0).toBe(0);
});

const input = {
  map: `
  rnbqkbnr
  pppppppp
  ........
  ........
  ........
  ........
  PPPPPPPP
  RNBKQBNR
  `,
  log: "",
};

var chess: Chess;
var legacyMap: Array<Piece>;

beforeAll(() => {
  chess = new Chess(JSON.stringify(input));
  legacyMap = chess.saveMap();
});
beforeEach(() => chess.loadMapFromMap(legacyMap));

test("Check if parseMap can make a string to array", () => {
  const outputMap = chess.parseMap(input.map);
  expect(outputMap).toHaveLength(64);
  expect(outputMap[0]).toEqual({ ptype: PTYPE.Rook, side: SIDE.BLACK });
  expect(outputMap[30]).toEqual(EMPTY_PIECE);
  expect(outputMap[63]).toEqual({ ptype: PTYPE.Rook, side: SIDE.WHITE });
});

/*
rnbqkbnr
pppppppp
*/
