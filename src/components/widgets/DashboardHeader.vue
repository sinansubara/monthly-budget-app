<template>
  <div class="dashboard-header">
    <div class="dashboard-header-wrap">
      <IconCustom
        name="money-off"
        class="money-off-icon"
      />
      <div class="header-title-wrap">
        <span class="header-subtitle">Expenses</span>
        <div class="main-header-title">
          <span>Monthly</span>
          <span class="accent-text-color">Budget</span>
        </div>
      </div>
      <div class="header-right-wrap">
        <ButtonCustom
          class="new-expense-button"
          :button-text="'New Expense'"
          @click="handleNewExpense"
        />
        <div class="right-user-info">
          <IconCustom
            name="user"
            class="user-icon"
          />
          <span class="user-name"> Welcome, {{ userName }}</span>
        </div>
      </div>
    </div>
    <span class="header-welcome-text"> Welcome, {{ userName }}! </span>
  </div>
</template>

<script setup>
import IconCustom from '@/components/elements/IconCustom.vue';
import ButtonCustom from '@/components/elements/ButtonCustom.vue';
import { useUserStore } from '@/stores/useUserStore';
import { computed } from 'vue';

const userStore = useUserStore();
const userName = computed(() => userStore.getName);

const handleNewExpense = () => {
  console.log('New expense modal should open');
};
</script>

<style lang="scss">
.dashboard-header {
  display: flex;
  flex-direction: column;
  gap: 14px;

  .dashboard-header-wrap {
    display: flex;
    align-items: center;
    gap: 8px;

    .money-off-icon {
      width: 52px;
      height: 52px;
      color: white;
      opacity: 0.3;
      flex-shrink: 0;
    }

    .header-title-wrap {
      display: flex;
      flex-direction: column;

      .header-subtitle {
        font-size: 12px;
        line-height: 16px;
        color: $subtitle-text;
      }

      .main-header-title {
        font-size: 30px;
        line-height: 100%;
        gap: 8px;
        justify-content: flex-start;
      }
    }

    .header-right-wrap {
      display: none;

      .right-user-info {
        display: none;
      }
    }
  }

  .header-welcome-text {
    font-size: 16px;
    line-height: 24px;
    color: $white-text;
  }

  @media only screen and (min-width: 600px) {
    .dashboard-header-wrap {
      .new-expense-button {
        display: flex;
        padding: 10px 32px;
        margin-left: auto;

        .button-text {
          font-size: 18px;
          line-height: 22px;
        }
      }
    }
  }
}
</style>
