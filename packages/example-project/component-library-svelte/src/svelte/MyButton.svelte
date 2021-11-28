
<script>
import { createEventDispatcher, onMount } from 'svelte';

let __ref;
let __mounted = false;

const dispatch = createEventDispatcher();

export let color = undefined;
export let buttonType = undefined;
export let disabled = undefined;
export let expand = undefined;
export let fill = undefined;
export let download = undefined;
export let href = undefined;
export let rel = undefined;
export let shape = undefined;
export let size = undefined;
export let strong = undefined;
export let target = undefined;
export let type = undefined;



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
  