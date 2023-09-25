import React, {useEffect, useState} from "react";
import {getInvoiceDetailByID} from "../../services/invoice/InvoiceService";
import {Link, useParams} from "react-router-dom";
import {FaInfo, FaPlus, FaRegTrashAlt} from "react-icons/fa";
import {FiEdit} from "react-icons/fi";
import {AiOutlineRollback} from "react-icons/ai";

function InvoiceDetailMedicine() {
    const param = useParams();
    const [invoiceDetail, setInvoiceDetail] = useState([]);

    const getMedicineById = async () => {
        const data = await getInvoiceDetailByID(param.id);
        console.log(data)
        setInvoiceDetail(data);
    }

    useEffect(() => {
        getMedicineById();
    }, []);
    console.log(invoiceDetail.length > 0 ? invoiceDetail[0].code : null)
    return (
        <>
            <div className="container mx-auto px-4 sm:px-8">
                <div>
                    <h1 className=" font-semibold leading-tight"
                        style={{textAlign: 'center', marginBottom: '20px', color: '#0d6efd'}}>
                        CHI TIẾT THUỐC TRONG HÓA ĐƠN <span>{invoiceDetail.length > 0 ? invoiceDetail[0].code : null}</span> </h1>
                </div>
                <div className="-mx-2 sm:-mx-7 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden ">
                        <div style={{flex: "1"}}>
                            <table>
                                <tr style={{background: '#0d6efd', color: '#ffffff'}}>
                                    <th className=" px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider"
                                        style={{fontSize: '1rem', width: '30px', maxWidth:'30px'}}>
                                        STT
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider"
                                        style={{fontSize: '1rem', width: '120px', maxWidth:'120px'}}>
                                        Mã thuốc
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider"
                                        style={{fontSize: '1rem', width: '150px', maxWidth:'150px'}}>
                                        Nhóm thuốc
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider"
                                        style={{fontSize: '1rem', width: '100px', maxWidth:'100px'}}>
                                        Tên thuốc
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider"
                                        style={{fontSize: '1rem', width: '100px', maxWidth:'100px'}}>
                                        Hoạt chất
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider"
                                        style={{fontSize: '1rem', width: '250px', maxWidth:'250px'}}>
                                        Ghi chú
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider"
                                        style={{fontSize: '1rem', width: '120px', maxWidth:'120px'}}>
                                        Xuất xứ
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider"
                                        style={{fontSize: '1rem', width: '150px', maxWidth:'150px'}}>
                                        Nhà sản xuất
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider"
                                        style={{fontSize: '1rem', width: '120px', maxWidth:'120px'}}>
                                        Số lượng
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider"
                                        style={{fontSize: '1rem', width: '120px', maxWidth:'120px'}}>
                                        Giá nhập
                                    </th>
                                </tr>
                                <tbody>
                                {invoiceDetail.map((ind, index) => (
                                    <tr key={ind.id}>
                                        <td className="py-3 px-3 border-b border-gray-200">{index + 1}</td>
                                        <td className="py-3 px-3 border-b border-gray-200">{ind.codeMedicine}</td>
                                        <td className="py-3 px-3 border-b border-gray-200">{ind.nameKind}</td>
                                        <td className="py-3 px-3 border-b border-gray-200">{ind.nameMedicine}</td>
                                        <td className="py-3 px-3 border-b border-gray-200">{ind.activeElement}</td>
                                        <td className="py-3 px-3 border-b border-gray-200">{ind.noteMedicine}</td>
                                        <td className="py-3 px-3 border-b border-gray-200">{ind.origin}</td>
                                        <td className="py-3 px-3 border-b border-gray-200">{ind.maker}</td>
                                        <td className="py-3 px-3 border-b border-gray-200">{ind.quantity}</td>
                                        <td className="py-3 px-3 border-b border-gray-200">{ind.importPrice}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className=" " style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop:'20px'}}>
                        <div className=" ">
                            <Link to={`/dashboard/invoice`}><a style={{marginLeft:'5px'}} className="btn btn-outline-primary" href="#" title="Trở về">
                                <AiOutlineRollback style={{fontSize:'20px', marginBottom:'5px'}} /> Trở về</a></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InvoiceDetailMedicine;