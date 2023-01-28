import React, { FC } from 'react';
import styled from 'styled-components';
import { playerPallete } from '^/constants';
import { Who } from '^/types';

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

interface Props {
  title?: string;
  winner?: Who;
}

const WinnerModalTitle: FC<Props> = ({
  title, winner,
}) => {
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
    </Root>
  );
};

export default WinnerModalTitle;
