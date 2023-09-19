import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080"

export async function getListEmployee(page, limit, sort) {
    const res = await axios.get("/employees/get-list/" + page + "/" + limit + "/" + sort);
    return res.data;
}

export async function searchListEmployee(page, limit, sort, idPosition, nameEmployee) {
    const res = await axios.get("/employees/search-list/" + page + "/" + limit + "/" + sort, {
        params: {
            role: idPosition,
            name: nameEmployee
        }

    });
    return res.data;
}

export async function deleteEmployee(idEmployee) {
    await axios.delete("/employees/delete-employee", {params: {id: idEmployee}})
}