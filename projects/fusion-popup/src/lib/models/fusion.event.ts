import type { FusionButtonComponent } from '../fusion-button/fusion-button.component';
import type { FusionPopupComponent } from '../fusion-popup/fusion-popup.component';
import type { FusionButtonProperties } from './fusion.model';

export interface FusionOpenedEvent {
  component: FusionPopupComponent;
}
export interface FusionClosedEvent {
  component: FusionPopupComponent;
}
export interface FusionOptionChangedEvent<T> {
  component: T;
  option: string;
  value: any;
  previous: any;
}
export interface FusionButtonClickEvent {
  component: FusionPopupComponent;
  button: FusionButtonProperties;
}
export interface FusionContentLoadedEvent<T> {
  component: T;
  content: any;
}
export interface FusionDragEndEvent {
  component: FusionPopupComponent;
  position: { x: number; y: number };
  previousPosition: { x: number; y: number };
}
export interface FusionResizeEvent {
  component: FusionPopupComponent;
  width?: number;
  height?: number;
}

export interface FusionContentReadyEvent<T> {
  component: T;
}
export interface FusionClickEvent {
  component: FusionButtonComponent;
  event: MouseEvent | KeyboardEvent;
}
export interface FusionDblClickEvent {
  component: FusionButtonComponent;
  event: MouseEvent;
}
export interface FusionHoverEvent {
  component: FusionButtonComponent;
  event: MouseEvent;
}

export interface FusionStartLoadingEvent<T> {
  component: T;
}
export interface FusionEndLoadingEvent<T> {
  component: T;
}
