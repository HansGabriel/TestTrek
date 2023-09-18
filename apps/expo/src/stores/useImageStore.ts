import { create } from "zustand";

interface ImageStore {
  image: string | undefined;
  setImage: (image: string | undefined) => void;
  resetImage: () => void;
}

const useImageStore = create<ImageStore>((set) => ({
  image: undefined,
  setImage: (image) => set({ image }),
  resetImage: () => set({ image: undefined }),
}));

export default useImageStore;
