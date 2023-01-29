import { ReactNode } from 'react';
import { Who } from '^/types';

export const LENGTH = 8;
export const BORDER_MIN = 0;
export const BORDER_MAX = LENGTH - 1;

export const piece: Record<Who, ReactNode> = {
  [Who.PLAYER_1]: '⚫',
  [Who.PLAYER_2]: '⚪',
  [Who.EMPTY]: undefined,
};

export const playerPallete: Record<Who, string> = {
  [Who.PLAYER_1]: '#DD6B20',
  [Who.PLAYER_2]: '#3182CE',
  [Who.EMPTY]: '#ACACAC',
};
