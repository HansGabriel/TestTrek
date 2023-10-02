import { create } from "zustand";

type State = {
  isVisible: boolean;
  toggle: () => void;
};

const useToggleImageStore = create<State>((set) => ({
  isVisible: true,
  toggle: () => set((state) => ({ isVisible: !state.isVisible })),
}));

export default useToggleImageStore;
