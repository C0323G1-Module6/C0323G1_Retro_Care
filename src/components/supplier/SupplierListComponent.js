import React, {useEffect, useState} from "react";
import {deleteSupplierById, getListSupplier, getSupplierById} from "../../services/supplier/SupplierService";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
import '../../css/supplier/ThanhVh_ListSupplier.css'



function SupplierListComponent() {
    const [suppliers, setSuppliers] = useState([]);
    let [page, setPage] = useState(0)
    const [supplier,setSupplier] = useState(null);

    const getList = async (pageable) => {
        try {
            const supplierData = await getListSupplier(pageable);
            setSuppliers(supplierData);
        } catch (error) {
            await setPageFunction(0)
                .then(getList(0));
            Swal.fire({
                icon: "error",
                title: "Không tìm thấy dữ liệu!",
                showConfirmButton: false,
                timer: 2000,
            })
        }
    }
    useEffect(() => {
        // Thay đổi thuộc tính của thẻ <body>
        document.body.style.backgroundColor = '#edf2f7';
      }, []);

    const setPageFunction = async (pageAfter) => {
        setPage(pageAfter)
    }
    useEffect(() => {
        getList(page);
    }, []);
    const nextPage = async () => {
        page += 1;
        if (page < suppliers.totalPages) {
            await setPageFunction(page).then((await getList(page)))
        } else {
            page -= 1
        }
    }
    const previousPage = async () => {
        if (page >= 1) {
            page -= 1
        }
        await setPageFunction(page).then((await getList(page)))
    }
    const handleDelete = () => {
        if (getSupplierById(supplier.idSupplier) !== null) {
           Swal.fire({
            title: 'Bạn có muốn xoá khách hàng ' + supplier.nameSupplier + '?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            reverseButtons: true
           }).then(async (result) => {
              if(result.isConfirmed) {
                try {
                    await deleteSupplierById(supplier.idSupplier)
                    setSuppliers(await getListSupplier(page))
                    Swal.fire({
                        icon: 'success',
                        title: 'Xóa thành công!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } catch(e) {
                    setPageFunction(0)
                    setSuppliers(await getListSupplier(0))
                    Swal.fire({
                        icon: 'success',
                        title: 'Xóa thành công!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
              }
           })
        }
    };
    console.log(supplier);

    return (
        <>
            <div id="ThanhVH">
                <meta charSet="UTF-8"/>
                <title>Quản lý nhà cung cấp</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
                      crossOrigin="anonymous"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"/>
                {/* <link href="../../css/supplier/ThanhVH_ListSupplier.css" rel="stylesheet" media="all"/> */}
                <div className=" antialiased font-sans bg-gray-200">
                    <div className="container mx-auto px-4 sm:px-8">
                        <div>
                            <div>
                                <h2 className="text-2xl font-semibold leading-tight"
                                    style={{textAlign: 'center', marginBottom: '20px'}}>DANH
                                    SÁCH
                                    NHÀ CUNG CẤP</h2>
                            </div>
                            <div className="row row-function" style={{display: 'flex'}}>
                                <div className="col-9 col-search">
                                    <div className="btn-group">
                                        <span style={{color:'black'}}>Lọc theo</span>
                                        <button type="button" className="btn btn-primary dropdown-toggle"
                                                data-bs-toggle="dropdown" aria-expanded="true"
                                                style={{marginTop: '-3px', marginLeft: '7px', borderRadius: '8px'}}>
                                            ---Chọn trường---
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item">Mã nhà cung cấp</a></li>
                                            <li><a className="dropdown-item">Tên nhà cung cấp</a></li>
                                            <li><a className="dropdown-item">Địa chỉ</a></li>
                                            <li><a className="dropdown-item">Số điện thoại</a></li>
                                        </ul>
                                    </div>
                                    <input style={{
                                        width: '250px',
                                        borderRadius: '5px',
                                        boxSizing: 'border-box',
                                        borderWidth: 0,
                                        border: '1px solid grey',
                                        height: '39px'
                                    }} placeholder="Tìm kiếm theo mã cung cấp"
                                           className="appearance-none pl-8 pr-6 py-2 bg-white text-sm focus:outline-none"/>
                                    <button className="btn btn-outline-primary" style={{
                                        marginRight: 'auto',
                                        width: '50px',
                                        marginLeft: '5px',
                                        marginTop: '-3px'
                                    }}>
                                        <i className="fa-solid fa-magnifying-glass"/>
                                    </button>
                                </div>
                                <div className="col-3 col-function" style={{}}>
                                    <span style={{color:'black'}}>Sắp xếp</span>
                                    <button type="button" className="btn btn-primary dropdown-toggle"
                                            data-bs-toggle="dropdown" aria-expanded="true">
                                        ---Chọn trường---
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item">Mã nhà cung cấp</a></li>
                                        <li><a className="dropdown-item" >Tên nhà cung cấp</a></li>
                                        <li><a className="dropdown-item" >Địa chỉ</a></li>
                                        <li><a className="dropdown-item" >Số điện thoại</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="-mx-2 sm:-mx-7 py-4 overflow-x-auto">
                                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden"
                                     style={{borderRadius: '10px'}}>
                                    <table className="min-w-full leading-normal table table-hover " id="myTable">
                                        <thead>
                                        <tr style={{background: '#0d6efd', color: '#ffffff', borderRadius: '10px'}}>
                                            <th className="px-2 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                            </th>
                                            <th className="px-2 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                Mã cung cấp
                                            </th>
                                            <th className="px-2 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
                                                Nhà cung cấp
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
                                        {suppliers.length !== 0 ?
                                            <tbody>
                                            {suppliers.content.map((item, index) => (
                                                <tr key={`ctm_${item.idSupplier}`} onClick={() => setSupplier(item)}
                                                    className={supplier === item ? 'gray' : ''}>
                                                    <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                                                        <div className="flex items-center">
                                                            <div className="ml-3">
                                                                <p>
                                                                    {(page * 5) + (index + 1)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                                                        <p >
                                                            {item.codeSupplier}
                                                        </p>
                                                    </td>
                                                    <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                                                        <Link
                                                           style={{textDecoration: 'none'}}
                                                              to={`/supplier/detail-supplier/${item.idSupplier}`}>
                                                            <b>{item.nameSupplier}</b>
                                                        </Link>
                                                    </td>
                                                    <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                                                        <p >
                                                            {item.address}
                                                        </p>
                                                    </td>
                                                    <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                                                        <p >
                                                            {item.phoneNumber}
                                                        </p>
                                                    </td>
                                                    <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                                                        <p >
                                                            {item.debt} VNĐ
                                                        </p>
                                                    </td>
                                                    <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                                                        <p>
                                                            {item.note}
                                                        </p>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody> :
                                            <tbody>
                                            <tr style={{height: '150px'}}>
                                                <td style={{color: 'red', fontSize: '50px',textAlign:'center'}} colSpan="9">Không có dữ
                                                    liệu
                                                </td>
                                            </tr>
                                            </tbody>
                                        }

                                    </table>
                                    <div className="justify-content-center d-flex rounded-bottom shadow m-3">
                                        {page !== 0 ?
                                            <button className="btn btn-primary" style={{margin: '5px'}}
                                                    onClick={async () => {

                                                        await previousPage()
                                                    }}>
                                                <i className="fa-solid fa-angles-left"/>
                                            </button> :
                                            <button className="btn btn-primary" style={{margin: '5px'}}
                                                    onClick={async () => {

                                                        await previousPage()
                                                    }}>
                                                <i className="fa-solid fa-angles-left"/>
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
                                            <button className="btn btn-primary" style={{margin: '5px'}}
                                                    onClick={async () => {

                                                        await nextPage();
                                                    }}>
                                                <i className="fa-solid fa-angles-right"/>
                                            </button> :
                                            <button className="btn btn-primary" style={{margin: '5px'}}
                                                    onClick={async () => {

                                                        await nextPage();
                                                    }}>
                                                <i className="fa-solid fa-angles-right"/>
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="function" style={{textAlign: 'right', marginTop: '-10px'}}>
                            <Link className="btn btn-outline-primary" to={`/home`}>Trở về</Link>
                            <Link className="btn btn-outline-primary"
                               to={`/supplier/update-supplier/`}><i
                                className="fa-solid fa-pen-to-square"/> Sửa
                            </Link>
                            <button type="button" title="Xóa"
                               className="btn btn-outline-primary" onClick={handleDelete}>
                                <i className="fa-solid fa-trash"/> Xoá
                            </button>
                            <Link className="btn btn-outline-primary"
                               to={`/supplier/create-supplier`}><i
                                className="fa-solid fa-plus"/> Thêm mới</Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SupplierListComponent;