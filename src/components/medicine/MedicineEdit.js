import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate, useParams} from "react-router-dom";
import {
    editMedicine,
    getAllKindOfMedicine,
    getAllUnit,
    getMedicineById
} from "../../services/medicine/MedicineService";
import {useEffect, useState} from "react";
import "./MedicineCreate.css";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default function MedicineEdit() {
    const [selectedImagePath, setSelectedImagePath] = useState('');
    const [units, setUnits] = useState([]);
    const [kindOfMedicines, setKindOfMedicines] = useState([]);
    const [medicines, setMedicines] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();
    const getListUnits = async () => {
        const result = await getAllUnit();
        setUnits(result);
    }
    useEffect(() => {
        getListUnits();
    }, [])
    const getMedicine = async () => {
        const result = await getMedicineById(id);
        setSelectedImagePath(result.imageMedicineDto.imagePath);
        console.log(result);
        await setMedicines(result);
    }
    const handleFileChange = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        const imagePath = URL.createObjectURL(file);
        setSelectedImagePath(imagePath);
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const getListKindOfMedicines = async () => {
        const result = await getAllKindOfMedicine();
        setKindOfMedicines(result);
    }
    useEffect(() => {
        getMedicine();
    }, [])
    useEffect(() => {
        getListKindOfMedicines();
    }, [])
    const edit = async (medicine) => {
        const initialValues = {
            id: medicines?.id,
            code: "",
            name: "",
            price: "",
            vat: "",
            note: "",
            maker: "",
            activeElement: "",
            origin: "",
            retailProfits: "",
            kindOfMedicineDto: JSON.parse(medicine?.kindOfMedicineDto),
            unitDetailDto: {
                id: medicines?.unitDetailDto?.id,
                conversionRate: "",
                conversionUnit: "",
                medicine: medicines?.unitDetailDto?.medicine,
                unit: ""
            },
            imageMedicineDto: {
                id: medicines?.imageMedicineDto?.id,
                imagePath: medicines?.imageMedicineDto?.imagePath,
                medicine: medicines?.imageMedicineDto?.medicine,
            },
        };

// Lấy giá trị từ các trường đầu vào và gán cho thuộc tính tương ứng trong đối tượng
        initialValues.code = document.getElementById("code").value;
        initialValues.name = document.getElementById("name").value;
        initialValues.price = document.getElementById("price").value;
        initialValues.vat = document.getElementById("vat").value;
        initialValues.note = document.getElementById("note").value;
        initialValues.maker = document.getElementById("maker").value;
        initialValues.activeElement = document.getElementById("active-element").value;
        initialValues.origin = document.getElementById("origin").value;
        initialValues.retailProfits = document.getElementById("retail-profits").value;
        // initialValues.kindOfMedicineDto = document.getElementById("kind-of-medicine").value;
        initialValues.unitDetailDto.conversionRate = document.getElementById("conversion-rate").value;
        initialValues.unitDetailDto.conversionUnit = document.getElementById("conversion-unit").value;
        initialValues.unitDetailDto.unit = document.getElementById("unit").value;
        if (selectedImagePath !== null) {
            initialValues.imageMedicineDto.imagePath = selectedImagePath;
        }
// Sử dụng đối tượng initialValues có các thuộc tính đã được gán giá trị
        console.log(initialValues);
        await editMedicine(id, initialValues);
        await Swal.fire(
            'Cập nhật thành công !',
            'Thuốc ' + medicine.name + ' đã được cập nhật !',
            'success'
        );
        console.log(initialValues)
        await navigate("/dashboard/medicine");
    }
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    ...medicines,
                    kindOfMedicineDto: JSON.stringify(medicines?.kindOfMedicineDto),
                    unitDetailDto: JSON.stringify(medicines?.unitDetailDto),
                    // unitDetailDto: JSON.stringify(medicines?.unitDetailDto)?JSON.stringify(medicines?.unitDetailDto):{unit:","},
                    conversionRate: JSON.stringify(medicines?.unitDetailDto?.conversionRate),
                    conversionUnit: JSON.stringify(medicines?.unitDetailDto?.conversionUnit),
                    unit: JSON.stringify(medicines?.unitDetailDto?.unit),
                    imagePath: JSON.stringify(medicines?.imageMedicineDto?.imagePath),
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
                    // unitDetailDto: Yup.object().shape({
                    conversionRate: Yup.number().required("Không được để trống").min(0, "Tỷ lệ quy đổi không được bé hơn 0"),
                    conversionUnit: Yup.string().required("Không được để trống"),
                    unit: Yup.number().required("Không được để trống"),
                    // }),
                })}
                onSubmit={(values) => {
                    edit(values)
                    // console.log(values)
                }
                }>

                <div className="container-fluid d-flex justify-content-center p-5">
                    <fieldset className="form-input shadow">
                        <legend className="float-none w-auto px-3"><h2>Thông tin thuốc</h2></legend>
                        <Form>
                            <div className="row">
                                <div className="col-4  d-flex justify-content-center align-items-center">
                                    <img src={selectedImagePath} width="250" height="300"
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
                                                id="name"
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
                                                id="active-element"
                                                placeholder="Vitamin B2"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="col-md-4"
                                            >Nhóm thuốc<span style={{color: "red"}}> *</span></label
                                            >
                                            <Field as="select" className="col-md-2" name="kindOfMedicineDto"
                                                   id="kind-of-medicine">
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
                                            <Field as="select" className="col-md-2" name="unit" id="unit">
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
                                            <Field as="select" className="col-md-2" name="conversionUnit"
                                                   id="conversion-unit">
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
                                                id="price"
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
                                                id="retail-profits"
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
                                                name="conversionRate"
                                                id="conversion-rate"
                                                placeholder="10.000"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="col-md-4">VAT</label>
                                            <Field className="col-md-2" type="text" name="vat" id="vat"
                                                   placeholder="5"/>
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
                                            <Field className="col-md-2" type="text" name="maker" id="maker"/>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="col-md-4"
                                            >Xuất xứ<span style={{color: "red"}}> *</span></label
                                            >
                                            <Field as="select" className="col-md-2" name="origin" id="origin">
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
                                                name="imagePath"
                                                className="form-control form-control-sm w-75"
                                                id="inputGroupFile01"
                                                onChange={handleFileChange} // Gọi hàm xử lý sự kiện khi người dùng chọn tệp tin
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label style={{width: "17.66666667%"}} className="col-md-2">Ghi chú</label>
                                        <Field component="textarea" className="form-control" name="note" id="note"/>
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