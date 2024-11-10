<template>
  <section>
    <div
      :class="[useStore.currentStep == 1 ? 'justify-end' : 'justify-between']"
      class="mt-6 flex animated-element"
    >
      <ArrowButton
        v-if="useStore.currentStep > 1"
        :click="handlePrev"
        text="Previous"
        direction="left"
        :is-loading="
          isLoading.navigation === 'previous' && isLoading.isSpin === true
        "
      />
      <button
        v-if="useStore.currentStep === useStore.steps.length"
        type="submit"
        @click="submitForm"
        class="base-blank-btn"
      >
        Submit
      </button>
      <ArrowButton
        v-else
        :click="handleNext"
        text="Save & Next"
        :is-loading="
          isLoading.navigation === 'next' && isLoading.isSpin === true
        "
      />
    </div>
  </section>
</template>

<script setup>
  import ArrowButton from "../Buttons/ArrowButton.vue";
  const props = defineProps({
    nextStep: {
      type: Function,
    },
    prevStep: {
      type: Function,
    },
    submitFunction: {
      type: Function,
    },
    isLoading: {
      type: Object,
    },
    isSaveButton: {
      type: Boolean,
      default: false,
    },
  });
  const useStore = useRecuitFormStore();

  const handleNext = () => {
    props.nextStep();
  };

  const handlePrev = () => {
    props.prevStep();
  };

  const submitForm = () => {
    props.submitFunction();
    console.log("Form submitted!");
  };
</script>

<style scoped>
  .animated-element {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.5s ease forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
