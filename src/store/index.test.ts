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

describe('convertStringToBoard', () => {
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
  });
});
