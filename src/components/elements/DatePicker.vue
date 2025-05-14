<template>
  <div class="input-container">
    <input
      ref="inputRef"
      v-model="date"
      type="date"
      :min="minDate"
      :max="maxDate"
      class="styled-input"
      @click="showPicker"
      @change="handleDateChange"
    />
    <slot>
      <div class="base-overlay overlay-text">📅 Pick a date</div>
    </slot>
  </div>
</template>

<script setup>
import { ref } from 'vue';
defineProps({
  minDate: {
    type: String,
    default: '',
  },
  maxDate: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['date-change']);

const handleDateChange = (event) => {
  emit('date-change', event.target.value);
};

const date = ref('');
const inputRef = ref(null);

const showPicker = () => {
  if (inputRef.value?.showPicker) {
    inputRef.value.showPicker();
  } else {
    inputRef.value?.click();
  }
};
</script>

<style lang="scss">
.input-container {
  position: relative;
  width: 100%;
}

.styled-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: unset;
  font-size: 16px;
  background: #fff;
  opacity: 0;
}

.base-overlay {
  position: absolute;
  top: 0px;
  left: 0px;
  pointer-events: none;
  height: 100%;
  width: 100%;
  background: transparent;
  align-content: center;
  text-align: center;
}

.overlay-text {
  position: absolute;
  top: 0px;
  left: 0px;
  color: #aaa;
  pointer-events: none;
  font-size: 16px;
  height: 100%;
  width: 100%;
  background: transparent;
  border: 1px solid;
  align-content: center;
  text-align: center;
}
</style>
