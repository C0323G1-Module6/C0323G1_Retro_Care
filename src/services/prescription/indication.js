import axios from "axios";

export const createIndication = async (indication) => {
    await axios.post("http://localhost:8080/indication/create", indication)
}

export const getListIndication = async (id) => {
    const res = await axios.get(`http://localhost:8080/indication/${id}`)
    return res;
}
