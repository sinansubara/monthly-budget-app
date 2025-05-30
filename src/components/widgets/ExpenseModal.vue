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
        <InputCustom
          :value="expenseData.name"
          type="text"
          placeholder="Name"
          :class="{ 'input-error': errors.name }"
          @input="expenseData.name = $event"
          @blur="handleInputBlur"
        />
        <span
          v-if="errors.name"
          class="error-message"
          >Please enter a valid name</span
        >
      </div>

      <!-- Category Input -->
      <div class="input-group">
        <ListDropdown
          v-model="selectedCategory"
          :items="categoriesMapped"
          :dropdown-label="'Filter Expenses'"
        >
          <template #customTrigger="{ toggle, isOpen }">
            <InputPreview
              placeholder="Category"
              :class="{ focused: isOpen, 'input-error': errors.category }"
              @click="toggle"
            >
              <div
                v-if="isCategorySelected"
                class="category-selected"
              >
                <ExpenseIcon :icon-name="categoryIcon" /><span>{{
                  selectedCategory.name
                }}</span>
              </div>
            </InputPreview>
          </template>
        </ListDropdown>
        <span
          v-if="errors.category"
          class="error-message"
          >Please select a category</span
        >
      </div>

      <!-- Date Input -->
      <div class="input-group">
        <DatePicker
          :min-date="startOfMonth"
          :max-date="endOfMonth"
          @date-change="handleDateChange"
        >
          <InputPreview
            placeholder="Date"
            class="base-overlay"
            :class="{ 'input-error': errors.date }"
          >
            <span
              v-if="isDateSet"
              class="selected-formatted-date"
              >{{ formattedDate }}</span
            >
          </InputPreview>
        </DatePicker>
        <span
          v-if="errors.date"
          class="error-message"
          >Please select a valid date</span
        >
      </div>

      <!-- Amount Input -->
      <div class="input-group">
        <InputCustom
          :value="expenseData.amount"
          type="number"
          placeholder="Amount"
          min="0.01"
          step="0.01"
          :class="{ 'input-error': errors.amount }"
          @input="expenseData.amount = $event"
          @blur="handleInputBlur"
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
      <span
        v-if="budgetLimitExceeded"
        class="error-message budget-exceeded"
        >{{ limitExceededMessage }}</span
      >
      <IconCustom
        name="icon-close"
        class="close-btn box-shadow"
        @click="closeModal"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useModalStore } from '@/stores/useModalStore'; // Import Pinia store
import { useExpenseStore } from '@/stores/useExpensesStore';
import {
  ExpenseCategory,
  ListExpenseCategories,
  ExpenseCategoryIcons,
} from '@/constants/expenseCategories.js';
import InputCustom from '@/components/elements/InputCustom.vue';
import ListDropdown from '@/components/elements/ListDropdown.vue';
import ExpenseIcon from '@/components/elements/ExpenseIcon.vue';
import InputPreview from '@/components/elements/InputPreview.vue';
import IconCustom from '@/components/elements/IconCustom.vue';
import ButtonCustom from '@/components/elements/ButtonCustom.vue';
import DatePicker from '@/components/elements/DatePicker.vue';

const modalStore = useModalStore(); // Access Pinia store
const expenseStore = useExpenseStore(); // Access expense store

// Modal state from store
const isModalVisible = computed(() => modalStore.isModalVisible); // Bind to modal visibility
const modalTitle = computed(() =>
  modalStore.modalMode === 'edit' ? 'Edit Expense' : 'New Expense',
);
const submitButtonText = computed(() =>
  modalStore.modalMode === 'edit' ? 'Update Expense' : 'Add Expense',
);
const expenseData = computed(() => modalStore.expenseData); // Bind form data to the store

const UNSELECTED_CATEGORY_ID = 'unselected';
const DEFAULT_CATEGORY = {
  id: UNSELECTED_CATEGORY_ID,
  name: 'Category',
};

const storedCategory = computed(() => {
  return (
    ListExpenseCategories.find(
      (category) => category.id === expenseData.value.category,
    ) ?? DEFAULT_CATEGORY
  );
});
const selectedCategory = ref(storedCategory.value);
const categoriesMapped = computed(() => {
  return ListExpenseCategories;
});
// Watch for changes in selectedCategory and update expenseData
watch(selectedCategory, (newCategory) => {
  if (newCategory.id === UNSELECTED_CATEGORY_ID) {
    return;
  }
  expenseData.value.category = newCategory.id;
  handleInputBlur();
});

