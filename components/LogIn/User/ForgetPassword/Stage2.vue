<template>
  <section class="bg-white">
    <div>
      <div class="text-center">
        <h2 class="font-bold text-2xl mb-5">Reset Password</h2>
      </div>

      <div class="mt-10">
        <form class="" @submit.prevent="resetPassword">
          <div>
            <div>
              <label for="password">Password</label>
              <input
                v-model="useStore.forgetInfo.password"
                type="password"
                id="password"
                class="flex items-center gap-10 font-bold border border-gray-400 py-3 px-5 w-full base-trans mb-2 rounded"
              />
            </div>

            <div>
              <label for="confirmPass">Confirm Password</label>
              <input
                v-model="useStore.forgetInfo.password_confirmation"
                type="password"
                id="confirmPass"
                class="flex items-center gap-10 font-bold border border-gray-400 py-3 px-5 w-full base-trans mb-2 rounded"
              />
            </div>

            <div>
              <input
                v-model="useStore.forgetInfo.token"
                type="hidden"
                id="token"
                class="flex items-center gap-10 font-bold border border-gray-400 py-3 px-5 w-full base-trans mb-2 rounded"
              />
            </div>
          </div>
          <div>
            <!-- <NuxtLink to="./recruitment-form"> -->
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
              class="gap-3 font-bold border border-gray-400 py-3 px-5 w-full hover:bg-black hover:text-white base-trans rounded mt-7 flex justify-center items-center"
            >
              <span>Continue</span>
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
            <!-- </NuxtLink> -->
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useUserLogInStore } from "~/stores/userLogInStore";
  import getIcons from "~/composables/icon";

  const useStore = useUserLogInStore();
  let isDisable = ref(false);
  let { query } = useRoute();

  onMounted(() => {
    // console.log(object);
  });

  async function resetPassword() {
    try {
      isDisable.value = true;
      const endpoint = "/auth/reset-password";

      const payload = {
        ...useStore.forgetInfo,
      };

      const { data } = await callAxios(endpoint, payload);
      // console.log(payload);
      useStore.forgetStage = 1;

      if (data.data) {
        navigateTo("/sign-in");
      }
    } catch (error) {
      isDisable.value = false;
    }
  }

  onMounted(() => {
    if (query?.token?.length) {
      let { token, email } = query;
      useStore.forgetInfo.token = token;
      useStore.forgetInfo.email = email;
    }
  });
</script>
