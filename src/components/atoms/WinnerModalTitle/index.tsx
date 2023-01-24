import React, { FC } from 'react';
import styled from 'styled-components';
import { Who } from '^/types';

interface RootProps {
  fontColor?: string;
  outerGlowColor?: string;
}

const colorPalette: Record<Who, RootProps> = {
  [Who.PLAYER_1]: {
    fontColor: '#DFDFDF',
    outerGlowColor: '#FC8003',
  },
  [Who.PLAYER_2]: {
    fontColor: '#DFDFDF',
    outerGlowColor: '#0398FC',
  },
  [Who.EMPTY]: {},
};

const Root = styled.div<RootProps>`
  font-size: 9vmin;
  color: ${({ fontColor }) => fontColor};
  text-shadow: 0px 0px 20px ${({ outerGlowColor }) => outerGlowColor};
  z-index: 1001;
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
