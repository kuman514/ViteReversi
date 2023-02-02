import React from 'react';
import {
  beforeEach, describe, expect, it,
} from 'vitest';
import { render } from '@testing-library/react';
import BoardButton from '.';
import { BORDER_MIN, BORDER_MAX } from '^/constants';
import { useGameStore } from '^/store';

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
});
