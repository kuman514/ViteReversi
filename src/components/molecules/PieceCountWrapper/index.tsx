import React, { FC } from 'react';
import styled from 'styled-components';
import PieceCount from '^/components/atoms/PieceCount';
import { piece } from '^/constants';
import { useGameStore } from '^/store';
import { Who } from '^/types';

const Root = styled.div`
  font-size: 5vmin;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--theme-font-color);
`;

const PieceCountWrapper: FC = () => {
  const { pieceCount } = useGameStore();
  const p1PieceCount: string = String(pieceCount[Who.PLAYER_1]).padStart(2, '0');
  const p2PieceCount: string = String(pieceCount[Who.PLAYER_1]).padStart(2, '0');
  return (
    <Root>
      <PieceCount player={Who.PLAYER_1} />
      <PieceCount player={Who.PLAYER_2} />
    </Root>
  );
};

export default PieceCountWrapper;
