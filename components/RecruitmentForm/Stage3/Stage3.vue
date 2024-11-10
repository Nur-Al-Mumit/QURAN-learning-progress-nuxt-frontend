<template>
  <section class="bg-white">
    <div class="recruitment-form-container">
      <h2 class="text-xl font-bold mb-4 underline">কাজের অভিজ্ঞতা</h2>
      <!-- <p class="mb-6">আপনার কাজের অভিজ্ঞতার তথ্য দিন:</p> -->

      <form @submit.prevent class="sm:w-[900px]">
        <div class="mx-auto">
          <!-- Add and Delete buttons -->
          <div class="flex justify-end -mb-6 md:mb-6">
            <button @click="addWorkExp" class="base-blank-btn mr-4">
              Add +
            </button>
          </div>

          <!-- Input rows -->
          <div
            v-for="(inputRow, rowIndex) in inputs"
            :key="rowIndex"
            class="dynamic-inputs-row"
            :draggable="inputs.length > 1"
            @dragstart="dragStart(rowIndex)"
            @dragover.prevent
            @drop="drop(rowIndex)"
          >
            <div
              :class="[
                'p-5 pt-16 grid grid-cols-1 sm:grid-cols-3 gap-5 relative',
              ]"
            >
              <span
                class="base-blank-btn w-fit p-0 px-2 text-center absolute top-3 left-3"
              >
                {{ rowIndex + 1 }}
              </span>

              <div
                v-for="(input, inputIndex) in inputRow"
                :key="input.id"
                :class="[input.name === 'description' ? 'sm:col-span-3' : '']"
              >
                <h1
                  v-if="
                    input.title !== 'Action' &&
                    input.name !== 'noc_scan' &&
                    input.name !== 'experience_scan'
                  "
                  :class="['flex justify-between font-semibold mb-2']"
                >
                  <span>{{ input.title }}</span>
                  <label
                    class="flex items-center space-x-1 cursor-pointer"
                    v-if="input.name == 'end_date'"
                  >
                    <input
                      type="checkbox"
                      v-model="isEndDate[rowIndex][0]"
                      @change="handleWorkingChange(rowIndex)"
                      class="form-checkbox h-4 w-6 text-blue-600 rounded transition duration-200 ease-in-out"
                    />
                    <span class="text-sm font-medium text-gray-700">
                      Till to Date
                    </span>
                  </label>
                </h1>

                <input
                  v-if="input.name === 'sort_order'"
                  type="hidden"
                  :value="getInputIndex(rowIndex)"
                />

                <input
                  v-if="
                    input.title !== 'Action' &&
                    input.name !== 'sort_order' &&
                    input.name !== 'experience_scan' &&
                    input.name !== 'description' &&
                    input.name !== 'noc_scan'
                  "
                  :id="input.id"
                  :placeholder="input.placeholder"
                  :type="
                    input.name == 'start_date' || input.name == 'end_date'
                      ? 'date'
                      : 'text'
                  "
                  :disabled="
                    input.name === 'end_date' && isEndDate[rowIndex][0]
                  "
                  class="p-3 border rounded-md focus:outline-none focus:border-blue-500 w-full"
                  v-model="inputValues[rowIndex][input.name]"
                />

                <div v-if="input.name === 'description'">
                  <Quill v-model="inputValues[rowIndex][input.name]" />
                </div>

                <p
                  v-if="
                    input.name === 'noc_scan' ||
                    input.name === 'experience_scan'
                  "
                >
                  <FileUpload
                    v-if="
                      input.name === 'noc_scan' ||
                      input.name === 'experience_scan'
                    "
                    :inputId="
                      input.name === 'experience_scan'
                        ? `experience_scan${rowIndex}`
                        : `noc_scan${rowIndex}`
                    "
                    :label="input.title"
                    v-model="inputValues[rowIndex][input.name]"
                    :uploadedFile="inputValues[rowIndex][input.name]"
                  />
                  <!-- Passport Section  -->
                </p>

                <div class="dynamic-action-container">
                  <button
                    v-if="input.title === 'Action'"
                    :disabled="false"
                    @click="deleteWorkExp(false, rowIndex)"
                    :class="[
                      'base-blank-btn w-fit text-center px-2',
                      false
                        ? ' hover:bg-gray-400 text-gray-400 border-gray-400 cursor-not-allowed '
                        : 'text-red-600 hover:bg-red-600 border-red-600',
                    ]"
                  >
                    <span v-html="getIcons('delete', 'w-5')"></span>
                    <span>Delete</span>
                  </button>

                  <button
                    v-if="inputValues[rowIndex]['id'] && inputIndex === 7"
                    @click="
                      updateWorkExp({
                        id: inputValues[rowIndex]['id'],
                        index: rowIndex,
                      })
                    "
                    :class="['dynamic-action-edit-btn']"
                  >
                    <span v-html="getIcons('edit', 'w-5 scale-150')"></span>
                    <span>Save changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Add and Delete buttons -->

          <div class="flex justify-center mt-6">
            <button
              @click="addWorkExp"
              class="base-blank-btn mr-4"
              type="button"
            >
              Add +
            </button>
          </div>
        </div>
      </form>
      <BaseDivider />
      <div class="flex justify-center mt-3">
        <button
          :disabled="isSaveBtn"
          @click="() => nextStep(true)"
          class="base-blank-btn border-black text-black hover:bg-black hover:text-white flex items-center"
        >
          <span class="w-7">
            <svg
              fill="currentColor"
              viewBox="0 0 1920 1920"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M790.706 338.824v112.94H395.412c-31.06 0-56.47 25.3-56.47 56.471v744.509c17.73-6.325 36.592-10.391 56.47-10.391h1129.412c19.877 0 38.738 4.066 56.47 10.39V508.236c0-31.171-25.412-56.47-56.47-56.47h-395.295V338.824h395.295c93.402 0 169.411 76.009 169.411 169.411v1242.353c0 93.403-76.01 169.412-169.411 169.412H395.412C302.009 1920 226 1843.99 226 1750.588V508.235c0-93.402 76.01-169.411 169.412-169.411h395.294Zm734.118 1016.47H395.412c-31.06 0-56.47 25.299-56.47 56.47v338.824c0 31.172 25.41 56.47 56.47 56.47h1129.412c31.058 0 56.47-25.298 56.47-56.47v-338.823c0-31.172-25.412-56.47-56.47-56.47ZM1016.622-.023v880.151l246.212-246.325 79.85 79.85-382.532 382.644-382.645-382.644 79.85-79.85L903.68 880.128V-.022h112.941ZM564.824 1468.235c-62.344 0-112.942 50.71-112.942 112.941s50.598 112.942 112.942 112.942c62.343 0 112.94-50.71 112.94-112.942 0-62.23-50.597-112.94-112.94-112.94Z"
                  fill-rule="evenodd"
                ></path>
              </g>
            </svg>
          </span>
          <span>Save</span>
        </button>
      </div>
      <Navigation
        :prevStep="prevStep"
        :nextStep="() => nextStep(false)"
        :isLoading="isLoading"
      />
    </div>
  </section>
  <ModalsBaseModal
    :is-modal="isDeleteModal"
    @updatedValue="(val) => (isDeleteModal = val)"
  >
    <template #body>
      <div class="text-center">
        <div class="mt-3">
          <h1 class="text-xl font-bold mb-10">
            This will permanently delete your information.
            <br />
            Are you sure?
          </h1>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between mt-5">
        <button
          @click="isDeleteModal = false"
          class="base-blank-btn hover:bg-green-500 border-green-500 text-green-500"
        >
          Cancel
        </button>
        <button
          :class="[
            'base-blank-btn hover:bg-red-500 border-red-500 text-red-500 ',
          ]"
          @click="deleteWorkExp(true)"
        >
          <span>Yes</span>
        </button>
      </div>
    </template>
  </ModalsBaseModal>
