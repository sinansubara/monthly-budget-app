<template>
  <div class="card-section box-shadow">
    <span class="card-section-title">{{ title }}</span>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss">
.card-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $box-background;
  gap: 4px;
  border-radius: 4px;
  padding: 10px 2px;
  width: 100%;

  .card-section-title {
    font-size: 12px;
    line-height: 16px;
    color: $black-text;
    font-weight: 700;
    text-transform: uppercase;
  }
}
</style>
