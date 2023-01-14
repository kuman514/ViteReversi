import create from 'zustand';
import {
  AppStatus,
  BoardCoordinate,
  BoardStatus,
  GameStatus,
  PieceCount,
  Who,
  History,
} from '^/types';
import { BORDER_MAX, BORDER_MIN, LENGTH } from '^/constants';

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

const initialGameStatus: GameStatus = {
  boardStatus: (() => {
    const emptyBoard: BoardStatus = Array.from(
      { length: LENGTH },
      () => Array.from({ length: LENGTH }, () => Who.EMPTY),
    );
    const center = Math.floor(BORDER_MAX / 2);
    emptyBoard[center][center] = Who.PLAYER_1;
    emptyBoard[center][center + 1] = Who.PLAYER_2;
    emptyBoard[center + 1][center] = Who.PLAYER_2;
    emptyBoard[center + 1][center + 1] = Who.PLAYER_1;
    return emptyBoard;
  })(),
  isAvailable: (() => {
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
  })(),
  currentTurn: Who.PLAYER_1,
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

const useStatus = create<AppStatus>()((set) => ({
  gameStatus: returnCopiedInitialGameStatus(),
  putPiece: ({ row, col }) => set(({ gameStatus }) => {
    const {
      boardStatus, isAvailable, currentTurn, history,
    } = gameStatus;

    if (
      row < BORDER_MIN || row > BORDER_MAX
      || col < BORDER_MIN || col > BORDER_MAX
      || !isAvailable[row][col]
    ) {
      return { gameStatus };
    }

    // Put a piece on the board
    const deepCopiedBoardStatus: string = JSON.stringify(boardStatus);
    const reparsedBoardStatusCopy: BoardStatus = JSON.parse(deepCopiedBoardStatus);
    reparsedBoardStatusCopy[row][col] = currentTurn;

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
        BORDER_MIN <= curRow && curRow <= BORDER_MAX
        && BORDER_MIN <= curCol && curCol <= BORDER_MAX
        && reparsedBoardStatusCopy[curRow][curCol] === currentOpponent
      ) {
        curRow += rowDir;
        curCol += colDir;
      }

      if (
        BORDER_MIN <= curRow && curRow <= BORDER_MAX
        && BORDER_MIN <= curCol && curCol <= BORDER_MAX
        && reparsedBoardStatusCopy[curRow][curCol] === currentTurn
      ) {
        curRow -= rowDir;
        curCol -= colDir;
        while (reparsedBoardStatusCopy[curRow][curCol] === currentOpponent) {
          reparsedBoardStatusCopy[curRow][curCol] = currentTurn;
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
        const currentPiece: Who = reparsedBoardStatusCopy[i][j];
        if (currentPiece === Who.EMPTY) {
          continue;
        }
        pieceCount[currentPiece]++;
      }
    }

    // Append history
    const newHistory: History = Array.from(history);
    newHistory.push({ row, col });

    // Scan available for next player
    const newIsAvailableCopy: boolean[][] = Array.from(
      { length: LENGTH },
      () => Array.from({ length: LENGTH }, () => false),
    );
    reparsedBoardStatusCopy[row][col] = currentTurn;
    const nextPlayer: Who = currentOpponent;
    for (let r = BORDER_MIN; r <= BORDER_MAX; r++) {
      for (let c = BORDER_MIN; c <= BORDER_MAX; c++) {
        if (reparsedBoardStatusCopy[r][c] !== Who.EMPTY) {
          continue;
        }

        newIsAvailableCopy[r][c] = direction.map(({ row: rowDir, col: colDir }) => {
          let { curRow, curCol } = {
            curRow: r + rowDir,
            curCol: c + colDir,
          };

          let distance = 0;

          while (
            BORDER_MIN <= curRow && curRow <= BORDER_MAX
            && BORDER_MIN <= curCol && curCol <= BORDER_MAX
            && reparsedBoardStatusCopy[curRow][curCol] === currentTurn
          ) {
            distance++;
            curRow += rowDir;
            curCol += colDir;
          }

          return (
            BORDER_MIN <= curRow && curRow <= BORDER_MAX
            && BORDER_MIN <= curCol && curCol <= BORDER_MAX
            && reparsedBoardStatusCopy[curRow][curCol] === nextPlayer
            && distance > 0
          );
        }).some((isPossible) => isPossible);
      }
    }

    // Check continuable and determine winner
    const isContinuable: boolean = (() => {
      for (let i = BORDER_MIN; i <= BORDER_MAX; i++) {
        for (let j = BORDER_MIN; j <= BORDER_MAX; j++) {
          if (newIsAvailableCopy[i][j]) {
            return true;
          }
        }
      }
      return false;
    })();
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

    return {
      gameStatus: {
        ...gameStatus,
        boardStatus: reparsedBoardStatusCopy,
        currentTurn: nextPlayer,
        isAvailable: newIsAvailableCopy,
        pieceCount,
        history: newHistory,
        winner: newWinner,
      },
    };
  }),
  reset: () => set(() => ({ gameStatus: returnCopiedInitialGameStatus() })),
}));

export default useStatus;
