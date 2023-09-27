import axios from 'axios';

export async function getList() {
    const res = await axios.get(`http://localhost:8080/api/kindOfMedicines`);
    return res.data;
}
// get list by id

export async function getListById(id) {
    const res = await axios.get("http://localhost:8080/api/kindOfMedicines/kindOfMedicine/" + id);
    return res.data;
}
// create

export async function add(kindOfMedicine) {
    await axios.post(`http://localhost:8080/api/kindOfMedicines/create`, kindOfMedicine)
}

// delete
export async function deleteKindOfMedicine(id) {
    await axios.delete(`http://localhost:8080/api/kindOfMedicines/delete/${id}`)
}
// deletes
export async function deleteKindOfMedicines(choseRow) {
    await axios.post(`http://localhost:8080/api/kindOfMedicines/delete-items`, { ids: choseRow })
}


// Edit

export async function edit(kindOfMedicine) {
    await axios.put("http://localhost:8080/api/kindOfMedicines/edit", kindOfMedicine);
}

//search

// export async function search(productName) {
//     const rs = await axios.get("http://localhost:8080/api/kindOfMedicine/?name_like=" + name)
//     return rs.data
// }

// Paginate 
export async function pagination(page, searchCodes, searchNames) {
    
        const response = await axios.get(
            `http://localhost:8080/api/kindOfMedicines/get?page=${page}&searchCode=${searchCodes}&searchName=${searchNames}`)


        // console.log(JSON.stringify(response));
        return response.data;
    
}