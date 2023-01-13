import React, { FC } from 'react';
import styled from 'styled-components';
import { Who } from '^/types';

interface RootProps {
  fontColor?: string;
  outerGlowColor?: string;
}

const colorPalette: Record<Who, RootProps> = {
  [Who.PLAYER_1]: {
    fontColor: '#737373',
    outerGlowColor: '#fc8003',
  },
  [Who.PLAYER_2]: {
    fontColor: '#bababa',
    outerGlowColor: '#0398fc',
  },
  [Who.EMPTY]: {},
};

const Root = styled.div<RootProps>`
  font-size: 9vmin;
  color: ${({ fontColor }) => fontColor};
  text-shadow: 2px 2px 10px ${({ outerGlowColor }) => outerGlowColor};
`;

interface Props {
  title?: string;
  winner?: Who;
}

const WinnerModalTitle: FC<Props> = ({
  title, winner,
}) => (
  <Root {...colorPalette[winner ?? Who.EMPTY]}>
    {title}
  </Root>
);

export default WinnerModalTitle;