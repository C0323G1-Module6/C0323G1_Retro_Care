import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup"
import { useEffect, useRef, useState } from "react";
import {
    getAllUnit,
    addMedicine,
    getCountries,
    getMedicineCode
} from "../../services/medicine/MedicineService";
import "./MedicineCreate.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { getList } from "../../services/kindOfMedicine/KindOfMedicineService";

export default function MedicineCreate() {
    const [units, setUnits] = useState([]);
    const [kindOfMedicines, setKindOfMedicines] = useState([]);
    const navigate = useNavigate();
    const imgPreviewRef = useRef(null);
    const inputFileRef = useRef(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [countries, setCountries] = useState([]);
    const [medicineCode, setMedicineCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const getCode = async () => {
        const result = await getMedicineCode();
        setMedicineCode(result.code);
        setImageUpload(result.imageMedicineDto.imagePath);
    };

    useEffect(() => {
        getCode()
    }, [])

    useEffect(() => {
        getListCountries();
    }, []);

    useEffect(() => {
        document.title = 'RetroCare - Thêm mới thuốc'
    })

    const getListUnits = async () => {
        const result = await getAllUnit();
        setUnits(result);
    }
    const getListCountries = async () => {
        const result = await getCountries();
        const countryNames = await result.map(country => country.name.common);
        setCountries(countryNames);

    }
    const getListKindOfMedicines = async () => {
        const result = await getList();
        setKindOfMedicines(result);
    }
    useEffect(() => {
        getListUnits();
    }, [])
    useEffect(() => {
        getListKindOfMedicines();
    }, [])
    const add = async (medicine, setErrors) => {
        if (!isSubmitting) {
            setIsSubmitting(true);
            // if (imageUpload != null) {
            const fileName = `medicine/${imageUpload.name + v4()}`;
            const imageRef = ref(storage, fileName);
            await uploadBytes(imageRef, imageUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (url) => {
                    console.log(url);
                    try {
                        const medicine1 = {
                            ...medicine,
                            kindOfMedicineDto: JSON.parse(medicine?.kindOfMedicineDto),
                        }
                        if (url !== null) {
                            medicine1.imageMedicineDto.imagePath = url;
                            console.log(url);
                        } else {
                            medicine1.imageMedicineDto.imagePath = imageUpload;
                        }
                        await addMedicine(medicine1);
                        Swal.fire({
                            title: 'Thêm mới thành công !',
                            text: 'Thuốc ' + medicine.name + ' đã được thêm mới!',
                            icon: 'success',
                            timer: 5000, // Thời gian hiển thị thông báo (3 giây)
                            showConfirmButton: false,
                        });
                        await navigate("/dashboard/medicine");
                    } catch (err) {
                        console.log(err);
                        if (err.response.data) {
                            setErrors(err.response.data);
                        }
                    }
                });
            });
        }
    }
    const handleInputChange = (event) => {
        const file = event.target.files[0];
        if (file.size > 3000000) {
            Swal.fire({
                icon: "error",
                title: "Dung lượng ảnh tối đa 3MB",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    icon: "icon-post",
                },
            });
            return;
        }
        setImageUpload(file);
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            imgPreviewRef.current.src = reader.result;
            imgPreviewRef.current.style.display = "block";
        });
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    
    if (medicineCode == "") {
        return null;
    }


    return (
        <>
            <div id="tincute">
                <Formik
                    initialValues={{
                        code: medicineCode,
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
                        name: Yup.string()
                            .matches(/^[a-zA-Z0-9\s]+$/, "Tên không chứa kí tự đặc biệt")
                            .required("Không được để trống.").max(50, "Tên vượt quá 50 kí tự")
                            .min(2, "Tên phải từ 2 kí tự trở lên."),
                        price: Yup.number()
                            .typeError("Không cho phép nhập chuỗi trong trường này .")
                            .min(0, "Giá không được là số âm."),
                        vat: Yup.number()
                            .typeError("Không cho phép nhập chuỗi trong trường này .")
                            .min(0, "Vat không được là số âm."),
                        maker: Yup.string()
                            .matches(/^[a-zA-Z0-9\s]+$/, "Nhà sản xuất không chứa kí tự đặc biệt")
                            .max(50, "Nhà sản xuất vượt quá 50 kí tự."),
                        activeElement: Yup.string()
                            .matches(/^[a-zA-Z0-9\s]+$/, "Hoạt chất không chứa kí tự đặc biệt")
                            .required("Không được để trống.")
                            .max(50, "Hoạt chất không vượt quá 50 kí tự."),
                        note: Yup.string()
                            .max(100, "Ghi chú không vượt quá 100 kí tự."),
                        origin: Yup.string()
                            .required("Không được để trống.")
                            .max(50, "Xuất xứ vượt quá 50 kí tự."),
                        retailProfits: Yup.number()
                            .typeError("Không cho phép nhập chuỗi trong trường này .")
                            .required("Không được để trống. ").min(0, "% Lợi nhuận xuất lẻ  không được bé hơn 0."),
                        kindOfMedicineDto: Yup.string()
                            .required("Không được để trống."),
                        unitDetailDto: Yup.object().shape({
                            conversionRate: Yup.number()
                                .typeError("Không cho phép nhập chuỗi trong trường này .")
                                .required("Không được để trống.").min(0, "Tỷ lệ quy đổi không được bé hơn 0."),
                            conversionUnit: Yup.string()
                                .required("Không được để trống."),
                            unit: Yup.number().required("Không được để trống."),
                        }),
                    })}
                    onSubmit={(values, { setErrors }) => {
                        console.log(values)
                        add(values, setErrors)
                    }
                    }>
                    <div className="tin">
                        <div style={{}} className="container-fluid d-flex justify-content-center p-5">
                            <fieldset className="form-input shadow">
                                <legend className="float-none w-auto px-3"><h2>Thông tin thuốc</h2></legend>
                                <Form>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label className="col-md-4">Mã thuốc<span
                                                        style={{ color: "red" }}> *</span></label>
                                                    <Field
                                                        disabled
                                                        className="col-md-2"
                                                        type="text"
                                                        name="code"
                                                        id="code"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="col-md-4"
                                                    >Tên thuốc<span style={{ color: "red" }}> *</span></label
                                                    >
                                                    <Field
                                                        className="col-md-2"
                                                        type="text"
                                                        name="name"
                                                    />
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-8"></div>
                                                    <div className="col-md-4"
                                                        style={{
                                                            height: "0.6rem",
                                                            marginLeft: "68%",
                                                            marginBottom: "1.3rem"
                                                        }}>
                                                        <ErrorMessage className="text-danger" name="name"
                                                            component="small" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label className="col-md-4"
                                                    >Hoạt chất<span style={{ color: "red" }}> *</span></label
                                                    >
                                                    <Field
                                                        className="col-md-2"
                                                        type="text"
                                                        name="activeElement"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="col-md-4"
                                                    >Nhóm thuốc<span style={{ color: "red" }}> *</span></label
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
                                                    <div style={{
                                                        height: "0.6rem",
                                                        marginLeft: "34%",
                                                        marginBottom: "1.3rem"
                                                    }}>
                                                        <ErrorMessage className="text-danger" name="activeElement"
                                                            component="small" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div style={{
                                                        height: "0.6rem",
                                                        marginLeft: "34%",
                                                        marginBottom: "1.3rem"
                                                    }}>
                                                        <ErrorMessage className="text-danger" name="kindOfMedicineDto"
                                                            component="small" />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label className="col-md-4">Đơn vị<span
                                                        style={{ color: "red" }}> *</span></label>
                                                    <Field as="select" className="col-md-2" name="unitDetailDto.unit">
                                                        <option value="" disabled>Chọn đơn vị</option>
                                                        {units.map((unit) => (
                                                            <option key={unit.id} value={unit.id}>{unit.name}</option>
                                                        ))}
                                                    </Field>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="col-md-4"
                                                    >ĐVT quy đổi<span style={{ color: "red" }}> *</span></label
                                                    >
                                                    <Field as="select" className="col-md-2"
                                                        name="unitDetailDto.conversionUnit">
                                                        <option value="" disabled>Chọn ĐVT quy đổi</option>
                                                        {
                                                            units.map((unit) => (
                                                                <option key={unit.id}
                                                                    value={unit.name}>{unit.name}</option>
                                                            ))
                                                        }
                                                    </Field>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div style={{
                                                        height: "0.6rem",
                                                        marginLeft: "34%",
                                                        marginBottom: "1.3rem"
                                                    }}>
                                                        <ErrorMessage className="text-danger" name="unitDetailDto.unit"
                                                            component="small" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div style={{
                                                        height: "0.6rem",
                                                        marginLeft: "34%",
                                                        marginBottom: "1.3rem"
                                                    }}>
                                                        <ErrorMessage className="text-danger"
                                                            name="unitDetailDto.conversionUnit"
                                                            component="small" />
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
                                                    />
                                                    <span>đ/hộp</span>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="col-md-4"
                                                    >%Lợi nhuận XL<span style={{ color: "red" }}> *</span></label
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
                                                    <div style={{
                                                        height: "0.6rem",
                                                        marginLeft: "34%",
                                                        marginBottom: "1.3rem"
                                                    }}>
                                                    
                                                        <ErrorMessage className="text-danger" name="price"
                                                            component="small" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div style={{
                                                        height: "0.6rem",
                                                        marginLeft: "34%",
                                                        marginBottom: "1.3rem"
                                                    }}>
                                                        <ErrorMessage className="text-danger" name="retailProfits"
                                                            component="small" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label className="col-md-4"
                                                    >Tỷ lệ quy đổi<span style={{ color: "red" }}> *</span></label
                                                    >
                                                    <Field
                                                        className="col-md-2"
                                                        type="text"
                                                        name="unitDetailDto.conversionRate"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="col-md-4">VAT</label>
                                                    <Field className="col-md-2" type="text" name="vat" />
                                                    <span>% </span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div style={{
                                                        height: "0.6rem",
                                                        marginLeft: "34%",
                                                        marginBottom: "1.3rem"
                                                    }}>
                                                        <ErrorMessage className="text-danger"
                                                            name="unitDetailDto.conversionRate"
                                                            component="small" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div style={{
                                                        height: "0.6rem",
                                                        marginLeft: "34%",
                                                        marginBottom: "1.3rem"
                                                    }}>
                                                        <ErrorMessage className="text-danger" name="vat"
                                                            component="small" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label className="col-md-4">Nhà sản xuất</label>
                                                    <Field className="col-md-2" type="text" name="maker" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="col-md-4"
                                                    >Xuất xứ<span style={{ color: "red" }}> *</span></label
                                                    >
                                                    <Field as="select" className="col-md-2" name="origin">
                                                        <option value="" disabled>Chọn quốc gia</option>
                                                        {countries.map((country, index) => (
                                                            <option key={index} value={country}>
                                                                {country}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div style={{
                                                        height: "0.6rem",
                                                        marginLeft: "34%",
                                                        marginBottom: "1.3rem"
                                                    }}>
                                                        <ErrorMessage className="text-danger" name="maker"
                                                            component="small" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div style={{
                                                        height: "0.6rem",
                                                        marginLeft: "34%",
                                                        marginBottom: "1.3rem"
                                                    }}>
                                                        <ErrorMessage className="text-danger" name="origin"
                                                            component="small" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"row"}>
                                                <div className={"col-6"}>
                                                    <div>
                                                        <div className="row">
                                                            <div className="d-flex justify-content-start">
                                                                <label className="col-md-4" style={{ height: "60%" }}
                                                                    htmlFor="inputGroupFile01">
                                                                    Chọn ảnh
                                                                </label>
                                                                <Field
                                                                    type="file"
                                                                    name="imageMedicineDto.imagePath"
                                                                    className="form-control form-control-sm w-50"
                                                                    id="inputGroupFile01"
                                                                    aria-describedby="inputGroupFileAddon03"
                                                                    aria-label="Upload"
                                                                    accept="image/png, image/gif, image/jpeg"
                                                                    ref={inputFileRef}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <label className="col-md-4">Ghi
                                                                chú</label>
                                                            <Field component="textarea" className="form-control w-50" style={{ height: "227px" }}
                                                                name="note" />
                                                        </div>
                                                    </div> </div>
                                                <div className={"col-6 row d-flex justify-content-right"}>
                                                    <img
                                                        src={imageUpload}
                                                        ref={imgPreviewRef}
                                                        style={{
                                                            padding: "0",
                                                            width: "400px",
                                                            height: "300px",
                                                            borderRadius: "10px",
                                                            objectFit: "cover",
                                                            border: "1px solid black"
                                                        }} />
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className={"col-6"}>

                                                </div>
                                                <div className={"col-6"}>

                                                    <a href="/dashboard/medicine">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-secondary float-end mx-1 mt-2 shadow"
                                                        >
                                                            <i className="fa-solid fa-rotate-left"></i>
                                                            Trở về
                                                        </button>
                                                    </a>
                                                    <button
                                                        type="submit"
                                                        className="btn btn-outline-primary float-end mx-1 mt-2 shadow"
                                                        disabled={isSubmitting}
                                                    // disabled={!Formik.isValid}
                                                    >
                                                        <i className="fa-solid fa-plus"></i>
                                                        Thêm mới
                                                    </button>
                                                </div>
                                                <span>(<span style={{ color: "red" }}>*</span>) Thông tin bắt buộc nhập
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                </Form>
                            </fieldset>
                        </div>
                    </div>
                </Formik>
            </div>
        </>
    )
}