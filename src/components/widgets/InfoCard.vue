<template>
  <div class="info-card">
    <div class="card-header">
      <span class="card-header-title">{{ title }}</span>
    </div>
    <slot
      v-if="$slots.content"
      name="content"
    ></slot>
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
.info-card {
  display: flex;
  flex-direction: column;
  background-color: $light-background;
  padding: 16px 26px 26px;
  gap: 22px;
  flex-basis: 100%;
  min-width: 0px;

  .card-header {
    display: flex;
    justify-content: center;
    padding: 0px 8px 8px;

    // add border bottom only if card-header is not last element
    &:not(:last-child) {
      border-bottom: 1px dotted $border-dotted-color;
    }
  }

  @media only screen and (min-width: 744px) {
    flex-basis: 50%;
  }
}
</style>
