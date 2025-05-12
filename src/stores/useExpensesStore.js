import { defineStore } from 'pinia';
import { useUserStore } from '@/stores/useUserStore';

export const useExpenseStore = defineStore('expenses', {
  state: () => {
    const userStore = useUserStore();
    return {
      expenses: userStore.user.expenses, // Get expenses directly from userStore
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
      const newExpense = { id: Date.now().toString(), ...expense };
      userStore.addExpense(newExpense); // Call addExpense action in userStore
    },

    updateExpense(expenseId, updatedData) {
      const userStore = useUserStore();
      const index = this.expenses.findIndex((e) => e.id === expenseId);
      if (index !== -1) {
        this.expenses[index] = { ...this.expenses[index], ...updatedData };
        userStore.updateExpense(expenseId, updatedData); // Call updateExpense action in userStore
      }
    },

    removeExpense(expenseId) {
      const userStore = useUserStore();
      this.expenses = this.expenses.filter((e) => e.id !== expenseId);
      userStore.removeExpense(expenseId); // Call removeExpense action in userStore
    },
  },
});
