import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as medicineService from "../../services/medicine/MedicineService";
import {AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineRollback} from "react-icons/ai";
import swal from "sweetalert2";
import "./MedicineList.css"
import {FaPlus, FaRegTrashAlt} from "react-icons/fa";
import {FiEdit} from "react-icons/fi";

function MedicineList() {
    const [showContent,setShowContent]= useState(false);
    const [medicineList, setMedicineList] = useState([]);
    const [medicine, setMedicine] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [selectMedicine, setSelectMedicine] = useState({
        id: null,
        name: ""
    });

    const handleMouseEnter = (medicine) => {
        setShowContent(true);
        setMedicine(medicine);
    };
    const handleMouseLeave = () => {
        setShowContent(false);
    };

    const [searchInMedicine, setSearchInMedicine] = useState("searchByCode");
    const [searchInput, setSearchInput] = useState("");
    const [limit, setLimit] = useState(5);
    const [conditional, setConditional] = useState("greater");

    const handleDelete = async () => {
        if (selectMedicine.id == null) {
            swal.fire({
                icon: "error",
                title: "Rất tiếc...",
                text: "Vui lòng chọn thuốc trước khi thực hiện thao tác này!",
            })
        } else {
            swal.fire({
                title: "Bạn có muốn xoá sản phẩm này " + selectMedicine.name + "?" ,
                text: selectMedicine.name,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085D6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đồng ý!",
                cancelButtonText: "Hủy"
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
                    await getListSearchMedicine(searchInMedicine, searchInput, page, limit, conditional);
                });
        }
    };

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

    const getListSearchMedicine = async (searchInMedicine, searchInput, page, limit, conditional) => {
        const result = await medicineService.searchMedicine(searchInMedicine, searchInput, page, limit, conditional);
        console.log(result)
        if (result?.status === 200) {
            setMedicineList(result?.data.content);
            setTotalPage(result?.data.totalPages);
        } else {
            await swal.fire({
                icon: 'warning',
                title: 'Không tìm thấy dữ liệu cần tìm.',
                showConfirmButton: true,
                timer: 1500
            })
            handleResetList();
        }
    }

        const handleResetList = () => {
            setSearchInMedicine("searchByCode");
            setSearchInput("");
            setConditional("greater");
        }

    const handleShowCondition = () => {
        let select = document.getElementById("select").value;
        const conditional = document.getElementById("conditional");
        if (select === "searchByPrice") {
            conditional.style.display = "inline";
        } else {
            conditional.style.display = "none";
        }
    }

    const handleSearch = () => {
        setSearchInput(document.getElementById("search").value.trim());
        setPage(0);
    }

    const handleSearchOption = (e) => {
        setSearchInMedicine(e.target.value);
    }

    const handleSearchConditional = async (e) => {
        await setConditional(e.target.value);
        console.log(conditional)
    }

    useEffect(() => {
        console.log("get list")
        getListSearchMedicine(searchInMedicine, searchInput, page, limit, conditional)
    }, [searchInput, page, limit]);

    const quantity = 20 ;

    if (!medicineList) {
        return null;
    }
    return (
        <>
            <div className="container">
                <div className="row header">
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
                            <option value="searchByKindOfMedicine">Nhóm thuốc</option>
                            <option value="searchByName">Tên thuốc</option>
                            <option value="searchByActiveElement">Hoạt chất</option>
                            <option value="searchByPrice">Giá bán lẻ</option>
                        </select>

                        <select style={{width: '150px', borderRadius: '5px', color: 'blue', display: "none"}}
                                onChange={(e) => handleSearchConditional(e)}
                                id="conditional" className="appearance-none pl-8 pr-6 py-2">
                            <option value="">Tất cả</option>
                            <option value="greater">Lớn hơn bằng</option>
                            <option value="small">Nhỏ hơn bằng</option>
                        </select>
                        <input style={{width: '250px', borderRadius: '5px'}}
                               className="appearance-none pl-8 pr-6 py-2 bg-white text-sm focus:outline-none"
                               placeholder="Tìm kiếm thuốc..."
                               id={'search'}/>
                        <button className="btn btn-outline-primary"
                                style={{marginRight: `auto`, width: `auto`, marginLeft: '5px'}}
                                onClick={() => handleSearch()}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            Tìm kiếm
                        </button>
                    </div>
                </div>

                <div className="-mx-2 sm:-mx-7 py-4 overflow-x-auto">
                    <div className="d-inline-block w-100 shadow rounded-lg overflow-hidden">
                        <div className="table table-container1 ">
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
                                        ĐV QĐ
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                                        Số lượng
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                                        Giá bán
                                    </th>
                                    <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                                        Giá bán lẻ
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {medicineList ? (medicineList.map((item, index) => (
                                    <tr key={index} id={index} onClick={() => {
                                        if (selectMedicine === null || selectMedicine.id !== item.id) {
                                            setSelectMedicine({id: item.id, name: item?.name});
                                        } else if (selectMedicine.id === item.id) {
                                            setSelectMedicine({id: null, name: ""});
                                        }
                                    }}
                                        style={(selectMedicine.id === item?.id) ? {background: 'rgb(98, 158, 236)'} : {}}>
                                        <td className="px-3 py-3 border-b border-gray-200 text-sm">{index + 1}</td>
                                        <td className="px-3 py-3 border-b border-gray-200 text-sm">{item.code}</td>
                                        <td className="px-3 py-3 border-b border-gray-200 text-sm">{item.kindOfMedicineName}</td>
                                        <td className="px-3 py-3 border-b border-gray-200 text-sm medicine-hide "
                                            onMouseEnter={()=>{handleMouseEnter(item.name)}}
                                            onMouseLeave={handleMouseLeave}
                                        >{item.name.length > quantity ? `${item.name.slice(0,quantity)}...`:item.name}
                                            {showContent && medicine === item.name &&
                                                <div>{item.name}</div>}</td>
                                        <td className="px-3 py-3 border-b border-gray-200 text-sm medicine-hide"
                                            onMouseEnter={()=>{handleMouseEnter(item.activeElement)}}
                                            onMouseLeave={handleMouseLeave}
                                        >{item.activeElement.length > quantity ? `${item.activeElement.slice(0,quantity)}...`:item.activeElement}
                                            {showContent && medicine === item.activeElement &&
                                                <div>{item.activeElement}</div>}
                                        </td>
                                        <td className="px-3 py-3 border-b border-gray-200 text-sm">{item.unitName}</td>
                                        <td className="px-3 py-3 border-b border-gray-200 text-sm">{item.conversionUnit}</td>
                                        <td className="px-3 py-3 border-b border-gray-200 text-sm">{item.quantity}</td>
                                        <td className="px-3 py-3 border-b border-gray-200 text-sm">{item.price + " vnđ"}</td>
                                        <td className="px-3 py-3 border-b border-gray-200 text-sm">{item.retailPrice+" vnđ"}</td>
                                    </tr>
                                ))) : (<h1>Tiếc quá! Retro Care không có dữ liệu về phần này.</h1>)}
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

                        <Link to={'/dashboard/medicine/create'} className="btn btn-outline-primary">
                            <FaPlus className="mx-1" />
                            Thêm mới
                        </Link>
                        <Link
                            to={`/dashboard/medicine/update/${selectMedicine.id}`}
                            className="btn btn-outline-primary">
                            <FiEdit className="mx-1" />
                            Sửa
                        </Link>
                        <button
                            type="button"
                            onClick={() => handleDelete()}
                            className="btn btn-outline-primary">
                            <FaRegTrashAlt className="mx-1" />
                            Xoá
                        </button>
                        <Link to={`/home`} className="btn btn-outline-primary">
                            <AiOutlineRollback className="mx-1" />
                            Trở về
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MedicineList;