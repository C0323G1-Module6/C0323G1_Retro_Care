import axios from "axios";

export async function createOrder(appUserId, loyaltyPoint, totalPrice) {
  const res = await axios.post(
    `http://localhost:8080/api/orders/create?appUserId=${appUserId}
    &loyaltyPoint=${loyaltyPoint}&totalPrice=${totalPrice}`
  );
}
