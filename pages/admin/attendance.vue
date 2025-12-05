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
              <option value="lastClasses">Last Classes</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div v-if="viewPeriod === 'lastClasses'">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Number of Classes
            </label>
            <select
              v-model="numberOfClasses"
              class="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="5">Last 5 Classes</option>
              <option value="7">Last 7 Classes</option>
              <option value="10">Last 10 Classes</option>
              <option value="15">Last 15 Classes</option>
              <option value="20">Last 20 Classes</option>
              <option value="30">Last 30 Classes</option>
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
  const selectedMonth = ref("");
  const numberOfClasses = ref(7);

  // Computed properties for available months
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

    if (viewPeriod.value === "lastClasses") {
      // Return the last N classes based on user selection
      const numClasses = parseInt(numberOfClasses.value);
      return dates.slice(-numClasses);
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

  // Period change handler
  const onPeriodChange = () => {
    if (
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

    // Initialize month selection
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
