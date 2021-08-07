"use strict";
exports.__esModule = true;
exports.fromStringToPiece = exports.fromPiecetoString = exports.isEnemy = exports.isPieceSame = exports.EMPTY_PIECE = void 0;
var PTYPE_1 = require("./PTYPE");
var SIDE_1 = require("./SIDE");
exports.EMPTY_PIECE = { ptype: PTYPE_1["default"].EMPTY, side: SIDE_1["default"].EMPTY };
exports.isPieceSame = function (A, B) {
    return A.ptype === B.ptype && A.side === B.side;
};
exports.isEnemy = function (A, B) { return SIDE_1.isEnemySide(A.side, B.side); };
exports.fromPiecetoString = function (_a) {
    var ptype = _a.ptype, side = _a.side;
    if (side === SIDE_1["default"].WHITE)
        return ptype.toUpperCase();
    else
        return ptype;
};
exports.fromStringToPiece = function (c) {
    var ptype = c.toLowerCase();
    if (c === PTYPE_1["default"].EMPTY)
        return exports.EMPTY_PIECE;
    else if (c === ptype)
        return { ptype: ptype, side: SIDE_1["default"].BLACK };
    else
        return { ptype: ptype, side: SIDE_1["default"].WHITE };
};
