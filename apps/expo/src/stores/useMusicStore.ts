import { create } from "zustand";

interface MusicStore {
  isMusicPlaying: boolean;
  toggleMusicPlay: () => void;
  isEffectsPlaying: boolean;
  toggleEffectsPlay: () => void;
}

export const useMusicStore = create<MusicStore>((set) => ({
  isMusicPlaying: false,
  toggleMusicPlay: () =>
    set((state) => ({ isMusicPlaying: !state.isMusicPlaying })),
  isEffectsPlaying: false,
  toggleEffectsPlay: () =>
    set((state) => ({ isEffectsPlaying: !state.isEffectsPlaying })),
}));
