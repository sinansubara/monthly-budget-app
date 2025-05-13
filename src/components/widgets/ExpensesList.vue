<template>
  <div class="expenses-list">
    <div class="expenses-list-header">
      <span class="expenses-list-title">Expenses</span>
      <ListDropdown
        v-model="selectedCategory"
        :items="filterCategories"
        :dropdown-label="'Filter Expenses'"
      />
    </div>
    <div
      v-for="(expense, index) in expenses"
      :key="index"
      class="expense-item"
    >
      <div class="expense-item-wrap">
        <ImageCircle
          v-if="expense.logo"
          :image-name="expense.logo"
        />
        <IconCustom
          v-else
          :name="'icon-add'"
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
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useExpenseStore } from '@/stores/useExpensesStore';
import {
  ExpenseCategory,
  ExpenseCategoryNames,
} from '@/constants/expenseCategories.js';
import ImageCircle from '@/components/elements/ImageCircle.vue';
import IconCustom from '@/components/elements/IconCustom.vue';
import ListDropdown from '@/components/elements/ListDropdown.vue';
import convertToCurrency from '@/utilities/convertToCurrency.js';

const DEFAULT_CATEGORY_ALL = {
  id: 'All',
  name: 'All',
};
const expenseStore = useExpenseStore();

const expenses = computed(() => {
  return expenseStore.expenses.filter((expense) => {
    return (
      selectedCategory.value.id === DEFAULT_CATEGORY_ALL.id ||
      expense.category === selectedCategory.value.id
    );
  });
});

const categoriesMapped = computed(() => {
  return Object.values(ExpenseCategory).map((value) => {
    return {
      id: value,
      name: ExpenseCategoryNames[value],
    };
  });
});
const filterCategories = computed(() => [
  DEFAULT_CATEGORY_ALL,
  ...categoriesMapped.value,
]);

const selectedCategory = ref(DEFAULT_CATEGORY_ALL);

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
</script>

<style lang="scss">
.expenses-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1px;
  padding-top: 21px;
  border-top: 1px solid $border-solid-color;

  .expenses-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding-bottom: 22px;

    .expenses-list-title {
      font-size: 16px;
      line-height: 22px;
      color: $secondary-text;
    }

    .expenses-filter-dropdown {
      display: flex;
      color: white;
    }
  }

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

      .image-circle {
        width: 40px;
        height: 40px;
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
  }
}
</style>
