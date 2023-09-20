import axios from "axios";

export const getAllUnit = async () => {
  const result = await axios.get("http://localhost:8080/api/unit");
  return result.data;
};

export const addMedicine = async (medicine) => {
  await axios.post("http://localhost:8080/api/medicine", medicine);
};

export const editMedicine = async (id, medicine) => {
  await axios.patch(`http://localhost:8080/api/medicine/${id}`, medicine);
};

export const getMedicineById = async (id) => {
  await axios.get(`http://localhost:8080/api/medicine/${id}`);
};

export async function getAllKindOfMedicine() {
  const res = await axios.get(`http://localhost:8080/api/kindOfMedicine`);
  return res.data;
}

export const findAll = async () => {
  try {
    const result = await axios.get(
      `http://localhost:8080/api/medicine/get-medicine`
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

export const getListMedicine = async (page, size) => {
  try {
    const result = await axios.get(
      `http://localhost:8080/api/medicine/get-medicine?page=${page}&size=${size}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchMedicine = async (searchInMedicine, search, page, limit) => {
  let url = `http://localhost:8080/api/medicine/search?search=${search}`;
  switch (searchInMedicine) {
    case "searchByName":
      url += `&searchInMedicine=${searchInMedicine}`;
      break;
    case "searchByCode":
      url += `&searchInMedicine=${searchInMedicine}`;
      break;
    case "searchByActiveElement":
      url += `&searchInMedicine=${searchInMedicine}`;
      break;
    case "searchByNameKindOfMedicine":
      url += `&searchInMedicine=${searchInMedicine}`;
  }

  try {
    const result = await axios.get(
      `${url}&searchInMedicine=${searchInMedicine}&page=${page}&limit=${limit}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMedicine = async (id) => {
  try {
    const result = await axios.delete(
      `http://localhost:8080/api/medicine/${id}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
