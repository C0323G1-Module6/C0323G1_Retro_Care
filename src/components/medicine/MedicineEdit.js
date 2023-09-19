export default function MedicineEdit() {
    return (
        <>
            <div className="container-fluid d-flex justify-content-center p-5">
                <fieldset className="form-input shadow">
                    <legend className="float-none w-auto px-3"><h2>Thông tin thuốc</h2></legend>
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="col-md-4"
                                >Mã thuốc<span style="color: red"> *</span></label
                                >
                                <input
                                    className="col-md-2"
                                    type="text"
                                    name="code"
                                    placeholder="T00001"
                                    disabled
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="col-md-4"
                                >Tên thuốc<span style="color: red"> *</span></label
                                >
                                <input
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
                                >Hoạt chất<span style="color: red"> *</span></label
                                >
                                <input
                                    className="col-md-2"
                                    type="text"
                                    name="ingredient"
                                    placeholder="Vitamin B2"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="col-md-4"
                                >Nhóm thuốc<span style="color: red"> *</span></label
                                >
                                <select className="col-md-2" name="group">
                                    <option value="">Bổ</option>
                                </select>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="col-md-4"
                                >Đơn vị<span style="color: red"> *</span></label
                                >
                                <select className="col-md-2" name="unit">
                                    <option value="">Hộp</option>
                                    <option value="">Thùng</option>
                                    <option value="">Vỉ</option>
                                    <option value="">Bịch</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="col-md-4"
                                >ĐVT quy đổi<span style="color: red"> *</span></label
                                >
                                <select className="col-md-2" name="conversion_unit">
                                    <option value="">Gói</option>
                                    <option value="">Viên</option>
                                    <option value="">Lọ</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="col-md-4">Giá nhập</label>
                                <input
                                    className="col-md-2"
                                    type="text"
                                    name="import_price"
                                    placeholder="4,329"
                                />
                                <span>đ/Hộp</span>
                            </div>
                            <div className="col-md-6">
                                <label className="col-md-4">Tỷ lệ CK</label>
                                <input
                                    className="col-md-2"
                                    type="text"
                                    name="discount_rate"
                                    placeholder="0"
                                />
                                <span>%</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="col-md-4"
                                >Tỷ lệ quy đổi<span style="color: red"> *</span></label
                                >
                                <input
                                    className="col-md-2"
                                    type="text"
                                    name="conversion_rate"
                                    placeholder="10.000"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="col-md-4">VAT</label>
                                <input className="col-md-2" type="text" name="vat" placeholder="5"/>
                                <span>%</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="col-md-4"
                                >%Lợi nhuận XL<span style="color: red"> *</span></label
                                >
                                <input
                                    className="col-md-2"
                                    type="text"
                                    name="profit_margin_xl"
                                    placeholder="10.000"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="col-md-4">Giá bán lẻ</label>
                                <input
                                    className="col-md-2"
                                    type="text"
                                    name="retail_price"
                                    placeholder="5,000"
                                />
                                <span>đ/Hộp</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="col-md-4">Nhà sản xuất</label>
                                <input className="col-md-2" type="text" name="manufacturer"/>
                            </div>
                            <div className="col-md-6">
                                <label className="col-md-4"
                                >Xuất xứ<span style="color: red"> *</span></label
                                >
                                <select className="col-md-2" name="origin">
                                    <option value="">Chọn quốc gia</option>
                                    <option value="VN">Việt Nam</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="GB">United Kingdom</option>
                                    <option value="AU">Australia</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="d-flex justify-content-start">
                                <label className="col-md-2" style="height: 60%" htmlFor="inputGroupFile01">Chọn
                                    ảnh</label>
                                <input type="file"
                                       className="form-control form-control-sm w-75" id="inputGroupFile01"/>
                            </div>
                        </div>
                        <div className="row">
                            <label style="width: 17.66666667%" className="col-md-2">Ghi chú</label>
                            <textarea className="form-control"></textarea>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-9">
                                <p>(<span style="color: red">*</span>) Thông tin bắt buộc nhập</p>
                            </div>
                            <div className="d-flex justify-content-end">
                                <a href="/prototype/product/DaoPTA_ProductList.html">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary float-end mx-1 mt-2 shadow"
                                    >
                                        <i className="fa-regular fa-pen-to-square"></i>
                                        Hoàn thành
                                    </button>
                                </a>
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
                    </form>
                </fieldset>
            </div>
        </>
    )
}