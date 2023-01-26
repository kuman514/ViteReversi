import React, { FC } from 'react';
import styled from 'styled-components';
import { playerPallete } from '^/constants';
import { useGameStore } from '^/store';
import {
  ChakraUIButtonColorScheme,
  ChakraUIButtonSize,
  ChakraUIButtonVariant,
  Who,
} from '^/types';
import UIButton from '../UIButton';

const chakraUiButtonColorScheme: Record<Who, ChakraUIButtonColorScheme> = {
  [Who.PLAYER_1]: ChakraUIButtonColorScheme.ORANGE,
  [Who.PLAYER_2]: ChakraUIButtonColorScheme.BLUE,
  [Who.EMPTY]: ChakraUIButtonColorScheme.TEAL,
};

interface RootProps {
  fontColor?: string;
  outerGlowColor?: string;
}

const Root = styled.div<RootProps>`
  font-size: 9vmin;
  color: ${({ fontColor }) => fontColor};
  text-shadow: 0px 0px 20px ${({ outerGlowColor }) => outerGlowColor};
  z-index: 1001;

  display: flex;
  flex-direction: column;

  & > span {
    animation: WinnerEffectAnimation ease-in-out 1500ms;
    animation-iteration-count: infinite;
    @keyframes WinnerEffectAnimation {
      0% {
        text-shadow: 0px 0px 0px ${({ outerGlowColor }) => outerGlowColor};
      }
      50% {
        text-shadow: 0px 0px 20px ${({ outerGlowColor }) => outerGlowColor};
      }
      100% {
        text-shadow: 0px 0px 0px ${({ outerGlowColor }) => outerGlowColor};
      }
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 2vmin;
  width: 100%;
`;

interface Props {
  title?: string;
  winner?: Who;
}

const WinnerModalTitle: FC<Props> = ({
  title, winner,
}) => {
  const { undo, reset } = useGameStore();
  if (winner === undefined) {
    return null;
  }

  return (
    <Root
      fontColor={playerPallete[winner]}
      outerGlowColor={playerPallete[winner]}
    >
      <span>
        {title}
      </span>
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
    </Root>
  );
};

export default WinnerModalTitle;
