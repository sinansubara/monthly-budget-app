<template>
  <div class="calculator-page">
    <DashboardHeader />
  </div>
</template>

<script setup>
import DashboardHeader from '@/components/widgets/DashboardHeader.vue';
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

  // @media (min-width: 600px) {
  // }
  // @media (min-width: 768px) {
  // }
  // @media (min-width: 1024px) {
  // }
}
</style>
