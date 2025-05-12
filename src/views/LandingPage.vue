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
        <div class="landing-form-title">
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
      </div>
    </div>
  </div>
</template>

<script setup>
// Detect if the screen is in desktop view using a computed property
import { ref, onMounted, reactive } from 'vue';
import InputCustom from '@/components/InputCustom.vue';
import ButtonCustom from '@/components/ButtonCustom.vue';

const isDesktop = ref(true);

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
    minNumber: 1,
  },
]);

const checkScreenSize = () => {
  if (window.innerWidth >= 600) {
    isDesktop.value = true; // Show the image for desktop
  } else {
    isDesktop.value = false; // Hide the image for mobile
  }
};

const handleCalculation = () => {
  // Handle the calculation logic here
  console.log('Calculating with data:', formData);
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
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
    color: #fff;
    text-align: center;
    height: 100%;
    overflow: auto;

    .landing-form-container {
      display: flex;
      flex-direction: column;
      padding: 0px 8px;

      .landing-form-title {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        font-size: 60px;
        color: $light-text;
        column-gap: 16px;
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
}
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  // Tablet specific styles
  .landing-page {
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
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  // Desktop specific styles
  .landing-page {
    .landing-form {
      padding-left: 120px;
      padding-right: 120px;
    }
  }
}

@media only screen and (min-height: 618px) {
  .landing-page {
    .landing-form {
      justify-content: center;
    }
  }
}
</style>
