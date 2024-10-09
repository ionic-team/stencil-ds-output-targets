<script setup>
import { MyComponent, MyRange, MyRadioGroup } from 'component-library-vue'
</script>

<template>
  <div>
    <Input />
    <hr />
    <MyComponent first="Stencil" last="'Don't call me a framework' JS" />
    <hr />
    <MyRange name="myRange">Hello World</MyRange>
    <hr />
    <MyRadioGroup name="myRadioGroup" value="two">
      <input type="radio" name="myRadioGroup" value="one" />
      <input type="radio" name="myRadioGroup" value="two" />
      <input type="radio" name="myRadioGroup" value="three" />
    </MyRadioGroup>
  </div>
</template>
