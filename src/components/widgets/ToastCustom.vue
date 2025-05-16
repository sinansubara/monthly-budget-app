<template>
  <transition name="toast-slide">
    <div
      v-if="visible"
      :class="['toast', type]"
      :style="{ cursor: dismissible ? 'pointer' : 'default' }"
      @click="handleClick"
    >
      <span
        v-if="icon"
        class="toast-icon"
        >{{ icon }}</span
      >
      <IconCustom
        v-if="customIcon"
        :name="customIcon"
        :style="{ color: customIconColor }"
        class="toast-icon-custom"
      />
      <span
        v-if="message"
        class="toast-message"
        >{{ message }}</span
      >
      <span
        v-if="dismissible"
        class="toast-close"
        >×</span
      >
    </div>
  </transition>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useToastStore } from '@/stores/useToastStore';
import IconCustom from '@/components/elements/IconCustom.vue';

const toastStore = useToastStore();
const {
  visible,
  message,
  icon,
  customIcon,
  customIconColor,
  type,
  dismissible,
} = storeToRefs(toastStore);
const { dismiss } = toastStore;

const handleClick = () => {
  if (dismissible.value) {
    dismiss();
  }
};
</script>

<style scoped lang="scss">
.toast {
  position: fixed;
  top: 3rem;
  right: 5%;
  display: flex;
  align-items: center;
  background-color: $dark-background;
  color: $white-text;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 500;
  gap: 10px;
  z-index: 9999;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &.success {
    background-color: #4caf50;
  }
  &.error {
    background-color: #f44336;
  }
  &.warning {
    background-color: #ff9800;
  }
  &.info {
    background-color: #2196f3;
  }

  .toast-icon {
    font-size: 1.25rem;
  }

  .toast-icon-custom {
    width: 20px;
    height: 20px;
  }

  .toast-message {
    flex: 1;
  }

  .toast-close {
    margin-left: 0.5rem;
    font-weight: bold;
  }
}

// Slide animation
.toast-slide-enter-from {
  opacity: 0;
  transform: translateX(120%);
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.5s ease;
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translateX(120%);
}
</style>
