import React, { FC } from 'react';
import styled from 'styled-components';
import PieceCount from '^/components/atoms/PieceCount';
import { Who } from '^/types';

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2.5vmin;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--theme-font-color);

  column-gap: 1.25vmin;
`;

interface Props {
  isForGame?: boolean;
}

const PieceCountWrapper: FC<Props> = ({ isForGame }) => (
  <Root>
    <PieceCount player={Who.PLAYER_1} isForGame={isForGame} />
    <PieceCount player={Who.PLAYER_2} isForGame={isForGame} />
  </Root>
);

export default PieceCountWrapper;
