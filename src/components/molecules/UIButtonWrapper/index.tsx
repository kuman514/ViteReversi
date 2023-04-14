import { Stack } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import UIButton from '^/components/atoms/UIButton';
import { LENGTH } from '^/constants';
import { useGameStore, usePreferenceStore, useReplayStore } from '^/store';
import {
  ChakraUIButtonColorScheme,
  ChakraUIButtonSize,
  ChakraUIButtonVariant,
  Theme,
  History,
  Who,
} from '^/types';
import { exportHistoryToReplay, isInRange } from '^/utils';

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
  const {
    undo,
    reset,
    history: { length: historyLength },
  } = useGameStore();

  const {
    isReplaying,
    prevPage,
    nextPage,
    clearReplay,
  } = useReplayStore();

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

  const handleOnClickLoadReplay: () => void = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/json';
    fileInput.addEventListener('change', (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        const { files } = event.target;
        if (!files || files.length <= 0) {
          return;
        }

        const reader = new FileReader();
        reader.addEventListener('load', () => {
          const { data: parseData }: { data: History[] } = JSON.parse(reader.result as string);
          if (!parseData) {
            return;
          }

          try {
            const isValidData = parseData.every((page, index) => (
              page.boardStateHistory.length === LENGTH && page.boardStateHistory.every(
                (row) => row.length === LENGTH && row.every(
                  (col) => col === Who.EMPTY
                    || col === Who.PLAYER_1
                    || col === Who.PLAYER_2,
                ),
              )
              && page.isAvailableHistory.length === LENGTH && page.isAvailableHistory.every(
                (row) => row.length === LENGTH && row.every(
                  (col) => typeof col === 'boolean',
                ),
              )
              && (
                index > 0
                  ? isInRange(page.coordHistory.row, page.coordHistory.col)
                  : page.coordHistory.row === -1 && page.coordHistory.col === -1
              )
            ));

            if (isValidData) {
              useReplayStore.getState().loadReplay(parseData);
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
          }
        });

        reader.readAsText(files[0]);
      }
    });

    fileInput.click();
  };

  const handleOnClickSaveReplay: () => void = () => {
    const { history } = useGameStore.getState();
    exportHistoryToReplay(history);
  };

  const saveLoadReplayButton: ReactNode = historyLength <= 1 ? (
    <UIButton
      {...commonUIButtonStyleProps}
      onClick={handleOnClickLoadReplay}
    >
      Load Replay
    </UIButton>
  ) : (
    <UIButton
      {...commonUIButtonStyleProps}
      onClick={handleOnClickSaveReplay}
    >
      Save Replay
    </UIButton>
  );

  const gameUILayout: ReactNode = (
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
      {saveLoadReplayButton}
    </Stack>
  );

  const replayUILayout: ReactNode = (
    <Stack direction="row" spacing={4} align="center">
      <UIButton
        {...commonUIButtonStyleProps}
        onClick={prevPage}
      >
        Prev
      </UIButton>
      <UIButton
        {...commonUIButtonStyleProps}
        onClick={nextPage}
      >
        Next
      </UIButton>
      <UIButton
        {...commonUIButtonStyleProps}
        onClick={handleOnClickChangeTheme}
      >
        Change Theme
      </UIButton>
      <UIButton
        {...commonUIButtonStyleProps}
        onClick={clearReplay}
      >
        Exit Replay
      </UIButton>
    </Stack>
  );

  return (
    <Root>
      {isReplaying ? replayUILayout : gameUILayout}
    </Root>
  );
};

export default UIButtonWrapper;
