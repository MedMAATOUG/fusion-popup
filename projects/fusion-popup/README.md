# Popup Fusion

Popup Fusion is a lightweight and customizable popup component for Angular, designed to provide a seamless and flexible modal experience.

## Installation

```sh
npm install fusion-popup
```

## Usage

Import the `FusionPopupComponent` in your Angular module:

```typescript
import { PopupFusionModule } from "fusion-popup";

@NgModule({
  imports: [FusionPopupComponent],
})
export class AppModule {}
```

Use the `<fusion-popup>` component in your template:

```html
<fusion-popup [visible]="isVisible" [title]="'My Popup'" [width]="'500px'" [height]="'400px'">
  <p>Popup content goes here.</p>
</fusion-popup>
```

## API

### Inputs

| Property          | Type                       | Default                    | Description                                               |
| ----------------- | -------------------------- | -------------------------- | --------------------------------------------------------- |
| `visible`         | `boolean`                  | `false`                    | Controls the visibility of the popup.                     |
| `title`           | `string`                   | `''`                       | Title of the popup.                                       |
| `width`           | `string`                   | `'400px'`                  | Width of the popup.                                       |
| `height`          | `string`                   | `'300px'`                  | Height of the popup.                                      |
| `shading`         | `boolean`                  | `true`                     | Enables/disables the background overlay.                  |
| `shadingColor`    | `string`                   | `'rgba(0, 0, 0, 0.2)'`     | Color of the background overlay.                          |
| `showCloseButton` | `boolean`                  | `true`                     | Shows/hides the close button.                             |
| `dragEnabled`     | `boolean`                  | `true`                     | Enables/disables dragging.                                |
| `resizeEnabled`   | `boolean`                  | `true`                     | Enables/disables resizing.                                |
| `animation`       | `FusionPopupAnimationType` | `'fade'`                   | Animation type for the popup.                             |
| `zIndex`          | `number`                   | `auto`                     | Sets the z-index of the popup.                            |
| `position`        | `FusionPopupPositionType`  | `'top'`                    | Position of the popup on the screen.                      |
| `component`       | `any`                      | `undefined`                | Custom component to be displayed inside the popup.        |
| `customTemplate`  | `TemplateRef<any>`         | `undefined`                | Custom template for the popup content.                    |
| `componentInputs` | `Record<string, unknown>`  | `undefined`                | Dynamic inputs for the custom component.                  |
| `targetElemntId`  | `string`                   | `''`                       | Target element ID for positioning the popup.              |
| `dragEnabled`     | `boolean`                  | `true`                     | Enables/disables dragging functionality.                  |
| `resizeEnabled`   | `boolean`                  | `true`                     | Enables/disables resizing functionality.                  |
| `maxWidth`        | `string`                   | `undefined`                | Maximum width of the popup.                               |
| `minWidth`        | `string`                   | `'100px'`                  | Minimum width of the popup.                               |
| `maxHeight`       | `string`                   | `undefined`                | Maximum height of the popup.                              |
| `minHeight`       | `string`                   | `'100px'`                  | Minimum height of the popup.                              |
| `loading`         | `boolean`                  | `false`                    | Shows or hides the loading indicator.                     |
| `showHeader`      | `boolean`                  | `true`                     | Shows or hides the header of the popup.                   |
| `showFooter`      | `boolean`                  | `true`                     | Shows or hides the footer of the popup.                   |
| `buttons`         | `FusionButtonProperties[]` | `[]`                       | Array of buttons to be displayed inside the popup Footer. |
| `positionXY`      | `object`                   | `{ x: 0, y: 0 }`           | XY coordinates for the popup position.                    |
|                   |
| ---------------   | -------------------------  | -------------------------- | --------------------------------------------------        |
| `visible`         | `boolean`                  | `false`                    | Controls the visibility of the popup.                     |
| `title`           | `string`                   | `''`                       | Title of the popup.                                       |
| `width`           | `string`                   | `'400px'`                  | Width of the popup.                                       |
| `height`          | `string`                   | `'300px'`                  | Height of the popup.                                      |
| `shading`         | `boolean`                  | `true`                     | Enables/disables the background overlay.                  |
| `shadingColor`    | `string`                   | `'rgba(0, 0, 0, 0.2)'`     | Color of the background overlay.                          |
| `showCloseButton` | `boolean`                  | `true`                     | Shows/hides the close button.                             |
| `dragEnabled`     | `boolean`                  | `true`                     | Enables/disables dragging.                                |
| `resizeEnabled`   | `boolean`                  | `true`                     | Enables/disables resizing.                                |
| `animation`       | `FusionPopupAnimationType` | `'fade'`                   | Animation type for the popup.                             |

