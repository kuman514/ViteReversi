import { Stack } from '@chakra-ui/react';
import React, { FC } from 'react';
import styled from 'styled-components';
import UIButton from '^/components/atoms/UIButton';
import { useGameStore, usePreferenceStore } from '^/store';
import {
  ChakraUIButtonColorScheme, ChakraUIButtonSize, ChakraUIButtonVariant, Theme,
} from '^/types';

const commonUIButtonStyleProps = {
  buttonSize: ChakraUIButtonSize.SMALL,
  variant: ChakraUIButtonVariant.OUTLINE,
  colorScheme: ChakraUIButtonColorScheme.RED,
  fontSize: '2vmin',
  height: '4.5vmin',
};

const Root = styled.div`
`;

const UIButtonWrapper: FC<{}> = () => {
  const { undo, reset } = useGameStore();

  const { theme, setTheme } = usePreferenceStore();
  const handleOnClickChangeTheme: () => void = () => {
    switch (theme) {
      case Theme.BRIGHT:
        setTheme(Theme.DARK);
        break;
      case Theme.DARK:
        setTheme(Theme.BRIGHT);
        break;
      default:
        setTheme(Theme.BRIGHT);
        break;
    }
  };

  return (
    <Root>
      <Stack direction="row" spacing={4} align="center">
        <UIButton
          {...commonUIButtonStyleProps}
          onClick={undo}
        >
          Undo
        </UIButton>
        <UIButton
          {...commonUIButtonStyleProps}
          onClick={reset}
        >
          Reset
        </UIButton>
        <UIButton
          {...commonUIButtonStyleProps}
          onClick={handleOnClickChangeTheme}
        >
          Change Theme
        </UIButton>
      </Stack>
    </Root>
  );
};

export default UIButtonWrapper;
