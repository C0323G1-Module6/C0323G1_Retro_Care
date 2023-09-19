import axios, {get} from "axios";

export const findAll = async () => {
    try{
        const result = await axios.get(`http://localhost:8080/api/medicine/get-medicine`);
        return result.data
    }catch (error){
        return error;
    }
}

export const getListMedicine = async (page, size) => {
    try {
        const result =  await axios.get(`http://localhost:8080/api/medicine/get-medicine?page=${page}&size=${size}`);
        return result.data
    }catch (error){
        return null;
    }
}