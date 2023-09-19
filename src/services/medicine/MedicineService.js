import axios from "axios";

export const getAllUnit = async () => {
  const result=await axios.get("http://localhost:8080/api/unit");
    return result.data;
}

export const addMedicine = async (medicine) => {
  await axios.post("http://localhost:8080/api/medicine",medicine);
}

export const editMedicine = async (id,medicine) => {
  await axios.patch(`http://localhost:8080/api/medicine/${id}`,medicine);
}

export const getMedicineById = async (id) => {
  await axios.get(`http://localhost:8080/api/medicine/${id}`);
}