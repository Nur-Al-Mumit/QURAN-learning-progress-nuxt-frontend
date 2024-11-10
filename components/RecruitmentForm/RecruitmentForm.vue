<template>
  <section class="w-full overflow-auto">
    <div>
      <div class="flex gap-2 sm:gap-5 flex-col sm:flex-row">
        <div
          v-for="step in useStore.steps"
          :class="[
            'px-2 py-2 sm:py-7 text-sm cursor-pointer base-trans flex items-center gap-2 relative w-full',
            useStore.currentStep === step.id
              ? 'bg-white text-blue-500'
              : 'bg-gray-200 text-gray-700',
          ]"
          @click="useStore.currentStep = step.id"
        >
          <span
            :class="[
              useStore.currentStep === step.id ? 'text-blue-500' : 'text-black',
            ]"
            v-html="getIcons(step.icon, 'w-[32px]')"
          ></span>

          <div>
            <h2 class="font-bold">{{ step.title }}</h2>
            <p>{{ step.description }}</p>
          </div>

          <div class="absolute top-2 right-2">
            <span
              :class="[
                useUserInfo.userInfo?.check_list[step.name]
                  ? 'text-green-500'
                  : 'text-gray-400',
              ]"
              v-html="getIcons('check', 'w-[22px]')"
            ></span>
          </div>
        </div>
      </div>
      <component :is="tabs['Stage' + useStore.currentStep]" />
    </div>
  </section>
</template>

<script setup>
  import { useRecuitFormStore } from "~/stores/recuitFormState";
  import { useUserInfoStore } from "~/stores/userInfoStore";
  import Stage1 from "./Stage1/Stage1.vue";
  import Stage2 from "./Stage2/Stage2.vue";
  import Stage3 from "./Stage3/Stage3.vue";
  import Stage4 from "./Stage4.vue";
  import Stage5 from "./Stage5.vue";
  import getIcons from "./formIcon";

  const useUserInfo = useUserInfoStore();
  const useStore = useRecuitFormStore();
  const tabs = {
    Stage1,
    Stage2,
    Stage3,
    Stage4,
    Stage5,
  };

  onMounted(async () => {
    await useUserInfo.getProfileInfo();
  });
</script>
