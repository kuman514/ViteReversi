import { Stack } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import BottomUIButton from '^/components/atoms/BottomUIButton';
import { LENGTH } from '^/constants';
import { useGameStore, usePreferenceStore, useReplayStore } from '^/store';
import { Theme, History, Who } from '^/types';
import { isInRange } from '^/utils';

const Root = styled.div`
`;

function UIButtonWrapper() {
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

  const saveLoadReplayButton: ReactNode = historyLength <= 1 ? (
    <BottomUIButton onClick={handleOnClickLoadReplay}>
      Load Replay
    </BottomUIButton>
  ) : null;

  const gameUILayout: ReactNode = (
    <Stack direction="row" spacing={4} align="center">
      <BottomUIButton onClick={undo}>
        Undo
      </BottomUIButton>
      <BottomUIButton onClick={reset}>
        Reset
      </BottomUIButton>
      <BottomUIButton onClick={handleOnClickChangeTheme}>
        Change Theme
      </BottomUIButton>
      {saveLoadReplayButton}
    </Stack>
  );

  const replayUILayout: ReactNode = (
    <Stack direction="row" spacing={4} align="center">
      <BottomUIButton onClick={prevPage}>
        Prev
      </BottomUIButton>
      <BottomUIButton onClick={nextPage}>
        Next
      </BottomUIButton>
      <BottomUIButton onClick={handleOnClickChangeTheme}>
        Change Theme
      </BottomUIButton>
      <BottomUIButton onClick={clearReplay}>
        Exit Replay
      </BottomUIButton>
    </Stack>
  );

  return (
    <Root>
      {isReplaying ? replayUILayout : gameUILayout}
    </Root>
  );
}

export default UIButtonWrapper;
