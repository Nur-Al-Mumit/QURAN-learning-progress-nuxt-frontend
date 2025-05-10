<template>
  <section class="bg-white">
    <div class="relative">
      <div class="text-center">
        <h2 class="font-bold text-2xl mb-5">
          Create a account or sign in to get started
        </h2>
        <p class="text-gray-600 text-sm">Create an account or sign in</p>

        <!-- <div class="absolute -top-7 -left-7">
          <svg
            class="w-10"
            fill="#000000"
            viewBox="0 0 32 32"
            data-name="Layer 2"
            id="Layer_2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <title></title>
              <path
                d="M11.17,10.23a33.37,33.37,0,0,0-3.05,3.13c-.51.62-1.28,1.3-1.21,2.17s.81,1.24,1.35,1.76a16.3,16.3,0,0,1,2.57,3.17c.86,1.36,3,.11,2.16-1.26a21.06,21.06,0,0,0-1.82-2.48A16.16,16.16,0,0,0,10,15.52c-.22-.21-.86-1.14-.68-.49l-.13,1a17.85,17.85,0,0,1,3.72-4c1.19-1.08-.58-2.85-1.77-1.76Z"
              ></path>
              <path
                d="M9.4,17a109.13,109.13,0,0,0,12.53-.1c1.59-.11,1.61-2.61,0-2.5a109.13,109.13,0,0,1-12.53.1c-1.61-.07-1.6,2.43,0,2.5Z"
              ></path>
            </g>
          </svg>
        </div> -->
      </div>

      <div class="mt-10">
        <form class="" @submit.prevent="getOtp">
          <div class="space-y-3">
            <InputsBaseInput
              :required="true"
              type="name"
              label="Name"
              v-model="studentAuthStore.signUp.name"
              input-class="font-bold border-gray-400 py-3 px-5 rounded-sm!"
            />
            <InputsBaseInput
              :required="true"
              type="email"
              label="Enter Email"
              v-model="studentAuthStore.signUp.email"
              input-class="font-bold border-gray-400 py-3 px-5 rounded-sm!"
            />
            <InputsBaseInput
              :required="true"
              :is-password-show="true"
              type="password"
              label="Password"
              v-model="studentAuthStore.signUp.password"
              input-class="font-bold border-gray-400 py-3 px-5 rounded-sm!"
            />
            <InputsBaseInput
              :required="true"
              :is-password-show="true"
              type="password"
              label="Confirm Password"
              v-model="studentAuthStore.signUp.password_confirmation"
              input-class="font-bold border-gray-400 py-3 px-5 rounded-sm! "
            />
          </div>
          <div>
            <div class="mt-5">
              <p>
                By continuing, you agree to our
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
            <!-- @click="nextStage" -->
            <button
              type="submit"
              :disabled="isDisable"
              class="gap-10 font-bold border border-gray-400 py-3 px-5 w-full hover:bg-black hover:text-white base-trans rounded-sm mt-7 flex justify-center"
            >
              <div class="relative">
                Continue
                <span
                  class="absolute ml-2"
                  v-if="isDisable"
                  v-html="
                    getIcons(
                      'sppiner',
                      `w-[20px] transition-transform duration-300`
                    )
                  "
                ></span>
              </div>
            </button>
            <!-- </NuxtLink> -->
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useStudentAuthStore } from "~/stores/studentAuth";
  import getIcons from "~/composables/icon";

  const studentAuthStore = useStudentAuthStore();
  let isDisable = ref(false);

  async function getOtp() {
    studentAuthStore.signUpStage = 2;
    console.log(studentAuthStore.signUpStage);
    return;
    try {
      isDisable.value = true;
      const endpoint = "auth/send-otp-for-email";
      const payload = {
        ...useStore.loginInfo,
      };

      const { data } = await callAxios(endpoint, payload);

      if (data.data) {
        useStore.otp_ref = data.data.uuid;
        useStore.resend_time = data.data.resend_time;
        useStore.stage = 3;
      }
      isDisable.value = false;
    } catch (error) {
      isDisable.value = false;
    }
  }
</script>
