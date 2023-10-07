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
}

export const useMusicStore = create<MusicStore>((set) => ({
  isMusicPlaying: false,
  toggleMusicPlay: () =>
    set((state) => ({ isMusicPlaying: !state.isMusicPlaying })),
  isEffectsPlaying: false,
  toggleEffectsPlay: () =>
    set((state) => ({ isEffectsPlaying: !state.isEffectsPlaying })),
  isPlayTestScreen: false,
  setIsPlayTestScreen: (state) => set({ isPlayTestScreen: state }),
  isScoreboardScreen: false,
  setIsScoreboardScreen: (state) => set({ isScoreboardScreen: state }),
}));
