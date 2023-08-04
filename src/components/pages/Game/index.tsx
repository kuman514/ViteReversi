import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Box, useToast } from '@chakra-ui/react';

import Title from '^/components/atoms/Title';
import WinnerModal from '^/components/molecules/WinnerModal';
import Board from '^/components/organisms/Board';
import BottomUIWrapper from '^/components/organisms/BottomUIWrapper';
import { useGameStore } from '^/store';
import { playerPallete, themeBgColor } from '^/constants';
import { Theme } from '^/types';

const PassTitle = styled.h1`
  font-weight: bold;
  font-size: 2.5vmin;
`;

const Root = styled.div`
  width: 100vmin;
  height: 100vmin;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Game() {
  const toast = useToast();

  const isContinuable = useGameStore((state) => state.isContinuable);
  const history = useGameStore((state) => state.history);
  useEffect(() => {
    if (!isContinuable || history.length <= 2) {
      return;
    }

    if (history[history.length - 2].turnHistory === history[history.length - 1].turnHistory) {
      toast({
        duration: 1500,
        render: () => (
          <Box
            color={themeBgColor[Theme.BRIGHT]}
            p={3}
            bg={playerPallete[history[history.length - 1].turnHistory]}
            borderRadius={5}
          >
            <PassTitle>Pass!</PassTitle>
            {`Current turn: Player ${history[history.length - 1].turnHistory}`}
          </Box>
        ),
      });
    }
  }, [history.length, isContinuable]);

  return (
    <Root>
      <Title />
      <Board />
      <BottomUIWrapper />
      <WinnerModal />
    </Root>
  );
}

export default Game;
