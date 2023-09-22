import React, {useEffect, useState} from "react";
import {
    getInvoiceList,
    searchInvoice,
    deleteInvoice,
    getInvoiceDetailByID
} from "../../services/invoice/InvoiceService";

import Swal from "sweetalert2";
import {Link} from "react-router-dom";
import {BiSearch} from 'react-icons/bi';
import {AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineRollback} from "react-icons/ai";
import {FaPlus, FaRegTrashAlt, FaInfo} from "react-icons/fa";
import {FiEdit,} from "react-icons/fi";


/**
 * Create by: HuyHD
 * Day cteare: 18/09/2023
 * @returns {JSX.Element}
 * @constructor
 */


function InvoiceList() {
    const [invoiceList, setInvoiceList] = useState([])

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchPage, setSearchPage] = useState(0);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [displayedList, setDisplayedList] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const [idClick, setIdClick] = useState({});
    const [invoiceDetail, setInvoiceDetail] = useState([]);


    const getListInvoice = async (page) => {
        if (isSearching) {
            const datasearch = await searchInvoice(startDate, endDate, startTime, endTime, sortColumn, page, 5);
            setInvoiceList(datasearch.content);
            setTotalPages(datasearch.totalPages);
        } else {
            const data = await searchInvoice(null, null, null, null, null, page, 5);
            if (data.content != null || data.content != undefined) {
                setInvoiceList(data.content);
                setTotalPages(data.totalPages);
                setDisplayedList(data.content);
            } else {
                setInvoiceList([]);
                setTotalPages(1);
                Swal.fire({
                    icon: 'error',
                    title: 'Không tìm thấy dữ liệu!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    };


    const handleClickRow = (id) => {
        if (idClick === id) {
            setIdClick("");
        } else {
            setIdClick(id);
        }
    };


    const handleDeleteEmployee = async (id, code) => {

        if (idClick.id == null || idClick.id == undefined) {
            getListInvoice(0, 5).then(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Bạn chưa chọn hóa đơn!',
                    showConfirmButton: false,
                    timer: 2000,
                })
            })
        } else {
            Swal.fire({
                    title: 'Bạn muốn xoá hóa đơn <br><span style="color: #dfa512">' + code + '</span> không?',
                    html: '<p style = " color: red">Bạn sẽ không thể hoàn tác hành động này!</p>',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Xác nhận ',
                    cancelButtonText: 'Huỷ',
                    reverseButtons: true,
                    customClass: {
                        confirmButton: 'custom-confirm-button-employee',
                    }
                }
            ).then((res) => {
                if (res.isConfirmed) {
                    deleteInvoice(id).then(() => {
                        getListInvoice(currentPage, 5).then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Xoá Thành công!',
                                showConfirmButton: false,
                                timer: 2000,

                            })
                        })
                    });
                } else if (res.dismiss === Swal.DismissReason.cancel) {
                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Đã xảy ra lỗi! Xoá không thành công!',
                        showConfirmButton: false,
                        timer: 2000,
                    })

                }
            })
        }
    }



    const handleFilter = async () => {

        setCurrentPage(0);
        const data = await searchInvoice(startDate, endDate, startTime, endTime, sortColumn, 0, 5);

        if (data.content == undefined || data.content.length === 0) {
            setInvoiceList([]);
            setDisplayedList([]);
            setIsSearching(true);


            await Swal.fire({
                icon: 'error',
                text: 'Không tìm thấy hoá đơn với thông tin này!',
                showConfirmButton: false,
                timer: 2000,
            });

            return;
        }

        console.log(data);
        setIsSearching(true);
        setInvoiceList(data.content);
        setDisplayedList(data.content);
        setTotalPages(data.totalPages);
        setSearchPage(searchPage);
    };


    useEffect(() => {
        getListInvoice(currentPage);
    }, [currentPage]);

    const handlePageChange = async (page) => {
        setCurrentPage(page);
        setSearchPage(page);
    };
    const addressElements = document.getElementsByClassName("address-text");

