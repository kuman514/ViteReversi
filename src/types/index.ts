export enum Who {
  EMPTY = 0,
  PLAYER_1 = 1,
  PLAYER_2 = 2,
}

export interface PieceCount {
  [Who.PLAYER_1]: number;
  [Who.PLAYER_2]: number;
}

export interface GameStatus {
  boardStatus: Who[][];
  isAvailable: boolean[][];
  pieceCount: PieceCount;
  winner: Who;
  history: { row: number; col: number; }[];
}

export interface AppStatus {
  gameStatus: GameStatus;
  putPiece: ({ who, row, col }: { who: Who; row: number; col: number; }) => void;
  reset: () => void;
}
