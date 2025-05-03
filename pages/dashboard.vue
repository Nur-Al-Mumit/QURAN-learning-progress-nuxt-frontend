<template>
  <section class="mx-auto">
    <div class="grid grid-cols-5 gap-5 p-5 bg-gray-50 rounded-lg shadow-md">
      <div
        v-for="(letter, index) in arabicLetters"
        :key="index"
        class="relative bg-white rounded-lg border border-gray-200 shadow-lg w-full h-24 flex items-center justify-center text-4xl font-semibold text-gray-800 overflow-hidden"
        ref="letterRefs"
        :data-index="index"
      >
        <!-- Arabic Letter -->
        <span class="relative z-10">{{ letter.char }}</span>
        <!-- Dynamic Gradient Background for Progress -->
        <div
          class="absolute inset-x-0 bottom-0 rounded-lg opacity-50 transition-all duration-[2000ms] ease-out transform-gpu"
          :style="{
            height: `${visibleLetters.includes(index) ? letter.accuracy : 0}%`,
            backgroundColor: getColor(letter.accuracy),
          }"
        ></div>
        <!-- Percentage Label -->
        <div
          class="absolute top-2 right-2 text-xs font-medium text-gray-700 bg-white bg-opacity-90 px-2 py-0.5 rounded-sm"
        >
          {{ letter.accuracy }}%
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout:'user'
  // middleware: 'user-auth'
})
const arabicLetters = ref([
  { char: "ا", accuracy: 50 },
  { char: "ب", accuracy: 70 },
  { char: "ت", accuracy: 30 },
  { char: "ث", accuracy: 80 },
  { char: "ج", accuracy: 60 },
  { char: "ح", accuracy: 90 },
  { char: "خ", accuracy: 20 },
  { char: "د", accuracy: 40 },
  { char: "ذ", accuracy: 75 },
  { char: "ر", accuracy: 55 },
  { char: "ز", accuracy: 65 },
  { char: "س", accuracy: 35 },
  { char: "ش", accuracy: 85 },
  { char: "ص", accuracy: 45 },
  { char: "ض", accuracy: 5 },
  { char: "ط", accuracy: 25 },
  { char: "ظ", accuracy: 17 },
  { char: "ع", accuracy: 50 },
  { char: "غ", accuracy: 80 },
  { char: "ف", accuracy: 60 },
  { char: "ق", accuracy: 70 },
  { char: "ك", accuracy: 40 },
  { char: "ل", accuracy: 50 },
  { char: "م", accuracy: 90 },
  { char: "ن", accuracy: 30 },
  { char: "ه", accuracy: 75 },
  { char: "و", accuracy: 65 },
  { char: "ي", accuracy: 55 },
]);

// Array to track visible elements
const visibleLetters = ref([]);

// Function to calculate color based on accuracy
function getColor(accuracy) {
  const red = accuracy < 50 ? 255 : Math.floor(255 - (accuracy - 50) * 5.1);
  const green = accuracy > 50 ? 255 : Math.floor(accuracy * 5.1);
  return `rgb(${red}, ${green}, 100)`;
}

// Intersection Observer setup
const letterRefs = ref([]);

onMounted(() => {
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const index = entry.target.dataset.index;
      if (entry.isIntersecting && !visibleLetters.value.includes(Number(index))) {
        visibleLetters.value.push(Number(index));
      }
    });
  }, observerOptions);

  letterRefs.value.forEach((el) => {
    observer.observe(el);
  });

  // Clean up observer on component unmount
  onBeforeUnmount(() => {
    observer.disconnect();
  });
});
</script>

<style>
/* Add any additional styles here */
</style>
