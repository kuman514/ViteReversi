import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Game from './components/pages/Game';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
  }
`;

const Root = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main: FC<{}> = () => (
  <>
    <GlobalStyle />
    <Root>
      <Game />
    </Root>
  </>
);

export default Main;
