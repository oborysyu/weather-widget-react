import { create } from "zustand";
import { ISize, SizeState } from "../types";
import { sizes } from "../config";

const useSizeStore = create<SizeState>((set) => ({
  selectedSize: import.meta.env.VITE_PUBLIC_WIDGET_START_SIZE,
  sizeStyle: sizes[import.meta.env.VITE_PUBLIC_WIDGET_START_SIZE] as ISize,
  updateSize: (newSize) =>
    set(() => ({ sizeStyle: sizes[newSize], selectedSize: newSize })),
}));

export default useSizeStore;
