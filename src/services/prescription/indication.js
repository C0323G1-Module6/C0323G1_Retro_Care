import axios from "axios";

export const createIndication = async (indication) => {
    await axios.post("http://localhost:8080/indication/create",indication)
}

