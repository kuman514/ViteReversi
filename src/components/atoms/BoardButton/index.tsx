import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import {
  boardButtonColor, BORDER_MAX, BORDER_MIN, piece,
} from '^/constants';
import { useGameStore } from '^/store';
import { Who } from '^/types';

const availableIndicator: Record<Who, ReactNode> = {
  [Who.PLAYER_1]: '🔸',
  [Who.PLAYER_2]: '🔹',
  [Who.EMPTY]: undefined,
};

interface Props {
  row: number;
  col: number;
}

const Root = styled.button`
  all: unset;

  background-color: ${boardButtonColor.NORMAL};

  border-bottom: 1px solid var(--theme-font-color);
  border-right: 1px solid var(--theme-font-color);

  font-size: 5vmin;

  text-align: center;

  cursor: pointer;

  &:hover {
    background-color: ${boardButtonColor.HOVER};
  }
`;

const BoardButton: FC<Props> = ({ row, col }) => {
  if (row < BORDER_MIN || row > BORDER_MAX || col < BORDER_MIN || col > BORDER_MAX) {
    throw Error('Out of border range');
  }

  const {
    isAvailable, boardState, currentTurn, putPiece,
  } = useGameStore();

  const isThisAvailable = isAvailable[row][col];
  const currentPiece: Who = boardState[row][col];

  const handleOnClick: () => void = () => {
    if (!isThisAvailable) {
      return;
    }

    putPiece({ row, col });
  };

  const iconToBeRendered: ReactNode = (() => {
    switch (currentPiece) {
      case Who.PLAYER_1: case Who.PLAYER_2:
        return piece[currentPiece];
      default:
        return isThisAvailable ? availableIndicator[currentTurn] : undefined;
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
