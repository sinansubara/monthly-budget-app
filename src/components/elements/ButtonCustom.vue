<template>
  <button
    class="button-custom-wrap box-shadow"
    :class="buttonVariation"
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
  buttonVariation: {
    type: String,
    default: '',
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
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken($secondary-color, 5%);
  }

  .button-text {
    font-size: 14px;
    line-height: 20px;
    color: $black-text;
  }

  &.small-button {
    background-color: $primary-color;
    border-radius: 20px;
    padding: 2px 12px;
    font-weight: 700;

    &:hover {
      background-color: darken($primary-color, 5%);
    }

    .button-text {
      font-size: 14px;
      line-height: 100%;
      color: $black-text;
    }
  }
}
</style>
