import React, { useEffect, useState } from "react";
import Webcam from "../../components/WebCam/Webcam";
import axios from "axios";
import { useAntrian } from "./context";
import { useAlert, positions } from "react-alert";
function IsiIdentitasTab() {
  const { state, dispatch } = useAntrian();
  const alert = useAlert();
  const [data, setData] = useState({
    nik: "",
    name: "",
    avatar: "",
    phone: "",
    email: "",
    sub_layanan_id: state.layananSelected,
  });
  const [errors, setErrors] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    for (let key in data) {
      if (!data[key]) {
        const alertMessages = {
          nik: "Mohon mengisi NIK terlebih dahulu",
          name: "Mohon mengisi Nama terlebih dahulu",
          phone: "Mohon mengisi No. HP terlebih dahulu",
          email: "Mohon mengisi Email terlebih dahulu",
          avatar: "Mohon mengambil Foto terlebih dahulu",
        };
        alert.error(alertMessages[key], {
          position: positions.TOP_CENTER,
        });
        return;
      }
    }
    if (errors.length === 0) {
      try {
        dispatch({
          type: "LOADING",
        });
        let formdata = new FormData();
        const avaBlob = await (await fetch(data.avatar)).blob();
        formdata.append("key", process.env.REACT_APP_API_KEY);
        formdata.append("name", data.name);
        formdata.append("nik", data.nik);
        formdata.append("phone", data.phone);
        formdata.append("email", data.email);
        formdata.append("avatar", avaBlob, `foto_${data.name}.jpg`);
        formdata.append("sub_layanan_id", data.sub_layanan_id);
        formdata.append("key", process.env.REACT_APP_API_KEY);
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/internal/antrian`,
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        dispatch({
          type: "SET_ANTRIAN",
          data: res.data,
        });
      } catch (error) {
        alert.show("Terjadi kesalahan pada sistem, harap coba lagi.", {
          position: positions.TOP_CENTER,
        });
        dispatch({
          type: "STOP_LOADING",
        });
      }
    }
  };

  const inputChangeHandler = (event) => {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={submitHandler} autoComplete="off">
      <div className="row">
        <div className="left">
          <label style={{ display: "block", marginBottom: "8px" }}>Foto</label>
          <Webcam
            onChange={(v) => {
              setData((prev) => ({
                ...prev,
                avatar: v,
              }));
            }}
          />
        </div>
        <div className="right form-group">
          <div className="form-group">
            <label>Nomor Induk Kependudukan</label>
            <input
              name="nik"
              type="number"
              value={data.nik}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="form-group">
            <label>Nomor Telepon</label>
            <input
              type="text"
              name="phone"
              type="number"
              value={data.phone}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="form-group">
            <label>Alamat Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={inputChangeHandler}
            />
          </div>
          <button type="submit" className="cta" disabled={state.ctaDisabled}>
            {state.ctaDisabled ? "Harap tunggu" : "Lanjutkan"}
          </button>
        </div>
      </div>
    </form>
  );
}
// IsiIdentitasTab.propTypes = {};
export default IsiIdentitasTab;
