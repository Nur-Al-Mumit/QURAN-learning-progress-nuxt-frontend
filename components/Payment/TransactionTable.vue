<template>
  <section
    class="bg-white min-h-screen dark:bg-dark-2 base-trans relative sm:w-[calc(100vw-350px)] group px-5 pt-5 shadow-md"
  >
    <search @update="searchForTransactions" placeholder="Mobile, TrxID" />

    <section class="overflow-auto base-vertica-scrollbar scrollbar-h-2">
      <table class="relative w-full mr-5 text-center h-fit">
        <thead>
          <tr
            class="sticky top-0 z-20 bg-white text-gray-1 base-trans dark:bg-dark-1 dark:text-dark-text-1"
          >
            <th
              v-for="(head, key) in tableHead"
              :key="key"
              class="px-4 py-3 border-b border-gray-300 whitespace-nowrap dark:border-dark-border"
              v-html="head"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="transactions.length !== 0"
            v-for="(transaction, key) in transactions"
            :key="key"
            class="border-b border-gray-300 hover:bg-gray-100 hover:border-gray-100 base-trans dark:border-dark-border dark:hover:bg-[#394056] dark:text-dark-text-1"
          >
            <td class="base-td min-w-[150px] whitespace-nowrap font-bold">
              {{ transaction?.bank_trx_id }}
              <br />
              {{ transaction?.bank_method }}
              <br />
              {{ transaction?.user.mobile }}
            </td>
            <td class="font-bold base-td">
              <span class="text-red-500">
                {{ unitMapping[transaction?.unit] }}
              </span>
              <br />
              {{ transaction?.trx_order_id }}
              <br />
              {{ Math.abs(transaction?.amount) }} BDT
            </td>
            <td class="font-bold base-td">
              {{ transaction?.user.name }}
              <br />
              {{ transaction?.user.fname }}
              <br />
              {{ transaction?.user.mname }}
            </td>
            <td class="font-bold base-td">
              {{ transaction?.created_at_formatted }}
            </td>
          </tr>
          <tr
            v-if="transactions.length === 0 && isShowAnimatedPlaceHolder"
            v-for="x in 3"
            :key="x"
          >
            <td class="space-y-1 p-2" v-for="x in 4" :key="x">
              <AnimatedPlaceholders />
              <AnimatedPlaceholders />
              <AnimatedPlaceholders />
            </td>
          </tr>
        </tbody>
      </table>
      <h2 v-if="transactions.length === 0" class="text-center bg-gray-200">
        No Data Found
      </h2>
    </section>
    <div class="flex justify-center py-5 sm:justify-end">
      <Pagination
        :total-pages="transactionsInfo.last_page"
        @current-page="setCurrentPage"
      ></Pagination>
    </div>
  </section>
</template>

<script setup>
  // import getTableIcons from "./tableIcon";

  const transactions = ref([]);
  const transactionsInfo = ref([]);
  const ifLoaded = ref(false);
  const isLoadingPagination = ref(false);
  const isShowAnimatedPlaceHolder = ref(false);
  const currentPage = ref(1);
  const searchInputVal = ref("");

  const tableHead = [
    "Trx ID <br> Method <br> Mobile",
    "Unit <br> surjoPay ID  <br/> Amount",
    "Name <br> Father <br/> Mother",
    "Time",
  ];
  const unitMapping = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    7: "IBA-JU",
    9: "C1",
  };

  function setCurrentPage(page) {
    currentPage.value = page;
    getTransactions();
  }

  function searchForTransactions(inputVal) {
    searchInputVal.value = inputVal;
    // if (inputVal === "") return;
    getTransactions();
  }

  async function getTransactions() {
    isShowAnimatedPlaceHolder.value = true;
    isLoadingPagination.value = true;
    transactions.value = [];
    const endpoint = `admin/transaction-list`;

    const payload = {
      // search: "BAE55814WZ",
      search: searchInputVal.value,
    };

    const { data, errorInfo } = await callAuthnAdmin(endpoint, payload);

    if (data.data !== null) {
      transactions.value = data.data.transactions.data;
      transactionsInfo.value = data.data.transactions;
      ifLoaded.value = true;
      isLoadingPagination.value = false;
      isShowAnimatedPlaceHolder.value = false;
    } else if (errorInfo) {
      isShowAnimatedPlaceHolder.value = false;
      isLoadingPagination.value = false;
    }
    isShowAnimatedPlaceHolder.value = false;
    isLoadingPagination.value = false;
  }

  onMounted(() => {
    getTransactions();
  });
</script>

<style scoped>
  @tailwind components;
  @layer components {
    .action-menu {
      @apply absolute shadow-2xl bg-white mt-1 transition-all min-w-fit right-0 duration-300 rounded-md dark:bg-[#2b2d33] whitespace-nowrap py-1;
    }
    .li {
      @apply flex items-center justify-start gap-2 p-2 cursor-pointer transition-all duration-300 hover:bg-blue-50 mb-2  dark:hover:bg-[#393f52];
    }
  }
</style>
