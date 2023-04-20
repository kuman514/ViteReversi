import React from 'react';
import {
  describe, expect, test,
} from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import BottomUIButton from '.';

describe('UIButton', () => {
  test('should be clickable', async () => {
    let count = 0;
    const clicker: () => void = () => {
      count++;
    };
    const { container, findByText } = render(
      <BottomUIButton onClick={clicker}>
        Yasuo
      </BottomUIButton>,
    );
    expect(await findByText(/Yasuo/i)).toBeTruthy();

    const clickTarget = container.querySelector('button');
    if (!clickTarget) {
      throw Error('No button rendered');
    }
    fireEvent.click(clickTarget);
    expect(count).toEqual(1);
  });
});
