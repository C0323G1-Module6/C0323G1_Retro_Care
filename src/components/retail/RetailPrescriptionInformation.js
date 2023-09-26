import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { addMedicineToCart, getAllIndicationsByPrescription, getOnePrescriptionById } from "../../services/retail/RetailService";
import jsPDF from "jspdf";
import diacriticless from "diacriticless";
import { addJwtTokenToLocalStorage, getIdByUserName, infoAppUserByJwtToken } from "../../services/user/AppUserService";
import { AiOutlineRollback } from "react-icons/ai";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa"
import {AiOutlinePrinter} from "react-icons/ai";

export default function RetailPrescriptionInfomation() {

    const [prescription, setPrescription] = useState(null);
    const [duration, setDuration] = useState(0);
    const { id } = useParams();
    const [indications, setIndications] = useState([]);
    const [appUserId, setAppUserId] = useState(0);
    const [user, setUser] = useState({});
    const navigate = useNavigate();



    useEffect(() => {
        getPrescription();
        getIndications();
        getUser();
        document.title="RetroCare - chi tiết toa";
    }, []);

    const getUser = async () => {
        const data = await infoAppUserByJwtToken(); // Sử dụng await để đợi hàm không đồng bộ hoàn thàn
        try {
            await getAppUserId(data.sub)
        } catch (e) {
        }
    }

    const getAppUserId = async (name) => {
        const id = await getIdByUserName(name);
        setAppUserId((pre) => id.data);
    }

    const backToList = () => {
        navigate("/dashboard/retail/prescription-list");
    }

    const addPrescriptionToCart = async () => {
        indications.forEach(async (element) => {
            await addMedicineToCart(appUserId, element.medicine_id, element.frequency * element.dosage * duration);
        })
    }

    const addToCart = () => {
        if (indications.length === 0) {
            navigate("/dashboard/retail");
            Swal.fire({
                text: "Không có gì để thêm",
                icon: "Warning",
                timer: 1000,
            });
        } else {
            addPrescriptionToCart();
            navigate("/dashboard/retail");
            Swal.fire({
                text: "Thêm thành công",
                icon: "Success",
                timer: 1000,
            });
        }

    }




    const getPrescription = async () => {
        const data = await getOnePrescriptionById(id);
        setPrescription((pre) => data);
        setDuration((pre) => data.duration)
    }

    const getIndications = async () => {
        const data = await getAllIndicationsByPrescription(id);
        setIndications((pre) => data);
    }

    const deleteMedicine = (id) => {
        const list = indications.filter(item => item.id !== id);
        setIndications((pre) => list);
    }



    const openSwal = (id) => {
        Swal.fire({
            title: "Xác nhận xóa",
            text: "Bạn có chắc muốn xóa thuốc này ra khỏi toa",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Có",
            cancelButtonText: "Huỷ",
            icon: "question",
        }).then((result) => {
            if (result.isConfirmed) {
                // code here
                deleteMedicine(id);
                Swal.fire({
                    text: "Xóa thành công ",
                    icon: "success",
                    timer: 1000,
                });
            } else {
                Swal.fire({
                    text: "Bạn chọn hủy ",
                    icon: "warning",
                    timer: 1000,
                });
            }
        });
    };

    const handleGeneratePDF = async () => {
        if (indications.length === 0) {
            Swal.fire({
                text: "Không có gì để in",
                icon: "Warning",
                timer: 1000,
            });
        } else {
            // Tạo đối tượng jsPDF
            const doc = new jsPDF();

            const billContent = `
        Ten toa thuoc: ${diacriticless(prescription.name)}
        -----------------------------
        Doi tuong: ${diacriticless(prescription.patient.name)}
        -----------------------------
        So ngay uong: ${duration.toString()}
        -----------------------------
        
        `

            // Định dạng và vẽ nội dung hóa đơn
            doc.setFont('Arial', 'bold');
            doc.setFontSize(16);
            doc.text(billContent, 10, 10);

            // Vẽ tiêu đề bảng
            const tableHeader = ['STT', 'Ten thuoc', 'So lan/ ngay', 'So vien/ lan uong'];
            const tableHeaderX = 30;
            const tableHeaderY = 70;
            const tableHeaderFontSize = 12;

            doc.setFont('Arial', 'bold');
            doc.setFontSize(tableHeaderFontSize);
            doc.text(tableHeader.join('                      '), tableHeaderX, tableHeaderY);

            // Vẽ dữ liệu sản phẩm
            const tableDataX = 30;
            const tableDataY = 80;
            const tableDataFontSize = 12;

            doc.setFont('Arial', 'normal');
            doc.setFontSize(tableDataFontSize);
            indications.forEach((indication, index) => {
                const { dosage, frequency, name } = indication;
                const rowData = [
                    index + 1,
                    diacriticless(name),
                    frequency,
                    dosage
                ];
                const rowY = tableDataY + index * 10;
                rowData.forEach((data, columnIndex) => {
                    const columnX = tableDataX + columnIndex * 40;
                    doc.text(data.toString(), columnX, rowY);
                });
            });

            // Vẽ tổng giá trị hóa đơn
            const sumX = 30;
            const sumY = tableDataY + indications.length * 10 + 10;

            doc.setFont('Arial', 'bold');


            // Vẽ ghi chú
            const noteX = 30;
            const noteY = sumY + 10;

            doc.setFont('Arial', 'normal');
            doc.text(diacriticless(prescription.note), noteX, noteY);

            // Lưu tài liệu PDF
            doc.save('example.pdf');
        }
    };

    return (
        <>
            {prescription !== null &&
                <>
                    <div className="d-flex flex-wrap gap-3 justify-content-center mt-10">
                        <fieldset className="border border-dark rounded-3 p-3 w-50" style={{ backgroundColor: '#F8F9FA' }}>
                            <legend className="float-none w-auto px-3">Thông tin đơn thuốc</legend>
                            <div className="mb-3 row">
                                <label className="col-sm-3 col-form-label">Tên đơn thuốc</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" value={prescription.name} readOnly />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-3 col-form-label">Triệu chứng</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" readOnly value={prescription.symptoms} />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-3 col-form-label">Đối tượng</label>
                                <div className="col-sm-4">
                                    <input type="text" className="form-control" readOnly value={prescription.patient.name} />
                                </div>
                                <label className="col-sm-3 col-form-label">Số ngày uống </label>
                                <div className="col-sm-2">
                                    <input type="number" className="form-control"
                                        value={duration} onChange={(event) => {
                                            if (event.target.value > 0) {
                                                setDuration(event.target.value)
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="d-flex flex-wrap gap-3 justify-content-center mt-10">
                                <fieldset className="border border-dark rounded-3 p-3 w-100">
                                    <legend className="float-none w-auto px-3">Chỉ định</legend>

                                    {/* list thuoc trong don */}
                                    {indications.map((indication, index) => (
                                        <div key={indication.id}>
                                            <div className="mb-3 row d-flex align-items-center justify-content-start">
                                                <label className="col-sm-1 col-form-label">{index + 1}</label>
                                                <div className="col-sm-5">
                                                    <input className="form-control" value={indication.name} readOnly />
                                                </div>

                                                <div style={{width: "80px"}}>
                                                    <input readOnly className="form-control" value={indication.frequency * indication.dosage * duration} />
                                                </div>
                                                <label className="col-form-label" style={{width: "70px"}}>Viên</label>

                                                <div className="col-sm-2">
                                                    <a
                                                        type="button"
                                                        title="Xóa"
                                                        className="btn btn-outline-primary"
                                                        onClick={() => openSwal(indication.id)}
                                                    >
                                                        <FaRegTrashAlt />
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="mb-3 row d-flex align-items-center justify-content-start">
                                                <div className="col-sm-1">&nbsp;</div>
                                                <label className="col-form-label" style={{width: "120px"}}>Ngày uống: </label>
                                                <div style={{width: "60px", margin: "0"}} >
                                                    <input className="form-control" readOnly value={indication.frequency} />
                                                </div>
                                                <label className="col-sm-1 col-form-label">lần,</label>
                                                <label className="col-sm-2 col-form-label">Mỗi lần: </label>
                                                <div style={{width: "60px", margin: "0"}} >
                                                    <input className="form-control" readOnly value={indication.dosage} />
                                                </div>
                                                <label className="col-sm-1 col-form-label">viên</label>
                                            </div>
                                        </div>
                                    ))}




                                </fieldset>
                                <a className="btn btn-outline-primary" onClick={() => addToCart()}>
                                    <FaPlus size={18} className="me-1"/>Thêm vào hóa đơn</a>
                                <a className="btn btn-outline-primary" onClick={() => handleGeneratePDF()}><AiOutlinePrinter size={18} className="me-1"/>In toa</a>
                                <a className="btn btn-outline-primary"
                                    onClick={() => backToList()}
                                ><AiOutlineRollback size={18} className="me-1" />Trở về</a>
                            </div>
                        </fieldset>
                    </div>
                </>
            }



        </>
    )

}
