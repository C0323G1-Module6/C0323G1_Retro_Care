import { Field, FieldArray, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { getAllPatient } from "../../services/prescription/patient";
import { findAll } from "../../services/medicine/MedicineService";
import { createPrescription } from "../../services/prescription/prescription";
import { createIndication } from "../../services/prescription/indication";


const initialValues = {
    indication: [
        {
            medicine: "",
            dosage: "",
            frequency: "",
        }
    ]
};
function PrescriptionCreate() {
    const [patients, setPatients] = useState([]);
    const [chooseMedicines, setChooseMedicines] = useState([]);
    const btnRef = useRef(null);

    const findAllPatient = async () => {
        const res = await getAllPatient();
        setPatients(res)
    };

    const findAllMedicine = async () => {
        const res = await findAll();
        setChooseMedicines(res.content);
    }

    const createNewPrescription = async (value) => {
        await createPrescription(value);
    }

    const createNewIndication = async (value) => {
        await createIndication(value);
    }




    useEffect(() => {
        findAllPatient();
        findAllMedicine();
    }, [])

    return (
        <>
            <div className="d-flex flex-wrap gap-3 justify-content-center mt-10">
                <Formik
                    initialValues={{
                        code: "",
                        name: "",
                        symptoms: "",
                        patient: "",
                        duration: "",
                        note: ""
                    }}

                    onSubmit={(values) => {
                        console.log(values);
                        createNewPrescription(values);
                    }}
                >
                    <fieldset className="border border-dark rounded-3 p-3 w-50" style={{ backgroundColor: '#f8f9fa' }}>

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
                                            patients.map((t) => (
                                                <option value={`${JSON.stringify(t)}`}>{t.name}</option>
                                            ))
                                        }
                                    </Field>
                                </div>
                                <label className="col-sm-3 col-form-label" id="label-input">Số ngày uống </label>
                                <div className="col-sm-2">
                                    <Field type="number" className="form-control" name='duration' />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-3 col-form-label" id="label-input">Ghi chú</label>
                                <div className="col-sm-9">
                                    <Field type="text" className="form-control" name='note' />
                                </div>
                            </div>
                            <button type="submit" ref={btnRef} >oke</button>
                        </Form >



                        <div className="d-flex flex-wrap gap-3 justify-content-center mt-10">
                            <Formik
                                initialValues={initialValues}
                                onSubmit={(value)=>{
                                    // console.log(value);
                                }}
                            >
                                {({ values }) => (
                                    <Form>
                                        <FieldArray name="indication">
                                            {({ remove, push }) => (
                                                <fieldset className="border border-dark rounded-3 p-3 w-100">
                                                    <legend className="float-none w-auto px-3">Chỉ định</legend>
                                                    {values.indication.length > 0 && values.indication.map((i, index) => (
                                                        <div>
                                                            <div className="mb-3 row d-flex align-items-center justify-content-start">
                                                                <label className="col-sm-1 col-form-label">{index + 1}.</label>
                                                                <div className="col-sm-4">
                                                                    <Field
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Tìm thuốc..."
                                                                        id="search-input"
                                                                        // value={inputMedicine}
                                                                        // onChange={(event) => {
                                                                        //     setInputMedicine(event.target.value);
                                                                        // }}
                                                                        name={`indication[${index}].medicine`}
                                                                        list="medicine-options"
                                                                    />

                                                                    <datalist id="medicine-options">
                                                                        {chooseMedicines.map((medicine, index) => (
                                                                            <option key={medicine.id} value={medicine.name}></option>
                                                                        ))}
                                                                    </datalist>
                                                                    
                                                                </div>
                                                                <label className="col-sm-3 col-form-label">Số viên:</label>
                                                                <div className="col-sm-2">
                                                                    <input type="text" className="form-control" placeholder="..." />
                                                                </div>
                                                                <div className="col-sm-2">
                                                                    <button type="button" className="btn btn-outline-primary" onClick={() => remove(index)}><i className="fa-solid fa-trash" />
                                                                        Xoá
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className="mb-3 row d-flex align-items-center justify-content-start">
                                                                <div className="col-sm-1">&nbsp;</div>
                                                                <label className="col-sm-2 col-form-label">Ngày uống: </label>
                                                                <div className="col-sm-2">
                                                                    <Field type="text" className="form-control" name={`indication[${index}].frequency`} placeholder="..." />
                                                                </div>
                                                                <label className="col-sm-1 col-form-label">lần,</label>
                                                                <label className="col-sm-2 col-form-label">Mỗi lần: </label>
                                                                <div className="col-sm-2">
                                                                    <Field type="text" className="form-control" name={`indication[${index}].dosage`} placeholder="..." />
                                                                </div>
                                                                <label className="col-sm-1 col-form-label">viên</label>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="d-flex justify-content-left align-items-center">
                                                        <button
                                                            className="btn btn-outline-primary" 
                                                            onClick={() => {
                                                                push({ medicine: '', dosage: '', frequency: '' });
                                                                
                                                            }}
                                                            
                                                        ><i className="fa-solid fa-plus" />Thêm mới thuốc</button>
                                                    </div>
                                                </fieldset>

                                            )}
                                        </FieldArray>
                                    </Form>
                                )}
                            </Formik >
                            <div className="d-flex justify-content-end w-100 gap-2">
                                <button onClick={()=> btnRef.current.click()}  className=" btn btn-outline-primary" ><i className="fa-solid fa-plus" />
                                    Thêm mới</button>
                                <a href="ThanhKN_ListPrescription.html" className="btn btn-outline-primary"><i className="fa-regular fa-circle-left" />Trở về</a>
                            </div>
                        </div>
                    </fieldset>
                </Formik>
            </div >
        </>
    )
}
export default PrescriptionCreate;