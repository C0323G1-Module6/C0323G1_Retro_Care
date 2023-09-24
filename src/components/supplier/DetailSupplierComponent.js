import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    detailSupplierById,
    getSupplierDetailById
} from "../../services/supplier/SupplierService";
import Swal from "sweetalert2";
import { format } from 'date-fns';
import {
    AiOutlineRollback,
    AiOutlineDoubleLeft,
    AiOutlineDoubleRight,
  } from "react-icons/ai";

function DetailSupplierComponent() {
    const { idSupplier } = useParams();
    const [invoices, setInvoices] = useState([]);
    const [supplier, setSupplier] = useState({});
    let [page, setPage] = useState(0);
    let [startDate, setStartDate] = useState('');
    let [endDate, setEndDate] = useState('');
    const navigate = useNavigate();


    const getSupplier = async () => {
        try {
            const data = await getSupplierDetailById(idSupplier);
            setSupplier(data);        
        } catch (e) {
            if (e.response.status === 400 || e.response.status === 404) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi kết nối',
                    text: 'Không tìm thấy nhà cung cấp',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            navigate("/dashboard/supplier");
        }
    }

    const getListInVoice = async (pageable, startDate, endDate) => {
        try {
            const invoiceData = await detailSupplierById(idSupplier, pageable, startDate, endDate);
            setInvoices(invoiceData);
        } catch (error) {
            await setPageFunction(0)
                .then(await setHandleStartDate(''))
                .then(await setHandleEndDdate(''))
            Swal.fire({
                icon: 'error',
                title: 'Không tìm thấy hoá đơn',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    useEffect(() => {
        document.title = 'RetroCare - Chi tiết nhà cung cấp'
        document.body.style.backgroundColor = '#edf2f7';
        getSupplier()
        getListInVoice(page, startDate, endDate)
    }, [idSupplier])
    const setPageFunction = async (pageAfter) => {
        setPage(pageAfter)
    }
    const setHandleStartDate = async (startDate) => {
        setStartDate(startDate)
    }
    const setHandleEndDdate = async (endDate) => {
        setEndDate(endDate)
    }
    const performSearch = async () => {
        try {
            const startDate = document.getElementById("startDate").value;
            const endDate = document.getElementById("endDate").value;
            await setPageFunction(0)
                .then(await setHandleStartDate(startDate))
                .then(await setHandleEndDdate(endDate))
                .then(getListInVoice(0, startDate, endDate));
        } catch (error) {
            console.log(error);
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của phím Enter
            performSearch();
        }
    }


    const nextPage = async () => {
        page += 1;
        if (page < invoices.totalPages) {
            await setPageFunction(page).then((await getListInVoice(page, startDate, endDate)))
        } else {
            page -= 1
        }
    }
    const previousPage = async () => {
        if (page >= 1) {
            page -= 1
        }
        await setPageFunction(page).then((await getListInVoice(page, startDate, endDate)))
    }
    const changePrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    if (!invoices) {
        return null;
    }

    return (
        <>
            <div>
                <div className="antialiased font-sans bg-gray-200" style={{ backgroundColor: '#edf2f7' }}>
                    <div className="container mx-auto sm:px-8">
                        <div>
                            <div>
                                <h1 className="text-2xl font-semibold leading-tight"
                                    style={{ textAlign: 'center', color: 'rgb(13, 110, 253)' }}>DANH SÁCH
                                    HOÁ ĐƠN NHÀ CUNG CẤP</h1>
                            </div>
                            <div className="information" style={{
                                border: '3px solid lightgrey',
                                padding: '20px 50px 20px 50px',
                                borderRadius: '7px'
                            }}>
                                <h3 style={{ marginBottom: '13px' }} >Thông tin nhà
                                    cung cấp</h3>
                                <div className="row row-information1">
                                    <div className="col-6 col-information"
                                    >Mã
                                        nhà
                                        cung cấp: {supplier.codeSupplier}
                                    </div>
                                    <div className="col-6 col-information"
                                    >Tên
                                        nhà
                                        cung cấp: {supplier.nameSupplier}
                                    </div>
                                </div>
                                <hr />
                                <div className="row row-information1">
                                    <div className="col-6 col-information"
                                    >Địa
                                        chỉ: {supplier.address}
                                    </div>
                                    <div className="col-6 col-information"
                                    >Số
                                        điện thoại: {supplier.phoneNumber}
                                    </div>
                                </div>
                                <hr />
                                <div className="row row-information1">
                                    <div className="col-6 col-information"
                                    >Công
                                        nợ: {supplier.debt} VNĐ
                                    </div>
                                    <div className="col-6 col-information"
                                    >Chú
                                        thích: {supplier.note}
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="row row-input-search">
                                <input type="date" id="startDate" defaultValue={''} onKeyPress={handleKeyPress} style={{
                                    width: '200px',
                                    marginRight: '10px',
                                    marginLeft: '10px',
                                    borderRadius: '5px',
                                    boxSizing: 'border-box',
                                    borderWidth: 0,
                                    borderStyle: 'solid',
                                    borderColor: '#e2e8f0'
                                }} className="appearance-none pl-8 pr-6 py-2 bg-white text-sm focus:outline-none" />
                                <input type="date" id="endDate" defaultValue={''} onKeyPress={handleKeyPress} style={{
                                    width: '200px',
                                    borderRadius: '5px',
                                    boxSizing: 'border-box',
                                    borderWidth: 0,
                                    borderStyle: 'solid',
                                    borderColor: '#e2e8f0'
                                }} className="appearance-none pl-8 pr-6 py-2 bg-white text-sm focus:outline-none" />
                                <div className=" col-7" style={{ display: 'flex' }}>
                                    <div className="btn btn-outline-primary col-4"
                                        onClick={async () => {
                                            await performSearch();
                                        }}
                                        style={{ marginRight: 'auto', width: '100px' }}>
                                        Tìm kiếm
                                    </div>
                                </div>
                            </div>
                            <div className="block relative">
                            </div>
                            <div className="-mx-4 sm:-mx-8 sm:px-8 py-4 overflow-x-auto">
                                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden" style={{ borderRadius: '10px' }}>
                                    <table className="min-w-full leading-normal table table-hover">
                                        <thead>
                                            <tr style={{ background: '#0d6efd', color: '#ffffff' }}>
                                                <th className="px-3 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                </th>
                                                <th className="px-3 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                    Mã Hợp đồng
                                                </th>
                                                <th className="px-3 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                    Số CT
                                                </th>
                                                <th className="px-3 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                    Ngày lập
                                                </th>
                                                <th className="px-3 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                    Giờ lập
                                                </th>
                                                <th className="px-3 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                    Tổng tiền
                                                </th>
                                                <th className="px-3 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                    Nợ hoá đơn
                                                </th>
                                            </tr>
                                        </thead>
                                        {invoices.content && invoices.content.length !== 0 ?
                                            <tbody>
                                                {invoices.content.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                                                                <div className="flex items-center">
                                                                    <div className="ml-3">
                                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                                            {(page * 5) + (index + 1)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {item.codeInvoice}
                                                                </p>
                                                            </td>
                                                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {item.documentNumber}
                                                                </p>
                                                            </td>
                                                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {format(new Date(item.createDate), 'dd-MM-yyyy')}
                                                                </p>
                                                            </td>
                                                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {item.createTime}
                                                                </p>
                                                            </td>
                                                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {changePrice(item.totalAmount)} VNĐ
                                                                </p>
                                                            </td>
                                                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                                                                {changePrice(item.amountDue)} VNĐ
                                                            </td>
                                                        </tr>
                                                    )

                                                })}
                                            </tbody> : <tbody>
                                                <tr style={{ height: '150px' }}>
                                                    <td style={{ color: "red", fontSize: '50px', textAlign: 'center' }} colSpan="9">Không có dữ
                                                        liệu
                                                    </td>
                                                </tr>
                                            </tbody>
                                        }
                                    </table>
                                    <Link className="btn btn-outline-secondary"
                                        to={`/dashboard/supplier`}
                                        style={{
                                            position: 'absolute',
                                            marginTop: '8px',
                                            marginLeft: '26px',
                                            width: '100px'
                                        }}> <AiOutlineRollback />Trở về</Link>
                                    <div className="justify-content-center d-flex rounded-bottom shadow m-3">
                                        {page !== 0 ?
                                            <button className="btn btn-primary" style={{ margin: '5px' }}
                                                onClick={async () => {

                                                    await previousPage()
                                                }}
                                            >
                                                <AiOutlineDoubleLeft />
                                            </button> :
                                            <button className="btn btn-primary" disabled style={{ margin: '5px' }}
                                                onClick={async () => {

                                                    await previousPage()
                                                }}
                                            >
                                                <AiOutlineDoubleLeft />
                                            </button>
                                        }

                                        <div className="text-sm py-2 px-4" style={{
                                            background: '#0d6efd',
                                            color: '#ffffff',
                                            margin: '5px',
                                            borderRadius: '5px'
                                        }}>
                                            {page + 1}/{invoices.totalPages}
                                        </div>
                                        {page !== invoices.totalPages - 1 || page !== "" || page !== null || page !== undefined ?
                                            <button className="btn btn-primary" style={{ margin: '5px' }}
                                                onClick={async () => {

                                                    await nextPage();
                                                }}
                                            >
                                               <AiOutlineDoubleRight />
                                            </button> :
                                            <button className="btn btn-primary" disabled style={{ margin: '5px' }}
                                                onClick={async () => {

                                                    await nextPage();
                                                }}
                                            >
                                                <AiOutlineDoubleRight />
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DetailSupplierComponent;