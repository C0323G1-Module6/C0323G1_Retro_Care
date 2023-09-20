import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {findAll, getListMedicine} from "../../services/medicine/MedicineService";

function MedicineList() {
    const navigate = useNavigate()
    const [medicineList, setMedicineList] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [searchItem,setSearchItem] = useState()

    // const pageSize = 5;
    //
    // const searchName =
    //
    // let resultSearch = document.getElementById("search").value;


    const getListMedicine = async () => {
        const result = await findAll();
        setTotalPage(result.totalPages);
        setMedicineList(result.content);
    }

    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage((pre) => pre - 1)
        }
    }

    const nextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage((pre) => pre + 1)
        }
    }

    const handleSelect = (value) => {
        setSearchItem(value);
    }

    useEffect(() => {
        getListMedicine();
    }, [])

    if (!medicineList) {
        return null;
    }
    return (
        <>
            <div className="container">
                <div className="row header" style={{textAlign: 'center', color: '#0D6EFD'}}>
                    <h1 className="mt-4 mb-3">DANH SÁCH THUỐC</h1>
                </div>
                <div className="row row-function" style={{display: 'flex'}}>
                    <div className="col-9 col-search d-flex align-items-center justify-content-start gap-3">

                        <label>Lọc theo: </label>
                        <select style={{width: '150px', borderRadius: '5px', color: 'blue'}}
                                className="appearance-none pl-8 pr-6 py-2">
                            <option selected value="searchByCode">Mã thuốc</option>
                            <option value="searchByNameKindOfMedicine" >Nhóm thuốc</option>
                            <option value="searchByName" >Tên thuốc</option>
                            <option value="searchByActiveElement" >Hoạt chất</option>
                            <option value="4">Giá bán lẻ</option>
                        </select>

                        <select style={{width: '150px', borderRadius: '5px', color: 'blue'}}
                                className="appearance-none pl-8 pr-6 py-2">
                            <option selected>Điều kiện</option>
                            <option value="1">Bằng</option>
                            <option value="2">Lớn hơn</option>
                            <option value="3">Nhỏ hơn</option>
                            <option value="4">Lớn hơn bằng</option>
                            <option value="5">Nhỏ hơn bằng</option>
                            <option value="6">Khác</option>
                            <option value="7">Tất cả</option>
                        </select>
                        <input style={{width: '250px', borderRadius: '5px'}}
                               className="appearance-none pl-8 pr-6 py-2 bg-white text-sm focus:outline-none"
                               placeholder="Tìm kiếm thuốc..."/>
                        <button className="btn btn-outline-primary"
                                style={{marginRight: `auto`, width: `auto`, marginLeft: '5px'}}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            Tìm kiếm
                        </button>
                    </div>
                </div>


                <div className="-mx-2 sm:-mx-7 py-4 overflow-x-auto">
                    <div className="d-inline-block w-100 shadow rounded-lg overflow-hidden">
                        <div className="table-responsive ">
                            <table className="table w-100 leading-normal overflow-hidden rounded-3 table-hover ">
                                <thead>
                                <tr style={{background: '#0d6efd', color: '#ffffff'}}>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                                        STT
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                                        Mã thuốc
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                                        Nhóm thuốc
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                                        Tên thuốc
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                                        Hoạt chất
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                                        ĐVT
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                                        ĐV DĐ
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                                        Số lượng
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                                        Giá nhập
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                                        Giá lẻ
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                                        % CK
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                                        %LN XL
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                                        % VAT
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    medicineList.map((value, key) => (
                                        <tr key={key + 1}>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{value.id}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{value.code}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{value.kindOfMedicineName}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{value.name}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{value.activeElement}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{value.unitName}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{value.conversionUnit}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{value.quantity}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{value.price}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{value.price - ( value.price / (100 + (value.vat + value.retailProfits)) * 100)}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{value.discount}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{value.retailProfits}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{value.vat}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <div
                            className="px-5 py-3 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                            <div className="justify-content-center d-flex">
                                <button className="btn btn-primary" style={{margin: '5px'}}>
                                    <i className="fa-solid fa-angles-left"></i>
                                </button>
                                <div className="text-sm py-2 px-4" style={{
                                    background: '#0d6efd',
                                    color: '#ffffff',
                                    margin: '5px',
                                    borderRadius: '5px'
                                }}>
                                    1/5
                                </div>
                                <button className="btn btn-primary" style={{margin: '5px'}}>
                                    <i className="fa-solid fa-angles-right"></i>
                                </button>

                            </div>
                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-end gap-3 mt-3">
                        <a
                            className="btn btn-outline-primary"
                            href="TinVV_CreateMedicine.html">
                            <i className="fa-solid fa-plus"></i>
                            Thêm mới
                        </a>
                        <a
                            className="btn btn-outline-primary"
                            href="TinVV_MedicineCreate.html">
                            <i className="fa-regular fa-pen-to-square"></i>
                            Sửa
                        </a>
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal">
                            <i className="fa-solid fa-trash"></i>
                            Xoá
                        </button>
                        <a className="btn btn-outline-primary" href="/HuyL_home.html">
                            <i className="fa-solid fa-rotate-left"></i>
                            Trở về
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MedicineList;