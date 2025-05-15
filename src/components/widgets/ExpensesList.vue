<template>
  <div class="expenses-list">
    <div class="expenses-list-header">
      <span class="expenses-list-title">Description</span>
      <ListDropdown
        v-model="selectedCategory"
        :items="filterCategories"
        :dropdown-label="'Filter Expenses'"
      />
    </div>
    <div class="expenses-list-content">
      <ExpenseItem
        v-for="expense in expenses"
        :key="expense.id"
        :expense="expense"
        @remove-expense="handleRemoveExpense"
        @edit-expense="handleEditExpense"
      />
    </div>
    <div
      v-if="noExpenses"
      class="no-expenses-wrap"
    >
      <div class="no-expenses-text">
        Looks like you haven't added any
        <span class="accent-text-color">expenses yet.</span>
      </div>
      <div class="no-expenses-subtext">
        No worries, just hit the
        <span class="accent-text-color">'Add'</span> button to get started
      </div>
      <IconCustom
        name="cart"
        class="no-expenses-icon"
      />
    </div>
    <div
      v-if="noExpensesForCategory"
      class="no-expenses-wrap"
    >
      <div class="no-expenses-text">
        No expenses found for
        <span class="accent-text-color"> "{{ selectedCategory.name }}" </span>
        category
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useExpenseStore } from '@/stores/useExpensesStore';
import { useModalStore } from '@/stores/useModalStore';
import { ListExpenseCategories } from '@/constants/expenseCategories.js';
import IconCustom from '@/components/elements/IconCustom.vue';
import ListDropdown from '@/components/elements/ListDropdown.vue';
import ExpenseItem from '@/components/widgets/ExpenseItem.vue';

const DEFAULT_CATEGORY_ALL = {
  id: 'All',
  name: 'All',
};
const expenseStore = useExpenseStore();
const modalStore = useModalStore();

const storeExpenses = computed(() => {
  return expenseStore.expenses;
});

const expenses = computed(() => {
  return storeExpenses.value.filter((expense) => {
    return (
      selectedCategory.value.id === DEFAULT_CATEGORY_ALL.id ||
      expense.category === selectedCategory.value.id
    );
  });
});

const categoriesMapped = computed(() => {
  return ListExpenseCategories;
});
const filterCategories = computed(() => [
  DEFAULT_CATEGORY_ALL,
  ...categoriesMapped.value,
]);

const selectedCategory = ref(DEFAULT_CATEGORY_ALL);

const noExpenses = computed(() => {
  return storeExpenses.value.length === 0;
});

const noExpensesForCategory = computed(() => {
  return !noExpenses.value && expenses.value.length === 0;
});

const handleRemoveExpense = (expense) => {
  expenseStore.removeExpense(expense.id);
};
const handleEditExpense = (expense) => {
  modalStore.openModal('edit', expense);
};
</script>

<style lang="scss">
.expenses-list {
  display: flex;
  flex-direction: column;
  width: 100%;
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

  .expenses-list-content {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .no-expenses-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;

    .no-expenses-text {
      font-size: 22px;
      color: $light-text;
      padding-bottom: 24px;
      font-weight: 700;
      text-transform: capitalize;
      text-align: center;
    }

    .no-expenses-subtext {
      font-size: 12px;
      line-height: 16px;
      color: $light-text;
      padding-bottom: 18px;
    }

    .no-expenses-icon {
      width: 84px;
      height: 84px;
      color: $box-color-light;
    }
  }

  @media only screen and (min-width: 744px) {
    .expenses-list-header {
      padding-bottom: 30px;

      .expenses-list-title {
        font-size: 21px;
        line-height: 29px;
      }
    }
  }

  @media only screen and (min-width: 1024px) {
    .expenses-list-content {
      overflow: auto;
    }
  }
}
</style>
