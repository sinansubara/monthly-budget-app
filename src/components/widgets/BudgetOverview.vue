<template>
  <div class="budget-overview">
    <CardSection title="Income">
      <span class="money-amount">{{ incomeFormatted }}</span>
    </CardSection>
    <CircularProgress
      key="spentKey"
      :transition-duration="500"
      :radius="88"
      :stroke-width="14"
      :value="userSpentPercentage"
      :show-percentage="true"
      :text="'Spent'"
    />
    <div class="money-section-wrap">
      <CardSection title="Available">
        <span class="money-amount accent-text-color">{{
          availableFormatted
        }}</span>
      </CardSection>
      <CardSection title="Spent">
        <span class="money-amount secondary-text-color">{{
          spentFormatted
        }}</span>
      </CardSection>
    </div>
    <ButtonCustom
      :button-text="'Reset Expenses'"
      @click="handleResetExpenses"
    />
  </div>
</template>

<script setup>
import CardSection from '@/components/widgets/CardSection.vue';
import CircularProgress from '@/components/widgets/CircularProgress.vue';
import ButtonCustom from '@/components/elements/ButtonCustom.vue';
import { useUserStore } from '@/stores/useUserStore';
import { useExpenseStore } from '@/stores/useExpensesStore';
import { computed } from 'vue';
import convertToCurrency from '@/utilities/convertToCurrency';

const userStore = useUserStore();
const expenseStore = useExpenseStore();

const convertToNumber = (value) => {
  return typeof value === 'number' ? value : parseFloat(value);
};

const userSpent = computed(() => convertToNumber(userStore.getTotalExpenses));

const initialBudget = computed(() => {
  return userStore.getInitialBudget;
});

const availableBudget = computed(() => {
  return userStore.getRemainingBudgetDeductingGoals;
});

const userSpentPercentage = computed(() => {
  const income = initialBudget.value;
  if (income <= 0) return 0;

  // Calculate percentage based on total income, not remaining budget
  const percentage = (userSpent.value / income) * 100;

  // Ensure percentage doesn't exceed 100%
  return Math.min(percentage, 100);
});

const incomeFormatted = computed(() =>
  convertToCurrency(convertToNumber(userStore.getIncome)),
);
const availableFormatted = computed(() =>
  convertToCurrency(availableBudget.value),
);
const spentFormatted = computed(() =>
  convertToCurrency(convertToNumber(userStore.getTotalExpenses)),
);

const handleResetExpenses = () => {
  expenseStore.resetExpenses();
};
</script>

<style lang="scss">
.budget-overview {
  display: flex;
  flex-direction: column;
  gap: 30px;

  .money-amount {
    font-size: 26px;
    line-height: 36px;
    color: $dark-text;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .money-section-wrap {
    display: flex;
    flex-direction: row;
    gap: 8px;
    width: 100%;
    padding-bottom: 24px;
    border-bottom: 1px dotted $border-dotted-color;

    .money-amount {
      font-size: 18px;
      line-height: 24px;
    }

    .card-section {
      background-color: $dark-background;

      .card-section-title {
        color: $light-text;
      }
    }
  }
}
</style>
