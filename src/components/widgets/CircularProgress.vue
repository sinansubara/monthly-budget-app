<template>
  <div class="vue-circular-progress">
    <div
      class="circle"
      :style="{ maxHeight: `${circleSize}px` }"
    >
      <svg
        :width="circleSize"
        :height="circleSize"
        class="circle__svg"
      >
        <circle
          :cx="centralP"
          :cy="centralP"
          :r="radius"
          :style="{
            'stroke-width': strokeWidth,
            stroke: strokeBackgroundColor,
            strokeOpacity: backgroundOpacity,
            'stroke-linecap': strokeLineCap,
          }"
          class="circle__progress circle__progress--path"
        />
        <circle
          :cx="centralP"
          :cy="centralP"
          :r="radius"
          :style="fileStyl"
          class="circle__progress circle__progress--fill"
        />
      </svg>

      <div
        v-if="showPercentage || text"
        class="percent"
      >
        <slot>
          <span
            v-if="showPercentage"
            class="percent__int"
            >{{ int }}%</span
          >
          <span
            v-if="text"
            class="percent__text"
            >{{ text }}</span
          >
        </slot>
      </div>
    </div>
    <slot name="footer" />
  </div>
</template>
<script>
export default {
  name: 'CircularProgress',
  props: {
    strokeWidth: {
      type: Number,
      default: 4,
    },
    strokeColor: {
      type: String,
      default: '#51D289',
    },
    strokeBackgroundColor: {
      type: String,
      default: '#D2D2D2',
    },
    strokeLineCap: {
      type: String,
      default: 'butt',
    },
    radius: {
      type: Number,
      default: 16,
    },
    transitionDuration: {
      type: Number,
      default: 1000,
    },
    backgroundOpacity: {
      type: Number,
      default: 1,
    },
    allowZeroValue: {
      type: Boolean,
      default: true,
    },
    value: {
      // should be a number and less or equal than 100
      validator(value) {
        return !Number.isNaN(Number(value)) && Number(value) <= 100;
      },
      default: '0.0',
    },
    showPercentage: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      offset: '',
      int: 0,
    };
  },
  computed: {
    circumference() {
      return this.radius * Math.PI * 2;
    },
    fileStyl() {
      return {
        strokeDashoffset: this.offset,
        '--initialStroke': this.circumference,
        '--transitionDuration': `${this.transitionDuration}ms`,
        'stroke-width': this.strokeWidth,
        stroke: this.strokeColor,
        strokeLinecap: this.strokeLineCap,
      };
    },
    circleSize() {
      return (this.radius + this.strokeWidth) * 2;
    },
    centralP() {
      return this.circleSize / 2;
    },
  },
  watch: {
    value: {
      handler(v) {
        const n = Number(v);
        if (Number.isNaN(n) || (n === 0 && !this.allowZeroValue)) {
          return;
        }
        this.clearHandlers();
        this.countNumber(v);
      },
      immediate: true,
    },
  },
  beforeUnmount() {
    this.clearHandlers();
  },
  methods: {
    increaseNumber(number, className, startValue = 0) {
      // Calculate the actual difference we need to animate
      const difference = Math.abs(number - startValue);

      // If there's no difference, just set the value directly
      if (difference === 0) {
        this[className] = number;
        return;
      }

      const innerNum = parseInt(
        this.findClosestNumber(this.transitionDuration / 10, difference),
        10,
      );
      const interval = this.transitionDuration / innerNum;
      let counter = 0;
      const handlerName = `${className}Interval`;

      // Clear any existing interval
      if (this[handlerName]) {
        clearInterval(this[handlerName]);
      }

      this[handlerName] = setInterval(() => {
        // Calculate the current value based on progress between start and end values
        const progress = counter / innerNum;
        const currentValue = Math.round(
          startValue + (number - startValue) * progress,
        );

        this[className] = currentValue;

        if (counter === innerNum) {
          // Ensure we end at exactly the target value
          this[className] = number;
          window.clearInterval(this[handlerName]);
        }
        counter += 1;
      }, interval);
    },
    findClosestNumber(bound, value) {
      if (value <= bound) {
        return value;
      }
      return this.findClosestNumber(bound, value / 10);
    },
    countNumber(v) {
      requestAnimationFrame(() => {
        this.offset = (this.circumference * (100 - v)) / 100;
      });
      if (!this.showPercentage || this.$slots.default) return;

      const int = parseInt(v, 10);
      const currentInt = this.int; // Store the current value before updating
      this.increaseNumber(int, 'int', currentInt); // Pass the current value as the starting point
    },
    clearHandlers() {
      if (this.intInterval) {
        clearInterval(this.intInterval);
      }
    },
  },
};
</script>

<style lang="scss">
/* Circular progress */
$--circular-progress-int: 38px !default;
.vue-circular-progress {
  display: flex;
  justify-content: center;

  .circle {
    position: relative;
  }

  .circle__svg {
    transform: rotate(-90deg);
  }

  .circle__progress {
    fill: none;
    stroke-opacity: 0.3;
  }

  .circle__progress--fill {
    --initialStroke: 0;
    --transitionDuration: 0;
    stroke-opacity: 1;
    stroke-dasharray: var(--initialStroke);
    stroke-dashoffset: var(--initialStroke);
    transition: stroke-dashoffset var(--transitionDuration) ease;
  }

  .percent {
    width: 100%;
    top: 50%;
    left: 50%;
    position: absolute;
    text-align: center;
    line-height: $--circular-progress-int;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
  }

  .percent__int {
    font-size: $--circular-progress-int;
  }

  .percent__text {
    font-size: 18px;
    line-height: 24px;
  }
}
</style>
