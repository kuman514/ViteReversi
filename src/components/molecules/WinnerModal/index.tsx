import React, { FC } from 'react';
import styled from 'styled-components';
import ModalBackground from '^/components/atoms/ModalBackground';
import ModalWrapper from '^/components/atoms/ModalWrapper';
import UIButton from '^/components/atoms/UIButton';
import WinnerModalTitle from '^/components/atoms/WinnerModalTitle';
import { useGameStore } from '^/store';
import {
  ChakraUIButtonColorScheme,
  ChakraUIButtonSize,
  ChakraUIButtonVariant,
  Who,
} from '^/types';
import PieceCountWrapper from '../PieceCountWrapper';

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

const WinnerModal: FC = () => {
  const {
    winner, isContinuable, undo, reset,
  } = useGameStore();
  const whoIsWinner: string = (winner !== Who.EMPTY)
    ? `Player ${winner} Wins!`
    : 'Draw!';

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
            onClick={undo}
          >
            Undo
          </UIButton>
          <UIButton
            buttonSize={ChakraUIButtonSize.SMALL}
            variant={ChakraUIButtonVariant.SOLID}
            colorScheme={chakraUiButtonColorScheme[winner]}
            fontSize="2vmin"
            onClick={reset}
          >
            Reset
          </UIButton>
        </ButtonWrapper>
      </ModalContentWrapper>
    </ModalWrapper>
  ) : null;
};

export default WinnerModal;
