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

const chakraUiButtonColorScheme: Partial<Record<Who, ChakraUIButtonColorScheme>> = {
  [Who.PLAYER_1]: ChakraUIButtonColorScheme.ORANGE,
  [Who.PLAYER_2]: ChakraUIButtonColorScheme.BLUE,
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
`;

interface Props {
  title?: string;
  winner?: Who;
}

const WinnerModalTitle: FC<Props> = ({
  title, winner,
}) => {
  const { reset } = useGameStore();
  if (!winner) {
    return null;
  }

  return (
    <Root
      fontColor={playerPallete[winner]}
      outerGlowColor={playerPallete[winner]}
    >
      {title}
      <UIButton
        buttonSize={ChakraUIButtonSize.SMALL}
        variant={ChakraUIButtonVariant.SOLID}
        colorScheme={chakraUiButtonColorScheme[winner]}
        fontSize="2vmin"
        onClick={reset}
      >
        Reset
      </UIButton>
    </Root>
  );
};

export default WinnerModalTitle;
