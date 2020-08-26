
<script>
import { createEventDispatcher, onMount } from 'svelte';

let __ref;
let __mounted = false;

const dispatch = createEventDispatcher();

export let allowEmptySelection = undefined;
export let name = undefined;
export let value = undefined;



export const getWebComponent = () => __ref;

onMount(() => { __mounted = true; });

const setProp = (prop, value) => { if (__ref) __ref[prop] = value; };



const onEvent = (e) => {
  e.stopPropagation();
  dispatch(e.type, e.detail);
  if (e.type === 'myChange') { value = e.detail; }
};
</script>

<my-radio-group 
  allow-empty-selection={allowEmptySelection}
  name={name}
  value={value}
  on:myChange={onEvent}
  bind:this={__ref}
>
  <slot></slot>
</my-radio-group>
  