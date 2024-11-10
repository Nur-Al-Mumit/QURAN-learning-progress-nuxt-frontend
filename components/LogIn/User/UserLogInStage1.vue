<template>
  <section>
    <div>
      <div class="text-center">
        <h2 class="font-bold text-2xl mb-5">
          Create a account or sign in to get started
        </h2>
        <p class="text-gray-600 text-sm">
          Create an account or sign in. By continuing, you agree to our
          <a
            href=""
            target="_blank"
            class="text-gray-900 hover:text-black base-tran underline"
          >
            Terms of Use
          </a>
          and
          <a
            href=""
            target="_blank"
            class="text-gray-900 hover:text-black base-tran underline"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>

      <div>
        <!-- <div class="mt-10">
          <div class="center">
            <div class="relative">
              <button
                type="button"
                class="flex items-center gap-3 sm:gap-10 font-bold border border-gray-400 py-3 px-3 sm:px-5 w-full hover:bg-gray-200 base-trans rounded text-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 46 46"
                  width="20"
                  height="20"
                  class="absolute"
                >
                  <path
                    d="M23 8.9a12.75 12.75 0 0 1 8.9 3.4L38.37 6A22.1 22.1 0 0 0 23 0 23 23 0 0 0 2.45 12.68l7.44 5.78A13.9 13.9 0 0 1 23 8.9z"
                    fill="#ea4335"
                  ></path>
                  <path
                    d="M45.08 23.5a19.7 19.7 0 0 0-.5-4.7H23v8.55h12.68A11.24 11.24 0 0 1 31 34.8l7.26 5.63c4.34-4 6.85-9.92 6.85-16.92z"
                    fill="#4285f4"
                  ></path>
                  <path
                    d="M9.92 27.55A14.16 14.16 0 0 1 9.15 23a14.88 14.88 0 0 1 .74-4.55l-7.45-5.77a23 23 0 0 0 0 20.65l7.46-5.78z"
                    fill="#fbbc05"
                  ></path>
                  <path
                    d="M23 46a21.92 21.92 0 0 0 15.23-5.57L31 34.8a13.6 13.6 0 0 1-8 2.3 13.85 13.85 0 0 1-13.08-9.55l-7.44 5.77A22.94 22.94 0 0 0 23 46z"
                    fill="#34a853"
                  ></path>
                  <path d="M0 0h46v46H0V0z" fill="none"></path>
                </svg>
                <span class="mx-auto">Continue with Google</span>
              </button>
            </div>
            <div class="mt-2 relative">
              <button
                type="button"
                class="flex items-center gap-3 sm:gap-10 font-bold border border-gray-400 py-3 px-3 sm:px-5 w-full hover:bg-gray-200 base-trans rounded"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="absolute"
                >
                  <path
                    d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12Z"
                    fill="#1877F2"
                  ></path>
                </svg>
                <span class="mx-auto">Continue with Facebook</span>
              </button>
            </div>
          </div>
        </div> -->

        <!-- <div class="flex items-center mt-3">
          <div class="border w-full"></div>
          <div class="mx-2">or</div>
          <div class="border w-full"></div>
        </div> -->

        <form class="" @submit.prevent="logInWithEmailPass">
          <div class="mt-10">
            <InputsBaseInput
              label="Enter Email"
              type="email"
              :required="true"
              v-model="userData.email"
            />
            <InputsBaseInput
              :is-password-show="true"
              label="Password"
              :type="'password'"
              :required="true"
              v-model="userData.password"
            />
          </div>
          <div>
            <button
              type="submit"
              :disabled="isDisable"
              class="gap-10 font-bold border border-gray-400 py-3 px-5 w-full hover:bg-gray-700 hover:text-white base-trans rounded mt-3 flex justify-center text-black"
            >
              <span class="relative">
                Continue with Email
                <span
                  v-if="isEmailLogin"
                  class="absolute ml-2"
                  v-html="
                    getIcons(
                      'sppiner',
                      `w-[20px] transition-transform duration-300`
                    )
                  "
                ></span>
              </span>
            </button>
          </div>

          <div class="text-center mt-2.5">
            <NuxtLink
              class="text-center text-[17px] border-b-2 text-gray-700 base-trans hover:text-black border-gray-400 hover:border-black"
              to="/forget-password"
            >
              <span class="">Forgot Password?</span>
            </NuxtLink>
          </div>
        </form>

        <form action="" @submit.prevent="nextStage">
          <div class="flex items-center justify-center mt-10 mb-3">
            <div class="border w-[20%]"></div>
            <div class="mx-2 text-gray-700">New user?</div>
            <div class="border w-[20%]"></div>
          </div>

          <button
            type="submit"
            :disabled="isDisable"
            class="gap-10 font-bold border border-gray-400 py-3 px-5 w-full hover:bg-black hover:text-white base-trans rounded flex justify-center"
          >
            <span>Sign Up</span>
            <span
              v-if="isSingUp"
              v-html="
                getIcons(
                  'sppiner',
                  `w-[20px] transition-transform duration-300`
                )
              "
            ></span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useAuthStore } from "~/stores/userAuthStore";
  import { useMenuStore } from "~/stores/menuStore";
  import { useUserInfoStore } from "~/stores/userInfoStore";
  import { useUserLogInStore } from "~/stores/userLogInStore";
  import { useNavigationLinks } from "~/composables/navigationLinks";
  import getIcons from "~/composables/icon";

  const useUserInfo = useUserInfoStore();
  const menuStore = useMenuStore();
  const authStore = useAuthStore();
  const useStore = useUserLogInStore();

  let isEmailLogin = ref(false);
  let isSingUp = ref(false);
  let isDisable = ref(false);
  let userData = ref({
    email: "",
    password: "",
  });

  const {
    Roles,
    commonLinks,
    commonLinksLast,
    candidateLinks,
    recruiterLinks,
    superadminLinks,
  } = useNavigationLinks();

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

  async function logInWithEmailPass() {
    try {
      isDisable.value = true;
      isEmailLogin.value = true;

      const endpoint = "/auth/login-email-password";
      const payload = { ...userData.value };

      const { data, error } = await callAxios(endpoint, payload);

      if (data?.data) {
        isEmailLogin.value = false;
        authStore.loggedInData = data.data;
        await getProfileInfo();
      } else {
        console.log(error);
        isEmailLogin.value = false;
      }
    } catch (err) {
      console.log(err);
      isEmailLogin.value = false;
    } finally {
      isDisable.value = false;
      isEmailLogin.value = false;
    }
  }

  const nextStage = () => {
    isDisable.value = true;
    useStore.stage = 2;
  };

  async function forgetPassword() {
    try {
      // isDisable.value = true;

      const endpoint = "/auth/forget-password";
      const payload = { ...userData.value };

      const { data, error } = await callAxios(endpoint, payload);

      if (data?.data) {
        // navigateTo("../../../user/profile");

        console.log(data);
      } else {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    } finally {
      isDisable.value = false;
    }
  }
</script>
