import {
  describe, expect, it,
} from 'vitest';
import { BORDER_MIN, BORDER_MAX } from '^/constants';

describe('Constants', () => {
  it('BORDER_MIN should be 0 and BORDER_MAX should be 7', () => {
    expect(BORDER_MIN).equals(0);
    expect(BORDER_MAX).equals(7);
  });
});
