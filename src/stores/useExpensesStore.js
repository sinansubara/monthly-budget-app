import { defineStore } from 'pinia';
import { useUserStore } from '@/stores/useUserStore';
import { ExpenseCategory } from '@/constants/expenseCategories';
import { computed } from 'vue';

export const useExpenseStore = defineStore('expenses', {
  state: () => {
    const userStore = useUserStore();

    const expenses = computed(() => {
      return userStore.user.expenses || [];
    });
    return {
      expenses,
    };
  },

  getters: {
    getTotalExpenses: (state) => {
      return state.expenses.reduce(
        (sum, expense) => sum + (parseFloat(expense.amount) || 0),
        0,
      );
    },
  },

  actions: {
    addExpense(expense) {
      const userStore = useUserStore();
      const currentDate = Date.now();
      const defaultCategory = ExpenseCategory.SUBSCRIPTION;
      const newExpense = {
        id: currentDate.toString(),
        date: currentDate,
        category: defaultCategory,
        ...expense,
      };
      userStore.addExpense(newExpense); // Call addExpense action in userStore
    },

    updateExpense(expenseId, updatedData) {
      const userStore = useUserStore();
      const index = this.expenses.value.findIndex((e) => e.id === expenseId);
      if (index !== -1) {
        this.expenses.value[index] = {
          ...this.expenses.value[index],
          ...updatedData,
        };
        userStore.updateExpense(expenseId, updatedData); // Call updateExpense action in userStore
      }
    },

    removeExpense(expenseId) {
      const userStore = useUserStore();
      this.expenses.value = this.expenses.value.filter(
        (e) => e.id !== expenseId,
      );
      userStore.removeExpense(expenseId); // Call removeExpense action in userStore
    },

    resetExpenses() {
      const userStore = useUserStore();
      this.expenses.value = [];
      userStore.setExpenses([]);
    },
  },
});
