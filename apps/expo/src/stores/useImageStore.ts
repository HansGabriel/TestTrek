import { create } from "zustand";

interface ImageStore {
  image: string | undefined;
  questionImage: string | undefined;
  setImage: (image: string | undefined) => void;
  setQuestionImage: (image: string | undefined) => void;
  resetImage: () => void;
  resetQuestionImage: () => void;
}

const useImageStore = create<ImageStore>((set) => ({
  image: undefined,
  questionImage: undefined,
  setImage: (image) => set({ image }),
  setQuestionImage: (image) => set({ questionImage: image }),
  resetImage: () => set({ image: undefined }),
  resetQuestionImage: () => set({ questionImage: undefined }),
}));

export default useImageStore;
