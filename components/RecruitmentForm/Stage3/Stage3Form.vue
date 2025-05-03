<template>
  <section>
    <form @submit.prevent class="sm:w-[900px]">
      <div class="mx-auto">
        <!-- Add and Delete buttons -->
        <div class="flex justify-end -mb-6 md:mb-6">
          <button @click="addInputRow" class="base-blank-btn mr-4">
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
              'p-5 pt-12 grid grid-cols-1 sm:grid-cols-3 gap-5 relative',
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
              <!-- {{ inputValueso[rowIndex][key] }} -->
              <h1 v-if="input.title !== 'Action'" class="">
                {{ input.title }}
              </h1>
              <input
                v-if="input.title !== 'Action' && input.id % 6 !== 0"
                :id="input.id"
                :placeholder="input.placeholder"
                type="text"
                class="p-2 border rounded-md focus:outline-hidden focus:border-blue-500 w-full"
                v-model="inputValues[rowIndex][inputIndex]"
              />

              <FileUpload
                v-if="input.id % 6 === 0"
                inputId="drivingLicense"
                label=""
              />
              <!-- label="Certificate Scan:" -->
              <!-- Passport Section  -->

              <button
                v-if="input.title === 'Action'"
                :disabled="inputs.length === 1"
                @click="deleteRow(rowIndex)"
                :class="[
                  'base-blank-btn w-fit p-1 px-2 text-center absolute top-3 right-3',
                  inputs.length === 1
                    ? ' hover:bg-gray-400 text-gray-400 border-gray-400 cursor-not-allowed '
                    : 'text-red-600 hover:bg-red-600 border-red-600',
                ]"
              >
                <span v-html="getIcons('delete', 'w-5')"></span>
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Add and Delete buttons -->

        <div class="flex justify-center mt-6">
          <button @click="addInputRow" class="base-blank-btn mr-4">
            Add +
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
  import { useRecuitFormStore } from "~/stores/recuitFormState";
  import FileUpload from "~/components/Inputs/BaseFIleUpload.vue";
  import getIcons from "../formIcon";
  const useStore = useRecuitFormStore();
  // const inputs = ref(useStore.inputs);
  // const inputValues = ref(useStore.inputValues);
  const inputs = ref([
    [
      { id: 1, placeholder: "SSC/B.Sc.", title: "Company Name" },
      { id: 2, placeholder: "Science/CSE", title: "Position" },
      { id: 3, placeholder: "2000", title: "Start Date" },
      { id: 4, placeholder: "2004", title: "End Date" },
      {
        id: 5,
        placeholder: "Dhaka/এসো কুরআন শিখি",
        title: "Description",
      },
      { id: 6, placeholder: "2004", title: "NOC" },
    ],
  ]);

  const inputValues = ref([Array(6).fill("")]);

  let draggingIndex = ref();

  const addInputRow = () => {
    const newRow = inputs.value[0].map((input, index) => {
      return {
        id: input.id + inputs.value.length * 9,
        // title: `${input.title}${inputs.value.length + 1}`,
        placeholder: input.placeholder,
        title: input.title,
      };
    });

    const newRowValues = Array(6).fill("");

    inputValues.value.push(newRowValues);
    inputs.value.push(newRow);
  };

  const removeInputRow = () => {
    if (inputs.value.length <= 1) return;
    inputs.value.pop();
    inputValues.value.pop();
  };

  const deleteRow = (index) => {
    inputs.value.splice(index, 1);
    inputValues.value.splice(index, 1);
  };

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
</script>

<style scoped>
  ::-webkit-scrollbar {
    display: none;
  }
</style>
