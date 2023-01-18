import { Stack } from '@chakra-ui/react';
import React, { FC } from 'react';
import styled from 'styled-components';
import UIButton from '^/components/atoms/UIButton';
import { useGameStore } from '^/store';
import usePreferenceStore from '^/store/preference';
import {
  ChakraUIButtonColorScheme, ChakraUIButtonSize, ChakraUIButtonVariant, Theme,
} from '^/types';

const Root = styled.div`
  margin-top: 1vmin;
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
          buttonSize={ChakraUIButtonSize.SMALL}
          variant={ChakraUIButtonVariant.OUTLINE}
          colorScheme={ChakraUIButtonColorScheme.RED}
          fontSize="2vmin"
          onClick={undo}
        >
          Undo
        </UIButton>
        <UIButton
          buttonSize={ChakraUIButtonSize.SMALL}
          variant={ChakraUIButtonVariant.OUTLINE}
          colorScheme={ChakraUIButtonColorScheme.RED}
          fontSize="2vmin"
          onClick={reset}
        >
          Reset
        </UIButton>
        <UIButton
          buttonSize={ChakraUIButtonSize.SMALL}
          variant={ChakraUIButtonVariant.OUTLINE}
          colorScheme={ChakraUIButtonColorScheme.RED}
          fontSize="2vmin"
          onClick={handleOnClickChangeTheme}
        >
          Change Theme
        </UIButton>
      </Stack>
    </Root>
  );
};

export default UIButtonWrapper;
