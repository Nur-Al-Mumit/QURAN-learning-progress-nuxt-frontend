<template>
  <section class="bg-white">
    <div class="recruitment-form-container">
      <h2 class="text-xl mb-4 font-bold underline">শিক্ষাগত যোগ্যতা</h2>
      <!-- <p class="mb-6">আপনার শিক্ষাগত তথ্য দিন:</p> -->

      <form @submit.prevent="() => nextStep(false)" class="sm:w-[900px]">
        <div class="mx-auto">
          <!-- Add and Delete buttons -->
          <div class="flex justify-end -mb-6 md:mb-6">
            <button
              type="button"
              @click="addAcadQual"
              class="base-blank-btn mr-4"
            >
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
                :class="['']"
              >
                <h1
                  v-if="
                    input.title !== 'Action' &&
                    input.name !== 'certificate_scan' &&
                    input.name !== 'transcript_scan'
                  "
                  :class="['flex justify-between mb-2 font-semibold']"
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
                      class="form-checkbox h-4 w-6 text-blue-600 rounded-sm transition duration-200 ease-in-out"
                    />
                    <span class="text-sm font-medium text-gray-700">
                      Studying
                    </span>
                  </label>
                </h1>

                <!-- For taking the sort order -->
                <input
                  v-if="input.name === 'sort_order'"
                  type="hidden"
                  :value="getInputIndex(rowIndex)"
                />

                <InputsBaseSelect
                  v-if="input.name === 'division'"
                  placeholder="Select"
                  :options="division"
                  :required="false"
                  :disable="isDivisionDisable[rowIndex][0]"
                  v-model="inputValues[rowIndex][input.name]"
                />

                <input
                  v-if="
                    input.title !== 'Action' &&
                    input.name !== 'certificate_scan' &&
                    input.name !== 'division' &&
                    input.name !== 'transcript_scan' &&
                    input.name !== 'grade'
                  "
                  :id="input.id"
                  :placeholder="input.placeholder"
                  :type="
                    input.name === 'end_date' ||
                    input.name === 'start_date' ||
                    input.name === 'certificate_year' ||
                    input.name === 'grade_out_of'
                      ? 'number'
                      : 'text'
                  "
                  :disabled="
                    input.name === 'end_date' && isEndDate[rowIndex][0]
                  "
                  class="p-3 border rounded-md focus:outline-hidden focus:border-blue-500 w-full"
                  v-model="inputValues[rowIndex][input.name]"
                />
                <input
                  v-if="input.name === 'grade'"
                  :id="input.id"
                  :placeholder="input.placeholder"
                  type="number"
                  step="0.1"
                  class="p-3 border rounded-md focus:outline-hidden focus:border-blue-500 w-full"
                  v-model="inputValues[rowIndex][input.name]"
                  @blur="validateGrade(rowIndex, input.name)"
                  @input="checkGradeBounds($event, rowIndex, input.name)"
                />

                <!-- Certificate/Transcript Section  -->
                <FileUpload
                  v-if="
                    input.name === 'certificate_scan' ||
                    input.name === 'transcript_scan'
                  "
                  :inputId="
                    input.name === 'certificate_scan'
                      ? `certificate_scan${rowIndex}`
                      : `transcript_scan${rowIndex}`
                  "
                  :label="input.title"
                  v-model="inputValues[rowIndex][input.name]"
                  :uploaded-file="inputValues[rowIndex][input.name]"
                />
                <!-- Certificate/Transcript Section  -->
                <div class="dynamic-action-container">
                  <button
                    v-if="input.title === 'Action'"
                    :disabled="false"
                    @click="deleteAcadQual(false, rowIndex)"
                    type="button"
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
                    v-if="inputValues[rowIndex]['id'] && inputIndex === 12"
                    @click="
                      updateAcadQual({
                        id: inputValues[rowIndex]['id'],
                        index: rowIndex,
                      })
                    "
                    type="button"
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

          <div class="flex flex-col items-center justify-center mt-6">
            <button
              @click="addAcadQual"
              class="base-blank-btn w-fit"
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
        :nextStep="() => nextStep(false)"
        :prevStep="prevStep"
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
          @click="deleteAcadQual(true)"
        >
          <span>Yes</span>
        </button>
      </div>
    </template>
  </ModalsBaseModal>
</template>

