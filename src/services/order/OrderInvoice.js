import axios from "axios";

export const getAllInvoiceOrder = async () => {
    const res = await axios.get(`http://localhost:8080/api/orders/list?page=0`);
    return res;
}

export const getInvoiceByTime = async (startDateTime,endDateTime)=>{
    const res = await axios.get(`http://localhost:8080/api/orders/get-order/get-by-time?startDateTime=${startDateTime}&endDateTime=${endDateTime}`);
    return res;
}