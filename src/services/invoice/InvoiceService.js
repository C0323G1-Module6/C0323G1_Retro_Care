import axios from "axios";

export async function getInvoiceList(page) {
    const response = await axios.get(`http://localhost:8080/api/invoice/${page}`);
    return response.data;
}