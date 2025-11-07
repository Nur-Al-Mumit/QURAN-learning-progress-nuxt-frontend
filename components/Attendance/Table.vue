<template>
  <section>
    <div class="max-w-7xl mx-auto mb-6">
      <div
        class="bg-white rounded-lg shadow overflow-hidden"
        id="attendance-table"
      >
        <div
          class="p-4 border-b print:hidden flex justify-between items-center"
        >
          <h3 class="text-lg font-semibold">Attendance Report</h3>

          <div class="flex flex-wrap gap-3">
            <button
              @click="printAttendance"
              class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Print Report
            </button>
            <!-- <Butt -->
            <button
              @click="showMarkAttendance = true"
              class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Mark Attendance
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Student
                </th>
                <th
                  v-for="date in filteredDates"
                  :key="date"
                  class="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ formatDateShort(date) }}
                </th>
                <th
                  class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Present
                </th>
                <th
                  class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Absent
                </th>
                <th
                  class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Rec
                </th>
                <th
                  class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  %
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 overflow-hidden">
              <tr v-for="student in filteredStudents" :key="student.id">
                <td class="px-4 print:px-2 py-3 print:py-1.5 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">
                      {{ student.name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      ID: {{ student.id }}
                    </div>
                  </div>
                </td>
                <td
                  v-for="date in filteredDates"
                  :key="date"
                  class="px-2 print:px-1 py-3 print:py-1.5 text-center"
                >
                  <span
                    :class="
                      getAttendanceStatus(student.id, date) === 'present'
                        ? 'text-green-600'
                        : getAttendanceStatus(student.id, date) === 'recording'
                        ? 'text-blue-600'
                        : 'text-red-600'
                    "
                  >
                    {{
                      getAttendanceStatus(student.id, date) === "present"
                        ? "✓"
                        : getAttendanceStatus(student.id, date) === "recording"
                        ? "◯"
                        : "✗"
                    }}
                  </span>
                </td>
                <td
                  class="px-4 py-3 print:py-1.5 text-center text-sm font-medium text-green-600"
                >
                  {{ getStudentStats(student.id).present }}
                </td>
                <td
                  class="px-4 py-3 print:py-1.5 text-center text-sm font-medium text-red-600"
                >
                  {{ getStudentStats(student.id).absent }}
                </td>
                <td
                  class="px-4 py-3 print:py-1.5 text-center text-sm font-medium text-blue-600"
                >
                  {{ getStudentStats(student.id).recording }}
                </td>
                <td class="px-4 py-3 print:py-1.5 text-center text-sm font-medium">
                  {{ getStudentStats(student.id).percentage }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Legend for print -->
        <div class="p-4 border-t print:block hidden">
          <div class="text-xs text-gray-600 flex items-center gap-4 justify-center">
            <span class="flex items-center gap-1">
              <span class="text-green-600">✓</span>
              <span>Present</span>
            </span>
            <span class="flex items-center gap-1">
              <span class="text-blue-600">◯</span>
              <span>Recording</span>
            </span>
            <span class="flex items-center gap-1">
              <span class="text-red-600">✗</span>
              <span>Absent</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <AttendanceMarkModal v-model:is-modal-open="showMarkAttendance" />
  </section>
</template>

<script setup>
  const props = defineProps({
    filteredDates: {
      type: Array,
      required: true,
    },
    studentView: {
      type: String,
      default: "all",
    },
  });

  // Store
  const studentAttendanceStore = useStudentAttendanceStore();

  // State
  const showMarkAttendance = ref(false);

  const filteredStudents = computed(() => {
    if (props.studentView === "all") {
      return studentAttendanceStore.students;
    }
    return studentAttendanceStore.students.filter(
      (student) => student.id === props.studentView
    );
  });

  const getStudentStats = (studentId) => {
    const studentAttendance =
      studentAttendanceStore.attendance[studentId] || {};
    const relevantDates = props.filteredDates;

    let present = 0;
    let absent = 0;
    let recording = 0;

    relevantDates.forEach((date) => {
      if (studentAttendance[date] === "present") {
        present++;
      } else if (studentAttendance[date] === "recording") {
        recording++;
      } else {
        absent++;
      }
    });

    const total = present + absent + recording;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return { present, absent, recording, percentage };
  };

  const formatDateShort = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const printAttendance = () => {
    window.print();
  };
</script>
<style>
  @media print {
    body * {
      visibility: hidden;
    }
    #attendance-table,
    #attendance-table * {
      visibility: visible;
    }
    #attendance-table {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
    }
    .print\\:hidden {
      display: none !important;
    }
  }
</style>
