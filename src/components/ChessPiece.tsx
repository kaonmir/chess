import * as React from "react";
import styled, { css } from "styled-components";

import Piece from "../services/types/Piece";
import PTYPE from "../services/types/PTYPE";
import SIDE from "../services/types/SIDE";

import { ReactComponent as BISHOP_BLACK } from "../assets/bishop_black.svg";
import { ReactComponent as KING_BLACK } from "../assets/king_black.svg";
import { ReactComponent as KNIGHT_BLACK } from "../assets/knight_black.svg";
import { ReactComponent as PAWN_BLACK } from "../assets/pawn_black.svg";
import { ReactComponent as QUEEN_BLACK } from "../assets/queen_black.svg";
import { ReactComponent as ROOK_BLACK } from "../assets/rook_black.svg";

import { ReactComponent as BISHOP_WHITE } from "../assets/bishop_white.svg";
import { ReactComponent as KING_WHITE } from "../assets/king_white.svg";
import { ReactComponent as KNIGHT_WHITE } from "../assets/knight_white.svg";
import { ReactComponent as PAWN_WHITE } from "../assets/pawn_white.svg";
import { ReactComponent as QUEEN_WHITE } from "../assets/queen_white.svg";
import { ReactComponent as ROOK_WHITE } from "../assets/rook_white.svg";

import { ReactComponent as NOTHING } from "../assets/nothing.svg";
import { ReactComponent as AVAILABLE_SVG } from "../assets/Available.svg";

const images: {
  [id: number]: {
    [type: string]: React.ReactElement;
  };
} = {
  [SIDE.BLACK]: {
    [PTYPE.Bishop]: <BISHOP_BLACK />,
    [PTYPE.King]: <KING_BLACK />,
    [PTYPE.Knight]: <KNIGHT_BLACK />,
    [PTYPE.Pawn]: <PAWN_BLACK />,
    [PTYPE.Queen]: <QUEEN_BLACK />,
    [PTYPE.Rook]: <ROOK_BLACK />,
    [PTYPE.EMPTY]: <NOTHING />,
  },
  [SIDE.WHITE]: {
    [PTYPE.Bishop]: <BISHOP_WHITE />,
    [PTYPE.King]: <KING_WHITE />,
    [PTYPE.Knight]: <KNIGHT_WHITE />,
    [PTYPE.Pawn]: <PAWN_WHITE />,
    [PTYPE.Queen]: <QUEEN_WHITE />,
    [PTYPE.Rook]: <ROOK_WHITE />,
    [PTYPE.EMPTY]: <NOTHING />,
  },
  [SIDE.EMPTY]: {
    [PTYPE.EMPTY]: <NOTHING />,
  },
};

export interface ChessPieceProps {
  index: number;
  background: Boolean;
  isAvailable: Boolean;
  piece: Piece;
  onClick: (index: number) => void;
}

const ChessPiece: React.FunctionComponent<ChessPieceProps> = ({
  index,
  background,
  piece,
  isAvailable,
  onClick,
}) => {
  var image = images[piece.side][piece.ptype];

  return (
    <ChessPieceBox background={background} onClick={() => onClick(index)}>
      <ChessPieceIcon>{image}</ChessPieceIcon>
      {isAvailable && (
        <ChessAvailable>
          <AVAILABLE_SVG />
        </ChessAvailable>
      )}
    </ChessPieceBox>
  );
};

interface ChessPieceBoxProps {
  background: Boolean;
}

const ChessPieceBox = styled.div<ChessPieceBoxProps>`
  position: relative;
  background-color: ${({ background }) => (background ? "gray" : "red")};
`;

const ChessPieceIcon = styled.div`
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const ChessAvailable = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

export default ChessPiece;
