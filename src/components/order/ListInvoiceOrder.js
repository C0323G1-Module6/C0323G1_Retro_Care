import {
    AiOutlineRollback,
    AiOutlineDoubleLeft,
    AiOutlineDoubleRight,
} from "react-icons/ai";
import React, {useEffect, useState} from "react";
import {getAllInvoiceOrder} from "../../services/order/OrderInvoice";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {Link} from "react-router-dom";
import {FaPlus, FaRegTrashAlt} from "react-icons/fa";
import {format, parseISO} from "date-fns";
import Swal from "sweetalert2";

const ListInvoiceOrder = () => {
    const [invoices, setInvoices] = useState([]);
    const [dateTimeOrder, setDateTimeOrder] = useState({
        startDateTime: "",
        endDateTime: ""
    });
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0)
    const [optionSort, setOptionSort] = useState("");
    const loadAllInvoice = async (pageList, dateTime, sortBy) => {
        try {
            const tmpInvoice = await getAllInvoiceOrder(pageList, dateTime, sortBy);
            setInvoices(tmpInvoice.data.content);
            setPage(tmpInvoice.data.pageable.pageNumber);
            setTotalPage(tmpInvoice.data.totalPages);
        }catch (err){
            console.log(err);
            if (err.response.data.startDateTime){
                Swal.fire({
                    icon: 'error',
                    text: err.response.data.startDateTime,
                })
            }
            if (err.response.data.endDateTime){
                Swal.fire({
                    icon: 'error',
                    text: err.response.data.endDateTime,
                })
            }
        }
    }

    const handleSelectSort = (value) => {
        setOptionSort(value);
    }
    useEffect(() => {
        document.title = "RetroCare - Danh sách bán hàng";
        loadAllInvoice(page, dateTimeOrder, optionSort);
    }, [page, dateTimeOrder, optionSort])

    return (
        <>
            <div>
                <h1 className="title-employee">Quản lý bán hàng</h1>
            </div>

            <div className="mx-auto container ">

                <fieldset className="border border-dark rounded-3 p-3 h-100 shadow-sm "
                          style={{backgroundColor: '#f8f9fa'}}>
                    <legend className="float-none w-auto px-3">Thông tin hóa đơn</legend>
                    <Formik
                        initialValues={{
                            startDateTime: "",
                            endDateTime: ""
                        }}
                        validationSchema={Yup.object({
                            startDateTime: Yup.string().required("Vui long nhập ngày bắt đầu"),
                            endDateTime: Yup.string().required("Vui long nhập ngày bắt đầu")
                        })}
                        onSubmit={async (values) => {
                            console.log(values)
                            setPage(0);
                            setDateTimeOrder((pre) => values);
                        }}
                    >
                        <Form>
                            <div className="row">
                                <div className="d-flex col-9">
                                    <label className="me-2 p-2">Từ ngày</label>
                                    <Field name="startDateTime" type={"date"} className={"form-control"}
                                           style={{width: "240px"}}/>
                                    <label className="mx-2 p-2">Đến ngày</label>
                                    <Field name="endDateTime" type={"date"} className={"form-control"}
                                           style={{width: "240px"}}/>
                                    <button type="submit" className="btn btn-outline-primary mx-2"><i className="fa-solid fa-magnifying-glass" />Tìm kiếm </button>
                                </div>
                                <div className="d-flex col-3 ">
                                    <label className="me-2 p-2">Sắp xếp theo</label>
                                    <select onChange={(event) => handleSelectSort(event.target.value)}
                                            className={"form-select"} style={{width: "180px"}}>
                                        <option value={"code"}>Mã hoá đơn</option>
                                        <option value={"nameCustomer"}>Tên khách hàng</option>
                                        <option value={"dateTimeAsc"}>Ngày lập tăng dần</option>
                                        <option value={"dateTimeDes"}>Ngày lập giảm dần</option>
                                        <option value={"nameEmployee"}>Người lập</option>
                                        <option value={"orderDetailsPriceAsc"}>Tổng tiền tăng dần</option>
                                        <option value={"orderDetailsPriceDes"}>Tổng tiền giảm dần</option>
                                    </select>
                                </div>
                            </div>
                        </Form>
                    </Formik>

                </fieldset>

                <div className="pt-2">
                    <div>
                        <div className="table-container rounded-top ">
                            <table className="table table-hover ">
                                <thead>
                                <tr className="th-list">
                                    <th className="px-3 py-2 bg-primary " style={{width:"130px"}}>Mã hoá đơn
                                    </th>
                                    <th className="px-3 py-2 bg-primary " style={{width:"260px"}}>Tên khách hàng
                                    </th>
                                    <th className="px-3 py-2 bg-primary " style={{width:"130px"}}>Ngày lập
                                    </th>
                                    {/* <th className="px-3 py-2 bg-primary " style={{width:"130px"}}>Giờ lập
                                    </th> */}
                                    <th className="px-3 py-2 bg-primary " style={{width:"260px"}}>Người lập
                                    </th>
                                    <th className="px-3 py-2 bg-primary " style={{width:"150px"}}>Tổng tiền (VNĐ)
                                    </th>
                                    <th className="px-3 py-2 bg-primary ">Ghi chú
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {invoices.length !==0?
                                    invoices.map((invoice, index) => (
                                            <tr>
                                                <td className={`px-3 py-3 `}>{invoice.code}</td>
                                               {invoice.nameCustomer ==null ?<td className={`px-3 py-3 `}>Khách lẻ</td>:<td className={`px-3 py-3 `}>{invoice.nameCustomer}</td> } 
                                                <td className={`px-3 py-3 `}>{format(parseISO(invoice.orderDate), "dd-MM-yyyy")}</td>
                                                {/* <td className={`px-3 py-3 `}>{invoice.orderTime}</td> */}
                                                {invoice.nameEmployee ==null ?<td className={`px-3 py-3 `}>Không có</td>:<td className={`px-3 py-3 `}>{invoice.nameEmployee}</td> } 
                                                <td className={`px-3 py-3 `}>{new Intl.NumberFormat("vi-VN").format(
                                                    invoice.orderDetailsPrice
                                                )}</td>
                                                <td className={`px-3 py-3 `}>{invoice.orderNote}</td>
                                            </tr>
                                        )
                                    ):<tr>
                                        <td colSpan="8" style={{textAlign:"center"}}>Không có dữ liệu</td>
                                    </tr>
                                }
                                </tbody>
                            </table>
                        </div>
                        <div
                            className={`justify-content-center d-flex rounded-bottom shadow ${
                                totalPage === 0 ? "d-none" : ""
                            }`}>
                            <button className={`btn btn-primary ${
                                page === 0 ? "disabled" : ""
                            }`}
                                    style={{margin: "5px"}}
                                    onClick={() => {
                                        if (page < totalPage && page > 0) {
                                            setPage((prev) => prev - 1);
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
                            <button className={`btn btn-primary ${
                                page === totalPage - 1 ? "disabled" : ""
                            }`}
                                    style={{margin: "5px"}}
                                    onClick={() => {
                                        if (page < totalPage) {
                                            setPage((prev) => prev + 1);
                                        }
                                    }}
                            >
                                <AiOutlineDoubleRight className="mx-1"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="button-list-employee justify-content-end d-flex">
                    <Link to="/dashboard/retail">
                        <button className="btn btn-light btn-outline-primary m-1">
                            <FaPlus className="mx-1"/> Thêm mới
                        </button>
                    </Link>
                    <Link to="/home">
                        <button className="btn btn-outline-primary m-1">
                            <AiOutlineRollback/>
                            Trở về
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default ListInvoiceOrder;