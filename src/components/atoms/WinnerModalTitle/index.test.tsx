import React from 'react';
import {
  describe, expect, test,
} from 'vitest';
import { render } from '@testing-library/react';
import WinnerModalTitle from '.';
import { Who } from '^/types';

describe('UIButton', () => {
  test('should not show on empty winner', async () => {
    const { container } = render(
      <WinnerModalTitle
        title="Yasuo"
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  test('should show on winner having p1', async () => {
    const { findByText } = render(
      <WinnerModalTitle
        title="Player 1 is science"
        winner={Who.PLAYER_1}
      />,
    );
    expect(await findByText(/Player 1 is science/i)).toBeTruthy();
  });

  test('should show on winner having p2', async () => {
    const { findByText } = render(
      <WinnerModalTitle
        title="Player 2 is math"
        winner={Who.PLAYER_2}
      />,
    );
    expect(await findByText(/Player 2 is math/i)).toBeTruthy();
  });

  test('should show on winner explicit empty', async () => {
    const { findByText } = render(
      <WinnerModalTitle
        title="No one"
        winner={Who.EMPTY}
      />,
    );
    expect(await findByText(/No one/i)).toBeTruthy();
  });
});
