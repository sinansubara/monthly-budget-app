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
  text-align: center;
  background-color: $box-background;
  gap: 1px;
  border-radius: 4px;
  padding: 10px 2px;
  width: 100%;
  flex: 1;
  overflow: hidden;

  .card-section-title {
    font-size: 12px;
    line-height: 16px;
    color: $black-text;
    font-weight: 700;
    text-transform: uppercase;
  }
}
</style>
