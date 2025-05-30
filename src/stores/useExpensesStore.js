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
      const expenseDate = expense.date
        ? new Date(expense.date).getTime()
        : currentDate;
      const defaultCategory = ExpenseCategory.SUBSCRIPTION;
      const newExpense = {
        category: defaultCategory,
        ...expense,
        id: currentDate.toString(),
        date: expenseDate,
      };
      return userStore.addExpense(newExpense); // Call addExpense action in userStore
    },

    updateExpense(expenseId, updatedData) {
      const userStore = useUserStore();
      const expenseDate = updatedData.date
        ? new Date(updatedData.date).getTime()
        : Date.now();
      return userStore.updateExpense(expenseId, {
        ...updatedData,
        date: expenseDate,
      });
    },

    removeExpense(expenseId) {
      const userStore = useUserStore();
      userStore.removeExpense(expenseId); // Call removeExpense action in userStore
    },

    resetExpenses() {
      const userStore = useUserStore();
      userStore.setExpenses([]);
    },
  },
});
