import React, { FC } from 'react';
import ModalBackground from '^/components/atoms/ModalBackground';
import ModalWrapper from '^/components/atoms/ModalWrapper';
import WinnerModalTitle from '^/components/atoms/WinnerModalTitle';
import { useGameStore } from '^/store';
import { Who } from '^/types';

const WinnerModal: FC = () => {
  const { winner, isContinuable } = useGameStore();
  const whoIsWinner: string = winner !== Who.EMPTY
    ? `Player ${winner} Wins!`
    : 'Draw!';
  return !isContinuable ? (
    <ModalWrapper>
      <ModalBackground />
      <WinnerModalTitle winner={winner} title={whoIsWinner} />
    </ModalWrapper>
  ) : null;
};

export default WinnerModal;
