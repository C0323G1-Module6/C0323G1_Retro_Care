import axios from "axios";

export const getAllPatient =async () => {
    const res = await axios.get("http://localhost:8080/patient");
    return res.data;
}