import axios from "axios";

export async function getInvoiceList(page) {
    const response = await axios.get(`http://localhost:8080/api/invoice/result?page=${page}`);
    return response.data;
}

export async function getInvoiceDetailByID(id) {
    const response = await axios.get(`http://localhost:8080/api/invoice/detail/${id}`);
    return response.data;
}

export async function deleteInvoice(id) {
    const response = await axios.delete(`http://localhost:8080/api/invoice/delete/${id}`)
    return response.data;
}

export async function searchInvoice(startDate, endDate, startTime, endTime, sortColumn,sortType, page, size) {
    try {
        const response = await axios.get('http://localhost:8080/api/invoice/search/result', {
            params: {
                page: page,
                size: size,
                startDate: startDate,
                endDate: endDate,
                startTime: startTime,
                endTime: endTime,
                sortColumn: sortColumn,
                sort: sortType
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function getMaxCode() {
    try {
        const result = axios.get("http://localhost:8080/api/invoice/code")
    } catch (e) {
        console.log(e);
    }
}

export async function getSupllierList(){
    try {
        const result = await axios.get("http://localhost:8080/supplier/list");
        return result.data;
    } catch (e) {
        console.log(e);
    }
}
export async function getMedicineList(){
    try {
        const result = await axios.get("http://localhost:8080/medicine/list");
        return result.data;
    } catch (e) {
        console.log(e);
    }
}
export async function getUnitDetail(id){
    try {
        const result = await axios.get(`http://localhost:8080/medicine/${id}`);
        console.log(result.data.unit.name);
        return result.data.unit.name;
    } catch (e) {
        console.log(e);
    }
}