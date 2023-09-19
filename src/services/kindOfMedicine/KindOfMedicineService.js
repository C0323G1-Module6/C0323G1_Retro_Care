import axios from 'axios';

export async function getList() {
    const res = await axios.get(` http://localhost:8080/api/kindOfMedicine`);
    return res.data;
}

export async function getListType() {
    const res = await axios.get(`http://localhost:8080/api/kindOfMedicine/types`);
    return res.data;
}

// create

export async function add(kindOfMedicine) {
    await axios.post(`http://localhost:8080/api/kindOfMedicine/create`, kindOfMedicine)
}

// delete

export async function deleteProduct(id) {
    await axios.delete(`http://localhost:8080/api/kindOfMedicine/${id}`)
}

// get list by id

export async function getListById(id) {
    const res = await axios.get("http://localhost:8080/api/kindOfMedicine/" + id);
    return res.data;
}

// Edit

export async function edit(kindOfMedicine) {
    await axios.put("http://localhost:8080/api/kindOfMedicine/" + kindOfMedicine.id, kindOfMedicine);
}

//search

// export async function search(productName) {
//     const rs = await axios.get("http://localhost:8080/api/kindOfMedicine/?name_like=" + name)
//     return rs.data
// }

// Paginate 
export async function pagination(page, searchCodes, searchNames) {
    const response = await axios.get(
        `http://localhost:8080/api/kindOfMedicine/get?page=${page}&searchCode=${searchCodes}&searchName=${searchNames}`
    );
    console.log(JSON.stringify(response));
    return response.data;
}