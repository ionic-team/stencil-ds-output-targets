# my-radio



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                                                                                                                                                            | Type            | Default        |
| ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | -------------- |
| `color`    | `color`    | The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`. For more information on colors, see [theming](/docs/theming/basics). | `string`        | `undefined`    |
| `disabled` | `disabled` | If `true`, the user cannot interact with the radio.                                                                                                                                                                                                                    | `boolean`       | `false`        |
| `mode`     | `mode`     | The mode determines which platform styles to use.                                                                                                                                                                                                                      | `"ios" \| "md"` | `undefined`    |
| `name`     | `name`     | The name of the control, which is submitted with the form data.                                                                                                                                                                                                        | `string`        | `this.inputId` |
| `value`    | `value`    | the value of the radio.                                                                                                                                                                                                                                                | `any`           | `undefined`    |


## Events

| Event      | Description                                | Type                |
| ---------- | ------------------------------------------ | ------------------- |
| `myBlur`   | Emitted when the radio button loses focus. | `CustomEvent<void>` |
| `myFocus`  | Emitted when the radio button has focus.   | `CustomEvent<void>` |
| `mySelect` | Emitted when the radio button loses focus. | `CustomEvent<void>` |


## Shadow Parts

| Part          | Description                                              |
| ------------- | -------------------------------------------------------- |
| `"container"` | The container for the radio mark.                        |
| `"mark"`      | The checkmark or dot used to indicate the checked state. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
