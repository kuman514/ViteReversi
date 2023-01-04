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
}
