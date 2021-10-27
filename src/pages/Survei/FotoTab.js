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
    sub_layanan_id: state.layananSelected,
  });

  const submitHandler = async (e) => {
    dispatch({
      type: "SWITCH_STEP",
      to: 2,
    });
  };

  const inputChangeHandler = (event) => {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={submitHandler} autoComplete="off">
      <div className="form-group">
        <label>Nomor Telepon</label>
        <input
          name="phone"
          type="number"
          value={state.booking?.phone}
          onChange={inputChangeHandler}
          disabled
        />
      </div>
      <div className="form-group">
        <label>Nomor Induk Kependudukan</label>
        <input
          name="nik"
          type="number"
          value={state.booking?.nik}
          onChange={inputChangeHandler}
          disabled
        />
      </div>
      <div className="form-group">
        <label>Nama Lengkap</label>
        <input
          name="name"
          type="text"
          value={state.booking?.name}
          onChange={inputChangeHandler}
          disabled
        />
      </div>
      <button type="submit" className="cta" disabled={state.ctaDisabled}>
        Lanjutkan
      </button>
    </form>
  );
}
// IsiIdentitasTab.propTypes = {};
export default FotoTab;
