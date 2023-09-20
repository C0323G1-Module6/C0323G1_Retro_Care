import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getAllIndicationsByPrescription, getOnePrescriptionById } from "../../services/retail/RetailService";



export default function RetailPrescriptionInfomation() {

    const [prescription, setPrescription] = useState(null);
    const [duration, setDuration] = useState(0);
    const { id } = useParams();
    const [indications, setIndications] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        getPrescription();
        getIndications();
    }, []);

    const backToList = () =>{
        navigate("/dashboard/retail/prescription-list");
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

    const deleteMedicine =(id)=>{
        const list = indications.filter(item => item.id !== id);
        setIndications((pre)=>list);
        }
        
    

    const openSwal = (id) => {
        Swal.fire({
            title: "Delete Confirmation",
            text: "Do you want to delete: ",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Yes, delete it",
            icon: "question",
        }).then( (result) => {
            if (result.isConfirmed) {
                // code here
                deleteMedicine(id);
                    Swal.fire({
                        text: "Delete successfully ",
                        icon: "success",
                        timer: 1500,
                    });
            } else {
                Swal.fire({
                    text: "You choose cancel ",
                    icon: "warning",
                    timer: 1500,
                });
            }
        });
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
                                        value={duration} onChange={(event) => setDuration(event.target.value)}
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
                                                <label className="col-sm-1 col-form-label">{index+1}</label>
                                                <div className="col-sm-5">
                                                    <input className="form-control" value={indication.name} readOnly />
                                                </div>
                                                
                                                <div className="col-sm-2">
                                                    <input readOnly className="form-control" value={indication.frequency*indication.dosage*duration} />
                                                </div>
                                                <label className="col-sm-2 col-form-label">Viên</label>

                                                <div className="col-sm-2">
                                                    <a
                                                        type="button"
                                                        title="Xóa"
                                                        className="btn btn-outline-primary"
                                                        onClick={()=>openSwal(indication.id)}
                                                    >
                                                        <i className="fa-solid fa-trash"></i> Xoá
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="mb-3 row d-flex align-items-center justify-content-start">
                                                <div className="col-sm-1">&nbsp;</div>
                                                <label className="col-sm-3 col-form-label">Ngày uống: </label>
                                                <div className="col-sm-2">
                                                    <input className="form-control" readOnly value={indication.frequency} />
                                                </div>
                                                <label className="col-sm-1 col-form-label">lần,</label>
                                                <label className="col-sm-2 col-form-label">Mỗi lần: </label>
                                                <div className="col-sm-2">
                                                    <input className="form-control" readOnly value={indication.dosage} />
                                                </div>
                                                <label className="col-sm-1 col-form-label">viên</label>
                                            </div>
                                        </div>
                                    ))}




                                </fieldset>
                                <a className="btn btn-outline-primary">Thêm vào hóa đơn</a>
                                <a className="btn btn-outline-primary">In toa</a>
                                <a className="btn btn-outline-primary"
                                onClick={()=>backToList()}
                                ><i className="fa-regular fa-circle-left"></i>Huỷ</a>
                            </div>
                        </fieldset>
                    </div>
                </>
            }



        </>
    )

}
