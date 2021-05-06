
<script>
import { createEventDispatcher, onMount } from 'svelte';

let __ref;
let __mounted = false;

const dispatch = createEventDispatcher();

export let color = undefined;
export let name = undefined;
export let checked = undefined;
export let indeterminate = undefined;
export let disabled = undefined;
export let value = undefined;



export const getWebComponent = () => __ref;

onMount(() => { __mounted = true; });

const setProp = (prop, value) => { if (__ref) __ref[prop] = value; };



const onEvent = (e) => {
  e.stopPropagation();
  dispatch(e.type, e.detail);
  if (e.type === 'myChange') { checked = e.detail; }
};
</script>

<my-checkbox 
  color={color}
  name={name}
  checked={checked}
  indeterminate={indeterminate}
  disabled={disabled}
  value={value}
  on:myChange={onEvent}
  on:myFocus={onEvent}
  on:myBlur={onEvent}
  on:myStyle={onEvent}
  bind:this={__ref}
>
  <slot></slot>
</my-checkbox>
  