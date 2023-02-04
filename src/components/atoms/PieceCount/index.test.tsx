import React from 'react';
import {
  beforeEach, describe, expect, test,
} from 'vitest';
import { act, render } from '@testing-library/react';
import PieceCount from '.';
import { Who } from '^/types';
import { useGameStore } from '^/store';
import { piece } from '^/constants';

describe('PieceCount', () => {
  beforeEach(() => {
    useGameStore.getState().reset();
  });

  test('initial state P1', async () => {
    const { findByText } = render(
      <PieceCount
        player={Who.PLAYER_1}
        isForGame
      />,
    );
    expect(await findByText(RegExp(`${piece[Who.PLAYER_1]}`, 'i'))).toBeTruthy();
    expect(await findByText(/02/i)).toBeTruthy();
  });

  test('initial state P2', async () => {
    const { findByText } = render(
      <PieceCount
        player={Who.PLAYER_2}
        isForGame
      />,
    );
    expect(await findByText(RegExp(`${piece[Who.PLAYER_2]}`, 'i'))).toBeTruthy();
    expect(await findByText(/02/i)).toBeTruthy();
  });

  test('random values', async () => {
    act(() => {
      useGameStore.setState({
        pieceCount: {
          [Who.PLAYER_1]: 4,
          [Who.PLAYER_2]: 35,
        },
      });
    });

    const { findByText: findByTextP1 } = render(
      <PieceCount
        player={Who.PLAYER_1}
        isForGame
      />,
    );
    const { findByText: findByTextP2 } = render(
      <PieceCount
        player={Who.PLAYER_2}
        isForGame
      />,
    );

    expect(await findByTextP1(/04/i)).toBeTruthy();
    expect(await findByTextP2(/35/i)).toBeTruthy();

    act(() => {
      useGameStore.setState({
        pieceCount: {
          [Who.PLAYER_1]: 14,
          [Who.PLAYER_2]: 7,
        },
      });
    });

    expect(await findByTextP1(/14/i)).toBeTruthy();
    expect(await findByTextP2(/07/i)).toBeTruthy();
  });
});
