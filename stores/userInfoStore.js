import axios from 'axios';
import { defineStore } from 'pinia';
import { useAuthStore } from '~/stores/userAuthStore';

export const useUserInfoStore = defineStore('UserInfoStores', () => {
  let error = ref(null);
  let loading = ref(false);
  let userInfo = ref(null);
  let isUpdate = ref(false);

  const getProfileInfo = async () => {
    // if (userInfo.value || isUpdate) {
    //   userInfo.value = userInfo.value
    //   return
    // }
    loading.value = true;
    try {
      const { loggedInData: { token_type, access_token } } = useAuthStore();

      const config = {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      };

      const endpoint = '/user/profile-information';
      const { data } = await axios.get(endpoint, config);
      userInfo.value = data.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    getProfileInfo,
    userInfo: computed(() => userInfo.value),   // Access non-reactive value
    loading: computed(() => loading.value),     // Access non-reactive value
    isUpdate: computed(() => isUpdate.value),   // Access non-reactive value
    error: computed(() => error.value),         // Access non-reactive value
  };
}, {
  persist: {
    storage: piniaPluginPersistedstate.cookies(),
  }
});
