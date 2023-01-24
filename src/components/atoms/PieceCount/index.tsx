import React, { FC } from 'react';
import styled from 'styled-components';
import { piece } from '^/constants';
import { useGameStore } from '^/store';
import { Who } from '^/types';

const turnColorPicker: Record<Who, string> = {
  [Who.PLAYER_1]: '#ffa600',
  [Who.PLAYER_2]: '#008cff',
  [Who.EMPTY]: '',
};

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
}

const PieceCount: FC<Props> = ({ player }) => {
  const { pieceCount, currentTurn } = useGameStore();
  const thisPieceCount = (player !== Who.EMPTY) ? String(pieceCount[player]).padStart(2, '0') : '';
  const turnColor: string = (currentTurn === player) ? turnColorPicker[player] : '';
  return (
    <Root turnColor={turnColor}>
      {piece[player]}
      {thisPieceCount}
    </Root>
  );
};

export default PieceCount;
