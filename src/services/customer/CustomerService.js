import axios from "axios";

// TinDT

export const addCustomer = async (customer) => {
  await axios.post(`http://localhost:8080/customers/api/create`, customer);
}
export const updateCustomer = async (customer) => {
  await axios.patch(`http://localhost:8080/customers/api/update/${customer.id}`, customer);
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
export const getCustomerDetailByUserId = async (id) => {
  try {
    const result = await axios.get(`http://localhost:8080/customers/api/user/${id}`);
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
export const updateNewCustomer = async (customer) => {
  await axios.patch(`http://localhost:8080/customers/api/update-new/${customer.id}`, customer);
}
// QuyenHT

export const getAllCustomers = async (page, name, code, address, phoneNumber, groupValue, sortItem,sortType) => {
  try {
    const result = await axios.get(`http://localhost:8080/customers/api/list?page=${page}&name=${name}&code=${code}&address=${address}&phoneNumber=${phoneNumber}&groupValue=${groupValue}&sortItem=${sortItem}&sort=${sortType}`);
    return result;
  } catch (e) {
    console.log(e);
  }
}
export const deleteCustomer = async (id) => {
  try {
    const result = await axios.delete(`http://localhost:8080/customers/api/delete/${id}`);
    console.log(result)
    return result;
  } catch (e) {
    console.log(e);
  }
}
