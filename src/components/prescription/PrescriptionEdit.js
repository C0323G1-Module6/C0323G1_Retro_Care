import { Field, FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { getAllPatient } from "../../services/prescription/patient";
import { getMedicineList } from "../../services/medicine/MedicineService";
import { editPrescription, getPrescriptionById } from "../../services/prescription/prescription";
import { useNavigate, useParams } from "react-router-dom";
import { getListIndication } from "../../services/prescription/indication";

function PrescriptionEdit() {
    const [patients, setPatients] = useState([]);
    const [chooseMedicines, setChooseMedicines] = useState([]);
    const [prescription, setPrescription] = useState();
    const [indications, setIndications] = useState([]);
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

    const findAllMedicine = async () => {
        const res = await getMedicineList();
        setChooseMedicines(res);
    }

    const findAllIndication = async () => {
        const res = await getListIndication(param.id);
        setIndications(res.data);
    }
    console.log(indications);

    const editNewPrescription = async (value) => {
        await editPrescription(value);
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
                                                    <option value={t.id}>{t.name}</option>
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

                                                                <datalist id="medicine-options">
                                                                    {chooseMedicines.map((medicine, index) => (
                                                                        <option value={medicine.id}>{medicine.name}</option>
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
                                                                <Field type="text" className="form-control" name={`indicationDto[${index}].frequency`} placeholder="..." />
                                                            </div>
                                                            <label className="col-sm-1 col-form-label">lần,</label>
                                                            <label className="col-sm-2 col-form-label">Mỗi lần: </label>
                                                            <div className="col-sm-2">
                                                                <Field type="text" className="form-control" name={`indicationDto[${index}].dosage`} placeholder="..." />
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
                                            Sửa</button>
                                        <a href="/dashboard/prescription" className="btn btn-outline-primary"><i className="fa-regular fa-circle-left" />Trở về</a>
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