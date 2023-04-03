import { BORDER_MIN, BORDER_MAX } from '^/constants';

export const isInRange: (row: number, col: number) => boolean = (row: number, col: number) => (
  BORDER_MIN <= row && row <= BORDER_MAX && BORDER_MIN <= col && col <= BORDER_MAX
);
