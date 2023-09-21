import axios from "axios";

export const getAllInvoiceOrder = async () => {
    const res = await axios.get(`http://localhost:8080/api/orders/list?page=0`);
    return res;
}