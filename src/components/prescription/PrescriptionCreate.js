import { Field, FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { getAllPatient } from "../../services/prescription/patient";

function PrescriptionCreate() {
    const [patients, setPatients] = useState([])

    const findAllPatient = async () => {
        const res = await getAllPatient()
        console.log(res);
        setPatients(res)
    };

    const indicationValue = {
        indication: [
            {
                dosage :"",
                frequency : "",

            }
        ]
    };
    useEffect(() => {
        findAllPatient();
    }, [])

    return (
        <>

            <div className="d-flex flex-wrap gap-3 justify-content-center mt-10">
                <fieldset className="border border-dark rounded-3 p-3 w-50" style={{ backgroundColor: '#f8f9fa' }}>
                    <Formik
                    initialValues={{
                        code:"",
                        name:"",
                        symptoms:"",
                        patient: "",
                        duratiton: "",
                        note: ""
                    }}
                    >
                        <Form>
                            <legend className="float-none w-auto px-3">Thông tin đơn thuốc</legend>
                            <div className="mb-3 row">
                                <label className="col-sm-3 col-form-label" id="label-input">Mã toa thuốc</label>
                                <div className="col-sm-9">
                                    <Field type="text" className="form-control" name='code' />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-3 col-form-label" id="label-input">Tên đơn thuốc</label>
                                <div className="col-sm-9">
                                    <Field type="text" className="form-control" name='name' />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-3 col-form-label" id="label-input">Triệu chứng</label>
                                <div className="col-sm-9">
                                    <Field type="text" className="form-control" name='symptoms' />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-3 col-form-label" id="label-input">Đối tượng</label>
                                <div className="col-sm-4">
                                    <Field as='select' className="form-select" aria-label="Default select example" name='patient'>
                                        {
                                            patients.map((t)=>(
                                                <option value={`${JSON.stringify(t)}`}>{t.name}</option>
                                            ))
                                        }
                                    </Field>
                                </div>
                                <label className="col-sm-3 col-form-label" id="label-input">Số ngày uống </label>
                                <div className="col-sm-2">
                                    <Field type="number" className="form-control" name='duration'/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-3 col-form-label" id="label-input">Ghi chú</label>
                                <div className="col-sm-9">
                                    <Field type="text" className="form-control" name='note' />
                                </div>
                            </div>
                        </Form >
                    </Formik>
                    <Formik>
                        <Form>
                            <FieldArray>
                                <div className="d-flex flex-wrap gap-3 justify-content-center mt-10">
                                    <fieldset className="border border-dark rounded-3 p-3 w-100">
                                        <legend className="float-none w-auto px-3">Chỉ định</legend>
                                        <div className="mb-3 row d-flex align-items-center justify-content-start">
                                            <label className="col-sm-1 col-form-label">1.</label>
                                            <div className="col-sm-4">
                                                <select className="form-select" aria-label="Default select example">
                                                    <option selected>Chọn thuốc</option>
                                                    <option value={1}>Thuốc 1</option>
                                                    <option value={2}>Thuốc 2</option>
                                                    <option value={3}>Thuốc 3</option>
                                                </select>
                                            </div>
                                            <label className="col-sm-3 col-form-label">Số viên:</label>
                                            <div className="col-sm-2">
                                                <input type="text" className="form-control" placeholder="..." />
                                            </div>
                                            <div className="col-sm-2">
                                                <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-trash" />
                                                    Xoá
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mb-3 row d-flex align-items-center justify-content-start">
                                            <div className="col-sm-1">&nbsp;</div>
                                            <label className="col-sm-2 col-form-label">Ngày uống: </label>
                                            <div className="col-sm-2">
                                                <input type="text" className="form-control" placeholder="..." />
                                            </div>
                                            <label className="col-sm-1 col-form-label">lần,</label>
                                            <label className="col-sm-2 col-form-label">Mỗi lần: </label>
                                            <div className="col-sm-2">
                                                <input type="text" className="form-control" placeholder="..." />
                                            </div>
                                            <label className="col-sm-1 col-form-label">viên</label>
                                        </div>
                                        <div className="d-flex justify-content-left align-items-center">
                                            <button className=" btn btn-outline-primary"><i className="fa-solid fa-plus" />Thêm mới thuốc</button>
                                        </div>
                                    </fieldset>
                                    <div className="d-flex justify-content-end w-100 gap-2">
                                        <a href="ThanhKN_ListPrescription.html" className=" btn btn-outline-primary"><i className="fa-solid fa-plus" />
                                            Thêm mới</a>
                                        <a href="ThanhKN_ListPrescription.html" className="btn btn-outline-primary"><i className="fa-regular fa-circle-left" />Trở về</a>
                                    </div>
                                </div>
                            </FieldArray>
                        </Form>
                    </Formik >
                </fieldset>
            </div>
        </>
    )
}
export default PrescriptionCreate;