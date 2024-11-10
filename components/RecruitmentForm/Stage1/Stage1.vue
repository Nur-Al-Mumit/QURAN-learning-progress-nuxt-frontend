<template>
  <section class="bg-white">
    <div class="recruitment-form-container">
      <h2 class="text-center mb-4 font-bold text-red-600">
        সর্তকতা: বিজ্ঞাপিত পদে আবেদন সম্পন্ন করার পর আবেদনকারী পুনরায় প্রোফাইল
        আপডেট করতে পারবেন না। তবে অন্য পদে আবেদন করতে হলে প্রোফাইলে প্রয়োজনীয়
        সংযোজন/বিয়োজন করতে পারবেন।
      </h2>
      <h2 class="text-xl mb-4 font-bold underline">ব্যক্তিগত তথ্য</h2>
      <!-- <p class="mb-6">আপনার ব্যক্তিগত তথ্য দিন:</p> -->
      <form @submit.prevent="() => nextStep(false)">
        <div class="grid sm:grid-cols-2 gap-3">
          <InputsBaseInput
            v-model="userData.name_bangla"
            :required="true"
            label="নাম (বাংলায়):"
          />
          <InputsBaseInput
            v-model="userData.name"
            :required="true"
            label="Full name (English):"
          />
          <InputsBaseInput
            v-model="userData.father_name_bangla"
            :required="true"
            label="পিতার নাম (বাংলায়):"
          />
          <InputsBaseInput
            v-model="userData.father_name"
            :required="true"
            label="Father name (English):"
          />
          <InputsBaseInput
            v-model="userData.mother_name_bangla"
            :required="true"
            label="মাতার নাম (বাংলায়):"
          />
          <InputsBaseInput
            v-model="userData.mother_name"
            :required="true"
            label="Mother name (English):"
          />
          <InputsBaseInput
            v-model="userData.father_occupation"
            :required="true"
            label="পিতার পেশা:"
          />
          <InputsBaseInput
            v-model="userData.mother_occupation"
            :required="true"
            label="মাতার পেশা:"
          />
          <InputsBaseInput
            v-model="userData.spouse_name_bangla"
            label="স্বামী/স্ত্রীর নাম (বাংলায়):"
          />
          <InputsBaseInput
            v-model="userData.spouse_name"
            label="Spouse name (English):"
          />
          <InputsBaseInput
            v-model="userData.own_occupation"
            :required="true"
            label="আপনার পেশা:"
          />
          <InputsBaseInput
            v-model="userData.spouse_occupation"
            label="স্বামী/স্ত্রীর পেশা:"
          />
          <InputsBaseInput
            v-model="userData.permanent_address"
            :required="true"
            label="স্থায়ী ঠিকানা:"
            class="sm:col-span-2"
          />
          <InputsBaseInput
            class="sm:col-span-2"
            :required="true"
            label="যোগাযোগের ঠিকানা:"
            v-model="userData.home_address"
          />
          <InputsBaseFilterSelect
            :required="true"
            placeholder="Select Married Status"
            label="বিবাহিত/অবিবাহিত:"
            :options="marriedStatus"
            v-model="userData.is_married"
            :selected-option="selectedMarriedStatus"
          />
          <!-- :selected-option="marriedStatus" -->
          <InputsBaseFilterSelect
            :required="true"
            placeholder="Select Religion"
            label="ধর্ম:"
            :options="religions"
            v-model="userData.religion"
            @click="religionsName('')"
            :selected-option="selectedReligion"
          />
          <InputsBaseFilterSelect
            :required="true"
            label="লিঙ্গ :"
            :options="gender"
            placeholder="Select Gender"
            v-model="userData.gender"
            :selected-option="selectedGender"
          />
          <InputsBaseInput
            :required="true"
            type="number"
            label="মোবাইল নম্বর:"
            v-model="userData.phone"
          />
          <InputsBaseFilterSelectCuntry
            :required="true"
            placeholder="Select Country"
            label="দেশ:"
            :options="countries"
            v-model="userData.country_id"
            :selected-option="selectedCountry"
            @click="countryNames('', '')"
            @searchItem="(x) => (countrySearch = x)"
            @clickedItem="
              (country) => (userData.nationality = country.nationality)
            "
          />
          <InputsBaseInput
            v-model="userData.nationality"
            label="জাতীয়তা:"
            :disable="true"
            readonly
          />
          <InputsBaseInput
            v-model="userData.dob"
            :required="true"
            label="জন্ম তারিখ:"
            type="date"
          />
          <InputsBaseFilterSelectCuntry
            placeholder="Select City"
            label="জন্মস্থান:"
            :options="cities"
            v-model="userData.city_id"
            :selected-option="selectedCitie"
            @click="citieNames('', '')"
            @searchItem="(x) => (citieSearch = x)"
          />
        </div>

        <BaseDivider />

        <section class="">
          <!-- DOB Section  -->
          <section class="doc-upload-layout">
            <InputsBaseInput
              label="জন্ম নিবন্ধন নম্বর:"
              v-model="userData.birthreg"
              class="w-full"
              type="number"
            />
            <FileUpload
              label="জন্ম নিবন্ধনের কপি:"
              inputId="DOBUpload"
              v-model="userData.birthreg_scan"
              :uploaded-file-url="uploadedPdfUrls.birthreg_scan"
            />
          </section>
          <!-- DOB Section  -->

          <!-- NID Section  -->
          <section class="doc-upload-layout">
            <InputsBaseInput
              :required="true"
              type="number"
              label="জাতীয় পরিচয়পত্র নম্বর:"
              class="w-full"
              v-model="userData.nid"
            />
            <FileUpload
              :required="true"
              label="জাতীয় পরিচয়পত্রের কপি:"
              inputId="NIDUpload"
              v-model="userData.nid_scan"
              :uploaded-file-url="uploadedPdfUrls.nid_scan"
            />
          </section>
          <!-- NID Section  -->

          <!-- Passport Section  -->
          <section class="doc-upload-layout">
            <InputsBaseInput
              language="bn"
              label="পাসপোর্ট নম্বর:"
              class="w-full"
              v-model="userData.passport"
            />
            <FileUpload
              label="পাসপোর্টের কপি:"
              inputId="Passport"
              v-model="userData.passport_scan"
              :uploaded-file-url="uploadedPdfUrls.passport_scan"
            />
          </section>
          <!-- Passport Section  -->

          <!-- Driving License Section  -->
          <section class="doc-upload-layout">
            <InputsBaseInput
              label="ড্রাইভিং লাইসেন্স:"
              class="w-full"
              v-model="userData.drivinglicense"
            />
            <FileUpload
              label="ড্রাইভিং লাইসেন্সের কপি:"
              inputId="drivingLicense"
              v-model="userData.drivinglicense_scan"
              :uploaded-file-url="uploadedPdfUrls.drivinglicense_scan"
            />
          </section>
          <!-- Driving License Section  -->

          <section class="doc-upload-layout">
            <FileUpload
              label="CV/Resume:"
              inputId="Resume"
              v-model="userData.resume_scan"
              :uploaded-file-url="uploadedPdfUrls.resume_scan"
            />
          </section>

          <BaseDivider />

          <!-- Profile And Signature Section  -->
          <section class="my-3 p-2 border rounded-md">
            <h1 class="font-bold sm:text-xl text-center my-3 text-blue-400">
              Upload profile photo and signature
            </h1>

            <section
              class="flex flex-col sm:flex-row justify-between gap-y-9 sm:gap-3"
            >
              <FileUpload
                :required="true"
                label="Profile picture (300 x 300 px, 200 KB):"
                inputId="profilePictures"
                v-model="userData.profile_picture"
                :accept="'image/png, image/jpeg'"
                :uploaded-file-url="uploadedPdfUrls.profile_picture"
              />
              <FileUpload
                :required="true"
                label="Signature (300 x 80 px, 200 KB):"
                inputId="signature"
                :accept="'image/png, image/jpeg'"
                v-model="userData.signature_scan"
                :uploaded-file-url="uploadedPdfUrls.signature_scan"
              />
            </section>
          </section>
          <!-- Profile And Signature Section  -->
        </section>

        <BaseDivider />

        <div class="mt-5">
          <h2 class="font-semibold mt-3 underline text-xl">ভাষাগত দক্ষতা:</h2>
          <LanInput />
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
        :isLoading="isLoading"
        :isSaveButton="true"
      />
    </div>
    <!-- <ModalsBaseModal>
      <template #body>
        <h1>Form successfully Save</h1>
      </template>
    </ModalsBaseModal> -->
  </section>
