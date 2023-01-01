import React, { FC } from 'react';
import styled from 'styled-components';
import Title from '^/components/atoms/Title';
import UIButtonWrapper from '^/components/molecules/UIButtonWrapper';
import Board from '^/components/organisms/Board';

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
    <Title>Vite Reversi</Title>
    <Board />
    <UIButtonWrapper />
  </Root>
);

export default Game;