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
    expect(useGameStore.getState().isAvailable).toEqual(convertStringToIsAvailable(`
      00000000
      00000000
      00001000
      00000100
      00100000
      00010000
      00000000
      00000000
    `));
  });
});
