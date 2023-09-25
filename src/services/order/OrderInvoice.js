import axios from "axios";

export const getAllInvoiceOrder = async (page,orderDto,sortBy) => {
    const res = await axios.get(`http://localhost:8080/api/orders/list?page=${page}&sortBy=${sortBy}&startDateTime=${orderDto.startDateTime}&endDateTime=${orderDto.endDateTime}`);
    return res;
}