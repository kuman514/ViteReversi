import { ReactNode } from 'react';
import { Theme, Who } from '^/types';

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

export const themeBgColor: Record<Theme, string> = {
  [Theme.BRIGHT]: '#FFFFFF',
  [Theme.DARK]: '#1A1A1A',
};

export const themeFontColor: Record<Theme, string> = {
  [Theme.BRIGHT]: '#000000',
  [Theme.DARK]: '#FFFFFF',
};

export const boardButtonColor: Record<string, string> = {
  NORMAL: '#55AF55',
  HOVER: '#D8245A',
};
