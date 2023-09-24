import axios from "axios";

export async function addToCartFromHomeAndDetails(
  appUserId,
  medicineId,
  newQuantity
) {
  const res = await axios.post(
    `http://localhost:8080/api/carts/add-from-home-details?appUserId=${appUserId}&medicineId=${medicineId}&newQuantity=${newQuantity}`
  );
  return res.status;
}

export async function addToCart(appUserId, medicineId, quantity) {
  const res = await axios.post(
    `http://localhost:8080/api/carts/add-from-cart?appUserId=${appUserId}&medicineId=${medicineId}&quantity=${quantity}`
  );
  return res.status;
}

export async function getMedicineForDisplay(medicineId) {
  const res = await axios.get(
    `http://localhost:8080/api/carts/get-details?medicineId=${medicineId}`
  );
  return res;
}

export async function getCarts(appUserId) {
  const res = await axios.get(
    `http://localhost:8080/api/carts/get-all?appUserId=${appUserId}`
  );
  return res.data;
}

export async function checkQuantity(medicineId, inputQuantity) {
  const res = await axios.get(
    `http://localhost:8080/api/carts/check-quantity?medicineId=${medicineId}&inputQuantity=${inputQuantity}`
  );
  return res.status;
}

export async function deleteCart(cartId) {
  const res = await axios.delete(
    `http://localhost:8080/api/carts/delete-cart?cartId=${cartId}`
  );
  return res;
}

export async function getQuantityInCart(appUserId, medicineId) {
  const res = await axios.get(
    `http://localhost:8080/api/carts/get-quantity-in-cart?appUserId=${appUserId}&medicineId=${medicineId}`
  );
  return res.data;
}

export async function getPoint(appUserId) {
  const res = await axios.get(
    `http://localhost:8080/api/carts/get-loyalty-point?appUserId=${appUserId}`
  );
  return res.data;
}

export async function checkAvailability(appUserId) {
  const res = await axios.get(
    `http://localhost:8080/api/carts/check-availability?appUserId=${appUserId}`
  );
  return res.data;
}

export async function deleteMultiProduct(deleledCartIDs) {
  const res = await axios.post(
    "http://localhost:8080/api/carts/delete-multi",
    deleledCartIDs
  );
}
