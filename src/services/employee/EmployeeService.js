import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080"

export async function getListEmployee(page, limit, sort, nameEmployee) {
    const res = await axios.get("/employees/list/" + page + "/" + limit + "/" + sort, {
        params: {
            name: nameEmployee
        }

    });
    return res.data;
}

export async function deleteEmployees(idEmployee) {
   const res = await axios.delete("/employees/delete-employee", {params: {id: idEmployee}});
   return res;
}

export const getNewEmployee =async () =>{
    const res = await axios.get('http://localhost:8080/employees/create');
    return res
}

export const getEmployee =async (id) =>{
    const res = await axios.get(`http://localhost:8080/employees/${id}`);
    return res
}
export const updateEmployee =async (employee) =>{
    const res = await axios.patch(`http://localhost:8080/employees/update/${employee.id}`,employee);
    return res
}
export const crateEmployee =async (employeeDto) =>{
    const res = await axios.post('http://localhost:8080/employees/create',employeeDto);
    return res
}
export const createUserEmployee = async (userName) =>{
    const res= await axios.post(`http://localhost:8080/api/user/register-by-manager?userName=${userName}`);
    return res;
}