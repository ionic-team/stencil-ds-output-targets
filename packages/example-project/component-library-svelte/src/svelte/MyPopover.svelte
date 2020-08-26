
<script>
import { createEventDispatcher, onMount } from 'svelte';

let __ref;
let __mounted = false;

const dispatch = createEventDispatcher();

export let component;
export let componentProps;
export let keyboardClose;
export let cssClass;
export let backdropDismiss;
export let event;
export let showBackdrop;
export let translucent;
export let animated;

export const present = (...args) => __ref.present(...args);
export const dismiss = (...args) => __ref.dismiss(...args);
export const onDidDismiss = (...args) => __ref.onDidDismiss(...args);
export const onWillDismiss = (...args) => __ref.onWillDismiss(...args);

export const getWebComponent = () => __ref;

onMount(() => { __mounted = true; });

const setProp = (prop, value) => { if (__ref) __ref[prop] = value; };

$: if (__mounted) setProp('componentProps', componentProps);

const onEvent = (e) => {
  e.stopPropagation();
  dispatch(e.type, e.detail);
};
</script>

<my-popover 
  component={component}
  keyboard-close={keyboardClose}
  css-class={cssClass}
  backdrop-dismiss={backdropDismiss}
  event={event}
  show-backdrop={showBackdrop}
  translucent={translucent}
  animated={animated}
  on:myPopoverDidPresent={onEvent}
  on:myPopoverWillPresent={onEvent}
  on:myPopoverWillDismiss={onEvent}
  on:myPopoverDidDismiss={onEvent}
  bind:this={__ref}
>
  <slot></slot>
</my-popover>
  