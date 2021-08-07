import Chess from "../src/services/Chess";
import Piece from "../src/services/types/Piece";

test("sadf", () => {
  expect(0).toBe(0);
});

const input = {
  map: `
  n.....k.
  ........
  ........
  .......K
  .....Nn.
  ........
  ......NN
  ........
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

describe("Knight for each cases", () => {
  test("Knight available zone", () => {
    expect(chess.availableZone(0)).toEqual([10, 17]);
    expect(chess.availableZone(37)).toEqual([20, 22, 27, 43, 47, 52]);
    expect(chess.availableZone(38)).toEqual([21, 23, 28, 44, 53, 55]);
  });
  test("Knight move test 1", () => {
    const resultMap = `
      ......k.
      ..n.....
      ........
      .......K
      .....NN.
      ........
      ......N.
      ........`;
    chess.move(55, 38);
    chess.move(0, 10);
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
32 33 34 35 36 37 38 39
40 41 42 43 44 45 46 47
48 49 50 51 52 53 54 55
56 57 58 59 60 61 62 63
*/
