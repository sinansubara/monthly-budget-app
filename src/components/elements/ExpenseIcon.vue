<template>
  <div class="expense-icon">
    <ImageCircle
      v-if="isImageLogo"
      :image-name="iconName"
    />
    <IconCustom
      v-else
      :name="iconName"
      class="expense-icon"
    />
  </div>
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