### Events

| Event             | Type                                                           | Description                                        |
| ----------------- | -------------------------------------------------------------- | -------------------------------------------------- |
| `visibleChange`   | `EventEmitter<boolean>`                                        | Emitted when the visibility of the popup changes.  |
| `onOpened`        | `EventEmitter<FusionOpenedEvent>`                              | Emitted when the popup is opened.                  |
| `onClosed`        | `EventEmitter<FusionClosedEvent>`                              | Emitted when the popup is closed.                  |
| `onOptionChanged` | `EventEmitter<FusionOptionChangedEvent<FusionPopupComponent>>` | Emitted when an option of the popup is changed.    |
| `onContentLoaded` | `EventEmitter<FusionContentLoadedEvent<FusionPopupComponent>>` | Emitted when the popup content is loaded.          |
| `onDrag`          | `EventEmitter<FusionDragEndEvent>`                             | Emitted when the drag operation of the popup ends. |
| `onResize`        | `EventEmitter<FusionResizeEvent>`                              | Emitted when the popup is resized.                 |
| `onButtonClick`   | `EventEmitter<FusionButtonClickEvent>`                         | Emitted when a button inside the popup is clicked. |

### Methods

| Method                                 | Description                                                     |
| -------------------------------------- | --------------------------------------------------------------- |
| `open()`                               | Opens the popup.                                                |
| `close()`                              | Closes the popup.                                               |
| `startLoading()`                       | Shows a loading spinner inside the popup.                       |
| `stopLoading()`                        | Hides the loading spinner.                                      |
| `getComponent()`                       | return the instance of component rendred dynamicly.             |
| `disableButton(id: string): void`      | Disables the button with the specified `id`.                    |
| `enableButton(id: string): void`       | Enables the button with the specified `id`.                     |
| `hideButton(id: string): void`         | Hides the button with the specified `id`.                       |
| `showButton(id: string): void`         | Shows the button with the specified `id`.                       |
| `startButtonLoading(id: string): void` | Starts the loading state on the button with the specified `id`. |
| `endButtonLoading(id: string): void`   | Ends the loading state on the button with the specified `id`.   |

## Dynamic Open Mode

### PopupFusionService

The `PopupFusionService` allows you to create popups dynamically without needing to define them in the template.

#### Importing the Service

```typescript
import { PopupFusionService } from "fusion-popup";
```

#### Creating a Popup Dynamically

##### step 1: set the service FusionPopupService as Application provider

```typescript
import { FusionPopupService } from 'fusion-popup';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [FusionPopupService],
})

constructor(private popupService: PopupFusionService) {}

openPopup() {
  const popupInstance = this.popupService.createPopup({
    title: 'Dynamic Popup',
    width: '500px',
    height: '400px',
    component : YourComponent
  });
}
```

#### Closing a Popup

```typescript
this.popupService.closePopup(popupInstance.id);
```

## Example

### open popup with service

```typescript
import { Component } from "@angular/core";
import { PopupFusionService } from "fusion-popup";

@Component({
  selector: "app-root",
  template: ` <button (click)="openPopup()">Open Popup</button> `,
})
export class AppComponent {
  constructor(private popupService: PopupFusionService) {}

  openPopup() {
    this.popupService.createPopup({
      title: "Dynamic Popup",
      width: "500px",
      height: "400px",
    });
  }
}
```

## Example

### handle button click and close popup

```typescript
import { Component } from "@angular/core";
import { PopupFusionService } from "fusion-popup";

@Component({
  selector: "app-root",
  template: ` <button (click)="openPopup()">Open Popup</button> `,
})
export class AppComponent {
  constructor(private popupService: PopupFusionService) {}

  openPopup() {
    const popup = this.popupFusionService.createPopup({
      width: "700px",
      height: "200px",
      positionXY: { x: 0, y: 0 },
      title: "Popup Title",
      component: AppComponent,
      buttons: [
        {
          id: "close",
          text: "Close",
          type: "info",
          stylingMode: "outlined",
        },
      ],
    });

    popup.onButtonClick.subscribe((event: FusionButtonClickEvent) => {
      if (event.button.id === "close") {
        // controle the buttons properties from event.button
        event.button.loading = true;
        // controle the buttons properties from popup.button
        popup.startButtonLoading("close");
        // controle the popup form event
        event.popup.close();

        // controle the component rendred from outside and access to all public properties and methods
        const rendredComponent = popp.getComponent<YourComponent>();
        // controle the popup from instance
        popup.close();
      }
    });
  }
}
```

## License

MIT
