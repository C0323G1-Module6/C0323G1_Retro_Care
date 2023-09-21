
import {
    AiOutlineRollback,
    AiOutlineDoubleLeft,
    AiOutlineDoubleRight,
} from "react-icons/ai";
import {useEffect, useState} from "react";
import {getAllInvoiceOrder} from "../../services/order/OrderInvoice";

const ListInvoiceOrder = () => {
    const [invoices,setInvoices] = useState([]);
    const loadAllInvoice =async () => {
        const tmpInvoice = await getAllInvoiceOrder();
        console.log(tmpInvoice);
        setInvoices(tmpInvoice.data.content);
    }
    useEffect(() => {
        loadAllInvoice();
    },[])

    return (
        <>
            <div>
                <h1 className="title-employee">Quản lý bán hàng</h1>
            </div>

            <div className="mx-auto container">

                <fieldset className="border border-dark rounded-3 p-3 h-100 shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                    <legend className="float-none w-auto px-3">Thông tin hóa đơn</legend>
                    <div className="row">
                        <div className="d-flex col-3">
                    <label className="me-2 p-2">Từ ngày</label>
                    <input type={"datetime-local"} className={"form-control"} style={{width:"200px"}}/>
                        </div>
                        <div className="d-flex col-3">
                    <label className="me-2 p-2">Đến ngày</label>
                    <input type={"datetime-local"} className={"form-control"} style={{width:"200px"}}/>
                        </div>
                        <div className="d-flex col-4">
                            <label className="me-2 p-2">Sắp xếp theo</label>
                            <select type={"datetime-local"} className={"form-select"} style={{width:"200px"}}>
                                <option>Mã hoá đơn</option>
                                <option>Tên khách hàng</option>
                                <option>Ngày lập giờ lập</option>
                                <option>Người lập</option>
                                <option>Tổng tiền</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <div className="pt-2">
                    <div>
                        <div className="table-container rounded-top ">
                            <table className="table table-hover ">
                                <thead>
                                <tr className="th-list">
                                    <th className="px-3 py-2 bg-primary ">Mã hoá đơn
                                    </th>
                                    <th className="px-3 py-2 bg-primary ">Tên khách hàng
                                    </th>
                                    <th className="px-3 py-2 bg-primary ">Ngày lập
                                    </th>
                                    <th className="px-3 py-2 bg-primary ">Giờ lập
                                    </th>
                                    <th className="px-3 py-2 bg-primary ">Người lập
                                    </th>
                                    <th className="px-3 py-2 bg-primary ">Tổng tiền
                                    </th>
                                    <th className="px-3 py-2 bg-primary ">Ghi chú
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    invoices.map((invoice,index) => (
                                        <tr>
                                            <td className={`px-3 py-3 `} >{invoice.code}</td>
                                            <td className={`px-3 py-3 `}>{invoice.nameCustomer}</td>
                                            <td className={`px-3 py-3 `}>{invoice.orderDate}</td>
                                            <td className={`px-3 py-3 `}>{invoice.orderTime}</td>
                                        <td className={`px-3 py-3 `}>{invoice.nameEmployee}</td>
                                        <td className={`px-3 py-3 `}>{invoice.orderDetailsPrice}</td>
                                            <td className={`px-3 py-3 `}>{invoice.orderNote}</td>
                                        </tr>
                                        )
                                    )
                                }

                                </tbody>
                            </table>
                        </div>
                        <div
                            className={`justify-content-center d-flex rounded-bottom shadow `}>
                            <button className={`btn btn-primary }`}
                                    style={{margin: "5px"}}
                                    onClick={() => {

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
                                1/1
                            </div>
                            <button className={`btn btn-primary }`}
                                    style={{margin: "5px"}}
                                    onClick={() => {

                                    }}
                            >
                                <AiOutlineDoubleRight className="mx-1"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListInvoiceOrder;