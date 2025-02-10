import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Input,
  TemplateRef,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  Inject,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {
  FusionButtonClickEvent,
  FusionClosedEvent,
  FusionDragEndEvent,
  FusionOpenedEvent,
  FusionOptionChangedEvent,
  FusionResizeEvent,
  FusionContentLoadedEvent,
} from '../models/fusion.event';
import {
  FusionButtonProperties,
  FusionPopupAnimationType,
  FusionPopupPositionType,
} from '../models/fusion.model';
import { FusionLoaderComponent } from '../fusion-loader/fusion-loader.component';
import { FusionButtonComponent } from '../fusion-button/fusion-button.component';
import { FusionPopupService } from '../fusion-popup.service';
@Component({
  selector: 'fusion-popup',
  templateUrl: './fusion-popup.component.html',
  styleUrls: ['./fusion-popup.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    FusionLoaderComponent,
    FusionButtonComponent,
  ],
})
export class FusionPopupComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  private cdr = inject(ChangeDetectorRef);
  private fusionPopupService = inject(FusionPopupService);

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onOpened = new EventEmitter<FusionOpenedEvent>();
  @Output() onClosed = new EventEmitter<FusionClosedEvent>();
  @Output() onOptionChanged = new EventEmitter<
    FusionOptionChangedEvent<FusionPopupComponent>
  >();
  @Output() onContentLoaded = new EventEmitter<
    FusionContentLoadedEvent<FusionPopupComponent>
  >();
  @Output() onDrag = new EventEmitter<FusionDragEndEvent>();
  @Output() onResize = new EventEmitter<FusionResizeEvent>();
  @Output() onButtonClick = new EventEmitter<FusionButtonClickEvent>();

  @Input() set visible(value: boolean) {
    if (value !== this._visible) {
      this.emitChangedOption('visible', value, this._visible);
      this._visible = value;
      this.visibleChange.emit(value);
      if (value) this.onOpened.emit({ component: this });
      else this.onClosed.emit({ component: this });
    }
  }
  get visible(): boolean {
    return this._visible;
  }
  @Input() set zIndex(value: number) {
    if (value !== this._zIndex) {
      this.emitChangedOption('zIndex', value, this._zIndex);
      this._zIndex = value;

      if (value) this.onOpened.emit({ component: this });
      else this.onClosed.emit({ component: this });
    }
  }
  get zIndex(): number {
    return this._zIndex;
  }

  @Input() set position(value: FusionPopupPositionType) {
    if (value !== this._position) {
      this.emitChangedOption('position', value, this._position);
      this._position = value;
    }
  }

  get position(): FusionPopupPositionType {
    return this._position;
  }
  @Input() set id(value: string) {
    if (value !== this._id) {
      this.emitChangedOption('id', value, this._id);
      this._id = value;
    }
  }
  get id(): string {
    return this._id;
  }

  @Input() set component(value: any) {
    if (value !== this._component) {
      this.emitChangedOption('component', value, this._component);
      this._component = value;
    }
  }
  get component(): any | undefined {
    return this._component;
  }

  @Input() set customTemplate(value: TemplateRef<any> | undefined) {
    if (value !== this._customTemplate) {
      this.emitChangedOption('customTemplate', value, this._customTemplate);
      this._customTemplate = value;
    }
  }
  get customTemplate(): TemplateRef<any> | undefined {
    return this._customTemplate;
  }

  @Input() set componentInputs(value: Record<string, unknown>) {
    if (value !== this.componentInputs) {
      this.emitChangedOption('componentInputs', value, this._componentInputs);
      this._componentInputs = value;
    }
  }
  get componentInputs(): Record<string, unknown> | undefined {
    return this._componentInputs;
  }

  @Input() set targetElemntId(value: string) {
    if (value !== this._targetElemntId) {
      this.emitChangedOption('targetElemntId', value, this._targetElemntId);
      this._targetElemntId = value;
    }
  }
  get targetElemntId(): string {
    return this._targetElemntId;
  }

  @Input() set title(value: string | undefined) {
    if (value !== this._title) {
      this.emitChangedOption('title', value, this._title);
      this._title = value;
    }
  }
  get title(): string | undefined {
    return this._title;
  }

  @Input() set dragEnabled(value: boolean) {
    if (value !== this._dragEnabled) {
      this.emitChangedOption('dragEnabled', value, this._dragEnabled);
      this._dragEnabled = value;
    }
  }
  get dragEnabled(): boolean {
    return this._dragEnabled;
  }

  @Input() set resizeEnabled(value: boolean) {
    if (value !== this._resizable) {
      this.emitChangedOption('resizeEnabled', value, this._resizable);
      this._resizable = value;
    }
  }
  get resizeEnabled(): boolean {
    return this._resizable;
  }

  @Input() set width(value: string) {
    if (value !== this._width) {
      this.emitChangedOption('width', value, this._width);
      this._width = value;
    }
  }
  get width(): string {
    return this._width;
  }

  @Input() set height(value: string) {
    if (value !== this._height) {
      this.emitChangedOption('height', value, this._height);
      this._height = value;
    }
  }
  get height(): string {
    return this._height;
  }

  @Input() set maxWidth(value: string | undefined) {
    if (value !== this._maxWidth) {
      this.emitChangedOption('maxWidth', value, this._maxWidth);
      this._maxWidth = value;
    }
  }
  get maxWidth(): string | undefined {
    return this._maxWidth;
  }

  @Input() set minWidth(value: string) {
    if (value !== this._minWidth) {
      this.emitChangedOption('minWidth', value, this._minWidth);
      this._minWidth = value;
    }
  }
  get minWidth(): string {
    return this._minWidth;
  }

  @Input() set loading(value: boolean) {
    if (value !== this._loading) {
      this.emitChangedOption('loading', value, this._loading);
      this._loading = value;
    }
  }
  get loading(): boolean {
    return this._loading;
  }

  @Input() set maxHeight(value: string) {
    if (value !== this._maxHeight) {
      this.emitChangedOption('maxHeight', value, this._maxHeight);
      this._maxHeight = value;
    }
  }
  get maxHeight(): string {
    return this._maxHeight;
  }

  @Input() set minHeight(value: string) {
    if (value !== this._minHeight) {
      this.emitChangedOption('minHeight', value, this._minHeight);
      this._minHeight = value;
    }
  }
  get minHeight(): string {
    return this._minHeight;
  }

  @Input() set shading(value: boolean) {
    if (value !== this._shading) {
      this.emitChangedOption('shading', value, this._shading);
      this._shading = value;
    }
  }
  get shading(): boolean {
    return this._shading;
  }
  @Input() set showHeader(value: boolean) {
    if (value !== this.showHeader) {
      this.emitChangedOption('showHeader', value, this._showHeader);
      this._showHeader = value;
    }
  }
  get showHeader(): boolean {
    return this._showHeader;
  }
  @Input() set showFooter(value: boolean) {
    if (value !== this.showFooter) {
      this.emitChangedOption('showFooter', value, this._showFooter);
      this._showFooter = value;
    }
  }
  get showFooter(): boolean {
    return this._showFooter;
  }
  @Input() set showCloseButton(value: boolean) {
    if (value !== this.showCloseButton) {
      this.emitChangedOption('showCloseButton', value, this._showCloseButton);
      this._showCloseButton = value;
    }
  }
  get showCloseButton(): boolean {
    return this._showCloseButton;
  }

  @Input() set shadingColor(value: string) {
    if (value !== this.shadingColor) {
      this.emitChangedOption('shadingColor', value, this._shadingColor);
      this._shadingColor = value;
    }
  }
  get shadingColor(): string {
    return this._shadingColor;
  }
  @Input() set buttons(value: FusionButtonProperties[]) {
    if (value !== this._buttons) {
      this.emitChangedOption('buttons', value, this._buttons);

      this._buttons = value.map((button) => {
        if (!button.position) {
          button.position = 'right';
        }
        if (button.visible === undefined) {
          button.visible = true;
        }
        return button;
      });
    }
  }
  get buttons(): FusionButtonProperties[] {
    return this._buttons;
  }

  @Input() set animation(value: FusionPopupAnimationType) {
    if (value !== this._animation) {
      this.emitChangedOption('animation', value, this._animation);
      this._animation = value;
    }
  }
  get animation(): FusionPopupAnimationType {
    return this._animation;
  }

  @Input() set positionXY(value: { x: number; y: number }) {
    if (value !== this._positionXY) {
      this.emitChangedOption('positionXY', value, this._positionXY);
      this._positionXY = value;
    }
  }
  get positionXY(): { x: number; y: number } {
    return this._positionXY;
  }

  private _visible: boolean = default_popup_properties.visible;
  private _zIndex: number = default_popup_properties.zIndex;
  private _id!: string;
  private _position: FusionPopupPositionType =
    default_popup_properties.position;
  private _component?: any;
  private _customTemplate?: TemplateRef<any>;
  private _componentInputs!: Record<string, unknown>;
  private _targetElemntId!: string;
  private _title: string | undefined = default_popup_properties.title;
  private _dragEnabled = default_popup_properties.dragEnabled;
  private _resizable = default_popup_properties.resizeEnabled;
  private _width: string = default_popup_properties.width;
  private _height: string = default_popup_properties.height;
  private _maxWidth: string | undefined = default_popup_properties.maxWidth;
  private _minWidth: string = default_popup_properties.minWidth;
  private _loading: boolean = default_popup_properties.loading;
  private _maxHeight: string = default_popup_properties.maxHeight;
  private _minHeight: string = default_popup_properties.minHeight;
  private _shading: boolean = default_popup_properties.shading;
  private _showHeader: boolean = default_popup_properties.showHeader;
  private _showFooter: boolean = default_popup_properties.showFooter;
  private _showCloseButton: boolean = default_popup_properties.showCloseButton;
  private _shadingColor: string = default_popup_properties.shadingColor;
  private _animation: FusionPopupAnimationType =
    default_popup_properties.animation as FusionPopupAnimationType;
  private _positionXY = default_popup_properties.positionXY;
  private _buttons: FusionButtonProperties[] = default_popup_properties.buttons;
  private _isComponentReady = false;

  ngAfterViewInit(): void {
    this._isComponentReady = true;
    this.onContentLoaded.emit({ component: this, content: this.component });
    isPlatformBrowser(this.platformId) && this.updatePosition();
  }

  private updatePosition(): void {
    const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollLeft =
      document.documentElement.scrollLeft || document.body.scrollLeft;

    const positions: Record<string, () => void> = {
      'center-center': () => {
        this.positionXY = {
          x: (viewportWidth - this.getDimensions(this.width)) / 2 + scrollLeft,
          y: (viewportHeight - this.getDimensions(this.height)) / 2 + scrollTop,
        };
      },
      'top-left': () => {
        this.positionXY = { x: 10 + scrollLeft, y: 10 + scrollTop };
      },
      'top-right': () => {
        this.positionXY = {
          x: viewportWidth - this.getDimensions(this.width) - 10 + scrollLeft,
          y: 10 + scrollTop,
        };
      },
      'bottom-left': () => {
        this.positionXY = {
          x: 10 + scrollLeft,
          y: viewportHeight - this.getDimensions(this.height) - 10 + scrollTop,
        };
      },
      'bottom-right': () => {
        this.positionXY = {
          x: viewportWidth - this.getDimensions(this.width) - 10 + scrollLeft,
          y: viewportHeight - this.getDimensions(this.height) - 10 + scrollTop,
        };
      },
      'left-center': () => {
        this.positionXY = {
          x: 10 + scrollLeft,
          y: (viewportHeight - this.getDimensions(this.height)) / 2 + scrollTop,
        };
      },
      target: () => {
        const targetElement = document.getElementById(this.targetElemntId);
        if (targetElement) {
          const { left, top } = targetElement.getBoundingClientRect();
          this.positionXY = { x: left + scrollLeft, y: top + scrollTop };
        }
      },
    };

    positions[this._position]?.();
    this.cdr.detectChanges();
  }

  private getDimensions(dim: string): number {
    // Extract the numeric part and unit from the string
    const match = dim.match(/^(-?\d*\.?\d+)(px|%|em|rem|vh|vw|vmin|vmax)?$/);

    if (!match) {
      // If the input is invalid, return 0 or throw an error
      console.warn(`Invalid dimension: ${dim}`);
      return 0;
    }

    const value = parseFloat(match[1]); // Extract the numeric value
    const unit = match[2]; // Extract the unit (if any)

    // Convert relative units to pixels (if needed)
    switch (unit) {
      case '%':
        // Percentage: Assume relative to 100% of the parent container
        return value;
      case 'em':
        // 1em = 16px (default font size)
        return value * 16;
      case 'rem':
        // 1rem = 16px (root font size)
        return value * 16;
      case 'vh':
        // 1vh = 1% of the viewport height
        return value * (window.innerHeight / 100);
      case 'vw':
        // 1vw = 1% of the viewport width
        return value * (window.innerWidth / 100);
      case 'vmin':
        // 1vmin = 1% of the smaller viewport dimension
        return value * (Math.min(window.innerWidth, window.innerHeight) / 100);
      case 'vmax':
        // 1vmax = 1% of the larger viewport dimension
        return value * (Math.max(window.innerWidth, window.innerHeight) / 100);
      default:
        // Default to pixels (or unitless value)
        return value;
    }
  }

  private emitChangedOption(option: string, value: any, previous: any): void {
    this._isComponentReady &&
      this.onOptionChanged.emit({
        component: this,
        option,
        value,
        previous,
      });
  }
  close() {
    this.visible = false;
    this.fusionPopupService.closePopup(this.id);
  }

  open() {
    this.visible = true;
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

  getComponent<T>(): T {
    return this.component as T;
  }

  disableButton(id: string): void {
    this.buttons.forEach((button) => {
      if (button.id === id) {
        button.disabled = true;
      }
      return button;
    });
  }
  enableButton(id: string): void {
    this.buttons.forEach((button) => {
      if (button.id === id) {
        button.disabled = false;
      }
      return button;
    });
  }
  hideButton(id: string): void {
    this.buttons.forEach((button) => {
      if (button.id === id) {
        button.visible = false;
      }
      return button;
    });
  }
  showButton(id: string): void {
    this.buttons.forEach((button) => {
      if (button.id === id) {
        button.visible = true;
      }
      return button;
    });
  }
  startButtonLoading(id: string): void {
    this.buttons.forEach((button) => {
      if (button.id === id) {
        button.loading = true;
      }
      return button;
    });
  }
  endButtonLoading(id: string): void {
    this.buttons.forEach((button) => {
      if (button.id === id) {
        button.loading = false;
      }
      return button;
    });
  }
}

