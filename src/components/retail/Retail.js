import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { addMedicineToCart, getCartDetailEmployee, getCustomerByPhone, getMedicineList } from "../services/retail/RetailService";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swal from "sweetalert2";
import { format } from 'date-fns';
import { getCustomerByPhone, addMedicineToCart, getCartDetailEmployee, getMedicineList, setQuantityOfCart, deleteMedicineFromCart, payWhenSell, getNameEmployee, getOneMedicineByName } from "../../services/retail/RetailService";
import { addJwtTokenToLocalStorage, getIdByUserName, infoAppUserByJwtToken } from "../../services/user/AppUserService";
import jsPDF from "jspdf";
import diacriticless from "diacriticless";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import {AiOutlineRollback, AiOutlinePrinter} from "react-icons/ai";
import {BsReceiptCutoff} from "react-icons/bs"






export default function Retail() {
    const [inputMedicine, setInputMedicine] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [customer, setCustomer] = useState({ name: "Khách lẻ", app_user_id: -1 })
    const [chooseMedicines, setChooseMedicines] = useState([]);
    const [listCart, setListCart] = useState([]);
    const [note, setNote] = useState("");
    const [sum, setSum] = useState(0);
    const [idCartDetail, setIdCartDetail] = useState(0);
    const [code, setCode] = useState("");
    const [date, setDate] = useState("");
    const [user, setUser] = useState({});
    const [employeeName, setEmployeeName] = useState("");
    const [app_user_id, setApp_user_id] = useState(0);

    const navigate = useNavigate();


    useEffect(() => {
        getStart();
        document.title="RetroCare - bán lẻ";
    }, [])

    const getStart = async () => {
        setCode("OR" + Math.floor(1000 + Math.random() * 9000).toString())
        const currentDate = new Date();
        const currentDateString = format(currentDate, 'dd-MM-yyyy');
        setDate(currentDateString)
        getUser();
    }

    useEffect(() => {
        let money = 0;
        listCart.forEach((e) => {
            money += (e.cd_quantity * e.price);
        })
        setSum((pre) => money);
    }, [listCart])


    const getAppUserId = async (name) => {
        const id = await getIdByUserName(name);
        setApp_user_id((pre) => id.data);
    }


    const getEmployeeName = async () => {
        const name = await getNameEmployee(app_user_id);
        setEmployeeName((pre) => name);
    }

    useEffect(() => {
        findMedicine();
    }, [inputMedicine]);

    useEffect(() => {
        getEmployeeName(app_user_id)
        getCart();
    }, [app_user_id])

    const getUser = async () => {
        const data = await infoAppUserByJwtToken(); // Sử dụng await để đợi hàm không đồng bộ hoàn thàn
        try {
            await getAppUserId(data.sub)
        } catch (e) {

        }
    }


    const toRetailPrescriptionInformation = () => {
        navigate("/dashboard/retail/prescription-list")
    }


    const handleRowClick = (index) => {
        if (index == idCartDetail) {
            setIdCartDetail(0);
        } else {
            setIdCartDetail(index);
        }
    }

    const openSwalWhenSuccess = () => {
        Swal.fire({
            text: "Đã thanh toán",
            icon: "success",
            timer: 1000,
        });
    }

    const openSwal = async () => {
        if (idCartDetail === 0) {
            Swal.fire({
                text: "Bạn chưa chọn gì để xóa",
                icon: "warning",
                timer: 1000,
            });
            return;
        }
        Swal.fire({
            title: "Xác nhận xóa",
            text: "Bạn có thực sự muốn xóa: ",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Có, xóa đi",
            cancelButtonText: "Hủy",
            icon: "question",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteMedicineFromCart(idCartDetail);
                if (response.status === 200) {
                    Swal.fire({
                        text: "Xóa thành công ",
                        icon: "success",
                        timer: 1000,
                    });
                    setIdCartDetail(0);
                    await getCart();
                }

            } else {
                Swal.fire({
                    text: "Đã hủy",
                    icon: "warning",
                    timer: 1000,
                });
            }
        });
    };


    const setQuantity = async (quantity, cart) => {
        if (quantity > 0) {
            await setQuantityOfCart(app_user_id, cart.m_id, quantity);
            await getCart();
        }
    }

    const addMedicine = async () => {
        try {
            const medicine = await getOneMedicineByName(inputMedicine);
            if (medicine !== null) {
              await addMedicineToCart(app_user_id, medicine.id, 1);
              await getCart();
            }
          } catch (error) {
          }
    }



    const getCart = async () => {
        const list = await getCartDetailEmployee(app_user_id);
        setListCart((pre) => list);
    }

    const getCustomer = async () => {
        if (phoneNumber === "") {
            setCustomer({ name: "Khách lẻ", app_user_id: -1 })
        } else {
            const customer = await getCustomerByPhone(phoneNumber);
            if (customer == "") {
                setCustomer({ name: "Không tìm thấy", app_user_id: 0 })
            } else {
                setCustomer((pre) => customer);
            }


        }
    }

    const findMedicine = async () => {
        if (inputMedicine === "") {
            setChooseMedicines([]);
        } else {
            const list = await getMedicineList(inputMedicine);
            setChooseMedicines(list);
        }
    };

    const pay = async () => {
        if (customer.app_user_id === 0) {
            Swal.fire({
                title: "Chưa có khách hàng",
                text: "Xóa ô số điện thoại và bấm tìm để ra khách lẻ",
                icon: "warning",
                timer: 3000,
            });
            return;
        }
        if (listCart.length === 0) {
            Swal.fire({
                text: "Chưa có gì để thanh toán",
                icon: "warning",
                timer: 1500,
            });
            return;
        }
        const res = await payWhenSell(customer.app_user_id, app_user_id, code, note);
        if (res.data == true) {
            await getCart();
            clickSprintBill("da thanh toan");
            openSwalWhenSuccess();
            setCode("HDL-" + Math.floor(100000 + Math.random() * 900000).toString());
        } else {
            Swal.fire({
                text: `Thuốc ${res.data} không đủ, hãy kiểm tra lại`,
                icon: "error",
                timer: 2000,
            });
        }
    }

    const clickSprintBill = (status) => {
        if (customer.app_user_id === 0) {
            Swal.fire({
                text: "Chưa có khách hàng",
                icon: "warning",
                timer: 1500,
            });
            return;
        }
        if (listCart.length === 0) {
            Swal.fire({
                text: "Chưa có gì để in hoá đơn",
                icon: "warning",
                timer: 1500,
            });
            return;
        }
        const content = {
            "customer": customer,
            "listCart": listCart,
            "code": code,
            "note": note,
            "sum": sum,
            "content": status
        }

        handleGeneratePDF(content, status);
    }

    const handleGeneratePDF = async (content, status) => {
        // Tạo đối tượng jsPDF
        const doc = new jsPDF();
      
        const billContent = `
        HOA DON      ${status}
        -----------------------------
        Ma hoa don: ${code}
        -----------------------------
        Khach hang: ${diacriticless(content.customer.name)}
        -----------------------------
        
        `;
      
        // Định dạng và vẽ nội dung hóa đơn
        doc.setFont('Arial', 'bold');
        doc.setFontSize(16);
        doc.text(billContent, 10, 10);
      
        // Vẽ tiêu đề bảng
        const tableHeader = ['STT', 'Ten san pham', 'So luong', 'Gia', 'Thanh tien'];
        const tableHeaderX = 30;
        const tableHeaderY = 70;
        const tableHeaderFontSize = 12;
      
        doc.setFont('Arial', 'bold');
        doc.setFontSize(tableHeaderFontSize);
        doc.text(tableHeader.join('        '), tableHeaderX, tableHeaderY);
      
        // Vẽ dữ liệu sản phẩm
        const tableDataX = 30;
        const tableDataY = 80;
        const tableDataFontSize = 12;
      
        doc.setFont('Arial', 'normal');
        doc.setFontSize(tableDataFontSize);
        listCart.forEach((product, index) => {
          const { name, cd_quantity, price } = product;
          const rowData = [
            index + 1,
            diacriticless(name),
            cd_quantity,
            price,
            cd_quantity * price,
          ];
          const rowY = tableDataY + index * 10;
          rowData.forEach((data, columnIndex) => {
            const columnX = tableDataX + columnIndex * 30;
            doc.text(data.toString(), columnX, rowY);
          });
        });
      
        // Vẽ tổng giá trị hóa đơn
        const sumX = 30;
        const sumY = tableDataY + listCart.length * 10 + 10;
      
        doc.setFont('Arial', 'bold');
        doc.text(`Tong: ${sum}`, sumX, sumY);
      
        // Vẽ ghi chú
        const noteX = 30;
        const noteY = sumY + 10;
      
        doc.setFont('Arial', 'normal');
        doc.text(diacriticless(note), noteX, noteY);
      
        // Lưu tài liệu PDF
        doc.save('example.pdf');
      };

    return (
        <>


            <div className="container">
            <div className="row header">
                    <h1 className="mt-4 mb-3" style={{textAlign: 'center', color: '#0D6EFD'}}>HỆ THỐNG BÁN LẺ</h1>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-2">
                        <div>
                            <label htmlFor="id">Số phiếu</label>
                            <input id="id" name="id" value={code} readOnly className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="align-center">
                            <label htmlFor="phoneNumber">Số điện thoại</label>
                        </div>
                        <div className="align-center d-flex align-items-center">
                            <input id="phoneNumber" className="form-control" value={phoneNumber}
                                onChange={(event) => {
                                    if (event.target.value.length <= 15) {
                                        setPhoneNumber(event.target.value)
                                    }
                                }} />
                            <button className="btn btn-outline-primary ms-2" onClick={() => getCustomer()}>Tìm</button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div>
                            <label htmlFor="customer">Khách hàng</label>
                            <input id="customer" name="customer" value={customer.name} readOnly className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="mb-2">
                            <label htmlFor="employee">Nhân viên</label>
                            <input id="employee" name="employee" value={employeeName} readOnly className="form-control" />
                        </div>
                        <div>
                        <label htmlFor="date">Ngày lập</label>
                            <input id="date" name="date" value={date} className="form-control" readOnly />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <label htmlFor="note">Ghi chú</label>
                            <textarea cols="20" rows="4" id="note" name="note" className="form-control"
                                value={note} onChange={(event) => {
                                    if (event.target.value.length < 255) {
                                        setNote(event.target.value)
                                    }
                                }} />
                        </div>
                    </div>
                    <div className="col-md-4" style={{ paddingTop: '28px', textAlign: 'center' }}>
                        <a className="btn btn-outline-primary"
                            onClick={() => toRetailPrescriptionInformation()}
                        >
                            Nhập thuốc từ toa sẵn
                        </a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4"></div>
                </div>
                <br />
                <div className="note-frame border border-dark rounded-3">
                    <table className="table rounded-3 overflow-hidden">
                        <thead>
                            <tr className="text-light" style={{ backgroundColor: 'rgb(13, 110, 253)', height: '40px' }}>
                                <th>Tên thuốc</th>
                                <th>Số lượng</th>
                                <th>Đơn vị tính</th>
                                <th>Đơn giá (VNĐ)</th>
                                <th>Thành tiền (VNĐ)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listCart.map((cart) => (
                                <tr key={cart.cd_id}
                                    style={idCartDetail === cart.cd_id ? { backgroundColor: 'rgb(98, 158, 236)' } : {}}
                                >
                                    <td  onClick={() => handleRowClick(cart.cd_id)}>{cart.name}</td>
                                    <td><input type="number" value={cart.cd_quantity} style={{width:"50px"}} defaultValue={cart.cd_quantity}
                                        onChange={(event) => setQuantity(event.target.value, cart)} />
                                        {cart.cd_quantity > cart.m_quantity && 
                                        <p style={{ margin: "0 5px 0" }}>  Chỉ còn {cart.m_quantity} {cart.conversion_unit}</p>
                                        }
                                    </td>
                                    <td onClick={() => handleRowClick(cart.cd_id)}>{cart.conversion_unit.toLocaleString()}</td>
                                    <td onClick={() => handleRowClick(cart.cd_id)}>{new Intl.NumberFormat("vi-VN").format(cart.price)}</td>
                                    <td onClick={() => handleRowClick(cart.cd_id)}>{new Intl.NumberFormat("vi-VN").format(cart.price * cart.cd_quantity)}</td>
                                </tr>
                            ))}
                            <tr>
                                <td>
                                    <input type="text" className="form-control" placeholder="Tìm thuốc..." id="search-input"
                                        value={inputMedicine}
                                        onChange={(event) => {
                                            setInputMedicine(event.target.value)
                                        }}

                                        list="medicine-options"

                                    />
                                    <a
                                        className="btn btn-outline-primary mt-2"
                                        onClick={() => addMedicine()}
                                    >
                                        <FaPlus className="mx-1" />
                                        Thêm mới
                                    </a>
                                    <datalist id="medicine-options" >
                                        {chooseMedicines.map((medicine, index) => (
                                            <option key={medicine.id} value={medicine.name} ></option>

                                        ))}
                                    </datalist>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br />
                <div className="row d-flex align-items-center justify-content-between" style={{ textAlign: 'right'}}>
                    <div className="col-7 border border-1 border-dark w-25 rounded ms-2 d-flex justify-content-center p-2" style={{ textAlign: 'left' }}>
                        <b>TỔNG TIỀN: {new Intl.NumberFormat("vi-VN").format(sum)} VNĐ</b>
                    </div>
                    <div className="col-5 d-flex align-items-center justify-content-end gap-2">
                        <button className="btn btn-outline-primary" onClick={() => pay()}><BsReceiptCutoff size={18} className="me-1"/>Thanh toán</button>
                        <a
                            type="button"
                            onClick={() => openSwal()}
                            class="btn btn-outline-primary"
                        >
                            <FaRegTrashAlt/> Xoá
                        </a>
                        <button className="btn btn-outline-primary" onClick={() => clickSprintBill("Chua thanh toan")}><AiOutlinePrinter size={18} className="me-1"/>In phiếu</button>
                        <Link to={'/dashboard/ListInvoiceOrder'} className="btn btn-outline-primary" >
                            <AiOutlineRollback size={18} className="me-1" />Trở về </Link>
                    </div>
                </div>
            </div>
        </>
    );
}