// Duyệt qua từng phần tử và xử lý


    return (
        <div>
            {/*<meta charSet="UTF-8"/>*/}
            {/*<title>Quản Lí Kho</title>*/}


            <div className="container mx-auto px-4 sm:px-8">
                <div>
                    <h1 className=" font-semibold leading-tight"
                        style={{textAlign: 'center', marginBottom: '20px', color: 'blue'}}>
                        DANH SÁCH HÓA ĐƠN NHẬP KHO</h1>
                </div>
                <div className="row">
                    {/*                <div class="row text-center" style="border: 2px solid #5f8ef3; border-radius: 10px; padding: 10px">*/}
                    <div className="col">
                        <label style={{marginLeft: '1.5px'}}>Từ ngày:&nbsp;&nbsp;&nbsp;</label>
                        <input style={{width: '9rem', marginLeft: '1.5px', height: '40px'}} type="date"
                               id="start-date"

                               onChange={(e) => setStartDate(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label style={{marginLeft: '3px'}}>Đến ngày:</label>
                        <input style={{width: '9rem', marginLeft: '3px', height: '40px'}} type="date" id="end-date"
                               onChange={(e) => setEndDate(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label>Từ giờ:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input style={{width: '9rem', height: '40px'}} type="time" id="end-time"
                               className="filter-input_huyhd" step="1"
                               min="00:00:00" max="23:59:59"
                               onChange={(e) => setStartTime(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label style={{marginLeft: '2px'}}>Đến giờ:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input style={{width: '9rem', marginLeft: '2px', height: '40px'}} type="time" id="end-time"
                               className="filter-input_huyhd" step="1"
                               min="00:00:00" max="23:59:59"
                               onChange={(e) => setEndTime(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label>Sắp xếp theo: </label>
                        <select style={{
                            height: '40px',
                            width: '9rem',
                            border: 'solid 1px #d6d8d9',
                            borderRadius: '3px'
                        }}
                                onChange={(e) => setSortColumn(e.target.value)}>
                            <option value="code">Mã hóa đơn</option>
                            <option value="documentNumber">Số CT</option>
                            <option value="creationDay">Ngày lập</option>
                            <option value="creationTime">Giờ lập</option>
                            <option value="total">Tổng tiền</option>
                            <option value="billOwed">Nợ hóa đơn</option>
                            <option value="nameSupplier">Nhà cung cấp</option>
                        </select>
                    </div>
                    <div className="col"
                         style={{
                             display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
                             height: '45px', width: '9rem', marginTop: '20px'
                         }}>
                        <button className="btn btn-outline-primary " onClick={handleFilter}><span>
                            <BiSearch style={{fontSize: '20px'}}/>
                        </span>
                            Lọc kết quả
                        </button>
                    </div>
                </div>
                {/*                </div>*/}
                <div className="-mx-2 sm:-mx-7 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden ">
                        <div style={{flex: "1", minHeight: "27.2rem"}}>
                            <table
                                className="min-w-full  rounded-3 leading-normal table table-hover overflow-hidden mb-0"
                            >
                                <thead style={{background: "#0d6efd", color: 'white'}}>
                                <tr className="table_header_employee">
                                    <th className=" py-2  border-b-2  text-left text-xs    tracking-wider"
                                        style={{fontSize: '1rem', minWidth: '30px', maxWidth:'30px'}}>
                                        STT
                                    </th>
                                    <th className="   border-b-2  text-left text-xs    tracking-wider "
                                        style={{fontSize: '1rem', minWidth: '100px', maxWidth:'100px'}}>
                                        Mã HĐ
                                    </th>
                                    <th className=" border-b-2   text-left text-xs    tracking-wider"
                                        style={{fontSize: '1rem', minWidth: '80px', maxWidth:'80px'}}>
                                        Số CT
                                    </th>
                                    <th className="  border-b-2   text-left text-xs    tracking-wider"
                                        style={{fontSize: '1rem', minWidth: '100px', maxWidth:'100px'}}>
                                        Ngày Lập
                                    </th>
                                    <th className="  border-b-2   text-left text-xs    tracking-wider"
                                        style={{fontSize: '1rem', minWidth: '80px', maxWidth:'80px'}}>
                                        Giờ Lập
                                    </th>
                                    <th className=" px-0 border-b-2   text-left text-xs    tracking-wider"
                                        style={{fontSize: '1rem', minWidth: '100px', maxWidth:'100px'}}>
                                        Tổng Tiền
                                    </th>
                                    <th className="  px-2 border-b-2   text-left text-xs    tracking-wider"
                                        style={{fontSize: '1rem', minWidth: '100px', maxWidth:'100px'}}>
                                        Nợ HĐ
                                    </th>
                                    <th className="   border-b-2   text-left text-xs    tracking-wider"
                                        style={{fontSize: '1rem', minWidth: '150px', maxWidth:'150px'}}>
                                        Nhà Cung Cấp
                                    </th>
                                    <th className="  border-b-2   text-left text-xs    tracking-wider"
                                        style={{fontSize: '1rem', width: '300px', maxWidth:'300px'}}>
                                        Địa Chỉ
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {invoiceList.map((i, index) => (
                                    <tr key={i.id} onClick={() => handleClickRow(i)}
                                        style={{
                                            background: idClick && idClick.id === i.id ? "#629eec" : "transparent",
                                        }}>
                                        <td className="  py-3 px-3 border-b border-gray-200  text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                                        </td>
                                        <td className="  py-3 border-b border-gray-200  text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap"
                                            >{i.code}</p>
                                        </td>
                                        <td className="  py-3 border-b border-gray-200  text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{i.documentNumber}</p>
                                        </td>
                                        <td className="py-3 border-b border-gray-200 text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {new Date(i.creationDay).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                        </td>

                                        <td className=" py-3 border-b border-gray-200  text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {i.creationTime}</p>
                                        </td>
                                        <td className="py-3 border-b border-gray-200 text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{i.total.toLocaleString()} VND</p>
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-200 text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{i.billOwed.toLocaleString()} VND</p>
                                        </td>

                                        <td className=" py-3 border-b border-gray-200  text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap"
                                            >{i.nameSupplier}</p>
                                        </td>

                                        <td className="py-3 border-b border-gray-200 text-sm">
                                            {i.address.length > 20 ? (
                                                <p
                                                    className="text-gray-900 whitespace-no-wrap"
                                                    title={i.address}
                                                    style={{
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {i.address}
                                                </p>
                                            ) : (
                                                <p className="text-gray-900 whitespace-no-wrap">{i.address}</p>
                                            )}
                                        </td>
                                    </tr>
                                ))}

                                </tbody>
                            </table>
                        </div>
                        <div
                            className="px-5 py-3 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                            <div className=" justify-content-center d-flex ">
                                <button
                                    className={`btn btn-primary ${currentPage === 0 ? 'disabled' : ''}`}
                                    style={{margin: '5px'}}
                                    disabled={currentPage === 0}
                                    title="Trang trước"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    <AiOutlineDoubleLeft/>
                                </button>

                                <button
                                    key={currentPage}
                                    className="text-sm py-2 px-4"
                                    style={{
                                        border: "none",
                                        width: '6rem',
                                        height: '2.5rem',
                                        background: '#0d6efd',
                                        color: '#ffffff',
                                        margin: '5px',
                                        borderRadius: '5px'
                                    }}
                                    onClick={() => handlePageChange(currentPage)}
                                    title="Trang hiện tại"
                                >
                                    {currentPage + 1} / {totalPages}
                                </button>

                                <button
                                    className={`btn btn-primary ${currentPage === totalPages - 1 ? 'disabled' : ''}`}
                                    style={{margin: '5px'}}
                                    title="Trang sau"
                                    disabled={currentPage === totalPages - 1}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    <AiOutlineDoubleRight/>
                                </button>

                                {/*{totalPages > 1 &&(*/}
                                {/*    <div className="style_button_page_next_employee   font-semibold py-2 px-2 rounded" title="Trang bạn muốn đến">*/}
                                {/*        <input*/}
                                {/*            className="style_button_search_page"*/}
                                {/*            type="number"*/}
                                {/*            value={searchPage}*/}
                                {/*            onChange={(e) => setSearchPage(e.target.value)}*/}
                                {/*            onKeyPress={handleKeyEnterPage}*/}
                                {/*        />*/}
                                {/*        <button onClick={handleSearchPage} >*/}
                                {/*            <i className="fa-solid fa-magnifying-glass"/>*/}
                                {/*        </button>*/}
                                {/*    </div>*/}
                                {/*)}*/}

                            </div>
                        </div>
                    </div>
                </div>
                <div className=" " style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <div className=" ">
                        <Link to={`/invoice/create`}><a className="btn btn-outline-primary"
                                                        href="#"
                                                        title="Thêm"
                                                        style={{marginLeft: '5px'}}>
                            <FaPlus style={{marginBottom: '5px'}}/> Thêm mới</a></Link>

                        <Link to={`/dashboard/invoice/detail/${idClick?.id}`}>
                            <a
                                className="btn btn-outline-primary"
                                href="#"
                                title="Chi tiết"
                                style={{ marginLeft: '5px' }}
                                onClick={(e) => {
                                    if (idClick?.id == null || idClick?.id == undefined) {
                                        e.preventDefault();
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Bạn chưa chọn hóa đơn!',
                                            showConfirmButton: false,
                                            timer: 1500,
                                        });
                                        return false;
                                    }
                                }}
                            >
                                Chi tiết
                            </a>
                        </Link>

                        <Link to={`/dashboard/invoice/update/${idClick?.id}`}><a className="btn btn-outline-primary"
                                                                                 title="Sửa"
                                                                                 style={{marginLeft: '5px'}}>
                            <FiEdit style={{fontSize: '20px', marginBottom: '5px'}}/> Sửa
                        </a></Link>

                        <a style={{marginLeft: '5px'}}
                           title="Xóa"
                           className="btn btn-outline-primary" onClick={() => {
                            handleDeleteEmployee(`${idClick?.id}`, `${idClick?.code}`);
                        }}>
                            <FaRegTrashAlt style={{fontSize: '20px', marginBottom: '5px'}}/> Xóa
                        </a>
                        <Link to={`/home`}><a style={{marginLeft: '5px'}} className="btn btn-outline-primary"
                                              href="#" title="Trở về">
                            <AiOutlineRollback style={{fontSize: '20px', marginBottom: '5px'}}/> Trở về</a></Link>
                    </div>
                </div>
            </div>
            {/*<div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel5"*/}
            {/*     aria-hidden="true">*/}
            {/*    <div className="modal-dialog">*/}
            {/*        <div className="modal-content">*/}
            {/*            <div className="modal-header table_header_employee">*/}
            {/*                <h1 className="modal-title fs-5" id="exampleModalLabel5">Xóa hóa đơn</h1>*/}
            {/*                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>*/}
            {/*            </div>*/}
            {/*            <div className="modal-body">*/}
            {/*                <p>Bạn chắn chắn muốn xóa hóa đơn nhập kho có mã hóa đơn*/}
            {/*                    <span style={{color: '#dfa512'}} id="nameDelete">HĐ006 </span> <span>không?</span>*/}
            {/*                </p>*/}
            {/*                <p className="error_red_employee">Lưu ý: hành động này không thể hoàn tác!</p>*/}
            {/*            </div>*/}
            {/*            <div className="modal-footer">*/}
            {/*                <form>*/}
            {/*                    <div className="d-flex">*/}
            {/*                        <input type="hidden" name="idDelete" id="idDelete"/>*/}
            {/*                        <button type="button" className="btn form_exit_employee"*/}
            {/*                                data-bs-dismiss="modal">Thoát*/}
            {/*                        </button>*/}
            {/*                        <button type="submit" className="btn"*/}
            {/*                                style={{background: '#0d6efd', color: 'white'}}>Xác Nhận*/}
            {/*                        </button>*/}
            {/*                    </div>*/}
            {/*                </form>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*modal detail*/}
            {/*{ idClick &&  (*/}
            {/*    <div className="modal fade" id="exampleModal1" tabIndex={-1} aria-labelledby="exampleModalLabel5" aria-hidden="true">*/}
            {/*        <div className="modal-dialog modal-dialog-centered" style={{ width: '800px' }}>*/}
            {/*            <div className="modal-content" style={{ width: '800px', marginBottom: '300px' }}>*/}
            {/*                <div className="modal-header table_header_employee">*/}
            {/*                    <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ color: 'white' }}>CHI TIẾT HÓA ĐƠN NHẬP THUỐC</h1>*/}
            {/*                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />*/}
            {/*                </div>*/}
            {/*                <div className="modal-body">*/}
            {/*                    <div className="d-flex">*/}
            {/*                        <table>*/}
            {/*                            <tr style={{ background: '#0d6efd', color: '#ffffff' }}>*/}
            {/*                                <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">*/}
            {/*                                    STT*/}
            {/*                                </th>*/}
            {/*                                <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">*/}
            {/*                                    Mã thuốc*/}
            {/*                                </th>*/}
            {/*                                <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">*/}
            {/*                                    Nhóm thuốc*/}
            {/*                                </th>*/}
            {/*                                <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">*/}
            {/*                                    Tên thuốc*/}
            {/*                                </th>*/}
            {/*                                <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">*/}
            {/*                                    Hoạt chất*/}
            {/*                                </th>*/}
            {/*                                <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">*/}
            {/*                                    Số lượng*/}
            {/*                                </th>*/}
            {/*                                <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">*/}
            {/*                                    Giá nhập*/}
            {/*                                </th>*/}
            {/*                                <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">*/}
            {/*                                    % VAT*/}
            {/*                                </th>*/}
            {/*                            </tr>*/}
            {/*                            <tbody>*/}
            {/*                            {invoiceDetail.map((ind, index) => (*/}
            {/*                                <tr key={ind.id}>*/}
            {/*                                    <td className="py-3 px-3 border-b border-gray-200">{index + 1}</td>*/}
            {/*                                    <td className="py-3 px-3 border-b border-gray-200">{ind.codeMedicine}</td>*/}
            {/*                                    <td className="py-3 px-3 border-b border-gray-200">{ind.nameKind}</td>*/}
            {/*                                    <td className="py-3 px-3 border-b border-gray-200">{ind.nameMedicine}</td>*/}
            {/*                                    <td className="py-3 px-3 border-b border-gray-200">{ind.activeElement}</td>*/}
            {/*                                    <td className="py-3 px-3 border-b border-gray-200">{ind.quantity}</td>*/}
            {/*                                    <td className="py-3 px-3 border-b border-gray-200">{ind.price}</td>*/}
            {/*                                    <td className="py-3 px-3 border-b border-gray-200">{ind.vat}</td>*/}
            {/*                                </tr>*/}
            {/*                            ))}*/}
            {/*                            </tbody>*/}
            {/*                        </table>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="modal-footer">*/}
            {/*                    <input type="hidden" name="idDetail" id="idDetail" />*/}
            {/*                    <button type="button" className="btn" data-bs-dismiss="modal" style={{ background: '#6e7881' }}>Thoát</button>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}

        </div>
    );

}

export default InvoiceList;