<template>
  <input
    ref="inputRef"
    class="input-custom"
    :value="value"
    :type="inputType"
    :placeholder="placeholder"
    v-bind="numberInputAttrs"
    spellcheck="false"
    @input="handleInput"
    @blur="handleBlur"
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

const emit = defineEmits(['input', 'blur']);

const inputRef = ref(null);

const inputValue = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit('input', value);
  },
});

const numberInputAttrs = computed(() => {
  if (props.inputType === 'number') {
    return {
      min: props.minNumber,
      max: props.maxNumber,
      step: 0.01,
    };
  }
  return {};
});

const handleInput = (event) => {
  inputRef.value.reportValidity();
  const value = event.target.value;
  inputValue.value = value;
};

const handleBlur = (event) => {
  emit('blur', event, event.target.value);
};
</script>
