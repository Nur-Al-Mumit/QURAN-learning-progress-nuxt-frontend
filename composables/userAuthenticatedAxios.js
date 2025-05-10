import { useStudentAuthInfoStore } from "~/stores/studentAuthInfo";
import axios from "axios";

export async function callAuthnAxios(endpoint, payLoad, headers, method = 'post') {

    let data = null;
    let error = {};
    const { loggedInData: { token_type, access_token } } = useStudentAuthInfoStore();

    const config = headers === undefined ? ref({
        headers: {
            'Authorization': `${token_type} ${access_token}`
        }
    }) : headers;

    try {
        const response = method.toLowerCase() === 'get'
            ? await axios.get(endpoint, config)
            : await axios.post(endpoint, payLoad, config);
        data = response.data;
    } catch (e) {
        error = e.response?.data || e.message;
        alert(error.message || "An error occurred");
        // if (error.message === 'Unauthenticated') {
        //   navigateTo('./')
        // }
    }
    return { data, error };
}