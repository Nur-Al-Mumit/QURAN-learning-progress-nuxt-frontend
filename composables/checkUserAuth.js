import { useAuthStore } from "~/stores/userAuthStore";

export const useCheckUserAuth = () => {
  const authStore = useAuthStore();
  const isAuthenticated = computed(() => authStore.isLoggedIn);
  const userRole = computed(() => authStore.userRole);


  return { isAuthenticated, userRole }
}
