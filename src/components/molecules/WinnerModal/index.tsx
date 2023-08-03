import React from 'react';
import styled from 'styled-components';

import ModalBackground from '^/components/atoms/ModalBackground';
import ModalWrapper from '^/components/atoms/ModalWrapper';
import WinnerModalTitle from '^/components/atoms/WinnerModalTitle';
import WinnerModalUIButton from '^/components/atoms/WinnerModalUIButton';
import PieceCountWrapper from '^/components/molecules/PieceCountWrapper';

import { useGameStore } from '^/store';
import { ChakraUIButtonColorScheme, Who } from '^/types';
import { exportHistoryToReplay } from '^/utils';

const chakraUiButtonColorScheme: Record<Who, ChakraUIButtonColorScheme> = {
  [Who.PLAYER_1]: ChakraUIButtonColorScheme.ORANGE,
  [Who.PLAYER_2]: ChakraUIButtonColorScheme.BLUE,
  [Who.EMPTY]: ChakraUIButtonColorScheme.TEAL,
};

const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  row-gap: 1vmin;
`;

const ModalPieceCountWrapper = styled.div`
  margin-bottom: 1vmin;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 2vmin;
`;

function WinnerModal() {
  const winner = useGameStore((state) => state.winner);
  const isContinuable = useGameStore((state) => state.isContinuable);
  const undo = useGameStore((state) => state.undo);
  const reset = useGameStore((state) => state.reset);

  const whoIsWinner: string = (winner !== Who.EMPTY)
    ? `Player ${winner} Wins!`
    : 'Draw!';

  const handleOnClickSaveReplay: () => void = () => {
    exportHistoryToReplay(useGameStore.getState().history);
  };

  return !isContinuable ? (
    <ModalWrapper>
      <ModalBackground />
      <ModalContentWrapper>
        <WinnerModalTitle winner={winner} title={whoIsWinner} />
        <ModalPieceCountWrapper>
          <PieceCountWrapper />
        </ModalPieceCountWrapper>
        <ButtonWrapper>
          <WinnerModalUIButton
            colorScheme={chakraUiButtonColorScheme[winner]}
            onClick={undo}
          >
            Undo
          </WinnerModalUIButton>
          <WinnerModalUIButton
            colorScheme={chakraUiButtonColorScheme[winner]}
            onClick={reset}
          >
            Reset
          </WinnerModalUIButton>
          <WinnerModalUIButton
            colorScheme={chakraUiButtonColorScheme[winner]}
            onClick={handleOnClickSaveReplay}
          >
            Save Replay
          </WinnerModalUIButton>
        </ButtonWrapper>
      </ModalContentWrapper>
    </ModalWrapper>
  ) : null;
}

export default WinnerModal;
