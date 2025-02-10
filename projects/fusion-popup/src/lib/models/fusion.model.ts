import type { TemplateRef } from '@angular/core';

/**
 * Loader Modes
 */
export type FusionLoaderMode = 'spinner' | 'ajaxInner' | 'ajaxCircule';

/**
 * Loader Event Data
 */

export type FusionLoderSize = 'small' | 'medium' | 'large';
export interface FusionLoaderOptions {
  mode?: FusionLoaderMode;
  size?: FusionLoderSize;
  color?: string;
}

// popup
export interface FusionPopupProperties {
  // Visibility control
  visible?: boolean; // Controls whether the popup is visible or hidden.

  // Popup position settings
  position?: FusionPopupPositionType; // Defines the popup's position within the viewport (e.g., 'center-center', 'top-left', etc.)
  positionXY?: { x: number; y: number }; // Specific x and y coordinates for the popup's position.

  // Content settings
  component?: any; // The dynamic component to be displayed inside the popup.
  customTemplate?: TemplateRef<any>; // A custom template to be rendered inside the popup.
  componentInputs?: Record<string, any>; // Inputs to be passed to the dynamic component.

  // Animation settings
  animation?: FusionPopupAnimationType; // Defines the animation type when showing or hiding the popup.

  // Size and layout options
  width?: string; // Width of the popup (in pixels).
  height?: string; // Height of the popup (in pixels).
  maxWidth?: string; // Maximum width (can be in px or percentage).
  minWidth?: string; // Minimum width (can be in px or percentage).
  maxHeight?: string; // Maximum height (can be in px or percentage).
  minHeight?: string; // Minimum height (can be in px or percentage).

  // Loading state
  loading?: boolean; // Indicates if the popup is in a loading state.

  // Interaction control options
  dragEnabled?: boolean; // Determines if the popup is dragEnabled.
  resizeEnabled?: boolean; // Determines if the popup is resizeEnabled.
  shading?: boolean; // Defines whether the popup has a background shading (overlay).
  shadingColor?: string; // The color of the shading overlay (default: 'rgba(0, 0, 0, 0.1)').

  // Target element settings for positioning
  targetElemntId?: string; // ID of the target element for positioning the popup relative to it.

  // Title of the popup
  title?: string; // Title of the popup.
  buttons?: FusionButtonProperties[];
  showFooter?: boolean;
  showHeader?: boolean;
  showCloseButton?: boolean;
}

export type FusionPopupAnimationType =
  | 'fade'
  | 'fade-in'
  | 'fade-out'
  | 'pop'
  | 'rotate'
  | 'scale'
  | 'slide-left'
  | 'slide-left-in'
  | 'slide-right'
  | 'slide-up'
  | 'slide-down'
  | 'flip-vertical'
  | 'flip-horizontal'
  | 'rotate-left'
  | 'rotate-right'
  | 'rotate-in'
  | 'rotate-top-left'
  | 'rotate-top-right'
  | 'rotate-bottom-left'
  | 'rotate-bottom-right';
export type FusionPopupPositionType =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'left-center'
  | 'right-center'
  | 'center-center'
  | 'target'
  | 'custom';

/**buttons models  */
export type FusionButtonStylingMode = 'contained' | 'outlined';
export type FusionButtonType =
  | 'danger'
  | 'info'
  | 'warning'
  | 'success'
  | 'default';
export type FusionButtonSize = 'small' | 'medium' | 'large' | 'custom';
export interface FusionButtonProperties {
  id: string;
  text?: string;
  stylingMode?: 'contained' | 'outlined';
  icon?: string;
  disabled?: boolean;
  type?: 'danger' | 'info' | 'warning' | 'success' | 'default';
  position?: 'left' | 'right' | 'center';
  visible?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  loading?: boolean;
  loaderOptions?: FusionButtonLoaderOptions;
  customTemplate?: TemplateRef<any>;
  size?: FusionButtonSize;
  fullWidth?: boolean;
}

export type FusionButtonLoaderOptions = FusionLoaderOptions;
