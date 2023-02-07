import {
  beforeEach, describe, expect, it,
} from 'vitest';
import { BORDER_MAX, BORDER_MIN, LENGTH } from '^/constants';
import { BoardState, Who } from '^/types';
import useGameStore from './game';

const convertStringToBoard: (boardStr: string) => BoardState | undefined = (boardStr) => {
  const board = boardStr.trim().split('\n').map((row) => row.trim().split(''));

  if (board.length !== LENGTH || board.some((row) => row.length !== LENGTH)) {
    return undefined;
  }

  const result: BoardState = [];
  for (let i = BORDER_MIN; i <= BORDER_MAX; i++) {
    result.push([]);
    for (let j = BORDER_MIN; j <= BORDER_MAX; j++) {
      result[i].push((() => {
        switch (board[i][j]) {
          case '0':
            return Who.EMPTY;
          case '1':
            return Who.PLAYER_1;
          case '2':
            return Who.PLAYER_2;
          default:
            throw Error('Who should be just one of EMPTY, PLAYER_1, or PLAYER_2.');
        }
      })());
    }
  }

  return result;
};

const convertStringToIsAvailable: (boardStr: string) => boolean[][] | undefined = (boardStr) => {
  const board = boardStr.trim().split('\n').map((row) => row.trim().split(''));

  if (board.length !== LENGTH || board.some((row) => row.length !== LENGTH)) {
    return undefined;
  }

  const result: boolean[][] = [];
  for (let i = BORDER_MIN; i <= BORDER_MAX; i++) {
    result.push([]);
    for (let j = BORDER_MIN; j <= BORDER_MAX; j++) {
      result[i].push((() => {
        switch (board[i][j]) {
          case '0':
            return false;
          case '1':
            return true;
          default:
            throw Error('Who should be just one of EMPTY, PLAYER_1, or PLAYER_2.');
        }
      })());
    }
  }

  return result;
};

describe('convertStringToBoard and convertStringToIsAvailable', () => {
  it('should not throw in appropriate length', async () => {
    expect(convertStringToBoard(`
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
    `)).toBeTruthy();

    expect(convertStringToBoard(`
      00000000
      00000000
      000000000
      00000000
      00000000
      00000000
      00000000
      00000000
    `)).toBeFalsy();

    expect(convertStringToBoard(`
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
      0000000
    `)).toBeFalsy();

    expect(convertStringToBoard(`
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
    `)).toBeFalsy();

    expect(convertStringToBoard(`
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
    `)).toBeFalsy();

    expect(convertStringToIsAvailable(`
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
    `)).toBeTruthy();

    expect(convertStringToIsAvailable(`
      00000000
      00000000
      000000000
      00000000
      00000000
      00000000
      00000000
      00000000
    `)).toBeFalsy();

    expect(convertStringToIsAvailable(`
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
      0000000
    `)).toBeFalsy();

    expect(convertStringToIsAvailable(`
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
    `)).toBeFalsy();

    expect(convertStringToIsAvailable(`
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
      00000000
    `)).toBeFalsy();
  });
});

describe('Board Store State', () => {
  beforeEach(() => {
    useGameStore.getState().reset();
  });

  it('initial state', async () => {
    expect(useGameStore.getState().boardState).toStrictEqual(convertStringToBoard(`
      00000000
      00000000
      00000000
      00012000
      00021000
      00000000
      00000000
      00000000
    `));
  });

  it('game', async () => {
    // Initial state
    expect(useGameStore.getState().boardState).toStrictEqual(convertStringToBoard(`
      00000000
      00000000
      00000000
      00012000
      00021000
      00000000
      00000000
      00000000
    `));
    expect(useGameStore.getState().currentTurn).toEqual(Who.PLAYER_1);
    expect(useGameStore.getState().isAvailable).toStrictEqual(convertStringToIsAvailable(`
      00000000
      00000000
      00001000
      00000100
      00100000
      00010000
      00000000
      00000000
    `));

    // Putting row 4, col 2 (P1)
    useGameStore.getState().putPiece({ row: 4, col: 2 });
    expect(useGameStore.getState().boardState).toStrictEqual(convertStringToBoard(`
      00000000
      00000000
      00000000
      00012000
      00111000
      00000000
      00000000
      00000000
    `));
    expect(useGameStore.getState().currentTurn).toEqual(Who.PLAYER_2);

    // Putting row 5, col 4 (P2)
    useGameStore.getState().putPiece({ row: 5, col: 4 });
    expect(useGameStore.getState().boardState).toStrictEqual(convertStringToBoard(`
      00000000
      00000000
      00000000
      00012000
      00112000
      00002000
      00000000
      00000000
    `));
    expect(useGameStore.getState().currentTurn).toEqual(Who.PLAYER_1);

    // Putting row 3, col 5 (P1)
    useGameStore.getState().putPiece({ row: 3, col: 5 });
    expect(useGameStore.getState().boardState).toStrictEqual(convertStringToBoard(`
      00000000
      00000000
      00000000
      00011100
      00112000
      00002000
      00000000
      00000000
    `));
    expect(useGameStore.getState().currentTurn).toEqual(Who.PLAYER_2);

    // Putting row 4, col 1 (P2)
    useGameStore.getState().putPiece({ row: 4, col: 1 });
    expect(useGameStore.getState().boardState).toStrictEqual(convertStringToBoard(`
      00000000
      00000000
      00000000
      00011100
      02222000
      00002000
      00000000
      00000000
    `));
    expect(useGameStore.getState().currentTurn).toEqual(Who.PLAYER_1);

    // Putting row 6, col 4 (P1)
    useGameStore.getState().putPiece({ row: 6, col: 4 });
    expect(useGameStore.getState().boardState).toStrictEqual(convertStringToBoard(`
      00000000
      00000000
      00000000
      00011100
      02221000
      00001000
      00001000
      00000000
    `));
    expect(useGameStore.getState().currentTurn).toEqual(Who.PLAYER_2);

    // Putting row 2, col 5 (P2)
    useGameStore.getState().putPiece({ row: 2, col: 5 });
    expect(useGameStore.getState().boardState).toStrictEqual(convertStringToBoard(`
      00000000
      00000000
      00000200
      00012100
      02221000
      00001000
      00001000
      00000000
    `));
    expect(useGameStore.getState().currentTurn).toEqual(Who.PLAYER_1);

    // Putting row 4, col 0 (P1)
    useGameStore.getState().putPiece({ row: 4, col: 0 });
    expect(useGameStore.getState().boardState).toStrictEqual(convertStringToBoard(`
      00000000
      00000000
      00000200
      00012100
      11111000
      00001000
      00001000
      00000000
    `));
    expect(useGameStore.getState().currentTurn).toEqual(Who.PLAYER_2);

    // Putting row 7, col 4 (P2)
    useGameStore.getState().putPiece({ row: 7, col: 4 });
    expect(useGameStore.getState().boardState).toStrictEqual(convertStringToBoard(`
      00000000
      00000000
      00000200
      00012100
      11112000
      00002000
      00002000
      00002000
    `));
    expect(useGameStore.getState().currentTurn).toEqual(Who.PLAYER_1);

    // Putting row 1, col 6 (P1)
    useGameStore.getState().putPiece({ row: 1, col: 6 });
    expect(useGameStore.getState().boardState).toStrictEqual(convertStringToBoard(`
      00000000
      00000010
      00000100
      00011100
      11112000
      00002000
      00002000
      00002000
    `));
    expect(useGameStore.getState().currentTurn).toEqual(Who.PLAYER_2);
  });
});
