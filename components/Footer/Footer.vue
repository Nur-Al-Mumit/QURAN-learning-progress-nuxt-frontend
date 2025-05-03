<template>
  <footer class="sm:py-3 print:hidden">
    <section class="base-width flex justify-center">
      <div
        class="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-10 items-start px-5 sm:px-0"
      >
        <div
          class="col-span-2 text-center border-y sm:border-y-0 sm:text-left sm:col-span-1 py-5 sm:py-0 -mx-5 sm:mx-0"
        >
          <h1 class="font-bold text-xl">এসো কুরআন শিখি</h1>
          <p>Sylhet, Bangladesh</p>
        </div>

        <div class="">
          <h1 class="font-bold">এসো কুরআন শিখি</h1>
          <NuxtLink
            v-for="(link, key) in links"
            :key="key"
            :to="link.url"
            class="block w-fit hover:text-green-500 hover:underline base-trans cursor-pointer"
          >
            {{ link.title }}
          </NuxtLink>
        </div>

        <div class="">
          <h1 class="font-bold">Information</h1>
          <NuxtLink
            v-for="(link, key) in informations"
            :key="key"
            :to="link.url"
            class="block w-fit hover:text-green-500 hover:underline base-trans cursor-pointer"
          >
            {{ link.title }}
          </NuxtLink>
        </div>

        <div class="">
          <h1 class="font-bold">Join With Us</h1>
          <NuxtLink
            v-for="(link, key) in workWithUs"
            :key="key"
            :to="link.url"
            class="block w-fit hover:text-green-500 hover:underline base-trans cursor-pointer"
          >
            {{ link.title }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="flex justify-center mt-5">
      <div
        class="Utility__Utility-module__iconListContainer"
        data-test="footer-social-links"
      >
        <div class="flex gap-2">
          <a href="">
            <span v-html="getIcons('x', 'w-10')"></span>
          </a>
          <a href="">
            <span v-html="getIcons('facebook', 'w-10')"></span>
          </a>
          <a href="">
            <span v-html="getIcons('youtube', 'w-10')"></span>
          </a>
        </div>
      </div>
    </section>

    <section class="border-t border-black text-center py-5 mt-5">
      <h4>© এসো কুরআন শিখি, ২০২৫</h4>
    </section>
  </footer>
</template>

<script setup>
  import getIcons from "./footerIcon";
  const links = [
    { title: "About", url: "" },
    { title: "Ostad", url: "" },
  ];

  const informations = [
    { title: "Help / Contact Us", url: "" },
    { title: "Guidelines", url: "" },
  ];

  const workWithUs = [
    { title: "Join Live Session", url: "" },
    { title: "Send a Recording", url: "" },
  ];
</script>
