import "./ListEmployee.css";
import {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import {FaPlus, FaRegTrashAlt} from "react-icons/fa";
import {FiEdit} from "react-icons/fi";
import {
    AiOutlineRollback,
    AiOutlineDoubleLeft,
    AiOutlineDoubleRight,
} from "react-icons/ai";
import {Field, Form, Formik} from "formik";
import {deleteEmployees, getListEmployee} from "../../services/employee/EmployeeService";
import Swal from "sweetalert2";

export default function ListEmployee() {
    const [employees, setEmployee] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const limit = 5;
    const [sort, setSort] = useState('code_employee');
    const [searchEmployee, setSearchEmployee] = useState([]);
    const [deleteEmployee, setDeleteEmployee] = useState('');
    const getList = async () => {
        const data = await getListEmployee(page, limit, sort);
        setEmployee(data.content);
        setPage(data.pageable.pageNumber);
        setTotalPage(data.totalPages);
    }
    useEffect(() => {
        getList();
    }, [page, sort]);

    const checkDelete = async () => {
        console.log(deleteEmployee)
        Swal.fire({
                title: 'Bạn muốn xoá nhân viên có tên ' + deleteEmployee.nameEmployee + ' ?',
                html: '<p style="color: red;">Bạn sẽ không thể khôi phục nhân viên này.</p>',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xác nhận ',
                cancelButtonText: 'Huỷ',
                reverseButtons: true
            }
        ).then((res) => {
            if (res.isConfirmed) {
                deleteEmployees(deleteEmployee.id).then(() => {
                    getList().then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Xoá Thành công.',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    })
                });
            }
        })
    }

    return (
        <>
            <div className="container ">
                <div>
                    <h1 className="title-employee">Quản lý nhân viên</h1>
                </div>

                <div className="mt-3 mb-2">
                    <div className="justify-content-between d-flex filter-employee">
                        <div>
                            <Formik initialValues={{
                                nameEmployee: ""
                            }}
                                    onSubmit={(values) => {

                                    }}>
                                <Form>
                                    <span>Lọc theo:</span>
                                    <Field
                                        className="input-search"
                                        id="nameEmployee"
                                        type="text"
                                        name="nameEmployee"
                                        placeholder="Nhập tên nhân viên..."
                                    />
                                    <button className="btn btn-light btn-outline-primary button-search" type="submit">
                                        Tìm Kiếm
                                    </button>
                                </Form>
                            </Formik>
                        </div>
                        <div className="ms-4">
                            <Formik initialValues={{sort: ''}} >
                                <Form>
                                    <span>Sắp xếp: </span>
                                    <Field as="select" value={sort} className="input-search"
                                           onChange={(event) => setSort(event.target.value)}>
                                        <option value="code_employee">Mã nhân viên</option>
                                        <option value="name_employee">Tên nhân viên</option>
                                    </Field>
                                </Form>
                            </Formik>
                        </div>

                    </div>
                </div>

                <div className="mx-auto">
                    <div className="pt-2">
                        <div>
                            <div className="table-container rounded-top ">
                                <table className="table table-hover ">
                                    <thead>
                                    <tr className="th-list">
                                        <th className="px-3 py-2 bg-primary text-sm">STT
                                        </th>
                                        <th className="px-3 py-2 bg-primary text-sm">Mã nhân viên
                                        </th>
                                        <th className="px-3 py-2 bg-primary text-sm">Tên nhân viên
                                        </th>
                                        <th className="px-3 py-2 bg-primary text-sm">Ngày sinh
                                        </th>
                                        <th className="px-3 py-2 bg-primary text-sm">Địa chỉ
                                        </th>
                                        <th className="px-3 py-2 bg-primary text-sm">Căn Cước công dân
                                        </th>
                                        <th className="px-3 py-2 bg-primary text-sm">Số điện thoại
                                        </th>
                                        <th className="px-3 py-2 bg-primary text-sm">Ngày vào làm
                                        </th>
                                        <th className="px-3 py-2 bg-primary text-sm">Tài khoản
                                        </th>
                                        <th className="px-3 py-2 bg-primary text-sm">Ghi chú
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {employees.map((employee, index) => (
                                        <tr className="tr-employee " key={index} onClick={() => {
                                            if (deleteEmployee.id === null){
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Chọn thành công.',
                                                    showConfirmButton: false,
                                                    timer: 2000
                                                })
                                            }else if (deleteEmployee.id !== employee.id){
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Thay đổi thành công.',
                                                    showConfirmButton: false,
                                                    timer: 2000
                                                })
                                            }
                                            setDeleteEmployee(employee);
                                        }}>
                                            <td className="px-3 py-2 bg-white text-sm">{index + 1}</td>
                                            <td className="px-3 py-2 bg-white text-sm">{employee.codeEmployee}</td>
                                            <td className="px-3 py-2 bg-white text-sm"><img src={employee.image}
                                                                                            alt={employee.nameEmployee}
                                                                                            height="44.5" width="40"
                                                                                            style={{
                                                                                                borderRadius: "100px",
                                                                                                marginRight: "3px"
                                                                                            }}/>{employee.nameEmployee}
                                            </td>
                                            <td className="px-3 py-3 bg-white text-sm">{employee.birthday}</td>
                                            <td className="px-3 py-3 bg-white text-sm">{employee.address}</td>
                                            <td className="px-3 py-3 bg-white text-sm">{employee.idCard}</td>
                                            <td className="px-3 py-3 bg-white text-sm">{employee.phoneNumber}</td>
                                            <td className="px-3 py-3 bg-white text-sm">{employee.startDay}</td>
                                            <td className="px-3 py-3 bg-white text-sm">{employee.appUser.userName}</td>
                                            <td className="px-3 py-3 bg-white text-sm">{employee.note}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="justify-content-center d-flex rounded-bottom shadow">
                                <button className={`btn btn-primary ${page === 0 ? 'disabled' : ''}`}
                                        style={{margin: "5px"}}
                                        onClick={() => {
                                            if (page < totalPage && page > 0) {
                                                setPage((prev) => prev - 1)
                                            }
                                        }}>
                                    <AiOutlineDoubleLeft className=""/>
                                </button>
                                <div className="text-sm py-2 px-4"
                                     style={{
                                         background: "#0d6efd",
                                         color: "#ffffff",
                                         margin: "5px",
                                         borderRadius: "5px"
                                     }}>
                                    {page + 1}/{totalPage}
                                </div>
                                <button className={`btn btn-primary ${page === totalPage - 1 ? 'disabled' : ''}`}
                                        style={{margin: "5px"}}
                                        onClick={() => {
                                            if (page < totalPage) {
                                                setPage((prev) => prev + 1)
                                            }
                                        }}
                                >
                                    <AiOutlineDoubleRight className="mx-1"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="button-list-employee justify-content-end d-flex">

                    <a href="TanNV_CreateEmployee.html">
                        <button className="btn btn-light btn-outline-primary m-1">
                            <FaPlus className="mx-1"/> Thêm mới
                        </button>
                    </a>
                    <a href="TanNV_UpdateEmployee.html">
                        <button className="btn btn-light btn-outline-primary m-1">
                            <FiEdit className="mx-1"/> Sửa
                        </button>
                    </a>
                    <button className="btn btn-light btn-outline-primary m-1" onClick={() => {
                        checkDelete().then();
                    }}>
                        <FaRegTrashAlt/> Xoá
                    </button>
                    <a href="/HuyL_home.html">
                        <button className="btn btn-light btn-outline-primary m-1">
                            <AiOutlineRollback/>Trở về
                        </button>
                    </a>
                </div>

            </div>
        </>
    );
}

