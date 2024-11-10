import { useAdminAuthStore } from "~/stores/adminAuthStore";

export async function callAdminAuthnAxios(api, payLoad, headers) {

    const { loggedInData: { token_type, access_token } } = useAdminAuthStore();

    const config = headers === undefined ? ref({
        headers: {
            'Authorization': `${token_type} ${access_token}`
        }
    }) : headers;

    const { data, errorMessage } = await callAxios(api, payLoad, config.value)

    return { data, errorMessage }
}