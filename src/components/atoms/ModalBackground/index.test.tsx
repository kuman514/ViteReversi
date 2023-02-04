import React from 'react';
import {
  beforeEach, describe, expect, test,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import ModalBackground from '.';

describe('ModalBackground', () => {
  beforeEach(() => {
    render(
      <ModalBackground>
        <h4>
          Content
        </h4>
      </ModalBackground>,
    );
  });

  test('should show the modal all the time', async () => {
    expect(await screen.getByText(/Content/i)).toBeTruthy();
  });
});
