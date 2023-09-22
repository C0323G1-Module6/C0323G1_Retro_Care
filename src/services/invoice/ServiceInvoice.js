import axios from "axios";

export async function getMaxCode() {
    try {
        const result = await axios.get("http://localhost:8080/api/invoice/code");
        return result.data;
    } catch (e) {
        console.log(e);
    }
}

export async function getSupllierList() {
    try {
        const result = await axios.get("http://localhost:8080/supplier/list");
        return result.data;
    } catch (e) {
        console.log(e);
    }

}
export async function getMedicineList() {
    try {
        const result = await axios.get("http://localhost:8080/api/medicine/get-list");
        return result.data;
    } catch (e) {
        console.log(e);
    }

}
export async function getUnitDetail(id) {
    try {
        const result = await axios.get(`http://localhost:8080/medicine/${id}`);
        return result.data.unit.name;
    } catch (e) {
        console.log(e);
    }

}
export async function createInvoice(invoice) {
    try {
        const result = await axios.post(`http://localhost:8080/api/invoice/create`, invoice);
        return result.data;
    } catch (e) {
        console.log(e);
    }

}
export async function editInvoice(invoice) {
    try {
        const result = await axios.patch(`http://localhost:8080/api/invoice/edit`, invoice);
        return result.data;
    } catch (e) {
        console.log(e);
    }

}

export async function getInvoice(invoiceId) {
    try {
        const result = await axios.get(`http://localhost:8080/api/invoice/${invoiceId}`);
        return result.data;
    } catch (e) {
        console.log(e);
    }

}