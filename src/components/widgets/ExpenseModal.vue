<template>
  <div
    v-if="isModalVisible"
    class="modal-overlay"
    @click="handleClickOutside"
  >
    <div
      class="modal-container"
      @click.stop
    >
      <span class="modal-title">{{ modalTitle }}</span>

      <!-- Name Input -->
      <div class="input-group">
        <input
          v-model="expenseData.name"
          type="text"
          placeholder="Enter expense name"
          :class="{ 'input-error': errors.name }"
        />
        <span
          v-if="errors.name"
          class="error-message"
          >Please enter a valid name</span
        >
      </div>

      <!-- Category Input -->
      <div class="input-group">
        <select
          v-model="expenseData.category"
          :class="{ 'input-error': errors.category }"
        >
          <option value="food">Food</option>
          <option value="subscription">Subscription</option>
          <option value="transport">Transport</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
        <span
          v-if="errors.category"
          class="error-message"
          >Please select a category</span
        >
      </div>

      <!-- Date Input -->
      <div class="input-group">
        <input
          v-model="expenseData.date"
          type="date"
          :class="{ 'input-error': errors.date }"
        />
        <span
          v-if="errors.date"
          class="error-message"
          >Please select a valid date</span
        >
      </div>

      <!-- Amount Input -->
      <div class="input-group">
        <input
          v-model="expenseData.amount"
          type="number"
          placeholder="Enter amount"
          :class="{ 'input-error': errors.amount }"
        />
        <span
          v-if="errors.amount"
          class="error-message"
          >Please enter a valid amount</span
        >
      </div>

      <ButtonCustom
        class="submit-btn"
        :button-text="submitButtonText"
        @click="submitExpense"
      />
      <IconCustom
        name="icon-close"
        class="close-btn box-shadow"
        @click="closeModal"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useModalStore } from '@/stores/useModalStore'; // Import Pinia store
import IconCustom from '@/components/elements/IconCustom.vue';
import ButtonCustom from '@/components/elements/ButtonCustom.vue';

const modalStore = useModalStore(); // Access Pinia store

// Modal state from store
const isModalVisible = computed(() => modalStore.isModalVisible); // Bind to modal visibility
const modalTitle = computed(() =>
  modalStore.modalMode === 'edit' ? 'Edit Expense' : 'New Expense',
);
const submitButtonText = computed(() =>
  modalStore.modalMode === 'edit' ? 'Update Expense' : 'Add Expense',
);
const expenseData = computed(() => modalStore.expenseData); // Bind form data to the store

const errors = ref({
  name: false,
  category: false,
  date: false,
  amount: false,
});

const isDesktop = ref(true);

const closeModal = () => {
  modalStore.closeModal();
};

const handleClickOutside = () => {
  if (!isDesktop.value) return; // Prevent closing on mobile
  closeModal();
};

// Validation function for form fields
const validateForm = () => {
  errors.value = {
    name: !expenseData.value.name,
    category: !expenseData.value.category,
    date: !expenseData.value.date,
    amount: expenseData.value.amount <= 0,
  };
  return !Object.values(errors.value).includes(true); // Return true if no errors
};

// Function to submit the expense data
const submitExpense = () => {
  if (validateForm()) {
    // Logic to handle form submission (save or update expense)
    console.log('Expense Data submitted:', expenseData.value);
    closeModal();
  }
};

const checkScreenSize = () => {
  if (window.innerWidth >= 600) {
    isDesktop.value = true; // Show the image for desktop
  } else {
    isDesktop.value = false; // Hide the image for mobile
  }
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<style scoped lang="scss">
$closeButtonSize: 48px;

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $dark-background;
  padding: 27px;

  /* for bigger screens */
  // background-color: rgba(0, 0, 0, 0.9);
  .modal-container {
    background-color: $dark-background;
    color: white;
    padding-left: 6px;
    padding-right: 6px;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    /* for bigger screens */
    // border-radius: 8px;
    // width: 90%;
    // max-width: 400px;

    .modal-title {
      font-size: 36px;
      text-align: center;
      margin: 0px $closeButtonSize 84px;
    }

    .input-group {
      width: 100%;

      &:not(:last-of-type) {
        margin-bottom: 48px;
      }

      &:last-of-type {
        margin-bottom: 64px;
      }

      label {
        display: block;
        margin-bottom: 5px;
        font-size: 1rem;
      }

      input,
      select {
        width: 100%;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
        font-size: 1rem;
      }

      .input-error {
        border-color: red;
      }

      .error-message {
        color: red;
        font-size: 0.875rem;
      }
    }

    .submit-btn {
      width: 100%;
      padding: 16px;
      background-color: #ffe600;
      color: #333;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .close-btn {
      position: absolute;
      top: 5px;
      right: 10px;
      width: $closeButtonSize;
      height: $closeButtonSize;
      color: $secondary-color;
      cursor: pointer;
    }
  }

  @media only screen and (min-width: 600px) {
    background-color: rgba(0, 0, 0, 0.9);

    .modal-container {
      border-radius: 8px;
      max-width: 400px;
    }
  }
}
</style>
