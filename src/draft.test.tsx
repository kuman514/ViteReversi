import {
  assert, describe, expect, it,
} from 'vitest';

describe('Draft sample test', () => {
  it('Expect', () => {
    expect(1 + 1).toEqual(2);
  });

  it('Assert', () => {
    assert.equal(Math.sqrt(4), 2);
  });
});
