<template>
  <div class="calculator-page">
    <DashboardHeader />

    <IconCustom
      name="icon-add"
      class="circle-add-icon"
      @click="handleNewExpense"
    />
  </div>
</template>

<script setup>
import DashboardHeader from '@/components/widgets/DashboardHeader.vue';
import IconCustom from '@/components/elements/IconCustom.vue';

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

  .dashboard-header {
    padding-bottom: 24px;
    border-bottom: 1px solid $border-color;
  }

  .circle-add-icon {
    display: flex;
    position: absolute;
    bottom: 30px;
    right: 30px;
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
