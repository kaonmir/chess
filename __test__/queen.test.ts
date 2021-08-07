import Chess from "../src/services/Chess";
import Piece, { EMPTY_PIECE } from "../src/services/types/Piece";

test("sadf", () => {
  expect(0).toBe(0);
});

const input = {
  map: `
  q.....k.
  ........
  .......K
  ........
  pppppppp
  ........
  ........
  Q...Q..Q
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

describe("available zone for all pieces", () => {
  test("Queen for each cases", () => {
    expect(chess.availableZone(0)).toEqual([
      1, 2, 3, 4, 5, 8, 9, 16, 18, 24, 27,
    ]);

    expect(chess.availableZone(56)).toEqual([
      32, 35, 40, 42, 48, 49, 57, 58, 59,
    ]);
  });
});
