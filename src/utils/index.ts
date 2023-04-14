import { BORDER_MIN, BORDER_MAX } from '^/constants';
import { History } from '^/types';

export const isInRange: (row: number, col: number) => boolean = (row: number, col: number) => (
  BORDER_MIN <= row && row <= BORDER_MAX && BORDER_MIN <= col && col <= BORDER_MAX
);

export const exportHistoryToReplay: (historyData: History[]) => void = (historyData: History[]) => {
  const replayData = {
    data: historyData,
  };

  const file: HTMLAnchorElement = document.createElement('a');
  const fileBlob: Blob = new Blob([JSON.stringify(replayData)], { type: 'json' });
  file.href = URL.createObjectURL(fileBlob);
  file.download = 'vite-reversi_replay.json';
  file.click();
};
