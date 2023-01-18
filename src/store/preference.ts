import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { PreferenceStore, Theme } from '^/types';

const usePreferenceStore = create<PreferenceStore>()(
  devtools(
    persist(
      (set) => ({
        theme: Theme.BRIGHT,
        setTheme: (newTheme) => set(() => ({ theme: newTheme })),
      }),
      {
        name: 'Preference',
      },
    ),
  ),
);

export default usePreferenceStore;
