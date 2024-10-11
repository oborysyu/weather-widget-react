export interface ISize {
  width: string;
  height: string;
}

export interface SizeState {
  selectedSize: string;
  sizeStyle: ISize;
  updateSize: (widgetSize: string) => void;
}
