import axios from "axios";

export const loginByUserName = async (appUser) => {
   
        const result = await axios.post(`http://localhost:8080/api/user/login-by-username`,appUser);
        return result;
   
}