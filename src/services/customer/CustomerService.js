import axios from "axios";
export const addCustomer = async (customer) => {
    await axios.post(`http://localhost:8080/customers/api/create`,customer);
  }
  export const updateCustomer = async (customer) => {
    await axios.put(`http://localhost:8080/customers/api/update`,customer);
  }
  export const getCustomerCode = async () => {
   const result =  await axios.get(`http://localhost:8080/customers/api/dto/create`);
   console.log(result);
   return result.data;
  }
  export const getCustomerDetail = async (id) =>{
    try{
        const result = await axios.get(`http://localhost:8080/customers/api/${id}`);
        return result.data;
    }catch (e){
        console.log(e);
    }

  }
  export const getCodeCustomer = async ()=>{
    try{
        const result = await axios.get(`http://localhost:8080/customers/api/dto/create`);
        console.log(result);
        return result.data;
    }catch (e){
        console.log(e);
    }
  }