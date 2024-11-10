<template>
  <header
    :class="[isNavHidden ? 'translate-y-[-100px]' : 'translate-y-0']"
    class="bg-white fixed left-0 right-0 opacity-100 base-trans border-b z-[999] print:hidden"
  >
    <nav
      class="flex flex-row justify-between bg-white items-center sm:justify-between base-width"
    >
      <div class="flex items-center">
        <NuxtLink
          to="/"
          class="font-bold text-xl 2xl:text-2xl flex items-center sm:h-[70px]"
        >
          <img class="w-16 sm:w-18 rounded-full mr-3" src="../../assets/imgs/logo.png" alt="" />
          <span class="hidden sm:block">এসো কুরআন শিখি</span>
        </NuxtLink>
      </div>

      <div>
        <NavbarMenus
          :class="[
            isMenuHidden
              ? 'translate-x-0 left-14 right-0'
              : 'translate-x-[100%] right-0 sm:translate-x-0',
          ]"
          class="fixed z-20 bg-white shadow-2xl top-0 left-0 base-trans pt-10 sm:relative lg:gap-3 sm:flex 2xl:gap-5 sm:pl-0 sm:pt-0 min-h-screen sm:min-h-full menu-container"
        />
        <div
          :class="[isMenuHidden ? 'translate-x-0' : 'translate-x-[100vw]']"
          class="sm:hidden absolute base-trans right-5 top-5 z-20"
          @click="closeSideMenu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            role="img"
            data-test="mobile-drawer-close"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M6.623 5.278a.95.95 0 1 0-1.345 1.345L10.656 12l-5.378 5.377a.95.95 0 1 0 1.345 1.345L12 13.344l5.377 5.378a.95.95 0 0 0 1.345-1.345L13.344 12l5.378-5.377a.95.95 0 0 0-1.345-1.345L12 10.656 6.623 5.278Z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>

      <div class="flex items-center gap-2 py-5 sm:py-0">
        <!-- <div
          @click="handleIsSearch"
          class="flex items-center gap-2 bg-gray-100 hover:cursor-pointer hover:bg-gray-200 base-trans rounded-full"
          :class="[
            isSearch
              ? 'sm:max-w-0 py-2 px-5 sm:px-0 sm:py-0 sm:overflow-hidden'
              : 'sm:max-w-[150px] py-3 px-5',
          ]"
        >
          <span v-html="getIcons('icon1', 'w-[20px]')"></span>
          <p class="hidden sm:block">Search</p>
        </div>

        <div
          :class="[
            'absolute top-0 right-0 left-0 bottom-0 z-20 sm:relative bg-white flex flex-col pt-20 sm:pt-0 sm:flex-row gap-1 base-trans search min-h-screen sm:min-h-full',
            isSearch
              ? 'min-w-screen p-5 sm:p-0 sm:max-w-[300px]'
              : 'translate-x-[120%] sm:max-w-0 sm:overflow-hidden sm:translate-x-[0%]',
          ]"
        >
          <div
            @click="handleIsSearch"
            class="sm:hidden fixed top-5 right-5 w-fit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="sm:w-[100%]">
            <div class="job-search-input-container rounded-full">
              <div><span v-html="getIcons('search', 'w-[20px]')"></span></div>
            
              <JobSearch
                placeholder="Search your jobs"
                :required="false"
                toggleMenuStyle="border-none"
                class="rounded-full w-full hover:cursor-pointer"
                :options="jobSuggestion"
                @searchItem="(x) => (jobSearch = x)"
                @clickedItem="getFilterJobs"
              />
            </div>
          </div>
        </div> -->

        <div>
          <NuxtLink
            v-if="!isUserOrAdminLoggedIn"
            @click="useStore.stage = 1"
            to="/sign-in"
            class="flex items-center gap-1 text-white py-2 px-5 bg-black hover:bg-gray-700 base-trans rounded"
          >
            <span v-html="getIcons('signIn', 'w-[20px]')"></span>
            <span>Sign In</span>
          </NuxtLink>
          <div v-else>
            <div class="hidden sm:block">
              <Disclosure>
                <template v-slot:disclosureButton>
                  <div class="hover:bg-gray-200 rounded-full base-trans -mb-1">
                    <span
                      v-if="!profilePicture"
                      v-html="getIcons('profile', 'w-[40px]')"
                    ></span>
                    <img
                      v-else
                      :src="profilePicture"
                      alt=""
                      class="w-[40px] rounded-full h-[40px] bg-gray-100"
                    />
                  </div>
                </template>

                <template v-slot:disclosureMenu>
                  <div class="min-w-[300px]">
                    <SidebarSideBarItems :links="menuStore.links" />
                  </div>
                </template>
              </Disclosure>
            </div>

            <div class="sm:hidden">
              <SideMenu>
                <template v-slot:sideMenuButton>
                  <div>
                    <span
                      v-if="!profilePicture"
                      v-html="getIcons('profile', 'w-[30px] -mb-1')"
                    ></span>
                    <img
                      v-else
                      :src="profilePicture"
                      alt=""
                      class="w-[35px] rounded-full h-[40px] bg-gray-100"
                    />
                  </div>
                </template>

                <template v-slot:sideMenu>
                  <SidebarSideBarItems
                    :links="menuStore.links"
                    class="mt-16"
                    customClass="relative px-6 py-3 flex items-center gap-2 font-semibold text-lg base-trans whitespace-nowrap border-b-2"
                  />
                </template>
              </SideMenu>
            </div>
          </div>
        </div>

        <div @click="openSideMenu" class="sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            role="img"
          >
            <g fill="currentColor" fill-rule="evenodd">
              <path
                d="M21 11H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2ZM3 5h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2ZM21 19H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2Z"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
  import axios from "axios";
  import Disclosure from "../Disclosure/Disclosure.vue";
  import SideMenu from "../Disclosure/CustomSideMenu";
  import getIcons from "./navbarIcon";
  // import { useAuthStore } from "~/stores/userAuthStore";
  // import { useUserLogInStore } from "~/stores/userLogInStore";
  // import { useMenuStore } from "~/stores/menuStore";
  // import { useUserInfoStore } from "~/stores/userInfoStore";

  const router = useRouter();
  const useStore = useUserLogInStore();
  const useUserInfo = useUserInfoStore();
  const menuStore = useMenuStore();
  const authStore = useAuthStore();
  const isMenuHidden = ref(false);
  const isNavHidden = ref(false);
  const isMenuOpen = ref(false);
  const isSearch = ref(false);

  let jobSuggestion = ref([]);
  const jobSearch = ref("");

  const isUserOrAdminLoggedIn = computed(() => {
    return authStore.isLoggedIn
  });

  const profilePicture = computed(() => {
    return useUserInfo.userInfo?.user_profile?.profile_picture;
  });

  function handleClickOutside(event) {
    if (isMenuOpen.value) {
      const menu = document.querySelector(".menu-container");
      if (menu && !menu.contains(event.target)) {
        closeSideMenu();
      }
    } else {
      isMenuOpen.value = true;
    }
  }

  function openSideMenu() {
    isMenuHidden.value = true;
    document.addEventListener("click", handleClickOutside);
  }

  function closeSideMenu() {
    isMenuHidden.value = false;
    isMenuOpen.value = false;
    document.removeEventListener("click", handleClickOutside);
  }

  function handleClickOutsideSearch(event) {
    const search = document.querySelector(".search");
    if (isSearch.value) {
      if (search && !search.contains(event.target)) {
        isSearch.value = false;
        document.removeEventListener("click", handleClickOutsideSearch);
      }
    } else {
      isSearch.value = true;
    }
  }

  function handleIsSearch() {
    if (window.innerWidth <= 768) {
      isSearch.value = !isSearch.value;
    } else {
      document.addEventListener("click", handleClickOutsideSearch);
    }
  }

  function navOnScroll() {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos || currentScrollPos <= 50) {
        isNavHidden.value = false;
      } else {
        isNavHidden.value = true;
      }
      prevScrollpos = currentScrollPos;
    };
  }

  const getJobSuggestion = async (search = "") => {
    try {
      const endpoint = `/jobs/job-suggestion?search=${search}`;
      const { data } = await axios.get(endpoint);

      if (data?.data) {
        jobSuggestion.value = data.data;
      } else {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  };


  onMounted(async () => {
    navOnScroll();
    await useUserInfo.getProfileInfo();
  });
</script>

<style scoped>
  @tailwind components;

  @layer components {
    .job-search-input-container {
      @apply flex items-center bg-gray-100 w-full p-3 sm:p-0 sm:pl-2;
    }
    .job-search-input {
      @apply bg-gray-100 text-[16px] pl-1 py-2 w-full focus:outline-none rounded-r-full;
    }
  }
</style>
