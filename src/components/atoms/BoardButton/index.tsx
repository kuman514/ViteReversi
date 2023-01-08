import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { BORDER_MAX, BORDER_MIN } from '^/constants';
import useStatus from '^/store';
import { Who } from '^/types';

interface Props {
  row: number;
  col: number;
}

const Root = styled.button`
  all: unset;

  border-bottom: 1px solid black;
  border-right: 1px solid black;

  font-size: 5vmin;

  text-align: center;

  cursor: pointer;

  &:hover {
    background-color: black;
  }
`;

const BoardButton: FC<Props> = ({ row, col }) => {
  if (row < BORDER_MIN || row > BORDER_MAX || col < BORDER_MIN || col > BORDER_MAX) {
    throw Error('Out of border range');
  }

  const isThisAvailable = useStatus((status) => status.gameStatus.isAvailable[row][col]);
  const putPiece = useStatus((status) => status.putPiece);
  const currentPiece: Who = useStatus((status) => status.gameStatus.boardStatus[row][col]);

  const handleOnClick: () => void = () => {
    if (!isThisAvailable) {
      return;
    }

    putPiece({ row, col });
  };

  const iconToBeRendered: ReactNode = (() => {
    switch (currentPiece) {
      case Who.PLAYER_1:
        return '⚫';
      case Who.PLAYER_2:
        return '⚪';
      default:
        return isThisAvailable ? '✔' : undefined;
    }
  })();

  return (
    <Root
      disabled={!isThisAvailable}
      onClick={handleOnClick}
    >
      {iconToBeRendered}
    </Root>
  );
};

export default BoardButton;
