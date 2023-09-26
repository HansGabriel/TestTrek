import { create } from "zustand";

interface ImageStore {
  image: string | undefined;
  questionImage: string | undefined;
  collectionImage: string | undefined;
  editCollectionImage: string | undefined;
  setImage: (image: string | undefined) => void;
  setCollectionImage: (image: string | undefined) => void;
  setEditCollectionImage: (image: string | undefined) => void;
  setQuestionImage: (image: string | undefined) => void;
  resetImage: () => void;
  resetQuestionImage: () => void;
  resetCollectionImage: () => void;
  resetEditCollectionImage: () => void;
}

const useImageStore = create<ImageStore>((set) => ({
  image: undefined,
  questionImage: undefined,
  collectionImage: undefined,
  editCollectionImage: undefined,
  setImage: (image) => set({ image }),
  setCollectionImage: (image) => set({ collectionImage: image }),
  setEditCollectionImage: (image) => set({ editCollectionImage: image }),
  setQuestionImage: (image) => set({ questionImage: image }),
  resetImage: () => set({ image: undefined }),
  resetQuestionImage: () => set({ questionImage: undefined }),
  resetCollectionImage: () => set({ collectionImage: undefined }),
  resetEditCollectionImage: () => set({ editCollectionImage: undefined }),
}));

export default useImageStore;
