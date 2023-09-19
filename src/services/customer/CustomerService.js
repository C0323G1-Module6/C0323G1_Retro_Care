import axios from "axios";

// TinDT

export const addCustomer = async (customer) => {
  await axios.post(`http://localhost:8080/customers/api/create`, customer);
}
export const updateCustomer = async (customer) => {
  await axios.put(`http://localhost:8080/customers/api/update`, customer);
}
export const getCustomerCode = async () => {
  const result = await axios.get(`http://localhost:8080/customers/api/dto/create`);
  return result.data;
}
export const getCustomerDetail = async (id) => {
  try {
    const result = await axios.get(`http://localhost:8080/customers/api/${id}`);
    return result.data;
  } catch (e) {
    console.log(e);
  }


}
export const getCodeCustomer = async () => {
  try {
    const result = await axios.get(`http://localhost:8080/customers/api/dto/create`);
    console.log(result);
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

// QuyenHT

export const getAllCustomers = async (page, searchItem, code, address, phoneNumber, groupValue, sortItem) => {
  try {
    const result = await axios.get(`http://localhost:8080/customers/api/list?page=${page}&searchInput=${searchItem}&code=${code}&address=${address}&phoneNumber=${phoneNumber}&groupValue=${groupValue}&sortItem=${sortItem}`);
    return result;
  } catch (e) {
    console.log(e);
  }
}
export const deleteCustomer = async (id) => {
  try {
    const result = await axios.delete(`http://localhost:8080/customers/api/delete/${id}`);
    return result;
  } catch (e) {
    console.log(e);
  }
}
