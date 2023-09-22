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
    if (jwtToken) {
        const result = jwt_decode(jwtToken);
        return result;
    }
}

export const getIdByUserName = async (userName) => {
    const result = await axios.get(`http://localhost:8080/api/user/get-id-app-user/${userName}`);
    return result;
}

export const checkRoleAppUser = (roleName) => {
    const roleList = jwt_decode(localStorage.getItem("JWT")).roleList;
    const checkRole = roleList.some(role => role.authority === roleName)
    return checkRole;
}