import axios from "axios";

export async function getMedicineList(name) {
    const medicines = await axios.get("http://localhost:8080/api/carts/getMedicine?name=" + name);
    return medicines.data;
}

export async function getCustomerByPhone(phone) {
    const customer = await axios.get("http://localhost:8080/api/carts/getInforCustomer?phone=" + phone);
    return customer.data;
}

export async function getCartDetailEmployee(id) {
    const carts = await axios.get("http://localhost:8080/api/carts/getAllCartDetailsByUser?id=" + id)
    return carts.data;
}

export async function addMedicineToCart(userId, medicineId, quantity) {
    await axios.post("http://localhost:8080/api/carts/add-from-home-details?appUserId="
        + userId + "&medicineId=" + medicineId + "&newQuantity=" + quantity);
}

export async function setQuantityOfCart(userId, medicineId, quantity) {
    await axios.post("http://localhost:8080/api/carts/add-from-cart?appUserId="
        + userId + "&medicineId=" + medicineId + "&quantity=" + quantity);
}

export async function deleteMedicineFromCart(id) {
    const res = await axios.delete("http://localhost:8080/api/carts/delete-cart?cartId=" + id)
    return res;
}

export async function deleteAllFromCart(id) {

}

export async function payWhenSell(customerUserId, employeeUserId, code, note) {
    const res = await axios.post("http://localhost:8080/api/orders/createOrder?customerUserId=" +
        customerUserId + "&employeeUserId=" + employeeUserId + "&code=" + code + "&note=" + note);
        return res;
}

export async function getPrescriptionByName(name){
    const res = await axios.get("http://localhost:8080/api/carts/getPrescriptionByName?name="+name);
    return res.data;
}

export async function getPrescriptionBySymptoms(symptoms){
    const res = await axios.get("http://localhost:8080/api/carts/getPrescriptionBySymptoms?symptoms="+symptoms);
    return res.data;
}

export async function getAllIndicationsByPrescription(id){
    const res = await axios.get("http://localhost:8080/api/carts/getIndication?id="+id);
    return res.data;
}

export async function getOnePrescriptionById(id){
    const res = await axios.get("http://localhost:8080/prescription/"+id);
    return res.data;
}

export async function getNameEmployee(id){
    const res = await axios.get("http://localhost:8080/api/carts/getNameEmployee?appUserId="+id);
    return res.data;
}

export async function getOneMedicineByName(name){
    const res = await axios.get("http://localhost:8080/api/carts/getOneMedicineByName?name="+name);
    return res.data;
}
