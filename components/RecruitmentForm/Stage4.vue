<template>
  <section class="bg-white">
    <div class="recruitment-form-container">
      <h2 class="text-xl font-bold mb-4 underline">গবেষণা ও প্রকাশনা</h2>
      <!-- <p class="mb-6">
        নিচের নমুনা অনুযায়ী গবেষণা/প্রকাশনার তথ্য দিন:
      </p> -->
      <div
        v-if="false"
        class="flex flex-col items-center justify-center gap-10"
      >
        <AnimatedPlaceholders class="h-[50px] w-[400px]" v-for="x in 5" />
      </div>

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
                :class="[
                  input.name === 'description' ||
                  input.name === 'author_name' ||
                  input.name === 'title' ||
                  input.name === 'link' ||
                  input.name === 'journal_name'
                    ? 'sm:col-span-3'
                    : '',
                ]"
              >
                <!-- {{ inputValueso[rowIndex][key] }} -->
                <h1 v-if="input.title !== 'Action'" class="mb-2 font-semibold">
                  {{ input.title }}
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
                    input.name !== 'description'
                  "
                  :id="input.id"
                  :placeholder="input.placeholder"
                  :type="
                    input.title == 'Start Date' || input.title == 'End Date'
                      ? 'date'
                      : 'text'
                  "
                  class="p-3 border rounded-md focus:outline-none focus:border-blue-500 w-full"
                  v-model="inputValues[rowIndex][input.name]"
                />
                <!-- {{ inputValues[rowIndex]["id"] }} -->

                <div v-if="input.name === 'description'">
                  <Quill v-model="inputValues[rowIndex][input.name]" />
                </div>

                <div class="dynamic-action-container">
                  <button
                    v-if="input.title === 'Action'"
                    :disabled="false"
                    @click="deleteResearch(false, rowIndex)"
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
                    v-if="inputValues[rowIndex]['id'] && inputIndex === 8"
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
          @click="deleteResearch(true)"
        >
          <span>Yes</span>
        </button>
      </div>
    </template>
  </ModalsBaseModal>
</template>

<script setup>
  import { useRecuitFormStore } from "~/stores/recuitFormState";
  import Navigation from "./Navigation";
  import getIcons from "./formIcon";
  import { useUserInfoStore } from "~/stores/userInfoStore";

  const useUserInfo = useUserInfoStore();
  const useStore = useRecuitFormStore();
  let draggingIndex = ref();
  let inputs = ref(useStore.inputsStage4);
  let inputValues = ref(useStore.inputValuesStage4);
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
      const endpoint = "/user/research-publication";

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
    if (useUserInfo.userInfo?.user_research_publication.length == 0) return;

    let newRow =
      useUserInfo.userInfo?.user_research_publication.length -
      inputValues.value.length;

    for (let i = 0; i < newRow; i++) {
      addWorkExp();
    }

    if (
      useUserInfo.userInfo?.user_research_publication.length ==
      inputValues.value.length
    ) {
      useUserInfo.userInfo?.user_research_publication.map((item, index) => {
        inputValues.value[index] = inputs.value[index].reduce((acc, input) => {
          acc[input.name] = item[input.name];

          if (item.id !== undefined) {
            acc.id = item.id;

            // if (item["noc_scan"] && !x.includes(item["noc_scan"])) {
            //   x.push(item["noc_scan"]);
            // }
            // console.log(item["noc_scan"]);
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
  };

  const deleteResearch = async (isModal, index) => {
    if (!isModal) {
      isDeleteModal.value = true;
      storeDeleteIndex.value = index;
    } else {
      let id = inputValues.value[storeDeleteIndex.value]["id"];

      if (id !== undefined) {
        try {
          let payload = { id };
          const endpoint = "/user/delete-research-publication";
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
      } else {
        inputs.value.splice(storeDeleteIndex.value, 1);
        inputValues.value.splice(storeDeleteIndex.value, 1);
      }
    }
  };

  async function updateWorkExp({ id, index }) {
    let researchAndPublications = inputValues.value[index];

    try {
      const endpoint = "/user/update-research-publication";

      let payload = {
        id: researchAndPublications.id,
        author_name: researchAndPublications.author_name,
        title: researchAndPublications.title,
        journal_name: researchAndPublications.journal_name,
        page: researchAndPublications.page,
        year: researchAndPublications.year,
        vol: researchAndPublications.vol,
        description: researchAndPublications.description,
        link: researchAndPublications.link,
        sort_order: researchAndPublications.sort_order,
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
  }

  onMounted(() => {
    syncUserInfo();
  });
</script>

<style scoped>
  ::-webkit-scrollbar {
    display: none;
  }
</style>
