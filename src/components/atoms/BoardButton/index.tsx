import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { boardButtonColor, piece } from '^/constants';
import { useGameStore, useReplayStore } from '^/store';
import { BoardCoordinate, Who } from '^/types';
import { isInRange } from '^/utils';

const availableIndicator: Record<Who, ReactNode> = {
  [Who.PLAYER_1]: '🔸',
  [Who.PLAYER_2]: '🔹',
  [Who.EMPTY]: undefined,
};

interface RootProps {
  isRecentlyPut?: boolean;
}

const Root = styled.button<RootProps>`
  all: unset;

  background-color: ${({ isRecentlyPut }) => (isRecentlyPut ? boardButtonColor.RECENTLY_PUT : boardButtonColor.NORMAL)};

  border-bottom: 1px solid var(--theme-font-color);
  border-right: 1px solid var(--theme-font-color);

  font-size: 5vmin;

  text-align: center;

  cursor: pointer;

  &:hover {
    background-color: ${({ isRecentlyPut }) => (isRecentlyPut ? boardButtonColor.RECENTLY_PUT : boardButtonColor.HOVER)};
  }
`;

interface Props {
  row: number;
  col: number;
}

const BoardButton: FC<Props> = ({ row, col }) => {
  if (!isInRange(row, col)) {
    throw Error('Out of border range');
  }

  const {
    isAvailable, boardState, currentTurn, history: gameHistory, putPiece,
  } = useGameStore();

  const { isReplaying, replayHistory, replayPage } = useReplayStore();

  const isThisAvailable = !isReplaying && isAvailable[row][col];
  const currentPiece: Who = isReplaying
    ? replayHistory[replayPage].boardStateHistory[row][col]
    : boardState[row][col];

  const gameCoordHistory: BoardCoordinate = gameHistory[gameHistory.length - 1]?.coordHistory ?? {
    row: -1, col: -1,
  };
  const replayCoordHistory: BoardCoordinate = replayHistory[replayPage]?.coordHistory ?? {
    row: -1, col: -1,
  };
  const isRecentlyPut: boolean = isReplaying ? (
    row === replayCoordHistory.row && col === replayCoordHistory.col
  ) : (
    row === gameCoordHistory.row && col === gameCoordHistory.col
  );

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
      isRecentlyPut={isRecentlyPut}
    >
      {iconToBeRendered}
    </Root>
  );
};

export default BoardButton;
