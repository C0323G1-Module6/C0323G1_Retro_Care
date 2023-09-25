import React, { useEffect, useState } from 'react';
import { FaPlus, FaRegTrashAlt, } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import {
    AiOutlineRollback,
    AiOutlineDoubleLeft,
    AiOutlineDoubleRight,
} from "react-icons/ai";
import { add, deleteKindOfMedicine, edit, getListById, pagination } from '../../services/kindOfMedicine/KindOfMedicineService';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import XRegExp from 'xregexp'
import { Link } from 'react-router-dom';


function KindOfMedicineList(props) {
    const [kindOfMedicines, setKindOfMedicine] = useState([]);
    const [searchCodes, setSearchCode] = useState("");
    const [searchNames, setSearchName] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState();
    const [choseRow, setChoseRow] = useState([]);
    const [dataId, setDataId] = useState({});
    const [editKindOfMedicine, setEditKindOfMedicine] = useState()


    // edit
    const showListById = async (id) => {
        const data = await getListById(id);
        setEditKindOfMedicine(data)
    }
    const handleEdit = () => {
        console.log(55);
        if (choseRow.length < 1) {
            console.log(66);
            Swal.fire({
                text: "Bạn hãy chọn nhóm thuốc ",
                icon: "warning",
                timer: 2000,
            });
        }
    }
    // Create
    const handleCreate = () => {
        if (choseRow.length > 0) {
            console.log(66);
            Swal.fire({
                text: "Bạn hãy bỏ chọn nhóm thuốc ",
                icon: "warning",
                timer: 2000,
            });
        }
    }
    // choseRow
    const choseDelete = (kindOfMedicine) => {
        const checkExists = choseRow.some(choice => choice === kindOfMedicine.id);
        if (checkExists) {
            const choseRowNew = choseRow.filter(choice => choice !== kindOfMedicine.id);
            setDataId({ id: undefined, code: undefined, name: undefined })
            setChoseRow(choseRowNew);
            setEditKindOfMedicine({
                id: "",
                code: "",
                name: "",
            })
        } else {
            setChoseRow([kindOfMedicine.id])
            setDataId({ id: kindOfMedicine.id, code: kindOfMedicine.code, name: kindOfMedicine.name })

        }


    }
    //delete
    const handleDelete = async () => {
        if ( dataId.id !== undefined) {
            console.log(1);
            Swal.fire({
                title: " Xác nhận xoá",
                text: "Bạn có muốn xoá: " + dataId.name,
                showCancelButton: true,
                cancelButtonText: "Hoàn tác",
                showConfirmButton: true,
                confirmButtonText: "Vâng, xoá",
                icon: "question",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    console.log(2);
                    const response = await deleteKindOfMedicine(dataId.id);
                    setDataId({ id: undefined, code: undefined, name: undefined })
                    await showList();

                    Swal.fire({
                        text: " Xoá thành công ",
                        icon: "success",
                        timer: 3000,
                    });

                    setEditKindOfMedicine({
                        id: "",
                        code: "",
                        name: "",
                    })
                    setChoseRow([])
                } else {
                    Swal.fire({
                        text: "Bạn chọn hoàn tác ",
                        icon: "warning",
                        timer: 3000,
                    });
                }
            });
        } else {
            Swal.fire({
                text: "Chọn nhóm thuốc ",
                icon: "warning",
                timer: 3000,
            });
        }

    };
    // List

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleButtonSearch()
        }
    }
    const showList = async () => {
        try {
            const data = await pagination(page, searchCodes, searchNames);
            setKindOfMedicine(data);
            setKindOfMedicine(data?.content);
            setTotalPage(data?.totalPages)
        } catch (error) {
            console.log(error);
            await Swal.fire({
                text: "Không tìm thấy dữ liệu cần tìm ",
                icon: "warning",
                timer: 1500,
            })
            setSearchCode(document.getElementById('medicineCode').value = "");
            setSearchName(document.getElementById('medicineName').value = "");
        }
    }

    // search
    const handleButtonSearch = () => {
        setSearchCode(document.getElementById('medicineCode').value.trim());
        setSearchName(document.getElementById('medicineName').value.trim());

    }
    // Pagination
    const handlePrevPage = () => {
        const previousPages = page - 1;
        if (page > 0) {
            setPage(previousPages)
        }
    }
    const handleNextPage = async () => {
        if (page < totalPage - 1) {
            const nextPage = page + 1;
            setPage(nextPage);
        }
    }


    useEffect(() => {
        showList(page, searchCodes, searchNames)
    }, [page, searchCodes, searchNames, dataId.id]);

    useEffect(() => {
        if (dataId.id !== undefined) {
            showListById(dataId.id)
        }

    }, [dataId.id]);



    return (
        <div>
            <div className="container">
                <div className="">
                    <div className="table-wrapper">
                        {/* tittle */}
                        <div className="table-tittle p-3">
                            <div className="row">
                                <div className="text-center">
                                    <h1 style={{ color: "#0D6EFD" }}>DANH SÁCH NHÓM THUỐC</h1>
                                </div>
                            </div>
                        </div>
                        {/* search */}
                        <div className="d-flex gap-3 my-3">
                            <input id='medicineCode'
                                style={{ width: 250, borderRadius: 5 }}
                                className="form-control"
                                placeholder='Mã nhóm Thuốc'
                                onKeyDown={handleKeyDown}
                            />
                            <input id='medicineName'
                                style={{ width: 250, borderRadius: 5 }}
                                className="form-control" nhómThuốc
                                placeholder='Tên nhóm thuốc'
                                onKeyDown={handleKeyDown}
                            />
                            <button className="btn btn-outline-primary" style={{ width: 120 }} type="submit" onClick={handleButtonSearch} >
                                <i className="fa-solid fa-magnifying-glass" />
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                    {/* body */}
                    <div className="rounded-3 shadow-lg">
                        {/* table */}
                        <table className="table table-responsive table-hover ">
                            <thead>
                                <tr style={{ background: "#0D6EFD", color: "#FFFFFF" }}>
                                    <th>STT</th>
                                    <th>Mã nhóm thuốc</th>
                                    <th>Tên nhóm thuốc</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kindOfMedicines ? (kindOfMedicines.map((kindOfMedicine, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => {
                                            choseDelete(kindOfMedicine)
                                        }
                                        }
                                        style={choseRow.some(choice => choice === kindOfMedicine.id) ? { backgroundColor: '#629eec' } : {}}
                                    >
                                        <td>{(page * 5) + index + 1}</td>
                                        <td>{kindOfMedicine.code}</td>
                                        <td>{kindOfMedicine.name}</td>
                                    </tr>
                                ))) : (<h1>Không tìm thấy dữ liệu</h1>)}
                            </tbody>
                        </table>
                        {/* pagination */}
                        <div className="px-5 py-3 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                            <div className="justify-content-center d-flex">
                                <button className="btn btn-primary" style={{ margin: 5 }} onClick={handlePrevPage}>
                                    <AiOutlineDoubleLeft />
                                </button>
                                <div
                                    className="text-sm py-2 px-4"
                                    style={{
                                        background: "#0d6efd",
                                        color: "#ffffff",
                                        margin: 5,
                                        borderRadius: 5
                                    }}
                                >
                                    {page + 1}/{totalPage}
                                </div>
                                <button className="btn btn-primary" style={{ margin: 5 }} onClick={handleNextPage}>
                                    <AiOutlineDoubleRight />
                                </button>
                                <div
                                    className="rounded-lg"
                                    style={{
                                        background: "#0d6efd",
                                        color: "black",
                                        margin: 5,
                                        borderRadius: 5
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {/* fieldset */}
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            id: editKindOfMedicine?.id,
                            code: editKindOfMedicine?.code,
                            name: editKindOfMedicine?.name,
                            flagDeleted: editKindOfMedicine?.flagDeleted
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string()

                                .max(25,"Không quá 25 ký tự")
                                .min(3,"Tối thiểu 3 kí tự")
                                .required("Nhập để thêm mới")
                                .matches(XRegExp('^(\\p{Lu}\\p{Ll}*([\\s]\\p{Lu}\\p{Ll}*)*)\\d*$'), "Nhập sai định dạng")
                                .test("check-space", "Nhập không đúng định dạng", (value) => value.trim() !== 0)
                            ,
                        })}
                        onSubmit={async (value) => {
                            console.log(choseRow);
                            if (choseRow.length > 0) {
                                await edit(value)
                                console.log(33);
                                await showList()
                                setEditKindOfMedicine({
                                    id: "",
                                    code: "",
                                    name: "",
                                })
                                Swal.fire({
                                    text: "Cập nhật thành công ",
                                    icon: "success",
                                    timer: 1500,
                                });
                            } else {

                                console.log(15);
                                await add(value);
                                await showList();
                                Swal.fire({
                                    text: "Thêm mới thành công ",
                                    icon: "success",
                                    timer: 1500,
                                });
                                setEditKindOfMedicine({
                                    id: "",
                                    code: "",
                                    name: "",
                                })
                            }
                            // formRef.current.reset();

                        }}
                    >
                        {({ values }) => (
                            <Form>
                                <div className="row justify-content-center m-3 h-10">
                                    <fieldset className="col-12 border border-dark rounded-3 p-3  d-flex justify-content-center table-responsive">

                                        {/* mã thuốc */}
                                        <div className=" m-5">
                                            <label id="pharmacyCode" htmlFor="" className="form-label">
                                                Mã nhóm thuốc
                                            </label>
                                            <Field
                                                readOnly
                                                type="text"
                                                name="code"
                                                disabled={choseRow.length < 1}
                                                // onChange={handleInputChange}
                                                id="code"
                                                defaultValue={dataId?.code}
                                                className="form-control"
                                                placeholder=""
                                                aria-describedby="helpId"

                                            />
                                            {/* <ErrorMessage name='code' component="div" /> */}
                                        </div>
                                        {/* nhóm thuốc */}
                                        <div className=" m-5">
                                            <label id="pharmacyName" htmlFor="" className="form-label">
                                                Tên nhóm thuốc
                                            </label>
                                            <Field
                                                type="text"
                                                name="name"
                                               
                                                // onChange={handleInputChange}
                                                id="name"
                                                className="form-control"
                                                placeholder=""
                                                aria-describedby="helpId"
                                            />
                                            <ErrorMessage style={{color:"red"}} name='name' component="div" />
                                        </div>

                                        <legend className="float-none w-auto px-3">Thông tin thuốc</legend>
                                    </fieldset>
                                </div>
                              

                                {/* action */}
                                <div className="d-flex align-items-center justify-content-end gap-3">
                                    {/* add */}
                                    <button className="btn btn-outline-primary" type='submit' onClick={handleCreate} disabled={choseRow.length > 0}>
                                        <FaPlus className="mx-1" />
                                        Thêm mới
                                    </button>
                                    {/* edit */}
                                    <button className="btn btn-outline-primary" type='submit' onClick={handleEdit}>
                                        <FiEdit className="mx-1" />
                                        Sửa
                                    </button>
                                    {/* delete */}
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        // data-bs-toggle="modal"
                                        // data-bs-target="#exampleModal"
                                        onClick={() => handleDelete()}
                                    >
                                        <FaRegTrashAlt className="mx-1" />
                                        Xoá
                                    </button>
                                    <Link to={`/home`} className="btn btn-outline-primary"><AiOutlineRollback className="mx-1" />Trở về</Link>

                                    {/* <a className="btn btn-outline-primary" href="/home">
                                        <AiOutlineRollback className="mx-1" />
                                        Trở về
                                    </a> */}
                                </div>
                                {/* <p> Code: {values.code}</p>
                                <p> Name: {values.name}</p> */}
                            </Form> 
                        )}
                       
                    </Formik>
                
                    {/* MOdal action */}
                    <div className="modal fade" id="exampleModal" tabIndex={-1}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Xác nhận xoá nhóm thuốc</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">
                                    <p>Bạn có chắc muốn xoá nhóm thuốc không.</p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Huỷ xoá
                                    </button>
                                    <button type="button" className="btn btn-primary">
                                        <FaRegTrashAlt className="mx-1" /> Xoá
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <div class=" col-8 m-2 d-flex table-responsive  ">
    
        
   
      </div> */}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default KindOfMedicineList;