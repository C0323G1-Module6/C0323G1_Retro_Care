import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {
    detailSupplierById,
    getSupplierDetailById
} from "../../services/supplier/SupplierService";
import Swal from "sweetalert2";

function DetailSupplierComponent() {
    const {idSupplier} = useParams();
    const [invoices, setInvoices] = useState([]);
    const [supplier, setSupplier] = useState({});
    let [page, setPage] = useState(0)

    const getSupplier = async () => {
        try {
            const data = await getSupplierDetailById(idSupplier);
            setSupplier(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    const getListInVoice = async ( pageable) => {
        try {
            const invoiceData = await detailSupplierById(idSupplier, pageable);
            setInvoices(invoiceData);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Không tìm thấy dữ liệu!",
                showConfirmButton: false,
                timer: 2000,
            })
        }
    }
    useEffect(() => {
        getSupplier()
        getListInVoice(idSupplier,page)
    },[idSupplier])
    const setPageFunction = async (pageAfter) => {
        setPage(pageAfter)
    }
    console.log(invoices);

    const nextPage = async () => {
        page += 1;
        if (page < invoices.totalPages) {
            await setPageFunction(page).then((await getListInVoice(idSupplier, page)))
        } else {
            page -= 1
        }
    }
    const previousPage = async () => {
        if (page >= 1) {
            page -= 1
        }
        await setPageFunction(page).then((await getListInVoice(idSupplier, page)))
    }

    if (!invoices){
        return null;
    }

    return (
        <>
            <div>
                <meta charSet="UTF-8"/>
                <title>Chi tiết nhà cung cấp</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
                      rel="stylesheet"
                      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
                      crossOrigin="anonymous"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"/>
                <link href="/prototype_all/supplier/css/ThanhVH_listSupplier.css" rel="stylesheet" media="all"/>
                <div className="antialiased font-sans bg-gray-200" style={{backgroundColor: '#edf2f7'}}>
                    <div className="container mx-auto sm:px-8">
                        <div>
                            <div>
                                <h2 className="text-2xl font-semibold leading-tight"
                                    style={{textAlign: 'center', marginBottom: '20px'}}>DANH SÁCH
                                    HOÁ ĐƠN NHẬP</h2>
                            </div>
                            <div className="information" style={{
                                border: '3px solid lightgrey',
                                padding: '20px 50px 20px 50px',
                                borderRadius: '7px'
                            }}>
                                <h3 style={{fontFamily: 'Poppins, Arial, Helvetica Neue, sans-serif'}}>Thông tin nhà
                                    cung cấp</h3>
                                <div className="row row-information1">
                                    <div className="col-6 col-information"
                                         style={{fontFamily: 'Poppins, Arial, Helvetica Neue, sans-serif'}}>Mã
                                        nhà
                                        cung cấp: {supplier.codeSupplier}
                                    </div>
                                    <div className="col-6 col-information"
                                         style={{fontFamily: 'Poppins, Arial, Helvetica Neue, sans-serif'}}>Tên
                                        nhà
                                        cung cấp: {supplier.nameSupplier}
                                    </div>
                                </div>
                                <hr/>
                                <div className="row row-information1">
                                    <div className="col-6 col-information"
                                         style={{fontFamily: 'Poppins, Arial, Helvetica Neue, sans-serif'}}>Địa
                                        chỉ: {supplier.address}
                                    </div>
                                    <div className="col-6 col-information"
                                         style={{fontFamily: 'Poppins, Arial, Helvetica Neue, sans-serif'}}>Số
                                        điện thoại: {supplier.phoneNumber}
                                    </div>
                                </div>
                                <hr/>
                                <div className="row row-information1">
                                    <div className="col-6 col-information"
                                         style={{fontFamily: 'Poppins, Arial, Helvetica Neue, sans-serif'}}>Công
                                        nợ: {supplier.debt} VNĐ
                                    </div>
                                    <div className="col-6 col-information"
                                         style={{fontFamily: 'Poppins, Arial, Helvetica Neue, sans-serif'}}>Chú
                                        thích: {supplier.note}
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="row row-input-search">
                                <input type="date" style={{
                                    width: '200px',
                                    marginRight: '10px',
                                    marginLeft: '10px',
                                    borderRadius: '5px',
                                    boxSizing: 'border-box',
                                    borderWidth: 0,
                                    borderStyle: 'solid',
                                    borderColor: '#e2e8f0'
                                }} className="appearance-none pl-8 pr-6 py-2 bg-white text-sm focus:outline-none"/>
                                <input type="date" style={{
                                    width: '200px',
                                    borderRadius: '5px',
                                    boxSizing: 'border-box',
                                    borderWidth: 0,
                                    borderStyle: 'solid',
                                    borderColor: '#e2e8f0'
                                }} className="appearance-none pl-8 pr-6 py-2 bg-white text-sm focus:outline-none"/>
                                <div className=" col-7" style={{display: 'flex'}}>
                                    <div className="btn btn-outline-primary col-4"
                                         style={{marginRight: 'auto', width: '100px'}}>
                                        Tìm kiếm
                                    </div>
                                </div>
                            </div>
                            <div className="block relative">
                            </div>
                            <div className="-mx-4 sm:-mx-8 sm:px-8 py-4 overflow-x-auto">
                                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden"  style={{borderRadius: '10px'}}>
                                    <table className="min-w-full leading-normal table table-hover">
                                        <thead>
                                        <tr style={{background: '#0d6efd', color: '#ffffff'}}>
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
                                            {  invoices.content.map((item, index) => {
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
                                                                {item.createDate}
                                                            </p>
                                                        </td>
                                                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {item.createTime}
                                                            </p>
                                                        </td>
                                                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {item.totalAmount} VNĐ
                                                            </p>
                                                        </td>
                                                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                                                            {item.amountDue} VNĐ
                                                        </td>
                                                    </tr>
                                                    )
                                            })}
                                            </tbody> : <tbody>
                                            <tr style={{height: '150px'}}>
                                                <td style={{color: "red", fontSize: '50px',textAlign:'center'}} colSpan="9">Không có dữ
                                                    liệu
                                                </td>
                                            </tr>
                                            </tbody>
                                        }
                                    </table>
                                    <Link className="btn btn-outline-primary"
                                      to={`/supplier`}
                                       style={{
                                           position: 'absolute',
                                           marginTop: '8px',
                                           marginLeft: '26px',
                                           width: '87px'
                                       }}>Trở về</Link>
                                    <div className="justify-content-center d-flex rounded-bottom shadow m-3">
                                        {page !== 0 ?
                                            <button className="btn btn-primary" style={{margin: '5px'}}
                                                    onClick={async () => {

                                                        await previousPage()
                                                    }}
                                            >

                                                <i className="fa-solid fa-angles-left"/>
                                            </button> :
                                            <button className="btn btn-primary" style={{margin: '5px'}}
                                                    onClick={async () => {

                                                        await previousPage()
                                                    }}
                                            >
                                                <i className="fa-solid fa-angles-left"/>
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
                                        {page !== invoices.totalPages - 1 ?
                                            <button className="btn btn-primary" style={{margin: '5px'}}
                                                    onClick={async () => {

                                                        await nextPage();
                                                    }}
                                            >
                                                <i className="fa-solid fa-angles-right"/>
                                            </button> :
                                            <button className="btn btn-primary" style={{margin: '5px'}}
                                                    onClick={async () => {

                                                        await nextPage();
                                                    }}
                                            >
                                                <i className="fa-solid fa-angles-right"/>
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