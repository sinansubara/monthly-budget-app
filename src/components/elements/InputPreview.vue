<template>
  <div class="input-custom input-preview">
    <slot>
      <div class="placeholder">{{ placeholder }}</div>
    </slot>
  </div>
</template>

<script setup>
defineProps({
  placeholder: {
    type: String,
    default: '',
  },
});
</script>