<script setup>
  import { useRecuitFormStore } from "~/stores/recuitFormState";
  import { useUserInfoStore } from "~/stores/userInfoStore";
  import Navigation from "../Navigation";
  import FileUpload from "~/components/Inputs/BaseFIleUpload.vue";
  import getIcons from "../formIcon";

  const useUserInfo = useUserInfoStore();
  const useStore = useRecuitFormStore();

  let isSaveBtn = ref(false);
  let isDeleteModal = ref(false);
  let storeDeleteIndex = ref(null);
  let isLoading = ref({
    isSpin: false,
    navigation: "next",
  });

  const prevStep = () => {
    setPrev(useRecuitFormStore);
  };

  let draggingIndex = ref();
  let inputs = ref(useStore.inputs);
  let isEndDate = ref(useStore.isEndDate);
  let inputValues = ref(useStore.inputValues);
  let isDivisionDisable = ref(useStore.isDivisionDisable);

  const division = [
    { id: "", title: "Select", value: "" },
    { id: 1, title: "First", value: 1 },
    { id: 2, title: "Second", value: 2 },
    { id: 3, title: "Third", value: 3 },
  ];

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

  const nextStep = async (isSave) => {
    isSaveBtn.value = true;
    if (!isSave) {
      isLoading.value.isSpin = true;
    }
    try {
      const endpoint = "/user/academic-qualification";
      let payload = inputValues.value;
      const { data, error } = await callAuthnAxios(endpoint, payload);

      if (data?.data) {
        alert(data.data);
        isLoading.value.isSpin = false;
        isSaveBtn.value = false;
        syncUserInfo();
        // Come from RecuitForm Pinia global store
        if (!isSave) {
          setNext(useRecuitFormStore);
        }
      } else {
        console.log(error);
        isLoading.value.isSpin = false;
        isSaveBtn.value = false;
      }
    } catch (err) {
      isLoading.value.isSpin = false;
      isSaveBtn.value = false;
      console.log(err);
    }
  };

  function getInputIndex(row) {
    inputValues.value[row]["sort_order"] = row + 1;
    return row;
  }

  async function syncUserInfo() {
    await useUserInfo.getProfileInfo();
    if (useUserInfo.userInfo?.academic_qualifications.length == 0) return;

    let newRow =
      useUserInfo.userInfo?.academic_qualifications.length -
      inputValues.value.length;

    for (let i = 0; i < newRow; i++) {
      addAcadQual();
      isEndDate.value.push([false]);
      isDivisionDisable.value.push([false]);
    }

    if (
      useUserInfo.userInfo?.academic_qualifications.length ==
      inputValues.value.length
    ) {
      useUserInfo.userInfo?.academic_qualifications.map((item, index) => {
        inputValues.value[index] = inputs.value[index].reduce((acc, input) => {
          acc[input.name] = item[input.name];

          if (item.id !== undefined) {
            acc.id = item.id;
          }
          if (item.end_date === null) {
            isEndDate.value[index] = [true];
          }
          if (item.grade) {
            isDivisionDisable.value[index] = [true];
          }
          return acc;
        }, {});
      });
    }
  }

  const addAcadQual = () => {
    const newRow = inputs.value[0].map((input, index) => {
      return {
        id: input.id + inputs.value.length * 9,
        // title: `${input.title}${inputs.value.length + 1}`,
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
    isDivisionDisable.value.push([false]);
  };

  async function updateAcadQual({ id, index }) {
    let acadQual = inputValues.value[index];

    try {
      const endpoint = "/user/update-academic-qualification";

      // console.log(acadQual);
      let payload = {
        id: acadQual.id,
        institution: acadQual.institution,
        degree: acadQual.degree,
        division: acadQual.division,
        result: acadQual.result,
        start_date: acadQual.start_date,
        end_date: acadQual.end_date,
        field_of_study: acadQual.field_of_study,
        certificate_year: acadQual.certificate_year,
        certificate_scan: acadQual.certificate_scan,
        transcript_scan: acadQual.transcript_scan,
        grade: acadQual.grade,
        grade_out_of: acadQual.grade_out_of,
      };

      // console.log(payload);
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
  }

  const deleteAcadQual = async (isModal, index) => {
    if (!isModal) {
      isDeleteModal.value = true;
      storeDeleteIndex.value = index;
    } else {
      let id = inputValues.value[storeDeleteIndex.value]["id"];

      if (id !== undefined) {
        try {
          let payload = { id };
          const endpoint = "/user/delete-academic-qualification";
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
        isDivisionDisable.value[0] = [false];
      } else {
        inputs.value.splice(storeDeleteIndex.value, 1);
        inputValues.value.splice(storeDeleteIndex.value, 1);
        isEndDate.value.splice(storeDeleteIndex.value, 1);
      }
    }
  };

  const checkGradeBounds = (event, rowIndex, inputName) => {
    let value = parseFloat(event.target.value);
    if (value > 5.0) {
      value = 5.0;
    }
    if (value) {
      inputValues.value[rowIndex][inputName] = value;
      isDivisionDisable.value[rowIndex][0] = true;
    } else {
      isDivisionDisable.value[rowIndex][0] = false;
    }
  };

  const validateGrade = (rowIndex, inputName) => {
    let value = parseFloat(inputValues.value[rowIndex][inputName]);
    if (value < 2.5) {
      value = 0;
    }
    if (value) {
      inputValues.value[rowIndex][inputName] = value;
    }
  };

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
