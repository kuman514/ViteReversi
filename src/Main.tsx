import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
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
      Hello!
    </Root>
  </>
);

export default Main;
