import { create } from "zustand";

interface ImageStore {
  image: string | undefined;
  setImage: (image: string | undefined) => void;
}

const useImageStore = create<ImageStore>((set) => ({
  image: undefined,
  setImage: (image) => set({ image }),
}));

export default useImageStore;
