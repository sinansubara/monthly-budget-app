<template>
  <div class="fix-expenses">
    <div
      v-for="(expense, index) in fixExpenses"
      :key="index"
      class="fix-expense-item"
    >
      <ImageCircle
        class="image-placeholder"
        :image-name="expense.logo"
      />
      <span class="fix-expense-name truncate">{{ expense.name }}</span>
      <ButtonCustom
        button-text="select"
        button-variation="small-button"
        @click="handleSelectExpense(expense)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import fixedExpenses from '@/data/fixedExpenses.json';
import ButtonCustom from '@/components/elements/ButtonCustom.vue';
import ImageCircle from '@/components/elements/ImageCircle.vue';
import { useExpenseStore } from '@/stores/useExpensesStore';

const expenseStore = useExpenseStore();

const fixExpenses = computed(() => {
  return fixedExpenses.map((expense) => ({
    name: expense.name,
    amount: expense.amount,
    logo: expense.logo,
  }));
});

const handleSelectExpense = (expense) => {
  expenseStore.addExpense(expense);
};
</script>

<style lang="scss">
.fix-expenses {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 21px;

  .fix-expense-item {
    display: flex;
    align-items: center;
    gap: 10px;

    .fix-expense-name {
      font-size: 12px;
      line-height: 16px;
      color: $black-text;
      letter-spacing: 0.09em;
      text-transform: uppercase;
    }

    .button-custom-wrap {
      margin-left: auto;
    }
  }

  @media only screen and (min-width: 1024px) {
    .fix-expense-item {
      gap: 12px;

      .image-circle {
        height: 51px;
        width: 51px;
      }

      .fix-expense-name {
        font-size: 13px;
        line-height: 18px;
      }

      .small-button {
        padding: 2px 14px;

        .button-text {
          font-size: 15px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
