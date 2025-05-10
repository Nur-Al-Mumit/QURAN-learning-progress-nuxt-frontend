<template>
  <footer
    class="py-12"
    :class="[
      baseColor === 'emerald' ? 'bg-emerald-900' : 'bg-indigo-900',
      'text-white',
    ]"
  >
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">{{ mainInfo.title }}</h3>
          <p
            class="mb-4"
            :class="[
              baseColor === 'emerald' ? 'text-emerald-200' : 'text-indigo-200',
            ]"
          >
            {{ mainInfo.description }}
          </p>
          <div class="flex gap-4">
            <a
              v-for="(social, index) in socialLinks"
              :key="index"
              :href="social.url"
              class="text-white transition duration-300"
              :class="[
                baseColor === 'emerald'
                  ? 'hover:text-emerald-200'
                  : 'hover:text-indigo-200',
              ]"
              aria-label="social media"
            >
              <div v-html="social.icon"></div>
            </a>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-bold mb-4">{{ quickLinksTitle }}</h3>
          <ul class="space-y-2">
            <li v-for="(link, index) in quickLinks" :key="link.id">
              <a
                :href="link.url"
                class="transition duration-300"
                :class="[
                  baseColor === 'emerald'
                    ? 'text-emerald-200 hover:text-white'
                    : 'text-indigo-200 hover:text-white',
                ]"
              >
                {{ link.title }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-bold mb-4">{{ contactTitle }}</h3>
          <ul class="space-y-2">
            <li
              v-for="(contact, index) in contactInfo"
              :key="index"
              class="flex items-start"
            >
              <div
                v-html="contact.icon"
                class="h-6 w-6 mr-2"
                :class="[
                  baseColor === 'emerald'
                    ? 'text-emerald-200'
                    : 'text-indigo-200',
                ]"
              ></div>
              <span
                :class="[
                  baseColor === 'emerald'
                    ? 'text-emerald-200'
                    : 'text-indigo-200',
                ]"
              >
                {{ contact.text }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="border-t mt-8 pt-8 text-center"
        :class="[
          baseColor === 'emerald' ? 'border-emerald-700' : 'border-indigo-700',
        ]"
      >
        <p
          :class="[
            baseColor === 'emerald' ? 'text-emerald-200' : 'text-indigo-200',
          ]"
        >
          {{ copyright }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
  import { ref } from "vue";

  const baseColor = ref("emerald");

  // Main info section
  const mainInfo = ref({
    title: "এসো কুরআন শিখি",
    description:
      "Dedicated to the study and understanding of the Holy Quran through weekly guided sessions.",
  });

  // Social media links
  const socialLinks = ref([
    {
      url: "#",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>`,
    },
    {
      url: "#",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
        </svg>`,
    },
    {
      url: "#",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>`,
    },
  ]);

  // Quick links section
  const quickLinksTitle = ref("Quick Links");
  const quickLinks = ref([
    { id: 1, title: "Home", url: "#" },
    { id: 2, title: "About Us", url: "#" },
    { id: 3, title: "Classes", url: "#" },
    { id: 4, title: "Resources", url: "#" },
    { id: 5, title: "Contact", url: "#" },
  ]);

  // Contact section
  const contactTitle = ref("Contact Us");
  const contactInfo = ref([
    {
      text: "+1 (555) 123-4567",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>`,
    },
    {
      text: "Online via Zoom",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>`,
    },
  ]);

  // Dynamic copyright year
  const currentYear = new Date().getFullYear();
  const copyright = ref(
    `© ${currentYear} এসো কুরআন শিখি. All rights reserved.`
  );
</script>
