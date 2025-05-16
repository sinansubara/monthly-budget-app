import { defineStore } from 'pinia';
import { ref } from 'vue';

// Toast types
const toastTypes = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

export const useToastStore = defineStore('toast', () => {
  const visible = ref(false);
  const message = ref('');
  const icon = ref(null);
  const customIcon = ref(null);
  const customIconColor = ref(null);
  const type = ref('info'); // success | error | warning | info
  const dismissible = ref(true);
  let timer = null;

  const showToast = ({
    message: msg = '',
    icon: icn = null,
    customIcon: customIcn = null,
    customIconColor: customIcnCol = '#fff',
    type: tp = toastTypes.INFO,
    duration = 3000,
    dismissible: dis = true,
  } = {}) => {
    message.value = msg;
    icon.value = icn;
    customIcon.value = customIcn;
    customIconColor.value = customIcnCol;
    type.value = tp;
    visible.value = true;
    dismissible.value = dis;

    clearTimeout(timer);
    if (duration > 0) {
      timer = setTimeout(() => {
        visible.value = false;
      }, duration);
    }
  };

  const dismiss = () => {
    if (dismissible.value) {
      visible.value = false;
      clearTimeout(timer);
    }
  };

  return {
    visible,
    message,
    icon,
    customIcon,
    customIconColor,
    type,
    dismissible,
    showToast,
    dismiss,
  };
});
