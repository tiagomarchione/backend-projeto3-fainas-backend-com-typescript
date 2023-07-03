import Axios from "axios";
import { configure } from "axios-hooks";
import toast from "react-simple-toasts";
import { AuthToken } from "./authToken";
import { browserHistory } from "./browserHistory";
import { ErrorToast } from "./components/ErrorToast";
export { default as useAxios } from "axios-hooks";


const texts = {
    unauthenticatedError: 'Sua sessão expirou. Faça o login novamente.',
};

Axios.defaults.validateStatus = (status) => {
    if(status >= 500) {
        return false;
    } else {
        return true;
    }
}

export const axios = Axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

axios.interceptors.response.use(undefined, (response) => {
    if (response.status >= 400) {
        toast("Erro");
    }
    return response;
});

axios.interceptors.request.use((config) => {
    const token = AuthToken.get();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const status: number = error.request.status;
    if(status === 401) {
        AuthToken.remove();
        toast(texts.unauthenticatedError);
        browserHistory.push('/login');
    } else if(status === 422) {
        error.response.data.message.forEach((message: string) => {
            toast(message, {
                render(message) {
                    return <ErrorToast message={message} />
                }
            });
        });
    }
});

// axios.get('/todolist')

configure({ axios });