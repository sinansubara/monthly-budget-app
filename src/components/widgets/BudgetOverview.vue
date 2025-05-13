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
  </div>
</template>

<script setup>
import CardSection from '@/components/widgets/CardSection.vue';
import CircularProgress from '@/components/widgets/CircularProgress.vue';
import { useUserStore } from '@/stores/useUserStore';
import { computed } from 'vue';

const userStore = useUserStore();

const convertToCurrency = (value) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(value);
};

const convertToNumber = (value) => {
  return typeof value === 'number' ? value : parseFloat(value);
};

const userIncome = computed(() => convertToNumber(userStore.getIncome));
const userAvailable = computed(() =>
  convertToNumber(userStore.getRemainingBudget),
);
const userSpent = computed(() => convertToNumber(userStore.getTotalExpenses));

const userSpentPercentage = computed(() => {
  const income = userIncome.value;
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
  convertToCurrency(convertToNumber(userStore.getRemainingBudget)),
);
const spentFormatted = computed(() =>
  convertToCurrency(convertToNumber(userStore.getTotalExpenses)),
);
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
  }

  .money-section-wrap {
    display: flex;
    flex-direction: row;
    gap: 8px;
    width: 100%;

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
