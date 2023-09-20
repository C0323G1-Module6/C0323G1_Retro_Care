import axios from "axios";

export async function getAllProducts() {
  const res = await axios.get("http://localhost:8080/medicine/api/medicine");
  return res.data.content;
}

export async function updateCustomer(customer) {
  const res = await axios.patch(
    "http://localhost:8080/customers/api/online-customer/",
    customer
  );
  return res;
}
