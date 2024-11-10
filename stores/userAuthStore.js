import { defineStore } from "pinia";

export const useAuthStore = defineStore('userAuth', () => {
    const userRole = ref(null);
    const loggedInData = ref(null);
    const isLoggedIn = ref(false);
    return { loggedInData, isLoggedIn, userRole }
}, {
    persist: {
        // storage: persistedState.cookies,
        storage: piniaPluginPersistedstate.cookies(),
    }
})