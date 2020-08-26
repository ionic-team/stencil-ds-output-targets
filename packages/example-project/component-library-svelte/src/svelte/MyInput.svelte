
<script>
import { createEventDispatcher, onMount } from 'svelte';

let __ref;
let __mounted = false;

const dispatch = createEventDispatcher();

export let color = undefined;
export let accept = undefined;
export let autocapitalize = undefined;
export let autocomplete = undefined;
export let autocorrect = undefined;
export let autofocus = undefined;
export let clearInput = undefined;
export let clearOnEdit = undefined;
export let disabled = undefined;
export let enterkeyhint = undefined;
export let inputmode = undefined;
export let max = undefined;
export let maxlength = undefined;
export let min = undefined;
export let minlength = undefined;
export let multiple = undefined;
export let name = undefined;
export let pattern = undefined;
export let placeholder = undefined;
export let readonly = undefined;
export let required = undefined;
export let spellcheck = undefined;
export let step = undefined;
export let size = undefined;
export let type = undefined;
export let value = undefined;

export const setFocus = (...args) => __ref.setFocus(...args);
export const getInputElement = (...args) => __ref.getInputElement(...args);

export const getWebComponent = () => __ref;

onMount(() => { __mounted = true; });

const setProp = (prop, value) => { if (__ref) __ref[prop] = value; };



const onEvent = (e) => {
  e.stopPropagation();
  dispatch(e.type, e.detail);
  if (e.type === 'myChange') { value = e.detail; }
};
</script>

<my-input 
  color={color}
  accept={accept}
  autocapitalize={autocapitalize}
  autocomplete={autocomplete}
  autocorrect={autocorrect}
  autofocus={autofocus}
  clear-input={clearInput}
  clear-on-edit={clearOnEdit}
  disabled={disabled}
  enterkeyhint={enterkeyhint}
  inputmode={inputmode}
  max={max}
  maxlength={maxlength}
  min={min}
  minlength={minlength}
  multiple={multiple}
  name={name}
  pattern={pattern}
  placeholder={placeholder}
  readonly={readonly}
  required={required}
  spellcheck={spellcheck}
  step={step}
  size={size}
  type={type}
  value={value}
  on:myInput={onEvent}
  on:myChange={onEvent}
  on:myBlur={onEvent}
  on:myFocus={onEvent}
  bind:this={__ref}
>
  <slot></slot>
</my-input>
  