</template>

<script setup>
  import axios from "axios";
  import { setNext } from "~/composables/recruitNavigation";
  import { useAuthStore } from "~/stores/userAuthStore";
  import { useSideBarStore } from "~/stores/sideBarStore";
  import { useRecuitFormStore } from "~/stores/recuitFormState";
  import { useUserInfoStore } from "~/stores/userInfoStore";
  import LanInput from "~/components/RecruitmentForm/Stage1/LanguageInput.vue";
  import FileUpload from "~/components/Inputs/BaseFIleUpload.vue";
  import Navigation from "../Navigation";

  // useRecuitFormStore

  const useUserInfo = useUserInfoStore();
  const sideBarStore = useSideBarStore();
  const recruitStore = useRecuitFormStore();

  let languageValues = ref(recruitStore.langaugeValues);
  let isLoading = ref({
    isSpin: false,
    navigation: "next",
  });
  let isSaveBtn = ref(false);

  // For dynamic countries
  let countries = ref([]);
  let countrySearch = ref("");
  let selectedCountry = ref({});

  const countryNames = async (per_page = "", search = "") => {
    try {
      const endpoint = "/common/countries";
      const payload = { per_page, search };
      const { data, error } = await callAuthnAxios(endpoint, payload);
      if (data?.data) {
        countries.value = data.data.data;
      } else {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  watch(
    () => countrySearch.value,
    (newValue) => {
      if (newValue.length >= 2) {
        countryNames("", newValue);
      }
    }
  );

  let cities = ref([]);
  let citieSearch = ref("");
  let selectedCitie = ref({});
  let selectedGender = ref({});

  const citieNames = async (per_page = "", search = "") => {
    try {
      const endpoint = "/common/cities";
      const payload = { per_page, search };
      const { data, error } = await callAuthnAxios(endpoint, payload);
      if (data?.data) {
        cities.value = data.data.data;
      } else {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  watch(
    () => citieSearch.value,
    (newValue) => {
      if (newValue.length >= 2) {
        citieNames("", newValue);
      }
    }
  );

  let religions = ref([]);
  let selectedReligion = ref({});

  const religionsName = async () => {
    try {
      const endpoint = "/common/religions";

      const { data, error } = await callAuthnAxios(endpoint);

      if (data?.data) {
        religions.value = data.data;
        console.log(data.data);
      } else {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const gender = [
    { id: 1, name: "Male", value: 1 },
    { id: 2, name: "Female", value: 2 },
  ];

  const marriedStatus = [
    { id: 1, name: "Married", value: "1" },
    { id: 2, name: "Un-Married", value: "2" },
  ];

  let selectedMarriedStatus = computed(() => {
    let selectedOption = marriedStatus.filter(
      (option) => option.id == userData.value.is_married
    );
    return selectedOption[0];
  });

  let userData = ref({
    name: "",
    name_bangla: "",
    father_name: "",
    father_name_bangla: "",
    father_occupation: "",
    mother_name: "",
    mother_name_bangla: "",
    mother_occupation: "",
    spouse_name: "",
    spouse_occupation: "",
    own_occupation: "",
    spouse_name_bangla: "",
    dob: "",
    birthreg: "",
    birthreg_scan: {},
    permanent_address: "",
    home_address: "",
    nationality: "",
    is_married: "",
    religion: "",
    gender: "",
    phone: "",
    country_id: "",
    city_id: "",
    nid: "",
    nid_scan: {},
    passport: "",
    passport_scan: {},
    drivinglicense: "",
    drivinglicense_scan: {},
    languages: [],
    signature_scan: {},
    profile_picture: {},
    resume_scan: {},
  });

  const formateLanguageValues = () => {
    let formattedLanguageValues = languageValues.value.map((lan) => {
      return {
        language_id: lan?.language_id.id ?? "",
        language_proficiency_id: lan.language_proficiency_id.id ?? "",
        sort_order: lan.sort_order,
        ...(lan?.id && { id: lan.id }),
      };
    });
    userData.value.languages = formattedLanguageValues;
  };

  let uploadedPdfUrls = ref({
    nid_scan: "",
    passport_scan: "",
    drivinglicense_scan: "",
    signature_scan: "",
    profile_picture: "",
    birthreg_scan: "",
    resume_scan: "",
  });

  const getProfileInfo = async () => {
    try {
      const {
        loggedInData: { token_type, access_token },
      } = useAuthStore();

      const config = {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      };

      const endpoint = "/user/profile-information";

      const { data } = await axios.get(endpoint, config);
      let {
        user,
        user_profile,
        academic_qualifications,
        work_experience,
        user_languages,
        user_research_publication,
        user_trainings,
        check_list,
      } = data.data;

      // console.log(userData.value);

      sideBarStore.user = { user, user_profile };
      recruitStore.checkList = check_list;
      recruitStore.userInfoStage2 = academic_qualifications;
      recruitStore.userInfoStage3 = [];
      recruitStore.userInfoStage3 = work_experience;
      recruitStore.userInfoStage4 = [];
      recruitStore.userInfoStage4 = user_research_publication;
      recruitStore.userInfoStage5 = [];
      recruitStore.userInfoStage5 = user_trainings;
      recruitStore.userLanguageInfo = [];
      recruitStore.userLanguageInfo = user_languages;

      // Set Profile Data
      userData.value.name = user?.name;
      userData.value.name_bangla = user_profile?.name_bangla;
      userData.value.phone = user?.phone;
      userData.value.father_name = user_profile?.father_name;
      userData.value.father_name_bangla = user_profile?.father_name_bangla;
      userData.value.father_occupation = user_profile?.father_occupation;
      userData.value.mother_name = user_profile?.mother_name;
      userData.value.mother_name_bangla = user_profile?.mother_name_bangla;
      userData.value.mother_occupation = user_profile?.mother_occupation;
      userData.value.spouse_name = user_profile?.spouse_name;
      userData.value.spouse_name_bangla = user_profile?.spouse_name_bangla;
      userData.value.spouse_occupation = user_profile?.spouse_occupation;
      userData.value.own_occupation = user_profile?.own_occupation;
      userData.value.dob = user_profile?.dob;
      userData.value.birthreg = user_profile?.birthreg;
      userData.value.permanent_address = user_profile?.permanent_address;
      userData.value.home_address = user_profile?.home_address;
      userData.value.nationality = user_profile?.nationality;
      userData.value.is_married = user_profile?.is_married;
      userData.value.religion = user_profile?.religion;
      userData.value.gender = user_profile?.gender;
      userData.value.country_id = user_profile?.country_id;
      userData.value.city_id = user_profile?.city_id;
      userData.value.nid = user_profile?.nid;
      userData.value.passport = user_profile?.passport;
      userData.value.drivinglicense = user_profile?.drivinglicense;

      uploadedPdfUrls.value.nid_scan = user_profile?.nid_scan;
      uploadedPdfUrls.value.birthreg_scan = user_profile?.birthreg_scan;
      uploadedPdfUrls.value.signature_scan = user_profile?.signature_scan;
      uploadedPdfUrls.value.profile_picture = user_profile?.profile_picture;
      uploadedPdfUrls.value.passport_scan = user_profile?.passport_scan;
      uploadedPdfUrls.value.resume_scan = user_profile?.resume_scan;
      uploadedPdfUrls.value.drivinglicense_scan =
        user_profile?.drivinglicense_scan;

      // Sync Selected Values
      selectedReligion.value = user_profile?.selected_religion;
      selectedCountry.value = user_profile?.selected_country;
      selectedCitie.value = user_profile?.selected_city;
      selectedGender.value = gender[parseInt(user_profile?.gender) - 1];
    } catch (err) {
      console.log(err);
    }
  };

  watch(
    () => recruitStore.langaugeValues,
    () => {
      languageValues.value = recruitStore?.langaugeValues;
      formateLanguageValues();
    },
    {
      immediate: true,
      deep: true,
    }
  );

  async function storeLanguage(language) {
    try {
      const endpoint = "/user/languages";
      let payload = language;

      const { data, error } = await callAuthnAxios(endpoint, payload);

      if (data?.data) {
      } else {
        console.log(error);
        // isLoading.value.isSpin = false;
      }
    } catch (err) {
      // isLoading.value.isSpin = false;
      console.log(err);
    }
  }

  const nextStep = async (isSave) => {
    isSaveBtn.value = true;
    if (!isSave) {
      isLoading.value.isSpin = true;
    }
    try {
      const endpoint = "/user/profile";
      let payload = { ...userData.value };

      const { data, error } = await callAuthnAxios(endpoint, payload);

      if (data?.data) {
        await storeLanguage(userData.value.languages);
        await useUserInfo.getProfileInfo();
        getProfileInfo();
        if (!isSave) {
          setNext(useRecuitFormStore);
        }
        isSaveBtn.value = false;
        isLoading.value.isSpin = false;
        alert(data.data);
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

  onMounted(() => {
    getProfileInfo();
  });
</script>
