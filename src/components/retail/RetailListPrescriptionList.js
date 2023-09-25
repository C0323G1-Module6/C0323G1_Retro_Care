import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { getPrescriptionByName, getPrescriptionBySymptoms } from "../../services/retail/RetailService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {AiOutlineRollback} from "react-icons/ai";

export default function RetailListPrescriptionList() {
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("Tên toa thuốc");
  const [list, setList] = useState([]);
  const [prescriptionId, setPrescriptionId] = useState(0);
  const navigate = useNavigate();
  useEffect(()=>{
    document.title="RetroCare - danh sách toa";
  },[])
  

  const handleRowClick = (index) => {
    if (index.id == prescriptionId) {
      setPrescriptionId(0);
    } else {
      setPrescriptionId(index.id);
    }
  }


  const getListByName = async () => {
    const find = input.trim();
    const data = await getPrescriptionByName(find);
    setList((pre) => data);
  }

  const getListBySymptoms = async () => {
    const find = input.trim();
    const data = await getPrescriptionBySymptoms(find);
    setList((pre) => data);
  }

  const findPrescription = () => {
    if (select === "Tên toa thuốc") {
      getListByName();
    } else {
      getListBySymptoms();
    }
  }

  const backToRetail = () => {
    navigate("/dashboard/retail");
  }

  const toPrescriptionInformation = () => {
    if (prescriptionId == 0) {
      Swal.fire({
        text: "Bạn chưa chọn gì",
        icon: "warning",
        timer: 1000,
    });
      return;
    } else {
      navigate("/dashboard/retail/prescription-information/"+prescriptionId)
    }
  }
  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#0D6EFD' }}>
        DANH SÁCH TOA THUỐC
      </h1>
      <div className="row">
        <div className="col-md-6">
          <div className="note-frame border border-dark rounded-3 p-2 d-flex gap-2 align-items-center mb-3" data-title="Tìm kiếm thông tin">
            <label htmlFor="findBy">Tìm kiếm theo</label>
            <select
              id="findBy"
              name="findBy"
              style={{ borderRadius: '5px' }}
              onChange={(event) => setSelect((pre) => event.target.value)}
            >
              <option value="Tên toa thuốc">Tên toa thuốc</option>
              <option value="Triệu chứng">Triệu chứng</option>
            </select>
            <input
              style={{ borderRadius: '3px' }}
              value={input}
              onChange={(event) => setInput((pre) => event.target.value)}
            />
            <button className="btn btn-primary p-1" onClick={() => findPrescription()}>
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
                {list.map((pre) => (
                  <tr key={pre.id} style={prescriptionId === pre.id ? { backgroundColor: 'rgb(98, 158, 236)' } : {}}
                    onClick={() => handleRowClick(pre)}
                  >
                    <td>{pre.code}</td>
                    <td>{pre.name}</td>
                    <td>{pre.patient_name}</td>
                    <td>{pre.symptoms}</td>
                    <td>{pre.note}</td>
                  </tr>
                ))}


              </tbody>
            </table>
            
          </div>
        </div>
      </div>
      <div className="text-end mt-2 d-flex gap-2 justify-content-end">
              <a  className="btn btn-outline-primary"
                onClick={() => toPrescriptionInformation()}>
                Chi tiết toa thuốc
              </a>
              <a className="btn btn-outline-primary"
                onClick={() => backToRetail()}><AiOutlineRollback/>
                Trở về
              </a>
            </div>
    </div>

  )
}
