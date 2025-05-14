<template>
  <ImageCircle
    v-if="isImageLogo"
    :image-name="iconName"
    v-bind="$attrs"
  />
  <IconCustom
    v-else
    :name="iconName"
    class="expense-icon"
    v-bind="$attrs"
  />
</template>

<script setup>
import ImageCircle from '@/components/elements/ImageCircle.vue';
import IconCustom from '@/components/elements/IconCustom.vue';

defineProps({
  iconName: {
    type: String,
    default: 'savings',
  },
  isImageLogo: {
    type: Boolean,
    default: false,
  },
});
</script>
