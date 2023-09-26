import axios from "axios";

export const getAllUnit = async () => {
    const result = await axios.get("http://localhost:8080/api/unit");
    return result.data;
}

export const getMedicineCode = async () => {
    const result = await axios.get(`http://localhost:8080/api/medicine/code/create`);
    return result.data;
}

export const addMedicine = async (medicine) => {
    await axios.post("http://localhost:8080/api/medicine", medicine);
}

export const editMedicine = async (id, medicine) => {
    try {
        await axios.patch(`http://localhost:8080/api/medicine/${id}`, medicine);
    } catch (error) {
        console.log(error)
    }

}

export const getMedicineById = async (id) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/medicine/${id}`);
        console.log(result);
        return result.data;
    } catch (error) {
        console.log(error)
    }
}

export async function getAllKindOfMedicine() {
    const res = await axios.get(`http://localhost:8080/api/kindOfMedicine`);
    return res.data;
}
export async function getCountries() {
    const res = await axios.get('https://restcountries.com/v3.1/all')
    return res.data;
}

export const findAll = async (page) => {
    try {
        const result = await axios.get(
            `http://localhost:8080/api/medicine/get-medicine?page=${page}&size=${5}`
        );
        return result;
    } catch (error) {
        return error;
    }
};


export const searchMedicine = async (searchInMedicine, search, page, limit, conditional) => {
  try {
    const result = await axios.get(
      `http://localhost:8080/api/medicine/search?search=${search}&searchInMedicine=${searchInMedicine}&page=${page}&limit=${limit}&conditional=${conditional}`
    );
      console.log(`http://localhost:8080/api/medicine/search?search=${search}&searchInMedicine=${searchInMedicine}&page=${page}&limit=${limit}&conditional=${conditional}`)
    return result;
  } catch (error) {
    return error;
  }
};

export const deleteMedicine = async (id) => {
    try {
        const result = await axios.delete(
            `http://localhost:8080/api/medicine/${id}`
        );
        return result;
    } catch (error) {
        return error;
    }
};

export const getMedicineList = async () => {
    try {
        const result = await axios.get(`http://localhost:8080/api/medicine/get-list`)
        return result.data;
    } catch (error) {
        return error;
    }
}