import axios from 'axios';

export const axiosClient = () => {
    axios.interceptors.request.use(async (config) => {
        const accessToken = localStorage.getItem("JWT")
        console.log(">>>  " + accessToken);
        if (accessToken) {
            // config.headers.Authorization = `Bearer ${accessToken}`
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

    })
}

