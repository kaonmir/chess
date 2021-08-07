import Chess from "../src/services/Chess";
import Piece from "../src/services/types/Piece";

test("sadf", () => {
  expect(0).toBe(0);
});

const input = {
  map: `
  pppppppp
  ........
  ........
  ....k..K
  ........
  ........
  ........
  PPPPPPPP
  `,
  log: "56 48 0 8 57 49 1 9 58 50 2 10 59 51 3 11",
};

var chess: Chess;
var legacyMap: Array<Piece>;

beforeAll(() => {
  chess = new Chess(JSON.stringify(input));
  legacyMap = chess.saveMap();
});
beforeEach(() => chess.loadMapFromMap(legacyMap));

describe("Log working test", () => {
  test("Log test 1", () => {
    const resultMap = `
      ....pppp
      pppp....
      ........
      ....k..K
      ........
      ........
      PPPP....
      ....PPPP
    `;

    expect(chess.saveMapToString()).toEqual(
      resultMap.replaceAll(/\r?\n|\r|\n| /g, "")
    );
  });
});

/*
 0  1  2  3  4  5  6  7
 8  9 10 11 12 13 14 15
16 17 18 19 20 21 22 23
24 25 26 27 28 29 30 31
32 33 34 35 36 *37* 38 39
40 41 42 43 44 45 46 47
48 49 50 51 52 53 54 55
56 57 58 59 60 61 62 63
*/
