<template>
  <div
    v-if="!actionsVisible"
    v-bind="$attrs"
    class="expense-item"
    @click="handleItemClick"
  >
    <div class="expense-item-wrap">
      <ImageCircle
        v-if="expense.logo"
        :image-name="expense.logo"
      />
      <IconCustom
        v-else
        :name="'savings'"
        class="expense-icon"
      />
      <div class="expense-details">
        <span class="expense-category truncate">{{
          getCategoryName(expense.category)
        }}</span>
        <div class="expense-date-wrap">
          <span class="expense-date-text truncate"> Date: </span>
          <span class="expense-date truncate">{{
            formatDate(expense.date)
          }}</span>
        </div>
      </div>
      <span class="expense-amount">{{
        convertToCurrency(expense.amount)
      }}</span>
    </div>
  </div>
  <div
    v-else
    v-bind="$attrs"
    class="expense-item expense-item-actions"
    @click="closeActions"
  >
    <div class="actions-buttons-wrap">
      <div
        class="action-button"
        @click.stop="handleEditExpense"
      >
        <IconCustom
          name="edit"
          class="action-icon accent-text-color"
        />
        <span class="action-text accent-text-color">Edit</span>
      </div>
      <div
        class="action-button"
        @click.stop="handleRemoveExpense"
      >
        <IconCustom
          name="delete"
          class="action-icon error-text-color"
        />
        <span class="action-text error-text-color">Delete</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import ImageCircle from '@/components/elements/ImageCircle.vue';
import IconCustom from '@/components/elements/IconCustom.vue';
import { ExpenseCategoryNames } from '@/constants/expenseCategories.js';
import convertToCurrency from '@/utilities/convertToCurrency.js';
import { ref } from 'vue';

const props = defineProps({
  expense: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['remove-expense', 'edit-expense']);

const actionsVisible = ref(false);

const getCategoryName = (category) => {
  return ExpenseCategoryNames[category] ?? category;
};

// format: Month, DD-YYYY
const formatDate = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString('en-US', { month: 'long' });
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${month}, ${day}-${year}`;
};

const toggleActions = () => {
  actionsVisible.value = !actionsVisible.value;
};

const closeActions = () => {
  actionsVisible.value = false;
};

const handleItemClick = () => {
  toggleActions();
};

const handleRemoveExpense = () => {
  emit('remove-expense', props.expense);
};

const handleEditExpense = () => {
  emit('edit-expense', props.expense);
};
</script>

<style lang="scss">
.expense-item {
  display: flex;
  align-items: center;
  border-top: 1px dotted $border-dotted-color;
  height: 75px;

  .expense-item-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
    color: $light-text;
    width: 100%;

    .image-circle,
    .expense-icon {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
    }

    .expense-details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;

      .expense-category {
        font-size: 21px;
        line-height: 100%;
        text-transform: capitalize;
      }

      .expense-date-wrap {
        display: flex;
        gap: 8px;

        .expense-date-text {
          font-size: 11px;
          line-height: 15px;
        }

        .expense-date {
          font-size: 12px;
          line-height: 16px;
          font-weight: 700;
        }
      }
    }

    .expense-amount {
      font-size: 30px;
      line-height: 100%;
      margin-left: auto;
    }
  }

  &.expense-item-actions {
    display: flex;
    justify-content: center;
    background-color: $box-background;

    .actions-buttons-wrap {
      display: flex;
      gap: 24px;
      // gap: 55px; // for bigger screen

      .action-button {
        display: flex;
        gap: 2px;
        padding: 4px 8px;

        .action-icon {
          width: 24px;
          height: 24px;
        }

        .action-text {
          font-size: 18px;
          text-transform: capitalize;
        }
      }
    }
  }
}
</style>
