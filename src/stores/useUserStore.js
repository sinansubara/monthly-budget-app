import { defineStore } from 'pinia';
import {
  getUserData,
  setUserData,
  removeUserData,
} from '@/utilities/localStorageUtils';
import { useToastStore } from '@/stores/useToastStore';

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
    /**
     * Calculates the initial budget based on income and goals.
     * @returns {number} The initial budget.
     */
    getInitialBudget: (state) => {
      const income = parseFloat(state.user.income) || 0;
      const goals = parseFloat(state.user.goals) || 0;
      return income - goals;
    },
    /**
     * Calculates the remaining budget after deducting total expenses.
     * @returns {number} The remaining budget.
     */
    getRemainingBudget: (state) => {
      const income = parseFloat(state.user.income) || 0;
      const totalExpenses = state.getTotalExpenses;
      return income - totalExpenses;
    },
    /**
     * Calculates the remaining budget after deducting goals.
     * @returns {number} The remaining budget after deducting goals.
     */
    getRemainingBudgetDeductingGoals: (state) => {
      const remainingBudget = state.getRemainingBudget;
      const goals = parseFloat(state.user.goals) || 0;
      return remainingBudget - goals;
    },
    getGoalAsPercentage: (state) => {
      const income = parseFloat(state.user.income) || 0;
      const goals = parseFloat(state.user.goals) || 0;
      if (income === 0) return 0; // Avoid division by zero
      const percentage = (goals / income) * 100;
      // make sure to return integer or number with 1 decimal
      return Math.round(percentage * 10) / 10;
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

    wouldExceedBudget(amount, existingExpenseId = null) {
      const availableBudget = this.getInitialBudget;

      // If updating an existing expense, subtract its current amount from the total
      let adjustedTotal = this.getTotalExpenses;
      if (existingExpenseId) {
        const existingExpense = this.user.expenses.find(
          (e) => e.id === existingExpenseId,
        );
        if (existingExpense) {
          adjustedTotal -= parseFloat(existingExpense.amount) || 0;
        }
      }

      // Check if new total would exceed available budget
      return adjustedTotal + parseFloat(amount) > availableBudget;
    },

    // Expense-related actions
    addExpense(expense) {
      const toastStore = useToastStore();
      if (this.wouldExceedBudget(expense.amount)) {
        toastStore.showToast({
          message: `You can't add this expense because it would exceed the limit`,
          icon: '⚠️',
          type: 'error',
          duration: 3000,
        });
        return { success: false, error: 'Expense exceeds available budget' };
      }
      this.user.expenses.push(expense);
      setUserData(this.user); // Update user data in localStorage
      toastStore.showToast({
        message: `Expense "${expense.name}" added successfully`,
        icon: '✅',
        type: 'success',
        duration: 3000,
      });
      return { success: true };
    },

    updateExpense(expenseId, updatedData) {
      const toastStore = useToastStore();
      if (this.wouldExceedBudget(updatedData.amount, expenseId)) {
        toastStore.showToast({
          message: `You can't update this expense because it would exceed the limit`,
          icon: '⚠️',
          type: 'error',
          duration: 5000,
        });
        return {
          success: false,
          error: 'Updated expense exceeds available budget',
        };
      }
      const index = this.user.expenses.findIndex((e) => e.id === expenseId);
      if (index !== -1) {
        this.user.expenses[index] = {
          ...this.user.expenses[index],
          ...updatedData,
        };
        setUserData(this.user); // Update user data in localStorage
        toastStore.showToast({
          message: `Expense "${updatedData.name}" updated successfully`,
          icon: '✅',
          type: 'success',
          duration: 3000,
        });
        return { success: true };
      }
      toastStore.showToast({
        message: `Expense not found`,
        icon: '❌',
        type: 'error',
        duration: 3000,
      });
      return { success: false, error: 'Expense not found' };
    },

    removeExpense(expenseId) {
      this.user.expenses = this.user.expenses.filter((e) => e.id !== expenseId);
      setUserData(this.user); // Update user data in localStorage
    },

    setExpenses(expenses) {
      this.user.expenses = expenses;
      setUserData(this.user); // Update user data in localStorage
    },
  },
});
