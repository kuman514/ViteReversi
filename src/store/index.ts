import create from 'zustand';
import { AppStatus, GameStatus, Who } from '^/types';
import { LENGTH } from '^/constants';

const initialGameStatus: GameStatus = {
  boardStatus: Array.from(
    { length: LENGTH },
    () => Array.from({ length: LENGTH }, () => Who.EMPTY),
  ),
  isAvailable: Array.from(
    { length: LENGTH },
    () => Array.from({ length: LENGTH }, () => false),
  ),
  pieceCount: {
    [Who.PLAYER_1]: 0,
    [Who.PLAYER_2]: 0,
  },
  winner: Who.EMPTY,
  history: [],
};

const returnCopiedInitialGameStatus: () => GameStatus = () => {
  const deepCopied: string = JSON.stringify(initialGameStatus);
  const reparsed: GameStatus = JSON.parse(deepCopied);
  return reparsed;
};