watch(storedCategory, (newVal) => {
  if (newVal) {
    selectedCategory.value = newVal;
  }
});

watch(isModalVisible, (newVal) => {
  if (newVal) {
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }
});

const isCategorySelected = computed(() => {
  return selectedCategory.value.id !== UNSELECTED_CATEGORY_ID;
});

const categoryIcon = computed(() => {
  return (
    ExpenseCategoryIcons[expenseData.value.category] ??
    ExpenseCategoryIcons[ExpenseCategory.SUBSCRIPTION]
  );
});

const isDateSet = computed(() => {
  return !!expenseData.value.date;
});

// Date format: 23/2/2024
const formattedDate = computed(() => {
  if (!expenseData.value.date) return 'Date';
  const d = new Date(expenseData.value.date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
});

const errors = ref({
  name: false,
  category: false,
  date: false,
  amount: false,
});

const isFormValid = computed(() => {
  return (
    !errors.value.name &&
    !errors.value.category &&
    !errors.value.date &&
    !errors.value.amount
  );
});

const handleInputBlur = () => {
  if (!isFormValid.value) {
    validateForm();
  }
};

const isDesktop = ref(true);

const startOfMonth = computed(() => {
  const date = new Date();
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return convertToDate(date);
});
const endOfMonth = computed(() => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  date.setHours(23, 59, 59, 999);
  return convertToDate(date);
});

// Format: yyyy-mm-dd
const convertToDate = (date) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const handleDateChange = ($event) => {
  expenseData.value.date = $event;
  handleInputBlur();
};

const closeModal = () => {
  // clear the errors
  errors.value = {
    name: false,
    category: false,
    date: false,
    amount: false,
  };
  selectedCategory.value = DEFAULT_CATEGORY; // Reset selected category
  budgetLimitExceeded.value = false;
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
    amount: !expenseData.value.amount || Number(expenseData.value.amount) <= 0,
  };
  return !Object.values(errors.value).includes(true); // Return true if no errors
};

const budgetLimitExceeded = ref(false);

const limitExceededMessage = computed(() => {
  return `You can't ${
    modalStore.modalMode === 'edit' ? 'update' : 'add'
  } this expense because it would exceed the limit`;
});
// Function to submit the expense data
const submitExpense = () => {
  if (validateForm()) {
    let transactionCompleted = false;
    if (modalStore.modalMode === 'edit') {
      const { success } = expenseStore.updateExpense(
        expenseData.value.id,
        expenseData.value,
      );
      transactionCompleted = success;
    } else {
      const { success } = expenseStore.addExpense(expenseData.value);
      transactionCompleted = success;
    }
    if (transactionCompleted) {
      closeModal();
    } else {
      budgetLimitExceeded.value = true;
    }
  }
};

const checkScreenSize = () => {
  if (window.innerWidth >= 744) {
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
  background-color: $dark-background;
  padding: 27px;
  overflow: auto;

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
    height: fit-content;

    .modal-title {
      font-size: 36px;
      text-align: center;
      margin: 0px $closeButtonSize 84px;
    }

    .input-group {
      width: 100%;
      position: relative;
      display: flex;
      justify-content: center;

      &:not(:last-of-type) {
        margin-bottom: 48px;
      }

      &:last-of-type {
        margin-bottom: 64px;
      }

      .dropdown-container {
        width: 100%;
      }

      .input-preview {
        .category-selected {
          position: relative;

          .expense-icon {
            position: absolute;
            width: 40px;
            height: 40px;
            top: 50%;
            // 8px is gap between icon and text
            transform: translate(calc(-100% - 8px), -50%);
          }
        }
      }

      label {
        display: block;
        margin-bottom: 5px;
        font-size: 1rem;
      }

      .input-error {
        border-color: $error-color;
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

  @media only screen and (min-width: 744px) {
    background-color: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(8px);

    .modal-container {
      border-radius: 8px;
      max-width: 450px;
      padding: 28px;
    }
  }

  @media only screen and (min-height: 680px) {
    align-items: center;
  }
}
</style>
