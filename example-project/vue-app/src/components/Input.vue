<script>
import { defineComponent, ref } from 'vue';
import { MyInput } from 'component-library-vue';

export default defineComponent({
  name: 'Input',
  components: {
    MyInput,
  },
  setup() {
    const inputValue = ref('');

    return {
      inputValue,
    };
  },
});
</script>

<style scoped>
.inputResult {
  color: green;
}
</style>

<template>
  <div>
    <MyInput
      v-model="inputValue"
    >
    </MyInput>
    <div class="inputResult">
      <p>Input Value: {{ inputValue }}</p>
    </div>
  </div>
</template>
