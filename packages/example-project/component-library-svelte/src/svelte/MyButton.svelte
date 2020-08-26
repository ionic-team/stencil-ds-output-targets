
<script>
import { createEventDispatcher, onMount } from 'svelte';

let __ref;
let __mounted = false;

const dispatch = createEventDispatcher();

export let color;
export let buttonType;
export let disabled;
export let expand;
export let fill;
export let download;
export let href;
export let rel;
export let shape;
export let size;
export let strong;
export let target;
export let type;



export const getWebComponent = () => __ref;

onMount(() => { __mounted = true; });

const setProp = (prop, value) => { if (__ref) __ref[prop] = value; };



const onEvent = (e) => {
  e.stopPropagation();
  dispatch(e.type, e.detail);
};
</script>

<my-button 
  color={color}
  button-type={buttonType}
  disabled={disabled}
  expand={expand}
  fill={fill}
  download={download}
  href={href}
  rel={rel}
  shape={shape}
  size={size}
  strong={strong}
  target={target}
  type={type}
  on:myFocus={onEvent}
  on:myBlur={onEvent}
  bind:this={__ref}
>
  <slot></slot>
</my-button>
  