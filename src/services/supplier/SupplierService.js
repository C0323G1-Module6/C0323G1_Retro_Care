import axios from "axios";

export async function getListSupplier(page) {
    const resolve = await axios.get(`http://localhost:8080/supplier?page=${page}`)
    return resolve.data;
}

export async function getSupplierById(id) {
    const resolve = await axios.get(`http://localhost:8080/supplier/get/${id}`)
    return resolve.data;
}

export async function detailSupplierById(id) {
    const resolve = await axios.get(`http://localhost:8080/supplier/detail-supplier/${id}`)
    return resolve.data;
}
export async function createSupplier() {
    const resolve = await axios.get(`http://localhost:8080/supplier/create-supplier`)
    return resolve.data;
}
export async function updateSupplierById(id) {
    const resolve = await axios.get(`http://localhost:8080/supplier/update-supplier/${id}`)
    return resolve.data;
}
export async function deleteSupplierById(id) {
    const resolve = await axios.get(`http://localhost:8080/supplier/delete/${id}`)
    return resolve.data;
}
export async function getSupplierDetailById(id) {
    const resolve = await axios.get(`http://localhost:8080/supplier/get-detail/${id}`)
    console.log(resolve.data);
    return resolve.data;

}