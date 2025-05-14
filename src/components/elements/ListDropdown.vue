<template>
  <div class="dropdown-container">
    <!-- Default Button or Custom Slot -->
    <template v-if="$slots.customTrigger">
      <div
        ref="dropdownButton"
        class="custom-trigger"
      >
        <slot
          name="customTrigger"
          :toggle="toggleDropdown"
          :is-open="isDropdownOpen"
          :selected="selectedOption"
        ></slot>
      </div>
    </template>
    <ButtonCustom
      v-else
      ref="dropdownButton"
      class="dropdown-button"
      @click="toggleDropdown"
    >
      <div class="dropdown-button-content">
        <span
          v-if="dropdownLabel"
          class="dropdown-label truncate"
          >{{ dropdownLabel }}</span
        >
        <div class="dropdown-text-wrap">
          <span class="dropdown-selected-text truncate">{{
            selectedOption.name
          }}</span>
          <IconCustom
            name="arrow-down"
            class="dropdown-arrow"
            :class="{ 'rotate-180': isDropdownOpen }"
          />
        </div>
      </div>
    </ButtonCustom>

    <!-- Dropdown Menu -->
    <div
      v-if="isDropdownOpen"
      ref="dropdownMenu"
      class="dropdown-menu box-shadow"
      :class="{ 'dropdown-menu-top': showAbove }"
    >
      <ul>
        <li
          v-for="item in items"
          :key="item.id"
          @click="selectOption(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch, onUnmounted, defineExpose } from 'vue';
import ButtonCustom from '@/components/elements/ButtonCustom.vue';
import IconCustom from '@/components/elements/IconCustom.vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Object,
    default: () => ({
      id: 'All',
      name: 'All',
    }),
  },
  dropdownLabel: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

// Reactive state
const isDropdownOpen = ref(false); // Track dropdown open/close state
const selectedOption = ref(props.modelValue); // Default selected option
const dropdownButton = ref(null); // Reference to dropdown button
const dropdownMenu = ref(null); // Reference to dropdown menu
const showAbove = ref(false); // Whether to show dropdown above the button

// Toggle the dropdown open/close state
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;

  if (isDropdownOpen.value) {
    nextTick(() => {
      positionDropdown();
      registerClickOutsideEvents();
    });
  } else {
    unregisterClickOutsideEvents();
  }
};

// Handle clicks outside the dropdown
const handleOutsideClick = (event) => {
  const dropdownElement = dropdownMenu.value;
  const triggerElement = dropdownButton.value.$el ?? dropdownButton.value;
  if (
    dropdownElement &&
    !dropdownElement.contains(event.target) &&
    triggerElement &&
    !triggerElement.contains(event.target)
  ) {
    isDropdownOpen.value = false;
  }
};

function positionDropdown() {
  const dropdownRect = dropdownMenu.value.getBoundingClientRect();

  const triggerElement = dropdownButton.value.$el ?? dropdownButton.value;
  const triggerRect =
    triggerElement.getBoundingClientRect() ??
    dropdownButton.value.getBoundingClientRect();

  const spaceBelow = window.innerHeight - triggerRect.bottom;
  const spaceAbove = triggerRect.top;

  // Check if there's enough space below, else show above
  if (spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height) {
    showAbove.value = true;
  } else {
    showAbove.value = false;
  }
}

// Select a new option and close the dropdown
const selectOption = (option) => {
  selectedOption.value = option; // Update selected option
  isDropdownOpen.value = false; // Close dropdown after selection

  emit('update:modelValue', option); // Emit the selected item
  unregisterClickOutsideEvents();
};

const registerPositionEvents = () => {
  window.addEventListener('resize', positionDropdown);
  window.addEventListener('scroll', positionDropdown);
};

const unregisterPositionEvents = () => {
  window.removeEventListener('resize', positionDropdown);
  window.removeEventListener('scroll', positionDropdown);
};

const registerClickOutsideEvents = () => {
  document.addEventListener('mousedown', handleOutsideClick);
};
const unregisterClickOutsideEvents = () => {
  document.removeEventListener('mousedown', handleOutsideClick);
};

// Watch for window resize to reposition dropdown
watch(isDropdownOpen, (newValue) => {
  if (newValue) {
    registerPositionEvents();
  } else {
    unregisterPositionEvents();
  }
});

// Cleanup event listeners on component unmount
onUnmounted(() => {
  unregisterPositionEvents();
  unregisterClickOutsideEvents();
});
</script>

<style scoped lang="scss">
.dropdown-container {
  position: relative;
  display: flex;
  min-width: 0px;

  .custom-trigger {
    width: 100%;
    cursor: pointer;
  }

  .dropdown-button {
    background-color: transparent;
    color: $white-text;
    border: 1px solid $secondary-color;
    border-radius: 2px;
    padding: 2px 8px;
    font-size: 12px;
    line-height: 15px;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    overflow: hidden;

    .dropdown-button-content {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .dropdown-text-wrap {
      display: flex;
      align-items: center;
      flex: 1;
      padding-left: 12px;
      width: 100%;
    }

    .dropdown-label {
      color: $white-text;
      padding-right: 4px;
      border-right: 1px solid $white-text;
    }

    .dropdown-selected-text {
      flex: 1;
      color: $secondary-color;
      // min-width: 0;
    }

    .dropdown-arrow {
      color: $secondary-color;
      width: 25px;
      height: 25px;
      flex-shrink: 0;
    }
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: $dark-background;
    border-radius: 2px;
    width: 100%;
    z-index: 10;
    border: 1px solid $secondary-color;
    display: block;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 5px;
    color: $white-text;

    &.dropdown-menu-top {
      top: auto;
      bottom: 100%;
      margin-top: 0;
      margin-bottom: 5px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 10px 8px;
        font-size: 12px;
        line-height: 100%;
        cursor: pointer;

        &:hover {
          background-color: darken($secondary-color, 30%);
        }
      }
    }
  }
}
</style>
