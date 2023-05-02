import React from 'react';
import styled from 'styled-components';
import { piece, playerPallete } from '^/constants';
import { useGameStore, useReplayStore } from '^/store';
import { Who } from '^/types';

interface RootProps {
  turnColor?: string;
}

const Root = styled.span<RootProps>`
  padding: 0.2vmin 0.5vmin;
  background-color: ${({ turnColor }) => turnColor};
  border-radius: 1vmin;
`;

interface Props {
  player: Who;
  isForGame?: boolean;
}

function PieceCount({ player, isForGame }: Props) {
  const { pieceCount, currentTurn } = useGameStore();
  const thisPieceCount = (player !== Who.EMPTY) ? String(pieceCount[player]).padStart(2, '0') : '';
  const turnColor: string = (!isForGame || currentTurn === player) ? playerPallete[player] : '';

  const { isReplaying } = useReplayStore();

  return isReplaying ? null : (
    <Root turnColor={turnColor}>
      {piece[player]}
      {thisPieceCount}
    </Root>
  );
}

export default PieceCount;
