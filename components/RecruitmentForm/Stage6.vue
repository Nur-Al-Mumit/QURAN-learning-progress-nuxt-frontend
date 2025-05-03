<template>
  <section class="bg-white">
    <div class="recruitment-form-container">
      <h2 class="text-xl font-bold mb-4 underline">সংযুক্তি</h2>
      <p class="mb-6">
        <!-- নিচের নমুনা অনুযায়ী গবেষণা/প্রকাশনার তথ্য দিন: -->
      </p>
      <div
        v-if="isAnimation"
        class="flex flex-col items-center justify-center gap-10"
      >
        <AnimatedPlaceholders class="h-[50px] w-[400px]" v-for="x in 5" />
      </div>
      <form action="" @submit.prevent="uploadDocs">
        <div class="mx-auto" v-if="isLoaded">
          <div
            v-for="(input, index) in docsInputs"
            class="sm:w-[40%] my-3 mx-auto"
          >
            <InputsBaseFIleUpload
              :label="input.doc_title"
              :inputId="`${input.doc_title}${input.id}`"
              :accept="'image/jpeg, application/pdf'"
              :required="input?.is_mandatory === 1 ?? false"
              :uploadedFileUrl="input?.doc_path"
              :size="input?.file_size_limit"
              v-model="docsInputValues[index]['doc_name']"
            />
            <input type="hidden" :value="setTypeId(index, input?.id)" />
          </div>
        </div>
      </form>
      <Navigation
        :prevStep="prevStep"
        :submit-function="uploadDocs"
        :isLoading="isLoading"
      />
    </div>

    <ModalsBaseModal :is-modal="isModel">
      <template #body>
        <h1 class="text-xl font-bold text-center">
          Form Submitted successfully
        </h1>
      </template>
      <template #footer>
        <div class="flex justify-center">
          <button
            @click="(isModel = false), (useStore.currentStep = 1)"
            type="submit"
            class="gap-10 font-bold border border-gray-400 py-3 px-5 w-fit hover:bg-black hover:text-white base-trans rounded-sm mt-7"
          >
            <span>Go to profile</span>
          </button>
        </div>
      </template>
    </ModalsBaseModal>
  </section>
</template>

<script setup>
  import Navigation from "./Navigation";
  import { useUpdateProfileInfo } from "~/composables/updateUserProfileInfo";
  import { useRecuitFormStore } from "~/stores/recuitFormState";

  const useStore = useRecuitFormStore();
  const prevStep = () => {
    setPrev(useRecuitFormStore);
  };

  let isModel = ref(false);
  let isLoaded = ref(true);
  let isAnimation = ref(true);
  let isInitialized = ref(false);
  let docsInputs = ref([]);
  let docsInputValues = ref([]);
  let isLoading = ref({
    isSpin: false,
    navigation: "next",
  });

  const getDocsInputs = async () => {
    try {
      const endpoint = "/user/docs";

      const { data, error } = await callAuthnAxios(endpoint);

      if (data?.data) {
        // console.log(data?.data);
        docsInputs.value = data?.data;
        initialDocsValues();
        isAnimation.value = false;
      } else {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadDocs = async () => {
    try {
      const endpoint = "/user/upload-docs";
      let payload = docsInputValues.value;
      const { data, error } = await callAuthnAxios(endpoint, payload);

      if (data?.data) {
        console.log(data);
        getDocsInputs();
        isModel.value = true;
        isAnimation.value = false;
      } else {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
      isModel.value = false;
    }
    return true;
  };

  const initialDocsValues = () => {
    if (
      !isInitialized.value &&
      docsInputs.value.length !== docsInputValues.value.length
    ) {
      docsInputs.value.forEach(() => {
        const docsValues = {
          doc_type_id: "",
          doc_name: "",
          sort_order: 1,
        };
        docsInputValues.value.push(docsValues);
      });
      isInitialized.value = true;
    }
  };

  function setTypeId(row, id) {
    docsInputValues.value[row]["doc_type_id"] = id;
  }

  onMounted(() => {
    getDocsInputs();
    isLoaded.value = true;

    useUpdateProfileInfo();
  });
</script>
