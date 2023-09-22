import axios from "axios";

export async function getListSupplier(page,code,name,phoneNumber,address,sortBy) {
    const resolve = await axios.get(`http://localhost:8080/api/supplier?page=${page}&&code=${code}&&name=${name}&&phoneNumber=${phoneNumber}&&address=${address}&&sortBy=${sortBy}`)
    return resolve.data;
}

export async function getSupplierById(id) {
    const resolve = await axios.get(`http://localhost:8080/api/supplier/get/${id}`)
    return resolve.data;
}
export async function detailSupplierById(id,page,startDate,endDate) {
    const resolve = await axios.get(`http://localhost:8080/api/supplier/detail-supplier/${id}?page=${page}&&startDate=${startDate}&&endDate=${endDate}`)
    return resolve.data;
}
export async function createSupplier(supplier) {
    const resolve = await axios.post(`http://localhost:8080/api/supplier/create-supplier`, supplier)
    return resolve.data;
}
export async function updateSupplierById(id,supplier) {
    const resolve = await axios.patch(`http://localhost:8080/api/supplier/update-supplier/${id}`,supplier)
    return resolve.data;
}
export async function deleteSupplierById(id) {
    const resolve = await axios.patch(`http://localhost:8080/api/supplier/delete/${id}`)
    return resolve.data;
}
export async function getSupplierDetailById(id) {
    const resolve = await axios.get(`http://localhost:8080/api/supplier/get-detail/${id}`)
    console.log(resolve.data);
    return resolve.data;
}