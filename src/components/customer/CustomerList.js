import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import {
  AiOutlineRollback,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
} from "react-icons/ai";
import * as customerService from '../../services/customer/CustomerService';
import Swal from 'sweetalert2';
import { format, parseISO } from "date-fns";

function CustomerList() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [groupValue, setGroupValue] = useState("");
  const [sortItem, setSortItem] = useState("");
  const [sortType, setSortType] = useState("");
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [selectedCustomer, setSeletedCustomer] = useState({
    id: null,
    name: ""
  });
  const [optionSearch, setOptionSearch] = useState();

  // ------------------------------------------------------ Get Customers List ---------------------------------------
  const loadCustomerList = async (page, name, code, address, phoneNumber, groupValue, sortItem) => {
    const result = await customerService.getAllCustomers(page, name, code, address, phoneNumber, groupValue, sortItem, sortType);
    if (result?.status === 200) {
      setCustomers(result?.data.content);
      setTotalPage(result?.data.totalPages);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Rất tiếc...',
        text: 'Dữ liệu không tồn tại!',
      })
      handleReset();
    }
  }
  const handleReset = () => {
    setPage(0);
    setName("");
    setAddress("");
    setPhoneNumber("");
    setCode("");
    setGroupValue("");
    setSortItem("");
    setSortType("");
  }
  // ----------------------------------------------------------- Pagination ---------------------------------------------
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

  // ------------------------------------------------------  Searching function -----------------------------------------
  const handleInputChange = (e) => {
    const { value } = e.target
    setSearchValue(value.trim());
  }

  // const handleKeyDown = event => {
  //   if (event.key === 'Enter') {
  //     handleSearchEvent();
  //   }
  // }

  const handleSearchEvent = () => {
    switch (optionSearch) {
      case 1:
        setName(searchValue);
        break;
      case 2:
        setName(searchValue);
        break;
      case 3:
        setAddress(searchValue);
        break;
      case 4:
        setPhoneNumber(searchValue);
        break;
      default:
        setCode(searchValue);
        break;
    }
  }

  const handleSelectChange = (event) => {
    setGroupValue(event.target.value);
    setSearchValue(document.getElementById("search").value);
    setName(searchValue);
  }

  const handleOptionSearchChange = (e) => {
    const { value } = e.target;
    setOptionSearch(+value);
    setSearchValue(document.getElementById("search").value);
    handleReset();
  }

  // ------------------------------------------------------ Sort -----------------------------------------------------
  const handleSortEvent = (event) => {
    setSortItem(event.target.value);
    setSortType(document.getElementById("sortType").value);
  }
  const handleSort = (event) => {
    setSortItem(document.getElementById("sortItem").value);
    setSortType(event.target.value);
  }

  //--------------------------------------------------- Delete method -----------------------------------------------
  const handleDelete = async () => {
    if (selectedCustomer.id == null) {
      Swal.fire({
        icon: 'error',
        title: 'Rất tiếc...',
        text: 'Vui lòng chọn khách hàng trước khi thực hiện thao tác này!',
      })
    } else {
      Swal.fire({
        title: "Xóa khách hàng",
        text: "Bạn muốn xóa khách hàng: " + selectedCustomer.name,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Xóa",
        cancelButtonText: "Không",
        icon: "question",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await customerService.deleteCustomer(selectedCustomer.id);
          if (response?.status === 200) {
            Swal.fire({
              text: "Xóa thành công! ",
              icon: "success",
              timer: 1000,
            });
            setSeletedCustomer({ id: null, name: "" })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Rất tiếc...',
              text: 'Xóa thất bại!',
            })
          }
        } else {
          Swal.fire({
            text: "Hủy thao tác",
            icon: "warning",
            timer: 1000,
          });
          setSeletedCustomer({ id: null, name: "" })
        }
        await loadCustomerList(page, name, code, address, phoneNumber, groupValue, sortItem);
      });
    }
  };

  // ----------------------------------------------------------- Edit navigation ------------------------------------------------
  const handleEditEvent = () => {
    if (selectedCustomer.id == null) {
      Swal.fire({
        icon: 'error',
        title: 'Rất tiếc...',
        text: 'Vui lòng chọn khách hàng trước khi thực hiện thao tác này!',
      })
    } else {
      navigate(`/dashboard/customer/update/${selectedCustomer.id}`)
    }
  }
  // --------------------------------------------------------------Use Effect ----------------------------------------------------
  useEffect(() => {
    document.title = 'RetroCare - Danh sách khách hàng'
  }, []);
  useEffect(() => {
    loadCustomerList(page, name, code, address, phoneNumber, groupValue, sortItem, sortType);
  }, [page, name, code, address, phoneNumber, groupValue, sortItem, sortType]);

  if (!customers) {
    return <div></div>;
  }
  // ---------------------------------------------------------------- Return -----------------------------------------------------
  return (
    <div className="container">
      <h1 style={{ textAlign: "center", color: "#0d6efd" }} className="m-4">
        DANH SÁCH KHÁCH HÀNG
      </h1>
      <div className="row m-3" style={{ display: "flex" }}>
        <div className="col-8 col-search">
          <label className="m-1">Lọc theo: </label>
          <div className="btn-group">
            <select name='optionSearch' defaultValue={0} onChange={handleOptionSearchChange} className="form-select m-1" style={{ width: 200 }}>
              <option value={0}>Mã khách hàng</option>
              <option value={1}>Tên khách hàng</option>
              <option value={2}>Nhóm khách hàng</option>
              <option value={3}>Địa chỉ</option>
              <option value={4}>Số điện thoại</option>
            </select>
            <div>
              {optionSearch === 2 && <select className="form-select m-1" style={{ width: 160 }} name="groupValue" defaultValue={"2"} onChange={handleSelectChange}>
                <option value={"0"}>Khách offline</option>
                <option value={"1"}>Khách online</option>
                <option value={"2"}>Tất cả</option>
              </select>}
            </div>
          </div>
          <input style={{
            width: 250,
            borderRadius: 5,
            padding: 5,
            border: "1px black solid"
          }}
            placeholder={(optionSearch === 2) ? "Nhập tên tìm kiếm..." : "Tìm kiếm khách hàng"}
            className="bg-white align-middle appearance-none m-1"
            aria-describedby="button-addon"
            id="search"
            // onKeyDown={handleKeyDown}
            onChange={handleInputChange}
          />
          <button onClick={handleSearchEvent}
            className="btn btn-outline-primary"
            style={{ marginRight: "auto", width: "auto", marginLeft: 5 }}
            id="button-addon">
            <i className="fa-solid fa-magnifying-glass" /> Tìm kiếm
          </button>
        </div>

        <div className="col-4 d-flex align-items-center justify-content-end" >
          <label className="m-1">Sắp xếp: </label>
          <div className="btn-group">
            <select name='sortIterm' id="sortItem" defaultValue={"code"} onChange={handleSortEvent} className="form-select m-1 " style={{ width: 180 }}>
              <option value={"app_user_id"}>Nhóm khách hàng</option>
              <option value={"code"}>Mã khách hàng</option>
              <option value={"name"}>Tên khách hàng</option>
            </select>
            <select name="sortType" id="sortType" defaultValue={""} onChange={handleSort} className="form-select m-1 " style={{ width: 130 }}>
              <option value={"DESC"}>Giảm dần</option>
              <option value={"ASC"}>Tăng dần</option>
            </select>
          </div>
        </div>
      </div>

      <div className="d-inline-block w-100 shadow rounded-lg overflow-hidden">
        <table
          className="table table-hover w-100 leading-normal overflow-hidden rounded-3 m-0"
          id="myTable"
        >
          <thead>
            <tr
              style={{ background: "#0d6efd", color: "#ffffff", height: 50 }}
            >
              <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider" style={{ width: 50 }}>
                STT
              </th>
              <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider" style={{ width: 190 }}>
                Mã khách hàng
              </th>
              <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider" style={{ width: 270 }}>
                Tên khách hàng
              </th>
              <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider" style={{ width: 150 }}>
                Ngày sinh
              </th>
              <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider" style={{ width: 270 }}>
                Địa chỉ
              </th>
              <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider" style={{ width: 170 }}>
                Số điện thoại
              </th>
              <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider" style={{ width: 250 }}>
                Nhóm khách hàng
              </th>
              <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider" style={{ width: 180 }}>
                Ghi chú
              </th>
            </tr>
          </thead>
          {customers && customers.length !== 0 ?
            <tbody className="bg-light">
              {customers.map((customer, index) => (
                <tr key={index} id={index} onClick={() => {
                  if (selectedCustomer.id === null || selectedCustomer.id !== customer?.id) {
                    setSeletedCustomer({ id: customer?.id, name: customer?.name });
                  } else {
                    setSeletedCustomer({ id: null, name: "" });
                  }
                }} style={(selectedCustomer.id === customer?.id) ? { backgroundColor: '#629eec', height: 50 } : { height: 50 }}>
                  <td className="px-3 py-3 border-b border-gray-200 text-sm">
                    {index + 1}
                  </td>
                  <td className="px-3 py-3 border-b border-gray-200 text-sm">
                    {customer?.code}
                  </td>
                  <td className="px-3 py-3 border-b border-gray-200 text-sm">
                    {customer?.name.length > 20 ? `${customer?.name.slice(0, 20)}...` : customer?.name}
                  </td>
                  <td className="px-3 py-3 border-b border-gray-200  text-sm">
                    {format(parseISO(customer?.birthDay), 'dd-MM-yyyy')}
                   
                  </td>
                  <td className="px-3 py-3 border-b border-gray-200 text-sm">
                    {customer?.address.length > 20 ? `${customer?.address.slice(0, 20)}...` : customer?.address}
                  </td>
                  <td className="px-3 py-3 border-b border-gray-200 text-sm">
                    {customer?.phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')}
                  </td>
                  <td className="px-3 py-3 border-b border-gray-200 text-sm">
                    {customer?.customerType}
                  </td>
                  <td className="px-3 py-3 border-b border-gray-200 text-sm">
                    {customer?.note.length > 9 ? `${customer?.note.slice(0, 9)}...` : customer?.note}
                  </td>
                </tr>
              ))}
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
            <button className="btn btn-primary" style={{ margin: 5 }} onClick={() => previousPage()} href="#">
              <AiOutlineDoubleLeft />
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
            <button className="btn btn-primary" style={{ margin: 5 }} onClick={() => nextPage()} href="#">
              <AiOutlineDoubleRight />
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

      <div className="d-flex align-items-center justify-content-end gap-3">
        <Link to="/dashboard/customer/create"
          className="btn btn-outline-primary"
        >
          <FaPlus className="mx-1" />
          Thêm mới
        </Link>
        <button
          className="btn btn-outline-primary"
          onClick={handleEditEvent}
        >
          <FiEdit className="mx-1" />
          Sửa
        </button>
        <button onClick={() => handleDelete()}
          className="btn btn-outline-primary"
        >
          <FaRegTrashAlt className="mx-1" />
          Xoá
        </button>
        <Link to="/home">
          <button className="btn btn-light btn-outline-primary m-1">
            <AiOutlineRollback />Trở về
          </button>
        </Link>
      </div>
    </div >
  )
}
export default CustomerList;
