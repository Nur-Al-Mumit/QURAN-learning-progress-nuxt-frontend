<template>
  <section>
    <div class="border-t pt-4">
      <h4 class="text-md font-semibold mb-3">Export Data</h4>
      <div class="flex flex-wrap gap-3">
        <button
          @click="exportData('students')"
          class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Export Students JSON
        </button>
        <button
          @click="exportData('classDates')"
          class="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
        >
          Export Class Dates JSON
        </button>
        <button
          @click="exportData('attendance')"
          class="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
        >
          Export Attendance JSON
        </button>
        <button
          @click="exportData('all')"
          class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
        >
          Export All Data JSON
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
  const studentAttendanceStore = useStudentAttendanceStore();

  // Export functionality
  const exportData = (type) => {
    let data = {};
    let filename = "";

    switch (type) {
      case "students":
        data = {
          students: studentAttendanceStore.students,
          exportDate: new Date().toISOString(),
          totalStudents: studentAttendanceStore.students.length,
        };
        filename = "students_data.json";
        break;

      case "classDates":
        data = {
          classDates: studentAttendanceStore.classDates.sort(),
          exportDate: new Date().toISOString(),
          totalDates: studentAttendanceStore.classDates.length,
          dateRange: {
            earliest: studentAttendanceStore.classDates.sort()[0],
            latest:
              studentAttendanceStore.classDates.sort()[
                studentAttendanceStore.classDates.length - 1
              ],
          },
        };
        filename = "class_dates_data.json";
        break;

      case "attendance":
        // Calculate summary statistics
        const summary = {};
        Object.keys(studentAttendanceStore.attendance).forEach((studentId) => {
          const studentData = studentAttendanceStore.attendance[studentId];
          let present = 0;
          let absent = 0;

          Object.values(studentData).forEach((status) => {
            if (status === "present") present++;
            else absent++;
          });

          summary[studentId] = {
            present,
            absent,
            total: present + absent,
            percentage:
              present + absent > 0
                ? Math.round((present / (present + absent)) * 100)
                : 0,
          };
        });

        data = {
          attendance: studentAttendanceStore.attendance,
          summary,
          exportDate: new Date().toISOString(),
          totalRecords: Object.keys(studentAttendanceStore.attendance).reduce(
            (acc, studentId) =>
              acc +
              Object.keys(studentAttendanceStore.attendance[studentId]).length,
            0
          ),
        };
        filename = "attendance_data.json";
        break;

      case "all":
        data = {
          students: studentAttendanceStore.students,
          classDates: studentAttendanceStore.classDates.sort(),
          attendance: studentAttendanceStore.attendance,
          exportDate: new Date().toISOString(),
          metadata: {
            totalStudents: studentAttendanceStore.students.length,
            totalDates: studentAttendanceStore.classDates.length,
            totalAttendanceRecords: Object.keys(
              studentAttendanceStore.attendance
            ).reduce(
              (acc, studentId) =>
                acc +
                Object.keys(studentAttendanceStore.attendance[studentId])
                  .length,
              0
            ),
            dateRange: {
              earliest: studentAttendanceStore.classDates.sort()[0],
              latest:
                studentAttendanceStore.classDates.sort()[
                  studentAttendanceStore.classDates.length - 1
                ],
            },
          },
        };
        filename = "complete_attendance_system_data.json";
        break;
    }

    // Create and download the file
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Show success message
    alert(
      `${
        type.charAt(0).toUpperCase() + type.slice(1)
      } data exported successfully!`
    );
  };
</script>
