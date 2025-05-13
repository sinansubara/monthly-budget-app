<template>
  <div class="image-circle">
    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="Circle Logo"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  imageName: {
    type: String,
    default: '',
  },
});

const imageUrl = computed(() => {
  if (props.imageName) {
    try {
      // Add file extension if not present
      const fileName = props.imageName.includes('.')
        ? props.imageName
        : `${props.imageName}.png`;
      // Using correct path to assets/images folder
      return new URL(`/src/assets/images/${fileName}`, import.meta.url).href;
    } catch (error) {
      console.error('Error loading image:', error);
      return null;
    }
  }
  return null;
});
</script>

<style lang="scss">
.image-circle {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid $image-border-color;
  background-color: $white-text;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid transparent;
  }
}
</style>
