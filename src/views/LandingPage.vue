<template>
  <div class="landing-page">
    <!-- Desktop Image on the Left -->
    <div
      v-if="isDesktop"
      class="image-container"
    >
      <span class="landing-image-text">Calculate smarter, spend wiser ...</span>
      <img
        src="../assets/images/home-Illustrator.png"
        alt="Landing Page Illustration"
      />
    </div>

    <!-- Form Section for Inputs and Button -->
    <div class="landing-form">
      <div class="landing-form-container">
        <div class="main-header-title">
          <span>Monthly</span>
          <span class="accent-text-color">Budget</span>
        </div>
        <div class="landing-form-wrap">
          <InputCustom
            v-for="(item, index) in formData"
            :key="index"
            :value="item.value"
            :input-type="item.type"
            :placeholder="item.placeholder"
            :min-number="item.minNumber"
            :max-number="item.maxNumber"
            @input="item.value = $event"
          />
        </div>
        <ButtonCustom
          :button-text="'Start Your Calculation'"
          @click="handleCalculation"
        />
        <span
          v-if="isGoalLargerThanIncome && showErrorMessage"
          class="error-message landing-error-message"
          >{{ randomErrorMessage }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
// Detect if the screen is in desktop view using a computed property
import { ref, onMounted, reactive, computed, onUnmounted, watch } from 'vue';
import InputCustom from '@/components/elements/InputCustom.vue';
import ButtonCustom from '@/components/elements/ButtonCustom.vue';
import { setUserData } from '@/utilities/localStorageUtils';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';

const router = useRouter();
const userStore = useUserStore();

const funnyErrorMessages = [
  "Whoa! Goal's above your income — try shrinking it.",
  "Too ambitious! Goal's bigger than your income.",
  "Nice try, but your income can't keep up!",
  "Slow down, your income's not that strong.",
  'Oops! Your goal went a bit overboard.',
  'Your wallet says “nope” to that goal.',
  'Goal > Income? Math says try again.',
  "Your goal's flexing too hard — dial it back!",
  "That's a bold goal. Income disagrees.",
  'Aim high, but not that high!',
  'Your goal just outgrew your budget.',
];

const randomErrorMessage = ref(funnyErrorMessages[0]);

const setRandomErrorMessage = () => {
  randomErrorMessage.value =
    funnyErrorMessages[Math.floor(Math.random() * funnyErrorMessages.length)];
};

const isDesktop = ref(true);
const showErrorMessage = ref(false);

const formData = reactive([
  {
    id: 'income',
    placeholder: 'Insert Your Income',
    value: '',
    type: 'number',
    minNumber: 1,
  },
  {
    id: 'name',
    placeholder: 'Insert Your Name',
    value: '',
    type: 'text',
  },
  {
    id: 'goals',
    placeholder: 'Insert Your Goals',
    value: '',
    type: 'number',
    minNumber: 0,
  },
]);

const isGoalLargerThanIncome = computed(() => {
  const income = formData.find((i) => i.id === 'income');
  const incomeValue = parseFloat(income.value);
  const goals = formData.find((i) => i.id === 'goals');
  const goalsValue = parseFloat(goals.value);
  return goalsValue > incomeValue;
});

const isFormValid = computed(() => {
  return formData.every((item) => {
    if (item.type === 'number') {
      const itemValue = parseFloat(item.value);
      if (item.id === 'goals') {
        const income = formData.find((i) => i.id === 'income');
        const incomeValue = parseFloat(income.value);
        return itemValue <= incomeValue;
      }
      return itemValue >= item.minNumber;
    }
    return item.value && item.value.trim() !== '';
  });
});

const currentUserMapData = computed(() => {
  return formData.reduce(
    (acc, item) => {
      acc[item.id] = item.value;
      return acc;
    },
    {
      expenses: [],
    },
  );
});

const checkScreenSize = () => {
  if (window.innerWidth >= 744) {
    isDesktop.value = true; // Show the image for desktop
  } else {
    isDesktop.value = false; // Hide the image for mobile
  }
};

const handleCalculation = () => {
  if (!isFormValid.value) {
    if (isGoalLargerThanIncome.value) {
      showErrorMessage.value = true;
      setRandomErrorMessage();
    }
    return;
  }
  userStore.login(currentUserMapData.value);
  // set user data to local storage
  setUserData(currentUserMapData.value);
  // navigate to the next page
  router.push({ name: 'calculator' });
};

watch(isGoalLargerThanIncome, (newValue) => {
  if (!newValue) {
    showErrorMessage.value = false;
  }
});

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<style lang="scss">
/* Responsive Media Queries */
/* Mobile first approach */
.landing-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: $dark-background;

  .image-container {
    display: none; // Hide the image on mobile
  }

  .landing-form {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 27px;
    color: $white-text;
    text-align: center;
    height: 100%;
    overflow: auto;

    .landing-form-container {
      display: flex;
      flex-direction: column;
      padding: 0px 8px;

      .main-header-title {
        margin-bottom: 52px;
      }

      .landing-form-wrap {
        display: flex;
        flex-direction: column;
        gap: 48px;
        margin-bottom: 64px;
      }
    }
  }
  /* Small devices (portrait tablets and large phones, 744px and up) */
  @media only screen and (min-width: 744px) {
    // Tablet specific styles
    .image-container {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;
      height: 100%;
      flex: 1 1 50%;
      background-color: $box-background;

      .landing-image-text {
        font-size: 42px;
        max-width: 357px;
        line-height: 58px;
        font-style: italic;
        margin-left: 55px;
      }

      img {
        max-width: 100%;
        height: auto;
        overflow: hidden;
      }
    }
    .landing-form {
      flex-basis: 50%;
    }
  }

  /* Large devices (laptops/desktops, 1024px and up) */
  @media only screen and (min-width: 1024px) {
    // Desktop specific styles
    .landing-form {
      padding-left: 120px;
      padding-right: 120px;
    }
  }

  @media only screen and (min-height: 618px) {
    .landing-form {
      justify-content: center;
    }
  }
}
</style>
