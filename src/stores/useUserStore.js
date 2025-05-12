import { defineStore } from 'pinia';
import {
  getUserData,
  setUserData,
  removeUserData,
} from '@/utilities/localStorageUtils';

export const useUserStore = defineStore('user', {
  state: () => {
    const userData = getUserData();
    return {
      user: userData || {
        name: '',
        income: '',
        goals: '',
        expenses: [],
      },
      isAuthenticated: !!userData,
    };
  },

  getters: {
    getUserData: (state) => state.user,
    getName: (state) => state.user.name,
    getIncome: (state) => state.user.income,
    getGoals: (state) => state.user.goals,
    getExpenses: (state) => state.user.expenses,
    getTotalExpenses: (state) => {
      return state.user.expenses.reduce(
        (sum, expense) => sum + (parseFloat(expense.amount) || 0),
        0,
      );
    },
    getRemainingBudget: (state) => {
      const income = parseFloat(state.user.income) || 0;
      const goals = parseFloat(state.user.goals) || 0;
      const totalExpenses = state.getTotalExpenses;
      return income - goals - totalExpenses;
    },
    getIsAuthenticated: (state) => state.isAuthenticated,
  },

  actions: {
    // Load user from localStorage
    loadUser() {
      const userData = getUserData();
      if (userData) {
        this.user = userData;
        this.isAuthenticated = true;
      }
    },

    // Update user data in store and localStorage
    updateUserData(newUserData) {
      this.user = newUserData;
      this.isAuthenticated = true;
      setUserData(this.user); // Save updated data to localStorage
    },

    // Update individual user fields (e.g., name, income, goals)
    updateField(field, value) {
      this.user[field] = value;
      setUserData(this.user); // Update localStorage
    },

    // Clear user data
    clearUserData() {
      this.user = { name: '', income: '', goals: '', expenses: [] };
      this.isAuthenticated = false;
      removeUserData(); // Remove from localStorage
    },

    // Log in user
    login(userData) {
      this.updateUserData(userData);
    },

    // Log out user
    logout() {
      this.clearUserData(); // Clear user data and log out
    },

    // Expense-related actions
    addExpense(expense) {
      this.user.expenses.push(expense);
      setUserData(this.user); // Update user data in localStorage
    },

    updateExpense(expenseId, updatedData) {
      const index = this.user.expenses.findIndex((e) => e.id === expenseId);
      if (index !== -1) {
        this.user.expenses[index] = {
          ...this.user.expenses[index],
          ...updatedData,
        };
        setUserData(this.user); // Update user data in localStorage
        return true;
      }
      return false;
    },

    removeExpense(expenseId) {
      this.user.expenses = this.user.expenses.filter((e) => e.id !== expenseId);
      setUserData(this.user); // Update user data in localStorage
    },
  },
});
