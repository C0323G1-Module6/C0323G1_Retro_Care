import axios from "axios";

export async function createOrder(
  appUserId,
  loyaltyPoint,
  totalPrice,
  cartIDs,
  customerInfo
) {
  try {
    const reqBody = JSON.stringify({
      cartIDs: cartIDs,
      customerInfo: customerInfo,
    });
    const res = await axios.post(
      `http://localhost:8080/api/orders/create?appUserId=${appUserId}&loyaltyPoint=${loyaltyPoint}&totalPrice=${totalPrice}`,
      reqBody,
      { headers: { "Content-Type": "application/json" } }
    );
    return res;
  } catch (error) {
    console.error(`Error in createOrder: ${error}`);
  }
}

export async function getOrderDetails(orderId) {
  const res = await axios.get(
    `http://localhost:8080/api/orders/get-order-details?orderId=${orderId}`
  );
  return res.data;
}
