import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function RetailListPrescriptionList() {
    return(
        <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#0D6EFD' }}>
          Danh sách toa thuốc kê sẵn
        </h1>
        <div className="row">
          <div className="col-md-6">
            <div className="note-frame border border-dark rounded-3" data-title="Tìm kiếm thông tin">
              <label htmlFor="findBy">Tìm kiếm theo</label>
              <select
                id="findBy"
                name="findBy"
                style={{ borderRadius: '5px' }}
            
              >
                <option value="Tên toa thuốc">Tên toa thuốc</option>
                <option value="Triệu chứng">Triệu chứng</option>
              </select>
              <input
                style={{ borderRadius: '3px' }}
              />
              <button className="btn btn-primary" >
                Xem
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="note-frame border border-dark rounded-3" data-title="Danh sách toa thuốc">
              <table className="table rounded-3 overflow-hidden" style={{ textAlign: 'center', borderRadius: '5px' }}>
                <thead className="bg-primary text-white">
                  <tr>
                    <th>Mã toa thuốc</th>
                    <th>Tên toa thuốc</th>
                    <th>Đối tượng</th>
                    <th>Triệu chứng</th>
                    <th>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TT00003</td>
                    <td>Thuốc đau bụng</td>
                    <td>Trẻ con, người lớn</td>
                    <td>Ho</td>
                    <td>N/A</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <div className="text-end">
                <a href="" className="btn btn-outline-primary">
                  Chi tiết toa thuốc
                </a>
                <a href="VuNL_Retail.html" className="btn btn-outline-primary">
                  Trở về
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
