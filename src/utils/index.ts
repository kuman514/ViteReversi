import { BORDER_MIN, BORDER_MAX } from '^/constants';
import { History } from '^/types';

export function isInRange(row: number, col: number): boolean {
  return (
    BORDER_MIN <= row && row <= BORDER_MAX && BORDER_MIN <= col && col <= BORDER_MAX
  );
}

export function exportHistoryToReplay(historyData: History[]): void {
  const replayData = {
    data: historyData,
  };

  const file: HTMLAnchorElement = document.createElement('a');
  const fileBlob: Blob = new Blob([JSON.stringify(replayData)], { type: 'json' });
  file.href = URL.createObjectURL(fileBlob);
  file.download = 'vite-reversi_replay.json';
  file.click();
}
