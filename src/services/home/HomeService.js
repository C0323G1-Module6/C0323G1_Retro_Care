import axios from "axios";

const baseURL = "http://localhost:8080/api/home";

export const findMedicineForHomepage = async (keyword, type) => {
  try {
    const response = await axios.get(
      `${baseURL}?keyword=${keyword}&type=${type}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const findFavoriteMedicineForHomepage = async () => {
  try {
    const response = await axios.get(`${baseURL}/favorite`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const searchMedicines = async (
  page,
  limit,
  keyword,
  type,
  sortBy,
  sortDirection
) => {
  try {
    console.log(
      `${baseURL}/list-page?page=${page}&limit=${limit}&keyword=${keyword}&type=${type}&sortBy=${sortBy}&sortDirection=${sortDirection}`
    );
    const response = await axios.get(
      `${baseURL}/list-page?page=${page}&limit=${limit}&keyword=${keyword}&type=${type}&sortBy=${sortBy}&sortDirection=${sortDirection}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
