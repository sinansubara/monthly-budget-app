<template>
  <input
    ref="inputRef"
    class="input-custom"
    :value="value"
    :type="inputType"
    :placeholder="placeholder"
    :min="inputType === 'number' ? minNumber : undefined"
    :max="inputType === 'number' ? maxNumber : undefined"
    :step="inputType === 'number' ? 0.01 : undefined"
    spellcheck="false"
    @input="handleInput"
  />
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  inputType: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  minNumber: {
    type: Number,
    default: undefined,
  },
  maxNumber: {
    type: Number,
    default: undefined,
  },
});

const emit = defineEmits(['input']);

const inputRef = ref(null);

const inputValue = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit('input', value);
  },
});

const handleInput = (event) => {
  inputRef.value.reportValidity();
  const value = event.target.value;
  inputValue.value = value;
};
</script>

<style lang="scss">
.input-custom {
  width: 100%;
  padding: 0 16px 16px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid $input-border-color;
  color: $placeholder-color;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.1em;
  text-align: center;
  outline: none;

  &::placeholder {
    color: $placeholder-color;
  }

  &:focus {
    border-color: $primary-color;
  }
}
</style>
