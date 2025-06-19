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
            class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
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

    <div
      v-if="showAddDate"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">Add Class Date</h3>
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
        <div class="flex gap-3">
          <button
            @click="addDate"
            class="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Add Date
          </button>
          <button
            @click="showAddDate = false"
            class="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
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
</script>
