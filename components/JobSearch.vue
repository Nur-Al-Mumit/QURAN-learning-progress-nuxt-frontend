<template>
  <div ref="selectWrapper" class="">
    <div class="relative group">
      <input
        @click="toggleMenu"
        v-model="search"
        type="text"
        placeholder="Search..."
        class="w-full p-2 rounded-full outline-hidden bg-transparent"
      />
      <div
        v-if="isOpen && filteredItems.length"
        :class="[
          'absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-lg p-1 flex flex-col',
          isStartTop ? 'top-[40px]' : 'bottom-[50px]  flex-col-reverse',
        ]"
      >
        <ul class="max-h-60 overflow-y-auto">
          <li
            v-for="item in filteredItems"
            :key="item"
            @click="selectItem(item)"
            class="p-2 hover:bg-gray-200 cursor-pointer"
          >
            {{ item.name }}
          </li>
          <li class="p-2 hover:bg-gray-200 cursor-pointer">
            See all result
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    options: {
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: "Select an Option",
    },
    modelValue: {
      type: [String, Number, Object],
      default: "",
    },
    selectedOption: {
      type: [String, Number, Object],
      default: "",
    },
    toggleMenuStyle: {
      type: [String],
      default: "",
    },
  });

  const emit = defineEmits(["update:modelValue", "searchItem", "clickedItem"]);

  let isStartTop = ref(false);
  let isOpen = ref(false);
  let search = ref("");
  let selectWrapper = ref(null);

  const toggleMenu = (event) => {
    if (filteredItems.value.length) {
      isOpen.value = true;
    } else {
      isOpen.value = true;
    }

    isStartTop.value = event.pageY >= 1000 ? false : true;
    document.addEventListener("mousedown", handleClickOutside);
  };

  const selectItem = (item) => {
    isOpen.value = false;
    search.value = item.name ?? "";
    emit("update:modelValue", item.id);
    emit("clickedItem", item);
  };

  const filteredItems = computed(() => {
    emit("searchItem", search.value);
    return props.options.filter((item) =>
      item.name.toLowerCase().includes(search.value.toLowerCase())
    );
  });

  const handleClickOutside = (event) => {
    if (selectWrapper.value && !selectWrapper.value.contains(event.target)) {
      isOpen.value = false;
    }
  };

  watch(
    () => props.selectedOption,
    () => {
      selectItem(props?.selectedOption);
    },
    { immediate: true }
  );
</script>