const default_popup_properties = {
  visible: false,
  animation: 'fade', // Default animation when the popup opens
  width: '400px', // Default width in pixels
  height: '300px', // Default height in pixels
  maxWidth: '90vw', // Max width as a percentage of the viewport width
  minWidth: '400px', // Min width as a fixed pixel value
  maxHeight: '90vh', // Max height as a percentage of the viewport height
  minHeight: '200px', // Min height as a fixed pixel value
  loading: false, // Indicates if the popup is loading
  dragEnabled: true, // Popup is dragEnabled by default
  resizeEnabled: true, // Popup can be resized by default
  shading: true, // Apply shading (background overlay) by default
  shadingColor: 'rgba(0, 0, 0, 0.2)', // Default color for shading overlay
  title: '', // Default title for the popup (empty string means no title by default)
  position: 'center-center' as FusionPopupPositionType, // Default position of the popup within the viewport
  component: undefined, // No default component to load
  customTemplate: undefined, // No default custom template
  componentInputs: {}, // Default empty component inputs
  targetElemntId: undefined, // No target element ID by default
  animationType: 'fade-in' as FusionPopupAnimationType, // Default animation type when showing the popup
  positionXY: { x: 10, y: 10 }, // Default position of the popup in pixels
  buttons: [],
  showCloseButton: true, // Show x close button
  showFooter: true, // Show footer
  showHeader: true, // Show header
  zIndex: 1000,
};
