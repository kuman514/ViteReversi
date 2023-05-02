import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { ReplayState, ReplayStore } from '^/types';

function resetReplayState(): ReplayState {
  return {
    isReplaying: false,
    replayPage: 0,
    replayLength: 0,
    replayHistory: [],
  };
}

const useReplayStore = create<ReplayStore>()(
  devtools(
    (set) => ({
      ...resetReplayState(),
      loadReplay: (replayHistory) => set(() => ({
        ...resetReplayState(),
        isReplaying: true,
        replayHistory,
        replayLength: replayHistory.length,
      })),
      prevPage: () => set((replayStore) => {
        const { isReplaying, replayPage } = replayStore;
        if (!isReplaying || replayPage <= 0) {
          return {
            ...replayStore,
          };
        }

        const newReplayPage = replayPage - 1;
        return {
          ...replayStore,
          replayPage: newReplayPage,
        };
      }),
      nextPage: () => set((replayStore) => {
        const { isReplaying, replayPage, replayLength } = replayStore;
        const newReplayPage = replayPage + 1;
        if (!isReplaying || newReplayPage >= replayLength) {
          return {
            ...replayStore,
          };
        }

        return {
          ...replayStore,
          replayPage: newReplayPage,
        };
      }),
      clearReplay: () => set(() => resetReplayState()),
    }),
  ),
);

export default useReplayStore;
