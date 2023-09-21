import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as medicineService from "../../services/medicine/MedicineService";
import {AiOutlineDoubleLeft, AiOutlineDoubleRight} from "react-icons/ai";
import swal from "sweetalert2";

function MedicineList() {
    const params = useParams();
    const navigate = useNavigate()
    const [medicineList, setMedicineList] = useState([])
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [selectMedicine, setSelectMedicine] = useState({
        id: null,
        name: ""
    });

    const [searchInMedicine, setSearchInMedicine] = useState("searchByCode");
    const [searchInput, setSearchInput] = useState("");
    const [limit, setLimit] = useState(5)

// ------------------------------------------- delete -------------------------------------------------
    const handleDelete = async () => {
        if (selectMedicine.id == null) {
            swal.fire({
                icon: "error",
                title: "Rất tiếc...",
                text: "Vui lòng chọn khách hàng trước khi thực hiện thao tác này!",
            })
        } else {
            swal.fire({
                title: "Bạn có muốn xoá sản phẩm này khỏi giỏ hàng?",
                text: selectMedicine.name,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085D6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đồng ý!",
            })
                .then(async (willDelete) => {
                    if (willDelete.isConfirmed) {
                        await medicineService.deleteMedicine(selectMedicine.id);
                        swal.fire("Xoá sản phẩm thành công!", "", "success");
                        setSelectMedicine({
                            id: null,
                            name: ''
                        })
                    } else {
                        swal.fire({
                            icon: 'error',
                            title: 'Rất tiếc...',
                            text: 'Xóa thất bại!'
                        });
                    }
                    await getListSearchMedicine(searchInMedicine, searchInput, page, limit);
                });
        }
    };
// ---------------------------------------- Get list ---------------------------------------------

    // const getListMedicine = async (page) => {
    //     const result = await medicineService.findAll(page);
    //     setMedicineList(result?.data.content);
    //     setTotalPage(result?.data.totalPages);
    //     console.log(totalPage);
    // }
    const previousPage = () => {
        if (page > 0) {
            setPage((pre) => pre - 1)
        }
    }

    const nextPage = () => {
        if (page + 1 < totalPage) {
            setPage((pre) => pre + 1)
        }
    }
// ----------------------------------------- Search ---------------------------------------
    const getListSearchMedicine = async (searchInMedicine, searchInput, page, limit) => {
        const result = await medicineService.searchMedicine(searchInMedicine, searchInput, page, limit);
        setMedicineList(result?.content);
        setTotalPage(result?.totalPages);
    }
// select child
    const handleShowCondition = () => {
        let select = document.getElementById("select").value;
        const conditional = document.getElementById("conditional");
        if (select === "4") {
            conditional.style.display = "inline";
        } else {
            conditional.style.display = "none";
        }
    }

    const handleSearch = async () => {
        setSearchInput(document.getElementById("search").value);
        setPage(0);
    }
// select father
    const handleSearchOption = (e) => {
        setSearchInMedicine(e.target.value);
    }

    // useEffect(() => {
    //     getListMedicine(page);
    // }, [page])

    const handleReset = () => {
        setPage(0);
        setSearchInMedicine("");
        setSearchInput("");
    }

    useEffect(() => {
        getListSearchMedicine(searchInMedicine, searchInput, page, limit)
    }, [searchInput, page, limit])

    if (!medicineList) {
        return null;
    }
    return (
        <>
            <div className="container">
                <div className="row header" >
                    <h1 className="mt-4 mb-3" style={{textAlign: 'center', color: '#0D6EFD'}}>DANH SÁCH THUỐC</h1>
                </div>
                <div className="row row-function" style={{display: 'flex'}}>
                    <div className="col-9 col-search d-flex align-items-center justify-content-start gap-3">

                        <label>Lọc theo: </label>
                        <select onClick={() => handleShowCondition()}
                                onChange={(e) => handleSearchOption(e)}
                                style={{width: '150px', borderRadius: '5px', color: 'blue'}}
                                id="select" className="appearance-none pl-8 pr-6 py-2">
                            <option selected value="searchByCode">Mã thuốc</option>
                            <option value="searchByNameKindOfMedicine">Nhóm thuốc</option>
                            <option value="searchByName">Tên thuốc</option>
                            <option value="searchByActiveElement">Hoạt chất</option>
                            <option value="4">Giá bán lẻ</option>
                        </select>

                        <select style={{width: '150px', borderRadius: '5px', color: 'blue', display: "none"}}
                                id="conditional" className="appearance-none pl-8 pr-6 py-2">
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
                               placeholder="Tìm kiếm thuốc..."
                               id={'search'}/>
                        <button className="btn btn-outline-primary"
                                style={{marginRight: `auto`, width: `auto`, marginLeft: '5px'}}
                                onClick={() => handleSearch()} value="searchInMedicine">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            Tìm kiếm
                        </button>
                    </div>
                </div>


                <div className="-mx-2 sm:-mx-7 py-4 overflow-x-auto">
                    <div className="d-inline-block w-100 shadow rounded-lg overflow-hidden">
                        <div className="table table-container ">
                            <table className="table  w-100 leading-normal overflow-hidden rounded-3 table-hover ">
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
                                    medicineList.map((item, index) => (
                                        <tr key={index} id={index} onClick={() => {
                                            if (selectMedicine === null || selectMedicine.id !== item.id) {
                                                setSelectMedicine({id: item.id, name: item?.name});
                                            } else if (selectMedicine.id === item.id) {
                                                setSelectMedicine({id: null, name: ""});
                                            }

                                        }}
                                            style={(selectMedicine.id === item?.id) ? {background: 'rgba(252, 245, 76, 0.73)'} : {}}>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{index + 1}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{item.code}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{item.kindOfMedicineName}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{item.name}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{item.activeElement}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{item.unitName}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{item.conversionUnit}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{item.quantity}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{item.price}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{item.price - (item.price / (100 + (item.vat + item.retailProfits)) * 100)}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{item.discount}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{item.retailProfits}</td>
                                            <td className="px-3 py-3 border-b border-gray-200 text-sm">{item.vat}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div
                            className="px-5 py-3 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                            <div className="justify-content-center d-flex">
                                <button className="btn btn-primary" style={{margin: 5}} onClick={() => previousPage()}
                                        href="#">
                                    <AiOutlineDoubleLeft/>
                                </button>
                                <div
                                    className="text-sm py-2 px-4"
                                    style={{
                                        background: "#0d6efd",
                                        color: "#ffffff",
                                        margin: 5,
                                        borderRadius: 5,
                                    }}>
                                    <span>{page + 1}/{totalPage}</span>
                                </div>
                                <button className="btn btn-primary" style={{margin: 5}} onClick={() => nextPage()}
                                        href="#">
                                    <AiOutlineDoubleRight/>
                                </button>
                                <div
                                    className="rounded-lg"
                                    style={{
                                        background: "#0d6efd",
                                        color: "black",
                                        margin: 5,
                                        borderRadius: 5,
                                    }}>
                                </div>
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
                            onClick={() => handleDelete()}
                            className="btn btn-outline-primary">
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