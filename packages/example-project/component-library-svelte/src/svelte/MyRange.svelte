
<script>
import { createEventDispatcher, onMount } from 'svelte';

let __ref;
let __mounted = false;

const dispatch = createEventDispatcher();

export let color;
export let debounce;
export let name;
export let dualKnobs;
export let min;
export let max;
export let pin;
export let snaps;
export let step;
export let ticks;
export let disabled;
export let value;



export const getWebComponent = () => __ref;

onMount(() => { __mounted = true; });

const setProp = (prop, value) => { if (__ref) __ref[prop] = value; };



const onEvent = (e) => {
  e.stopPropagation();
  dispatch(e.type, e.detail);
  if (e.type === 'myChange') { value = e.detail; }
};
</script>

<my-range 
  color={color}
  debounce={debounce}
  name={name}
  dual-knobs={dualKnobs}
  min={min}
  max={max}
  pin={pin}
  snaps={snaps}
  step={step}
  ticks={ticks}
  disabled={disabled}
  value={value}
  on:myChange={onEvent}
  on:myStyle={onEvent}
  on:myFocus={onEvent}
  on:myBlur={onEvent}
  bind:this={__ref}
>
  <slot></slot>
</my-range>
  