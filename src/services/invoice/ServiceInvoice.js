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
        const result = await axios.get("http://localhost:8080/api/supplier/list");
        return result.data;
    } catch (e) {
        console.log(e);
    }

}
export async function getMedicineList() {
    try {
        const result = await axios.get("http://localhost:8080/api/medicine/get-list-for-invoice");
        return result.data;
    } catch (e) {
        console.log(e);
    }

}
export async function getUnitDetail(id) {
    try {
        const result = await axios.get(`http://localhost:8080/api/medicine/get-unitDetail/${id}`);
        return result.data.unit.name;
    } catch (e) {
        console.log(e);
    }

}
export async function createInvoice(invoice) {
    const result = await axios.post(`http://localhost:8080/api/invoice/create`, invoice);
    console.log(result);
    return result;
}
export async function editInvoice(invoice) {
    const result = await axios.patch(`http://localhost:8080/api/invoice/edit`, invoice);
    return result.data;

}

export async function getInvoice(invoiceId) {
    try {
        const result = await axios.get(`http://localhost:8080/api/invoice/${invoiceId}`);
        return result.data;
    } catch (e) {
        console.log(e);
    }

}
export async function getMedicine(medicineId) {
    try {
        const result = await axios.get(`http://localhost:8080/api/medicine/get-medicine/${medicineId}`);
        return result.data;
    } catch (e) {
        return {
            medicineQuantity: 0,
            vat: 0,
            id: 0,
            retailProfits: 0
        }
    }

}

export async function getEmployee(username) {
    try {
        const result = await axios.get(`http://localhost:8080/api/employees/by-user/${username}`);
        return result.data;
    } catch (e) {
        console.log(e);
    }

}

export async function getInvoiceDetails(invoiceId) {
    try {
        const result = await axios.get(`http://localhost:8080/api/invoice-detail/${invoiceId}`);
        return result.data;
    } catch (e) {
        console.log(e);
    }

}


