<template>
  <div class="goals-section">
    <span class="card-header-title">Goals</span>
    <div class="goal-text">
      <p>"Save 10% of this amount entered this month from my salary"</p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.goals-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  .goal-text {
    position: relative;
    font-size: 12px;
    line-height: 16px;
    color: $black-text;
    font-weight: 700;
    padding-left: 14px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color: $primary-color;
    }
  }
}
</style>
