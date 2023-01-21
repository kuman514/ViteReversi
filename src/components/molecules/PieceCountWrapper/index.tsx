import React, { FC } from 'react';
import styled from 'styled-components';
import { piece } from '^/constants';
import { useGameStore } from '^/store';
import { Who } from '^/types';

const Root = styled.div`
  font-size: 5vmin;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--theme-font-color);
`;

const PieceCountWrapper: FC = () => {
  const { pieceCount } = useGameStore();
  const p1PieceCount: string = String(pieceCount[Who.PLAYER_1]).padStart(2, '0');
  const p2PieceCount: string = String(pieceCount[Who.PLAYER_1]).padStart(2, '0');
  return (
    <Root>
      {piece[Who.PLAYER_1]}
      {p1PieceCount}
      {piece[Who.PLAYER_2]}
      {p2PieceCount}
    </Root>
  );
};

export default PieceCountWrapper;
