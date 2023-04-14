import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { boardButtonColor, piece } from '^/constants';
import { useGameStore, useReplayStore } from '^/store';
import { Who } from '^/types';
import { isInRange } from '^/utils';

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
  if (!isInRange(row, col)) {
    throw Error('Out of border range');
  }

  const {
    isAvailable, boardState, currentTurn, putPiece,
  } = useGameStore();

  const { isReplaying, replayHistory, replayPage } = useReplayStore();

  const isThisAvailable = !isReplaying && isAvailable[row][col];
  const currentPiece: Who = isReplaying
    ? replayHistory[replayPage].boardStateHistory[row][col]
    : boardState[row][col];

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
