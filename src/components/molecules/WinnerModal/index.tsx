import React from 'react';
import styled from 'styled-components';

import ModalBackground from '^/components/atoms/ModalBackground';
import ModalWrapper from '^/components/atoms/ModalWrapper';
import UIButton from '^/components/atoms/UIButton';
import WinnerModalTitle from '^/components/atoms/WinnerModalTitle';
import PieceCountWrapper from '^/components/molecules/PieceCountWrapper';
import { useGameStore } from '^/store';
import {
  ChakraUIButtonColorScheme, ChakraUIButtonSize, ChakraUIButtonVariant, Who,
} from '^/types';
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
  const {
    winner, isContinuable, undo, reset,
  } = useGameStore();
  const whoIsWinner: string = (winner !== Who.EMPTY)
    ? `Player ${winner} Wins!`
    : 'Draw!';

  const handleOnClickSaveReplay: () => void = () => {
    const { history } = useGameStore.getState();
    exportHistoryToReplay(history);
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
          <UIButton
            buttonSize={ChakraUIButtonSize.SMALL}
            variant={ChakraUIButtonVariant.SOLID}
            colorScheme={chakraUiButtonColorScheme[winner]}
            fontSize="2vmin"
            height="4.5vmin"
            onClick={undo}
          >
            Undo
          </UIButton>
          <UIButton
            buttonSize={ChakraUIButtonSize.SMALL}
            variant={ChakraUIButtonVariant.SOLID}
            colorScheme={chakraUiButtonColorScheme[winner]}
            fontSize="2vmin"
            height="4.5vmin"
            onClick={reset}
          >
            Reset
          </UIButton>
          <UIButton
            buttonSize={ChakraUIButtonSize.SMALL}
            variant={ChakraUIButtonVariant.SOLID}
            colorScheme={chakraUiButtonColorScheme[winner]}
            fontSize="2vmin"
            height="4.5vmin"
            onClick={handleOnClickSaveReplay}
          >
            Save Replay
          </UIButton>
        </ButtonWrapper>
      </ModalContentWrapper>
    </ModalWrapper>
  ) : null;
}

export default WinnerModal;
