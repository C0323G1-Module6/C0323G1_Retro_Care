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
import {ToastContainer} from "react-toastify";


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
    const [sortType, setSortType] = useState(null);
    const [displayedList, setDisplayedList] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const [idClick, setIdClick] = useState({});
    const [showContent, setShowContent] = useState(false);
    const [medicine, setMedicine] = useState("");
    const quantity = 19;

    const getListInvoice = async (page) => {
        if (isSearching) {
            const datasearch = await searchInvoice(startDate, endDate, startTime, endTime, sortColumn, sortType, page, 5);
            setInvoiceList(datasearch.content);
            setTotalPages(datasearch.totalPages);
        } else {
            const data = await searchInvoice(null, null, null, null, null, 'DESC', page, 5);
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
    const handleMouseEnter = (activeElement) => {
        if (activeElement.length > quantity) {
            setShowContent(true);
            setMedicine(activeElement);
        }
    };
    const handleMouseLeave = () => {
        setShowContent(false);
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
        const data = await searchInvoice(startDate, endDate, startTime, endTime, sortColumn, sortType, 0, 5);
        console.log(data)
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
            setStartTime("");
            setEndTime("");
            setStartDate("");
            setEndDate("");
            return;
        }

        setIsSearching(true);
        setInvoiceList(data.content);
        setDisplayedList(data.content);
        setTotalPages(data.totalPages);
        setSearchPage(searchPage);
    };


    useEffect(() => {
        getListInvoice(currentPage);
        document.title = "RetroCare - Quản lí hóa đơn nhập kho";
    }, [currentPage]);

    const handlePageChange = async (page) => {
        setCurrentPage(page);
        setSearchPage(page);
    };
    // const handleMouseEnter = (medicine) => {
    //     setShowContent(true);
    //     setMedicine(medicine);
    // };
    // const handleMouseLeave = () => {
    //     setShowContent(false);
    // };

    useEffect(() => {
        if (sortColumn || sortType) {
            console.log(sortColumn)
            console.log(sortType)
            handleFilter();
            document.title = "RetroCare - Quản lí hóa đơn nhập kho";
        }
    }, [sortColumn, sortType]);


// Duyệt qua từng phần tử và xử lý
    const clearStartTime = () => {
        setStartTime("");
    };
    const clearEndTime = () => {
        setEndTime("");
    };
    const clearStartDate = () => {
        setStartDate("");
    };

    const clearEndDate = () => {
        setEndDate("");
    };


    // const handleSort = (event) => {
    //     if (event === 'asc') {
    //         setSortType('desc');
    //     } else {
    //         setSortType('asc');
    //     }
    // };

    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear());

        return `${day}-${month}-${year}`;
    }

    return (
        <div>
            {/*<meta charSet="UTF-8"/>*/}
            {/*<title>Quản Lí Kho</title>*/}


            <div className="container mx-auto px-4 sm:px-8">
                <div>
                    <h1 className=" font-semibold leading-tight"
                        style={{textAlign: 'center', marginBottom: '20px', color: '#0d6efd'}}>
                        DANH SÁCH HÓA ĐƠN NHẬP KHO</h1>
                </div>
                <div className="row">
                    {/*                <div class="row text-center" style="border: 2px solid #5f8ef3; border-radius: 10px; padding: 10px">*/}
                    <div className="col">
                        <label style={{marginLeft: '1.5px'}}>Từ ngày:&nbsp;&nbsp;&nbsp;</label>
                        <div style={{display: 'flex'}}>
                            <input
                                style={{width: '9rem', marginLeft: '', height: '40px'}}
                                type="date"
                                id="start-date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            {startDate && (
                                <button className="clear-button btn btn-outline-primary"
                                        style={{

                                            marginBottom: '2px',
                                            height: '2.5rem',
                                            border: 'solid 1px #d6d8d9',
                                            paddingLeft: '6px',
                                            paddingRight: '6px',
                                            borderRadius: '3px'
                                        }}
                                        onClick={clearStartDate}>
                                    Xóa
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="col">
                        <label style={{marginLeft: '3px'}}>Đến ngày:</label>
                        <div style={{display: 'flex'}}>
                            <input
                                style={{width: '9rem', marginLeft: '', height: '40px'}}
                                type="date"
                                id="end-date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                            {endDate && (
                                <button
                                    className="clear-button btn btn-outline-primary"
                                    style={{
                                        marginBottom: '2px',
                                        height: '2.5rem',
                                        border: 'solid 1px #d6d8d9',
                                        paddingLeft: '6px',
                                        paddingRight: '6px',
                                        borderRadius: '3px',
                                    }}
                                    onClick={clearEndDate}
                                >
                                    Xóa
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="col">
                        <label>Từ giờ:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <div style={{display: "flex"}}>
                            <input
                                style={{width: "9rem", height: "40px"}}
                                type="time"
                                id="start-time"
                                step="1"
                                min="00:00:00"
                                max="23:59:59"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                            {startTime && (
                                <button className="clear-button btn btn-outline-primary"
                                        style={{
                                            height: '2.5rem',
                                            paddingLeft: '6px', paddingRight: '6px',
                                            border: 'solid 1px #d6d8d9',
                                            borderRadius: '3px'
                                        }}
                                        onClick={clearStartTime}>
                                    Xóa
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="col">
                        <label style={{marginLeft: '2px'}}>Đến giờ:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <div style={{display: "flex"}}>
                            <input
                                style={{width: "9rem", height: "40px"}}
                                type="time"
                                id="end-time"
                                step="1"
                                min="00:00:00"
                                max="23:59:59"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                            {endTime && (
                                <button className="clear-button btn btn-outline-primary"
                                        style={{
                                            height: '2.5rem',
                                            paddingLeft: '6px', paddingRight: '6px',
                                            border: 'solid 1px #d6d8d9',
                                            borderRadius: '3px'
                                        }}
                                        onClick={clearEndTime}>
                                    Xóa
                                </button>
                            )}
                        </div>

                    </div>
                    {/*<div className="col">*/}
                    {/*    <label style={{marginLeft: '2px'}}>Đến giờ:&nbsp;&nbsp;&nbsp;&nbsp;</label>*/}
                    {/*    <input style={{width: '9rem', marginLeft: '2px', height: '40px'}} type="time" id="end-time"*/}
                    {/*           className="filter-input_huyhd" step="1"*/}
                    {/*           min="00:00:00" max="23:59:59"*/}
                    {/*           onChange={(e) => setEndTime(e.target.value)}/>*/}
                    {/*</div>*/}
                    <div className="col" style={{marginTop:'-5px'}}>
                        <label>Sắp xếp theo: </label>
                        <div className='col' style={{display: 'flex', alignItems: 'center'}}>
                            <select style={{
                                height: '40px',
                                width: '9rem',
                                border: 'solid 1px #d6d8d9',
                                borderRadius: '3px',
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
                            <select
                                onChange={(e) => setSortType(e.target.value)} className="form-select m-1 "
                                style={{
                                    height: '40px',
                                    width: '9rem',
                                    marginLeft: '0',
                                    borderRadius: '3px',

                                }}>
                                <option value="DESC">Giảm dần</option>
                                <option value="ASC">Tăng dần</option>
                            </select>
                        </div>
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
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <div style={{flex: "1", minHeight: "27.2rem", overflowX: "auto"}}>
                            <table
                                className="min-w-full rounded-3 leading-normal table table-hover overflow-hidden mb-0"
                                style={{tableLayout: "fixed"}}
                            >
                                <colgroup>
                                    <col style={{width: "40px", maxWidth: "40px"}}/>
                                    <col style={{width: "80px", maxWidth: "80px"}}/>
                                    <col style={{width: "80px", maxWidth: "80px"}}/>
                                    <col style={{width: "120px",}}/>
                                    <col style={{width: "80px", maxWidth: "80px"}}/>
                                    <col style={{width: "140px", maxWidth: "150px"}}/>
                                    <col style={{width: "140px", maxWidth: "150px"}}/>
                                    <col style={{width: "210px",}}/>
                                    <col style={{width: "250px",}}/>
                                </colgroup>
                                <thead style={{background: "#0d6efd", color: "white"}}>
                                <tr className="table_header_employee">
                                    <th
                                        className="py-2 border-b-2 text-left text-xs tracking-wider"
                                        style={{fontSize: "1rem"}}
                                    >
                                        STT
                                    </th>
                                    <th
                                        className="border-b-2 text-left text-xs tracking-wider"
                                        style={{fontSize: "1rem"}}
                                    >
                                        Mã HĐ
                                    </th>
                                    <th
                                        className="border-b-2 text-left text-xs tracking-wider"
                                        style={{fontSize: "1rem"}}
                                    >
                                        Số CT
                                    </th>
                                    <th
                                        className="border-b-2 text-left text-xs tracking-wider"
                                        style={{fontSize: "1rem"}}
                                    >
                                        Ngày Lập
                                    </th>
                                    <th
                                        className="border-b-2 text-left text-xs tracking-wider"
                                        style={{fontSize: "1rem"}}
                                    >
                                        Giờ Lập
                                    </th>
                                    <th
                                        className="px-2 border-b-2 text-left text-xs tracking-wider"
                                        style={{fontSize: "1rem"}}
                                    >
                                        Tổng Tiền
                                    </th>
                                    <th
                                        className="px-2 border-b-2 text-left text-xs tracking-wider"
                                        style={{fontSize: "1rem"}}
                                    >
                                        Nợ HĐ
                                    </th>
                                    <th
                                        className="border-b-2 text-left text-xs tracking-wider"
                                        style={{fontSize: "1rem"}}
                                    >
                                        Nhà Cung Cấp
                                    </th>
                                    <th
                                        className="border-b-2 text-left text-xs tracking-wider"
                                        style={{fontSize: "1rem"}}
                                    >
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
                                            <p className="text-gray-900 whitespace-no-wrap">{(currentPage * 5) + index + 1}</p>
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
                                                {formatDate(i.creationDay)}
                                            </p>
                                        </td>

                                        <td className=" py-3 border-b border-gray-200  text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {i.creationTime}</p>
                                        </td>
                                        <td className="py-3 border-b border-gray-200 text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {i.total.toLocaleString('vi-VN')} VNĐ
                                            </p>
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-200 text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {i.billOwed.toLocaleString('vi-VN')} VNĐ
                                            </p>
                                        </td>

                                        <td
                                            className="py-3 border-b border-gray-200 text-sm"
                                            style={{position: 'relative'}}
                                            onMouseEnter={() => {
                                                handleMouseEnter(i.nameSupplier);
                                            }}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            {i.nameSupplier.length > 19
                                                ? `${i.nameSupplier.slice(0, 19)}...`
                                                : i.nameSupplier
                                            }
                                            {showContent && medicine === i.nameSupplier &&
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        background: '#f3f3f5',
                                                        top: '-1%',
                                                        boxSizing: 'border-box',
                                                        width: '190px',
                                                        height: 'auto',
                                                        minHeight: '82px',
                                                        zIndex: 99
                                                    }}>{i.nameSupplier}</div>
                                            }
                                        </td>
                                        <td
                                            className="py-3 border-b border-gray-200 text-sm"
                                            style={{position: 'relative'}}
                                            onMouseEnter={() => {
                                                handleMouseEnter(i.address);
                                            }}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            {i.address.length > quantity
                                                ? `${i.address.slice(0, quantity)}...`
                                                : i.address
                                            }
                                            {showContent && medicine === i.address &&
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        background: '#f3f3f5',
                                                        top: '-1%',
                                                        boxSizing: 'border-box',
                                                        width: '190px',
                                                        height: 'auto',
                                                        minHeight: '82px',
                                                        zIndex: 99
                                                    }}>{i.address}</div>
                                            }
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
                        <Link to={`/dashboard/invoice/create`}><a className="btn btn-outline-primary"
                                                                  href="#"
                                                                  title="Thêm"
                                                                  style={{marginLeft: '5px'}}>
                            <FaPlus style={{marginBottom: '5px'}}/> Thêm mới</a></Link>

                        <Link to={`/dashboard/invoice/detail/${idClick.id}`}>
                            <a
                                className="btn btn-outline-primary"
                                href="#"
                                title="Chi tiết"
                                style={{marginLeft: '5px'}}
                                onClick={(e) => {
                                    if (idClick.id == null || idClick.id == undefined) {
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
                            ><FaInfo style={{fontSize: '20px', marginBottom: '5px'}}/>
                                Chi tiết
                            </a>
                        </Link>

                        <Link to={`/dashboard/invoice/edit/${idClick.id}`}>
                            <a className="btn btn-outline-primary"
                               title="Sửa"
                               style={{marginLeft: '5px'}}
                               onClick={(e) => {
                                   if (idClick.id == null || idClick.id == undefined) {
                                       e.preventDefault();
                                       Swal.fire({
                                           icon: 'error',
                                           title: 'Bạn chưa chọn hóa đơn!',
                                           showConfirmButton: false,
                                           timer: 1500,
                                       });
                                       return false;
                                   }
                               }}>
                                <FiEdit style={{fontSize: '20px', marginBottom: '5px'}}/> Sửa
                            </a></Link>

                        <a style={{marginLeft: '5px'}}
                           title="Xóa"
                           className="btn btn-outline-primary" onClick={() => {
                            handleDeleteEmployee(`${idClick.id}`, `${idClick.code}`);
                        }}>
                            <FaRegTrashAlt style={{fontSize: '20px', marginBottom: '5px'}}/> Xóa
                        </a>
                        <Link to={`/home`}><a style={{marginLeft: '5px'}} className="btn btn-outline-primary"
                                              href="#" title="Trở về">
                            <AiOutlineRollback style={{fontSize: '20px', marginBottom: '5px'}}/> Trở về</a></Link>
                    </div>
                </div>
            </div>

            <ToastContainer/>
        </div>
    );

}

export default InvoiceList;