import React from "react";
import { useNavigate } from "react-router-dom";

const Error403 = () => {
    const navigate = useNavigate()
    return (
        <>
            <div class="d-flex align-items-center  justify-content-center vh-100 bg-light">
                <div>
                    <h1 class="display-1 fw-bold text-dark mb-4">403 Forbiden</h1>
                    <div>Xin Lỗi bạn không được vào đường dẫn này, hãy bấm quay lại</div>
                    <div className="text-center mt-3">
                    <button onClick={() => navigate(-1)} className="btn btn-primary">Quay lại</button>
                </div>
            </div>
            </div>
        </>
    )
}
export default Error403;