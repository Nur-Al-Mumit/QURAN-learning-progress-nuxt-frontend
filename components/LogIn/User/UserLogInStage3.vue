<template>
  <section>
    <div>
      <div>
        <form class="" @submit.prevent="logIn">
          <div>
            <div>
              <label>Enter Your OTP</label>
              <!-- <div data-ui-disabled="false">
                <input
                  v-model="OTP"
                  required
                  type="text"
                  inputmode="text"
                  id="email"
                  class="flex items-center gap-10 font-bold border border-gray-400 py-3 px-5 w-full base-trans mb-2 rounded-sm"
                />
              </div> -->
              <div class="flex justify-center space-x-2 my-3">
                <input
                  v-for="(digit, index) in otpInputs"
                  :key="index"
                  ref="otpInput"
                  type="number"
                  required
                  maxlength="1"
                  v-model="otpInputs[index]"
                  @input="handleInput(index, $event)"
                  @keydown="handleKeydown(index)"
                  @paste="handlePaste($event)"
                  class="w-12 h-12 border-2 border-gray-300 text-center text-xl font-semibold rounded-md focus:outline-hidden focus:border-blue-500 appearance-none"
                />
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              :disabled="isDisable"
              class="gap-10 font-bold border border-gray-400 py-3 px-5 w-full hover:bg-black hover:text-white base-trans rounded-sm flex justify-center"
            >
              <span>LogIn</span>
              <span
                v-if="isDisable"
                v-html="
                  getIcons(
                    'sppiner',
                    `w-[20px] transition-transform duration-300`
                  )
                "
              ></span>
            </button>
          </div>

          <div class="my-3 text-center hover:text-black base-trans">
            <a @click="resend" class="cursor-pointer hover:text-blue-500 base-trans hover:underline">I didn't receive a code</a>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
  import getIcons from "~/composables/icon";
  import { useMenuStore } from "~/stores/menuStore";
  import { useAuthStore } from "~/stores/userAuthStore";
  import { useUserInfoStore } from "~/stores/userInfoStore";
  import { useUserLogInStore } from "~/stores/userLogInStore";
  import { useNavigationLinks } from "~/composables/navigationLinks";

  const menuStore = useMenuStore();
  const authStore = useAuthStore();
  const useStore = useUserLogInStore();
  const useUserInfo = useUserInfoStore();

  let otpInput = ref([]);
  let isDisable = ref(false);
  let isAutoCall = ref(true);
  let otpInputs = ref(["", "", "", ""]);
  let otp = computed(() => otpInputs.value.join(""));

  const {
    Roles,
    commonLinks,
    commonLinksLast,
    candidateLinks,
    recruiterLinks,
    superadminLinks,
  } = useNavigationLinks();

  function handleInput(index, event) {
    let value = event.target.value;

    if (value.length > 1) {
      value = value.slice(-1); // Keep only the last character
    }

    if (value.match(/^[0-9]$/)) {
      otpInputs.value[index] = value;

      if (index < otpInputs.value.length - 1) {
        otpInput.value[index + 1].focus();
      }
    } else {
      event.target.value = "";
    }
  }

  function handleKeydown(index) {
    if (
      event.key === "Backspace" &&
      otpInputs.value[index] === "" &&
      index > 0
    ) {
      otpInput.value[index - 1].focus();
    }
  }

  function handlePaste(event) {
    const paste = event.clipboardData.getData("text");
    const digits = paste.split("").filter((char) => /^[0-9]$/.test(char));

    if (digits.length === otpInputs.value.length) {
      otpInputs.value.forEach((_, index) => {
        otpInputs.value[index] = digits[index];
      });

      otpInput.value[otpInputs.value.length - 1].focus();
      event.preventDefault();
    }
  }
  
  // Function to set the menu links based on the role
  function setMenuLinks(role) {
    menuStore.links = [...commonLinks];

    if (role === Roles.SUPER_ADMIN) {
      menuStore.links.push(...candidateLinks);
      menuStore.links.push(...recruiterLinks);
      menuStore.links.push(...superadminLinks);
      menuStore.links.push(...commonLinksLast);
    } else if (role === Roles.BOTH) {
      menuStore.links.push(...candidateLinks);
      menuStore.links.push(...recruiterLinks);
      menuStore.links.push(...commonLinksLast);
    } else if (role === Roles.CANDIDATE) {
      menuStore.links.push(...candidateLinks);
      menuStore.links.push(...commonLinksLast);
    } else if (
      role === Roles.RECRUITER ||
      role === Roles.RECRUITER_ADMIN2 ||
      role === Roles.RECRUITER_TEACHING
    ) {
      menuStore.links.push(...recruiterLinks);
      menuStore.links.push(...commonLinksLast);
    }
    navigateToProfile(role);
  }

  // Function to handle navigation based on the role
  function navigateToProfile(role) {
    authStore.userRole = role;
    if (role === Roles.CANDIDATE) {
      authStore.isLoggedIn = true;
      navigateTo("/profile");
    } else if (
      role === Roles.BOTH ||
      role === Roles.RECRUITER ||
      role === Roles.SUPER_ADMIN ||
      role === Roles.RECRUITER_ADMIN2 ||
      role === Roles.RECRUITER_TEACHING
    ) {
      authStore.isLoggedIn = true;
      navigateTo("/profile");
    }
  }

  const getProfileInfo = async () => {
    await useUserInfo.getProfileInfo();

    if (useUserInfo.userInfo?.user?.roles) {
      setMenuLinks(useUserInfo.userInfo?.user?.roles);
    }
  };
  async function logIn() {
    isDisable.value = true;
    try {
      const endpoint = "/auth/login-otp-for-email";
      let payload = {
        code: otp.value,
        otp_ref: useStore.otp_ref,
      };

      const { data } = await callAxios(endpoint, payload);

      if (data.data) {
        authStore.loggedInData = data.data;
        getProfileInfo();
      }
    } catch (error) {
      isDisable.value = false;
      isAutoCall.value = true;
    }
  }

  async function resend() {
    // isDisable.value = true;
    const endpoint = "/auth/resend-otp-for-email";
    const payload = {
      otp_ref: useStore.otp_ref,
    };

    const { data } = await callAxios(endpoint, payload);

    if (data?.data) {
      useStore.otp_ref = data.data.uuid;
      useStore.resend_time = data.data.resend_time;
      // useStore.stage = 3;
      alert("OTP Resend success");
    }
    isDisable.value = false;
  }

  watch(
    () => otp.value,
    () => {
      if (otp.value.length === 4) {
        if (isAutoCall.value) {
          logIn();
          isAutoCall.value = false;
        }
      }
    }
  );

  onMounted(() => {
    otpInput.value[0].focus();
  });
</script>

<style scoped>
  /* Custom CSS for even wider browser support */
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    @apply appearance-none;
    margin: 0;
  }

  input[type="number"] {
    @apply appearance-none;
    -moz-appearance: textfield; /* Firefox */
  }
</style>
