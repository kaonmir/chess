import * as React from "react";
import styled, { css } from "styled-components";

import Piece from "../services/types/Piece";
import PTYPE from "../services/types/PTYPE";
import SIDE from "../services/types/SIDE";

export interface PopupPromotionProps {
  result: (ptype: PTYPE) => void;
}

const PopupPromotion: React.FunctionComponent<PopupPromotionProps> = ({
  result,
}) => {
  return (
    <PopupPromotionBox>
      안뇽!!
      <button onClick={() => result(PTYPE.Bishop)}>이거 눌러!</button>
    </PopupPromotionBox>
  );
};

const PopupPromotionBox = styled.div`
  width: 500px;
  height: 300px;
`;
export default PopupPromotion;
