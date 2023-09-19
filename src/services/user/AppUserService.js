import axios from "axios";
import jwt_decode from 'jwt-decode';

export const loginByUserName = async (appUser) => {
    const result = await axios.post(`http://localhost:8080/api/user/login-by-username`, appUser);
    return result;
}

export const registerAppUser = async (appUser) => {
    const result = await axios.post(`http://localhost:8080/api/user/register-by-customer`, appUser);
    return result;
}

export const loginWithFacebook = async (facebookMail) => {
    const result = await axios.post(`http://localhost:8080/api/user/login-by-facebook`, facebookMail);
    return result;
}

export const addJwtTokenToLocalStorage = (jwtToken) => {
    localStorage.setItem("JWT", jwtToken);
}

export const infoAppUserByJwtToken = () => {
    const jwtToken = localStorage.getItem("JWT");
    const result = jwt_decode(jwtToken);
    return result;
}