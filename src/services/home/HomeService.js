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
