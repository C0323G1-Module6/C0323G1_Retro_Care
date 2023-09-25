import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate, useParams} from "react-router-dom";
import {
    editMedicine,
    getAllUnit, getCountries,
    getMedicineById
} from "../../services/medicine/MedicineService";
import {useEffect, useRef, useState} from "react";
import "./MedicineCreate.css";
import Swal from "sweetalert2";
import * as Yup from "yup";
import {v4} from "uuid";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase/firebase";
import {getList} from "../../services/kindOfMedicine/KindOfMedicineService";


export default function MedicineEdit() {
    const [units, setUnits] = useState([]);
    const [kindOfMedicines, setKindOfMedicines] = useState([]);
    const [medicines, setMedicines] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();
    const imgPreviewRef = useRef(null);
    const inputFileRef = useRef(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [countries, setCountries] = useState([]);
    const getListUnits = async () => {
        const result = await getAllUnit();
        setUnits(result);
    }
    useEffect(() => {
        getListUnits();
    }, [])
    useEffect(() => {
        document.title = 'RetroCare - Sửa thuốc'
    })
    const getMedicine = async () => {
        const result = await getMedicineById(id);
        await setMedicines(result);
    }
    const getListCountries = async () => {
        const result = await getCountries();
        const countryNames = await result.map(country => country.name.common);
        setCountries(countryNames);
    }
    useEffect(() => {
        getListCountries();
    }, []);
    const getListKindOfMedicines = async () => {
        const result = await getList();
        setKindOfMedicines(result);
    }
    useEffect(() => {
        getMedicine();
    }, [])
    useEffect(() => {
        getListKindOfMedicines();
    }, [])
    const edit = async (medicine, setErrors) => {
        if (imageUpload != null) {
            const fileName = `medicine/${imageUpload.name + v4()}`;
            const imageRef = ref(storage, fileName);
            await uploadBytes(imageRef, imageUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (url) => {
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
                    if (url !== null) {
                        initialValues.imageMedicineDto.imagePath = url;
                    }
// Sử dụng đối tượng initialValues có các thuộc tính đã được gán giá trị
                    try {
                        await editMedicine(id, initialValues);
                        await Swal.fire(
                            'Cập nhật thành công !',
                            'Thuốc ' + medicine.name + ' đã được cập nhật !',
                            'success'
                        );
                        await navigate("/dashboard/medicine");
                    } catch (err) {
                        if (err.response.data) {
                            setErrors(err.response.data);
                        }
                    }
                });
            });
        } else {
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
            initialValues.imageMedicineDto.imagePath = medicines?.imageMedicineDto?.imagePath;
// Sử dụng đối tượng initialValues có các thuộc tính đã được gán giá trị
            try {
                await editMedicine(id, initialValues);
                await Swal.fire(
                    'Cập nhật thành công !',
                    'Thuốc ' + medicine.name + ' đã được cập nhật !',
                    'success'
                );
                await navigate("/dashboard/medicine");
            } catch (err) {
                if (err.response.data) {
                    setErrors(err.response.data);
                }
            }
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
    if (!medicines) {
        Swal.fire({
            title: 'Thông báo',
            text: 'Sản phẩm không tồn tại!',
            icon: 'warning',
            timer: 3000, // Thời gian hiển thị thông báo (3 giây)
            showConfirmButton: false,
        });
        navigate("/dashboard/medicine");
    }
    return (
        <>
            <div id="tincute">
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        ...medicines,
                        kindOfMedicineDto: JSON.stringify(medicines?.kindOfMedicineDto),
                        unitDetailDto: JSON.stringify(medicines?.unitDetailDto),
                        conversionRate: JSON.stringify(medicines?.unitDetailDto?.conversionRate),
                        conversionUnit: JSON.stringify(medicines?.unitDetailDto?.conversionUnit),
                        unit: JSON.stringify(medicines?.unitDetailDto?.unit),
                        imagePath: "",
                    }
                    }
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .required("Không được để trống.")
                            .max(50, "Tên vượt quá 50 kí tự")
                            .min(2, "Tên phải từ 2 kí tự trở lên."),
                        price: Yup.number()
                            .min(0, "Giá không được là số âm."),
                        vat: Yup.number()
                            .min(0, "Vat không được là số âm."),
                        maker: Yup.string()
                            .max(50, "Nhà sản xuất vượt quá 50 kí tự."),
                        activeElement: Yup.string()
                            .required("Không được để trống.")
                            .max(50, "Hoạt chất không vượt quá 50 kí tự."),
                        note: Yup.string()
                            .max(100, "Ghi chú không vượt quá 100 kí tự."),
                        origin: Yup.string()
                            .required("Không được để trống.")
                            .max(50, "Xuất xứ vượt quá 50 kí tự."),
                        retailProfits: Yup.number()
                            .required("Không được để trống. ")
                            .min(0, "% Lợi nhuận xuất lẻ  không được bé hơn 0."),
                        kindOfMedicineDto: Yup.string()
                            .required("Không được để trống."),
                        conversionRate: Yup.number()
                            .required("Không được để trống.")
                            .min(0, "Tỷ lệ quy đổi không được bé hơn 0."),
                        conversionUnit: Yup.string()
                            .required("Không được để trống."),
                        unit: Yup.number().required("Không được để trống."),
                    })}
                    onSubmit={(values, {setErrors}) => {
                        edit(values, setErrors)
                    }
                    }>
                    <div className="tin">
                        <div className="container-fluid d-flex justify-content-center p-5">
                            <fieldset className="form-input shadow">
                                <legend className="float-none w-auto px-3"><h2>Thông tin thuốc</h2></legend>
                                <Form>
                                    <div className="row">
                                        <div className="col-12">
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
                                                         style={{
                                                             height: "0.6rem",
                                                             marginLeft: "68%",
                                                             marginBottom: "1.3rem"
                                                         }}>
                                                        <ErrorMessage className="text-danger" name="name"
                                                                      component="small"/>
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
                                                    <div style={{
                                                        height: "0.6rem",
                                                        marginLeft: "34%",
                                                        marginBottom: "1.3rem"
                                                    }}>
                                                        <ErrorMessage className="text-danger" name="activeElement"
                                                                      component="small"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div style={{
                                                        height: "0.6rem",
                                                        marginLeft: "34%",
                                                        marginBottom: "1.3rem"
                                                    }}>
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
                                                                      component="small"/>
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
                                                    <div style={{
                                                        height: "0.6rem",
                                                        marginLeft: "34%",
                                                        marginBottom: "1.3rem"
                                                    }}>
                                                        <ErrorMessage className="text-danger" name="price"
                                                                      component="small"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div style={{
                                                        height: "0.6rem",
                                                        marginLeft: "34%",
                                                        marginBottom: "1.3rem"
                                                    }}>
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
                                                    <div style={{
                                                        height: "0.6rem",
                                                        marginLeft: "34%",
                                                        marginBottom: "1.3rem"
                                                    }}>
                                                        <ErrorMessage className="text-danger"
                                                                      name="unitDetailDto.conversionRate"
                                                                      component="small"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div style={{
                                                        height: "0.6rem",
                                                        marginLeft: "34%",
                                                        marginBottom: "1.3rem"
                                                    }}>
                                                        <ErrorMessage className="text-danger" name="vat"
                                                                      component="small"/>
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
                                                                      component="small"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div style={{
                                                        height: "0.6rem",
                                                        marginLeft: "34%",
                                                        marginBottom: "1.3rem"
                                                    }}>
                                                        <ErrorMessage className="text-danger" name="origin"
                                                                      component="small"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"row"}>
                                                <div className={"col-6"}>
                                                    <div>
                                                        <div className="row">
                                                            <div className="d-flex justify-content-start">
                                                                <label className="col-md-4" style={{height: "60%"}}
                                                                       htmlFor="inputGroupFile01">
                                                                    Chọn ảnh
                                                                </label>
                                                                <Field
                                                                    type="file"
                                                                    name="imagePath"
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
                                                            <Field component="textarea" className="form-control w-50"
                                                                   style={{height: "227px"}}
                                                                   name="note" id="note"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"col-6 row d-flex justify-content-right"}>
                                                    <img
                                                        src={medicines?.imageMedicineDto?.imagePath}
                                                        ref={imgPreviewRef}
                                                        style={{
                                                            padding: "0",
                                                            width: "400px",
                                                            height: "300px",
                                                            borderRadius: "10px",
                                                            objectFit: "cover",
                                                            border: "1px solid black"
                                                        }}/>
                                                </div>
                                            </div>
                                            <br/>
                                            <div className="row">
                                                <div>
                                                    <p>(<span style={{color: "red"}}>*</span>) Thông tin bắt buộc nhập
                                                    </p>
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
                    </div>
                </Formik>
            </div>
        </>
    )
}