import {
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  HostListener,
  TemplateRef,
  ElementRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { FusionLoaderComponent } from '../fusion-loader/fusion-loader.component';
import type {
  FusionClickEvent,
  FusionContentReadyEvent,
  FusionDblClickEvent,
  FusionHoverEvent,
  FusionOptionChangedEvent,
} from '../models/fusion.event';
import type {
  FusionButtonSize,
  FusionButtonStylingMode,
  FusionButtonType,
  FusionLoaderOptions,
} from '../models/fusion.model';

@Component({
  selector: 'fusion-button',
  standalone: true,
  imports: [CommonModule, FusionLoaderComponent],
  templateUrl: './fusion-button.component.html',
  styleUrls: ['./fusion-button.component.scss'],
})
export class FusionButtonComponent implements AfterViewInit {
  // Output events
  @Output() onClick = new EventEmitter<FusionClickEvent>();
  @Output() onDblClick = new EventEmitter<FusionDblClickEvent>();
  @Output() onHover = new EventEmitter<FusionHoverEvent>();
  @Output() onOptionChanged = new EventEmitter<
    FusionOptionChangedEvent<FusionButtonComponent>
  >();
  @Output() onContentReady = new EventEmitter<
    FusionContentReadyEvent<FusionButtonComponent>
  >();
  @Output() visibleChange = new EventEmitter<boolean>();

  // Private backing fields for all inputs
  private _id = default_button_properties.id;
  private _text = default_button_properties.text;
  private _stylingMode: FusionButtonStylingMode =
    default_button_properties.stylingMode as FusionButtonStylingMode;

  private _disabled = default_button_properties.disabled;
  private _type: FusionButtonType =
    default_button_properties.type as FusionButtonType;
  private _visible = default_button_properties.visible;
  private _width: number | string = default_button_properties.width;
  private _height: number | string = default_button_properties.height;
  private _className = default_button_properties.className;
  private _loaderOptions: FusionLoaderOptions =
    default_button_properties.loaderOptions as FusionLoaderOptions;
  private _loading = default_button_properties.loading;
  private _customTemplate?: TemplateRef<any>;
  private _size: FusionButtonSize =
    default_button_properties.size as FusionButtonSize;
  private _fullWidth = default_button_properties.fullWidth;
  private _isComponentReady: boolean = false;

  // Getters and Setters for all Inputs

  @Input()
  set id(value: string) {
    if (value !== this._id) {
      this.emitChangedOption('id', value, this._id);
      this._id = value;
    }
  }
  get id(): string {
    return this._id;
  }

  @Input()
  set text(value: string) {
    if (value !== this._text) {
      this.emitChangedOption('text', value, this._text);
      this._text = value;
    }
  }
  get text(): string {
    return this._text;
  }

  @Input()
  set stylingMode(value: FusionButtonStylingMode) {
    if (value !== this._stylingMode) {
      this.emitChangedOption('stylingMode', value, this._stylingMode);
      this._stylingMode = value;
    }
  }
  get stylingMode(): FusionButtonStylingMode {
    return this._stylingMode;
  }

  @Input()
  set disabled(value: boolean) {
    if (value !== this._disabled) {
      this.emitChangedOption('disabled', value, this._disabled);
      this._disabled = value;
    }
  }
  get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  set type(value: FusionButtonType) {
    if (value !== this._type) {
      this.emitChangedOption('type', value, this._type);
      this._type = value;
    }
  }
  get type(): FusionButtonType {
    return this._type;
  }

  @Input()
  set visible(value: boolean) {
    if (value !== this._visible) {
      this.visibleChange.emit(value);
      this.emitChangedOption('visible', value, this._visible);
      this._visible = value;
    }
  }
  get visible(): boolean {
    return this._visible;
  }

  @Input()
  set width(value: number | string) {
    if (value !== this._width) {
      this.emitChangedOption('width', value, this._width);
      this._width = value;
    }
  }
  // Return width as a string with a px suffix (or other unit if needed)
  get width(): string {
    return this.getDimension(this._width);
  }

  @Input()
  set height(value: number | string) {
    if (value !== this._height) {
      this.emitChangedOption('height', value, this._height);
      this._height = value;
    }
  }
  get height(): string {
    return this.getDimension(this._height);
  }

  @Input()
  set className(value: string) {
    if (value !== this._className) {
      this.emitChangedOption('className', value, this._className);
      this._className = value;
    }
  }
  get className(): string {
    return this._className;
  }

  @Input()
  set loaderOptions(value: FusionLoaderOptions) {
    if (value !== this._loaderOptions) {
      this.emitChangedOption('loaderOptions', value, this._loaderOptions);
      this._loaderOptions = value;
    }
  }
  get loaderOptions(): FusionLoaderOptions {
    return this._loaderOptions;
  }

  @Input()
  set loading(value: boolean) {
    if (value !== this._loading) {
      this.emitChangedOption('loading', value, this._loading);
      this._loading = value;
    }
  }
  get loading(): boolean {
    return this._loading;
  }

  @Input()
  set customTemplate(value: TemplateRef<any> | undefined) {
    if (value !== this._customTemplate) {
      this.emitChangedOption('customTemplate', value, this._customTemplate);
      this._customTemplate = value;
    }
  }
  get customTemplate(): TemplateRef<any> | undefined {
    return this._customTemplate;
  }

  @Input()
  set size(value: FusionButtonSize) {
    if (value !== this._size) {
      this.emitChangedOption('size', value, this._size);
      this._size = value;
    }
  }
  get size(): FusionButtonSize {
    return this._size;
  }

  @Input()
  set fullWidth(value: boolean) {
    if (value !== this._fullWidth) {
      this.emitChangedOption('fullWidth', value, this._fullWidth);
      this._fullWidth = value;
    }
  }
  get fullWidth(): boolean {
    return this._fullWidth;
  }

  private cdr = inject(ChangeDetectorRef);
  constructor(private _element: ElementRef) {}

  ngAfterViewInit(): void {
    this._isComponentReady = true;
    this.onContentReady.emit({ component: this });
    this.setLoaderColor();

    if (!this.width || this.width === 'auto') {
      this.width = this._element.nativeElement.clientWidth;
    }

    if (!this.height || this.height === 'auto') {
      this.height = this._element.nativeElement.clientHeight;
    }
    this.cdr.detectChanges();
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (!this.disabled && !this.loading) {
      this.onClick.emit({ event: event, component: this });
      event.preventDefault();
    }
  }
  private setLoaderColor(): void {
    if (!this.loaderOptions.color) {
      this.loaderOptions.color =
        this.stylingMode === 'contained'
          ? this.getContainedColor()
          : this.getOutlinedColor();
    }
  }
  startLoading() {
    this._loading = true;
  }
  stopLoading() {
    this._loading = true;
  }
  disable(): void {
    this.disabled = true;
  }
  enable(): void {
    this.disabled = false;
  }
  show(): void {
    this.visible = true;
  }
  hide(): void {
    this.visible = false;
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

  private getContainedColor(): string {
    return this.type === 'default' ? '#212121' : '#ffffff';
  }

  private getOutlinedColor(): string {
    const colors: Record<FusionButtonType, string> = {
      danger: '#f44336',
      info: '#2196F3',
      warning: '#ffc107',
      success: '#4caf50',
      default: '#464646',
    };
    return colors[this.type];
  }

  private getDimension(dim: number | string): string {
    return typeof dim === 'number' ? `${dim}px` : (dim as string);
  }
}

const default_button_properties = {
  id: '',
  text: '',
  stylingMode: 'contained',
  disabled: false,
  type: 'default',
  position: 'center',
  visible: true,
  width: 'auto',
  height: 38,
  className: '',
  loaderOptions: {
    size: 'small',
    mode: 'spinner',
    color: '',
  },
  loading: false,
  customTemplate: undefined,
  size: 'small',
  fullWidth: false,
};
