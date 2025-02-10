// fusion-loader.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type {
  FusionContentReadyEvent,
  FusionEndLoadingEvent,
  FusionOptionChangedEvent,
  FusionStartLoadingEvent,
} from '../models/fusion.event';
import type { FusionLoaderMode, FusionLoderSize } from '../models/fusion.model';

@Component({
  selector: 'fusion-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fusion-loader.component.html',
  styleUrls: ['./fusion-loader.component.scss'],
})
export class FusionLoaderComponent {
  @Output() onStartLoading = new EventEmitter<
    FusionStartLoadingEvent<FusionLoaderComponent>
  >();
  @Output() onEndLoading = new EventEmitter<
    FusionEndLoadingEvent<FusionLoaderComponent>
  >();
  @Output() onOptionChanged = new EventEmitter<
    FusionOptionChangedEvent<FusionLoaderComponent>
  >();
  @Input() onContentReady = new EventEmitter<
    FusionContentReadyEvent<FusionLoaderComponent>
  >();
  @Output() visibleChange = new EventEmitter<boolean>();

  private _visible: boolean = false;
  private _size: FusionLoderSize = 'small';
  private _color: string = '#464646';
  private _mode: FusionLoaderMode = 'spinner';

  // Visible property
  @Input()
  get visible(): boolean {
    return this._visible;
  }
  set visible(value: boolean) {
    this.onOptionChanged.emit({
      component: this,
      option: 'visible',
      value: value,
      previous: this._visible,
    });
    if (value) this.onStartLoading.emit({ component: this });
    else this.onStartLoading.emit({ component: this });
    this.visibleChange.emit(value);
    this._visible = value;
  }

  // Size property
  @Input()
  get size(): FusionLoderSize {
    return this._size;
  }
  set size(value: FusionLoderSize) {
    this.onOptionChanged.emit({
      component: this,
      option: 'size',
      value: value,
      previous: this._size,
    });
    this._size = value;
  }

  // Color property
  @Input()
  get color(): string {
    return this._color;
  }
  set color(value: string) {
    this.onOptionChanged.emit({
      component: this,
      option: 'color',
      value: value,
      previous: this._color,
    });
    this._color = value;
  }

  // Mode property
  @Input()
  get mode(): FusionLoaderMode {
    return this._mode;
  }
  set mode(value: FusionLoaderMode) {
    this.onOptionChanged.emit({
      component: this,
      option: 'mode',
      value: value,
      previous: this._mode,
    });
    this._mode = value;
  }

  ngAfterViewInit(): void {
    this.onContentReady.emit({ component: this });
  }
  // public method methodes

  public startLoading(): void {
    this.visible = true;
  }
  public endLoading(): void {
    this.visible = true;
  }
}
