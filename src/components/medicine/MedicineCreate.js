import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup"
import {useEffect, useState} from "react";
import {getAllUnit, addMedicine, getAllKindOfMedicine} from "../../services/medicine/MedicineService";
import "./MedicineCreate.css";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

export default function MedicineCreate() {
    const [units, setUnits] = useState([]);
    const [kindOfMedicines, setKindOfMedicines] = useState([]);
    const [imagePath, setImagePath] = useState('');
    const navigate = useNavigate();
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        const imagePath = URL.createObjectURL(file);
        setImagePath(imagePath);

        // reader.onload = () => {
        //     setImagePath(reader.result);
        // };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const getListUnits = async () => {
        const result = await getAllUnit();
        setUnits(result);
    }
    const getListKindOfMedicines = async () => {
        const result = await getAllKindOfMedicine();
        setKindOfMedicines(result);
    }
    useEffect(() => {
        getListUnits();
    }, [])
    useEffect(() => {
        getListKindOfMedicines();
    }, [])
    const add = async (medicine) => {
        console.log(medicine)
        try {
            const medicine1 = {
                ...medicine,
                kindOfMedicineDto: JSON.parse(medicine.kindOfMedicineDto),
            }
            medicine1.imageMedicineDto.imagePath = imagePath;
            await addMedicine(medicine1);
            await Swal.fire(
                'Thêm mới thành công !',
                'Thuốc ' + medicine.name + ' đã được thêm mới!',
                'success'
            );
            await navigate("/dashboard/medicine");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <Formik
                initialValues={{
                    code: "",
                    name: "",
                    price: "",
                    quantity: "",
                    vat: "",
                    note: "",
                    maker: "",
                    activeElement: "",
                    origin: "",
                    retailProfits: "",
                    kindOfMedicineDto: "",
                    unitDetailDto: {
                        conversionRate: "",
                        conversionUnit: "",
                        unit: ""
                    },
                    imageMedicineDto: {
                        imagePath: "",
                    },
                }
                }

                validationSchema={Yup.object({
                    name: Yup.string().required("Không được để trống").max(50, "Tên quá dài").min(2, "Độ dài tên quá ngắn vui lòng nhập thêm"),
                    price: Yup.number().min(0, "Giá không được là số âm"),
                    vat: Yup.number().min(0, "Vat không được là số âm"),
                    maker: Yup.string().max(50, "Nhà sản xuất quá dài"),
                    activeElement: Yup.string().required("Không được để trống").max(50, "Hoạt chất quá dài"),
                    origin: Yup.string().required("Không được để trống xuất xứ").max(50, "Xuất xứ quá dài"),
                    retailProfits: Yup.number().required("Không được để trống ").min(0, "% Lợi nhuận xuất lẻ  không được bé hơn 0"),
                    kindOfMedicineDto: Yup.string().required("Không được để trống nhóm thuốc"),
                    unitDetailDto: Yup.object().shape({
                        conversionRate: Yup.number().required("Không được để trống").min(0, "Tỷ lệ quy đổi không được bé hơn 0"),
                        conversionUnit: Yup.string().required("Không được để trống"),
                        unit: Yup.number().required("Không được để trống"),
                    }),
                })}
                onSubmit={(values) => {
                    console.log(values)
                    add(values)
                }
                }>

                <div className="container-fluid d-flex justify-content-center p-5">
                    <fieldset className="form-input shadow">
                        <legend className="float-none w-auto px-3"><h2>Thông tin thuốc</h2></legend>
                        <Form>
                            <div className="row">
                                <div className="col-4 d-flex justify-content-center align-items-center">
                                    <img src={imagePath} width="250" height="300"
                                         style={{borderRadius: "120px", objectFit: "cover"}}/>
                                </div>
                                <div className="col-8">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="col-md-4">Mã thuốc<span
                                                style={{color: "red"}}> *</span></label>
                                            <Field
                                                disabled
                                                className="col-md-2"
                                                type="text"
                                                name="code"
                                                id="code"
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
                                        <div className="row">
                                            <div className="col-md-8"></div>
                                            <div className="col-md-4"
                                                 style={{height: "0.6rem", marginLeft: "68%", marginBottom: "0.6rem"}}>
                                                <ErrorMessage className="text-danger" name="name" component="small"/>
                                            </div>
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
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div style={{height: "0.6rem", marginLeft: "34%", marginBottom: "0.6rem"}}>
                                                <ErrorMessage className="text-danger" name="activeElement"
                                                              component="small"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div style={{height: "0.6rem", marginLeft: "34%", marginBottom: "0.6rem"}}>
                                                <ErrorMessage className="text-danger" name="kindOfMedicineDto"
                                                              component="small"/>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="col-md-4">Đơn vị<span
                                                style={{color: "red"}}> *</span></label>
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
                                            <div style={{height: "0.6rem", marginLeft: "34%", marginBottom: "0.6rem"}}>
                                                <ErrorMessage className="text-danger" name="unitDetailDto.unit"
                                                              component="small"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div style={{height: "0.6rem", marginLeft: "34%", marginBottom: "0.6rem"}}>
                                                <ErrorMessage className="text-danger"
                                                              name="unitDetailDto.conversionUnit"
                                                              component="small"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="col-md-4">Giá bán lẻ</label>
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
                                            <div style={{height: "0.6rem", marginLeft: "34%", marginBottom: "0.6rem"}}>
                                                <ErrorMessage className="text-danger" name="price" component="small"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div style={{height: "0.6rem", marginLeft: "34%", marginBottom: "0.6rem"}}>
                                                <ErrorMessage className="text-danger" name="retailProfits"
                                                              component="small"/>
                                            </div>
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
                                            <div style={{height: "0.6rem", marginLeft: "34%", marginBottom: "0.6rem"}}>
                                                <ErrorMessage className="text-danger"
                                                              name="unitDetailDto.conversionRate"
                                                              component="small"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div style={{height: "0.6rem", marginLeft: "34%", marginBottom: "0.6rem"}}>
                                                <ErrorMessage className="text-danger" name="vat" component="small"/>
                                            </div>
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
                                        <div className="col-md-6">
                                            <div style={{height: "0.6rem", marginLeft: "34%", marginBottom: "0.6rem"}}>
                                                <ErrorMessage className="text-danger" name="maker" component="small"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div style={{height: "0.6rem", marginLeft: "34%", marginBottom: "0.6rem"}}>
                                                <ErrorMessage className="text-danger" name="origin" component="small"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="d-flex justify-content-start">
                                            <label className="col-md-2" style={{height: "60%"}}
                                                   htmlFor="inputGroupFile01">
                                                Chọn ảnh
                                            </label>
                                            <input
                                                type="file"
                                                name="imageMedicineDto.imagePath"
                                                className="form-control form-control-sm w-75"
                                                id="inputGroupFile01"
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label style={{width: "17.66666667%"}} className="col-md-2">Ghi chú</label>
                                        <Field component="textarea" className="form-control" name="note"/>
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
                                                Thêm mới
                                            </button>
                                            <a href="/dashboard/medicine">
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
                                </div>
                            </div>
                        </Form>
                    </fieldset>
                </div>
            </Formik>
        </>
    )
}