import {
  assert, describe, expect, it, test,
} from 'vitest';

describe('Draft sample test', () => {
  it('Expect', () => {
    expect(1 + 1).toEqual(2);
  });

  it('Assert', () => {
    assert.equal(Math.sqrt(4), 2);
  });

  test.skip('Snapshot is skipped', () => {
    expect({ foo: 'bar' }).toMatchSnapshot();
  });
});
