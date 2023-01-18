import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Game from '^/components/pages/Game';
import usePreferenceStore from '^/store/preference';
import { Theme } from '^/types';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
  }
`;

const themeColor: Record<Theme, string> = {
  [Theme.BRIGHT]: '#FFFFFF',
  [Theme.DARK]: '#1a1a1a',
};

interface RootProps {
  selectedTheme: Theme;
}

const Root = styled.div<RootProps>`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ selectedTheme }) => themeColor[selectedTheme]};
`;

const Main: FC<{}> = () => {
  const { theme } = usePreferenceStore();

  return (
    <>
      <GlobalStyle />
      <Root selectedTheme={theme}>
        <Game />
      </Root>
    </>
  );
};

export default Main;
