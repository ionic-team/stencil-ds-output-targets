
<script>
import { createEventDispatcher, onMount } from 'svelte';

let __ref;
let __mounted = false;

const dispatch = createEventDispatcher();

export let color = undefined;
export let name = undefined;
export let disabled = undefined;
export let value = undefined;



export const getWebComponent = () => __ref;

onMount(() => { __mounted = true; });

const setProp = (prop, value) => { if (__ref) __ref[prop] = value; };



const onEvent = (e) => {
  e.stopPropagation();
  dispatch(e.type, e.detail);
  if (e.type === 'mySelect') { checked = e.detail; }
};
</script>

<my-radio 
  color={color}
  name={name}
  disabled={disabled}
  value={value}
  on:myStyle={onEvent}
  on:myFocus={onEvent}
  on:myBlur={onEvent}
  on:mySelect={onEvent}
  bind:this={__ref}
>
  <slot></slot>
</my-radio>
  