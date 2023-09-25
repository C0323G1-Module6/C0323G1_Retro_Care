import React, { useEffect, useState } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import {
  AiOutlineRollback,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
} from "react-icons/ai";
import { getAllPrescription, getPrescriptionById, removePrescription } from "../../services/prescription/prescription";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import "./Prescription.css"

const PrescriptionList = () => {
  const [showContent, setShowcontent] = useState(false);
  const [notes, setNotes] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const [seletedPrescription, setSelecdPrescription] = useState({
    id: null,
    code: ""
  })
  const [searchInMedicine, setSearchInMedicine] = useState("searchByCode");
  const [sortBy, setSortBy] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const findAllPrescription = async (page, searchInput, searchInMedicine, sortBy) => {
    const res = await getAllPrescription(page, searchInput, searchInMedicine, sortBy);
    setTotalPage(res.data.totalPages);
    setPrescriptions(res.data.content)
  }


  const nextPage = () => {
    if (page + 1 < totalPage) {
      setPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1)
    }
  }

  const handleMouseEnter = (notes) => {
    setShowcontent(true);
    setNotes(notes);
  }

  const handleMouseLeave = () => {
    setShowcontent(false);
  }

  const quantity = 15;

  const handleSearchOption = (e) => {
    setSearchInMedicine(e.target.value);
  }

  const handleSortOption = (e) => {
    console.log(e);
    setSortBy(e.target.value);
  }
  console.log(sortBy);


  const handleSearch = async () => {
    setSearchInput(document.getElementById("search").value);
    setPage(0);
  }
  console.log(searchInput);

  const handleEdit = async () => {
    if (seletedPrescription.id == null) {
      Swal.fire({
        icon: 'error',
        title: 'Rất tiếc...',
        text: 'Vui lòng chọn toa thuốc trước khi thực hiện thao tác này!',
      })
    } else {
      navigate(`/dashboard/prescription/edit/${seletedPrescription.id}`);
    }
  }

  const deletePrescription = async () => {
    if (seletedPrescription.id == null) {
      Swal.fire({
        icon: 'error',
        title: 'Rất tiếc...',
        text: 'Vui lòng chọn toa thuốc trước khi thực hiện thao tác này!',
      })
    } else {
      Swal.fire({
        title: "Xác nhận xoá !",
        text: "Bạn có xác nhận xoá toa thuốc có mã :" + seletedPrescription.code,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Xoá",
        cancelButtonText: "Huỷ",
        icon: "question",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await removePrescription(seletedPrescription.id);
          if (response.status === 200) {
            Swal.fire({
              text: "Xoá thành công ! ",
              icon: "success",
              timer: 1500,
            });
          }
          await findAllPrescription(page, searchInput, searchInMedicine, sortBy);
        } else {
          Swal.fire({
            text: "Huỷ xoá toa thuốc ! ",
            icon: "warning",
            timer: 1500,
          });
        }
      });
    }
  };

  useEffect(() => {
    findAllPrescription(page, searchInput, searchInMedicine, sortBy);
  }, [page, searchInMedicine, searchInput, sortBy])


  return (
    <div className="container">
      <div className="py-8">
        <div className="d-flex justify-content-center mb-3">
          <h1
            style={{
              color: "#0d6efd",
            }}
          >
            DANH SÁCH TOA THUỐC
          </h1>
        </div>
        <div className="row row-function d-flex">
          <div className="col-9 col-search d-flex align-items-center justify-content-start gap-3">
            <label>Lọc theo</label>


            <div className="btn-group">
              <select
                onChange={(e) => handleSearchOption(e)}
                style={{ width: '150px', borderRadius: '5px', color: 'blue' }}
                id="select" className="appearance-none pl-8 pr-6 py-2 px-2">
                <option selected value="searchByCode">Mã toa thuốc</option>
                <option value="searchByName">Tên toa thuốc</option>
                <option value="searchBySymptoms">Triệu chứng</option>
              </select>
            </div>


            <input style={{ width: '250px', borderRadius: '5px' }}
              className="appearance-none pl-8 pr-6 py-2 bg-white text-sm focus:outline-none px-2"
              placeholder="Tìm kiếm toa thuốc..."
              id={'search'} />


            <button className="btn btn-outline-primary px-2"
              style={{ marginRight: `auto`, width: `auto`, marginLeft: '5px' }}
              onClick={() => handleSearch()} value="searchInMedicine">
              <i className="fa-solid fa-magnifying-glass"></i>
              Tìm kiếm
            </button>
          </div>



          <div className="col-3 d-flex align-items-center justify-content-end gap-3">
            <label>Sắp xếp</label>
            <div className="btn-group">
              <div className="btn-group">
                <select
                  onChange={handleSortOption}
                  style={{ width: '150px', borderRadius: '5px', color: 'blue' }}
                  id="select" className="appearance-none pl-8 pr-6 py-2 px-2">
                  <option selected value={"code"}>Mã toa thuốc</option>
                  <option value={"name"}>Tên toa thuốc</option>
                  <option value={"symptoms"}>Triệu chứng</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="-mx-2 sm:-mx-7 py-4 overflow-x-auto">
          <div className="d-inline-block w-100 shadow rounded-lg overflow-hidden">
            <table className="w-100 leading-normal overflow-hidden rounded-3 table table-hover m-0">
              <thead>
                <tr style={{ background: "#0d6efd", color: "#ffffff" }}>
                  <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">STT</th>
                  <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                    Mã toa thuốc
                  </th>
                  <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                    Tên toa thuốc
                  </th>
                  <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                    Đối tượng
                  </th>
                  <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                    Triệu chứng
                  </th>
                  <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                    Ghi chú
                  </th>
                </tr>
              </thead>
              {prescriptions && prescriptions.length !== 0 ?
                <tbody>
                  {
                    prescriptions.map((p, index) => (
                      <tr key={p.id} onClick={() => {
                        if (seletedPrescription.id === null || seletedPrescription.id != p?.id) {
                          setSelecdPrescription({ id: p?.id, code: p?.code });
                        } else {
                          setSelecdPrescription({ id: null, code: "" });
                        }
                        // setSelecdPrescription({ id: p?.id, code: p?.code })
                      }} style={(seletedPrescription.id === p?.id) ? { backgroundColor: '#629eec' } : {}}>
                        <td className="px-3 py-3 border-b border-gray-200 text-sm">
                          {index + 1}
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 text-sm">
                          {p.code}
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 text-sm">
                      
                            {p.name}
                          
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 text-sm">
                          {p.patient.name}
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 text-sm prescription-hide"
                          onMouseEnter={() => handleMouseEnter(p.symptoms)}
                          onMouseLeave={handleMouseLeave}>
                          {/* <p className="text-gray-900 whitespace-no-wrap"> */}
                          {p.symptoms.length > quantity ? `${p.symptoms.slice(0, quantity)} ...` : p.symptoms}
                          {showContent && notes === p.symptoms && <div>{p.symptoms}</div>}
                          {/* </p> */}
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200text-sm prescription-hide"
                          onMouseEnter={() => handleMouseEnter(p.note)}
                          onMouseLeave={handleMouseLeave}
                        >
                          
                            {p.note.length > quantity ? `${p.note.slice(0, quantity)} ...` : p.note}
                            {showContent && notes === p.note && <div>{p.note}</div>}

                          
                        </td>
                      </tr>
                    ))
                  }
                </tbody> :
                <tbody>
                  <tr style={{ height: '150px' }}>
                    <td style={{ fontSize: '30px', textAlign: 'center' }} colSpan="8">Không có dữ
                      liệu
                    </td>
                  </tr>
                </tbody>
              }
            </table>
            <div className="px-5 py-3 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <div className="justify-content-center d-flex">
                <button className="btn btn-primary" style={{ margin: 5 }} onClick={() => prevPage()}>
                  <AiOutlineDoubleLeft />
                </button>
                <div
                  className="text-sm py-2 px-4"
                  style={{
                    background: "#0d6efd",
                    color: "#ffffff",
                    margin: 5,
                    borderRadius: 5,
                  }}
                >
                  {page + 1}/{totalPage}
                </div>
                <button className="btn btn-primary" style={{ margin: 5 }} onClick={() => nextPage()}>
                  <AiOutlineDoubleRight />
                </button>
                <div
                  className="rounded-lg"
                  style={{
                    background: "#0d6efd",
                    color: "black",
                    margin: 5,
                    borderRadius: 5,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-end gap-3">
          <Link to={"/dashboard/prescription/create"} className="btn btn-outline-primary">
            <FaPlus className="mx-1" />
            Thêm mới
          </Link>
          <button className="btn btn-outline-primary" onClick={() => handleEdit()}>
            <FiEdit className="mx-1" />
            Sửa
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => deletePrescription()}
          >
            <FaRegTrashAlt className="mx-1" />
            Xoá
          </button>

          <Link to={`/home`} className="btn btn-outline-primary"><AiOutlineRollback className="mx-1" />Trở về</Link>
        </div>
      </div>
    </div>
  );
};
export default PrescriptionList;
