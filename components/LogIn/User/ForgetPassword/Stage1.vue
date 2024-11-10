<template>
  <section v-if="isLoaded">
    <div class="text-center">
      <h2 class="font-bold text-lg sm:text-2xl mb-5">Reset your password</h2>
      <p class="text-gray-600 text-sm">
        Enter the email address associated with your account and we'll send you
        a link to reset your password.
      </p>
    </div>
    <div>
      <form class="" @submit.prevent="forgetPassword">
        <div class="mt-10">
          <div>
            <label for="email">Enter Email</label>
            <div>
              <input
                v-model="forgetInfo.email"
                required
                type="email"
                id="email"
                class="flex items-center gap-10 font-bold border border-gray-400 py-3 px-5 w-full base-trans mb-2 rounded"
              />
            </div>
          </div>
        </div>
        <div class="flex gap-2 sm:gap-3 text-center mt-5">
          <button
            type="submit"
            :disabled="isDisable"
            class="gap-3 font-bold border border-gray-400 py-3 sm:px-5 w-full bg-black hover:bg-gray-700 text-white base-trans rounded mt-3 flex justify-center items-center"
          >
            <span>Reset Password</span>
            <span
              v-if="isDisable"
              v-html="
                getIcons(
                  'sppiner',
                  `w-[25px] transition-transform duration-300`
                )
              "
            ></span>
          </button>
          <button
            @click="navigateTo('../../../../sign-in/')"
            type="button"
            class="gap-10 font-bold border border-gray-400 py-3 sm:px-5 w-full hover:bg-black hover:text-white base-trans rounded mt-3"
          >
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>

    <div></div>
    <ModalsBaseModal :is-modal="isModal">
      <template #body>
        <h1 class="text-xl font-bold text-center mb-10">
          Instructions to reset your password will be sent to you shortly.
          Please check your email.
        </h1>
      </template>
      <template #footer>
        <div class="flex justify-center gap-3">
          <button
            @click="navigateTo('../../../../sign-in/')"
            type="button"
            class="font-bold border border-gray-400 py-3 px-5 w-fit hover:bg-black hover:text-white base-trans rounded"
          >
            <span>Sign In</span>
          </button>
          <button
            @click="openGmail"
            class="font-bold border border-gray-400 py-3 px-5 w-fit hover:bg-black hover:text-white base-trans rounded"
          >
            Open Gmail
          </button>
        </div>
      </template>
    </ModalsBaseModal>
  </section>
</template>
<script setup>
  import { useUserLogInStore } from "~/stores/userLogInStore";
  import getIcons from "~/composables/icon";

  const useStore = useUserLogInStore();

  let { query } = useRoute();
  let isLoaded = ref(false);
  let isDisable = ref(false);
  let isModal = ref(false);
  let forgetInfo = ref(useStore.forgetInfo);

  async function forgetPassword() {
    try {
      isDisable.value = true;

      const endpoint = "/auth/forget-password";
      const payload = { email: forgetInfo.value.email };
      const { data, error } = await callAxios(endpoint, payload);

      if (data?.data) {
        isDisable.value = true;
        isModal.value = true;
        // useStore.forgetStage = 2;
      } else {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    } finally {
      isDisable.value = false;
    }
  }

  const openGmail = () => {
    const gmailIntent = "intent://mail.google.com/mail/u/0/#Intent";
    const gmailWeb = "https://mail.google.com/";

    // Check if the device is an Android device
    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isAndroid) {
      // Try to open the Gmail app
      window.location.href = gmailIntent;

      // Fallback to Gmail web if the app doesn't open
      setTimeout(() => {
        window.location.href = gmailWeb;
      }, 500);
    } else {
      // Directly open Gmail in the web browser for non-Android devices
      window.location.href = gmailWeb;
    }
  };
  onMounted(() => {
    if (query?.token?.length) {
      isLoaded.value = true;
      useStore.forgetStage = 2;
    } else {
      isLoaded.value = true;
    }
  });
</script>
