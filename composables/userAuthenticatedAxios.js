import { useAuthStore } from "~/stores/userAuthStore";

export async function callAuthnAxios(api, payLoad, headers, method) {

    const { loggedInData: { token_type, access_token } } = useAuthStore();

    const config = headers === undefined ? ref({
        headers: {
            'Authorization': `${token_type} ${access_token}`
        }
    }) : headers;

    const { data, errorMessage } = await callAxios(api, payLoad, config.value, method)

    return { data, errorMessage }
}