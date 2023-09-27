import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { getAllPatient } from "../../services/prescription/patient";
import { getMedicineList } from "../../services/medicine/MedicineService";
import { editPrescription, getPrescriptionById } from "../../services/prescription/prescription";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getListIndication } from "../../services/prescription/indication";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import {
    AiOutlineRollback,
} from "react-icons/ai";
import * as Yup from 'yup';

function PrescriptionEdit() {
    const [patients, setPatients] = useState([]);
    const [chooseMedicines, setChooseMedicines] = useState([]);
    const [prescription, setPrescription] = useState();
    const [indications, setIndications] = useState([]);
    const [indication, setIndication] = useState([]);

    console.log(indications);

    const navigate = useNavigate();
    const param = useParams();

    const findAllPatient = async () => {
        const res = await getAllPatient();
        setPatients(res)
    };

    const findPrescriptionById = async () => {
        const res = await getPrescriptionById(param.id);
        console.log(res.data);
        setPrescription(res.data);
    }

    const total = indications?.map((i) => (
        i.dosage * i.frequency * prescription?.duration
    ))
    console.log(total);


    const findAllMedicine = async () => {
        const res = await getMedicineList();
        setChooseMedicines(res);
    }

    const findAllIndication = async () => {
        const res = await getListIndication(param.id);
        setIndications(res.data);
    }
    console.log(indications);
    console.log(indication);

    const totals = indication.indicationDto?.map((i) => (
        i.dosage * i.frequency * prescription?.duration
    ))


    const editNewPrescription = async (value) => {

        const result = await editPrescription(value);
        Swal.fire(
            "Sửa thành công !",
            "Toa thuốc " + value.name + " đã được cập nhật!",
            "success"
        );
        navigate("/dashboard/prescription")

    }

    useEffect(() => {
        findAllPatient();
        findAllMedicine();
        findPrescriptionById();
        findAllIndication();
    }, [param.id])

    if (prescription === undefined) {
        return null;
    }

    return (
        <>
            <div className="d-flex flex-wrap gap-3 justify-content-center mt-10">
                <Formik
                    initialValues={{
                        id: prescription?.id,
                        code: prescription?.code,
                        name: prescription?.name,
                        symptoms: prescription?.symptoms,
                        patient: prescription?.patient.id,
                        duration: prescription?.duration,
                        note: prescription?.note,
                        indicationDto: indications
                    }}

                    validationSchema={Yup.object({
                        code: Yup.string()
                            .required('Không được để trống mã toa thuốc!')
                            .max(6, "Độ dài không được quá 6 ký tự!")
                            .matches(/^TH[0-9]{3}/, "Mã không đúng định dạng!"),
                        name: Yup.string()
                            .max(25, "Độ dài không được quá 25 ký tự!")
                            .required('Không được để trống tên toa thuốc!')
                            .matches(/^[a-zA-ZÀ-ỹ ]*$/, "Tên không được chứa ký tự đặc biệt!"),
                        symptoms: Yup.string()
                            .max(50, "Độ dài không quá 50 ký tự!")
                            .required('Không được để trống triệu chứng!'),
                        duration: Yup.number()
                            .required("Không được để trống!")
                            .max(30, "Không được quá 30 ngày!")
                            .min(1, "Không được nhỏ hơn 0!"),
                        note: Yup.string()
                            .max(50, "Không được vượt quá 50 ký tự!"),
                        indicationDto: Yup.array().of(
                            Yup.object().shape({
                                // medicine: Yup.string.required("Không được để trống thuốc!"),
                                dosage: Yup.number().required("Không được để trống!")
                                    .max(30, "Không được quá 30 ngày!")
                                    .min(1, "Không được nhỏ hơn 0!"),
                                frequency: Yup.number().required("Không được để trống!")
                                    .max(30, "Không được quá 30 ngày!")
                                    .min(1, "Không được nhỏ hơn 0!"),
                            })
                        )

                    })}

                    onSubmit={(values) => {
                        console.log(values);
                        editNewPrescription(values);

                    }}
                >
                    {({ values }) => (
                        <fieldset className="border border-dark rounded-3 p-3 w-50" style={{ backgroundColor: '#f8f9fa' }}>
                            <legend className="float-none w-auto px-3">Thông tin toa thuốc</legend>
                            <Form>
                                <Field type="hidden" name="id" value={prescription.id} />
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label" id="label-input">Mã toa thuốc</label>
                                    <div className="col-sm-9">
                                        <Field type="text" className="form-control" name='code' disabled />
                                        <div style={{ height: '15px' }}>
                                            <ErrorMessage name="code" component="small" style={{ color: 'red' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label" id="label-input">Tên đơn thuốc</label>
                                    <div className="col-sm-9">
                                        <Field type="text" className="form-control" name='name' />
                                        <div style={{ height: '15px' }}>
                                            <ErrorMessage name="name" component="small" style={{ color: 'red' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label" id="label-input">Triệu chứng</label>
                                    <div className="col-sm-9">
                                        <Field type="text" className="form-control" name='symptoms' />
                                        <div style={{ height: '15px' }}>
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
                                    <label className="col-sm-3 col-form-label" id="label-input">Số ngày uống </label>
                                    <div className="col-sm-2">
                                        <Field type="number" className="form-control" name='duration' />
                                    </div>
                                    <div style={{ height: '15px', marginLeft: '25rem' }}>
                                        <ErrorMessage name="duration" component="small" style={{ color: 'red' }} />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label" id="label-input">Ghi chú</label>
                                    <div className="col-sm-9">
                                        <Field type="text" className="form-control" name='note' />
                                        <div style={{ height: '15px' }}>
                                            <ErrorMessage name="note" component="small" style={{ color: 'red' }} />
                                        </div>
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
                                                                    value={i.medicine}
                                                                    name={`indicationDto[${index}].medicine`}
                                                                    list="medicine-options"
                                                                />
                                                                <ErrorMessage name={`indicationDto[${index}].medicine`} component="small" style={{ color: 'red' }} />
                                                                <datalist id="medicine-options">
                                                                    {chooseMedicines.map((medicine, index) => (
                                                                        <option value={medicine.name}>{medicine.name}</option>
                                                                    ))}
                                                                </datalist>
                                                                {/* <Field as='select' className="form-select" aria-label="Default select example" name={`indicationDto[${index}].medicine`}>
                                                                    {
                                                                        chooseMedicines.map((t) => (
                                                                            <option value={t.name}>{t.name}</option>
                                                                        ))
                                                                    }
                                                                </Field> */}

                                                            </div>
                                                            <label className="col-sm-3 col-form-label">Số viên:</label>
                                                            <div className="col-sm-2">
                                                                <input type="text" className="form-control" value={totals && totals.length > 0 ? totals[index] : total[index]} disabled />
                                                            </div>
                                                            <div className="col-sm-2">
                                                                <button type="button" className="btn btn-outline-primary" onClick={() => remove(index)}> <FaRegTrashAlt className="mx-1" />
                                                                    Xoá
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="mb-3 row d-flex align-items-center justify-content-start">
                                                            <div className="col-sm-1">&nbsp;</div>
                                                            <label className="col-sm-2 col-form-label">Ngày : </label>
                                                            <div className="col-sm-2">
                                                                <Field type="text" className="form-control" name={`indicationDto[${index}].frequency`} placeholder="..." />
                                                            </div>
                                                            <label className="col-sm-1 col-form-label">lần,</label>
                                                            <label className="col-sm-2 col-form-label">Mỗi lần: </label>
                                                            <div className="col-sm-2">
                                                                <Field type="text" className="form-control" name={`indicationDto[${index}].dosage`} placeholder="..." />
                                                            </div>
                                                            <label className="col-sm-1 col-form-label">viên</label>
                                                            <div className="col-sm-6 text-center" style={{ marginLeft: '-0.4rem' }}>
                                                                <ErrorMessage name={`indicationDto[${index}].frequency`} component="small" style={{ color: 'red' }} />
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <ErrorMessage name={`indicationDto[${index}].dosage`} component="small" style={{ color: 'red' }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="d-flex justify-content-left align-items-center">
                                                    <button
                                                        className="btn btn-outline-primary"
                                                        onClick={() => {
                                                            setIndication(values)
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
                                        <button type="submit" className=" btn btn-outline-primary" ><FiEdit className="mx-1" />
                                            Sửa</button>
                                        <Link to='/dashboard/prescription' className="btn btn-outline-primary"><AiOutlineRollback className="mx-1" />Trở về</Link>
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
export default PrescriptionEdit;