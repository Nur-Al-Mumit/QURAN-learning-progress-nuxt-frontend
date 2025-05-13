<template>
  <div class="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-blue-600">
          Attendance Management
        </h1>
        <p class="mt-2 text-sm sm:text-base text-gray-600">
          Manage and track user attendance records
        </p>
      </div>

      <!-- Search and Filter -->
      <div class="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Search Users</label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name or ID"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <div class="flex space-x-2">
              <input
                v-model="startDate"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                v-model="endDate"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              v-model="statusFilter"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>
          <div class="flex items-end">
            <button
              @click="fetchAttendance"
              class="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Attendance Records -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="p-4 sm:p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Attendance Records
            </h2>
            <button
              @click="showAddAttendanceModal = true"
              class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Attendance
            </button>
          </div>

          <div class="overflow-x-auto rounded-lg border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="record in attendanceRecords" :key="record.id" class="hover:bg-gray-50 transition-colors duration-150">
                  <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span class="text-indigo-600 font-medium">{{ record.userName.charAt(0) }}</span>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ record.userName }}</div>
                        <div class="text-sm text-gray-500">ID: {{ record.userId }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ new Date(record.date).toLocaleDateString() }}
                  </td>
                  <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span
                      :class="
                        record.status === 'present'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      "
                      class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                    >
                      {{ record.status }}
                    </span>
                  </td>
                  <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ record.time }}
                  </td>
                  <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      @click="editAttendance(record)"
                      class="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteAttendance(record.id)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Add/Edit Attendance Modal -->
      <div v-if="showAddAttendanceModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingRecord ? 'Edit' : 'Add' }} Attendance Record
          </h3>
          <form @submit.prevent="saveAttendance">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">User</label>
                <select
                  v-model="formData.userId"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option v-for="user in users" :key="user.id" :value="user.id">
                    {{ user.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Date</label>
                <input
                  v-model="formData.date"
                  type="date"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Status</label>
                <select
                  v-model="formData.status"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Time</label>
                <input
                  v-model="formData.time"
                  type="time"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            <div class="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                @click="showAddAttendanceModal = false"
                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                {{ editingRecord ? 'Update' : 'Save' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// definePageMeta({
//   layout: "admin",
//   middleware: 'admin-auth'
// });
import axios from 'axios';

// State
const searchQuery = ref('');
const startDate = ref('');
const endDate = ref('');
const statusFilter = ref('');
const attendanceRecords = ref([]);
const users = ref([]);
const showAddAttendanceModal = ref(false);
const editingRecord = ref(null);

// Form data
const formData = ref({
  userId: '',
  date: '',
  status: 'present',
  time: ''
});

// Fetch users
const fetchUsers = async () => {
  try {
    const response = await axios.get('/api/users');
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Fetch attendance records
const fetchAttendance = async () => {
  try {
    const response = await axios.get('/api/admin/attendance', {
      params: {
        search: searchQuery.value,
        startDate: startDate.value,
        endDate: endDate.value,
        status: statusFilter.value
      }
    });
    attendanceRecords.value = response.data;
  } catch (error) {
    console.error('Error fetching attendance:', error);
  }
};

// Save attendance record
const saveAttendance = async () => {
  try {
    if (editingRecord.value) {
      await axios.put(`/api/admin/attendance/${editingRecord.value.id}`, formData.value);
    } else {
      await axios.post('/api/admin/attendance', formData.value);
    }
    showAddAttendanceModal.value = false;
    fetchAttendance();
  } catch (error) {
    console.error('Error saving attendance:', error);
  }
};

// Edit attendance record
const editAttendance = (record) => {
  editingRecord.value = record;
  formData.value = { ...record };
  showAddAttendanceModal.value = true;
};

// Delete attendance record
const deleteAttendance = async (id) => {
  if (confirm('Are you sure you want to delete this record?')) {
    try {
      await axios.delete(`/api/admin/attendance/${id}`);
      fetchAttendance();
    } catch (error) {
      console.error('Error deleting attendance:', error);
    }
  }
};

// Initialize
onMounted(() => {
  fetchUsers();
  fetchAttendance();
});
</script> 