import create from 'zustand';
import {
  BoardCoordinate,
  BoardState,
  PieceCount,
  Who,
  History,
  GameStore,
  GameState,
} from '^/types';
import { BORDER_MAX, BORDER_MIN, LENGTH } from '^/constants';
import { isInRange } from '^/utils';

const direction: BoardCoordinate[] = [
  { row: -1, col: 0 },
  { row: -1, col: 1 },
  { row: 0, col: 1 },
  { row: 1, col: 1 },
  { row: 1, col: 0 },
  { row: 1, col: -1 },
  { row: 0, col: -1 },
  { row: -1, col: -1 },
];

function generateEmptyBoard(): BoardState {
  const emptyBoard: BoardState = Array.from(
    { length: LENGTH },
    () => Array.from({ length: LENGTH }, () => Who.EMPTY),
  );
  const center = Math.floor(BORDER_MAX / 2);
  emptyBoard[center][center] = Who.PLAYER_1;
  emptyBoard[center][center + 1] = Who.PLAYER_2;
  emptyBoard[center + 1][center] = Who.PLAYER_2;
  emptyBoard[center + 1][center + 1] = Who.PLAYER_1;
  return emptyBoard;
}

function generateEmptyAvailable(): boolean[][] {
  const emptyBoard: boolean[][] = Array.from(
    { length: LENGTH },
    () => Array.from({ length: LENGTH }, () => false),
  );
  const center = Math.floor(BORDER_MAX / 2);
  emptyBoard[center - 1][center + 1] = true;
  emptyBoard[center][center + 2] = true;
  emptyBoard[center + 2][center] = true;
  emptyBoard[center + 1][center - 1] = true;
  return emptyBoard;
}

const initialGameStore: GameState = {
  boardState: generateEmptyBoard(),
  isAvailable: generateEmptyAvailable(),
  currentTurn: Who.PLAYER_1,
  pieceCount: {
    [Who.PLAYER_1]: 2,
    [Who.PLAYER_2]: 2,
  },
  winner: Who.EMPTY,
  history: [{
    coordHistory: { row: -1, col: -1 },
    boardStateHistory: generateEmptyBoard(),
    isAvailableHistory: generateEmptyAvailable(),
    turnHistory: Who.PLAYER_1,
  }],
  isContinuable: true,
};

function returnCopiedInitialGameStore(): GameState {
  const deepCopied: string = JSON.stringify(initialGameStore);
  const reparsed: GameState = JSON.parse(deepCopied);
  return reparsed;
}

function getIsAvailable({
  board, curPlayer, nextPlayer,
}: {
  board: BoardState;
  curPlayer: Who;
  nextPlayer: Who;
}): boolean[][] {
  const newIsCurrentAvailableCopy: boolean[][] = Array.from(
    { length: LENGTH },
    () => Array.from({ length: LENGTH }, () => false),
  );
  for (let r = BORDER_MIN; r <= BORDER_MAX; r++) {
    for (let c = BORDER_MIN; c <= BORDER_MAX; c++) {
      if (board[r][c] !== Who.EMPTY) {
        continue;
      }

      newIsCurrentAvailableCopy[r][c] = direction.map(({ row: rowDir, col: colDir }) => {
        let curRow: number = r + rowDir;
        let curCol: number = c + colDir;
        let distance = 0;

        while (isInRange(curRow, curCol) && board[curRow][curCol] === curPlayer) {
          distance++;
          curRow += rowDir;
          curCol += colDir;
        }

        return (
          isInRange(curRow, curCol)
          && board[curRow][curCol] === nextPlayer
          && distance > 0
        );
      }).some((isPossible) => isPossible);
    }
  }
  return newIsCurrentAvailableCopy;
}

