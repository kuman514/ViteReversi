export enum Who {
  EMPTY = 0,
  PLAYER_1 = 1,
  PLAYER_2 = 2,
}

export interface PieceCount {
  [Who.PLAYER_1]: number;
  [Who.PLAYER_2]: number;
}

export type BoardStatus = Who[][];
export interface BoardCoordinate {
  row: number; col: number;
}
export type History = BoardCoordinate[];

export interface GameStatus {
  boardStatus: BoardStatus;
  currentTurn: Who;
  isAvailable: boolean[][];
  pieceCount: PieceCount;
  winner: Who;
  history: History;
}

export interface AppStatus {
  gameStatus: GameStatus;
  putPiece: ({ row, col }: { row: number; col: number; }) => void;
  reset: () => void;
}

export enum ChakraUIButtonVariant {
  SOLID = 'solid',
  OUTLINE = 'outline',
  GHOST = 'ghost',
  LINK = 'link',
}

export enum ChakraUIButtonColorScheme {
  WHITEALPHA = 'whiteAlpha',
  BLACKALPHA = 'blackAlpha',
  GRAY = 'gray',
  RED = 'red',
  ORANGE = 'orange',
  YELLOW = 'yellow',
  GREEN = 'green',
  TEAL = 'teal',
  BLUE = 'blue',
  CYAN = 'cyan',
  PURPLE = 'purple',
  PINK = 'pink',
  LINKEDIN = 'linkedin',
  FACEBOOK = 'facebook',
  MESSENGER = 'messenger',
  WHATSAPP = 'whatsapp',
  TWITTER = 'twitter',
  TELEGRAM = 'telegram',
}

export enum ChakraUIButtonSize {
  LARGE = 'lg',
  MID = 'md',
  SMALL = 'sm',
  TINY = 'xs',
}
