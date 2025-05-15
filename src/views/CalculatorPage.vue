<template>
  <div class="calculator-page">
    <DashboardHeader />

    <div class="calculator-content-wrap">
      <div class="calculator-cards-wrap">
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
      </div>
      <ExpensesList />
    </div>
    <IconCustom
      name="icon-add"
      class="circle-add-icon box-shadow"
      @click="handleNewExpense"
    />
    <ExpenseModal />
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
import ExpensesList from '@/components/widgets/ExpensesList.vue';
import ExpenseModal from '@/components/widgets/ExpenseModal.vue';
import { useModalStore } from '@/stores/useModalStore';

const modalStore = useModalStore();

const handleNewExpense = () => {
  modalStore.openModal();
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

  .calculator-content-wrap {
    display: flex;
    flex-direction: column;
    gap: inherit;

    .calculator-cards-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: inherit;
      height: fit-content;
    }
  }

  .dashboard-header {
    padding-bottom: 24px;
    border-bottom: 1px solid $border-solid-color;
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
    border-top: 1px dotted $border-dotted-color;
  }

  .card-section {
    &.section-fix-expenses {
      gap: 24px;
      padding: 16px 14px 22px;
    }
  }

  @media only screen and (min-width: 744px) {
    // tablet styles
    .circle-add-icon {
      display: none;
    }

    .calculator-content-wrap {
      .calculator-cards-wrap {
        flex-wrap: nowrap;
        gap: 58px;
        justify-content: space-between;
      }
    }
  }
  @media only screen and (min-width: 1024px) {
    // desktop styles
    padding-bottom: 24px;
    max-height: 100vh;

    .calculator-content-wrap {
      flex-direction: row-reverse;
      overflow: auto;

      .calculator-cards-wrap {
        flex-wrap: nowrap;
        gap: 42px;
        justify-content: space-between;
        flex-basis: 50%;
      }
      .expenses-list {
        flex-basis: 50%;
        border: unset;
      }
    }
  }
}
</style>
