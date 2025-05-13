<template>
  <section class="sm:w-[300px] bg-white shadow-sm sm:min-h-[80vh] sticky top-5">
    <aside class="">
      <div class="mb-2 pt-3 text-2xl text-center text-blue-500 base-trans">
        <div class="flex items-center sm:justify-center mb-3 text-left">
          <div class="flex sm:block items-center gap-5 text-center">
            <div class="flex justify-center">
              <div class="flex flex-col items-center gap-3">
                <div class="relative">
                  <svg
                    v-if="!useUserInfo.userInfo?.user_profile?.profile_picture"
                    width="100"
                    height="100"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-test="profile-photo-image-empty"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.8 28.8c0 13.255 10.745 24 24 24s24-10.745 24-24-10.745-24-24-24-24 10.745-24 24zm24 4.8a9.6 9.6 0 0 1-9.6-9.6 9.6 9.6 0 0 1 9.6-9.6 9.6 9.6 0 0 1 9.6 9.6 9.6 9.6 0 0 1-9.6 9.6zm15.252 12.147A22.716 22.716 0 0 1 28.8 51.6a22.715 22.715 0 0 1-15.252-5.853C16.213 39.992 22.04 36 28.8 36s12.587 3.992 15.252 9.747z"
                      fill="#C4C7CC"
                    ></path>
                  </svg>
                  <img
                    v-else
                    :src="useUserInfo.userInfo?.user_profile?.profile_picture"
                    alt=""
                    class="w-[100px] sm:w-[100px] rounded-full h-[100px]"
                  />
                  <div
                    :class="[
                      'absolute cursor-pointer bg-gray-300 rounded-full p-1 flex justify-center bottom-0 -right-5',
                    ]"
                    @click="profilePictureModal = !profilePictureModal"
                  >
                    <svg viewBox="0 0 24 24" fill="none" class="w-7 sm:w-9">
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21ZM12 9.27273C9.69881 9.27273 7.83333 11.1043 7.83333 13.3636C7.83333 15.623 9.69881 17.4545 12 17.4545C14.3012 17.4545 16.1667 15.623 16.1667 13.3636C16.1667 11.1043 14.3012 9.27273 12 9.27273ZM12 10.9091C10.6193 10.9091 9.5 12.008 9.5 13.3636C9.5 14.7192 10.6193 15.8182 12 15.8182C13.3807 15.8182 14.5 14.7192 14.5 13.3636C14.5 12.008 13.3807 10.9091 12 10.9091ZM16.7222 10.0909C16.7222 9.63904 17.0953 9.27273 17.5556 9.27273H18.6667C19.1269 9.27273 19.5 9.63904 19.5 10.0909C19.5 10.5428 19.1269 10.9091 18.6667 10.9091H17.5556C17.0953 10.9091 16.7222 10.5428 16.7222 10.0909Z"
                          fill="#1C274C"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
                <img
                  v-if="useUserInfo.userInfo?.user_profile?.signature_scan"
                  :src="useUserInfo.userInfo?.user_profile?.signature_scan"
                  alt=""
                  class="w-[150px]"
                />
              </div>
            </div>
            <div class="text-left sm:text-center">
              <h1 class="font-bold text-xl sm:text-2xl">
                {{ sideBarStore?.user?.user?.name }}
              </h1>
              <!-- <p class="text-gray-600 text-[14px] leading-[18px] sm:text-sm">
                {{ sideBarStore.user.phone }}
              </p>
              <p class="text-gray-600 text-[14px] leading-[18px] sm:text-sm">
                {{ sideBarStore.user.email }}
              </p> -->
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div class="overflow-x-auto">
        <SideBarItems
          :links="menuStore.links"
          class="flex gap-1 sm:block"
        ></SideBarItems>
      </div>
    </aside>
  </section>
  <ProfilePictureUploadModal v-bind:is-modal-open="profilePictureModal" />
</template>

<script setup>
  import SideBarItems from "~/components/Sidebar/SideBarItems.vue";
  import { useMenuStore } from "~/stores/menuStore";
  import { useSideBarStore } from "~/stores/sideBarStore";
  import { useUserInfoStore } from "~/stores/userInfoStore";

  const menuStore = useMenuStore();
  const useUserInfo = useUserInfoStore();
  const sideBarStore = useSideBarStore();

  let profilePicture = ref({});
  let profilePictureModal = ref(false);
  let isUploadBtn = ref(false);

  async function uploadProfilePicture() {
    try {
      isUploadBtn.value = true;

      const endpoint = "/user/avatar-change";
      let payload = { profile_picture: profilePicture.value };

      const { data, error } = await callAuthnAxios(endpoint, payload);
      if (data?.data) {
        profilePictureModal.value = false;
        await useUserInfo.getProfileInfo();
      } else {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
      isUploadBtn.value = false;
    } finally {
      isUploadBtn.value = false;
    }
  }

  watch(
    () => sideBarStore.user,
    () => {
      sideBarStore.user = sideBarStore?.user;
    },
    {
      immediate: true,
      deep: true,
    }
  );
  onMounted(async () => {});
</script>
