import React, { useEffect, useState } from "react";
import { deleteSupplierById, getListSupplier } from "../../services/supplier/SupplierService";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import '../../css/supplier/ThanhVh_ListSupplier.css'
import {
    AiOutlineRollback,
    AiOutlineDoubleLeft,
    AiOutlineDoubleRight,
} from "react-icons/ai";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";



function SupplierListComponent() {
    const [suppliers, setSuppliers] = useState();
    const [supplier, setSupplier] = useState({});
    let [page, setPage] = useState(0)
    let [sortBy, setSortBy] = useState('')
    let [code, setCode] = useState('');
    let [name, setName] = useState('');
    let [phoneNumber, setPhoneNumber] = useState('');
    let [address, setAddress] = useState('');
    let [optionSearch, setOptionSearch] = useState("");
    let [searchInput, setSearchInput] = useState('');
    const quantity = 20;

    // ----------------List ----------------------
    const getSupplier = (item) => {
        if (supplier === item) {
            setSupplier("")
        } else {
            setSupplier(item);
        }
    }

    const getList = async (pageable, code, name, phoneNumber, address, sortBy) => {
        try {
            const supplierData = await getListSupplier(pageable, code, name, phoneNumber, address, sortBy);
            setSuppliers(supplierData);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Không tìm thấy nhà cung cấp',
                showConfirmButton: false,
                timer: 1500
            })
            setSearchInput('')
            setAddress('')
            setName('')
            setCode('')
            setSortBy('')

        }
    }

    useEffect(() => {
        document.body.style.backgroundColor = '#edf2f7';
        document.title = 'RetroCare - Danh sách nhà cung cấp';
    }, []);
    // -------------- phân trang -----------------------
    const setPageFunction = async (pageAfter) => {
        setPage(pageAfter)
    }
    useEffect(() => {
        getList(page, code, name, phoneNumber, address, sortBy);
    }, [page, code, name, phoneNumber, address]);

    const nextPage = async () => {
        page += 1;
        if (page < suppliers.totalPages) {
            await setPageFunction(page).then((await getList(page, code, name, phoneNumber, address, sortBy)))
        } else {
            page -= 1
        }
    }
    const previousPage = async () => {
        if (page >= 1) {
            page -= 1
        }
        await setPageFunction(page).then((await getList(page, code, name, phoneNumber, address, sortBy)))
    }
    // -------------- Search và sắp xếp -----------------
    const handleOptionSearch = (e) => {
        const value = e.target.value;
        setOptionSearch(value);
        setPage(0);
        setCode("");
        setName("");
        setPhoneNumber("");
        setAddress("")
        setSortBy("");
    }
    const handleInputSearch = (e) => {
        setSearchInput(e.target.value);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleClickSearch()
        }
    }
    const handleClickSearch = () => {
        if (optionSearch === null || optionSearch === "") {
            Swal.fire({
                icon: 'warning',
                timer: 1500,
                title: 'Vui lòng chọn trường để để tìm kiếm'
            })
        } else {
            switch (optionSearch) {
                case 'code':
                    setCode(searchInput.trim());
                    break;
                case 'name':
                    setName(searchInput.trim());
                    break;
                case 'address':
                    setAddress(searchInput.trim());
                    break;
                case 'phone_number':
                    setPhoneNumber(searchInput.trim());
                    break;
            }
        }

        resetInputSearch();
    }
    const handleSortOption = (event) => {
        const value = event.target.value;
        getList(page, code, name, phoneNumber, address, value)
    }
    const resetInputSearch = () => {
        setSearchInput("");
    }
    //---------- format tiền việt ---------------------
    const changePrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    // -------------- Xoá ---------------------

    const handleDelete = () => {
        if (supplier.idSupplier === null || supplier.idSupplier === undefined) {
            Swal.fire({
                title: 'Vui lòng chọn nhà cung cấp',
                icon: 'warning',
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1000
            })
        } else {
            Swal.fire({
                title: 'Bạn có muốn xoá nhà cung cấp ' + '<span style="color: #dfa512;">' + supplier.nameSupplier + '</span>' + ' ?',
                html: '<p style = " color: red">Bạn sẽ không thể hoàn tác hành động này!</p>',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Không',
                reverseButtons: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await deleteSupplierById(supplier.idSupplier)
                        setSuppliers(await getListSupplier(page, code, name, phoneNumber, address, sortBy))
                        Swal.fire({
                            icon: 'success',
                            title: 'Xóa thành công!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } catch (e) {
                        setPageFunction(0)
                        setSuppliers(await getListSupplier(0))
                        Swal.fire({
                            icon: 'warning',
                            title: 'Xóa thất bại!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
            })
        }
    };
    if (!suppliers) {
        return null;
    }

    return (
        <>
            <div id="ThanhVH" >
                <meta charSet="UTF-8" />
                <title>Quản lý nhà cung cấp</title>
                <link rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" />
                <div className=" antialiased font-sans bg-gray-200">
                    <div className="container mx-auto px-4 sm:px-8">
                        <div>
                            <div>
                                <h1 className="text-2xl font-semibold leading-tight"
                                    style={{ textAlign: 'center', color: 'rgb(13, 110, 253)' }}>DANH
                                    SÁCH
                                    NHÀ CUNG CẤP</h1>
                            </div>
                            <div className="row row-function" style={{ display: 'flex' }}>
                                <div className="col-8 col-search" style={{ marginTop: '24px', float: 'left' }}>
                                    <div className="btn-group" style={{ marginTop: '-4px' }}>
                                        <span style={{ color: 'black', marginTop: '10px' }}>Lọc theo</span>
                                        <select name='optionSearch' onChange={handleOptionSearch}
                                            className="form-select m-1" style={{ width: 200, height: '40px' }}>
                                            <option value={''}>Chọn trường</option>
                                            <option value={'code'}> Mã nhà cung cấp</option>
                                            <option value={'name'}>Tên nhà cung cấp</option>
                                            <option value={'address'}>Địa chỉ</option>
                                            <option value={'phone_number'}>Số điện thoại</option>
                                        </select>
                                    </div>
                                    <input
                                        onKeyDown={handleKeyDown}
                                        onChange={handleInputSearch}
                                        value={searchInput}
                                        style={{
                                            width: '250px',
                                            borderRadius: '5px',
                                            boxSizing: 'border-box',
                                            borderWidth: 0,
                                            border: '1px solid grey',
                                            height: '39px'
                                        }} placeholder={
                                            optionSearch === 'code' ? 'Tìm kiếm theo mã cung cấp' :
                                                optionSearch === 'name' ? 'Tìm kiếm theo tên nhà cung cấp' :
                                                    optionSearch === 'address' ? 'Tìm kiếm theo địa chỉ' :
                                                        optionSearch === 'phone_number' ? 'Tìm kiếm theo số điện thoại' :
                                                            'Chọn trường'
                                        }
                                        className="appearance-none pl-8 pr-6 py-2 bg-white text-sm focus:outline-none" />
                                    <button onClick={() => {
                                        handleClickSearch();
                                        resetInputSearch();
                                    }}
                                        className="btn btn-outline-primary" style={{
                                            marginRight: 'auto',
                                            width: '50px',
                                            marginLeft: '5px',
                                            marginTop: '-3px'
                                        }} >
                                        <i className="fa-solid fa-magnifying-glass" />
                                    </button>
                                </div>
                                <div className="col-4 col-function" style={{ float: 'right' }}>
                                    <div className="btn-group" style={{ marginTop: '20px', float: 'right' }}>
                                        <span style={{ marginTop: '13px' }}>Sắp xếp</span>
                                        <select name='optionSort' onChange={handleSortOption}
                                            className="form-select m-1" style={{ width: 200, height: '40px' }}>
                                            <option value={''}>Chọn trường</option>
                                            <option value={'code'}> Mã nhà cung cấp</option>
                                            <option value={'name'}>Tên nhà cung cấp</option>
                                            <option value={'address'}>Địa chỉ</option>
                                            <option value={'phone_number'}>Số điện thoại</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="-mx-2 sm:-mx-7 py-4 overflow-x-auto">
                                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden"
                                    style={{ borderRadius: '10px' }}>
                                    {suppliers.content && suppliers.content.length !== 0 ?
                                        <div>
                                            <div style={{ minHeight: "27.2rem" }}>
                                                <table className="min-w-full leading-normal table table-hover " id="myTable" style={{ tableLayout: "fixed" }}>
                                                    <colgroup>
                                                        <col style={{ width: "25px" }} />
                                                        <col style={{ width: "70px" }} />
                                                        <col style={{ width: "107px" }} />
                                                        <col style={{ width: "106px" }} />
                                                        <col style={{ width: "80px" }} />
                                                        <col style={{ width: "67px" }} />
                                                        <col style={{ width: "80px" }} />

                                                    </colgroup>
                                                    <thead>
                                                        <tr style={{ background: '#0d6efd', color: '#ffffff', borderRadius: '10px' }}>
                                                            <th className="px-2 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                            </th>
                                                            <th className="px-2 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                                Mã cung cấp
                                                            </th>
                                                            <th className="px-2 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                                Tên nhà cung cấp
                                                            </th>
                                                            <th className="px-2 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                                Địa chỉ
                                                            </th>
                                                            <th className="px-2 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                                Số điện thoại
                                                            </th>
                                                            <th className="px-2 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                                Công nợ
                                                            </th>
                                                            <th className="px-2 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                                Ghi chú
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {suppliers.content.map((item, index) => (
                                                            <tr key={`ctm_${item?.idSupplier}`} onClick={() => getSupplier(item)}
                                                                className={supplier === item ? 'gray' : ''}>
                                                                <td className="px-3 py-3 border-b border-gray-200  text-sm">
                                                                    <div className="flex items-center">
                                                                        <div className="ml-3">
                                                                            <p>
                                                                                {(page * 5) + (index + 1)}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-2 py-3 border-b border-gray-200 text-sm">
                                                                    <p >
                                                                        {item.codeSupplier.length > quantity ? `${item.codeSupplier.slice(0, quantity)}...` : item.codeSupplier}
                                                                    </p>
                                                                </td>
                                                                <td className="px-2 py-3 border-b border-gray-200 text-sm">
                                                                    <Link
                                                                        style={{ textDecoration: 'none' }}
                                                                        to={`/dashboard/supplier/detail-supplier/${item.idSupplier}`}>
                                                                        <b>{item.nameSupplier.length > quantity ? `${item.nameSupplier.slice(0, quantity)}...` : item.nameSupplier}</b>
                                                                    </Link>
                                                                </td>
                                                                <td className="px-2 py-3 border-b border-gray-200 text-sm">
                                                                    <p >
                                                                        {item.address.length > quantity ? `${item.address.slice(0, quantity)}...` : item.address}
                                                                    </p>
                                                                </td>
                                                                <td className="px-2 py-3 border-b border-gray-200 text-sm">
                                                                    <p >
                                                                        {item.phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3')}
                                                                    </p>
                                                                </td>
                                                                <td className="px-2 py-3 border-b border-gray-200 text-sm">
                                                                    <p >
                                                                        {changePrice(item.debt)} VNĐ
                                                                    </p>
                                                                </td>
                                                                <td className="px-2 py-3 border-b border-gray-200  text-sm">
                                                                    <p>
                                                                        {item.note.length > quantity ? `${item.note.slice(0, quantity)}...` : item.note}
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>

                                            </div>
                                            <div className="justify-content-center d-flex rounded-bottom shadow m-3">
                                                {page !== 0 ?
                                                    <button className="btn btn-primary" style={{ margin: '5px' }}
                                                        onClick={async () => {

                                                            await previousPage()
                                                        }}>
                                                        <AiOutlineDoubleLeft />
                                                    </button> :
                                                    <button className="btn btn-primary" disabled style={{ margin: '5px' }}>

                                                        <AiOutlineDoubleLeft />
                                                    </button>
                                                }

                                                <div className="text-sm py-2 px-4" style={{
                                                    background: '#0d6efd',
                                                    color: '#ffffff',
                                                    margin: '5px',
                                                    borderRadius: '5px'
                                                }}>
                                                    {page + 1}/{suppliers.totalPages}
                                                </div>
                                                {page !== suppliers.totalPages - 1 ?
                                                    <button className="btn btn-primary" style={{ margin: '5px' }}
                                                        onClick={async () => {

                                                            await nextPage();
                                                        }}>
                                                        <AiOutlineDoubleRight />
                                                    </button> :
                                                    <button className="btn btn-primary" disabled style={{ margin: '5px' }}>
                                                        <AiOutlineDoubleRight />
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                        :
                                        <table className="min-w-full leading-normal table table-hover " id="myTable">
                                            <thead>
                                                <tr style={{ background: '#0d6efd', color: '#ffffff', borderRadius: '10px' }}>
                                                    <th className="px-2 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                    </th>
                                                    <th className="px-2 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                        Mã cung cấp
                                                    </th>
                                                    <th className="px-2 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                        Tên nhà cung cấp
                                                    </th>
                                                    <th className="px-2 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                        Địa chỉ
                                                    </th>
                                                    <th className="px-2 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                        Số điện thoại
                                                    </th>
                                                    <th className="px-2 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                        Công nợ
                                                    </th>
                                                    <th className="px-2 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                        Ghi chú
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr style={{ height: '150px' }}>
                                                    <td style={{ color: 'red', fontSize: '50px', textAlign: 'center' }} colSpan="9">Không có dữ
                                                        liệu
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    }


                                </div>
                            </div>
                        </div>
                        <div className="function" style={{ textAlign: 'right', marginTop: '-10px' }}>
                            <Link className="btn btn-outline-primary" style={{ marginRight: '10px' }}
                                to={`/dashboard/supplier/create-supplier`}><FaPlus
                                /> Thêm mới</Link>

                            {
                                supplier.idSupplier === null || supplier.idSupplier === undefined ?
                                    <button className="btn btn-outline-primary" style={{ marginRight: '10px' }}
                                        onClick={() => {
                                            Swal.fire({
                                                icon: "warning",
                                                title: "Vui lòng chọn nhà cung cấp",
                                                showConfirmButton: false,
                                                timer: 1000,

                                            })
                                        }}
                                    >  <FiEdit /> Sửa </button> :
                                    <Link className="btn btn-outline-primary" style={{ marginRight: '10px' }}
                                        to={`/dashboard/supplier/update-supplier/${supplier.idSupplier}`}>
                                        <FiEdit /> Sửa
                                    </Link>
                            }


                            <button type="button" title="Xóa" style={{ marginRight: '10px' }}
                                className="btn btn-outline-primary" onClick={handleDelete}>
                                <FaRegTrashAlt /> Xoá
                            </button>
                            <Link className="btn btn-outline-secondary" to={`/home`}><AiOutlineRollback />Trở về</Link>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SupplierListComponent;