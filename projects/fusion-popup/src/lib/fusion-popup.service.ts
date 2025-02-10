import {
  Injectable,
  ApplicationRef,
  ComponentRef,
  Injector,
  EnvironmentInjector,
  createComponent,
} from '@angular/core';
import { FusionPopupComponent } from './fusion-popup/fusion-popup.component';
import type { FusionPopupProperties } from './models/fusion.model';

@Injectable({
  providedIn: 'root',
})
export class FusionPopupService {
  private popups: ComponentRef<FusionPopupComponent>[] = [];
  private popupsRef: {
    id: string;
    popupRef: ComponentRef<FusionPopupComponent>;
  }[] = [];

  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector
  ) {}
  private upperZIndex: number = 3000;

  private highestZIndex = 1000; // Start with a base z-index

  createPopup(properties: FusionPopupProperties): FusionPopupComponent {
    // Create the component dynamically with the correct injector
    const componentRef = createComponent(FusionPopupComponent, {
      environmentInjector: this.environmentInjector,
      elementInjector: this.injector, // Pass the injector here
    });

    // Attach the component to the application ref
    this.appRef.attachView(componentRef.hostView);

    // Append the component's DOM element to the body
    const domElement = (componentRef.hostView as any)
      .rootNodes[0] as HTMLElement;

    // Apply dynamic styles or add a specific class for popup styling
    document.body.appendChild(domElement);

    const newPopupId = this.generatePopupId();
    this.assignPopupProperties(properties, componentRef.instance);
    componentRef.instance.visible = true;
    componentRef.instance.id = newPopupId;
    componentRef.instance.zIndex = this.getZIndex();

    // Store the component reference
    this.popups.push(componentRef);
    this.popupsRef.push({ id: newPopupId, popupRef: componentRef });

    return componentRef.instance;
  }

  getZIndex(): number {
    this.upperZIndex += 3;
    return this.upperZIndex;
  }

  private generatePopupId(): string {
    return new Date().getTime().toString();
  }

  private assignPopupProperties(
    properties: FusionPopupProperties,
    popup: FusionPopupComponent
  ): void {
    // Assigning properties to the popup component
    if (properties.height !== undefined) popup.height = properties.height;
    if (properties.width !== undefined) popup.width = properties.width;
    if (properties.title !== undefined) popup.title = properties.title;
    if (properties.maxWidth !== undefined) popup.maxWidth = properties.maxWidth;
    if (properties.minWidth !== undefined) popup.minWidth = properties.minWidth;
    if (properties.maxHeight !== undefined)
      popup.maxHeight = properties.maxHeight;
    if (properties.minHeight !== undefined)
      popup.minHeight = properties.minHeight;
    if (properties.loading !== undefined) popup.loading = properties.loading;
    if (properties.dragEnabled !== undefined)
      popup.dragEnabled = properties.dragEnabled;
    if (properties.resizeEnabled !== undefined)
      popup.resizeEnabled = properties.resizeEnabled;

    if (properties.shading !== undefined) popup.shading = properties.shading;
    if (properties.shadingColor !== undefined)
      popup.shadingColor = properties.shadingColor;
    if (properties.animation !== undefined)
      popup.animation = properties.animation;
    if (properties.position !== undefined) popup.position = properties.position;
    if (properties.positionXY !== undefined)
      popup.positionXY = properties.positionXY;
    if (properties.component !== undefined)
      popup.component = properties.component;
    if (properties.customTemplate !== undefined)
      popup.customTemplate = properties.customTemplate;
    if (properties.componentInputs !== undefined)
      popup.componentInputs = properties.componentInputs;
    if (properties.targetElemntId !== undefined)
      popup.targetElemntId = properties.targetElemntId;
    if (properties.buttons !== undefined) popup.buttons = properties.buttons;
    if (properties.showHeader !== undefined)
      popup.showHeader = properties.showHeader;
    if (properties.showCloseButton !== undefined)
      popup.showCloseButton = properties.showCloseButton;
    if (properties.showFooter !== undefined)
      popup.showFooter = properties.showFooter;
  }

  public closePopup(id: string): void {
    const componentRef = this.popupsRef.find((p) => p.id === id)?.popupRef;
    if (componentRef) {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
      this.popups = this.popups.filter((ref) => ref !== componentRef);
    }
  }
}
