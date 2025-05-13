<template>
  <div class="dropdown-container">
    <!-- Dropdown Button -->
    <ButtonCustom
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
      class="dropdown-menu box-shadow"
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
import { ref } from 'vue';
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

// Toggle the dropdown open/close state
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Select a new option and close the dropdown
const selectOption = (option) => {
  selectedOption.value = option; // Update selected option
  isDropdownOpen.value = false; // Close dropdown after selection

  emit('update:modelValue', option); // Emit the selected item
};
</script>

<style scoped lang="scss">
.dropdown-container {
  position: relative;
  display: flex;
  min-width: 0px;

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
