<template>
  <section>
    <!-- Add and Delete buttons -->
    <div class="flex justify-end mt-6">
      <button type="button" @click="addLanguage" class="base-blank-btn mr-4">
        Add +
      </button>
    </div>

    <div
      v-for="(languageInput, rowIndex) in languageInputs"
      :class="'flex flex-col sm:flex-row gap-3 items-center sm:items-end sm:justify-center mt-5 border border-gray-400 p-2 rounded-sm sm:border-none sm:p-0'"
    >
      <div
        v-for="(input, index) in languageInput"
        :class="[input.title === 'Action' ? 'sm:w-fit' : 'min-w-full mt-3 sm:min-w-[30%] sm:mt-0']"
      >
        <input type="hidden" :value="getInputIndex(rowIndex)" />
        <InputsBaseFilterSelectCuntry
          v-if="input.placeholder === 'Languages'"
          :key="`language-${rowIndex}`"
          :required="true"
          :placeholder="input.placeholder"
          :label="input.title"
          :options="languages"
          @click="getLanguages('', '')"
          @searchItem="(x) => (languageSearch = x)"
          @clickedItem="
            (lan) => (langaugeValues[rowIndex]['language_id'] = lan)
          "
          :selectedOption="langaugeValues[rowIndex]['language_id']"
        />
        <InputsBaseFilterSelect
          class="w-full"
          v-if="input.placeholder === 'Skills'"
          :key="`skill-${rowIndex}`"
          :options="skills"
          :label="input.title"
          :placeholder="input.placeholder"
          @click="getSkills"
          @clickedItem="
            (skill) =>
              (langaugeValues[rowIndex]['language_proficiency_id'] = skill)
          "
          :selectedOption="langaugeValues[rowIndex]['language_proficiency_id']"
        />
        <div class="flex gap-2 w-fit">
          <button
            v-if="langaugeValues[rowIndex]['id'] && index === 2"
            type="button"
            @click="updateLanguage(rowIndex)"
            :class="[
              'base-blank-btn w-fit h-fit my-1 p-3 text-center ',
              'text-blue-600 hover:bg-blue-600 border-blue-600 items-center',
            ]"
          >
            <!-- <span v-html="getIcons('delete', 'w-5')"></span> -->
            <span v-html="getIcons('edit', 'w-5 scale-150')"></span>
            <span class="sm:hidden">Save changes</span>
          </button>
          <button
            v-if="input.title === 'Action'"
            type="button"
            :disabled="languageInputs.length === 1"
            @click="removeLanguage(rowIndex)"
            :class="[
              'base-blank-btn w-fit h-fit my-1 p-3 text-center ',
              languageInputs.length === 1
                ? ' hover:bg-gray-400 text-gray-400 border-gray-400 cursor-not-allowed '
                : 'text-red-600 hover:bg-red-600 border-red-600',
            ]"
          >
            <span v-html="getIcons('delete', 'w-5')"></span>
            <span class="sm:hidden">Delete</span>
          </button>
        </div>
      </div>
    </div>
    <!-- Add and Delete buttons -->
    <div class="flex justify-center mt-6">
      <button type="button" @click="addLanguage" class="base-blank-btn mr-4">
        Add +
      </button>
    </div>
  </section>
</template>

<script setup>
  import getIcons from "../formIcon";
  import { useRecuitFormStore } from "~/stores/recuitFormState";
  import { useUserInfoStore } from "~/stores/userInfoStore";

  const useStore = useRecuitFormStore();
  const useUserInfo = useUserInfoStore();

  let skills = ref([]);
  let languages = ref([]);
  let languageSearch = ref([]);
  let languageInputs = ref(useStore.languageInputs);
  let langaugeValues = ref(useStore.langaugeValues);

  async function syncUserLang() {
    await useUserInfo.getProfileInfo();
    if (useUserInfo.userInfo?.user_languages.length == 0) return;

    let newRow =
      useUserInfo.userInfo?.user_languages.length - langaugeValues.value.length;

    for (let i = 0; i < newRow; i++) {
      addLanguage();
    }

    if (
      useUserInfo.userInfo?.user_languages.length == langaugeValues.value.length
    ) {
      useUserInfo.userInfo?.user_languages.map((item, index) => {
        langaugeValues.value[index]["language_id"] = item.language;
        langaugeValues.value[index]["language_proficiency_id"] =
          item.proficience;
        langaugeValues.value[index]["sort_order"] = item.sort_order;

        if (item.id !== undefined) {
          langaugeValues.value[index].id = item.id;
        }
      });
    }
  }

  const addLanguage = () => {
    let newLang = languageInputs.value[0].map((input, index) => {
      return {
        id: input.id + languageInputs.value.length * 3,
        placeholder: input.placeholder,
        title: input.title,
        name: input.name,
      };
    });

    const newLangValue = newLang.reduce((acc, input) => {
      acc[input.name] = "";
      return acc;
    }, {});

    langaugeValues.value.push(newLangValue);
    languageInputs.value.push(newLang);
  };

  const removeLanguage = async (index) => {
    let id = langaugeValues.value[index]["id"];
    if (id !== undefined) {
      try {
        const endpoint = "/user/delete-languages";
        let payload = { id };

        const { data, error } = await callAuthnAxios(endpoint, payload);

        if (data?.data) {
          alert(data.data);
        } else {
          console.log(error);
        }
      } catch (err) {
        // isLoading.value.isSpin = false;
        console.log(err);
      }
    }
    languageInputs.value.splice(index, 1);
    langaugeValues.value.splice(index, 1);
  };

  async function updateLanguage(index) {
    let lan = langaugeValues.value[index];
    let updateLan = {
      language_id: lan.language_id.id,
      language_proficiency_id: lan.language_proficiency_id.id,
      sort_order: 1,
      id: lan.id,
    };
    try {
      const endpoint = "/user/update-languages";
      let payload = updateLan;

      const { data, error } = await callAuthnAxios(endpoint, payload);

      if (data?.data) {
        alert(data.data);
      } else {
        console.log(error);
        // isLoading.value.isSpin = false;
      }
    } catch (err) {
      // isLoading.value.isSpin = false;
      console.log(err);
    }
  }

  function getInputIndex(row) {
    langaugeValues.value[row]["sort_order"] = 1;
    return 1;
  }

  const getLanguages = async (per_page = "", search = "") => {
    try {
      const endpoint = "/common/languages";
      let payload = { per_page, search };

      const { data, error } = await callAuthnAxios(endpoint, payload);

      if (data?.data) {
        languages.value = data.data.data;
      } else {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSkills = async () => {
    try {
      const endpoint = "/common/language-proficiencies";

      if (skills.value.length === 0) {
        const { data, error } = await callAuthnAxios(endpoint);

        if (data?.data) {
          skills.value = data.data;
        } else {
          console.log(error);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  watch(
    () => languageSearch.value,
    (newValue) => {
      if (newValue.length >= 2) {
        getLanguages("", newValue);
      }
    }
  );

  onMounted(() => {
    getLanguages();
    syncUserLang();
    // getSkills();
  });
</script>
