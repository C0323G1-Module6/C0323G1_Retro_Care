import axios from "axios";

const baseURL = "http://localhost:8080/api/home";

export const findMedicineForHomepage = async (keyword, type) => {
  const response = await axios.get(
    `${baseURL}?keyword=${keyword}&type=${type}`
  );
  console.log(response);
  return response.data;
};

export const findFavoriteMedicineForHomepage = async () => {
  const response = await axios.get(`${baseURL}/favorite`);
  console.log(response);
  return response.data;
};

export const searchMedicines = async (
  page,
  limit,
  keyword,
  type,
  sortBy,
  sortDirection
) => {
  const response = await axios.get(
    `${baseURL}/list-page?page=${page}&limit=${limit}&keyword=${keyword}&type=${type}&sortBy=${sortBy}&sortDirection=${sortDirection}`
  );
  console.log(response);
  return response;
};
