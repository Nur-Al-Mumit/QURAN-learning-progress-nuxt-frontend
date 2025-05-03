<template>
  <section>
    <div>
      <div class="text-center">
        <h2 class="font-bold text-2xl mb-5">
          Create a account or sign in to get started
        </h2>
        <p class="text-gray-600 text-sm">
          Create an account or sign in. By continuing, you agree to our
          <a href="" target="_blank" class="text-black underline">
            Terms of Use
          </a>
          and
          <a href="" target="_blank" class="text-black underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>

      <div>
        <div class="mt-10">
          <div class="center">
            <div class="relative">
              <button
                type="button"
                class="flex items-center gap-3 sm:gap-10 font-bold border border-gray-400 py-3 px-3 sm:px-5 w-full hover:bg-gray-200 base-trans rounded-sm text-center"
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
                class="flex items-center gap-3 sm:gap-10 font-bold border border-gray-400 py-3 px-3 sm:px-5 w-full hover:bg-gray-200 base-trans rounded-sm"
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
        </div>

        <div class="flex items-center mt-3">
          <div class="border w-full"></div>
          <div class="mx-2">or</div>
          <div class="border w-full"></div>
        </div>

        <form class="" @submit.prevent="nextStage">
          <div>
            <div>
              <label for="email">Enter Email</label>
              <div data-ui-disabled="false">
                <input
                  v-model="useStore.loginInfo.email"
                  required
                  type="email"
                  inputmode="text"
                  id="email"
                  class="flex items-center gap-10 font-bold border border-gray-400 py-3 px-5 w-full base-trans mb-2 rounded-sm"
                />
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              :disabled="isDisable"
              class="gap-10 font-bold border border-gray-400 py-3 px-5 w-full hover:bg-black hover:text-white base-trans rounded-sm"
            >
              <span>Continue with Email</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useUserLogInStore } from "~/stores/userLogInStore";
  const useStore = useUserLogInStore();
  let isDisable = ref(false);
  const nextStage = () => {
    // isDisable.value = true;
    useStore.stage++;
  };
</script>
