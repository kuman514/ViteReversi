import React from 'react';
import {
  beforeEach, describe, expect, test,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import ModalWrapper from '.';

describe('ModalWrapper', () => {
  beforeEach(() => {
    render(
      <ModalWrapper>
        Wrapper content
      </ModalWrapper>,
    );
  });

  test('should show the modal all the time', async () => {
    expect(await screen.getByText(/Wrapper content/i)).toBeTruthy();
  });
});
