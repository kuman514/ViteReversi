import React, { FC } from 'react';
import { useGameStore } from '^/store';
import { Who } from '^/types';

const PieceCountWrapper: FC = () => {
  const { pieceCount } = useGameStore();
  return (
    <div>
      {pieceCount[Who.PLAYER_1]}
      -
      {pieceCount[Who.PLAYER_2]}
    </div>
  );
};

export default PieceCountWrapper;
