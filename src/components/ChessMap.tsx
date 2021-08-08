import * as React from "react";
import Chess from "../services/Chess";
import ChessPiece, { ChessPieceProps } from "./ChessPiece";
import styled, { css } from "styled-components";
import SIDE from "../services/types/SIDE";
import PTYPE from "../services/types/PTYPE";
import Piece from "../services/types/Piece";
import PopupPromotion from "./PopupPromotion";

const initFormat = JSON.stringify({
  // map: `rnbqkbnrpppppppp................................PPPPPPPPRNBKQBNR`,
  map: `rnbqk..........P................................PPPPPPPPRNBKQBNR`,

  log: "",
});

interface Props {}

interface States {
  chess: Chess;
  curPosition: number;
  availableZone: number[];
  isPopup: Boolean;
}

class ChessMap extends React.Component<Props, States> {
  state = {
    chess: new Chess(initFormat),
    curPosition: 0,
    availableZone: new Array<number>(),
    isPopup: false,
  };

  displayMap = (availableZone?: Array<number>): Array<React.ReactElement> => {
    const { chess } = this.state;

    return chess.saveMap().map((piece, index) => {
      const background: Boolean = Math.floor(index / 8) % 2 !== index % 2;
      const isAvailable: Boolean = availableZone
        ? availableZone.includes(index)
        : false;

      const props = {
        index,
        background,
        isAvailable,
        piece,
      };
      return <ChessPiece key={index} onClick={this.onClick} {...props} />;
    });
  };

  promote = async (ptype: PTYPE) => {
    const { curPosition, chess } = this.state;
    chess.promote(curPosition, ptype);
    this.setState({ isPopup: false });
  };

  onClick = (dst: number): void => {
    const { chess, curPosition, availableZone } = this.state;
    const map = chess.saveMap();

    if (availableZone.length !== 0) {
      if (availableZone.includes(dst)) {
        const { isChecked, isPromotable } = chess.move(curPosition, dst);
        if (isChecked) alert("Checked!!");
        if (isPromotable) this.setState({ isPopup: true, curPosition: dst });
      }

      this.setState({ availableZone: [] });
    } else {
      if (chess.getTurn() === map[dst].side) {
        this.setState({
          availableZone: chess.availableZone(dst),
          curPosition: dst,
        });
      } else if (map[dst].side !== SIDE.EMPTY) {
        alert("아직 공격 차례가 되지 않았습니다.");
      }
    }
  };

  componentDidUpdate(_: Props, prevState: States) {
    const endGame = this.state.chess.isEndGame();

    if (endGame === "Checkmate") alert("Checkmate!!");
    else if (endGame === "Stylemate") alert("StyleMate!!");
  }

  render() {
    const { availableZone, isPopup } = this.state;
    return (
      <ChessMapBox>
        {isPopup && (
          <PopupBackgroundBox>
            <PopupPromotion result={this.promote} />
          </PopupBackgroundBox>
        )}
        {this.displayMap(availableZone)}
      </ChessMapBox>
    );
  }
}

const ChessMapBox = styled.div`
  display: inline-grid;
  width: 700px;
  height: 700px;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  grid-gap: 5px;
`;

const PopupBackgroundBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 50%;
  background-color: darkgray;
  z-index: 1;
`;
export default ChessMap;
