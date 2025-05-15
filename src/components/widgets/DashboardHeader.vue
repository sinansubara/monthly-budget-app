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
        <div
          title="Logout"
          class="right-user-info"
          @click="handleLogout"
        >
          <IconCustom
            name="user"
            class="user-icon"
          />
          <span class="user-name"> Welcome, {{ userName }}</span>
        </div>
      </div>
    </div>
    <span
      title="Logout"
      class="header-welcome-text"
      @click="handleLogout"
    >
      Welcome, {{ userName }}!
    </span>
  </div>
</template>

<script setup>
import IconCustom from '@/components/elements/IconCustom.vue';
import ButtonCustom from '@/components/elements/ButtonCustom.vue';
import { useUserStore } from '@/stores/useUserStore';
import { useModalStore } from '@/stores/useModalStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const modalStore = useModalStore();
const router = useRouter();
const userName = computed(() => userStore.getName);

const handleNewExpense = () => {
  modalStore.openModal();
};

const handleLogout = () => {
  userStore.logout();
  router.push('/');
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
        line-height: 20px;
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
    cursor: pointer;
    width: fit-content;
  }

  @media only screen and (min-width: 744px) {
    .header-welcome-text {
      font-size: 18px;
      line-height: 28px;
    }
    .dashboard-header-wrap {
      .money-off-icon {
        width: 69px;
        height: 69px;
      }
      .header-title-wrap {
        .header-subtitle {
          font-size: 16px;
          line-height: 28px;
        }

        .main-header-title {
          font-size: 36px;
        }
      }
      .header-right-wrap {
        display: flex;
        margin-left: auto;
        gap: 23px;

        .new-expense-button {
          padding: 10px 32px;

          .button-text {
            font-size: 18px;
            line-height: 22px;
          }
        }
      }
    }
  }

  @media only screen and (min-width: 1024px) {
    .header-welcome-text {
      display: none;
    }
    .dashboard-header-wrap {
      .money-off-icon {
        width: 103px;
        height: 103px;
      }
      .header-title-wrap {
        .header-subtitle {
          font-size: 20px;
          line-height: 36px;
          font-weight: 600;
        }

        .main-header-title {
          font-size: 54px;
          font-weight: 800;
        }
      }
      .header-right-wrap {
        .right-user-info {
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          border-radius: 8px;

          &:hover {
            background-color: lighten($dark-background, 5%);
          }

          .user-icon {
            width: 38px;
            height: 38px;
            color: $light-color-base;
          }

          .user-name {
            font-size: 16px;
            line-height: 24px;
            color: $white-text;
          }
        }
      }
    }
  }
}
</style>
