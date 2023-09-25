import React, {useEffect, useState} from "react";
import {getInvoiceDetailByID} from "../../services/invoice/InvoiceService";
import {Link, useParams} from "react-router-dom";
import {FaInfo, FaPlus, FaRegTrashAlt} from "react-icons/fa";
import {FiEdit} from "react-icons/fi";
import {AiOutlineRollback} from "react-icons/ai";


function InvoiceDetailMedicine() {
    const param = useParams();
    const [invoiceDetail, setInvoiceDetail] = useState([]);
    const [showContent,setShowContent]= useState(false);
    const [medicine, setMedicine] = useState("");

    const quantity = 18 ;
    const getMedicineById = async () => {
        const data = await getInvoiceDetailByID(param.id);
        setInvoiceDetail(data);
    }
    const handleMouseEnter = (activeElement) => {
        if (activeElement.length > quantity) {
            setShowContent(true);
            setMedicine(activeElement);
        }
    };
    const handleMouseLeave = () => {
        setShowContent(false);
    };

    useEffect(() => {
        getMedicineById();
        document.title = "RetroCare - Chi tiết hóa đơn nhập kho";
    }, []);

    return (
        <>
            <div className="container mx-auto px-4 sm:px-8">
                <div>
                    <h1 className=" font-semibold leading-tight"
                        style={{textAlign: 'center', marginBottom: '20px', color: '#0d6efd'}}>
                        CHI TIẾT THUỐC TRONG HÓA ĐƠN <span>{invoiceDetail.length > 0 ? invoiceDetail[0].code : null}</span> </h1>
                </div>
                <div className="-mx-2 sm:-mx-7 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <div style={{ flex: "1", minHeight: "27.2rem", overflowX: "auto" }}>
                            <table
                                className="min-w-full rounded-3 leading-normal table table-hover overflow-hidden mb-0"
                                style={{ tableLayout: "fixed" }}
                            >
                                <colgroup>
                                    <col style={{ width: "40px", maxWidth: "40px" }} />
                                    <col style={{ width: "80px", maxWidth: "80px" }} />
                                    <col style={{ width: "140px",}} />
                                    <col style={{ width: "100px" }} />
                                    <col style={{ width: "160px" }} />
                                    <col style={{ width: "160px" }} />
                                    <col style={{ width: "80px"}} />
                                    <col style={{ width: "120px"}} />
                                    <col style={{ width: "80px"}} />
                                    <col style={{ width: "100px"}} />
                                </colgroup>
                                <thead style={{ background: "#0d6efd", color: "white" }}>
                                <tr className="table_header_employee">
                                    <th
                                        className="py-3 border-b border-gray-200  text-sm"
                                        style={{ fontSize: "1rem" }}
                                    >
                                        STT
                                    </th>
                                    <th
                                        className="py-3 border-b border-gray-200  text-sm"
                                        style={{ fontSize: "1rem" }}
                                    >
                                        Mã thuốc
                                    </th>
                                    <th
                                        className="py-3 border-b border-gray-200  text-sm"
                                        style={{ fontSize: "1rem" }}
                                    >
                                        Tên thuốc
                                    </th>
                                    <th
                                        className="py-3 border-b border-gray-200  text-sm"
                                        style={{ fontSize: "1rem" }}
                                    >
                                        Nhóm thuốc
                                    </th>
                                    <th
                                        className="py-3 border-b border-gray-200  text-sm"
                                        style={{ fontSize: "1rem" }}
                                    >
                                        Hoạt chất
                                    </th>
                                    <th
                                        className="py-3 border-b border-gray-200  text-sm"
                                        style={{ fontSize: "1rem" }}
                                    >
                                        Ghi chú
                                    </th>
                                    <th
                                        className="py-3 border-b border-gray-200  text-sm"
                                        style={{ fontSize: "1rem" }}
                                    >
                                        Xuất xứ
                                    </th>
                                    <th
                                        className="py-3 border-b border-gray-200  text-sm"
                                        style={{ fontSize: "1rem" }}
                                    >
                                        Nhà sản xuất
                                    </th>
                                    <th
                                        className="py-3 border-b border-gray-200  text-sm"
                                        style={{ fontSize: "1rem" }}
                                    >
                                        Số lượng
                                    </th>
                                    <th
                                        className="py-3 border-b border-gray-200  text-sm"
                                        style={{ fontSize: "1rem" }}
                                    >
                                        Giá nhập
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {invoiceDetail.map((ind, index) => (
                                    <tr key={ind.id} style={{position: 'relative',
                                        zIndex: '2'}}>
                                        <td className="py-3  px-3 border-b border-gray-200">{index + 1}</td>
                                        <td className="py-3  border-b border-gray-200">{ind.codeMedicine}</td>
                                        <td
                                            className="py-3 border-b border-gray-200 text-sm"
                                            style={{position: 'relative', }}
                                            onMouseEnter={() => { handleMouseEnter(ind.nameMedicine); }}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            {ind.nameMedicine.length > quantity
                                                ? `${ind.nameMedicine.slice(0, quantity)}...`
                                                : ind.nameMedicine
                                            }
                                            {showContent && medicine === ind.nameMedicine &&
                                                <div
                                                    style={{position: 'absolute',
                                                        background:'#f3f3f5',
                                                        top: '-2%',
                                                        boxSizing: 'border-box',
                                                        width: '130px',
                                                        height: '100px',
                                                        zIndex: 99,
                                                        }}>{ind.nameMedicine}</div>
                                            }
                                        </td>
                                        <td className="py-3  border-b border-gray-200">{ind.nameKind}</td>
                                        <td
                                            className="py-3 border-b border-gray-200 text-sm"
                                            style={{position: 'relative'}}
                                            onMouseEnter={() => { handleMouseEnter(ind.activeElement);}}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            {ind.activeElement.length > quantity
                                                ? `${ind.activeElement.slice(0, quantity)}...`
                                                : ind.activeElement
                                            }
                                            {showContent && medicine === ind.activeElement &&
                                                <div style={{position: 'absolute',
                                                    background:'#f3f3f5',
                                                    top: '-2%',
                                                    boxSizing: 'border-box',
                                                    width: 'auto',
                                                    minHeight:'58px',
                                                    zIndex: 99,
                                                    }}>{ind.activeElement}</div>
                                            }
                                        </td>
                                        <td
                                            className="py-3 border-b border-gray-200 text-sm"
                                            style={{position: 'relative'}}
                                            onMouseEnter={() => { handleMouseEnter(ind.noteMedicine); }}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            {ind.noteMedicine.length > quantity
                                                ? `${ind.noteMedicine.slice(0, quantity)}...`
                                                : ind.noteMedicine
                                            }
                                            {showContent && medicine === ind.noteMedicine &&
                                                <div
                                                    style={{position: 'absolute',
                                                        background:'#f3f3f5',
                                                        top: '-2%',
                                                        boxSizing: 'border-box',
                                                        width: '190px',
                                                        height: 'auto',
                                                        minHeight:'58px',
                                                        zIndex: 99}}>{ind.noteMedicine}</div>
                                            }
                                        </td>
                                        <td className="py-3  border-b border-gray-200">{ind.origin}</td>
                                        <td className="py-3  border-b border-gray-200">{ind.maker}</td>
                                        <td className="py-3  border-b border-gray-200">{ind.quantity}</td>
                                        <td className="py-3  border-b border-gray-200">{ind.importPrice.toLocaleString('vi-VN')} VNĐ</td>
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