const useGameStore = create<GameStore>()((set) => ({
  ...returnCopiedInitialGameStore(),
  putPiece: ({ row, col }) => set((gameStore) => {
    const {
      boardState, isAvailable, currentTurn, history,
    } = gameStore;

    if (!isInRange(row, col) || !isAvailable[row][col]) {
      return gameStore;
    }

    // Put a piece on the board
    const deepCopiedBoardState: string = JSON.stringify(boardState);
    const reparsedBoardStateCopy: BoardState = JSON.parse(deepCopiedBoardState);
    reparsedBoardStateCopy[row][col] = currentTurn;

    // Reverse opponent pieces
    const currentOpponent: Who = (() => {
      switch (currentTurn) {
        case Who.PLAYER_1:
          return Who.PLAYER_2;
        case Who.PLAYER_2:
          return Who.PLAYER_1;
        default:
          throw Error('There should be exactly 2 players.');
      }
    })();
    direction.forEach(({ row: rowDir, col: colDir }) => {
      let { curRow, curCol } = {
        curRow: row + rowDir,
        curCol: col + colDir,
      };

      while (
        isInRange(curRow, curCol)
        && reparsedBoardStateCopy[curRow][curCol] === currentOpponent
      ) {
        curRow += rowDir;
        curCol += colDir;
      }

      if (
        isInRange(curRow, curCol)
        && reparsedBoardStateCopy[curRow][curCol] === currentTurn
      ) {
        curRow -= rowDir;
        curCol -= colDir;
        while (reparsedBoardStateCopy[curRow][curCol] === currentOpponent) {
          reparsedBoardStateCopy[curRow][curCol] = currentTurn;
          curRow -= rowDir;
          curCol -= colDir;
        }
      }
    });

    // Count pieces
    const pieceCount: PieceCount = {
      [Who.PLAYER_1]: 0,
      [Who.PLAYER_2]: 0,
    };
    for (let i = BORDER_MIN; i <= BORDER_MAX; i++) {
      for (let j = BORDER_MIN; j <= BORDER_MAX; j++) {
        const currentPiece: Who = reparsedBoardStateCopy[i][j];
        if (currentPiece === Who.EMPTY) {
          continue;
        }
        pieceCount[currentPiece]++;
      }
    }

    // Scan available for next player
    reparsedBoardStateCopy[row][col] = currentTurn;
    const newIsOpponentAvailableCopy: boolean[][] = getIsAvailable({
      board: reparsedBoardStateCopy,
      curPlayer: currentTurn,
      nextPlayer: currentOpponent,
    });

    // Check opponent continuable
    const isOpponentContinuable: boolean = newIsOpponentAvailableCopy.some(
      (line) => line.some((btn) => btn),
    );
    // Scan available for current player if not possible for the opponent
    const newIsAvailableCopy: boolean[][] = isOpponentContinuable
      ? newIsOpponentAvailableCopy
      : getIsAvailable({
        board: reparsedBoardStateCopy,
        curPlayer: currentOpponent,
        nextPlayer: currentTurn,
      });

    const nextPlayer: Who = isOpponentContinuable ? currentOpponent : currentTurn;
    // Check continuable and determine winner
    const isContinuable: boolean = isOpponentContinuable === true
      ? isOpponentContinuable
      : newIsAvailableCopy.some(
        (line) => line.some((btn) => btn),
      );
    const newWinner: Who = isContinuable
      ? Who.EMPTY
      : (() => {
        if (pieceCount[Who.PLAYER_1] > pieceCount[Who.PLAYER_2]) {
          return Who.PLAYER_1;
        }
        if (pieceCount[Who.PLAYER_1] < pieceCount[Who.PLAYER_2]) {
          return Who.PLAYER_2;
        }
        return Who.EMPTY;
      })();

    const newHistory: History[] = Array.from(history);
    newHistory.push({
      coordHistory: { row, col },
      boardStateHistory: reparsedBoardStateCopy,
      isAvailableHistory: newIsAvailableCopy,
      turnHistory: nextPlayer,
    });

    return {
      ...gameStore,
      boardState: reparsedBoardStateCopy,
      currentTurn: nextPlayer,
      isAvailable: newIsAvailableCopy,
      pieceCount,
      winner: newWinner,
      history: newHistory,
      isContinuable,
    };
  }),
  reset: () => set(() => returnCopiedInitialGameStore()),
  undo: () => set((gameStore) => {
    const { history } = gameStore;

    if (history.length <= 1) {
      return gameStore;
    }

    const newHistory: History[] = Array.from(history);
    newHistory.pop();

    const nextPlayer: Who = newHistory[newHistory.length - 1].turnHistory;

    const pieceCount: PieceCount = {
      [Who.PLAYER_1]: 0,
      [Who.PLAYER_2]: 0,
    };
    for (let i = BORDER_MIN; i <= BORDER_MAX; i++) {
      for (let j = BORDER_MIN; j <= BORDER_MAX; j++) {
        const currentPiece: Who = newHistory[newHistory.length - 1].boardStateHistory[i][j];
        if (currentPiece === Who.EMPTY) {
          continue;
        }
        pieceCount[currentPiece]++;
      }
    }

    return {
      ...gameStore,
      boardState: newHistory[newHistory.length - 1].boardStateHistory,
      currentTurn: nextPlayer,
      isAvailable: newHistory[newHistory.length - 1].isAvailableHistory,
      pieceCount,
      winner: Who.EMPTY,
      history: newHistory,
      isContinuable: true,
    };
  }),
}));

export default useGameStore;
