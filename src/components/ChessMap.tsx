import * as React from "react";
import Chess from "../services/Chess";
import ChessPiece, { ChessPieceProps } from "./ChessPiece";
import styled, { css } from "styled-components";
import SIDE from "../services/types/SIDE";

const initFormat = JSON.stringify({
  map: `rnbqkbnrpppppppp................................PPPPPPPPRNBKQBNR`,

  log: "",
});

interface Props {}

interface States {
  chess: Chess;
  curClicked: number;
  availableZone: number[];
}

class ChessMap extends React.Component<Props, States> {
  state = {
    chess: new Chess(initFormat),
    curClicked: 0,
    availableZone: new Array<number>(),
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

  onClick = (index: number): void => {
    const { chess, curClicked, availableZone } = this.state;
    const map = chess.saveMap();

    if (availableZone.length !== 0) {
      if (availableZone.includes(index)) {
        const isChecked = chess.move(curClicked, index);
        if (isChecked) alert("Checked!!");
      }

      this.setState({ availableZone: [] });
    } else {
      if (chess.getTurn() === map[index].side) {
        this.setState({
          availableZone: chess.availableZone(index),
          curClicked: index,
        });
      } else if (map[index].side !== SIDE.EMPTY) {
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
    const { availableZone } = this.state;
    return <ChessMapBox> {this.displayMap(availableZone)}</ChessMapBox>;
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

export default ChessMap;
