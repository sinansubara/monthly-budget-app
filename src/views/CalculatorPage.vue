<template>
  <div class="calculator-page">
    <DashboardHeader />

    <InfoCard title="Calculation">
      <template #content>
        <BudgetOverview />
      </template>
    </InfoCard>
    <InfoCard title="Optionals">
      <template #content>
        <CardSection
          title="Choose any fix expenses"
          class="section-fix-expenses"
        >
          <FixExpenses />
        </CardSection>
        <GoalsSection />
      </template>
    </InfoCard>
    <IconCustom
      name="icon-add"
      class="circle-add-icon box-shadow"
      @click="handleNewExpense"
    />
  </div>
</template>

<script setup>
import DashboardHeader from '@/components/widgets/DashboardHeader.vue';
import IconCustom from '@/components/elements/IconCustom.vue';
import InfoCard from '@/components/widgets/InfoCard.vue';
import BudgetOverview from '@/components/widgets/BudgetOverview.vue';
import CardSection from '@/components/widgets/CardSection.vue';
import FixExpenses from '@/components/widgets/FixExpenses.vue';
import GoalsSection from '@/components/widgets/GoalsSection.vue';

const handleNewExpense = () => {
  console.log('New expense modal should open');
};
</script>

<style lang="scss">
/* Responsive Media Queries */
/* Mobile first approach */
.calculator-page {
  display: flex;
  flex-direction: column;
  padding: 30px 32px 56px;
  background-color: $dark-background;
  height: 100%;
  gap: 32px;

  .dashboard-header {
    padding-bottom: 24px;
    border-bottom: 1px solid $border-color;
  }

  .circle-add-icon {
    display: flex;
    position: fixed;
    bottom: 22px;
    right: 30px;
    border-radius: 50%;
  }

  .goals-section {
    padding-top: 13px;
    border-top: 1px dotted $border-color;
  }

  .card-section {
    &.section-fix-expenses {
      gap: 24px;
      padding: 16px 14px 22px;
    }
  }

  @media (min-width: 600px) {
    .circle-add-icon {
      display: none;
    }
  }
  // @media (min-width: 768px) {
  // }
  // @media (min-width: 1024px) {
  // }
}
</style>
