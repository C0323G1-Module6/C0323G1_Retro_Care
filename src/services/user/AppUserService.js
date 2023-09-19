import axios from "axios";

export const loginByUserName = async (appUser) => {
    const result = await axios.post(`http://localhost:8080/api/user/login-by-username`, appUser);
    return result;
}

export const registerAppUser = async (appUser) => {
    const result = await axios.post(`http://localhost:8080/api/user/register-by-customer`, appUser);
    return result;
}

export const loginWithFacebook = async (facebookMail) => {
    const result = await axios.post(`http://localhost:8080/api/user/login-by-facebook`,facebookMail);
    return result;
}