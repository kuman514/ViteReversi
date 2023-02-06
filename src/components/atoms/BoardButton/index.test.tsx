import React from 'react';
import {
  beforeEach, describe, expect, it,
} from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import BoardButton from '.';
import { BORDER_MIN, BORDER_MAX } from '^/constants';
import { useGameStore } from '^/store';
import { Who } from '^/types';

describe('BoardButton', () => {
  beforeEach(() => {
    useGameStore.getState().reset();
  });

  it('throws an error when out of range', () => {
    expect(() => {
      render(
        <BoardButton row={BORDER_MIN - 1} col={BORDER_MAX + 1} />,
      );
    }).toThrowError();
    expect(() => {
      render(
        <BoardButton row={BORDER_MAX + 1} col={BORDER_MIN - 1} />,
      );
    }).toThrowError();
    expect(() => {
      render(
        <BoardButton row={BORDER_MIN - 1} col={BORDER_MIN - 1} />,
      );
    }).toThrowError();
    expect(() => {
      render(
        <BoardButton row={BORDER_MAX + 1} col={BORDER_MAX + 1} />,
      );
    }).toThrowError();
  });

  it('is clickable when clickable', () => {
    expect(useGameStore.getState().currentTurn).equals(Who.PLAYER_1);
    const { container } = render(
      <BoardButton row={2} col={4} />,
    );
    const button = container.querySelector('button');
    if (!button) {
      throw Error('The container returened nullish');
    }
    fireEvent.click(button);
    expect(useGameStore.getState().currentTurn).equals(Who.PLAYER_2);
  });

  it('is not clickable when unclickable', () => {
    expect(useGameStore.getState().currentTurn).equals(Who.PLAYER_1);
    const { container } = render(
      <BoardButton row={0} col={0} />,
    );
    const button = container.querySelector('button');
    if (!button) {
      throw Error('The container returened nullish');
    }
    fireEvent.click(button);
    expect(useGameStore.getState().currentTurn).equals(Who.PLAYER_1);
  });
});
