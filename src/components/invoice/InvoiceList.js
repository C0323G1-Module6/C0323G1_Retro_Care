import React, {useEffect, useState} from "react";
import {getInvoiceList, searchInvoice} from "../../services/invoice/InvoiceService";
import '../../components/invoice/HuyDH_Invoice.css'
import Swal from "sweetalert2";

/**
 * Create by: HuyHD
 * Day cteare: 18/09/2023
 * @returns {JSX.Element}
 * @constructor
 */


function InvoiceList() {
    const [invoiceList, setInvoiceList] = useState([])
    const [invoicess, setInvoicess] = useState([])
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


    const [searchTotalPages, setSearchTotalPages] = useState(0);


    const getListInvoice = async (page) => {
        const data = await getInvoiceList(page);
        if (isSearching) {
            setInvoiceList(displayedList);
            setTotalPages(searchTotalPages);
        } else {
            setInvoiceList(data.content);
            setTotalPages(data.totalPages);
            setDisplayedList(data.content);
        }
    };

    const handleFilter = async () => {
        const data = await searchInvoice(startDate, endDate, startTime, endTime, sortColumn, 0, 2);

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
        setDisplayedList(data.content);
        setSearchTotalPages(data.totalPages);
        setSearchPage(currentPage);
    };

    console.log(displayedList);
    useEffect(() => {
        getListInvoice(searchPage);
    }, [searchPage]);

    const handlePageChange = async (page) => {
        setCurrentPage(page);
        setSearchPage(page);
    };


    return (
        <div>
            <meta charSet="UTF-8"/>
            <title>Quản Lí Kho</title>
            <link rel='stylesheet'
                  href='https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.4.6/tailwind.min.css'/>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
                  rel="stylesheet"
                  integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
                  crossOrigin="anonymous"/>

            <link rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"/>

            <div className="container mx-auto px-4 sm:px-8">
                <div>
                    <h1 className=" font-semibold leading-tight"
                        style={{textAlign: 'center', marginBottom: '20px', color: 'blue'}}>
                        DANH SÁCH HÓA ĐƠN NHẬP KHO</h1>
                </div>
                <div className="row">
                    {/*                <div class="row text-center" style="border: 2px solid #5f8ef3; border-radius: 10px; padding: 10px">*/}
                    <div className="col">
                        <label>Từ ngày:</label>
                        <input type="date" id="start-date" className="filter-input_huyhd"
                               onChange={(e) => setStartDate(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label>Đến ngày:</label>
                        <input type="date" id="end-date" className="filter-input_huyhd"
                               onChange={(e) => setEndDate(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label>Từ giờ:&nbsp;&nbsp;&nbsp;</label>
                        <input
                            type="text"
                            id="start-time"
                            className="filter-input_huyhd"
                            pattern="(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]"
                            onChange={(e) => {
                                const inputTime = e.target.value;
                                const formattedTime = inputTime + ":00";
                                setStartTime(formattedTime);
                            }}
                        />
                    </div>
                    <div className="col">
                        <label>Đến giờ:</label>
                        <input type="time" id="end-time" className="filter-input_huyhd"
                               onChange={(e) => setEndTime(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label>Sắp xếp theo: </label>
                        <select style={{height: '35px', border: 'solid 1px #d6d8d9', borderRadius: '3px'}}
                                onChange={(e) => setSortColumn(e.target.value)}>
                            <option value="Mã hoá đơn">Mã hóa đơn</option>
                            <option value="Tên khách hàng">Số CT</option>
                            <option value="Ngày lập">Ngày lập</option>
                            <option value="Giờ lập">Giờ lập</option>
                            <option value="Tổng tiền">Tổng tiền</option>
                            <option value="Người lập">Nợ hóa đơn</option>
                            <option value="Người lập">Nhà cung cấp</option>
                        </select>
                    </div>
                    <div className="col"
                         style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                        <button className="btn btn-outline-primary " onClick={handleFilter}>><span><i
                            className="fa-solid fa-magnifying-glass"/></span>
                            Lọc kết quả
                        </button>
                    </div>
                </div>
                {/*                </div>*/}
                <div className="-mx-2 sm:-mx-7 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden ">
                        <table className="min-w-full leading-normal table table-hover mb-0">
                            <thead>
                            <tr className="table_header_employee">
                                <th className="col-1 py-2  border-b-2  text-left text-xs    tracking-wider"
                                    style={{fontSize: '1rem'}}>
                                    STT
                                </th>
                                <th className="col-1   border-b-2  text-left text-xs    tracking-wider "
                                    style={{fontSize: '1rem'}}>
                                    Mã HĐ
                                </th>
                                <th className="col-1  border-b-2   text-left text-xs    tracking-wider"
                                    style={{fontSize: '1rem'}}>
                                    Số CT
                                </th>
                                <th className="col-1  border-b-2   text-left text-xs    tracking-wider"
                                    style={{fontSize: '1rem'}}>
                                    Ngày Lập
                                </th>
                                <th className="col-1   border-b-2   text-left text-xs    tracking-wider"
                                    style={{fontSize: '1rem'}}>
                                    Giờ Lập
                                </th>
                                <th className="col-1  px-0 border-b-2   text-left text-xs    tracking-wider"
                                    style={{fontSize: '1rem'}}>
                                    Tổng Tiền
                                </th>
                                <th className="col-1  px-2 border-b-2   text-left text-xs    tracking-wider"
                                    style={{fontSize: '1rem'}}>
                                    Nợ HĐ
                                </th>
                                <th className="col-3   border-b-2   text-left text-xs    tracking-wider"
                                    style={{fontSize: '1rem'}}>
                                    Nhà Cung Cấp
                                </th>
                                <th className="col-3  border-b-2   text-left text-xs    tracking-wider"
                                    style={{fontSize: '1rem'}}>
                                    Địa Chỉ
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {invoiceList.map((i, index) => (
                                <tr key={i.id}>
                                    <td className="col  py-3 px-3 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                                    </td>
                                    <td className="col  py-3 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{i.code}</p>
                                    </td>
                                    <td className="col  py-3 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{i.documentNumber}</p>
                                    </td>
                                    <td className="col py-3 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {i.creationDay}</p>
                                    </td>
                                    <td className="col py-3 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {i.creationTime}</p>
                                    </td>
                                    <td className="col py-3 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{i.total}</p>
                                    </td>
                                    <td className="col px-2 py-3 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{i.billOwed}</p>
                                    </td>
                                    <td className="col py-3 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{i.name}</p>
                                    </td>
                                    <td className="col py-3 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{i.address}</p>
                                    </td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                        <div
                            className="px-5 py-3 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                            <div className=" justify-content-center d-flex ">
                                {currentPage !== 0 && (<button
                                    className={`btn btn-primary`}
                                    style={{margin: '5px'}}
                                    disabled={currentPage === 0}
                                    title="Trang trước"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    <i className="fa-solid fa-angles-left"></i>
                                </button>)}


                                <button
                                    key={currentPage}
                                    className="text-sm py-2 px-4"
                                    style={{
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


                                {currentPage !== totalPages - 1 && (
                                    <button
                                        className='btn btn-primary'
                                        style={{margin: '5px'}}
                                        title="Trang sau"
                                        disabled={currentPage === totalPages - 1}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        <i className="fa-solid fa-angles-right"></i>
                                    </button>
                                )}
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
                        <a className="btn btn-outline-primary"
                           href="/prototype/warehouse/CuongHLT_CreateInvoice.html" title="Thêm">
                            <i className="fa-solid fa-plus"/> Thêm mới</a>
                        {/*            <a class="btn btn-outline-primary" href="#" title="Chi tiết">*/}
                        {/*                <i class="fa-solid fa-circle-info"></i> Chi tiết*/}
                        {/*            </a>*/}
                        <a className="btn btn-outline-primary" href="/prototype/warehouse/CuongHLT_EditInvoice.html"
                           title="Sửa"><i className="fa-solid fa-pen-to-square"/> Sửa
                        </a>
                        <a href="#" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" title="Xóa"
                           className="btn btn-outline-primary">
                            <i className="fa-solid fa-trash"/> Xóa
                        </a>
                        <a className="btn btn-outline-primary" href="/HuyL_home.html" title="Trở về">
                            <i className="fa-regular fa-circle-left"/> Trở về</a>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel5"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header table_header_employee">
                            <h1 className="modal-title fs-5" id="exampleModalLabel5">Xóa hóa đơn</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <p>Bạn chắn chắn muốn xóa hóa đơn nhập kho có mã hóa đơn
                                <span style={{color: '#dfa512'}} id="nameDelete">HĐ006 </span> <span>không?</span>
                            </p>
                            <p className="error_red_employee">Lưu ý: hành động này không thể hoàn tác!</p>
                        </div>
                        <div className="modal-footer">
                            <form>
                                <div className="d-flex">
                                    <input type="hidden" name="idDelete" id="idDelete"/>
                                    <button type="button" className="btn form_exit_employee"
                                            data-bs-dismiss="modal">Thoát
                                    </button>
                                    <button type="submit" className="btn"
                                            style={{background: '#0d6efd', color: 'white'}}>Xác Nhận
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/*modal detail*/}
            <div className="modal fade" id="exampleModal1" tabIndex={-1} aria-labelledby="exampleModalLabel5"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header table_header_employee">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">CHI TIẾT NHÂN VIÊN</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex">
                                <div className="col-md-4" style={{marginRight: '20px', paddingTop: '10px'}}>
                                    <img
                                        src="https://media.istockphoto.com/id/1322346877/vector/user-avatar-profile-icon.jpg?s=170667a&w=0&k=20&c=vsp2DIGo7MXd48Wjqi8cM4BikpzeAIO4oYZfWI_q1pQ="
                                        className="img-fluid rounded-start" alt="..."/>
                                </div>
                                <div className="col-md-8">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td><p><b>Nhân viên:</b></p></td>
                                            <td><p
                                                style={{color: '#dfa512', paddingLeft: '10px', fontSize: '20px'}}>Lê
                                                Thị Hồng Vân</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><p>Giới tính: </p></td>
                                            <td style={{paddingLeft: '10px'}}><p>Nữ</p></td>
                                        </tr>
                                        <tr>
                                            <td><p>Số CCCD: </p></td>
                                            <td style={{paddingLeft: '10px'}}><p>01234567899</p></td>
                                        </tr>
                                        <tr>
                                            <td><p>Email: </p></td>
                                            <td style={{paddingLeft: '10px'}}><p>hongvan@gmail.com</p></td>
                                        </tr>
                                        <tr>
                                            <td><p>Ngày sinh: </p></td>
                                            <td style={{paddingLeft: '10px'}}><p>01/01/1999</p></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <input type="hidden" name="idDetail" id="idDetail"/>
                            <button type="button" className="btn form_exit_employee" data-bs-dismiss="modal">Thoát
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default InvoiceList;