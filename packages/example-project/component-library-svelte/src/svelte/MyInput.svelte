
<script>
import { createEventDispatcher, onMount } from 'svelte';

let __ref;
let __mounted = false;

const dispatch = createEventDispatcher();

export let color;
export let accept;
export let autocapitalize;
export let autocomplete;
export let autocorrect;
export let autofocus;
export let clearInput;
export let clearOnEdit;
export let disabled;
export let enterkeyhint;
export let inputmode;
export let max;
export let maxlength;
export let min;
export let minlength;
export let multiple;
export let name;
export let pattern;
export let placeholder;
export let readonly;
export let required;
export let spellcheck;
export let step;
export let size;
export let type;
export let value;

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
  