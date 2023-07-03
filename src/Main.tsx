import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Game from '^/components/pages/Game';
import { usePreferenceStore } from '^/store';
import { Theme } from '^/types';
import { themeBgColor, themeFontColor } from '^/constants';

interface GlobalProps {
  selectedTheme: Theme;
}

const GlobalStyle = createGlobalStyle<GlobalProps>`
  * {
    margin: 0;
    box-sizing: border-box;
  }

  :root {
    --theme-bg-color: ${({ selectedTheme }) => themeBgColor[selectedTheme]};
    --theme-font-color: ${({ selectedTheme }) => themeFontColor[selectedTheme]};
  }
`;

const Root = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--theme-bg-color);
`;

function Main() {
  const { theme } = usePreferenceStore();

  return (
    <>
      <GlobalStyle selectedTheme={theme} />
      <Root>
        <Game />
      </Root>
    </>
  );
}

export default Main;
