import { getCarts } from "../../../services/order/CartService";

export const getAllCarts = (appUserId) => async (dispatch) => {
  try {
    const res = await getCarts(appUserId);
    dispatch({
      type: "GET_ALL_CART",
      payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};
