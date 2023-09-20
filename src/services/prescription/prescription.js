import axios from "axios";

export const getAllPrescription = async (page) => {
    const res = await axios.get(`http://localhost:8080/prescription?page=${page}`);
    return res;
}

export const removePrescription = async (id) => {
    const res = await axios.delete(`http://localhost:8080/prescription/delete/${id}`);
    return res;
}

export const createPrescription = async (newPrescription) => {
    await axios.post("http://localhost:8080/prescription/create",newPrescription)
}

export const editPrescription = async (prescription) => {
    await axios.patch(`http://localhost:8080/prescription/edit/${prescription.id}`,prescription)
}

export const getPrescriptionById = async (id) => {
    const res = await axios.get(`http://localhost:8080/prescription/${id}`);
    return res;
}