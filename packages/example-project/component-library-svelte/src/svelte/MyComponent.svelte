
<script>
import { createEventDispatcher, onMount } from 'svelte';

let __ref;
let __mounted = false;

const dispatch = createEventDispatcher();

export let first;
export let middle;
export let last;
export let age;
export let kidsNames;



export const getWebComponent = () => __ref;

onMount(() => { __mounted = true; });

const setProp = (prop, value) => { if (__ref) __ref[prop] = value; };

$: if (__mounted) setProp('kidsNames', kidsNames);

const onEvent = (e) => {
  e.stopPropagation();
  dispatch(e.type, e.detail);
};
</script>

<my-component 
  first={first}
  middle={middle}
  last={last}
  age={age}
  on:myCustomEvent={onEvent}
  bind:this={__ref}
>
  <slot></slot>
</my-component>
  