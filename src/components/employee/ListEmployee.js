import "./ListEmployee.css";
import {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import {FaPlus, FaRegTrashAlt} from "react-icons/fa";
import {FiEdit} from "react-icons/fi";
import {
    AiOutlineRollback,
    AiOutlineDoubleLeft,
    AiOutlineDoubleRight, AiOutlineFileSearch,
} from "react-icons/ai";
import {Field, Form, Formik} from "formik";

export default function ListEmployee() {
    const [employees, setEmployee] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const limit = 5;
    const [sort, setSort] = useState('code_employee');
    const [searchEmployee, setSearchEmployee] = useState([]);

    return (
        <>
            <div className="container mt-3 ">
                <div>
                    <h1 className="title-employee">Quản lý nhân viên</h1>
                </div>

                <div className="mt-3 mb-2">
                    <div className="justify-content-between d-flex filter-employee">
                        <div>
                            <Formik initialValues={{
                                idPosition: "",
                                nameEmployee: ""
                            }}
                                    onSubmit={(values)=>{

                                    }}>
                                <Form>
                                    <span>Lọc theo:</span>
                                    <Field as="select" name="idPosition" className="input-search">
                                        <option value="" disabled selected>Chức vụ</option>
                                        <option value={1}>Nhân viên</option>
                                        <option value={0}>Quản Lý</option>
                                    </Field>
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
                            <span>Sắp xếp: </span>
                            <select className="input-search">
                                <option>Mã nhân viên</option>
                                <option>Tên nhân viên</option>
                                <option>Chức vụ</option>
                            </select>
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
                                        <th className="px-3 py-3 bg-primary text-sm">STT
                                        </th>
                                        <th className="px-3 py-3 bg-primary text-sm">Mã nhân viên
                                        </th>
                                        <th className="px-3 py-3 bg-primary text-sm">Tên nhân vien
                                        </th>
                                        <th className="px-3 py-3 bg-primary text-sm">Ngày sinh
                                        </th>
                                        <th className="px-3 py-3 bg-primary text-sm">Địa chỉ
                                        </th>
                                        <th className="px-3 py-3 bg-primary text-sm">Căn Cước công dân
                                        </th>
                                        <th className="px-3 py-3 bg-primary text-sm">Số điện thoại
                                        </th>
                                        <th className="px-3 py-3 bg-primary text-sm">Ngày vào làm
                                        </th>
                                        <th className="px-3 py-3 bg-primary text-sm">Tài khoản
                                        </th>
                                        <th className="px-3 py-3 bg-primary text-sm">Chức vụ
                                        </th>
                                        <th className="px-3 py-3 bg-primary text-sm">Ghi chú
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="tr-employee ">
                                        <td className="px-3 py-3 bg-white text-sm">1</td>
                                        <td className="px-3 py-3 bg-white text-sm">NV1</td>
                                        <td className="px-3 py-3 bg-white text-sm"><img src="mau-anh-the-1.jpg"
                                                                                        height="25" width="25"
                                                                                        style={{borderRadius: "100px"}}/>Thanh
                                            Son
                                        </td>
                                        <td className="px-3 py-3 bg-white text-sm">12/09/2001</td>
                                        <td className="px-3 py-3 bg-white text-sm">Đà Nẵng</td>
                                        <td className="px-3 py-3 bg-white text-sm">923475826123</td>
                                        <td className="px-3 py-3 bg-white text-sm">012384754</td>
                                        <td className="px-3 py-3 bg-white text-sm">02/12/2023</td>
                                        <td className="px-3 py-3 bg-white text-sm">thanhson</td>
                                        <td className="px-3 py-3 bg-white text-sm">Nhân viên</td>
                                        <td className="px-3 py-3 bg-white text-sm">Thông tin cá nhân</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="justify-content-center d-flex rounded-bottom shadow">
                                <button className="btn btn-primary" style={{margin: "5px"}}>
                                    <AiOutlineDoubleLeft className=""/>
                                </button>
                                <div className="text-sm py-2 px-4"
                                     style={{
                                         background: "#0d6efd",
                                         color: "#ffffff",
                                         margin: "5px",
                                         borderRadius: "5px"
                                     }}>
                                    1/5
                                </div>
                                <button className="btn btn-primary" style={{margin: "5px"}}>
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
                    <button className="btn btn-light btn-outline-primary m-1" data-bs-toggle="modal"
                            data-bs-target="#exampleModal">
                        <FaRegTrashAlt/> Xoá
                    </button>
                    <a href="/HuyL_home.html">
                        <button className="btn btn-light btn-outline-primary m-1">
                            <AiOutlineRollback/>Trở về
                        </button>
                    </a>
                </div>
                {/*modal*/}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Thông Báo </h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có muốn xoá nhân viên có tên: Thanh Son</p>
                                <p style={{color: "red", margin: 0, paddingTop: "5px"}}>* Hành động này không thể được
                                    hoàn
                                    tác</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Huỷ
                                </button>
                                <button type="button" className="btn btn-primary">
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

