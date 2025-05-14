import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    isModalVisible: false, // Flag to track modal visibility
    modalMode: 'new', // This will track if it's a "new" or "edit" modal
    expenseData: {}, // This will hold the data for "edit" mode (empty for new expense)
  }),

  actions: {
    // Show the modal with an optional mode ('new' or 'edit') and data for editing
    openModal(mode = 'new', data = {}) {
      const validModes = ['new', 'edit'];
      if (!validModes.includes(mode)) return;
      this.isModalVisible = true;
      this.modalMode = mode;
      this.expenseData = { ...data }; // Pre-fill with data for editing
    },

    // Close the modal
    closeModal() {
      this.isModalVisible = false;
      this.modalMode = 'new'; // Reset to 'new' when closing the modal
      this.expenseData = {}; // Clear the data when closing
    },
  },
});
