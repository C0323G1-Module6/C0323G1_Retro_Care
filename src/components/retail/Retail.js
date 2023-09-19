import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { addMedicineToCart, getCartDetailEmployee, getCustomerByPhone, getMedicineList } from "../services/retail/RetailService";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { format } from 'date-fns';
import { getCustomerByPhone, addMedicineToCart, getCartDetailEmployee, getMedicineList, setQuantityOfCart, deleteMedicineFromCart } from "../../services/retail/RetailService";

export default function Retail() {
    const [inputMedicine, setInputMedicine] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [customer, setCustomer] = useState({ name: "Khách lẻ", app_user_id: 1 })
    const [chooseMedicines, setChooseMedicines] = useState([]);
    const [listCart, setListCart] = useState([]);
    const [note, setNote] = useState("");
    const [sum, setSum] = useState(0);
    const [idCartDetail, setIdCartDetail] = useState(0);
    const [code, setCode] = useState("");
    const [date, setDate] = useState("");
    const app_user_id = 1;
    const navigate = useNavigate();
    

    useEffect(() => {
        getCart();
        setCode("HDL-" + Math.floor(100000 + Math.random() * 900000).toString())
        const currentDate = new Date();
        const currentDateString = format(currentDate, 'dd/MM/yyyy');
        setDate(currentDateString)
    }, [])

    useEffect(() => {
        let money = 0;
        listCart.forEach((e) => {
            money += (e.cd_quantity * e.price);
        })
        setSum((pre) => money);
    }, [listCart])

    useEffect(() => {
        findMedicine();
    }, [inputMedicine]);


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

    const openSwal = async () => {
        if (idCartDetail === 0) {
            return;
        }
        Swal.fire({
            title: "Delete Confirmation",
            text: "Do you want to delete: ",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Yes, delete it",
            icon: "question",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteMedicineFromCart(idCartDetail);
                if (response.status === 200) {
                    Swal.fire({
                        text: "Delete successfully ",
                        icon: "success",
                        timer: 1500,
                    });
                    setIdCartDetail(0);
                    await getCart();
                }

            } else {
                Swal.fire({
                    text: "You choose cancel ",
                    icon: "warning",
                    timer: 1500,
                });
            }
        });
    };


    const setQuantity = async (quantity, cart) => {
        await setQuantityOfCart(app_user_id, cart.m_id, quantity);
        await getCart();
    }

    const addMedicine = async () => {
        if (chooseMedicines.length == 1) {
            await addMedicineToCart(app_user_id, chooseMedicines[0].id, 1);
            await getCart();
        }
    }



    const getCart = async () => {
        const list = await getCartDetailEmployee(app_user_id);
        setListCart((pre) => list);
    }

    const getCustomer = async () => {
        if (phoneNumber === "") {
            setCustomer({ name: "Khách lẻ", app_user_id: 1 })
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





    return (
        <>


            <div className="container">
                <div className="row">
                    <div className="col-md-4">
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
                                onChange={(event) => setPhoneNumber(event.target.value)} />
                            <button className="btn btn-primary" onClick={() => getCustomer()}>Tìm</button>
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
                        <div>
                            <label htmlFor="employee">Nhân viên</label>
                            <input id="employee" name="employee" value="Nguyễn Long Vũ" readOnly className="form-control" />
                            <label htmlFor="date">Ngày lập</label>
                            <input id="date" name="date" value={date} className="form-control" readOnly />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <label htmlFor="note">Ghi chú</label>
                            <textarea cols="20" rows="3" id="note" name="note" className="form-control"
                                value={note} onChange={(event) => setNote(event.target.value)} />
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
                            <tr style={{ backgroundColor: 'rgb(13, 110, 253)', height: '40px' }}>
                                <th>Tên thuốc</th>
                                <th>Đơn vị tính</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listCart.map((cart) => (
                                <tr key={cart.cd_id}
                                    style={idCartDetail === cart.cd_id ? { backgroundColor: "yellow" } : {}}
                                    onClick={() => handleRowClick(cart.cd_id)} >
                                    <td>{cart.name}</td>
                                    <td>{cart.conversion_unit}</td>
                                    <td><input type="number" value={cart.cd_quantity} defaultValue={cart.cd_quantity}
                                        onChange={(event) => setQuantity(event.target.value, cart)} /></td>
                                    <td>{cart.price}</td>
                                    <td>{cart.price * cart.cd_quantity}</td>
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
                                        className="btn btn-outline-primary"
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
                <div className="row" style={{ textAlign: 'right', display: 'flex' }}>
                    <div className="col-7" style={{ textAlign: 'left' }}>
                        <b>TỔNG TIỀN: </b>
                        <b>{sum} Đồng</b>
                    </div>
                    <div className="col-5">
                        <button className="btn btn-outline-primary">Thanh toán</button>
                        <a
                            type="button"
                            onClick={() => openSwal()}
                            class="btn btn-outline-primary"
                        >
                            <i className="fa-solid fa-trash"></i> Xoá
                        </a>
                        <button className="btn btn-outline-primary">In phiếu</button>
                        <a className="btn btn-outline-primary" >
                            <i class="fa-regular fa-circle-left"></i>Trở về </a>
                    </div>
                </div>
            </div>
        </>
    );
}