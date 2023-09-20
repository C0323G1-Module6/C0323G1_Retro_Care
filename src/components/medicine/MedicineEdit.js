import {Field, Form, Formik} from "formik";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {editMedicine, getAllKindOfMedicine, getAllUnit, getMedicineById} from "../../services/medicine/MedicineService";
import {useEffect, useState} from "react";

export default function MedicineEdit() {
    const [units, setUnits] = useState([]);
    const [kindOfMedicines, setKindOfMedicines] = useState([]);
    const [medicines,setMedicines]=useState({});
    const  {id}=useParams();
    const navigate = useNavigate();
    const getListUnits = async () => {
        const result = await getAllUnit();
        setUnits(result);
    }
    useEffect(() => {
        getListUnits();
    }, [])
    const getMedicine = async () => {
      setMedicines(getMedicineById(id));
    }
    const getListKindOfMedicines = async () => {
        const result = await getAllKindOfMedicine();
        setKindOfMedicines(result);
    }
    useEffect(() => {
        getMedicine();
    }, {})
    useEffect(() => {
        getListKindOfMedicines();
    }, [])
    const edit = async (medicine) => {
      await editMedicine(id,medicine);
      await navigate("/api/medicine");
     await alert("Sửa thành công");
    }
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    ...medicines,kindOfMedicineDto: JSON.stringify(medicines?.kindOfMedicineDto),
                }
                }
                onSubmit={(values) => {
                    console.log(values)
                    edit(values)
                }
                }>
                <div className="container-fluid d-flex justify-content-center p-5">
                    <fieldset className="form-input shadow">
                        <legend className="float-none w-auto px-3"><h2>Thông tin thuốc</h2></legend>
                        <Form>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-md-4">Mã thuốc<span style={{color: "red"}}> *</span></label>
                                    <Field
                                        className="col-md-2"
                                        type="text"
                                        name="code"
                                        placeholder="00024419"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="col-md-4"
                                    >Tên thuốc<span style={{color: "red"}}> *</span></label
                                    >
                                    <Field
                                        className="col-md-2"
                                        type="text"
                                        name="name"
                                        placeholder="Vitamin B2"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-md-4"
                                    >Hoạt chất<span style={{color: "red"}}> *</span></label
                                    >
                                    <Field
                                        className="col-md-2"
                                        type="text"
                                        name="activeElement"
                                        placeholder="Vitamin B2"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="col-md-4"
                                    >Nhóm thuốc<span style={{color: "red"}}> *</span></label
                                    >
                                    <Field as="select" className="col-md-2" name="kindOfMedicineDto">
                                        <option value="" disabled>Chọn nhóm thuốc</option>
                                        {
                                            kindOfMedicines.map((kindOfMedicine) => (
                                                <option key={kindOfMedicine.id}
                                                        value={JSON.stringify(kindOfMedicine)}>{kindOfMedicine.name}</option>
                                            ))
                                        }
                                    </Field>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-md-4">Đơn vị<span style={{color: "red"}}> *</span></label>
                                    <Field as="select" className="col-md-2" name="unitDetailDto.unit">
                                        <option value="" disabled>Chọn đơn vị</option>
                                        {units.map((unit) => (
                                            <option key={unit.id} value={unit.id}>{unit.name}</option>
                                        ))}
                                    </Field>
                                </div>
                                <div className="col-md-6">
                                    <label className="col-md-4"
                                    >ĐVT quy đổi<span style={{color: "red"}}> *</span></label
                                    >
                                    <Field as="select" className="col-md-2" name="unitDetailDto.conversionUnit">
                                        <option value="" disabled>Chọn ĐVT quy đổi</option>
                                        {
                                            units.map((unit) => (
                                                <option key={unit.id} value={unit.name}>{unit.name}</option>
                                            ))
                                        }
                                    </Field>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-md-4">Giá nhập</label>
                                    <Field
                                        className="col-md-2"
                                        type="text"
                                        name="price"
                                        placeholder="4,329"
                                    />
                                    <span>đ/Hộp</span>
                                </div>
                                <div className="col-md-6">
                                    <label className="col-md-4"
                                    >%Lợi nhuận XL<span style={{color: "red"}}> *</span></label
                                    >
                                    <Field
                                        className="col-md-2"
                                        type="text"
                                        name="retailProfits"
                                        placeholder="10.000"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-md-4"
                                    >Tỷ lệ quy đổi<span style={{color: "red"}}> *</span></label
                                    >
                                    <Field
                                        className="col-md-2"
                                        type="text"
                                        name="unitDetailDto.conversionRate"
                                        placeholder="10.000"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="col-md-4">VAT</label>
                                    <Field className="col-md-2" type="text" name="vat" placeholder="5"/>
                                    <span>%</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-md-4">Nhà sản xuất</label>
                                    <Field className="col-md-2" type="text" name="maker"/>
                                </div>
                                <div className="col-md-6">
                                    <label className="col-md-4"
                                    >Xuất xứ<span style={{color: "red"}}> *</span></label
                                    >
                                    <Field as="select" className="col-md-2" name="origin">
                                        <option value="" disabled>Chọn quốc gia</option>
                                        <option value="Việt Nam">Việt Nam</option>
                                        <option value="United States">United States</option>
                                        <option value="Canada">Canada</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Australia">Australia</option>
                                    </Field>
                                </div>
                            </div>
                            <div className="row">
                                <div className="d-flex justify-content-start">
                                    <label className="col-md-2" style={{height: "60%"}} htmlFor="inputGroupFile01">Chọn
                                        ảnh</label>
                                    <Field type="file" name="imageMedicineDto.imagePath"
                                           className="form-control form-control-sm w-75" id="inputGroupFile01"/>
                                </div>
                            </div>
                            <div className="row">
                                <label style={{width: "17.66666667%"}} className="col-md-2">Ghi chú</label>
                                <textarea className="form-control" name="note"></textarea>
                            </div>
                            <br/>
                            <div className="row">
                                <div>
                                    <p>(<span style={{color: "red"}}>*</span>) Thông tin bắt buộc nhập</p>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-primary float-end mx-1 mt-2 shadow"
                                    >
                                        <i className="fa-solid fa-plus"></i>
                                        Hoàn thành
                                    </button>
                                    <a href="/prototype/product/DaoPTA_ProductList.html">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary float-end mx-1 mt-2 shadow"
                                        >
                                            <i className="fa-solid fa-rotate-left"></i>
                                            Trở về
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </Form>
                    </fieldset>
                </div>
            </Formik>
        </>
    )
}