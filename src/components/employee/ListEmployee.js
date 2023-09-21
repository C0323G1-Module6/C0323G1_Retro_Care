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
import {Link} from "react-router-dom";
import * as Yup from "yup";
import {format , parseISO } from "date-fns";

export default function ListEmployee() {
    const [employees, setEmployee] = useState([]);
    const [pageList, setPageList] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const limit = 5;
    const [sort, setSort] = useState('code_employee');
    const [searchEmployee, setSearchEmployee] = useState('');
    const [deleteEmployee, setDeleteEmployee] = useState('');
    const [message, setMessage] = useState('');
    const getList = async () => {
        try {
            const data = await getListEmployee(pageList, limit, sort, searchEmployee);
            setMessage('')
            setEmployee(data.content);
            setPageList(data.pageable.pageNumber);
            setTotalPage(data.totalPages);
        } catch (noContent) {
            setMessage('Không có dữ liệu trên hệ thống')
            setEmployee([]);
            setPageList(0);
            setTotalPage(0);
        }
    }
    useEffect(() => {
        getList();
    }, [pageList, sort]);
    const checkSearch = async (nameEmployee) => {
        setSearchEmployee(nameEmployee);
        setPageList(0);
        try {
            const data = await getListEmployee(pageList, limit, sort, nameEmployee);
            setMessage('')
            setEmployee(data.content);
            setPageList(data.pageable.pageNumber);
            setTotalPage(data.totalPages);
            await Swal.fire({
                icon: 'success',
                title: 'Đã tìm thấy dữ liệu.',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (noContent) {
            Swal.fire({
                icon: 'warning',
                title: 'Không tìm thấy dữ liệu.',
                showConfirmButton: false,
                timer: 1500
            })
            setMessage("Không tìm thấy thông tin nhân viên trên hệ thống.")
            setEmployee([]);
            setPageList(0);
            setTotalPage(0);
        }

    }

    const checkDelete = async () => {
        if (deleteEmployee !== '') {
            Swal.fire({
                    title: 'Bạn muốn xoá nhân viên có tên: ' + deleteEmployee.nameEmployee + ' ?',
                    html: '<p style="color: red;">Bạn sẽ không thể khôi phục nhân viên này.</p>',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Xác nhận ',
                    cancelButtonText: 'Huỷ',
                    reverseButtons: true
                }
            ).then(async (res) => {
                if (res.isConfirmed) {
                    const response = await deleteEmployees(deleteEmployee.id);
                    if(response.status === 200){
                        getList().then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Xoá Thành công.',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        });
                    }else {
                        getList().then(() => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Xoá thất bại.',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        });
                    }
                }else {
                    getList().then(() => {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Đã huỷ xoá thành công.',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    });
                }
            })
        }else {
            Swal.fire({
                icon: 'warning',
                title: 'Vui lòng chọn nhân viên trước khi thực hiện thao tác.',
                showConfirmButton: false,
                timer: 2000
            })
        }
    }
    return (
        <>
            <div className="container">
                <div>
                    <h1 className="title-employee">Quản lý nhân viên</h1>
                </div>
                <div className="mt-3 mb-2">
                    <div className="justify-content-between d-flex filter-employee">
                        <div>
                            <Formik initialValues={{
                                nameEmployee: ""
                            }}
                                    validationSchema={Yup.object({
                                        nameEmployee: Yup.string().max(100)
                                    })}
                                    onSubmit={(values) => {
                                        checkSearch(values.nameEmployee).then();
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
                                        Tìm kiếm
                                    </button>
                                </Form>
                            </Formik>
                        </div>
                        <div className="ms-4">
                            <Formik initialValues={{sort: ''}}>
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
                                        <th className="px-3 py-2 bg-primary ">Mã nhân viên
                                        </th>
                                        <th className="px-3 py-2 bg-primary ">Tên nhân viên
                                        </th>
                                        <th className="px-3 py-2 bg-primary ">Ngày sinh
                                        </th>
                                        <th className="px-3 py-2 bg-primary ">Địa chỉ
                                        </th>
                                        <th className="px-3 py-2 bg-primary ">Căn cước công dân
                                        </th>
                                        <th className="px-3 py-2 bg-primary ">Số điện thoại
                                        </th>
                                        <th className="px-3 py-2 bg-primary ">Ngày vào làm
                                        </th>
                                        <th className="px-3 py-2 bg-primary ">Tài khoản
                                        </th>
                                        <th className="px-3 py-2 bg-primary ">Ghi chú
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {message !== '' && (
                                        <tr>
                                            <td colSpan="10" className="text-center"><p>{message}</p></td>
                                        </tr>)
                                    }

                                    {employees !== [] && (employees.map((employee, index) => (
                                        <tr className={`tr-employee ${deleteEmployee && deleteEmployee.id === employee.id ? 'check-delete-employee' : ''}`} key={index}
                                            onClick={() => {
                                            if (deleteEmployee === '') {
                                                setDeleteEmployee(employee);
                                            } else if (deleteEmployee.id !== employee.id) {
                                                setDeleteEmployee(employee);
                                            }else {
                                                setDeleteEmployee('');
                                            }

                                        }}>
                                            <td className={`px-3 py-2 `}>{index + 1}</td>
                                            <td className={`px-3 py-2 `}>{employee.codeEmployee}</td>
                                            <td className={`px-5 py-2 `}><img src={employee.image}
                                                                                            alt={employee.nameEmployee}
                                                                                            height="44.5" width="40"
                                                                                            style={{
                                                                                                borderRadius: "100px",
                                                                                                marginRight: "3px"
                                                                                            }}/>{employee.nameEmployee}
                                            </td>
                                            <td className={`px-3 py-3 `}>{format(parseISO(employee.birthday), 'dd/MM/yyyy')}</td>
                                            <td className={`px-3 py-3 `}>{employee.address}</td>
                                            <td className={`px-3 py-3 `}>{employee.idCard}</td>
                                            <td className={`px-3 py-3 `}>{employee.phoneNumber}</td>
                                            <td className={`px-3 py-3 `}>{format(parseISO(employee.startDay), 'dd/MM/yyyy')}</td>
                                            <td className={`px-3 py-3 `}>{employee.appUser.userName}</td>
                                            <td className={`px-3 py-3 `}>{employee.note}</td>
                                        </tr>
                                    )))}
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className={`justify-content-center d-flex rounded-bottom shadow ${totalPage === 0 ? 'd-none' : ''}`}>
                                <button className={`btn btn-primary ${pageList === 0 ? 'disabled' : ''}`}
                                        style={{margin: "5px"}}
                                        onClick={() => {
                                            if (pageList < totalPage && pageList > 0) {
                                                setPageList((prev) => prev - 1)
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
                                     }}>{pageList + 1}/{totalPage}
                                </div>
                                <button className={`btn btn-primary ${pageList === totalPage - 1 ? 'disabled' : ''}`}
                                        style={{margin: "5px"}} onClick={() => {
                                            if (pageList < totalPage) {
                                                setPageList((prev) => prev + 1)
                                            }
                                        }}>
                                    <AiOutlineDoubleRight className="mx-1"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="button-list-employee justify-content-end d-flex">
                    <Link to="/dashboard/employee/create">
                        <button className="btn btn-light btn-outline-primary m-1">
                            <FaPlus className="mx-1"/> Thêm mới
                        </button>
                    </Link>
                    {deleteEmployee !== '' ?
                        <Link to={"/dashboard/employee/update/"+ deleteEmployee.id}>
                            <button className="btn btn-light btn-outline-primary m-1">
                                <FiEdit className="mx-1"/> Sửa
                            </button>
                        </Link> :
                        <button className="btn btn-light btn-outline-primary m-1">
                            <FiEdit className="mx-1"/> Sửa
                        </button>}
                    <button className="btn btn-light btn-outline-primary m-1" onClick={() => {
                        checkDelete().then();
                    }}>
                        <FaRegTrashAlt/> Xoá
                    </button>
                    <Link to="/home">
                        <button className="btn btn-light btn-outline-primary m-1">
                            <AiOutlineRollback/>Trở về
                        </button>
                    </Link>
                </div>

            </div>
        </>
    );
}

