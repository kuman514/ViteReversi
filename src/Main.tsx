import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Game from '^/components/pages/Game';
import usePreferenceStore from '^/store/preference';
import { Theme } from '^/types';

const themeBgColor: Record<Theme, string> = {
  [Theme.BRIGHT]: '#FFFFFF',
  [Theme.DARK]: '#1A1A1A',
};

const themeFontColor: Record<Theme, string> = {
  [Theme.BRIGHT]: '#000000',
  [Theme.DARK]: '#FFFFFF',
};

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

const Main: FC<{}> = () => {
  const { theme } = usePreferenceStore();

  return (
    <>
      <GlobalStyle selectedTheme={theme} />
      <Root>
        <Game />
      </Root>
    </>
  );
};

export default Main;
