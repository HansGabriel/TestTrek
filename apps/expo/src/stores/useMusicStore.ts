import { create } from "zustand";

interface MusicStore {
  isMusicPlaying: boolean;
  toggleMusicPlay: () => void;
  isEffectsPlaying: boolean;
  toggleEffectsPlay: () => void;
  isPlayTestScreen: boolean;
  setIsPlayTestScreen: (state: boolean) => void;
  isScoreboardScreen: boolean;
  setIsScoreboardScreen: (state: boolean) => void;
  isTestHistoryScreen: boolean;
  setIsTestHistoryScreen: (state: boolean) => void;
}

export const useMusicStore = create<MusicStore>((set) => ({
  isMusicPlaying: true,
  toggleMusicPlay: () =>
    set((state) => ({ isMusicPlaying: !state.isMusicPlaying })),
  isEffectsPlaying: true,
  toggleEffectsPlay: () =>
    set((state) => ({ isEffectsPlaying: !state.isEffectsPlaying })),
  isPlayTestScreen: false,
  setIsPlayTestScreen: (state) => set({ isPlayTestScreen: state }),
  isScoreboardScreen: false,
  setIsScoreboardScreen: (state) => set({ isScoreboardScreen: state }),
  isTestHistoryScreen: false,
  setIsTestHistoryScreen: (state) => set({ isTestHistoryScreen: state }),
}));
