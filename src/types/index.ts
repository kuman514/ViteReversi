export enum Theme {
  BRIGHT = 'bright',
  DARK = 'dark',
}

export enum Who {
  EMPTY = 0,
  PLAYER_1 = 1,
  PLAYER_2 = 2,
}

export interface PieceCount {
  [Who.PLAYER_1]: number;
  [Who.PLAYER_2]: number;
}

export type BoardState = Who[][];
export interface BoardCoordinate {
  row: number; col: number;
}

export type BoardStateHistory = BoardState;
export type IsAvailableGistory = boolean[][];
export type History = {
  coordHistory: BoardCoordinate;
  boardStateHistory: BoardStateHistory;
  isAvailableHistory: IsAvailableGistory;
  turnHistory: Who;
};

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

// Store types below =========================================================

export interface GameState {
  boardState: BoardState;
  currentTurn: Who;
  isAvailable: boolean[][];
  isContinuable: boolean;
  pieceCount: PieceCount;
  winner: Who;
  history: History[];
}
export interface GameAction {
  putPiece: ({ row, col }: { row: number; col: number; }) => void;
  reset: () => void;
  undo: () => void;
}
export type GameStore = GameState & GameAction;

export interface PreferenceState {
  theme: Theme;
}
export interface PreferenceAction {
  setTheme: (newTheme: Theme) => void;
}
export type PreferenceStore = PreferenceState & PreferenceAction;

export interface ReplayState {
  isReplaying: boolean;
  replayPage: number;
  replayLength: number;
  replayHistory: History[];
}
export interface ReplayAction {
  loadReplay: (replayHistory: History[]) => void;
  prevPage: () => void;
  nextPage: () => void;
  clearReplay: () => void;
}
export type ReplayStore = ReplayState & ReplayAction;

// Store types above =========================================================
