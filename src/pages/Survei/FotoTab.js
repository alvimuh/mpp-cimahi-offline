import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import "./style.css";
import Webcam from "../../components/WebCam/Webcam";
import axios from "axios";
import { useAntrian } from "./context";
import { useAlert } from "react-alert";
function FotoTab() {
  const { state, dispatch } = useAntrian();
  const alert = useAlert();
  const [data, setData] = useState({
    nik: "",
    name: "",
    avatar: "",
    email: "",
    sub_layanan_id: state.layananSelected,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({
        type: "LOADING",
      });
      let formdata = new FormData();
      const avaBlob = await (await fetch(data.avatar)).blob();
      formdata.append("key", process.env.REACT_APP_API_KEY);
      formdata.append("name", state.booking.detail_identitas.name);
      formdata.append("nik", state.booking.detail_identitas.nik);
      formdata.append("phone", state.booking.detail_identitas.phone);
      formdata.append("email", state.booking.detail_identitas.email);
      formdata.append("avatar", avaBlob, `foto_${data.name}.jpg`);
      formdata.append("sub_layanan_id", state.booking.sub_layanan_id);
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
      alert.show("Oh look, an alert!");
      dispatch({
        type: "STOP_LOADING",
      });
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
              dispatch({
                type: "ENABLE_CTA",
              });
            }}
          />
        </div>
        <div className="right form-group">
          <div className="form-group">
            <label>Layanan yang Dituju</label>
            <input
              type="text"
              value={state.booking?.detail_sub_layanan?.nama_sub_layanan}
              onChange={inputChangeHandler}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Instansi terkait</label>
            <input
              type="text"
              value={state.booking?.detail_layanan?.nama_layanan}
              onChange={inputChangeHandler}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Nomor Induk Kependudukan</label>
            <input
              name="nik"
              type="number"
              value={state.booking?.detail_identitas?.nik}
              onChange={inputChangeHandler}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input
              type="text"
              name="name"
              value={state.booking?.detail_identitas?.name}
              onChange={inputChangeHandler}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Nomor Telepon</label>
            <input
              name="phone"
              type="number"
              value={state.booking?.detail_identitas?.phone}
              onChange={inputChangeHandler}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Alamat Email</label>
            <input
              name="email"
              type="email"
              value={state.booking?.detail_identitas?.email}
              onChange={inputChangeHandler}
              disabled
            />
          </div>
          <button type="submit" className="cta" disabled={state.ctaDisabled}>
            Lanjutkan
          </button>
        </div>
      </div>
    </form>
  );
}
// IsiIdentitasTab.propTypes = {};
export default FotoTab;
