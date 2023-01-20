import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { BORDER_MAX, BORDER_MIN } from '^/constants';
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

  background-color: #55AF55;

  border-bottom: 1px solid var(--theme-font-color);
  border-right: 1px solid var(--theme-font-color);

  font-size: 5vmin;

  text-align: center;

  cursor: pointer;

  &:hover {
    background-color: #D8245A;
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
      case Who.PLAYER_1:
        return '⚫';
      case Who.PLAYER_2:
        return '⚪';
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
