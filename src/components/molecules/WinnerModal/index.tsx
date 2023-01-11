import React, { FC } from 'react';
import ModalBackground from '^/components/atoms/ModalBackground';
import ModalWrapper from '^/components/atoms/ModalWrapper';
import WinnerModalTitle from '^/components/atoms/WinnerModalTitle';
import useStatus from '^/store';
import { Who } from '^/types';

const WinnerModal: FC = () => {
  const {
    gameStatus: {
      winner,
    },
  } = useStatus();

  return winner !== Who.EMPTY ? (
    <ModalWrapper>
      <ModalBackground />
      <WinnerModalTitle title={`Player ${winner} Wins!`} />
    </ModalWrapper>
  ) : null;
};

export default WinnerModal;
