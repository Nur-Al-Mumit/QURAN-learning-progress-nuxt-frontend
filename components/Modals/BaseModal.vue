<template>
  <section
    class="fixed left-0 right-0 bottom-0 top-0 flex justify-center items-center bg-[#27272798] base-trans"
    :class="[
      isModalOpen ? 'opacity-100 z-[999999]' : 'opacity-0 -z-[999999]',
    ]"
    @click="handleOutsideClick"
  >
    <div
      ref="modal"
      class="bg-white p-5 rounded-lg"
      :class="[customSize ? customSize : 'w-[95vw] sm:w-[50vw] lg:w-[25vw]']"
    >
      <slot name="body" />
      <slot name="footer" />
    </div>
  </section>
</template>

<script setup>
  const props = defineProps({
    isModal: {
      type: Boolean,
      required: true,
    },
    getUpdatedValue: {
      type: String,
      default: "updatedValue",
    },
    customSize: {
      type: String,
    },
  });
  const emit = defineEmits();
  const isModalOpen = ref(props.isModal);
  const modal = ref(null);

  watch(
    () => props.isModal,
    (value) => {
      isModalOpen.value = value;
    }
  );

  function closeModal() {
    isModalOpen.value = false;
    emit(`${props.getUpdatedValue}`, isModalOpen.value);
  }

  function handleOutsideClick(event) {
    if (modal.value && !modal.value.contains(event.target)) {
      closeModal();
    }
  }
</script>
