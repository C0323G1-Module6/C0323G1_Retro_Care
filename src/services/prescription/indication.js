import axios from "axios";

export const createIndication = async (indication) => {
    await axios.post("http://localhost:8080/indication/create", indication)
}

export const getListIndication = async (id) => {
    try {
        const res = await axios.get(`http://localhost:8080/indicationDto/${id}`);
        return res;
    }
    catch (e) {
        console.log(e);
    }
}
