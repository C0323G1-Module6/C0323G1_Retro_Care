import axios from "axios";

export async function getInvoiceList(page) {
    const response = await axios.get(`http://localhost:8080/api/invoice/result?page=${page}`);
    return response.data;
}

export async function deleteInvoice(id) {
    const response = await axios.delete(`http://localhost:8080/api/invoice/delete/${id}`)
    return response.data;
}

export async function searchInvoice(startDate,endDate,startTime,endTime,sortColumn,  page, size) {
    try {
        const response = await axios.get('http://localhost:8080/api/invoice/search', {
            params: {
                page: page,
                size: size,
                startDate: startDate,
                endDate: endDate,
                startTime: startTime,
                endTime: endTime,
                sortColumn: sortColumn,

            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

    export function getMaxCode() {
        try {
            const result = axios.get("http://localhost:8080/api/invoice/code")
        } catch (e) {
            console.log(e);
        }
    }
}