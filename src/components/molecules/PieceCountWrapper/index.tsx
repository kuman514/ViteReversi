import React, { FC } from 'react';
import styled from 'styled-components';
import PieceCount from '^/components/atoms/PieceCount';
import { Who } from '^/types';

const Root = styled.div`
  font-size: 5vmin;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--theme-font-color);
`;

const PieceCountWrapper: FC = () => (
  <Root>
    <PieceCount player={Who.PLAYER_1} />
    <PieceCount player={Who.PLAYER_2} />
  </Root>
);

export default PieceCountWrapper;
