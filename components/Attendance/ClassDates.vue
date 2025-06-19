<template>
  <section>
    <div class="max-w-7xl mx-auto mb-6">
      <div class="bg-white rounded-lg shadow">
        <div class="p-4 border-b flex justify-between items-center">
          <h3 class="text-lg font-semibold">
            Class Dates ({{ studentAttendanceStore.classDates.length }})
          </h3>

          <button
            @click="showAddDate = true"
            class="border border-primary text-primary hover:text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors font-semibold cursor-pointer base-trans"
          >
            Add Class Date
          </button>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <div
              v-for="date in filteredDates"
              :key="date"
              class="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <span class="text-sm">{{ formatDate(date) }}</span>
              <button
                @click="removeDate(date)"
                class="text-red-600 hover:text-red-800 p-1"
              >
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal v-model:is-open="showAddDate">
      <template #header>
        <h3 class="text-lg font-semibold text-center p-5 pb-0">
          Add Class Date
        </h3>
      </template>
      <template #body>
        <div class="p-5">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              v-model="newClassDate"
              type="date"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Quick Add Options -->
          <div class="border-t pt-4">
            <h4 class="text-sm font-medium text-gray-700 mb-3">
              Quick Add Options
            </h4>
            <button
              @click="addCurrentMonthFridays"
              class="w-full border border-blue-600 text-blue-600 hover:text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold cursor-pointer base-trans"
            >
              Add Current Month's All Fridays
            </button>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-center items-center gap-3 p-5 pt-0">
          <button
            @click="addDate"
            class="border border-green-600 text-green-600 hover:text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold cursor-pointer base-trans"
          >
            Save
          </button>
          <button
            @click="showAddDate = false"
            class="border border-gray-600 text-gray-600 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors font-semibold cursor-pointer base-trans"
          >
            Cancel
          </button>
        </div>
      </template>
    </Modal>
  </section>
</template>

<script setup>
  const props = defineProps({
    filteredDates: {
      type: Array,
      required: true,
    },
  });

  // Store
  const studentAttendanceStore = useStudentAttendanceStore();

  // State
  const showAddDate = ref(false);
  const newClassDate = ref("");

  const addDate = () => {
    if (
      newClassDate.value &&
      !studentAttendanceStore.classDates.includes(newClassDate.value)
    ) {
      studentAttendanceStore.classDates.push(newClassDate.value);
      studentAttendanceStore.classDates.sort();
      newClassDate.value = "";
      showAddDate.value = false;
    }
  };

  const removeDate = (date) => {
    if (confirm("Are you sure you want to remove this class date?")) {
      studentAttendanceStore.classDates =
        studentAttendanceStore.classDates.filter((d) => d !== date);
      // Remove attendance records for this date
      Object.keys(studentAttendanceStore.attendance).forEach((studentId) => {
        delete studentAttendanceStore.attendance[studentId][date];
      });
    }
  };

  const addCurrentMonthFridays = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const fridays = [];

    // Find all Fridays in the current month
    for (
      let date = new Date(firstDay);
      date <= lastDay;
      date.setDate(date.getDate() + 1)
    ) {
      if (date.getDay() === 5) {
        const fridayDate = date.toISOString().split("T")[0];
        fridays.push(fridayDate);
      }
    }

    // Add fridays to the store if they don't already exist
    let addedCount = 0;
    fridays.forEach((friday) => {
      if (!studentAttendanceStore.classDates.includes(friday)) {
        studentAttendanceStore.classDates.push(friday);
        addedCount++;
      }
    });

    // Sort the dates
    studentAttendanceStore.classDates.sort();

    // if (addedCount > 0) {
    //   alert(`Added ${addedCount} Friday(s) to class dates.`);
    // } else {
    //   alert("All Fridays for this month are already added.");
    // }

    showAddDate.value = false;
  };
</script>
