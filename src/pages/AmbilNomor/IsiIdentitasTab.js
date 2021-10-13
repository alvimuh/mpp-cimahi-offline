import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import "./style.css";
import Webcam from "../../components/WebCam/Webcam";
import axios from "axios";
import { useAntrian } from "./context";

function IsiIdentitasTab() {
  const { state, dispatch } = useAntrian();
  const [data, setData] = useState({
    nik: "",
    name: "",
    avatar: "",
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
      formdata.append("name", data.name);
      formdata.append("nik", data.nik);
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
    } catch (error) {}
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
          <label>Foto</label>
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
            <input name="nik" value={data.nik} onChange={inputChangeHandler} />
          </div>
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input
              name="name"
              value={data.name}
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
