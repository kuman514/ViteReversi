import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useToast } from '@chakra-ui/react';

import Title from '^/components/atoms/Title';
import WinnerModal from '^/components/molecules/WinnerModal';
import Board from '^/components/organisms/Board';
import BottomUIWrapper from '^/components/organisms/BottomUIWrapper';
import { useGameStore } from '^/store';

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
        title: 'Pass',
        description: `Current turn: Player ${history[history.length - 1].turnHistory}`,
        duration: 1500,
        isClosable: true,
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
