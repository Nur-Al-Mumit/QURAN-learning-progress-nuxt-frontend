<template>
  <div class="max-w-7xl mx-auto mb-6">
    <div class="bg-white rounded-lg shadow">
      <div class="p-4 border-b flex items-center justify-between">
        <h3 class="text-lg font-semibold">Students ({{ students.length }})</h3>
        <button
          @click="showAddStudent = true"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Student
        </button>
      </div>
      <div class="p-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="student in students"
            :key="student.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <p class="font-medium">{{ student.name }}</p>
              <p class="text-sm text-gray-600">ID: {{ student.id }}</p>
            </div>
            <button
              @click="removeStudent(student.id)"
              class="text-red-600 hover:text-red-800 p-1"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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

  <Modal v-model:is-open="showAddStudent">
    <template #header>
      <h3 class="text-lg font-semibold text-center p-5 pb-0">
        Add New Student
      </h3>
    </template>
    <template #body>
      <div class="mb-4 p-5">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Student Name
        </label>
        <input
          v-model="newStudentName"
          type="text"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter student name"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between items-center px-5 pb-5 gap-3">
        <button
          @click="addStudent"
          class="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex-1"
        >
          Add Student
        </button>
        <button
          @click="showAddStudent = false"
          class="bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 flex-1"
        >
          Cancel
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
  const props = defineProps({
    students: {
      type: Array,
      required: true,
    },
  });

  // Store
  const studentAttendanceStore = useStudentAttendanceStore();

  // State
  const showAddStudent = ref(false);
  const newStudentName = ref("");

  const addStudent = () => {
    if (newStudentName.value.trim()) {
      const newId =
        "S" +
        String(studentAttendanceStore.students.length + 1).padStart(3, "0");
      studentAttendanceStore.students.push({
        id: newId,
        name: newStudentName.value.trim(),
      });
      newStudentName.value = "";
      showAddStudent.value = false;
    }
  };

  const removeStudent = (studentId) => {
    if (confirm("Are you sure you want to remove this student?")) {
      studentAttendanceStore.students = studentAttendanceStore.students.filter(
        (student) => student.id !== studentId
      );
      delete studentAttendanceStore.attendance[studentId];
    }
  };
</script>
