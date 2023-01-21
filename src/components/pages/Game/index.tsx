import React, { FC } from 'react';
import styled from 'styled-components';
import Title from '^/components/atoms/Title';
import WinnerModal from '^/components/molecules/WinnerModal';
import Board from '^/components/organisms/Board';
import BottomUIWrapper from '^/components/organisms/BottomUIWrapper';

const Root = styled.div`
  width: 100vmin;
  height: 100vmin;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Game: FC<{}> = () => (
  <Root>
    <Title />
    <Board />
    <BottomUIWrapper />
    <WinnerModal />
  </Root>
);

export default Game;
