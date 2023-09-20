import axios from "axios";

export const createIndication = async (indication) => {
    await axios.post("/indication/create",indication)
}

