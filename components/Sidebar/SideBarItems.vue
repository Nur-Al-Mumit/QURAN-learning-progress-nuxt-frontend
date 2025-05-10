<template>
  <section>
    <div v-for="(link, key) in links" :key="key">
      <!-- v-if="!link.items" -->
      <NuxtLink
        v-if="link.link"
        :to="link.link"
        :class="[
          customClass
            ? customClass
            : 'link relative pr-6 pl-4 mb-[3px] sm:py-2 flex items-center gap-2 base-menu font-semibold text-lg base-trans whitespace-nowrap',
        ]"
      >
        <span v-html="getIcons(link.icon, 'w-6')"></span>
        <h2>{{ link.title }}</h2>
      </NuxtLink>
      <button
        v-else
        @click="logOut"
        :class="[
          customClass
            ? customClass
            : 'link relative pr-6 pl-4 mb-[3px] sm:py-2 flex items-center gap-2 base-menu font-semibold text-lg base-trans whitespace-nowrap',
        ]"
      >
        <span v-html="getIcons(link.icon, 'w-6')"></span>
        <h2>{{ link.title }}</h2>
      </button>
    </div>
  </section>
</template>

<script setup>
  import getIcons from "./SidebarIcon";
  // import { useAuthStore } from "~/stores/userAuthStore";
  import { useSideBarStore } from "~/stores/sideBarStore";

  const sideBarStore = useSideBarStore();

  const props = defineProps({
    links: {
      type: Array,
      required: true,
    },
    customClass: {
      type: String,
      // default: "",
    },
  });

  // const authStore = useAuthStore();
  const selectedMenu = ref("");
  const selectedSubMenu = ref(null);

  function activeStyle(item, index) {
    selectedMenu.value = item.title;
    selectedSubMenu.value = index;
  }

  const logOut = async () => {
    try {
      const endpoint = "/user/logout";

      const { data, error } = await callAuthnAxios(endpoint);

      if (data?.data) {
        // authStore.isLoggedIn = false;
        document.cookie.split(";").forEach((cookie) => {
          const [name] = cookie.split("=");
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });
        navigateTo("/");
      } else {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  };
</script>

<style scoped>
  /* router-link-active router-link-exact-active */

  .link::after {
    content: "";
    display: block;
    position: absolute;
    width: 4px;
    height: 0%;
    left: 0.5%;
    background: #c8c8c8;
    transition: transform 0.2s, height 0.2s;
  }

  .router-link-active::after {
    content: "";
    display: block;
    position: absolute;
    width: 4px;
    height: 100%;
    left: 0.5%;
    background: #2d75c8;
    transition: transform 0.2s, height 0.2s;
  }

  .link:hover::after {
    height: 100%;
    transition: transform 0.2s, height 0.2s;
  }

  .router-link-active {
    color: #2d75c8;
    background-color: #f1f2f4;
  }

  @media (max-width: 640px) {
    .link::after {
      width: 100%;
      height: 4px;
      bottom: -10%;
    }
    .link:hover::after {
      height: 4px;
      transition: transform 0.2s, height 0.2s;
    }
    .router-link-active::after {
      bottom: -10%;
      background: #2d75c8;
      height: 4px;
      width: 100%;
      transition: transform 0.2s, width 0.2s;
    }
  }
</style>
