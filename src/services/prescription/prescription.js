import axios from "axios";

export const getAllPrescription = async (page,search,searchPrescription,sortBy) => {
    const res = await axios.get(`http://localhost:8080/prescription?page=${page}&search=${search}&searchPrescription=${searchPrescription}&sortBy=${sortBy}`);
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
    await axios.patch(`http://localhost:8080/prescription/edit`,prescription)
}

export const getPrescriptionById = async (id) => {
    const res = await axios.get(`http://localhost:8080/prescription/${id}`);
    console.log(res);
    return res;
}