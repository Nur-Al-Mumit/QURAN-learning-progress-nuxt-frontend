<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <!-- Header -->
    <div class="max-w-7xl mx-auto mb-8 mt-2">
      <h1 class="text-3xl font-bold text-gray-900 mb-2 text-center">
        Attendance Management
      </h1>
    </div>
    <!-- View Options -->
    <div class="max-w-7xl mx-auto mb-6">
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-3">View Options</h3>
        <div class="flex flex-wrap gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Time Period
            </label>
            <select
              v-model="viewPeriod"
              @change="onPeriodChange"
              class="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">All Time</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div v-if="viewPeriod === 'weekly'">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Select Week
            </label>
            <select
              v-model="selectedWeek"
              class="border border-gray-300 rounded-md px-3 py-2"
            >
              <option
                v-for="week in availableWeeks"
                :key="week.value"
                :value="week.value"
              >
                {{ week.label }}
              </option>
            </select>
          </div>
          <div v-if="viewPeriod === 'monthly'">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Select Month
            </label>
            <select
              v-model="selectedMonth"
              class="border border-gray-300 rounded-md px-3 py-2"
            >
              <option
                v-for="month in availableMonths"
                :key="month.value"
                :value="month.value"
              >
                {{ month.label }}
              </option>
            </select>
          </div>
          <div class="w-full">
            <select
              v-model="studentView"
              class="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">All Students</option>
              <option
                v-for="student in studentAttendanceStore.students"
                :key="student.id"
                :value="student.id"
              >
                {{ student.name }}
              </option>
            </select>
            <!-- <InputsBaseFilterSelectCuntry
              :options="studentAttendanceStore.students"
              v-model="studentView"
              :required="false"
            /> -->
          </div>
        </div>

        <!-- Export Section -->
        <AttendanceExport />
      </div>
    </div>

    <!-- Attendance Table -->
    <AttendanceTable
      :studentView="studentView"
      :filteredDates="filteredDates"
    />
  </div>
</template>

<script setup>
  definePageMeta({ layout: "split" });

  // Stores
  const menuStore = useMenuStore();
  const studentAttendanceStore = useStudentAttendanceStore();

  // View options
  const viewPeriod = ref("all");
  const studentView = ref("all");
  const selectedWeek = ref("");
  const selectedMonth = ref("");

  // Computed properties for available weeks and months
  const availableWeeks = computed(() => {
    const weeks = [];
    const dates = [...studentAttendanceStore.classDates].sort();
    const weekMap = new Map();

    dates.forEach((date) => {
      const dateObj = new Date(date);
      const weekStart = getWeekStart(dateObj);
      const weekEnd = getWeekEnd(dateObj);
      const weekKey = weekStart.toISOString().split("T")[0];

      if (!weekMap.has(weekKey)) {
        weekMap.set(weekKey, {
          value: weekKey,
          label: `${formatDate(
            weekStart.toISOString().split("T")[0]
          )} - ${formatDate(weekEnd.toISOString().split("T")[0])}`,
          start: weekStart,
          end: weekEnd,
        });
      }
    });

    return Array.from(weekMap.values()).sort((a, b) => b.start - a.start);
  });

  const availableMonths = computed(() => {
    const months = [];
    const dates = [...studentAttendanceStore.classDates].sort();
    const monthMap = new Map();

    dates.forEach((date) => {
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth();
      const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;

      if (!monthMap.has(monthKey)) {
        monthMap.set(monthKey, {
          value: monthKey,
          label: new Date(year, month).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          }),
        });
      }
    });

    return Array.from(monthMap.values()).sort((a, b) =>
      b.value.localeCompare(a.value)
    );
  });

  // Computed properties
  const filteredDates = computed(() => {
    const dates = [...studentAttendanceStore.classDates].sort();

    if (viewPeriod.value === "weekly" && selectedWeek.value) {
      const weekStart = new Date(selectedWeek.value);
      const weekEnd = getWeekEnd(weekStart);
      return dates.filter((date) => {
        const dateObj = new Date(date);
        return dateObj >= weekStart && dateObj <= weekEnd;
      });
    } else if (viewPeriod.value === "monthly" && selectedMonth.value) {
      const [year, month] = selectedMonth.value.split("-");
      return dates.filter((date) => {
        const dateObj = new Date(date);
        return (
          dateObj.getFullYear() === parseInt(year) &&
          dateObj.getMonth() === parseInt(month) - 1
        );
      });
    }

    return dates;
  });

  // Helper functions for week calculations
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  const getWeekEnd = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + 6;
    return new Date(d.setDate(diff));
  };

  // Period change handler
  const onPeriodChange = () => {
    if (viewPeriod.value === "weekly" && availableWeeks.value.length > 0) {
      selectedWeek.value = availableWeeks.value[0].value;
    } else if (
      viewPeriod.value === "monthly" &&
      availableMonths.value.length > 0
    ) {
      selectedMonth.value = availableMonths.value[0].value;
    }
  };

  // Initialize attendance for existing students and dates
  onMounted(() => {
    studentAttendanceStore.students.forEach((student) => {
      if (!studentAttendanceStore.attendance[student.id]) {
        studentAttendanceStore.attendance[student.id] = {};
      }
    });

    // Initialize week and month selections
    if (availableWeeks.value.length > 0) {
      selectedWeek.value = availableWeeks.value[0].value;
    }
    if (availableMonths.value.length > 0) {
      selectedMonth.value = availableMonths.value[0].value;
    }

    menuStore.links = [
      {
        title: "Dashboard",
        icon: "Dashboard",
        // link: "/admin/dashboard",
      },
      {
        title: "View Profile",
        icon: "ViewProfile",
        // link: "/admin/profile-details",
      },
      {
        title: "Update Profile",
        icon: "UpdateProfile",
        // link: "/admin/profile",
      },
      {
        title: "Add Student",
        icon: "UpdateProfile",
        link: "/admin/add-student",
      },
      {
        title: "Attendance",
        icon: "Circular",
        link: "/admin/attendance",
      },
      {
        title: "Add Class Date",
        icon: "Circular",
        link: "/admin/add-class-date",
      },
      {
        title: "Settings",
        icon: "Settings",
        // link: "/settings",
      },
      {
        title: "Log Out",
        icon: "LogOut",
        link: "",
      },
    ];
  });
</script>
