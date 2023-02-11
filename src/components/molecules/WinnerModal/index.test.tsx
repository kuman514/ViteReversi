import React from 'react';
import {
  beforeEach,
  describe, expect, test,
} from 'vitest';
import { render } from '@testing-library/react';
import WinnerModal from '.';
import { useGameStore } from '^/store';
import { Who } from '^/types';

describe('WinnerModal', () => {
  beforeEach(() => {
    useGameStore.getState().reset();
  });

  test('should show P1 wins', async () => {
    useGameStore.setState({
      winner: Who.PLAYER_1,
      isContinuable: false,
    });
    const { findByText } = render(
      <WinnerModal />,
    );
    expect(await findByText(/Player 1 Wins!/i)).toBeTruthy();
  });

  test('should show P2 wins', async () => {
    useGameStore.setState({
      winner: Who.PLAYER_2,
      isContinuable: false,
    });
    const { findByText } = render(
      <WinnerModal />,
    );
    expect(await findByText(/Player 2 Wins!/i)).toBeTruthy();
  });

  test('should show draw', async () => {
    useGameStore.setState({
      winner: Who.EMPTY,
      isContinuable: false,
    });
    const { findByText } = render(
      <WinnerModal />,
    );
    expect(await findByText(/Draw!/i)).toBeTruthy();
  });
});