</template>

<script setup>
  import { useRecuitFormStore } from "~/stores/recuitFormState";
  import Navigation from "../Navigation";
  import FileUpload from "~/components/Inputs/BaseFIleUpload.vue";
  import getIcons from "../formIcon";
  import { useUserInfoStore } from "~/stores/userInfoStore";

  const useUserInfo = useUserInfoStore();
  const useStore = useRecuitFormStore();
  let draggingIndex = ref();
  let isEndDate = ref(useStore.isEndDateSatge3);
  let inputs = ref(useStore.inputsStage3);
  let inputValues = ref(useStore.inputValuesStage3);
  let isDeleteModal = ref(false);
  let storeDeleteIndex = ref(null);
  let isLoading = ref({
    isSpin: false,
    navigation: "next",
  });
  let isSaveBtn = ref(false);

  const prevStep = () => {
    setPrev(useRecuitFormStore);
  };

  const nextStep = async (isSave) => {
    isSaveBtn.value = true;
    if (!isSave) {
      isLoading.value.isSpin = true;
    }
    try {
      const endpoint = "/user/work-experience";
      let payload = inputValues.value;

      const { data, error } = await callAuthnAxios(endpoint, payload);

      if (data?.data) {
        syncUserInfo();
        alert(data.data);
        isSaveBtn.value = false;
        isLoading.value.isSpin = false;
        if (!isSave) {
          setNext(useRecuitFormStore);
        }
      } else {
        console.log(error);
        isSaveBtn.value = false;
        isLoading.value.isSpin = false;
      }
    } catch (err) {
      console.log(err);
      isSaveBtn.value = false;
      isLoading.value.isSpin = false;
    }
  };

  function getInputIndex(row) {
    inputValues.value[row]["sort_order"] = row + 1;
    return row + 1;
  }

  const dragStart = (index) => {
    draggingIndex.value = index;
  };

  const drop = (index) => {
    // Prevent dropping on itself
    if (draggingIndex.value !== index) {
      // Copy the dragged row
      const draggedRow = inputs.value[draggingIndex.value];
      const draggedRowValues = inputValues.value[draggingIndex.value];

      // Delete the dragged row from its original position
      inputs.value.splice(draggingIndex.value, 1);
      inputValues.value.splice(draggingIndex.value, 1);

      // Insert the dragged row at the drop position
      inputs.value.splice(index, 0, draggedRow);
      inputValues.value.splice(index, 0, draggedRowValues);
    }
  };

  async function syncUserInfo() {
    await useUserInfo.getProfileInfo();
    if (useUserInfo.userInfo?.work_experience.length == 0) return;

    // let newRow = useStore?.userInfoStage3.length - inputValues.value.length;
    let newRow =
      useUserInfo.userInfo?.work_experience.length - inputValues.value.length;

    for (let i = 0; i < newRow; i++) {
      addWorkExp();
      isEndDate.value.push([false]);
    }

    if (
      useUserInfo.userInfo?.work_experience.length == inputValues.value.length
    ) {
      useUserInfo.userInfo?.work_experience.map((item, index) => {
        inputValues.value[index] = inputs.value[index].reduce((acc, input) => {
          acc[input.name] = item[input.name];

          if (item.id !== undefined) {
            acc.id = item.id;
          }
          if (item.end_date === null) {
            isEndDate.value[index] = [true];
          }

          return acc;
        }, {});
      });
    }
  }

  const addWorkExp = () => {
    const newRow = inputs.value[0].map((input, index) => {
      return {
        id: input.id + inputs.value.length * 10,
        placeholder: input.placeholder,
        title: input.title,
        name: input.name,
      };
    });

    const newRowValues = newRow.reduce((acc, input) => {
      acc[input.name] = "";
      return acc;
    }, {});

    inputValues.value.push(newRowValues);
    inputs.value.push(newRow);
    isEndDate.value.push([false]);
  };

  const deleteWorkExp = async (isModal, index) => {
    if (!isModal) {
      isDeleteModal.value = true;
      storeDeleteIndex.value = index;
    } else {
      let id = inputValues.value[storeDeleteIndex.value]["id"];

      if (id !== undefined) {
        try {
          let payload = { id };
          const endpoint = "/user/delete-work-experience";
          const { data, error } = await callAuthnAxios(endpoint, payload);

          if (data?.data) {
            alert(data.data);
            isDeleteModal.value = false;
            syncUserInfo();
          } else {
            console.log(error);
          }
        } catch (err) {
          console.log(err);
        }
      }

      isDeleteModal.value = false;
      if (inputs.value.length == 1 && inputValues.value.length == 1) {
        Object.keys(inputValues.value[0]).forEach((key) => {
          inputValues.value[0][key] = "";
        });
        isEndDate.value[0] = [false];
      } else {
        inputs.value.splice(storeDeleteIndex.value, 1);
        inputValues.value.splice(storeDeleteIndex.value, 1);
        isEndDate.value.splice(storeDeleteIndex.value, 1);
      }
    }
  };

  async function updateWorkExp({ id, index }) {
    let workExp = inputValues.value[index];

    try {
      const endpoint = "/user/update-work-experience";

      let payload = {
        id: workExp.id,
        company_name: workExp.company_name,
        position: workExp.position,
        start_date: workExp.start_date,
        end_date: workExp.end_date,
        description: workExp.description,
        noc_scan: workExp.noc_scan,
        experience_scan: workExp.experience_scan,
      };

      const { data, error } = await callAuthnAxios(endpoint, payload);

      if (data?.data) {
        alert(data.data);
        syncUserInfo();
      } else {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }

    console.log(id, index);
  }

  // Method to handle the checkbox change
  const handleWorkingChange = (rowIndex) => {
    inputValues.value[rowIndex]["end_date"] = null;
  };
  onMounted(() => {
    syncUserInfo();
  });
</script>

<style scoped>
  ::-webkit-scrollbar {
    display: none;
  }
</style>
