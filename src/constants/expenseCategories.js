export const ExpenseCategory = {
  OCIO: 'ocio',
  FOOD: 'food',
  SALUD: 'salud',
  SAVINGS: 'savings',
  DEBTS: 'debts',
  SUBSCRIPTION: 'subscription',
  VARIOUS: 'various',
  RENT: 'rent',
};

export const ExpenseCategoryNames = {
  [ExpenseCategory.OCIO]: 'Hobbie',
  [ExpenseCategory.FOOD]: 'Food',
  [ExpenseCategory.SALUD]: 'Health',
  [ExpenseCategory.SAVINGS]: 'Savings',
  [ExpenseCategory.DEBTS]: 'Debts',
  [ExpenseCategory.SUBSCRIPTION]: 'Subscription',
  [ExpenseCategory.VARIOUS]: 'Various',
  [ExpenseCategory.RENT]: 'Rent',
};

export const ExpenseCategoryIcons = {
  [ExpenseCategory.OCIO]: 'ocio',
  [ExpenseCategory.FOOD]: 'food',
  [ExpenseCategory.SALUD]: 'salud',
  [ExpenseCategory.SAVINGS]: 'savings',
  [ExpenseCategory.DEBTS]: 'debts',
  [ExpenseCategory.SUBSCRIPTION]: 'subscription',
  [ExpenseCategory.VARIOUS]: 'various',
  [ExpenseCategory.RENT]: 'rent',
};

export const ListExpenseCategories = [
  {
    id: ExpenseCategory.OCIO,
    name: ExpenseCategoryNames[ExpenseCategory.OCIO],
    icon: ExpenseCategoryIcons[ExpenseCategory.OCIO],
  },
  {
    id: ExpenseCategory.FOOD,
    name: ExpenseCategoryNames[ExpenseCategory.FOOD],
    icon: ExpenseCategoryIcons[ExpenseCategory.FOOD],
  },
  {
    id: ExpenseCategory.SALUD,
    name: ExpenseCategoryNames[ExpenseCategory.SALUD],
    icon: ExpenseCategoryIcons[ExpenseCategory.SALUD],
  },
  {
    id: ExpenseCategory.SAVINGS,
    name: ExpenseCategoryNames[ExpenseCategory.SAVINGS],
    icon: ExpenseCategoryIcons[ExpenseCategory.SAVINGS],
  },
  {
    id: ExpenseCategory.DEBTS,
    name: ExpenseCategoryNames[ExpenseCategory.DEBTS],
    icon: ExpenseCategoryIcons[ExpenseCategory.DEBTS],
  },
  {
    id: ExpenseCategory.SUBSCRIPTION,
    name: ExpenseCategoryNames[ExpenseCategory.SUBSCRIPTION],
    icon: ExpenseCategoryIcons[ExpenseCategory.SUBSCRIPTION],
  },
  {
    id: ExpenseCategory.VARIOUS,
    name: ExpenseCategoryNames[ExpenseCategory.VARIOUS],
    icon: ExpenseCategoryIcons[ExpenseCategory.VARIOUS],
  },
  {
    id: ExpenseCategory.RENT,
    name: ExpenseCategoryNames[ExpenseCategory.RENT],
    icon: ExpenseCategoryIcons[ExpenseCategory.RENT],
  },
];
