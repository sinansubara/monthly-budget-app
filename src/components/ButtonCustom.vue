<template>
  <button
    class="button-custom-wrap"
    :disabled="props.disabled"
    @click="handleClick"
  >
    <slot>
      <span
        v-if="props.buttonText"
        class="button-text"
        >{{ props.buttonText }}</span
      >
    </slot>
  </button>
</template>

<script setup>
const props = defineProps({
  buttonText: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['click']);

const handleClick = () => {
  if (props.disabled) return;
  emit('click');
};
</script>

<style lang="scss">
.button-custom-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $secondary-color;
  padding: 16px;
  border-radius: 4px;
  border: none;
  outline: none;
  cursor: pointer;

  .button-text {
    font-size: 14px;
    line-height: 20px;
    color: $dark-text;
  }
}
</style>
