import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { getAllPatient } from "../../services/prescription/patient";
import { getMedicineList } from "../../services/medicine/MedicineService";
import { createPrescription } from "../../services/prescription/prescription";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function PrescriptionCreate() {
    const [patients, setPatients] = useState([]);
    const [chooseMedicines, setChooseMedicines] = useState([]);
    const navigate = useNavigate();

    const findAllPatient = async () => {
        const res = await getAllPatient();
        setPatients(res)
    };

    const findAllMedicine = async () => {
        const res = await getMedicineList();
        setChooseMedicines(res);
    }

    const createNewPrescription = async (value,setErrors) => {
        
        console.log(value);
        
        try {
            const result = await createPrescription(value);
            Swal.fire(
              "Thêm mới thành công !",
              "khách hàng" + value.name + "đã được thêm mới!",
              "success"
            );
            navigate("/dashboard/prescription")
          } catch (err) {
            console.log(err);
            if (err.response.data) {
              setErrors(err.response.data);
            }
          }
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
                        patient: 1,
                        duration: "",
                        note: "",
                        indicationDto: [{
                            medicine: "",
                            dosage: "",
                            frequency: "",
                        }]
                    }}

                    validationSchema={Yup.object({
                        code: Yup.string()
                            .required('Không được để trống mã toa thuốc!')
                            .max(6, "Độ dài không được quá 6 ký tự!")
                            .matches(/^TH-[0-9]{3}/, "Mã không đúng định dạng!"),
                        name: Yup.string()
                            .max(25, "Độ dài không được quá 25 ký tự!")
                            .required('Không được để trống tên toa thuốc!')
                            .matches(/^[a-zA-ZÀ-ỹ ]*$/, "Tên không được chứa ký tự đặc biệt!"),
                        symptoms: Yup.string()
                            .max(50, "Độ dài không quá 50 ký tự!")
                            .required('Không được để trống triệu chứng!')
                            .matches(/^[a-zA-ZÀ-ỹ ]*$/, "Triệu chứng không được chứa ký tự đặc biệt!"),
                        duration: Yup.number()
                            .required("Số ngày uống không được để trống!")
                            .max(30, "Số ngày uống không được quá 30 ngày!")
                            .min(1, "Số ngày uống không được nhỏ hơn 0!"),
                        // indicationDto: Yup.object().shape({
                        //     dosage: Yup.number().required("Số lần uống không được để trống!")
                        //         .max(30, "Số lần uống không được quá 30 ngày!")
                        //         .min(1, "Số lần uống không được nhỏ hơn 0!"),
                        //     frequency: Yup.number().required("Số viên uống không được để trống!")
                        //         .max(30, "Số viên uống không được quá 30 ngày!")
                        //         .min(1, "Số viên uống không được nhỏ hơn 0!"),
                        // })

                    })}

                    onSubmit={(values, {setErrors}) => {
                        console.log(values, setErrors);
                        createNewPrescription(values,setErrors);
                    }}
                >
                    {({ values }) => (
                        <fieldset className="border border-dark rounded-3 p-3 w-50" style={{ backgroundColor: '#f8f9fa' }}>
                            <legend className="float-none w-auto px-3">Thông tin toa thuốc</legend>
                            <Form>
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label" id="label-input" >Mã toa thuốc</label>
                                    <div className="col-sm-9">
                                        <Field type="text" className="form-control" name='code' placeholder="Nhập mã toa thuốc..." />
                                        <div style={{height: '15px'}}>
                                        <ErrorMessage name="code" component="small" style={{ color: 'red' }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label" id="label-input" >Tên đơn thuốc</label>
                                    <div className="col-sm-9">
                                        <Field type="text" className="form-control" name='name' placeholder="Nhập tên toa thuốc..." />
                                        <div style={{height: '15px'}}>
                                        <ErrorMessage name="name" component="small" style={{ color: 'red' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label" id="label-input">Triệu chứng</label>
                                    <div className="col-sm-9">
                                        <Field type="text" className="form-control" placeholder="Nhập triệu chứng..." name='symptoms' />
                                        <div style={{height: '15px'}}>
                                        <ErrorMessage name="symptoms" component="small" style={{ color: 'red' }} />
                                        </div>
                                    </div>

                                    
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label" id="label-input">Đối tượng</label>
                                    <div className="col-sm-4">
                                        <Field as='select' className="form-select" aria-label="Default select example" name='patient'>
                                            {
                                                patients.map((t) => (
                                                    <option value={t.id}>{t.name}</option>
                                                ))
                                            }
                                        </Field>
                                    </div>
                                    <label className="col-sm-3 col-form-label" id="label-input" >Số ngày uống </label>
                                    <div className="col-sm-2">
                                        <Field type="number" className="form-control" name='duration' placeholder="..."  />
                                        
                                    </div>
                                    <div style={{height: '15px', marginLeft: '32rem'}}>
                                        <ErrorMessage name="duration" component="small" style={{ color: 'red' }} />
                                        </div>

                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label" id="label-input" >Ghi chú</label>
                                    <div className="col-sm-9">
                                        <Field type="text" className="form-control" name='note' placeholder="Nhập ghi chú..." />
                                    </div>
                                </div>

                                <div className="d-flex flex-wrap gap-3 justify-content-center mt-10">
                                    <FieldArray name="indicationDto">
                                        {({ remove, push }) => (
                                            <fieldset className="border border-dark rounded-3 p-3 w-100">
                                                <legend className="float-none w-auto px-3">Chỉ định</legend>
                                                {values.indicationDto.map((i, index) => (
                                                    <div>
                                                        <div className="mb-3 row d-flex align-items-center justify-content-start">
                                                            <label className="col-sm-1 col-form-label">{index + 1}.</label>
                                                            <div className="col-sm-4">
                                                                <Field
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Tìm thuốc..."
                                                                    id="search-input"
                                                                    name={`indicationDto[${index}].medicine`}
                                                                    list="medicine-options"
                                                                />
                                                                <datalist id="medicine-options" >
                                                                    {chooseMedicines.map((medicine, index) => (
                                                                        <>
                                                                            <option value={medicine.name}></option>
                                                                        </>
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
                                                                <Field type="number" className="form-control" name={`indicationDto[${index}].frequency`} placeholder="..." />
                                                                <ErrorMessage name={`indicationDto[${index}].frequency`} component="" style={{ color: 'red' }} />
                                                            </div>

                                                            <label className="col-sm-1 col-form-label">lần,</label>
                                                            <label className="col-sm-2 col-form-label">Mỗi lần: </label>
                                                            <div className="col-sm-2">
                                                                <Field type="number" className="form-control" name={`indicationDto[${index}].dosage`} placeholder="..." />
                                                                <ErrorMessage name={`indicationDto[${index}].dosage`} component="div" style={{ color: 'red' }} />
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
                                                        type="button"
                                                    ><i className="fa-solid fa-plus" />Thêm mới thuốc</button>
                                                </div>
                                            </fieldset>

                                        )}
                                    </FieldArray>
                                    {/* </Formik > */}
                                    <div className="d-flex justify-content-end w-100 gap-2">
                                        <button type="submit" className=" btn btn-outline-primary" ><i className="fa-solid fa-plus" />
                                            Thêm mới</button>
                                            <Link to='/dashboard/prescription' className="btn btn-outline-primary"><i className="fa-regular fa-circle-left" />Trở về</Link>
                                    </div>
                                </div>
                            </Form>
                        </fieldset>
                    )}
                </Formik>
            </div >
        </>
    )
}
export default PrescriptionCreate;