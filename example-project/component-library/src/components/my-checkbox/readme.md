# my-checkbox



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description                                                                                                                                                                                                                                                            | Type            | Default        |
| --------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | -------------- |
| `checked`       | `checked`       | If `true`, the checkbox is selected.                                                                                                                                                                                                                                   | `boolean`       | `false`        |
| `color`         | `color`         | The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`. For more information on colors, see [theming](/docs/theming/basics). | `string`        | `undefined`    |
| `disabled`      | `disabled`      | If `true`, the user cannot interact with the checkbox.                                                                                                                                                                                                                 | `boolean`       | `false`        |
| `indeterminate` | `indeterminate` | If `true`, the checkbox will visually appear as indeterminate.                                                                                                                                                                                                         | `boolean`       | `false`        |
| `mode`          | `mode`          | The mode determines which platform styles to use.                                                                                                                                                                                                                      | `"ios" \| "md"` | `undefined`    |
| `name`          | `name`          | The name of the control, which is submitted with the form data.                                                                                                                                                                                                        | `string`        | `this.inputId` |
| `value`         | `value`         | The value of the toggle does not mean if it's checked or not, use the `checked` property for that.  The value of a toggle is analogous to the value of a `<input type="checkbox">`, it's only used when the toggle participates in a native `<form>`.                  | `string`        | `'on'`         |


## Events

| Event      | Description                                    | Type                                     |
| ---------- | ---------------------------------------------- | ---------------------------------------- |
| `myBlur`   | Emitted when the toggle loses focus.           | `CustomEvent<void>`                      |
| `myChange` | Emitted when the checked property has changed. | `CustomEvent<CheckboxChangeEventDetail>` |
| `myFocus`  | Emitted when the toggle has focus.             | `CustomEvent<void>`                      |


## Shadow Parts

| Part          | Description                                       |
| ------------- | ------------------------------------------------- |
| `"container"` | The container for the checkbox mark.              |
| `"mark"`      | The checkmark used to indicate the checked state. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
